'use client';

import { navLinks } from '@/lib/content';
import SectionLink from './SectionLink';
import { useSite } from './SiteProvider';

const cx = (...c) => c.filter(Boolean).join(' ');

export default function Navbar() {
  const { nav, menuOpen, toggleMenu, navigateTo } = useSite();

  return (
    <>
      <nav id="navbar" className={cx(nav.scrolled && 'scrolled', nav.hidden && 'hidden-nav')}>
        <SectionLink href="#hero" className="nav-logo">
          SM<span>.dev</span>
        </SectionLink>
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.href}>
              <SectionLink
                href={l.href}
                className={cx(l.cta && 'nav-cta', nav.active === l.href.slice(1) && 'active')}
              >
                {l.label}
              </SectionLink>
            </li>
          ))}
        </ul>
        <button
          className={cx('hamburger', menuOpen && 'open')}
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Floating menu button shown when scrolling back up past the hero */}
      <button
        className={cx('fab-nav-btn', nav.fab && 'visible', menuOpen && 'open')}
        aria-label="Menu"
        onClick={toggleMenu}
      >
        <span /><span /><span />
      </button>

      <div className={cx('mobile-menu', menuOpen && 'open')}>
        {navLinks.map((l) => (
          <SectionLink key={l.href} href={l.href}>
            {l.label}
          </SectionLink>
        ))}
      </div>

      <div
        id="scroll-top"
        className={nav.toTop ? 'visible' : undefined}
        role="button"
        aria-label="Back to top"
        onClick={() => navigateTo('#top')}
      >
        ↑
      </div>
    </>
  );
}
