// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the reusable "glass" surface: a see-through, softly blurred
// panel with a hairline border and a soft shadow. Cards, the nav, and
// feature blocks all sit on one of these so the glass look is identical
// across the whole site. It only provides the surface, not the content.
// ============================================

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// THIS SECTION DOES: define padding sizes and which HTML tag to render
type GlassPanelProps = {
  children: ReactNode;
  as?: "div" | "section" | "aside" | "article";
  padding?: "none" | "sm" | "md" | "lg";
  elevated?: boolean; // use the deeper shadow, for the main feature panel
  className?: string;
};

// THIS SECTION DOES: map the padding sizes to Tailwind classes (8px grid)
const paddingMap: Record<NonNullable<GlassPanelProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

// THIS SECTION DOES: render the glass surface with the chosen padding and shadow depth
export function GlassPanel({
  children,
  as: Tag = "div",
  padding = "md",
  elevated = false,
  className = "",
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        "glass rounded-panel border border-line",
        elevated ? "shadow-lift" : "shadow-glass",
        paddingMap[padding],
        className
      )}
    >
      {children}
    </Tag>
  );
}
