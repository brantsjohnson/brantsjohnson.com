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
import { ScrollProgress } from "@/components/narrative/ScrollProgress";
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
          "label inline-flex min-h-[44px] items-center text-[0.72rem] transition-colors hover:text-accent",
          isActive(item.href) ? "text-accent" : "text-ink",
          item.href === "/ask" && "rounded-control border border-accent px-3 text-accent hover:bg-accent hover:text-on-gold"
        )}
      >
        {item.href === "/ask" ? "Ask about me" : item.label}
      </Link>
    );
  };

  const links = nav;

  return (
    <header className="sticky top-0 z-sticky border-b border-border-subtle bg-glass backdrop-blur-glass">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <Link href="/" data-track="link:home_wordmark:global" className="group inline-flex items-center gap-3 font-serif text-[1.6rem] leading-none text-ink">
          <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rotate-45 bg-accent transition-transform duration-500 group-hover:rotate-[225deg]" />
          {identity.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          {links.map((item) => renderNavItem(item))}
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-track="button:toggle_menu:global"
            className="label inline-flex min-h-[44px] items-center gap-2 text-ink"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
            Menu
          </button>
        </div>
      </div>

      <ScrollProgress />

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
