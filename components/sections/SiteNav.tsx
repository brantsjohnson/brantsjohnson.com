"use client";

// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the glass navigation bar that sticks to the top of every
// public page. It shows the site name and the main menu, highlights the
// page you are currently on, and collapses into a Menu button on small
// screens. The menu items come from content/site.ts so there is one
// place to edit them.
// ============================================

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

// THIS SECTION DOES: decide whether a menu link points at the page we are on right now
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // Writings groups blog and poetry, so those URLs count as the Writings tab too.
  if (href === "/writings") {
    return (
      pathname === "/writings" ||
      pathname.startsWith("/writings/") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/poetry")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

// THIS SECTION DOES: render the sticky glass nav with a desktop row and a mobile drop-down
export function SiteNav() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false); // is the small-screen menu showing?

  return (
    <header className="sticky top-0 z-40">
      <Container as="div" className="pt-6">
        <nav
          aria-label="Primary"
          className="glass rounded-panel border border-line shadow-glass"
        >
          <div className="flex items-center justify-between gap-6 px-5 py-3">
            {/* THIS SECTION DOES: the site name doubles as the link back home */}
            <Link
              href="/"
              data-track="nav_item:go_home:global"
              className="focus-ring rounded-control font-heading text-[15px] font-medium tracking-tight text-ink"
            >
              {site.name}
            </Link>

            {/* THIS SECTION DOES: the full menu row, shown on wide screens */}
            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      data-track={`nav_item:${link.label.toLowerCase().replace(/\s+/g, "_")}:global`}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "focus-ring block rounded-control px-3 py-2 font-heading text-[13.5px] transition-colors duration-200 hover:bg-black/[0.04]",
                        active ? "text-ink" : "text-ink-soft hover:text-ink"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* THIS SECTION DOES: the Menu / Close toggle, shown only on small screens */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-control border border-line text-ink transition-colors hover:bg-black/[0.04] lg:hidden"
            >
              {open ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </div>

          {/* THIS SECTION DOES: the stacked menu that opens on small screens */}
          {open && (
            <ul id="mobile-nav" className="grid gap-0.5 border-t border-line px-3 pb-3 pt-2 lg:hidden">
              {nav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-control px-3 py-2.5 font-heading text-[15px] transition-colors hover:bg-black/[0.04]",
                        active ? "text-ink" : "text-ink-soft"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </Container>
    </header>
  );
}
