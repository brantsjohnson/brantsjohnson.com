// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Poetry list page. It stays separate from the blog so
// poems can use a slower reading mode. The Writings hub is the main
// doorway. Poems live in content/writings.ts.
// ============================================

import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { poems, writings } from "@/content/writings";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { WritingCard } from "@/components/sections/WritingCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Poetry",
  description: writings.poetry.emptyDescription,
};

// THIS SECTION DOES: show the poems, or an honest empty state
export default function PoetryPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <PageHeader eyebrow="Writings" title={writings.poetry.heading} description={writings.poetry.emptyDescription} />
        <div className="mt-10">
          {poems.length === 0 ? (
            <EmptyState
              title={writings.poetry.emptyTitle}
              description={writings.poetry.emptyDescription}
              icon={<PenLine className="h-5 w-5" aria-hidden="true" />}
            />
          ) : (
            <ul className="divide-y border-y border-line">
              {poems.map((writing) => (
                <li key={writing.slug}>
                  <WritingCard writing={writing} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
