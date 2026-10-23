// ============================================
// WHAT THIS FILE DOES (plain English):
// On a wide screen this is the sticky left column: name, role,
// section links, and LinkedIn. The link for the section in view
// is marked. On a phone it becomes a top bar with a Menu button
// that opens the same list.
// ============================================

"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { focusHash } from "@/components/narrative/focus-hash";
import { identity } from "@/content/site-content";
import { storyNav } from "@/content/narrative";

const sectionIds = storyNav.map((item) => item.href.slice(1));

export function HomeNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const mark = () => {
      const offset = window.innerWidth >= 1024 ? 32 : 72;
      let current = "";
      for (const id of sectionIds) {
        const node = document.getElementById(id);
        if (!node) continue;
        if (node.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    mark();
    window.addEventListener("scroll", mark, { passive: true });
    window.addEventListener("resize", mark);
    return () => {
      window.removeEventListener("scroll", mark);
      window.removeEventListener("resize", mark);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = (onNavigate?: () => void) =>
    storyNav.map((item) => {
      const id = item.href.slice(1);
      const isActive = active === id;
      return (
        <a
          key={item.href}
          href={item.href}
          aria-current={isActive ? "location" : undefined}
          onClick={() => {
            focusHash(item.href);
            onNavigate?.();
          }}
          data-track={`nav_item:${id}:home`}
          className={clsx(
            "inline-flex min-h-[44px] items-center text-caption text-ink",
            isActive && "underline decoration-accent decoration-2 underline-offset-8"
          )}
        >
          {item.label}
        </a>
      );
    });

  return (
    <div className="lg:sticky lg:top-8 lg:z-sticky lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
      <div className="sticky top-0 z-sticky -mx-[var(--page-gutter)] border-b border-border-subtle bg-bg px-[var(--page-gutter)] lg:hidden">
        <div className="flex items-center justify-between gap-4 py-3">
          <a href="#top" onClick={() => focusHash("#top")} className="font-serif text-h3 text-ink">
            {identity.wordmark}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="story-menu"
            className="inline-flex min-h-[44px] items-center gap-2 text-body text-ink"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            Menu
          </button>
        </div>
        {open && (
          <nav id="story-menu" aria-label="Sections" className="flex flex-col pb-4">
            {links(() => setOpen(false))}
            <a
              href={identity.linkedin}
              className="inline-flex min-h-[44px] items-center text-caption text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        )}
      </div>

      <aside className="hidden lg:block">
        <a href="#top" onClick={() => focusHash("#top")} className="font-serif text-h3 text-ink">
          {identity.wordmark}
        </a>
        <p className="label mt-4 text-text-secondary">Senior Product Manager</p>
        <nav aria-label="Sections" className="mt-8 flex flex-col">
          {links()}
        </nav>
        <a
          href={identity.linkedin}
          className="mt-6 inline-flex min-h-[44px] items-center text-caption text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </aside>
    </div>
  );
}
