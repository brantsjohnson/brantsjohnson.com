// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page. It tells his story, shows him at a podium,
// names Intro and Bridger, then schooling, then service: the archway,
// the scholarship, and the 22 youth in Hilo. Photographs are real
// files from the Wix site. Bridger has no screen here.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { about, building, photos, publicCv, serviceStories } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Brant S. Johnson on connection, Intro, Bridger, the Uintah Resilience Archway, and the Resilience Scholarship.",
  path: "/about",
});

function Story({ title, role, dates, place, paragraphs }: { title: string; role: string; dates: string; place?: string; paragraphs: string[] }) {
  return (
    <article>
      <h3 className="font-serif text-h2 text-ink">{title}</h3>
      <p className="mt-2 text-body text-ink">
        {role}, {dates}
        {place ? `, ${place}` : ""}
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-body text-text-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  const byTitle = (title: string) => serviceStories.find((story) => story.title === title);
  const archway = byTitle("Uintah Resilience Archway");
  const scholarship = byTitle("Resilience Scholarship");
  const hilo = byTitle("Habitat for Humanity, Hilo");
  const later = serviceStories.filter(
    (story) => story !== archway && story !== scholarship && story !== hilo
  );

  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />

      <div className="shell grid items-start gap-12 py-8 lg:grid-cols-[1fr_0.9fr]">
        <Image
          src={photos.podium.src}
          alt={photos.podium.alt}
          width={photos.podium.width}
          height={photos.podium.height}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="h-auto w-full lg:col-start-2 lg:row-start-1"
        />
        <div className="flex max-w-reading flex-col gap-6 lg:col-start-1 lg:row-start-1">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <section id="building" className="shell border-t border-border-subtle py-16">
        <p className="label text-text-secondary">{building.kicker}</p>
        <h2 className="mt-4 font-serif text-h2 text-ink">Intro and Bridger.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-h3 text-ink">{building.intro.name}</h3>
            <p className="mt-3 max-w-reading text-body text-text-secondary">
              {building.intro.role}, {building.intro.dates}. {building.intro.summary}
            </p>
            <div className="mt-4">
              <TextLink href={building.intro.href} track="link:visit_intro:about">
                Visit Intro
              </TextLink>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-h3 text-ink">{building.bridger.name}</h3>
            <p className="mt-3 max-w-reading text-body text-text-secondary">
              {building.bridger.role}, {building.bridger.dates}. {building.bridger.summary}
            </p>
            <div className="mt-4">
              <TextLink href={building.bridger.href} track="link:visit_bridger:about">
                Visit Bridger
              </TextLink>
            </div>
          </div>
        </div>
      </section>

      <section className="shell grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-h2 text-ink">{about.educationTitle}</h2>
          <p className="mt-4 text-body text-text-secondary">{about.education}</p>
          <p className="mt-4 text-body text-text-secondary">{about.location}</p>
          <div className="mt-4">
            <TextLink href={publicCv.href} track="link:public_cv:about">
              {publicCv.label}
            </TextLink>
          </div>
        </div>
        <div id="skills">
          <h2 className="font-serif text-h2 text-ink">{about.skillsTitle}</h2>
          <p className="mt-4 text-body text-text-secondary">{about.skills}</p>
        </div>
      </section>

      <section id="service" className="pb-20">
        <div className="shell">
          <p className="label text-text-secondary">Service</p>
          <h2 className="mt-4 font-serif text-h2 text-ink">Work that stayed in the town.</h2>
          <div className="mt-12 max-w-reading">{archway && <Story {...archway} />}</div>
        </div>

        <figure className="mt-12">
          <Image
            src={photos.archwayCrane.src}
            alt={photos.archwayCrane.alt}
            width={photos.archwayCrane.width}
            height={photos.archwayCrane.height}
            sizes="100vw"
            className="h-auto w-full"
          />
          <figcaption className="label shell mt-4 text-text-secondary">Uintah Resilience Archway</figcaption>
        </figure>

        <div className="shell mt-10 max-w-[52rem]">
          <Image
            src={photos.archwayCrew.src}
            alt={photos.archwayCrew.alt}
            width={photos.archwayCrew.width}
            height={photos.archwayCrew.height}
            sizes="(min-width: 768px) 52rem, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="shell mt-16 max-w-reading">{scholarship && <Story {...scholarship} />}</div>

        <div className="shell mt-10 grid gap-6 md:grid-cols-2">
          <figure>
            <Image
              src={photos.scholarship2021.src}
              alt={photos.scholarship2021.alt}
              width={photos.scholarship2021.width}
              height={photos.scholarship2021.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="label mt-4 text-text-secondary">Resilience Scholarship, 2021</figcaption>
          </figure>
          <figure>
            <Image
              src={photos.scholarship2022.src}
              alt={photos.scholarship2022.alt}
              width={photos.scholarship2022.width}
              height={photos.scholarship2022.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="label mt-4 text-text-secondary">Resilience Scholarship, 2022</figcaption>
          </figure>
        </div>

        <div className="shell mt-16 flex max-w-reading flex-col gap-12">
          {hilo && <Story {...hilo} />}
          {later.map((story) => (
            <article key={story.title}>
              <h3 className="font-serif text-h3 text-ink">{story.title}</h3>
              <p className="mt-2 text-body text-text-secondary">
                {story.role}, {story.dates}
                {story.place ? `, ${story.place}` : ""}. {story.paragraphs[0]}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
