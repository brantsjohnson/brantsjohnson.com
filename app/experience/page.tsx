import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { experience } from "@/content/experience";
import { assets } from "@/content/site";

/**
 * Experience page.
 *
 * Purpose: renders the full work history as a vertical timeline (via the shared
 * Timeline component) and offers a CV download when one is available. Content
 * lives in content/experience.ts.
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
        {/* CV link — shows a real download when set, otherwise an honest note. */}
        <div className="mb-10">
          {assets.cvUrl ? (
            <a
              href={assets.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download full CV (PDF) ↓
            </a>
          ) : (
            <p className="text-sm text-ink-muted">
              {/* TODO(brant): add the CV PDF and set assets.cvUrl in content/site.ts */}
              Full CV (PDF) coming soon.
            </p>
          )}
        </div>

        <Timeline entries={experience.entries} />
      </Container>
    </>
  );
}
