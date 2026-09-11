// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a small rounded label used to mark status or category, like
// "Currently building" or "Beta". It comes in three quiet tones so it
// never competes with the real accent action on a screen.
// ============================================

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// THIS SECTION DOES: define the tone options
type BadgeTone = "neutral" | "accent" | "outline";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean; // show a small leading dot
  className?: string;
};

// THIS SECTION DOES: map each tone to its Tailwind classes (colors come from tokens)
const toneMap: Record<BadgeTone, string> = {
  neutral: "bg-black/[0.04] text-ink-soft border border-transparent",
  accent: "bg-brand/[0.08] text-brand border border-brand/20",
  outline: "bg-transparent text-ink-soft border border-line",
};

// THIS SECTION DOES: render the small label, with an optional leading dot
export function Badge({ children, tone = "neutral", dot = false, className = "" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-tight",
        toneMap[tone],
        className
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 rounded-full", tone === "accent" ? "bg-brand" : "bg-ink-soft")}
        />
      )}
      {children}
    </span>
  );
}
