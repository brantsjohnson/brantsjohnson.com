// ============================================
// WHAT THIS FILE DOES (plain English):
// A project can belong to more than one part of the story.
// These small chips open the other part.
// ============================================

import Link from "next/link";
import type { AreaTag } from "@/content/narrative";

export function AreaTags({ tags }: { tags: AreaTag[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={`${tag.label}-${tag.href}`}>
          <Link
            href={tag.href}
            data-track={`link:tag_${tag.label.toLowerCase()}:story`}
            className="label inline-flex min-h-[44px] items-center rounded-control border border-border-subtle px-3 text-ink"
          >
            {tag.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
