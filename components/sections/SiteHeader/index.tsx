// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the bar at the top of every public page. It shows Brant's
// name and the six places in the menu: About, Work, Events,
// Community, Writing and Contact. On a narrow screen the menu opens
// as a full-screen list of large links. Escape closes it. The bar is
// quiet paper with a hairline, and a thin gold line fills as you scroll.
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { identity, primaryNav } from "@/content/site-content";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href?: string) => Boolean(href && (pathname === href || pathname.startsWith(`${href}/`)));

  return (
    <header className="sticky top-0 z-sticky border-b border-border-subtle bg-glass backdrop-blur-glass">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          data-track="link:home_wordmark:global"
          className="font-serif text-[1.7rem] leading-none tracking-tight text-ink"
          onClick={() => setMenuOpen(false)}
        >
          {identity.wordmark}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href ?? "/"}
              aria-current={isActive(item.href) ? "page" : undefined}
              data-track={`nav_item:${item.label.toLowerCase()}:global`}
              className={clsx(
                "label relative inline-flex min-h-[44px] items-center text-[0.72rem] text-ink transition-colors hover:text-accent-deep",
                "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-500",
                "hover:after:scale-x-100",
                isActive(item.href) && "after:scale-x-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          data-track="button:toggle_menu:global"
          className="label inline-flex min-h-[44px] items-center gap-3 text-ink md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
          <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
            <span className={clsx("h-px w-full bg-ink transition-transform duration-300", menuOpen && "translate-y-[3px] rotate-45")} />
            <span className={clsx("h-px w-full bg-ink transition-transform duration-300", menuOpen && "-translate-y-[3px] -rotate-45")} />
          </span>
        </button>
      </div>

      {reduce ? null : (
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-accent"
          style={{ scaleX }}
        />
      )}

      {menuOpen ? (
        <nav
          id="mobile-menu"
          aria-label="Primary mobile"
          className="fixed inset-x-0 bottom-0 top-[4.4rem] z-sticky overflow-y-auto bg-bg md:hidden"
        >
          <ul className="shell flex flex-col py-6">
            {primaryNav.map((item, index) => (
              <li key={item.label} className="border-b border-border-subtle">
                <Link
                  href={item.href ?? "/"}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 py-5 font-serif text-[2.4rem] leading-none text-ink"
                >
                  <span className="label text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
