// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the quiet action. Pages get one filled button. Everything
// else that navigates uses this text link and an arrow.
// ============================================

import Link from "next/link";

type TextLinkProps = {
  href: string;
  children: string;
  track?: string;
};

export function TextLink({ href, children, track }: TextLinkProps) {
  const className = "inline-flex min-h-[44px] items-center gap-2 text-body text-ink";
  const arrow = (
    <span aria-hidden="true" className="text-accent">
      →
    </span>
  );

  // A web address opens in a new tab. A PDF is a file the visitor saves.
  const file = href.endsWith(".pdf");
  if (href.startsWith("http") || href.startsWith("mailto:") || file) {
    return (
      <a
        href={href}
        className={className}
        data-track={track}
        target={file ? undefined : "_blank"}
        rel="noopener noreferrer"
        download={file ? "" : undefined}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={className} data-track={track}>
      {children}
      {arrow}
    </Link>
  );
}
