// ============================================
// WHAT THIS FILE DOES (plain English):
// Where he comes from, as short panels with photos instead of one
// long column. /about sends people here.
// ============================================

import type { Metadata } from "next";
import { ChapterPage } from "@/components/narrative/ChapterPage";
import { StoryLink } from "@/components/narrative/StoryLink";
import { storyChapter } from "@/content/chapters";
import { contactBlock } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Story",
  description: "I grew up in Vernal, Utah.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <ChapterPage
      chapter={storyChapter}
      href="/story"
      extra={
        <div>
          <p className="max-w-reading text-body text-text-secondary">{contactBlock.line}</p>
          <p className="mt-3">
            <StoryLink href="/contact" track="link:contact:story">
              {contactBlock.title}
            </StoryLink>
          </p>
        </div>
      }
    />
  );
}
