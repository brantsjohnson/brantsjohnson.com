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

  // A PDF is a file, so the browser opens it directly instead of as a page.
  if (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={className} data-track={track} target="_blank" rel="noopener noreferrer">
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
