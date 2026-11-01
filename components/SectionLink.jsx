'use client';

import { useSite } from './SiteProvider';

/** In-page anchor (#section) that plays the splash transition instead of jumping. */
export default function SectionLink({ href, children, ...rest }) {
  const { navigateTo } = useSite();
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigateTo(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
