// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a small proof "chip": one big number or word on top, with
// a short line of context under it (for example, "Sole PM" over
// "First and only product manager at Crew Finance"). The home page
// uses a row of these to show the volume of Brant's work at a glance.
// It only draws one chip; the page decides how many to show.
// ============================================

import { GlassPanel } from "@/components/motion/GlassPanel";

// THIS SECTION DOES: describe what one chip needs
type ChipProps = {
  value: string; // the big number or word
  label: string; // the short context line under it
};

// THIS SECTION DOES: draw one proof chip on a glass surface
export function Chip({ value, label }: ChipProps) {
  return (
    <GlassPanel className="h-full p-6">
      <div className="text-h2 font-serif text-accent">{value}</div>
      <p className="mt-2 text-caption text-text-secondary">{label}</p>
    </GlassPanel>
  );
}
