// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer. It repeats the full name as a way home and
// lists the same pages as the header, in a quieter row. The email
// address is not repeated here. It lives on the Contact page.
// The year updates on its own.
// ============================================

import Link from "next/link";
import { identity, primaryNav } from "@/content/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const links = primaryNav.filter((item) => item.kind === "route" && item.href !== "/");

  return (
    <footer className="mt-8 border-t border-border-subtle bg-bg">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <Link href="/" className="font-serif text-h2 text-ink">
          {identity.wordmark}
        </Link>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href ?? "/"}
              data-track={`nav_item:${item.label.toLowerCase().replace(/[^a-z]+/g, "_")}:footer`}
              className="text-caption text-text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="shell pb-10 text-caption text-text-secondary">
        {year} {identity.fullName}
      </div>
    </footer>
  );
}
