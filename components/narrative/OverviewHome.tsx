// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the first screen. The headline stays put, and five colored
// doors open the five rooms. A mouse can tilt a door. A keyboard
// user gets the same link with a visible focus ring and no tilt.
// Old home anchors (/#product and the rest) open the new pages.
// ============================================

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
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

function Door({
  index,
  area,
}: {
  index: number;
  area: (typeof areas)[number];
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || event.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    ref.current.style.transform = `translateY(-6px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <li className="relative min-h-[5.5rem] lg:min-h-0" style={{ perspective: "900px" }}>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-panel"
        style={{ background: area.plate }}
      />
      <Link
        ref={ref}
        href={area.href}
        data-track={`link:door_${area.id}:home`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="door-card relative flex h-full items-center justify-between gap-4 rounded-panel px-4 py-3 text-on-hero shadow-glass sm:px-5"
        style={{ background: area.pigment, transformStyle: "preserve-3d" }}
      >
        <span>
          <span className="label text-on-hero/75">{String(index + 1).padStart(2, "0")}</span>
          <span className="mt-1 block font-serif text-h3 leading-none text-on-hero">{area.label}</span>
          <span className="mt-1 block text-caption text-on-hero/90">{area.deck}</span>
        </span>
        <span aria-hidden="true" className="font-serif text-h3 text-on-hero">
          →
        </span>
      </Link>
    </li>
  );
}

export function OverviewHome() {
  const router = useRouter();

  useEffect(() => {
    const next = hashRoutes[window.location.hash];
    if (next) router.replace(next);
  }, [router]);

  return (
    <div className="overview-stage shell grid gap-4 py-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-8 lg:py-5">
      <div className="flex flex-col justify-center">
        <p className="label text-text-secondary">{hero.eyebrow}</p>
        <p className="mt-1 font-serif text-h3 text-ink">{hero.name}</p>
        <h1 className="mt-3 max-w-[12ch] font-serif text-[clamp(2.5rem,4.4vw,4.4rem)] leading-[0.95] tracking-tight text-ink">
          {hero.headline}
        </h1>
        <p className="mt-3 max-w-[38ch] text-body text-text-secondary">{hero.identity}</p>
        <p className="mt-4 text-caption text-text-secondary">{hero.location}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={hero.storyCta.href} track="button:read_story:home">
            {hero.storyCta.label}
          </Button>
          {publicResume.href ? (
            <Button href={publicResume.href} variant="ghost" track="button:resume:home">
              {publicResume.label}
            </Button>
          ) : null}
        </div>
        <p className="mt-3 text-caption text-text-secondary">
          <Link href="/story" className="underline decoration-accent decoration-2 underline-offset-4">
            Story
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/beliefs" className="underline decoration-accent decoration-2 underline-offset-4">
            Beliefs
          </Link>
          <span aria-hidden="true"> · </span>
          <Link href="/contact" className="underline decoration-accent decoration-2 underline-offset-4">
            Contact
          </Link>
        </p>
      </div>
      <ul className="grid gap-2.5 lg:grid-rows-5">
        {areas.map((area, index) => (
          <Door key={area.id} index={index} area={area} />
        ))}
      </ul>
    </div>
  );
}
