// ============================================
// WHAT THIS FILE DOES (plain English):
// Where he comes from, in the order the story already told it.
// /about sends people here.
// ============================================

import type { Metadata } from "next";
import { CopyText } from "@/components/narrative/CopyText";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { contactBlock, story } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Story",
  description: "I grew up in Vernal, Utah.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <SectionFrame id="story" kicker="Story" title={story.title} pigment="#122e48" plate="#0c1f30">
      <div className="flex flex-col gap-6">
        {story.paragraphs.map((parts, index) => (
          <CopyText key={index} parts={parts} />
        ))}
      </div>
      <p className="mt-10 max-w-reading text-body text-text-secondary">{contactBlock.line}</p>
      <p className="mt-4">
        <StoryLink href="/contact" track="link:contact:story">
          {contactBlock.title}
        </StoryLink>
      </p>
    </SectionFrame>
  );
}
