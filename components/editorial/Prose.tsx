// ============================================
// WHAT THIS FILE DOES (plain English):
// This turns a list of paragraphs into readable text. A paragraph
// can be plain words, or words with links inside the sentence.
// ============================================

import { CopyText } from "@/components/narrative/CopyText";
import type { CopyPart } from "@/content/narrative";

export type Paragraph = string | CopyPart[];

export function Prose({ body, className = "" }: { body: Paragraph[]; className?: string }) {
  return (
    <div className={`flex max-w-reading flex-col gap-5 ${className}`}>
      {body.map((paragraph, index) =>
        typeof paragraph === "string" ? (
          <p key={index} className="text-body text-text-secondary">
            {paragraph}
          </p>
        ) : (
          <CopyText key={index} parts={paragraph} className="text-body text-text-secondary" />
        )
      )}
    </div>
  );
}
