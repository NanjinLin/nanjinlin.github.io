import {
  profile,
  researchInterests,
  cudaProject,
} from '@/content/site';
import { ResourceLink } from '@/components/resource-link';

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="profile" id="top">
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="profile-content">
          <img
            className="profile-avatar"
            src="/avatar.jpg"
            alt="Sparrow on a branch of apricot blossoms"
            width={120}
            height={120}
            decoding="async"
          />
          <div className="profile-summary">
            <div className="name-line">
              <h1>{profile.name}</h1>
            </div>
            <p className="affiliation">
              {profile.role} at {profile.university}
            </p>
            <p className="profile-focus">{profile.focus}</p>
            <ul className="profile-links" aria-label="Profile links">
              <li>
                <ResourceLink label="GitHub" href={profile.githubUrl} />
              </li>
              <li>
                <ResourceLink
                  label={profile.email}
                  href={`mailto:${profile.email}`}
                />
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section
          className="page-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <h2 className="section-label" id="about-heading">
            About
          </h2>
          <div className="section-content">
            <p className="about-copy">{profile.about}</p>
          </div>
        </section>

        <section
          className="page-section"
          id="research"
          aria-labelledby="research-heading"
        >
          <h2 className="section-label" id="research-heading">
            Research interests
          </h2>
          <div className="section-content">
            <ul className="interest-list">
              {researchInterests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="page-section projects-section"
          id="projects"
          aria-labelledby="projects-heading"
        >
          <h2 className="section-label" id="projects-heading">
            Selected projects
          </h2>
          <div className="section-content">
            <article className="project" aria-labelledby="cuda-heading">
              <div className="project-index">
                <span>01</span>
                <span>{cudaProject.label}</span>
              </div>
              <h3 id="cuda-heading">{cudaProject.title}</h3>
              <p className="project-description">{cudaProject.description}</p>
              <p className="technical-line">{cudaProject.tools.join(' · ')}</p>

              <div className="project-links">
                <ResourceLink label="GitHub" href={cudaProject.githubUrl} />
              </div>
            </article>
          </div>
        </section>

        <section
          className="page-section contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <h2 className="section-label" id="contact-heading">
            Contact
          </h2>
          <div className="section-content">
            <p>{profile.contactIntro}</p>
            <dl className="contact-list">
              <div>
                <dt>Email</dt>
                <dd>
                  <ResourceLink
                    label={profile.email}
                    href={`mailto:${profile.email}`}
                  />
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <ResourceLink
                    label={profile.githubUrl.replace(/^https?:\/\//, '')}
                    href={profile.githubUrl}
                  />
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>
          {profile.name} <span aria-hidden="true">/</span> {profile.university}
        </span>
        <a href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  );
}
