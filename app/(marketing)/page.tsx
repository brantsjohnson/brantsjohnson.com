// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page. The order is the hero, one proof line,
// Intro, Bridger, three stats, then a way to the contact page.
// The stats are painted immediately. Nothing waits for a scroll.
// The headline is the even-split test. The subhead stays as it is.
// A referral campaign can still replace both lines.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { SeeTheWorkButton, WorkSectionView } from "@/components/home/HeroExperiment";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { building, hero, homeStats, photos, proofLine } from "@/content/site-content";
import { getActiveReferralVariant } from "@/lib/cms/get-active-referral-variant";
import { getReferralVariantContent } from "@/lib/cms/referral-variant";
import {
  HERO_EXPERIMENT_COOKIE,
  HERO_EXPERIMENT_HEADER,
  heroExperimentVariants,
  heroHeadlineFor,
  parseHeroExperimentId,
} from "@/lib/hero-experiment";

export const metadata: Metadata = {
  title: "Home",
  description: hero.subline,
};

type HomePageProps = {
  searchParams?: Readonly<Record<string, string | string[] | undefined>>;
};

function assignedHeroId(): (typeof heroExperimentVariants)[number]["id"] {
  const fromHeader = parseHeroExperimentId(headers().get(HERO_EXPERIMENT_HEADER));
  if (fromHeader) return fromHeader;
  const fromCookie = parseHeroExperimentId(cookies().get(HERO_EXPERIMENT_COOKIE)?.value);
  return fromCookie ?? heroExperimentVariants[0].id;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  if (searchParams?.ask) redirect("/ask");

  const variantId = await getActiveReferralVariant(searchParams);
  const copy = getReferralVariantContent(variantId);
  const previewRaw = searchParams?.hero;
  const preview = parseHeroExperimentId(typeof previewRaw === "string" ? previewRaw : previewRaw?.[0]);
  const experimentId = preview ?? assignedHeroId();
  const showExperiment = Boolean(preview) || variantId === "default";
  const headline = showExperiment ? heroHeadlineFor(experimentId) : copy.heroHeadline;

  return (
    <>
      {showExperiment && <WorkSectionView variant={experimentId} />}
      <section className="bg-ink text-on-hero">
        <div className="grid lg:min-h-[92vh] lg:grid-cols-2">
          <div className="flex flex-col justify-end px-[var(--page-gutter)] py-16 lg:py-20 lg:pr-16">
            <p className="label text-accent">Brant S. Johnson</p>
            <h1 className="mt-5 font-serif text-display text-accent" data-hero-variant={experimentId}>
              {headline}
            </h1>
            <p className="mt-6 text-body text-on-hero">{copy.heroBody}</p>
            <div className="mt-10">
              {showExperiment ? (
                <SeeTheWorkButton href={hero.primaryCta.href} label={hero.primaryCta.label} variant={experimentId} />
              ) : (
                <Button href={hero.primaryCta.href} track="button:see_work:home">
                  {hero.primaryCta.label}
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-[68vh] lg:h-auto lg:min-h-[92vh]">
            <Image
              src={photos.speaking.src}
              alt={photos.speaking.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <p className="font-serif text-h2 text-ink">{proofLine}</p>
      </section>

      <div id="work">
        <section id="intro" className="shell pb-8">
          <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <p className="label text-text-secondary">Intro</p>
              <h2 className="mt-4 font-serif text-display text-ink">AI agent software for live events.</h2>
              <p className="mt-6 text-body text-text-secondary">
                {building.intro.role}, {building.intro.dates}.
              </p>
              <div className="mt-6">
                <TextLink href={building.intro.href} track="link:visit_intro:home">
                  Visit Intro
                </TextLink>
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

        <section id="bridger" className="shell py-16">
          <div>
            <p className="label text-text-secondary">Bridger</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">A TestFlight app for strangers becoming friends.</h2>
            <p className="mt-4 text-body text-text-secondary">
              {building.bridger.role}. {building.bridger.summary} {building.bridger.dates}.
            </p>
            <div className="mt-6">
              <TextLink href={building.bridger.href} track="link:visit_bridger:home">
                Visit Bridger
              </TextLink>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-ink text-on-hero" aria-label="Proof">
        <ol className="shell grid gap-12 py-16 md:grid-cols-3 md:py-24">
          {homeStats.map((stat) => (
            <li key={stat.value}>
              <p className="font-serif text-stat text-accent">{stat.value}</p>
              <p className="label mt-4 text-on-hero">{stat.label}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell py-20 md:py-28">
        <h2 className="font-serif text-h2 text-ink">Write me.</h2>
        <p className="mt-4 text-body text-text-secondary">If you want to talk about the work, send a note. I read them.</p>
        <div className="mt-6">
          <TextLink href="/contact" track="link:contact:home">
            Go to contact
          </TextLink>
        </div>
      </section>
    </>
  );
}
