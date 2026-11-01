'use client';

/** Placeholder link for things that don't exist yet (resume, demos, blog posts). */
export default function ComingSoonLink({ message, children, ...rest }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        alert(message);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
