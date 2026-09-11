// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the footer at the bottom of every public page. It repeats
// the full-name wordmark, offers the quieter secondary links
// (Projects, Writing, Photography, Civic Engagement, Contact), and
// shows a small copyright line. Contact appears here as a link only;
// the actual contact details live on the Contact page, so contact
// information is never duplicated (the "contact once" rule, docs/03).
// ============================================

import Link from "next/link";
import { identity, secondaryNav } from "@/content/site-content";

export function SiteFooter() {
  // THIS SECTION DOES: show the current year so the copyright stays current on its own
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border-subtle">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        {/* The wordmark again, quietly, tying the bottom back to the top */}
        <Link href="/" className="font-serif text-h3 text-text-primary">
          {identity.wordmark}
        </Link>

        {/* The quieter pages, grouped away from the main navigation */}
        <nav aria-label="Secondary" className="flex flex-wrap gap-x-6 gap-y-3">
          {secondaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href ?? "/"}
              className="text-caption text-text-secondary transition-colors hover:text-accent"
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
