import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist/client');
const html = readFileSync(resolve(output, 'index.html'), 'utf8');
const markup = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');
const css = readFileSync(resolve(root, 'app/globals.css'), 'utf8');
const content = readFileSync(resolve(root, 'content/site.ts'), 'utf8');
const pageSource = readFileSync(resolve(root, 'app/page.tsx'), 'utf8');
const visibleText = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
}

function metadataValue(attribute, key) {
  const tags = [...markup.matchAll(/<meta\b[^>]*>/g)].map((match) =>
    attributes(match[0]),
  );
  return tags.find((tag) => tag[attribute] === key)?.content;
}

test('exactly four main sections, in the requested order', () => {
  const sections = [...markup.matchAll(/<section\b[^>]*>/g)].map(
    (match) => attributes(match[0]).id,
  );
  assert.deepEqual(sections, ['about', 'research', 'projects', 'contact']);
  assert.equal((markup.match(/<main\b/g) || []).length, 1);
});

test('headings and language communicate the academic identity', () => {
  assert.equal((markup.match(/<h1\b/g) || []).length, 1);
  assert.equal((markup.match(/<h2\b/g) || []).length, 4);
  assert.equal((markup.match(/<h3\b/g) || []).length, 1);
  assert.match(markup, /<html[^>]*lang="en"/);
  for (const text of [
    'Nanjing University',
    'School of Software',
    'CUDA Kernel Optimization',
    'GPU Performance Engineering',
  ]) {
    assert.ok(
      visibleText.includes(text),
      `Missing identity or project text: ${text}`,
    );
  }
});

test('navigation and skip link resolve to unique on-page targets', () => {
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate element IDs');
  const anchors = [...markup.matchAll(/<a\b[^>]*>/g)].map((match) =>
    attributes(match[0]),
  );
  assert.ok(anchors.some((anchor) => anchor.href === '#main'));
  for (const anchor of anchors) {
    assert.ok(anchor.href && anchor.href !== '#', 'Empty or dead link');
    if (anchor.href.startsWith('#'))
      assert.ok(
        ids.includes(anchor.href.slice(1)),
        `Missing anchor target ${anchor.href}`,
      );
    else
      assert.match(
        anchor.href,
        /^(https:\/\/|mailto:|\/)/,
        `Unexpected link scheme: ${anchor.href}`,
      );
  }
  assert.match(markup, /<main[^>]*tabindex="-1"/i);
});

test('confirmed name is consistent and temporary copy is absent', () => {
  assert.match(markup, /<h1>Hongyun Wang<\/h1>/);
  assert.match(markup, /<title>Hongyun Wang<\/title>/);
  assert.match(markup, /<footer\b[^>]*>[\s\S]*?Hongyun Wang/);
  assert.equal(metadataValue('property', 'og:title'), 'Hongyun Wang');
  assert.equal(metadataValue('name', 'twitter:title'), 'Hongyun Wang');
  assert.doesNotMatch(markup, /Xinan\s+Lin|not added|to confirm|awaiting|placeholder/i);
  assert.doesNotMatch(metadataValue('name', 'robots') || '', /noindex/);
  assert.doesNotMatch(
    markup,
    /href="[^"]*(?:example\.com|your-username|YOUR_|TODO)/i,
  );
});

test('profile and Contact use the supplied links without a missing CV entry', () => {
  const anchors = [...markup.matchAll(/<a\b[^>]*>/g)].map((match) =>
    attributes(match[0]),
  );
  assert.equal(
    anchors.filter((anchor) => anchor.href === 'mailto:2518400042@smail.nju.edu.cn').length,
    2,
  );
  assert.equal(
    anchors.filter((anchor) => anchor.href === 'https://github.com/NanjinLin').length,
    2,
  );
  for (const anchor of anchors) {
    if (anchor.href.startsWith('https://')) {
      assert.equal(anchor.target, '_blank');
      assert.ok(anchor.rel.split(/\s+/).includes('noopener'));
      assert.ok(anchor.rel.split(/\s+/).includes('noreferrer'));
    }
    if (anchor.href.startsWith('mailto:')) assert.equal(anchor.target, undefined);
  }
  const profileLinks = markup.match(/<ul class="profile-links"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(profileLinks);
  assert.equal((profileLinks.match(/<li\b/g) || []).length, 2);
  assert.match(
    profileLinks,
    /<a href="mailto:2518400042@smail.nju.edu.cn">2518400042@smail.nju.edu.cn<\/a>/,
  );
  assert.doesNotMatch(profileLinks, />Email</);
  const contact = markup.match(/<section[^>]*id="contact"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(contact?.includes('2518400042@smail.nju.edu.cn'));
  assert.ok(contact?.includes('github.com/NanjinLin'));
  assert.deepEqual(
    [...contact.matchAll(/<dt>([^<]+)<\/dt>/g)].map((match) => match[1]),
    ['Email', 'GitHub'],
  );
  assert.doesNotMatch(visibleText, /\bCV\b|Curriculum vitae/i);
});

test('About contains only the two requested sentences', () => {
  const about = markup.match(/<p class="about-copy">([\s\S]*?)<\/p>/)?.[1];
  assert.equal(
    about,
    'I am an undergraduate in the School of Software at Nanjing University. ' +
      'My interests lie in machine learning systems, particularly GPU systems, ' +
      'LLM training and inference, and efficient deep learning.',
  );
});

test('the project is a compact academic selected-work entry', () => {
  const project = markup.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0];
  assert.ok(project, 'The CUDA project is rendered');
  assert.match(
    project,
    /<div class="project-index"><span>01<\/span><span>GPU Performance Engineering<\/span><\/div>/,
  );
  assert.match(project, /<h3 id="cuda-heading">CUDA Kernel Optimization<\/h3>/);
  assert.doesNotMatch(project, /project-subtitle|cuda-self-learning/);
  assert.equal((project.match(/GPU Performance Engineering/gi) || []).length, 1);
  assert.match(
    css,
    /\.project-index\s*\{[^}]*display:\s*flex;[^}]*gap:\s*17px;[^}]*font-family:\s*var\(--font-mono\);[^}]*font-size:\s*11px;/,
  );
  const paragraphs = [...project.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(paragraphs, [
    'A hands-on study of GPU performance, from basic parallel primitives to attention kernels. ' +
      'The project explores CUDA kernel implementation and optimization through benchmarking and GPU profiling.',
    'CUDA · C++ · Nsight Compute · Nsight Systems',
  ]);
  assert.doesNotMatch(
    project,
    /<(?:h[4-6]|ul|ol|dl|details|summary|figure|img|button)\b/,
  );
  assert.doesNotMatch(
    pageSource,
    /['"]use client['"]|onClick=|dangerouslySetInnerHTML/,
  );
});

test('removed project detail UI and future-data placeholders are absent', () => {
  for (const text of [
    'An iterative engineering process',
    'Correctness',
    'Re-measure',
    'Identify a bottleneck, test a change, and explain the result.',
    'Kernel scope',
    'Vector addition',
    'Reduction',
    'Matrix multiplication',
    'MLP',
    'FlashAttention',
    'Project details',
    'methods & implementation notes',
    'Measurements & profiling',
    'Benchmark results',
    'Awaiting measured data',
    'Nsight profiling',
    'Awaiting profiling capture',
    'CUDA Events',
  ]) {
    assert.ok(!visibleText.includes(text), `Removed content still present: ${text}`);
  }
  assert.doesNotMatch(markup, /<(?:details|summary|figure)\b/);
  assert.doesNotMatch(
    pageSource,
    /project-block|project-details|evidence-block|evidence-grid|figure-placeholder/,
  );
  assert.doesNotMatch(
    content,
    /optimizationAreas|engineeringProcess|evidenceFigures|EvidenceFigure|detailsUrl|kernels:/,
  );
});

test('the project has exactly one GitHub link to the supplied repository', () => {
  const project = markup.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0];
  assert.ok(project);
  const links = [...project.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.equal(links.length, 1);
  assert.equal(
    attributes(links[0][0]).href,
    'https://github.com/NanjinLin/cuda-performance-engineering',
  );
  assert.equal(links[0][2].replace(/<[^>]+>/g, ''), 'GitHub ↗');
});

test('no template decoration, marketing filler, or extra sections', () => {
  assert.doesNotMatch(
    css,
    /gradient\(|box-shadow:|border-radius:|backdrop-filter:|@keyframes|animation:/i,
  );
  assert.doesNotMatch(
    visibleText,
    /passionate|enthusiastic|innovative|cutting-edge|problem solver|lifelong learner|let.s build something|learn more|testimonials|fun facts/i,
  );
  assert.doesNotMatch(
    pageSource,
    /className="[^"]*\b(?:card|badge|bento|hero)\b/i,
  );
});

test('responsive layout, focus treatment, and reduced-motion support are defined', () => {
  assert.match(css, /@media\s*\(max-width:\s*900px\)/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)/);
  assert.match(css, /@media\s*\(max-width:\s*360px\)/);
  assert.match(css, /grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  assert.match(css, /:focus-visible\s*\{[^}]*outline:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.skip-link:focus\s*\{[^}]*transform:\s*none/);
  assert.match(css, /\.profile-links li\s*\{[^}]*min-width:\s*0;[^}]*max-width:\s*100%;[^}]*overflow-wrap:\s*anywhere;/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.profile-links\s*\{[^}]*flex-direction:\s*column;/);
  assert.match(css, /@media\s*\(max-width:\s*640px\)[\s\S]*?\.profile-links li \+ li::before\s*\{[^}]*content:\s*none;/);
});

test('every text color meets WCAG AA contrast on the page background', () => {
  const tokens = Object.fromEntries(
    [...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)]
      .slice(0, 6)
      .map((match) => [match[1], match[2]]),
  );
  const luminance = (hex) => {
    const channels = hex
      .slice(1)
      .match(/../g)
      .map((value) => parseInt(value, 16) / 255)
      .map((value) =>
        value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
      );
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  for (const name of ['foreground', 'secondary', 'muted', 'accent']) {
    const values = [luminance(tokens.background), luminance(tokens[name])].sort(
      (a, b) => b - a,
    );
    const ratio = (values[0] + 0.05) / (values[1] + 0.05);
    assert.ok(
      ratio >= 4.5,
      `${name} contrast ${ratio.toFixed(2)} is below 4.5:1`,
    );
  }
});

test('metadata and the generated social image are site-specific', () => {
  assert.deepEqual(
    [...markup.matchAll(/<title\b[^>]*>([^<]*)<\/title>/g)].map((match) => match[1]),
    ['Hongyun Wang'],
  );
  assert.ok(metadataValue('name', 'description')?.includes('GPU systems'));
  const ogImage = metadataValue('property', 'og:image');
  const twitterImage = metadataValue('name', 'twitter:image');
  assert.ok(ogImage?.endsWith('/og.png'));
  assert.equal(ogImage, twitterImage);
  assert.equal(metadataValue('name', 'twitter:card'), 'summary_large_image');
  assert.equal(
    metadataValue('property', 'og:title'),
    metadataValue('name', 'twitter:title'),
  );
  const png = readFileSync(resolve(output, 'og.png'));
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(
    Number(metadataValue('property', 'og:image:width')),
    png.readUInt32BE(16),
  );
  assert.equal(
    Number(metadataValue('property', 'og:image:height')),
    png.readUInt32BE(20),
  );
});

test('the supplied avatar is a local square image in the profile header', () => {
  const images = [...markup.matchAll(/<img\b[^>]*>/g)];
  assert.equal(images.length, 1, 'Only the requested avatar appears in the page');
  const avatar = attributes(images[0][0]);
  assert.equal(avatar.src, '/avatar.jpg');
  assert.equal(avatar.alt, 'Sparrow on a branch of apricot blossoms');
  assert.equal(avatar.width, '120');
  assert.equal(avatar.height, '120');
  assert.equal(avatar.class, 'profile-avatar');
  assert.ok(
    pageSource.indexOf('className="profile-avatar"') < pageSource.indexOf('className="profile-summary"'),
    'Avatar should precede the name in both the reading and visual order',
  );
  assert.match(css, /\.profile-content\s*\{[^}]*grid-template-columns:\s*var\(--gutter\) minmax\(0,\s*1fr\);[^}]*padding:\s*42px 0 44px;/);
  assert.match(
    markup,
    /<header\b[^>]*>[\s\S]*?<img\b[^>]*src="\/avatar.jpg"[^>]*>[\s\S]*?<\/header>/,
  );
  const original = readFileSync(resolve(root, 'public/avatar.jpg'));
  assert.deepEqual([...original.subarray(0, 3)], [255, 216, 255]);
  assert.deepEqual(readFileSync(resolve(output, 'avatar.jpg')), original);
  assert.match(css, /\.profile-avatar\s*\{[^}]*width:\s*120px;[^}]*height:\s*120px;[^}]*object-fit:\s*cover;/);
  assert.match(
    css,
    /@media\s*\(max-width:\s*640px\)[\s\S]*?\.profile-avatar\s*\{[^}]*grid-row:\s*1;[^}]*width:\s*96px;[^}]*height:\s*96px;/,
  );
});

test('all locally referenced assets exist in the static export', () => {
  for (const match of markup.matchAll(/<(?:link|img)\b[^>]*>/g)) {
    const tag = attributes(match[0]);
    const url = tag.href || tag.src;
    if (url?.startsWith('/') && !url.startsWith('//')) {
      assert.ok(
        existsSync(resolve(output, url.slice(1).split('?')[0])),
        `Missing exported asset: ${url}`,
      );
    }
  }
});
