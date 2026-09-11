// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the small uppercase label that sits above a heading (like
// "About" or "Currently building"). It uses the mono font so it reads as
// a quiet category tag, not a title. Text only, no layout.
// ============================================

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

// THIS SECTION DOES: render one small spaced-out uppercase label
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={cn("font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft", className)}>
      {children}
    </p>
  );
}
