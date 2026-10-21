// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the sticky bar at the top of every public page. It shows
// Brant's full name, the page links, and one Ask link.
// On a narrow screen the links collapse into a Menu button.
// The bar is a light glass strip so the page can scroll under it.
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { identity, photos, primaryNav, type NavItem } from "@/content/site-content";

type SiteHeaderProps = {
  showWriting?: boolean; // true only when at least two real pieces exist
};

export function SiteHeader({ showWriting = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav: NavItem[] = showWriting
    ? [
        ...primaryNav.slice(0, 3),
        { label: "Writing", kind: "route", href: "/writing" },
        ...primaryNav.slice(3),
      ]
    : primaryNav;

  const isActive = (href?: string) =>
    href === "/" ? pathname === "/" : Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));

  const renderNavItem = (item: NavItem, onNavigate?: () => void) => {
    return (
      <Link
        key={item.label}
        href={item.href ?? "/"}
        onClick={onNavigate}
        aria-current={isActive(item.href) ? "page" : undefined}
        data-track={`nav_item:${item.label.toLowerCase().replace(/[^a-z]+/g, "_")}:global`}
        className={clsx(
          "inline-flex min-h-[44px] items-center text-caption text-ink",
          isActive(item.href) && "underline decoration-accent decoration-2 underline-offset-8"
        )}
      >
        {item.href === "/ask" ? "Ask about me →" : item.label}
      </Link>
    );
  };

  const links = nav;

  return (
    <header className="sticky top-0 z-sticky border-b border-border-subtle bg-glass backdrop-blur-glass">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <Link href="/" data-track="link:home_wordmark:global" className="flex items-center gap-3">
          <Image
            src={photos.logo.src}
            alt={photos.logo.alt}
            width={photos.logo.width}
            height={photos.logo.height}
            className="h-11 w-11"
          />
          <span className="font-serif text-h3 text-ink">{identity.wordmark}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
          {links.map((item) => renderNavItem(item))}
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-track="button:toggle_menu:global"
            className="inline-flex min-h-[44px] items-center gap-2 text-body text-ink"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav aria-label="Primary mobile" className="border-t border-border-subtle bg-bg xl:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {nav.map((item) => renderNavItem(item, () => setMenuOpen(false)))}
          </div>
        </nav>
      )}
    </header>
  );
}
