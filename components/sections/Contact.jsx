import { profile } from '@/lib/content';
import SectionHeader from '../SectionHeader';
import ContactForm from './ContactForm';

const links = [
  { icon: '✉️', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: '💼', label: 'LinkedIn', value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { icon: '🐙', label: 'GitHub', value: profile.githubLabel, href: profile.github, external: true },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <SectionHeader tag="Get In Touch" title="Let's" dim="Connect" />
        <div className="contact-grid">
          <div className="reveal">
            <p>
              I&apos;m always open to interesting conversations, collaboration opportunities, or just
              talking about AI and tech. Feel free to reach out!
            </p>
            <div className="contact-links">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="contact-link"
                  {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="contact-link-icon">{l.icon}</div>
                  <div className="contact-link-text">
                    <span className="contact-link-label">{l.label}</span>
                    <span className="contact-link-val">{l.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
