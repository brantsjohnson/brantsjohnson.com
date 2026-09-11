// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws a list of roles as a clean timeline: for each entry, the
// organization and role, the dates when known, and a short summary.
// The Experience, Service, and Leadership pages all use this one
// component so those pages look and behave the same (docs/14 §14).
// ============================================

import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { GlassPanel } from "@/components/motion/GlassPanel";
import type { TimelineEntry } from "@/content/site-content";

// THIS SECTION DOES: describe what the timeline needs
type TimelineProps = {
  entries: TimelineEntry[];
};

// THIS SECTION DOES: draw each role as a glass card that reveals in a gentle sequence
export function Timeline({ entries }: TimelineProps) {
  return (
    <StaggerChildren className="shell flex flex-col gap-6 pb-16">
      {entries.map((entry) => (
        <StaggerItem key={`${entry.org}-${entry.role}`}>
          <GlassPanel className="p-6 md:p-8">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h2 className="text-h3">{entry.org}</h2>
              {/* Dates are shown only when we know them, and never contain a dash */}
              {entry.dates && (
                <span className="text-caption text-text-secondary">{entry.dates}</span>
              )}
            </div>
            <p className="mt-1 text-body font-medium text-accent">{entry.role}</p>
            <p className="mt-3 max-w-reading text-body text-text-secondary">{entry.summary}</p>
          </GlassPanel>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
