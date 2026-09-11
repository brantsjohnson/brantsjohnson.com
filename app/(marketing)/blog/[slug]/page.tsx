// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one blog post page. The word in the URL (slug) will match a
// published article in content/writings.ts. Right now there are no
// posts, so unknown slugs show not found.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/writings";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

type BlogPostPageProps = {
  params: { slug: string };
};

// THIS SECTION DOES: find one post by its URL slug
function getPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

// THIS SECTION DOES: tell Next which blog post URLs to pre-render
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// THIS SECTION DOES: set the browser tab title for one blog post
export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Blog post" };
  return { title: post.title, description: post.excerpt };
}

// THIS SECTION DOES: render one post when it exists, otherwise not found
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <FadeInOnScroll>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{post.date}</p>
          <h1 className="mt-3 max-w-[20ch] font-heading text-h1 font-semibold tracking-tight text-ink">
            {post.title}
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.06}>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-ink-soft">{post.excerpt}</p>
        </FadeInOnScroll>
      </Container>
    </article>
  );
}
