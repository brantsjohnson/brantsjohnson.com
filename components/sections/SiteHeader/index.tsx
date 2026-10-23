// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the sticky bar at the top of every public page, including home.
// It shows Brant's name and the rooms of the site.
// On a narrow screen the links collapse into a Menu button.
// Escape closes that menu. The bar is a solid paper strip.
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { identity, primaryNav, type NavItem } from "@/content/site-content";

type SiteHeaderProps = {
  showWriting?: boolean; // true only when at least two real pieces exist
};

export function SiteHeader({ showWriting = false }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const ask = primaryNav.filter((item) => item.href === "/ask");
  const rest = primaryNav.filter((item) => item.href !== "/ask");
  const nav: NavItem[] = [
    ...rest,
    ...(showWriting ? [{ label: "Writing", kind: "route" as const, href: "/writing" }] : []),
    ...ask,
  ];

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
    <header className="sticky top-0 z-sticky border-b border-border-subtle bg-bg">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <Link href="/" data-track="link:home_wordmark:global" className="font-serif text-h3 text-ink">
          {identity.wordmark}
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
