// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Blog list page at /blog. The Writings hub is the main
// doorway, but this URL stays so individual posts and old links still
// have a home. The posts themselves live in content/writings.ts.
// ============================================

import type { Metadata } from "next";
import { blogPosts, writings } from "@/content/writings";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { WritingCard } from "@/components/sections/WritingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

export const metadata: Metadata = {
  title: "Blog",
  description: writings.blog.emptyDescription,
};

// THIS SECTION DOES: show the blog posts, or an honest empty state
export default function BlogPage() {
  return (
    <section className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        {/* THIS SECTION DOES: show the stable page heading so this URL mirrors the Writings hub */}
        <FadeInOnScroll>
          <PageHeader
            eyebrow={writings.eyebrow}
            title={writings.blog.heading}
            description={writings.blog.emptyDescription}
          />
        </FadeInOnScroll>

        {/* THIS SECTION DOES: show either the list of posts or the honest empty state */}
        <div className="mt-10">
          {blogPosts.length === 0 ? (
            <FadeInOnScroll delay={0.06}>
              <EmptyState title={writings.blog.emptyTitle} description={writings.blog.emptyDescription} />
            </FadeInOnScroll>
          ) : (
            <FadeInOnScroll delay={0.06}>
              <ul className="divide-y border-y border-line">
                {blogPosts.map((writing) => (
                  <li key={writing.slug}>
                    <WritingCard writing={writing} />
                  </li>
                ))}
              </ul>
            </FadeInOnScroll>
          )}
        </div>
      </Container>
    </section>
  );
}
