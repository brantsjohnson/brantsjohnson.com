// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the stage on each section page. A row of tabs names the
// short panels of the story. Picking one swaps the words and flies
// in the photos that belong to it, so a long story never becomes a
// long scroll. Arrow keys, the Back and Next buttons, a swipe, and
// a link like /creator#backlocal all move between panels. With
// reduced motion on, panels change instantly with no flying.
// ============================================

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AreaTags } from "@/components/narrative/AreaTags";
import { CopyText } from "@/components/narrative/CopyText";
import { PhotoCollage } from "@/components/narrative/PhotoCollage";
import { StoryLink } from "@/components/narrative/StoryLink";
import type { Scene } from "@/content/chapters";

type ScenePlayerProps = {
  label: string;
  scenes: Scene[];
  tint: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ScenePlayer({ label, scenes, tint }: ScenePlayerProps) {
  const reduce = useReducedMotion();
  const base = useId();
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const scene = scenes[index];

  const go = useCallback(
    (next: number, focusTab = false) => {
      const target = (next + scenes.length) % scenes.length;
      setIndex(target);
      if (focusTab) document.getElementById(`${base}-tab-${target}`)?.focus();
    },
    [base, scenes.length]
  );

  // A link like /creator#backlocal opens that panel.
  useEffect(() => {
    const open = () => {
      const id = window.location.hash.replace("#", "");
      const found = scenes.findIndex((item) => item.id === id);
      if (found >= 0) setIndex(found);
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [scenes]);

  // Keep the chosen tab in view on a narrow screen.
  useEffect(() => {
    const tab = document.getElementById(`${base}-tab-${index}`);
    const row = tabsRef.current;
    if (!tab || !row) return;
    row.scrollTo({ left: tab.offsetLeft - row.clientWidth / 2 + tab.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [index, base, reduce]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") go(index + 1, true);
    else if (event.key === "ArrowLeft") go(index - 1, true);
    else if (event.key === "Home") go(0, true);
    else if (event.key === "End") go(scenes.length - 1, true);
    else return;
    event.preventDefault();
  };

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section aria-label={label} className="shell">
      <div className="relative">
        <div
          ref={tabsRef}
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="hide-scrollbar -mx-[var(--page-gutter)] flex gap-1 overflow-x-auto border-b border-border-subtle px-[var(--page-gutter)]"
        >
          {scenes.map((item, i) => {
            const active = i === index;
            return (
              <button
                key={item.id}
                id={`${base}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${base}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => go(i)}
                data-track={`button:scene_${item.id}:${label.toLowerCase().replace(/[^a-z]+/g, "_")}`}
                className={`relative inline-flex min-h-[48px] shrink-0 items-center gap-2 px-3 text-caption font-semibold transition-colors sm:px-4 ${
                  active ? "text-ink" : "text-text-secondary hover:text-ink"
                }`}
              >
                <span className="label text-[0.65rem]" style={{ color: active ? tint : undefined }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
                {active ? (
                  <motion.span
                    layoutId={`${base}-underline`}
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-accent"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div
          id={`${base}-panel`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${index}`}
          tabIndex={0}
          className="outline-none"
        >
          <div
            className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-center lg:gap-14 lg:py-12"
            onTouchStart={(event) => {
              touchStart.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchStart.current === null) return;
              const dx = event.changedTouches[0].clientX - touchStart.current;
              touchStart.current = null;
              if (dx < -70) go(index + 1);
              else if (dx > 70) go(index - 1);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div key={scene.id} exit={{ opacity: 0, transition: { duration: 0.12 } }} className="min-w-0">
                <motion.p {...rise(0)} className="label" style={{ color: tint }}>
                  {scene.eyebrow}
                </motion.p>
                <motion.h2 {...rise(0.06)} className="mt-3 font-serif text-h2 text-ink">
                  {scene.title}
                </motion.h2>
                <div className="gold-rule mt-5 w-24" aria-hidden="true" />

                <motion.div {...rise(0.12)} className="mt-5 flex max-w-reading flex-col gap-4">
                  {scene.body.map((paragraph, i) =>
                    typeof paragraph === "string" ? (
                      <p key={i} className="text-body text-text-secondary">
                        {paragraph}
                      </p>
                    ) : (
                      <CopyText key={i} parts={paragraph} className="text-body text-text-secondary" />
                    )
                  )}
                </motion.div>

                {scene.stats?.length && (scene.photos?.length || scene.video) ? (
                  <motion.dl {...rise(0.18)} className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                    {scene.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd className="m-0">
                          <span className="gold-text block font-serif text-[clamp(2.1rem,4vw,3.4rem)] leading-none">
                            {stat.value}
                          </span>
                          <span className="label mt-1 block text-[0.65rem] text-text-secondary">{stat.label}</span>
                        </dd>
                      </div>
                    ))}
                  </motion.dl>
                ) : null}

                {scene.quote ? (
                  <motion.blockquote
                    {...rise(0.2)}
                    className="mt-6 max-w-reading border-l-2 border-accent pl-5 font-serif text-[1.5rem] italic leading-snug text-ink"
                  >
                    {scene.quote}
                  </motion.blockquote>
                ) : null}

                {scene.links?.length ? (
                  <motion.ul {...rise(0.24)} className="mt-6 flex flex-col gap-2">
                    {scene.links.map((item) => (
                      <li key={item.href}>
                        <StoryLink href={item.href} track={item.track}>
                          {item.text}
                        </StoryLink>
                      </li>
                    ))}
                  </motion.ul>
                ) : null}

                {scene.tags?.length ? (
                  <motion.div {...rise(0.28)} className="mt-4">
                    <AreaTags tags={scene.tags} />
                  </motion.div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div key={scene.id} exit={{ opacity: 0, transition: { duration: 0.12 } }}>
                  {scene.photos?.length || scene.video ? (
                    <PhotoCollage photos={scene.photos ?? []} video={scene.video} tint={tint} />
                  ) : (
                    <BigWords scene={scene} tint={tint} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border-subtle py-4">
          <button
            type="button"
            onClick={() => go(index - 1)}
            data-track={`button:scene_back:${label.toLowerCase().replace(/[^a-z]+/g, "_")}`}
            className="label inline-flex min-h-[44px] items-center gap-2 rounded-control border border-border-subtle px-4 text-ink transition-colors hover:border-accent"
          >
            <span aria-hidden="true">←</span> Back
          </button>
          <p className="label text-text-secondary" aria-live="polite">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> / {String(scenes.length).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={() => go(index + 1)}
            data-track={`button:scene_next:${label.toLowerCase().replace(/[^a-z]+/g, "_")}`}
            className="label inline-flex min-h-[44px] items-center gap-2 rounded-control bg-accent px-4 text-on-gold transition-colors hover:bg-accent-bright"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// THIS SECTION DOES: a panel with no photo gets its numbers in giant type instead of an empty frame
function BigWords({ scene, tint }: { scene: Scene; tint: string }) {
  const items = scene.stats ?? [];
  if (items.length === 0) return null;
  return (
    <div
      className="relative flex aspect-[6/5] w-full flex-col justify-center gap-5 overflow-hidden rounded-panel border border-border-subtle p-8"
      style={{ background: `radial-gradient(120% 90% at 20% 10%, ${tint}30, transparent 60%), var(--color-surface)` }}
    >
      {items.map((stat) => (
        <div key={stat.label}>
          <span className="gold-text block font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]">{stat.value}</span>
          <span className="label mt-1 block text-text-secondary">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
