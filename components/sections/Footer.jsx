import { footerLinks, profile } from '@/lib/content';
import SectionLink from '../SectionLink';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-copy">
          © {new Date().getFullYear()} <span>{profile.name}</span> · Built with curiosity &amp; caffeine ☕
        </div>
        <div className="footer-links">
          {footerLinks.map((l) => (
            <SectionLink key={l.href} href={l.href}>
              {l.label}
            </SectionLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
