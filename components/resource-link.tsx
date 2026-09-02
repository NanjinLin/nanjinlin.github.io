type ResourceLinkProps = {
  label: string;
  href: string;
};

export function ResourceLink({ label, href }: ResourceLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {label}
      {isExternal && (
        <span className="external-arrow" aria-hidden="true">
          {' '}
          ↗
        </span>
      )}
    </a>
  );
}
