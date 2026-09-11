// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one writing row (a blog post or a poem). On the Writings
// page it is a quiet list item. If there is no slug yet it is not a
// link. Poetry rows use a slightly more open type treatment.
// ============================================

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Writing } from "@/content/writings";
import { cn } from "@/lib/utils/cn";

type WritingCardProps = {
  writing: Writing;
};

// THIS SECTION DOES: render a writing as a linked row, or a still row if it has no URL yet
export function WritingCard({ writing }: WritingCardProps) {
  const href = writing.kind === "Poetry" ? `/poetry/${writing.slug}` : `/blog/${writing.slug}`;
  const classes = cn(
    "group flex items-start justify-between gap-6 rounded-control border border-transparent px-4 py-4 transition-colors duration-150 hover:border-line hover:bg-surface",
    writing.kind === "Poetry" && "py-6"
  );

  const inner = (
    <>
      <div>
        <h3 className={cn("text-[15px] font-medium tracking-tight text-ink", writing.kind === "Poetry" && "text-[18px]")}>
          {writing.title}
        </h3>
        <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-soft">{writing.excerpt}</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft">{writing.date}</p>
      </div>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand"
        aria-hidden="true"
      />
    </>
  );

  return (
    <Link href={href} data-track={`card:open_writing:${writing.slug}`} className={cn("focus-ring", classes)}>
      {inner}
    </Link>
  );
}
