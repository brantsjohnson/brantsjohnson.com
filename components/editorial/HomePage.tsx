// ============================================
// WHAT THIS FILE DOES (plain English):
// The home page, laid out like a magazine cover. A very large name
// and the headline sit beside Brant's headshot, with a small gold
// frame offset behind the photo. Below, a numbered index of the
// five main places opens each one; the photo panel beside the list
// changes to match the row under the pointer, so no photo ever
// covers any words. Three featured projects and a closing
// line follow. White space does most of the work. Old home anchors
// (/#product and the rest) open the new pages.
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Figure } from "@/components/editorial/Figure";
import { Reveal } from "@/components/editorial/Reveal";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/narrative";
import { aboutPhoto, crew, headshot, objectPositionFor, ph, type Photo } from "@/content/photos";
import { publicResume } from "@/content/site-content";

const hashRoutes: Record<string, string> = {
  "#product": "/work",
  "#creator": "/work",
  "#performer": "/events/theater",
  "#entrepreneur": "/work",
  "#activist": "/community",
  "#story": "/about",
  "#beliefs": "/about",
  "#contact": "/contact",
  "#crew-brand": "/work/crew-brand",
  "#creator-backlocal": "/work/backlocal",
  "#poetry": "/writing/poetry",
  "#writing": "/writing",
};

type IndexRow = { href: string; title: string; line: string; linkText: string; photo: Photo; track: string };

const rows: IndexRow[] = [
  {
    href: "/about",
    title: "About",
    line: "The longer introduction, plus a few stories I'd have trouble fitting into a résumé.",
    linkText: "Meet me",
    photo: aboutPhoto,
    track: "link:index_about:home",
  },
  {
    href: "/work",
    title: "Work",
    line: "Products I've built, teams I've worked with, and what I learned doing it.",
    linkText: "See the work",
    photo: ph("general/pitching-to-vcs.webp", "Brant presenting a BackLocal slide to a small room, pointing at a screen that reads Problem: local companies do not have a large online presence.", undefined, { focus: { x: 0.49, y: 0.6 } }),
    track: "link:index_work:home",
  },
  {
    href: "/events",
    title: "Events",
    line: "Conferences I've helped put on, community events, parties, and performances.",
    linkText: "Explore events",
    photo: ph("general/tedxsaltlakecity.webp", "The TEDxSaltLakeCity stage with glowing red and white letters, a red circle and a blue skyline backdrop.", undefined, { focus: { x: 0.55, y: 0.6 } }),
    track: "link:index_events:home",
  },
  {
    href: "/community",
    title: "Community",
    line: "Things I've worked on because somebody cared enough to get them started.",
    linkText: "Community work",
    photo: ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", undefined, { focus: { x: 0.5, y: 0.62 } }),
    track: "link:index_community:home",
  },
  {
    href: "/writing",
    title: "Writing",
    line: "Articles and poetry. No elaborate introduction required.",
    linkText: "Read something",
    photo: ph("general/brant-one-new-person-a-day-series7-overview.webp", "Handwritten notes on gray paper, each with a small instant photo clipped to it.", undefined, { focus: { x: 0.5, y: 0.45 } }),
    track: "link:index_writing:home",
  },
];

type StartCard = { title: string; tag: string; line: string; href: string; linkText: string; photo: Photo; ratio: string; track: string };

const starts: StartCard[] = [
  {
    title: "Bridger",
    tag: "Social software",
    line: "I'm building it to help people form friendships through the things they love and give third places better ways to bring people together.",
    href: "/work/bridger",
    linkText: "The Bridger story",
    photo: { src: "/photos/bridger-live.webp", alt: "The live Bridger waitlist window.", width: 900, height: 989, position: "50% 0%" },
    ratio: "4 / 5",
    track: "link:start_bridger:home",
  },
  {
    title: "Intro",
    tag: "Events + AI",
    line: "A tool I'm building for event organizers who want people to leave having met somebody useful, interesting, or worth seeing again.",
    href: "/work/intro",
    linkText: "How Intro started",
    photo: { src: "/photos/intro-live.webp", alt: "The live Intro site, with the attendee experience on a phone.", width: 1200, height: 750, position: "30% 0%" },
    ratio: "4 / 5",
    track: "link:start_intro:home",
  },
  {
    title: "Events I've helped put on",
    tag: "Event work",
    line: "Business conferences, community gatherings, and a few events that needed a lot of convincing before they happened.",
    href: "/events",
    linkText: "See the events",
    photo: ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday in front of a bright stage."),
    ratio: "4 / 5",
    track: "link:start_events:home",
  },
  {
    title: "Crew",
    tag: "Product + illustration",
    line: "I helped build a banking product for families. I also ended up drawing a large part of its brand.",
    href: "/work/crew",
    linkText: "See Crew",
    photo: crew("door-summer.webp", "A Crew illustration of a blue front door with a wreath and two shrubs."),
    ratio: "4 / 5",
    track: "link:start_crew:home",
  },
];

export function HomePage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  useEffect(() => {
    const next = hashRoutes[window.location.hash];
    if (next) router.replace(next);
  }, [router]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <>
      <section ref={heroRef} className="shell grid items-end gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p {...rise(0.1)} className="label flex items-center gap-4 text-accent-deep">
            <span aria-hidden="true" className="inline-block h-px w-12 bg-accent" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1 {...rise(0.2)} className="mt-6 max-w-[12ch] font-serif text-display text-ink">
            {hero.headline}
          </motion.h1>
          <motion.div {...rise(0.45)} className="mt-10 flex max-w-[46ch] flex-col gap-5 text-[1.15rem] leading-relaxed text-text-secondary">
            {hero.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </motion.div>
          <motion.div {...rise(0.7)} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/about" track="button:get_to_know_me:home">
              Get to know me
            </Button>
            <Button href="/work" variant="ghost" track="button:see_work:home">
              See what I&apos;ve worked on
            </Button>
            {publicResume.href ? (
              <Button href={publicResume.href} variant="ghost" track="button:resume:home">
                {publicResume.label}
              </Button>
            ) : null}
          </motion.div>
        </div>

        <motion.div {...rise(0.3)} className="lg:col-span-5">
          <motion.div style={{ y: drift }} className="relative mx-auto max-w-[30rem] lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 left-5 top-5 border border-accent"
            />
            <div className="relative aspect-[4/4.6] overflow-hidden bg-surface-2">
              <Image
                src={headshot.src}
                alt={headshot.alt}
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 90vw"
                quality={85}
                className="object-cover"
                style={{ objectPosition: objectPositionFor(headshot, 4 / 4.6) }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section aria-label="Take a look around" className="border-t border-border-subtle">
        <div className="shell grid gap-x-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label pt-10 text-text-secondary">Take a look around</p>
            <ul onMouseLeave={() => setActive(0)}>
              {rows.map((row, index) => (
                <li key={row.href} className="border-b border-border-subtle">
                  <Link
                    href={row.href}
                    data-track={row.track}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group grid grid-cols-[3rem_1fr_2rem] items-start gap-x-4 py-8 md:py-10"
                  >
                    <span className="label pt-3 text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-ink transition-transform duration-500 ease-brand group-hover:translate-x-3">
                        {row.title}
                      </span>
                      <span className="mt-3 block max-w-[44ch] text-body text-text-secondary">{row.line}</span>
                      <span className="label mt-4 block text-[0.68rem] text-accent-deep">{row.linkText}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="pt-3 font-serif text-3xl text-ink transition-all duration-500 ease-brand group-hover:translate-x-1 group-hover:text-accent-deep"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div aria-hidden="true" className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 pt-10">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                {rows.map((row, index) => (
                  <div
                    key={row.href}
                    className="absolute inset-0 transition-opacity duration-700 ease-brand"
                    style={{ opacity: active === index ? 1 : 0, background: row.photo?.bg ?? "var(--color-surface-2)" }}
                  >
                    {row.photo ? (
                      <Image
                        src={row.photo.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 38vw, 0px"
                        quality={80}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="transition-transform duration-[1400ms] ease-brand"
                        style={{
                          objectFit: row.photo.fit ?? "cover",
                          objectPosition: objectPositionFor(row.photo, 4 / 5),
                          transform: active === index ? "scale(1)" : "scale(1.05)",
                        }}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="start" className="py-24 md:py-36">
        <div className="shell">
          <div className="gold-rule" aria-hidden="true" />
          <h2 id="start" className="mt-6 font-serif text-h2 text-ink">
            A few places to start
          </h2>
          <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {starts.map((item, index) => (
              <Reveal as="li" key={item.href} delay={index * 0.08} className={index % 2 === 1 ? "lg:mt-16" : undefined}>
                <Link href={item.href} data-track={item.track} className="group block">
                  <Figure photo={item.photo} ratio={item.ratio} sizes="(min-width: 1024px) 22vw, 46vw" />
                  <p className="label mt-5 text-[0.66rem] text-accent-deep">{item.tag}</p>
                  <h3 className="mt-2 font-serif text-[1.8rem] leading-[1.05] text-ink">{item.title}</h3>
                  <p className="mt-3 text-caption text-text-secondary">{item.line}</p>
                  <p className="label mt-4 inline-flex items-center gap-2 text-[0.68rem] text-ink group-hover:text-accent-deep">
                    {item.linkText} <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
