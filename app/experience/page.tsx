import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { experience } from "@/content/experience";

/**
 * Experience page.
 *
 * Purpose: renders the work timeline as a simple vertical list. Each entry
 * shows the role, organization, date range, and a short summary, with an
 * optional link out. Content lives in content/experience.ts.
 */
export const metadata: Metadata = {
  title: "Experience",
  description: experience.intro,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title={experience.heading} intro={experience.intro} />

      <Container className="pb-8">
        <ol className="mt-4 space-y-10 border-l border-ink/10 pl-6">
          {experience.entries.map((entry, i) => (
            <li key={i} className="relative">
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-paper"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h2 className="font-serif text-xl font-semibold text-ink">
                  {entry.role} · {entry.org}
                </h2>
                <span className="text-sm text-ink-muted">{entry.period}</span>
              </div>
              <p className="mt-2 max-w-2xl text-ink-soft">{entry.summary}</p>
              {entry.href && (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link mt-2 inline-block text-sm font-medium"
                >
                  Learn more ↗
                </a>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
