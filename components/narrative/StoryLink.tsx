// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a link that sits inside a sentence. It is underlined, with
// a small arrow, and it is never a card. Hash links also move focus
// to the heading they point at.
// ============================================

"use client";

import Link from "next/link";
import { focusHash } from "@/components/narrative/focus-hash";

type StoryLinkProps = {
  href: string;
  children: string;
  track?: string;
};

export function StoryLink({ href, children, track }: StoryLinkProps) {
  const className =
    "inline text-ink underline decoration-accent decoration-2 underline-offset-[0.2em]";
  const body = (
    <>
      {children}
      <span aria-hidden="true"> →</span>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} data-track={track} onClick={() => focusHash(href)}>
        {body}
      </a>
    );
  }

  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={className} data-track={track}>
        {body}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      data-track={track}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {body}
    </a>
  );
}
