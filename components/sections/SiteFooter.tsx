// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer on every page. It closes with the line "Good
// ideas deserve to happen.", an email link, and quiet links to the
// CV, Ask about me, LinkedIn and Substack. It states no place. The résumé link appears
// only when its file exists. The six menu places repeat below.
// ============================================

import Link from "next/link";
import { footerNav, identity, inquiries, primaryNav } from "@/content/site-content";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className = "inline-flex min-h-[44px] items-center text-caption text-ink transition-colors hover:text-accent-deep";
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
    <footer className="border-t border-border-subtle bg-bg-deep">
      <div className="shell py-16 md:py-24">
        <p className="max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,5.4rem)] italic leading-[0.95] text-ink">
          Good ideas deserve to happen.
        </p>
        <p className="mt-8">
          <a
            href={inquiries.href}
            data-track="link:email:footer"
            className="font-serif text-[clamp(1.3rem,2.4vw,2rem)] text-ink underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent-deep"
          >
            {inquiries.email}
          </a>
        </p>

        <div className="mt-16 grid gap-10 border-t border-border-subtle pt-10 md:grid-cols-2">
          <nav aria-label="Footer menu">
            <p className="label text-text-secondary">Find your way</p>
            <ul className="mt-3 flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href ?? "/"} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer links">
            <p className="label text-text-secondary">Elsewhere</p>
            <ul className="mt-3 flex flex-col">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-caption text-text-secondary">
          © {year} {identity.fullName}
        </p>
      </div>
    </footer>
  );
}
