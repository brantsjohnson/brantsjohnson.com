// ============================================
// WHAT THIS FILE DOES (plain English):
// This turns one paragraph of story copy into a sentence with
// the in-line links left in place.
// ============================================

import { StoryLink } from "@/components/narrative/StoryLink";
import type { CopyPart } from "@/content/narrative";

export function CopyText({ parts, className }: { parts: CopyPart[]; className?: string }) {
  return (
    <p className={className ?? "max-w-reading text-body text-text-secondary"}>
      {parts.map((part, index) =>
        part.type === "text" ? (
          <span key={index}>{part.text}</span>
        ) : (
          <StoryLink key={index} href={part.href} track={part.track}>
            {part.text}
          </StoryLink>
        )
      )}
    </p>
  );
}
