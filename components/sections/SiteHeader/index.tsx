// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the sticky bar at the top of every public page. On the
// left it shows Brant's full name "Brant S. Johnson" as a serif
// wordmark (never a "BSJ" monogram) that links home. On the right
// it shows the main navigation: Home, BrantChat, Experience,
// Service, Leadership, Skills, About. "BrantChat" is not a page; it
// opens the chat panel. On narrow screens the links collapse into a
// labeled "Menu" button. The active page's link is shown in the
// accent color.
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { identity, primaryNav, secondaryNav } from "@/content/site-content";
import { openBrantChat } from "@/components/chatbot/chat-events";

export function SiteHeader() {
  // THIS SECTION DOES: know which page we are on, so the matching link can be highlighted
  const pathname = usePathname();
  // THIS SECTION DOES: remember whether the small-screen menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // THIS SECTION DOES: decide if a nav link points at the page we are currently on
  const isActive = (href?: string) =>
    href === "/" ? pathname === "/" : Boolean(href && pathname.startsWith(href));

  // THIS SECTION DOES: draw one nav link, either a page link or the chat opener
  const renderNavItem = (
    item: (typeof primaryNav)[number],
    onNavigate?: () => void
  ) => {
    const activeClass = "text-accent";
    const restClass = "text-text-primary hover:text-accent";

    if (item.kind === "chat") {
      return (
        <button
          key={item.label}
          type="button"
          onClick={() => {
            openBrantChat();
            onNavigate?.();
          }}
          className={clsx("text-body transition-colors", restClass)}
        >
          {item.label}
        </button>
      );
    }

    return (
      <Link
        key={item.label}
        href={item.href ?? "/"}
        onClick={onNavigate}
        aria-current={isActive(item.href) ? "page" : undefined}
        className={clsx(
          "text-body transition-colors",
          isActive(item.href) ? activeClass : restClass
        )}
      >
        {item.label}
      </Link>
    );
  };

  return (
    // --- The header is sticky and uses the glass look so it floats over content calmly ---
    <header className="sticky top-0 z-sticky border-b border-border-subtle bg-glass backdrop-blur-glass">
      <div className="shell flex items-center justify-between py-4">
        {/* THIS SECTION DOES: the full-name wordmark, linking home (the logo is the single Home affordance) */}
        <Link href="/" className="font-serif text-h3 tracking-tight text-text-primary">
          {identity.wordmark}
        </Link>

        {/* THIS SECTION DOES: the main navigation row, visible on wider screens */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((item) => renderNavItem(item))}
        </nav>

        {/* THIS SECTION DOES: the labeled menu button, shown only on narrow screens */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex items-center gap-2 text-body text-text-primary md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          Menu
        </button>
      </div>

      {/* THIS SECTION DOES: the stacked menu that opens on narrow screens */}
      {menuOpen && (
        <nav
          aria-label="Primary mobile"
          className="border-t border-border-subtle bg-glass backdrop-blur-glass md:hidden"
        >
          <div className="shell flex flex-col gap-4 py-6">
            {primaryNav.map((item) => renderNavItem(item, () => setMenuOpen(false)))}
            {/* The quieter pages sit below a divider so the main choices stay clear */}
            <div className="mt-2 border-t border-border-subtle pt-4">
              <div className="flex flex-col gap-4">
                {secondaryNav.map((item) => renderNavItem(item, () => setMenuOpen(false)))}
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
