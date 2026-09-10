// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws a thin hairline separator between blocks of content. It can
// be a plain line or a line with a small centered label. It carries no
// content of its own.
// ============================================

import { cn } from "@/lib/utils/cn";

type DividerProps = {
  label?: string; // optional word shown in the middle of the line
  className?: string;
};

// THIS SECTION DOES: render either a plain hairline or a labeled one
export function Divider({ label, className = "" }: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)} role="separator">
        <span className="h-px flex-1 bg-line" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{label}</span>
        <span className="h-px flex-1 bg-line" />
      </div>
    );
  }

  return <hr className={cn("h-px border-0 bg-line", className)} />;
}
