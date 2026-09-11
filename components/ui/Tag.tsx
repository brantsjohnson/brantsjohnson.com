// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a small monospaced chip used for keyword tags on projects
// (like "Product" or "Events"). It is display only, meant to sit in a
// row under a title. It is not a button.
// ============================================

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
};

// THIS SECTION DOES: render one small uppercase keyword chip
export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border border-line bg-surface/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}
