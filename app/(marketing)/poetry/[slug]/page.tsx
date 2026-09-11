// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one poem page. The word in the URL (slug) will match a poem
// in content/writings.ts. Unknown slugs show not found. Type is a bit
// more open than the blog so the reading mode feels different.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { poems } from "@/content/writings";
import { Container } from "@/components/ui/Container";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

type PoemPageProps = {
  params: { slug: string };
};

// THIS SECTION DOES: find one poem by its URL slug
function getPoem(slug: string) {
  return poems.find((poem) => poem.slug === slug);
}

// THIS SECTION DOES: tell Next which poem URLs to pre-render
export function generateStaticParams() {
  return poems.map((poem) => ({ slug: poem.slug }));
}

// THIS SECTION DOES: set the browser tab title for one poem
export function generateMetadata({ params }: PoemPageProps): Metadata {
  const poem = poems.find((entry) => entry.slug === params.slug);
  if (!poem) return { title: "Poem" };
  return { title: poem.title, description: poem.excerpt };
}

// THIS SECTION DOES: render one poem when it exists, otherwise not found
export default function PoemPage({ params }: PoemPageProps) {
  const poem = getPoem(params.slug);
  if (!poem) notFound();

  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <FadeInOnScroll>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">{poem.date}</p>
          <h1 className="mt-4 max-w-[16ch] font-heading text-h1 font-light tracking-tight text-ink">
            {poem.title}
          </h1>
        </FadeInOnScroll>
        <FadeInOnScroll delay={0.06}>
          <p className="mt-10 max-w-[52ch] text-[18px] leading-[1.9] text-ink">{poem.excerpt}</p>
        </FadeInOnScroll>
      </Container>
    </article>
  );
}
