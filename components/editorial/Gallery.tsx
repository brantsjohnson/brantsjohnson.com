// ============================================
// WHAT THIS FILE DOES (plain English):
// A calm grid of photos with generous gaps. Captions show only when
// a photo is hovered. It is used for the "more photos" sections.
// ============================================

import { Figure } from "@/components/editorial/Figure";
import type { Photo } from "@/content/photos";

type GalleryProps = {
  title: string;
  intro?: string;
  photos: Photo[];
  columns?: 2 | 3 | 4;
};

export function Gallery({ title, intro, photos, columns = 3 }: GalleryProps) {
  if (photos.length === 0) return null;
  const cols = columns === 4 ? "md:columns-4" : columns === 2 ? "md:columns-2" : "md:columns-3";
  return (
    <section aria-label={title} className="border-t border-border-subtle py-16 md:py-24">
      <div className="shell">
        <h2 className="font-serif text-h2 text-ink">{title}</h2>
        {intro ? <p className="mt-3 max-w-reading text-text-secondary">{intro}</p> : null}
        <ul className={`mt-10 columns-2 gap-4 md:gap-6 ${cols}`}>
          {photos.map((photo, index) => (
            <li key={photo.src} className="mb-4 break-inside-avoid md:mb-6">
              <Figure photo={photo} sizes="(min-width: 768px) 30vw, 46vw" delay={(index % 3) * 0.1} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
