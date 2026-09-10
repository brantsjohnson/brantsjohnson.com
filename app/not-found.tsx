// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the page people see when a URL does not match any real
// route. It says the page is missing and offers a way back home.
// ============================================

import Link from "next/link";

// THIS SECTION DOES: show a short not-found message and a home link
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">404</p>
        <h1 className="mt-3 font-heading text-h1 font-semibold tracking-tight text-ink">Page not found</h1>
        <p className="mt-3 text-ink-soft">That address does not match a page on this site.</p>
        <Link
          href="/"
          data-track="link:go_home:not_found"
          className="focus-ring mt-8 inline-flex rounded-control bg-brand px-5 py-3 text-sm font-medium text-on-accent"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
