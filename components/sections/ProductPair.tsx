// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the products block. Intro and Bridger sit side by side
// in matching frames, each with a live screenshot and the same type.
// The screenshots are captures of the public sites, cropped to the product.
// ============================================

import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { building, photos } from "@/content/site-content";

const products = [
  { copy: building.intro, photo: photos.intro, track: "visit_intro" },
  { copy: building.bridger, photo: photos.bridger, track: "visit_bridger" },
] as const;

export function ProductPair({ page }: { page: "home" | "work" }) {
  return (
    <div className="grid items-start gap-x-12 gap-y-14 md:grid-cols-2">
      {products.map(({ copy, photo, track }) => (
        <article key={copy.name} id={copy.name.toLowerCase()} className="flex scroll-mt-28 flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel border border-border-subtle bg-surface">
            <div className="absolute inset-4 sm:inset-6">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 768px) 36vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>
          <h3 className="mt-6 font-serif text-h3 text-ink">{copy.name}</h3>
          <p className="mt-3 max-w-reading text-body text-text-secondary">
            {copy.role}, {copy.dates}. {copy.summary}
          </p>
          <div className="mt-4">
            <TextLink href={copy.href} track={`link:${track}:${page}`}>
              {copy.hrefLabel}
            </TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
