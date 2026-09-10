// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the friendly "nothing here yet" box shown when a section has
// no content loaded (for example, no photos or posts). It keeps empty
// pages from feeling broken by saying, briefly and honestly, that
// content is on the way.
// ============================================

import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

// THIS SECTION DOES: render a dashed, centered box with an icon, a title, and an optional line
export function EmptyState({ title, description, icon, className = "" }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-panel border border-dashed border-line bg-surface/50 px-8 py-14 text-center",
        className
      )}
    >
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.04] text-ink-soft">
        {icon || <Inbox className="h-5 w-5" aria-hidden="true" />}
      </span>
      <h3 className="text-[15px] font-medium text-ink">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}
