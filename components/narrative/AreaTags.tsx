// ============================================
// WHAT THIS FILE DOES (plain English):
// A project can belong to more than one part of the story.
// These small chips jump to the other part.
// ============================================

"use client";

import { focusHash } from "@/components/narrative/focus-hash";
import type { AreaTag } from "@/content/narrative";

export function AreaTags({ tags }: { tags: AreaTag[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={`${tag.label}-${tag.href}`}>
          <a
            href={tag.href}
            onClick={() => focusHash(tag.href)}
            data-track={`link:tag_${tag.label.toLowerCase()}:home`}
            className="label inline-flex min-h-[44px] items-center rounded-control border border-border-subtle px-3 text-ink"
          >
            {tag.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
