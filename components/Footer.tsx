import Link from "next/link";
import { Container } from "./Container";
import { nav, site } from "@/content/site";

/**
 * Site footer.
 *
 * Purpose: closes every page with the contact email, the same navigation links
 * as the header, and a copyright line. It reads from content/site.ts so it
 * always matches the rest of the site.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-ink/10 py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-serif text-lg font-semibold text-ink">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-ink-muted">{site.role}</p>
          <a
            href={`mailto:${site.email}`}
            className="link mt-3 inline-block text-sm"
          >
            {site.email}
          </a>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>

      <Container className="mt-8">
        <p className="text-xs text-ink-muted">
          © {year} {site.name}. Built with Next.js.
        </p>
      </Container>
    </footer>
  );
}
