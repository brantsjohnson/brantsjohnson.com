import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Timeline } from "@/components/Timeline";
import { leadership } from "@/content/leadership";

/**
 * Leadership page.
 *
 * Purpose: shows leadership and volunteer history (TEDxSaltLakeCity,
 * Humanitarian XP, Regional Volunteer in Birmingham, and Student Council) using
 * the same timeline layout as Experience. Content lives in content/leadership.ts.
 */
export const metadata: Metadata = {
  title: "Leadership",
  description: leadership.intro,
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader title={leadership.heading} intro={leadership.intro} />

      <Container className="pb-8">
        <Timeline entries={leadership.entries} />
      </Container>
    </>
  );
}
