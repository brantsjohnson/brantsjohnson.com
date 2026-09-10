// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the shared top of an inner page: a small category label, a
// large title, and an optional short description. Using it on every
// inner page keeps the reading order the same from About to Contact.
// ============================================

import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils/cn";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

// THIS SECTION DOES: render the eyebrow, title, description, and optional actions in a stable order
export function PageHeader({ eyebrow, title, description, actions, className = "" }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-2 font-heading text-h1 font-semibold tracking-tight text-ink">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </header>
  );
}
