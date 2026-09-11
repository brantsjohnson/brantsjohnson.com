// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the reusable "glass" surface used across the site: cards,
// the nav bar, and the chat panel. It draws a soft, see-through
// panel with a gentle blur, a hairline border, and a soft shadow,
// using the shared design tokens so every glass surface matches.
// It handles look only, not motion or content.
// ============================================

import type { ElementType, ReactNode } from "react";
import { clsx } from "clsx";

// THIS SECTION DOES: describe the options this surface accepts
type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  // Lets a caller render the panel as a different tag (for example a <nav> or <section>).
  as?: ElementType;
};

// THIS SECTION DOES: draw the glass surface using token-based classes
export function GlassPanel({ children, className, as: Tag = "div" }: GlassPanelProps) {
  return (
    <Tag
      className={clsx(
        "bg-glass border border-border-subtle shadow-glass rounded-panel", // token colors, border, shadow, and corner roundness
        "backdrop-blur-glass", // the soft see-through blur
        className
      )}
    >
      {children}
    </Tag>
  );
}
