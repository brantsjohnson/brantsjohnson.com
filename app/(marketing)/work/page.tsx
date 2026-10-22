// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Work page. Intro sits at the top with a real product
// screen. Under it is the experience timeline, newest first, with
// the dates in a narrow left column. A public CV link appears only
// when CV_URL is set.
// TODO(brant): set CV_URL to a public résumé link when you want the button.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { building, experience, experienceIntro, photos } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";
import { publicCvUrl } from "@/lib/site/public-env";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: experienceIntro.deck,
  path: "/work",
});

export default function WorkPage() {
  const cvUrl = publicCvUrl();

  return (
    <>
      <PageHero eyebrow="Work" title="The work, in order." deck={experienceIntro.deck} />

      <section id="intro" className="shell py-12 md:py-16">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <p className="label text-text-secondary">Intro</p>
            <h2 className="mt-3 font-serif text-h2 text-ink">{building.intro.name}</h2>
            <p className="mt-3 text-body text-text-secondary">
              {building.intro.role}, {building.intro.dates}. {building.intro.summary}
            </p>
            <div className="mt-6">
              <Button href={building.intro.href} track="button:visit_intro:work">
                Visit Intro
              </Button>
            </div>
          </div>
          <Image
            src={photos.intro.src}
            alt={photos.intro.alt}
            width={photos.intro.width}
            height={photos.intro.height}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="mx-auto h-auto w-full max-w-[420px]"
          />
        </div>
      </section>

      <ol className="shell pb-20">
        {experience
          .filter((role) => role.org !== "Intro")
          .map((role) => (
          <li
            key={`${role.org}-${role.dates}`}
            className="grid gap-3 border-t border-border-subtle py-10 md:grid-cols-[11rem_1fr] md:gap-12"
          >
            <div>
              <p className="text-body text-text-secondary">{role.dates}</p>
              {role.place && <p className="mt-1 text-caption text-text-secondary">{role.place}</p>}
            </div>
            <div>
              <h2 className="font-serif text-h2 text-ink">{role.role}</h2>
              <p className="mt-2 text-body text-ink">{role.org}</p>
              <p className="mt-4 max-w-reading text-body text-text-secondary">{role.summary}</p>
              {role.href && role.hrefLabel && (
                <div className="mt-4">
                  <TextLink href={role.href} track={`link:visit_${role.org.toLowerCase()}:work`}>
                    {role.hrefLabel}
                  </TextLink>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      {cvUrl && (
        <div className="shell pb-20">
          <TextLink href={cvUrl} track="link:open_cv:work">
            Open the CV
          </TextLink>
        </div>
      )}
    </>
  );
}
