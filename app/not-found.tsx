// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the page people see when a URL does not exist. It offers
// a way home. It does not stand in for a page that is still being written.
// ============================================

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-[70vh] flex-col justify-center py-16">
      <p className="text-caption uppercase tracking-[0.18em] text-text-secondary">404</p>
      <h1 className="mt-4 font-serif text-h1 text-ink">That page is not here.</h1>
      <p className="mt-4 text-body text-text-secondary">The link may be old, or the address may be mistyped.</p>
      <p className="mt-8">
        <Link href="/" data-track="link:home:not-found" className="underline decoration-accent underline-offset-4">
          Back home
        </Link>
      </p>
    </main>
  );
}
