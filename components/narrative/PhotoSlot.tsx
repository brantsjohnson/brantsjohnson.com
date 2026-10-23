// ============================================
// WHAT THIS FILE DOES (plain English):
// Optional photo frame. With no src, it renders nothing so live
// pages do not show empty placeholders.
// ============================================

import Image from "next/image";
import { clsx } from "clsx";

type PhotoSlotProps = {
  orientation: "portrait" | "landscape";
  className?: string;
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
};

export function PhotoSlot({ orientation, className, src, alt = "", width, height }: PhotoSlotProps) {
  if (!src) return null;

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-panel border border-border-subtle bg-surface",
        orientation === "portrait" ? "aspect-[4/5] w-28 sm:w-32" : "aspect-[16/9] w-full max-w-xl",
        className
      )}
    >
      <Image src={src} alt={alt} width={width ?? 800} height={height ?? 1000} className="h-full w-full object-cover" />
    </div>
  );
}
