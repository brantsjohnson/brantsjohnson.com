// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a reserved frame for a photo that is not on the site yet.
// The words around it carry the section. The frame stays empty and
// quiet so the page does not show a broken image.
// ============================================

import { clsx } from "clsx";

type PhotoSlotProps = {
  orientation: "portrait" | "landscape";
  className?: string;
};

export function PhotoSlot({ orientation, className }: PhotoSlotProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "rounded-panel border border-border-subtle bg-surface",
        orientation === "portrait" ? "aspect-[4/5] w-28 sm:w-32" : "aspect-[16/9] w-full max-w-xl",
        className
      )}
    />
  );
}
