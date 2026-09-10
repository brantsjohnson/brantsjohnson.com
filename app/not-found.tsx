import Link from "next/link";
import { Container } from "@/components/Container";

/**
 * 404 page.
 *
 * Purpose: a friendly, on-brand message when a URL doesn't exist, with a link
 * back home so visitors are never stuck.
 */
export default function NotFound() {
  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-6xl font-semibold text-ink">404</p>
      <p className="mt-4 text-lg text-ink-soft">
        This page wandered off. Let&apos;s get you back.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
      >
        Back home
      </Link>
    </Container>
  );
}
