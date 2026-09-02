# AI Smell Review — first version

Review scope: source, content, information hierarchy, and generated static output. No claim of browser screenshot or real-device testing is made.

## Changes made during the review

- Reduced the top area's vertical whitespace and set the name to 40px on desktop. The project should enter the reading sequence sooner instead of sitting below a large hero.
- Removed all 63 unused generated UI/helper files. No card, badge, animation, chart, or icon library is needed by this page.
- Kept a single real project. No invented second or third project fills the layout.
- Used native expandable project notes, leaving the overview readable and the detailed optimization methods available without a separate navigation section.
- Kept two compact evidence slots with explicit missing-data text. They contain no fabricated chart, timeline, score, speedup, or measurement.
- Marked the sample name and missing resources honestly. Missing resources are text rather than empty anchors or links to guessed profiles.
- Removed the colorful starter favicon in favor of a restrained typographic ML mark.

## Final checklist

- No cards, rounded content boxes, shadows, gradients, glass effects, bento layout, decorative emoji, or illustrations.
- No skill badges, skill bars, statistics, testimonials, blog, services, or extra top-level section.
- One sans-serif and one monospace family; one restrained accent color.
- No typing effect, scroll reveal, parallax, cursor animation, or loading theatrics.
- About describes the supplied academic context and concrete engineering activities.
- The CUDA project has the greatest content weight, with its process, scope, tools, optimization notes, and evidence positions.
- FlashAttention remains explicitly in progress.
- Share-card art is metadata-only, not decoration in the page.

## Still needs the owner

Confirm the name, supply real profile/repository URLs and email, and add the actual CV. The first version cannot make those missing facts true.

## Content-reduction revision

- Removed the last About sentence without adding replacement copy.
- Replaced the earlier process, kernel-scope, expandable notes, and evidence-slot UI with a single compact project entry: number, repository name, title, subtitle, two-sentence description, four core technologies, and one GitHub entry.
- Removed the unused project-detail data. Benchmarks, profiling captures, methods, and reports belong in the GitHub README rather than the homepage.
- Kept the stylesheet byte-for-byte unchanged, including typography, spacing, colors, width, and grid rules. Header, Research Interests, Contact, and Footer source is unchanged.
- Verified the updated browser DOM and a normal-viewport screenshot. The Projects section contains no empty frames, hidden details, or residual reserved space.
- The production build and all 13 automated checks passed. The repository URL remains unprovided and is not guessed. No upload or deployment was performed in this revision.

## Confirmed identity and contact revision

- Updated the heading, footer, title, SEO/Open Graph/X metadata, and social card to Hongyun Wang.
- Added the supplied email, personal GitHub, and CUDA repository links. External links use a new tab with `noopener noreferrer`; mail links remain standard `mailto:` links.
- Removed the unconfigured CV entries and all temporary confirmation copy from the rendered page and metadata.
- Kept the stylesheet unchanged and preserved the About, Research Interests, and project descriptions. No new section or decoration was introduced.
- Checked the browser at 1280px, 390px, and 320px. The narrow layout wraps the email within the existing grid without horizontal overflow. Refreshed the preview to update its title metadata.
- The production build and all 14 automated checks passed. No upload or deployment was performed.
- The requested apricot-and-sparrow avatar attachment has not been received, so no avatar or substitute image was added. That part of the request still requires the owner's image.

## Avatar follow-up

- Received the owner's square apricot-and-sparrow JPEG and copied it unchanged to `public/avatar.jpg`. Source and destination SHA-256 hashes match; intrinsic size is 1254 × 1254.
- Added a 120px square image at the right of the existing desktop profile grid, reduced to 104px on narrow desktop layouts. Below 640px, it is 96px and sits above the name.
- Added descriptive alternative text and explicit image dimensions. No circular crop, border, shadow, decoration, or animation was added.
- Only the profile wrapper and avatar-specific responsive rules changed; typography, color tokens, section structure, copy, contact links, footer, and social preview are unchanged.
- Browser checks passed at 1280px, 641px, 390px, and 320px: the image loaded correctly, stayed square, switched position as intended, and caused no horizontal overflow. Desktop and mobile screenshots were inspected.
- The production build and all 15 automated checks passed. The earlier missing-avatar item is now resolved. No upload or deployment was performed.
