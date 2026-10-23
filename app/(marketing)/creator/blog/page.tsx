// ============================================
// WHAT THIS FILE DOES (plain English):
// The creator blog is the short public shelf. Drafts stay off.
// All writing still lives at /writing, which mirrors the publication.
// ============================================

import type { Metadata } from "next";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, creator, publishedWriting } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: publishedWriting[0].title,
  path: "/creator/blog",
});

export default function CreatorBlogPage() {
  return (
    <SectionFrame id="blog" kicker="Creator · Blog" title={creator.writing.title} pigment={area.pigment} plate={area.plate}>
      <ul className="grid gap-4">
        {publishedWriting.map((piece) => (
          <li key={piece.href} className="rounded-panel border border-border-subtle bg-surface p-6 shadow-glass">
            <p className="text-caption text-text-secondary">{piece.date}</p>
            <h2 className="mt-2 font-serif text-h3 text-ink">
              <a href={piece.href} className="underline decoration-accent decoration-2 underline-offset-4" target="_blank" rel="noopener noreferrer">
                {piece.title}
              </a>
            </h2>
          </li>
        ))}
      </ul>
      <p className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-8">
        <StoryLink href={creator.writing.all.href} track={creator.writing.all.track}>
          {creator.writing.all.text}
        </StoryLink>
        <StoryLink href={creator.writing.subscribe.href} track={creator.writing.subscribe.track}>
          {creator.writing.subscribe.text}
        </StoryLink>
      </p>
    </SectionFrame>
  );
}
