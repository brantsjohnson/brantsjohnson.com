import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { about } from "@/content/about";

/**
 * About page.
 *
 * Purpose: the longer introduction. It renders the intro line, the body
 * paragraphs, and a small "quick facts" panel — all pulled from
 * content/about.ts so the copy is easy to edit.
 */
export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={about.heading} intro={about.intro} />

      <Container className="grid gap-12 pb-8 lg:grid-cols-3">
        <div className="prose-simple lg:col-span-2">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">
            Quick facts
          </h2>
          <dl className="mt-4 space-y-4">
            {about.quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-wide text-ink-muted">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </>
  );
}
