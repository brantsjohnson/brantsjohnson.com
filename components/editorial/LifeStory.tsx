// ============================================
// WHAT THIS FILE DOES (plain English):
// One section of the About story. The title, the time and place,
// and the opening paragraph are always visible. "Read more" opens
// the rest of that section, and "Read less" closes it again.
// The opening paragraph is not repeated inside the longer text.
// The control is the browser's own disclosure, so it works without
// extra scripts and stays usable from a keyboard.
// ============================================

import { Reveal } from "@/components/editorial/Reveal";
import type { LifeSection } from "@/content/about-life";

// THIS SECTION DOES: turn *word* into italic, which the opening of the first story uses once
function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
          <em key={index}>{part.slice(1, -1)}</em>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

// THIS SECTION DOES: split the longer story into the paragraphs it was written in
function paragraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function LifeStory({ section }: { section: LifeSection }) {
  const more = paragraphs(section.expanded);

  return (
    <article id={section.id} className="scroll-mt-28 border-t border-border-subtle py-10 md:py-14">
      <div className="shell">
        <Reveal>
          <p className="label text-text-secondary">{section.subtitle}</p>
          <h2 className="mt-4 max-w-reading font-serif text-h2 text-ink">{section.title}</h2>
          <div className="mt-4 flex max-w-reading flex-col gap-5">
            <p className="text-body text-text-secondary">
              <Emphasis text={section.preview} />
            </p>
            <details className="group flex flex-col gap-5">
              <div className="order-1 hidden flex-col gap-5 group-open:flex">
                {more.map((paragraph, index) => (
                  <p key={index} className="text-body text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
              <summary
                data-track="button:read_more:about"
                className="order-2 inline-flex w-fit cursor-pointer list-none items-center justify-center rounded-control border border-border-subtle px-6 py-3 text-body font-semibold text-ink hover:border-accent min-h-[44px] [&::-webkit-details-marker]:hidden"
              >
                <span className="group-open:hidden">Read more</span>
                <span className="hidden group-open:inline">Read less</span>
              </summary>
            </details>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
