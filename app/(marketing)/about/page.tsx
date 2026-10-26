// ============================================
// WHAT THIS FILE DOES (plain English):
// The About page: a personal introduction with his photo, a few
// short stories (how he got here, parties, the pre-college years)
// with links to the deeper pages, and a small photo gallery.
// ============================================

import type { Metadata } from "next";
import { Figure } from "@/components/editorial/Figure";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { StoryRow } from "@/components/editorial/StoryRow";
import { StoryLink } from "@/components/narrative/StoryLink";
import { aboutGallery, aboutIntro, aboutStories } from "@/content/about";
import { aboutPhoto } from "@/content/photos";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutIntro.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader id="about" label={aboutIntro.label} title={aboutIntro.title} />

      <section className="shell grid items-start gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Prose body={aboutIntro.body} />
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
            {aboutIntro.links.map((item) => (
              <li key={item.href}>
                <StoryLink href={item.href} track={item.track}>
                  {item.text}
                </StoryLink>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Figure photo={aboutPhoto} ratio="6 / 5" priority sizes="(min-width: 1024px) 40vw, 90vw" />
        </div>
      </section>

      {aboutStories.map((story, index) => (
        <StoryRow key={story.id} story={story} flip={index % 2 === 1} />
      ))}

      <Gallery title={aboutGallery.title} photos={aboutGallery.photos} columns={4} />
    </>
  );
}
