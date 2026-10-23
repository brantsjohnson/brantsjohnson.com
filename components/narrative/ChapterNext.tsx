// ============================================
// WHAT THIS FILE DOES (plain English):
// The end of a section page. Two big links open the section before
// and the section after, in the fixed order: Product, Creator,
// Performer, Entrepreneur, Activist. Each wears its own color glow.
// ============================================

import Link from "next/link";
import { areas } from "@/content/narrative";

export function ChapterNext({ current }: { current: string }) {
  const index = areas.findIndex((area) => area.href === current);
  const prev = index >= 0 ? areas[(index - 1 + areas.length) % areas.length] : null;
  const next = index >= 0 ? areas[(index + 1) % areas.length] : areas[0];
  const items = [
    ...(prev && index >= 0 ? [{ area: prev, label: "Before", arrow: "←", align: "text-left" }] : []),
    { area: next, label: index >= 0 ? "Next" : "Start with", arrow: "→", align: "text-right md:text-left" },
  ];

  return (
    <nav aria-label="Other parts of the story" className="shell grid gap-4 py-12 md:grid-cols-2">
      {items.map(({ area, label, arrow, align }) => (
        <Link
          key={area.href}
          href={area.href}
          data-track={`link:next_${area.id}:${current.replace("/", "") || "home"}`}
          className={`group relative isolate flex min-h-[9rem] flex-col justify-between overflow-hidden rounded-panel border border-border-subtle p-6 transition-colors hover:border-accent ${align}`}
          style={{ background: `linear-gradient(135deg, ${area.pigment}, var(--color-surface))` }}
        >
          <span
            aria-hidden="true"
            className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full opacity-50 blur-2xl transition-opacity group-hover:opacity-90"
            style={{ background: area.tint }}
          />
          <span className="label text-accent">
            {label} · {String(areas.indexOf(area) + 1).padStart(2, "0")}
          </span>
          <span className="flex items-end justify-between gap-4">
            <span className="font-serif text-[clamp(2rem,4vw,3.2rem)] leading-none text-ink">{area.short}</span>
            <span aria-hidden="true" className="font-serif text-3xl text-accent transition-transform duration-300 group-hover:translate-x-1">
              {arrow}
            </span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
