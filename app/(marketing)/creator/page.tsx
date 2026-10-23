// ============================================
// WHAT THIS FILE DOES (plain English):
// The creator room is a short hall. Poetry, the blog, and the Crew
// brand each have their own page. BackLocal stays here as a note.
// Theater lives with Performer, and the intro still points there.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { AreaRail } from "@/components/narrative/AreaRail";
import { AreaTags } from "@/components/narrative/AreaTags";
import { CopyText } from "@/components/narrative/CopyText";
import { SectionFrame } from "@/components/narrative/SectionFrame";
import { StoryLink } from "@/components/narrative/StoryLink";
import { areas, creator, publishedWriting } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

const area = areas[1];

const doors = [
  { href: "/creator/poetry", title: "Poetry", line: creator.poetry.intro, track: "link:poetry:creator" },
  { href: "/creator/blog", title: "Blog", line: publishedWriting[0].title, track: "link:blog:creator" },
  { href: "/creator/crew", title: "Crew brand", line: "I drew the Crew brand on an iPad.", track: "link:crew:creator" },
];

export const metadata: Metadata = pageMetadata({
  title: "Creator",
  description: area.deck,
  path: "/creator",
});

export default function CreatorPage() {
  return (
    <SectionFrame id="creator" kicker="02 · Creator" title={creator.title} pigment={area.pigment} plate={area.plate}>
      <CopyText parts={creator.intro} />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {doors.map((door) => (
          <li key={door.href} className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-panel"
              style={{ background: area.plate }}
            />
            <Link
              href={door.href}
              data-track={door.track}
              className="door-card relative flex h-full min-h-[7.5rem] flex-col justify-between rounded-panel p-5 text-on-hero shadow-glass"
              style={{ background: area.pigment }}
            >
              <span className="font-serif text-h2 text-on-hero">{door.title}</span>
              <span className="line-clamp-3 text-caption text-on-hero/90">{door.line}</span>
            </Link>
          </li>
        ))}
      </ul>
      <article id="backlocal" className="mt-8 scroll-mt-24 rounded-panel border border-border-subtle bg-surface p-6 shadow-glass">
        <h2 className="font-serif text-h3 text-ink">{creator.backlocal.title}</h2>
        <div className="mt-4">
          <AreaTags tags={creator.backlocal.tags} />
        </div>
        <p className="mt-4 max-w-reading text-body text-text-secondary">{creator.backlocal.body}</p>
        <p className="mt-4">
          <StoryLink href={creator.backlocal.link.href} track={creator.backlocal.link.track}>
            {creator.backlocal.link.text}
          </StoryLink>
        </p>
      </article>
      <AreaRail current="/creator" />
    </SectionFrame>
  );
}
