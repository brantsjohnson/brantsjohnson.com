// ============================================
// WHAT THIS FILE DOES (plain English):
// Shared lists for a story section: ordinary work bullets at body
// type size, and a smaller labeled list for research models. Crew
// uses both. Other pages can leave them off.
// ============================================

import React from "react";
import { clsx } from "clsx";

// THIS SECTION DOES: draw the optional bullet list at the same body type
// size as the paragraphs, so a section stays full without a new card layout.
export function StoryBullets({ bullets, className = "" }: { bullets: string[]; className?: string }) {
  if (bullets.length === 0) return null;
  return (
    <ul className={clsx("mt-5 max-w-reading list-disc space-y-3 pl-5 text-body text-text-secondary", className)}>
      {bullets.map((bullet) => (
        <li key={bullet.slice(0, 80)}>{bullet}</li>
      ))}
    </ul>
  );
}

// THIS SECTION DOES: draw a compact research-model list. It stays smaller
// than the approved outcome stats so modeled figures are not mistaken for KPIs.
export function StoryModeled({ modeled }: { modeled: { heading: string; items: string[] } }) {
  if (modeled.items.length === 0) return null;
  return (
    <div className="mt-8 max-w-reading">
      <p className="label text-[0.66rem] text-accent-deep">{modeled.heading}</p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-caption text-text-secondary">
        {modeled.items.map((item) => (
          <li key={item.slice(0, 80)}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
