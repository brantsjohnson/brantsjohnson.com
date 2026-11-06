// ============================================
// WHAT THIS FILE DOES (plain English):
// One section of the About story. The title, the time and place,
// and the opening paragraph are always visible. "Read more" opens
// the rest of that section, and "Read less" closes it again.
// The opening paragraph is not repeated inside the longer text.
// The control is the browser's own disclosure, so it works without
// extra scripts and stays usable from a keyboard. It is not a button
// box. It is a short gold line with the words and a caret, the way a
// dropdown is drawn. The caret points down while closed and up while
// open.
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

// rule draws the hairline above a section. The first section leaves it off
// so the large "This is my story:" heading is not boxed between two lines.
export function LifeStory({ section, rule = true }: { section: LifeSection; rule?: boolean }) {
  const more = paragraphs(section.expanded);

  return (
    <article id={section.id} className={`scroll-mt-28 py-10 md:py-14${rule ? " border-t border-border-subtle" : ""}`}>
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
              {/* THIS SECTION DOES: the open and close control. Words and a caret sit on a gold line. There is no box around them. */}
              <summary
                data-track="button:read_more:about"
                className="order-2 inline-flex w-fit cursor-pointer list-none items-center gap-2 border-b-2 border-accent bg-transparent px-0 py-2 text-body text-ink transition-colors duration-[120ms] ease-brand hover:text-accent-deep min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden"
              >
                <span className="group-open:hidden">Read more</span>
                <span className="hidden group-open:inline">Read less</span>
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0 text-accent-deep transition-transform duration-[220ms] ease-brand group-open:rotate-180"
                >
                  <path
                    d="M3.25 6 8 10.75 12.75 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
            </details>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
