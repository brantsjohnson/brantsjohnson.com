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
  const className = "inline-flex min-h-[44px] items-center text-caption text-ink";
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
    <footer className="border-t border-border-subtle bg-bg">
      <div className="shell py-4">
        <Link href="/" className="font-serif text-h3 text-ink">
          {identity.wordmark}
        </Link>
        <nav aria-label="Footer" className="mt-3 flex flex-wrap items-center gap-y-1">
          {footerNav.map((item) => (
            <span
              key={item.href}
              className="inline-flex items-center after:mx-3 after:text-text-secondary after:content-['·'] last:after:content-none"
            >
              <FooterLink href={item.href} label={item.label} />
            </span>
          ))}
        </nav>
        <p className="mt-3 text-caption text-text-secondary">
          {year} {identity.fullName}
        </p>
      </div>
    </footer>
  );
}
