// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer on every page. It closes with the line "Good
// things deserve to happen." and a Contact button. The email stays
// on the Contact page. Quiet links cover the menu, the CV, the chat,
// LinkedIn, and Substack. It states no place. The résumé link appears
// only when its file exists.
// ============================================

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { footerNav, identity, primaryNav } from "@/content/site-content";

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
  const menu = [...primaryNav, { label: "Contact", href: "/contact" }];

  return (
    <footer className="border-t border-border-subtle bg-bg-deep">
      <div className="shell py-16 md:py-24">
        <p className="max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.95] text-ink">
          Good things deserve to happen.
        </p>
        <div className="mt-8">
          <Button href="/contact" track="button:contact:footer">
            Contact
          </Button>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border-subtle pt-10 md:grid-cols-2">
          <nav aria-label="Footer menu">
            <p className="label text-text-secondary">Find your way</p>
            <ul className="mt-3 flex flex-col">
              {menu.map((item) => (
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
