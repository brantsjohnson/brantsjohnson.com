"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { nav, site } from "@/content/site";

/**
 * Site header / navigation.
 *
 * Purpose: the sticky top bar with the name (linking home) and the page links.
 * It is a client component because it manages the open/closed state of the
 * mobile menu. The active page is highlighted so visitors always know where
 * they are. Links come from content/site.ts so the menu stays in sync with the
 * rest of the site.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // A link is "active" when the current path matches or sits under it.
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {site.shortName}
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-accent ${
                isActive(item.href)
                  ? "font-medium text-accent"
                  : "text-ink-soft"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile menu panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-ink/10 md:hidden">
          <Container className="flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-2 py-3 text-base transition-colors hover:bg-ink/5 ${
                  isActive(item.href)
                    ? "font-medium text-accent"
                    : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
