// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws a vertical timeline from a list of roles. The About page
// uses it twice: once for paid work, and once for leadership, because
// both lists share the same shape.
// ============================================

import type { ExperienceEntry } from "@/content/experience";
import { TimelineItem } from "@/components/sections/TimelineItem";

type ExperienceTimelineProps = {
  entries: ExperienceEntry[];
};

// THIS SECTION DOES: render the roles as an ordered list of timeline rows
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <ol className="grid gap-6">
      {entries.map((entry, index) => (
        <TimelineItem
          key={`${entry.org}-${entry.role}-${entry.period}`}
          entry={entry}
          isLast={index === entries.length - 1}
        />
      ))}
    </ol>
  );
}
