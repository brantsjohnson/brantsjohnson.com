// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer on every page. The page ends on the same
// near-black already used for headlines, so the close feels like a
// split, not a new color. Small link groups sit in the open space.
// The name is set so large that the bottom of the letters is cut off,
// the way a magazine crop cuts a word. The email stays on the Contact
// page. The résumé link appears only when its file exists.
// ============================================

import Link from "next/link";
import { footerNav, identity, primaryNav } from "@/content/site-content";

function FooterLink({ href, label }: { href: string; label: string }) {
  const className =
    "inline-flex min-h-[44px] items-center text-caption text-bg transition-colors duration-[220ms] ease-brand hover:text-accent";
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
      download={href.endsWith(".pdf") ? "" : undefined}
    >
      {label}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const menu = [...primaryNav, { label: "Contact", href: "/contact" }];

  return (
    <footer className="footer-field">
      <div className="shell grid gap-y-14 pt-20 md:grid-cols-12 md:items-start md:gap-x-8 md:pt-28">
        <p className="max-w-[14ch] font-serif text-[clamp(1.65rem,2.3vw,2.35rem)] leading-[1.2] text-bg md:col-span-4">
          Good things deserve to happen.
        </p>

        <nav aria-label="Footer menu" className="md:col-span-3 md:col-start-7">
          <p className="label text-accent">Visit</p>
          <ul className="mt-3 flex flex-col">
            {menu.map((item) => (
              <li key={item.label}>
                <FooterLink href={item.href ?? "/"} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer links" className="md:col-span-3 md:col-start-10 md:mt-24">
          <p className="label text-accent">Elsewhere</p>
          <ul className="mt-3 flex flex-col">
            {footerNav.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-caption text-bg">
            © {year} {identity.fullName}
          </p>
        </nav>
      </div>

      {/* The name is a graphic crop. The copyright line above is the readable name. */}
      <div className="footer-monument" aria-hidden="true">
        <p>{identity.fullName}</p>
      </div>
    </footer>
  );
}
