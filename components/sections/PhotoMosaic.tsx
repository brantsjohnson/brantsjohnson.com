// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page photo gallery. It shows a mosaic of photos of
// Brant and his work so home feels visual, not just text. Until the
// real photo files are added under /public/photos, each frame shows a
// soft placeholder that names the intended photo. Every frame reserves
// its shape ahead of time so the page never jumps as images load
// (docs/14 §4.2). To add a real photo, set the `src` on that slot in
// content/site-content.ts.
// ============================================

import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { photoSlots } from "@/content/site-content";
import { clsx } from "clsx";

// THIS SECTION DOES: turn the slot's rough shape into a fixed aspect ratio class
const aspectClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

// THIS SECTION DOES: draw the mosaic of photos or, until they exist, labeled placeholder frames
export function PhotoMosaic() {
  return (
    <section aria-label="Photos" className="shell pb-16">
      <StaggerChildren className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {photoSlots.map((slot) => (
          <StaggerItem key={slot.alt} className="h-full">
            <figure
              className={clsx(
                "relative overflow-hidden rounded-panel border border-border-subtle",
                aspectClass[slot.aspect]
              )}
            >
              {slot.src ? (
                // A real photo. The browser knows its shape from the frame, so nothing jumps.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slot.src}
                  alt={slot.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                // Placeholder until a real file is added: a soft gradient plus the intended caption.
                <div className="flex h-full w-full items-end bg-gradient-to-br from-accent-muted/25 to-accent/10 p-4">
                  <figcaption className="text-caption text-text-secondary">{slot.alt}</figcaption>
                </div>
              )}
            </figure>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
