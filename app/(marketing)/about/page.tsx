// ============================================
// WHAT THIS FILE DOES (plain English):
// The About page. It opens with a short introduction and a photo,
// then tells Brant's life in 27 sections. Each section shows the
// opening paragraph. The rest of that story opens only when a
// visitor chooses Read more.
// ============================================

import type { Metadata } from "next";
import { Figure } from "@/components/editorial/Figure";
import { LifeStory } from "@/components/editorial/LifeStory";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { OnwardLinks } from "@/components/editorial/OnwardLinks";
import { aboutIntro } from "@/content/about";
import { aboutLife } from "@/content/about-life";
import { aboutPhoto } from "@/content/photos";
import { sectionCovers } from "@/content/covers";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutIntro.description,
  path: "/about",
  image: { photo: sectionCovers.about },
});

export default function AboutPage() {
  return (
    <>
      <PageHeader id="about" label={aboutIntro.label} title={aboutIntro.title} />

      <section className="shell grid items-start gap-12 pb-14 lg:grid-cols-12 lg:gap-16 md:pb-20">
        <Reveal className="lg:col-span-6">
          <Prose body={[aboutLife.intro.text]} />
          <p className="mt-8 max-w-reading border-l-2 border-accent pl-6 font-serif text-[1.7rem] italic leading-snug text-ink">
            {aboutLife.intro.motto}
          </p>
          <OnwardLinks links={aboutIntro.links} className="mt-8" />
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Figure photo={aboutPhoto} ratio="6 / 5" priority sizes="(min-width: 1024px) 40vw, 90vw" />
        </div>
      </section>

      <section aria-labelledby="life-story" className="border-t border-border-subtle">
        <div className="shell pb-2 pt-14 md:pt-20">
          <h2 id="life-story" className="max-w-reading font-serif text-h2 text-ink">
            {aboutLife.intro.title}
          </h2>
        </div>
        {aboutLife.sections.map((section) => (
          <LifeStory key={section.id} section={section} />
        ))}
      </section>
    </>
  );
}
