// ============================================
// WHAT THIS FILE DOES (plain English):
// This shows one photo. It wipes open from the top as it scrolls
// into view, zooms a touch on hover, and shows its caption only
// while the pointer is on it. A photo with no file renders nothing,
// so there are never empty frames. Drawings with see-through edges
// sit on a cream ground so their lines can be seen.
// ============================================

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import type { Photo } from "@/content/photos";

type FigureProps = {
  photo?: Photo;
  sizes?: string;
  priority?: boolean;
  ratio?: string; // a CSS aspect-ratio such as "4 / 5". Left out, the photo keeps its own shape.
  className?: string;
  delay?: number;
};

export function Figure({ photo, sizes = "(min-width: 1024px) 40vw, 92vw", priority, ratio, className, delay = 0 }: FigureProps) {
  const reduce = useReducedMotion();
  if (!photo?.src) return null;

  const shape = ratio ?? `${photo.width} / ${photo.height}`;

  return (
    <motion.figure
      className={clsx("has-caption group relative m-0 overflow-hidden", className)}
      style={{ aspectRatio: shape, background: photo.bg ?? "var(--color-surface-2)" }}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={reduce ? undefined : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        quality={80}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="transition-transform duration-[1200ms] ease-brand group-hover:scale-[1.035]"
        style={{ objectFit: photo.fit ?? "cover", objectPosition: photo.position ?? "50% 50%" }}
      />
      {photo.caption ? (
        <figcaption className="caption label pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-12 text-[0.68rem] text-white">
          {photo.caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
