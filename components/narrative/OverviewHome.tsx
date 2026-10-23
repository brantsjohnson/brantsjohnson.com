// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the first screen, and it fits on one desktop screen. The
// headline sits over five tall photo doors, one for each room of
// the site. On a desktop, the door under the pointer opens wide and
// its photo comes into full color. On a phone the doors stack as
// rows. A slow ticker of facts runs along the bottom. Old home
// anchors (/#product and the rest) open the new pages.
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { areas, hero } from "@/content/narrative";
import { publicResume } from "@/content/site-content";

const hashRoutes: Record<string, string> = {
  "#product": "/product",
  "#creator": "/creator",
  "#performer": "/performer",
  "#entrepreneur": "/entrepreneur",
  "#activist": "/activist",
  "#story": "/story",
  "#beliefs": "/beliefs",
  "#contact": "/contact",
  "#crew-brand": "/creator/crew",
  "#creator-backlocal": "/creator#backlocal",
  "#poetry": "/creator/poetry",
  "#writing": "/creator/blog",
};

// THIS SECTION DOES: short facts for the ticker, each one taken from the story pages
const facts = [
  "63 clients across 52 annual events",
  "370+ user interviews at BackLocal",
  "Onboarding cut in half at Crew",
  "1,200 seats sold out every night of a 12-day run",
  "A 25-foot by 63-foot archway for Vernal",
  "Student body president three times",
  "Toured South Korea with BYU Young Ambassadors",
  "Never lost a Christmas sweater contest",
  "Cast in Elf the Musical at Hale Centre Theatre",
];

function Door({ index, area }: { index: number; area: (typeof areas)[number] }) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className="relative min-h-[6.5rem] lg:min-h-0 lg:flex-[1_1_0%] lg:transition-[flex] lg:duration-700 lg:ease-brand lg:hover:flex-[3.2_1_0%] lg:focus-within:flex-[3.2_1_0%]"
      initial={reduce ? false : { opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: reduce ? 0 : 0.7 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={area.href}
        data-track={`link:door_${area.id}:home`}
        className="door group relative flex h-full min-h-[6.5rem] flex-col justify-between overflow-hidden rounded-panel border border-border-subtle p-4 text-on-hero lg:p-5"
        style={{ background: area.pigment }}
      >
        <Image
          src={area.door.src}
          alt={area.door.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          quality={70}
          priority={index < 2}
          className="object-cover opacity-70 saturate-[0.6] transition-all duration-700 ease-brand group-hover:scale-[1.06] group-hover:opacity-100 group-hover:saturate-100 group-focus-visible:opacity-100 group-focus-visible:saturate-100"
          style={{ objectPosition: area.door.position }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${area.plate}99 0%, transparent 35%, ${area.plate}f2 100%)` }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-[0.18] transition-transform duration-700 ease-brand group-hover:scale-x-100"
          style={{ background: area.tint }}
        />

        <span className="relative flex items-start justify-between">
          <span className="label text-accent-bright">{String(index + 1).padStart(2, "0")}</span>
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-on-hero/40 text-lg transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-accent group-hover:bg-accent group-hover:text-on-gold"
          >
            →
          </span>
        </span>

        <span className="relative block">
          <span className="block font-serif text-[clamp(1.7rem,2.6vw,2.6rem)] leading-none text-on-hero">
            {area.short}
          </span>
          <span className="mt-1 block text-caption text-on-hero/90 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100">
            {area.label}. {area.deck}
          </span>
        </span>
      </Link>
    </motion.li>
  );
}

export function OverviewHome() {
  const router = useRouter();
  const reduce = useReducedMotion();

  useEffect(() => {
    const next = hashRoutes[window.location.hash];
    if (next) router.replace(next);
  }, [router]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div className="home-stage relative isolate flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 -z-10 h-[40rem] w-[40rem] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(233,191,133,0.55), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(224,122,168,0.6), transparent)" }}
      />

      <div className="shell grid items-end gap-5 pb-5 pt-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-10 lg:pt-8">
        <div>
          <motion.p {...rise(0.55)} className="label flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="inline-block h-px w-10 bg-accent" />
            {hero.name} · {hero.eyebrow}
          </motion.p>
          <motion.h1
            {...rise(0.65)}
            className="mt-3 font-serif text-[clamp(2.7rem,5.6vw,5.4rem)] leading-[0.92] tracking-tight text-ink"
          >
            <span className="gold-text">Good ideas</span>
            <br />
            <span className="italic text-ink">deserve to happen.</span>
          </motion.h1>
        </div>
        <motion.div {...rise(0.8)} className="lg:pb-2">
          <p className="max-w-[40ch] text-body leading-snug text-text-secondary">{hero.identity}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button href={hero.storyCta.href} track="button:read_story:home">
              {hero.storyCta.label}
            </Button>
            {publicResume.href ? (
              <Button href={publicResume.href} variant="ghost" track="button:resume:home">
                {publicResume.label}
              </Button>
            ) : null}
            <Link
              href="/contact"
              className="label inline-flex min-h-[44px] items-center text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent"
            >
              Say hi
            </Link>
          </div>
        </motion.div>
      </div>

      <ul className="shell flex flex-1 flex-col gap-2 pb-4 lg:min-h-[22rem] lg:flex-row lg:gap-3">
        {areas.map((area, index) => (
          <Door key={area.id} index={index} area={area} />
        ))}
      </ul>

      <div className="ticker overflow-hidden border-t border-border-subtle bg-bg-deep/80 py-2.5">
        <ul className="sr-only">
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <div aria-hidden="true" className="ticker-track flex whitespace-nowrap">
          {[...facts, ...facts].map((fact, i) => (
            <span key={`${fact}-${i}`} className="label inline-flex items-center text-text-secondary">
              <span className="mx-6 inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
              {fact}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
