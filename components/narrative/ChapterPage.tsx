// ============================================
// WHAT THIS FILE DOES (plain English):
// One layout for every section page: the big gold title, the story
// stage with its tabs and photos, the sideways photo row, and the
// links to the neighboring sections. Each page hands it a chapter
// from content/chapters.ts.
// ============================================

import type { ReactNode } from "react";
import { ChapterHero } from "@/components/narrative/ChapterHero";
import { ChapterNext } from "@/components/narrative/ChapterNext";
import { PhotoStrip } from "@/components/narrative/PhotoStrip";
import { ScenePlayer } from "@/components/narrative/ScenePlayer";
import type { Chapter } from "@/content/chapters";
import { areas } from "@/content/narrative";

type ChapterPageProps = {
  chapter: Chapter;
  href: string; // the section's own route, so the next-links skip it
  extra?: ReactNode;
};

export function ChapterPage({ chapter, href, extra }: ChapterPageProps) {
  const area = areas.find((item) => item.href === href);
  const tint = area?.tint ?? "#e9bf85";

  return (
    <>
      <ChapterHero
        id={chapter.id}
        number={chapter.number || undefined}
        kicker={chapter.kicker}
        title={chapter.title}
        intro={chapter.intro}
        tint={tint}
      />
      <ScenePlayer label={chapter.title} scenes={chapter.scenes} tint={tint} />
      {extra ? <div className="shell mt-6">{extra}</div> : null}
      <PhotoStrip title={chapter.stripTitle} intro={chapter.stripIntro} photos={chapter.strip} tint={tint} />
      <ChapterNext current={area ? href : "/story"} />
    </>
  );
}
