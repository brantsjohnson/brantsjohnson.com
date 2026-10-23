// ============================================
// WHAT THIS FILE DOES (plain English):
// This lays one to three photos out like prints dropped on a table:
// each one tilted a little, overlapping, with a cream border and a
// shadow. When a panel changes, the photos fly in one after another.
// A mouse nudges each print a different amount, so the stack has
// depth. Touch screens and visitors who want less motion get still
// prints. A photo with no file renders nothing.
// ============================================

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Photo, SceneVideo } from "@/content/chapters";

type Slot = { x: number; y: number; w: number; h: number; rot: number; depth: number };

// The collage box is 6 wide by 5 tall. Slots are fractions of that box.
const RATIO = 1.2;

const layouts: Record<number, Slot[]> = {
  1: [{ x: 0.04, y: 0.02, w: 0.92, h: 0.96, rot: -1.2, depth: 10 }],
  2: [
    { x: 0, y: 0.02, w: 0.66, h: 0.82, rot: -2.4, depth: 8 },
    { x: 0.4, y: 0.3, w: 0.58, h: 0.68, rot: 2.6, depth: 18 },
  ],
  3: [
    { x: 0, y: 0.04, w: 0.58, h: 0.76, rot: -2.6, depth: 8 },
    { x: 0.5, y: 0, w: 0.48, h: 0.46, rot: 2.2, depth: 16 },
    { x: 0.42, y: 0.5, w: 0.54, h: 0.48, rot: -1.6, depth: 24 },
  ],
};

const videoLayout: Slot[] = [
  { x: 0, y: 0, w: 1, h: 0.66, rot: -0.8, depth: 8 },
  { x: 0.02, y: 0.62, w: 0.46, h: 0.38, rot: -2, depth: 16 },
  { x: 0.5, y: 0.66, w: 0.46, h: 0.34, rot: 2, depth: 22 },
];

// THIS SECTION DOES: fit a photo inside a slot without changing its shape, centered
function fit(slot: Slot, ratio: number) {
  const boxW = slot.w * RATIO;
  const boxH = slot.h;
  let width: number;
  let height: number;
  if (boxW / boxH > ratio) {
    height = boxH;
    width = boxH * ratio;
  } else {
    width = boxW;
    height = boxW / ratio;
  }
  return {
    left: `${((slot.x * RATIO + (boxW - width) / 2) / RATIO) * 100}%`,
    top: `${(slot.y + (boxH - height) / 2) * 100}%`,
    width: `${(width / RATIO) * 100}%`,
    height: `${height * 100}%`,
  };
}

type PhotoCollageProps = {
  photos: Photo[];
  video?: SceneVideo;
  tint: string;
  sizes?: string;
};

export function PhotoCollage({ photos, video, tint, sizes = "(min-width: 1024px) 36vw, 92vw" }: PhotoCollageProps) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const shown = video ? photos.slice(0, 2) : photos.slice(0, 3);
  if (shown.length === 0 && !video) return null;

  const slots = video ? videoLayout : layouts[shown.length];

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse" || !box.current) return;
    const rect = box.current.getBoundingClientRect();
    box.current.style.setProperty("--px", (((event.clientX - rect.left) / rect.width - 0.5) * 2).toFixed(3));
    box.current.style.setProperty("--py", (((event.clientY - rect.top) / rect.height - 0.5) * 2).toFixed(3));
  };

  const onLeave = () => {
    box.current?.style.setProperty("--px", "0");
    box.current?.style.setProperty("--py", "0");
  };

  const drift = (depth: number) => ({
    transform: `translate3d(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth * 0.7}px), 0)`,
    transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
  });

  const pieces: { key: string; slot: Slot; ratio: number; node: React.ReactNode }[] = [];

  if (video) {
    pieces.push({
      key: video.mp4,
      slot: slots[0],
      ratio: video.width / video.height,
      node: (
        <video
          controls
          playsInline
          preload="none"
          poster={video.poster}
          aria-label={video.label}
          className="h-full w-full rounded-[2px] bg-black object-cover"
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      ),
    });
  }

  shown.forEach((photo, index) => {
    const slot = slots[(video ? 1 : 0) + index];
    pieces.push({
      key: photo.src,
      slot,
      ratio: photo.width / photo.height,
      node: (
        <>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            quality={78}
            className="block h-full w-full rounded-[2px]"
            style={{ objectFit: photo.fit ?? "cover", objectPosition: photo.position ?? "50% 50%", background: photo.bg }}
          />
          {photo.caption ? (
            <span className="label pointer-events-none absolute bottom-[5px] left-[5px] rounded-br-[2px] bg-black/70 px-2 py-1 text-[0.62rem] text-accent-bright">
              {photo.caption}
            </span>
          ) : null}
        </>
      ),
    });
  });

  return (
    <div
      ref={box}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-full"
      style={{ aspectRatio: `${RATIO}` }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${tint}55, transparent)` }}
      />
      {pieces.map((piece, index) => {
        const place = fit(piece.slot, piece.ratio);
        return (
          <motion.div
            key={piece.key}
            className="absolute"
            style={{ ...place, zIndex: index + 1 }}
            initial={reduce ? false : { opacity: 0, y: 36, rotate: piece.slot.rot + 7, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, rotate: piece.slot.rot, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.12 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduce ? undefined : { scale: 1.03, zIndex: 20 }}
          >
            <div className="relative h-full w-full" style={drift(piece.slot.depth)}>
              <div className="relative h-full w-full bg-[#efe6d4] p-[5px] shadow-[0_22px_50px_rgba(0,0,0,0.6)]">
                {piece.node}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
