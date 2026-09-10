// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one row on a work or leadership timeline: a role, an
// organization, a date range, and the bullet points describing the
// work. A small brand-colored dot and a vertical line connect it to
// the next row so the list reads as a path through time.
// ============================================

import type { ExperienceEntry } from "@/content/experience";

type TimelineItemProps = {
  entry: ExperienceEntry;
  isLast?: boolean;
};

// THIS SECTION DOES: render one timeline row with the connector line and its bullets
export function TimelineItem({ entry, isLast = false }: TimelineItemProps) {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-2 h-2 w-2 rounded-full border border-brand/40 bg-brand"
      />
      {!isLast && (
        <span aria-hidden="true" className="absolute bottom-[-24px] left-[9px] top-5 w-px bg-line" />
      )}

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h3 className="text-[15px] font-medium tracking-tight text-ink">{entry.role}</h3>
        <span className="text-sm text-ink-soft">{entry.org}</span>
      </div>
      {entry.orgNote && <p className="mt-0.5 text-[13px] text-ink-soft">{entry.orgNote}</p>}
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        {entry.period}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <ul className="mt-3 grid gap-1.5">
        {entry.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
            <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-soft/50" />
            {bullet}
          </li>
        ))}
      </ul>
    </li>
  );
}
