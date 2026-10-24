// ============================================
// WHAT THIS FILE DOES (plain English):
// The home page, laid out like a magazine cover. A very large name
// and the headline sit beside Brant's headshot, with a small gold
// frame offset behind the photo. Below, a numbered index of the
// five main places opens each one; a photo for that place appears
// beside the row on hover. Three featured projects and a closing
// line follow. White space does most of the work. Old home anchors
// (/#product and the rest) open the new pages.
// ============================================

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Figure } from "@/components/editorial/Figure";
import { ProjectCard } from "@/components/editorial/ProjectCard";
import { Reveal } from "@/components/editorial/Reveal";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/narrative";
import { crew, headshot, ph, type Photo } from "@/content/photos";
import { projects } from "@/content/projects";
import { publicResume } from "@/content/site-content";

const hashRoutes: Record<string, string> = {
  "#product": "/work",
  "#creator": "/projects",
  "#performer": "/projects/theater",
  "#entrepreneur": "/work#building",
  "#activist": "/community",
  "#story": "/about",
  "#beliefs": "/about#beliefs",
  "#contact": "/contact",
  "#crew-brand": "/projects/crew",
  "#creator-backlocal": "/projects/backlocal",
  "#poetry": "/projects/poetry",
  "#writing": "/writing",
};

type IndexRow = { href: string; title: string; line: string; photo?: Photo; track: string };

const rows: IndexRow[] = [
  {
    href: "/about",
    title: "About",
    line: "Where I come from, what drives me, and what I do outside of work.",
    photo: { ...headshot, position: "50% 20%" },
    track: "link:index_about:home",
  },
  {
    href: "/work",
    title: "Work",
    line: "Four threads that run through every role: building, storytelling, organizing and listening.",
    photo: ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch."),
    track: "link:index_work:home",
  },
  {
    href: "/projects",
    title: "Projects",
    line: "Brands, shows, companies and a few odd experiments.",
    photo: crew("door-summer.webp", "A Crew illustration of a blue front door with a wreath."),
    track: "link:index_projects:home",
  },
  {
    href: "/community",
    title: "Community",
    line: "The archway, the scholarship and public service.",
    photo: ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", undefined, { position: "50% 40%" }),
    track: "link:index_community:home",
  },
  {
    href: "/writing",
    title: "Writing",
    line: "Essays on connection, craft and building with AI.",
    track: "link:index_writing:home",
  },
];

export function HomePage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
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

  const featured = ["crew", "theater", "backlocal"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <>
      <section ref={heroRef} className="shell grid items-end gap-12 pb-20 pt-12 md:pb-28 md:pt-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p {...rise(0.1)} className="label flex items-center gap-4 text-accent-deep">
            <span aria-hidden="true" className="inline-block h-px w-12 bg-accent" />
            {hero.eyebrow}
          </motion.p>
          <motion.h1 {...rise(0.2)} className="mt-6 font-serif text-display text-ink">
            Brant
            <br />
            S. Johnson
          </motion.h1>
          <motion.p {...rise(0.4)} className="mt-10 font-serif text-[clamp(1.8rem,3.4vw,3rem)] italic leading-[1.05] text-ink">
            {hero.headline}
          </motion.p>
          <motion.p {...rise(0.55)} className="mt-8 max-w-[42ch] text-[1.15rem] leading-relaxed text-text-secondary">
            {hero.identity}
          </motion.p>
          <motion.div {...rise(0.7)} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/about" track="button:read_story:home">
              Read my story
            </Button>
            <Button href="/work" variant="ghost" track="button:see_work:home">
              See my work
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
                style={{ objectPosition: "50% 18%" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section aria-label="Explore" className="border-t border-border-subtle">
        <div className="shell">
          <p className="label pt-10 text-text-secondary">Explore</p>
          <ul>
            {rows.map((row, index) => (
              <li key={row.href} className="group relative border-b border-border-subtle">
                <Link
                  href={row.href}
                  data-track={row.track}
                  className="grid items-center gap-x-8 gap-y-2 py-8 md:grid-cols-[4rem_1fr_minmax(0,22rem)_2rem] md:py-10"
                >
                  <span className="label text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] text-ink transition-transform duration-500 ease-brand md:group-hover:translate-x-3">
                    {row.title}
                  </span>
                  <span className="max-w-[34ch] text-caption text-text-secondary md:justify-self-end md:text-right">{row.line}</span>
                  <span
                    aria-hidden="true"
                    className="hidden font-serif text-3xl text-ink transition-all duration-500 ease-brand group-hover:translate-x-1 group-hover:text-accent-deep md:block"
                  >
                    →
                  </span>
                </Link>
                {row.photo ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[24%] top-1/2 z-10 hidden h-[17rem] w-[13rem] -translate-y-1/2 scale-95 overflow-hidden opacity-0 shadow-glass transition-all duration-500 ease-brand group-hover:scale-100 group-hover:opacity-100 lg:block"
                    style={{ background: row.photo.bg ?? "var(--color-surface-2)" }}
                  >
                    <Image
                      src={row.photo.src}
                      alt=""
                      fill
                      sizes="208px"
                      quality={70}
                      loading="lazy"
                      style={{ objectFit: row.photo.fit ?? "cover", objectPosition: row.photo.position ?? "50% 50%" }}
                    />
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="selected" className="py-24 md:py-36">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="gold-rule" aria-hidden="true" />
              <h2 id="selected" className="mt-6 font-serif text-h2 text-ink">
                Selected projects
              </h2>
            </div>
            <Link
              href="/projects"
              data-track="link:all_projects:home"
              className="label inline-flex min-h-[44px] items-center gap-3 text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent-deep"
            >
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-20 md:grid-cols-3">
            {featured.map((project, index) => (
              <li key={project.slug} className={index === 1 ? "md:mt-20" : undefined}>
                <ProjectCard project={project} delay={index * 0.12} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-bg-deep py-24 md:py-36">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="label text-accent-deep">What I believe</p>
            <p className="mt-6 font-serif text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.02] text-ink">
              {hero.thesis}
            </p>
            <p className="mt-8">
              <Link
                href="/about#beliefs"
                data-track="link:beliefs:home"
                className="label inline-flex min-h-[44px] items-center gap-3 text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent-deep"
              >
                What drives me <span aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
          <div className="lg:col-span-5">
            <Figure
              photo={ph("general/brant-speaking-2.webp", "Brant speaking at a lectern in warm light.", "Speaking")}
              ratio="4 / 5"
              sizes="(min-width: 1024px) 36vw, 90vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
