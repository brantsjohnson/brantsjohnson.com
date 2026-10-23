// ============================================
// WHAT THIS FILE DOES (plain English):
// A row of photos that scrolls sideways, with snap points and two
// arrow buttons. It holds the extra pictures that do not fit in the
// story panels. Photos load only as they come near the screen.
// ============================================

"use client";

import Image from "next/image";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Photo } from "@/content/chapters";

type PhotoStripProps = {
  title: string;
  intro: string;
  photos: Photo[];
  tint: string;
};

export function PhotoStrip({ title, intro, photos, tint }: PhotoStripProps) {
  const row = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  if (photos.length === 0) return null;

  const nudge = (direction: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-label={title} className="mt-12 border-t border-border-subtle bg-bg-deep py-10 md:py-14">
      <div className="shell flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label" style={{ color: tint }}>
            More photos
          </p>
          <h2 className="mt-2 font-serif text-h2 text-ink">{title}</h2>
          <p className="mt-1 text-text-secondary">{intro}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Scroll photos left"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-ink transition-colors hover:border-accent hover:text-accent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Scroll photos right"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-ink transition-colors hover:border-accent hover:text-accent"
          >
            →
          </button>
        </div>
      </div>
      <ul
        ref={row}
        tabIndex={0}
        aria-label={`${title}, scrolls sideways`}
        className="hide-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--page-gutter)] pb-2"
      >
        {photos.map((photo) => (
          <li
            key={photo.src}
            className="group relative h-[15rem] shrink-0 snap-start overflow-hidden rounded-[4px] border border-border-subtle sm:h-[19rem]"
            style={{ aspectRatio: `${Math.min(Math.max(photo.width / photo.height, 0.62), 1.9)}`, background: photo.bg ?? "var(--color-surface)" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 640px) 520px, 80vw"
              quality={75}
              loading="lazy"
              className="block h-full w-full transition-transform duration-700 ease-brand group-hover:scale-[1.05]"
              style={{ objectFit: photo.fit ?? "cover", objectPosition: photo.position ?? "50% 50%" }}
            />
            {photo.caption ? (
              <span className="label absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2 pt-8 text-[0.65rem] text-accent-bright">
                {photo.caption}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
