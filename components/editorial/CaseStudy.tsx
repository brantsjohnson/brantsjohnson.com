// ============================================
// WHAT THIS FILE DOES (plain English):
// The page for one project or one community story. It has the big
// title, a short lead, a quiet row of facts (role, dates, place),
// the story rows with their photos, an optional photo gallery, and a
// way back to the list. The Projects and Community pages share it.
// ============================================

import Link from "next/link";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { StoryRow, type Story } from "@/components/editorial/StoryRow";
import { StoryLink } from "@/components/narrative/StoryLink";
import type { Photo } from "@/content/photos";

type CaseStudyProps = {
  id: string;
  label: string;
  title: string;
  lead: string;
  meta: { label: string; value: string }[];
  stories: Story[];
  gallery?: Photo[];
  galleryTitle?: string;
  links?: { text: string; href: string; track: string }[];
  back: { href: string; label: string };
};

export function CaseStudy({ id, label, title, lead, meta, stories, gallery, galleryTitle = "More photos", links, back }: CaseStudyProps) {
  return (
    <>
      <PageHeader id={id} label={label} title={title} lead={lead} />
      {meta.length ? (
        <div className="shell">
          <dl className="grid gap-6 border-y border-border-subtle py-6 sm:grid-cols-2 lg:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="label text-[0.66rem] text-text-secondary">{item.label}</dt>
                <dd className="m-0 mt-1 font-serif text-[1.3rem] text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      <div className="mt-8">
        {stories.map((story, index) => (
          <StoryRow key={story.id} story={story} flip={index % 2 === 1} />
        ))}
      </div>
      {gallery ? <Gallery title={galleryTitle} photos={gallery} /> : null}
      <div className="shell border-t border-border-subtle py-12">
        {links?.length ? (
          <ul className="mb-8 flex flex-wrap gap-x-10 gap-y-3">
            {links.map((item) => (
              <li key={item.href}>
                <StoryLink href={item.href} track={item.track}>
                  {item.text}
                </StoryLink>
              </li>
            ))}
          </ul>
        ) : null}
        <Link
          href={back.href}
          className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep"
        >
          <span aria-hidden="true">←</span> {back.label}
        </Link>
      </div>
    </>
  );
}
