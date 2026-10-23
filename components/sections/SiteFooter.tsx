// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer on every page. The name links home. Under it,
// See full CV sits with Writing, Ask, LinkedIn, and Contact.
// See résumé is included only when its file exists. The year and
// name close the page.
// ============================================

import Link from "next/link";
import { footerNav, identity } from "@/content/site-content";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "inline-flex min-h-[44px] items-center text-caption text-ink transition-colors hover:text-accent";
  const track = `nav_item:${label.toLowerCase().replace(/[^a-z]+/g, "_")}:footer`;
  if (href.startsWith("/") && !href.endsWith(".pdf")) {
    return (
      <Link href={href} className={className} data-track={track}>
        {label}
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
      {label}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-border-subtle bg-bg-deep">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 h-48 opacity-40 blur-3xl"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(233,191,133,0.5), transparent)" }}
      />
      <div className="shell relative py-10">
        <p className="gold-text max-w-[18ch] font-serif text-[clamp(2.2rem,5vw,4rem)] italic leading-[0.98]">
          Good ideas deserve to happen.
        </p>
        <div className="gold-rule mt-6 w-40" aria-hidden="true" />
        <nav aria-label="Footer" className="mt-5 flex flex-wrap items-center gap-y-1">
          {footerNav.map((item) => (
            <span
              key={item.href}
              className="inline-flex items-center after:mx-3 after:text-accent-deep after:content-['·'] last:after:content-none"
            >
              <FooterLink href={item.href} label={item.label} />
            </span>
          ))}
        </nav>
        <p className="mt-4 flex flex-wrap items-center gap-x-3 text-caption text-text-secondary">
          <Link href="/" className="font-serif text-lg text-ink">
            {identity.wordmark}
          </Link>
          <span>{year}</span>
        </p>
      </div>
    </footer>
  );
}
