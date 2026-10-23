// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one essay or letter. If the piece is a mirror of a
// newsletter, the page points at the original and tells search
// engines that original is the canonical copy.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWritingPost, writingPosts } from "@/content/writing/posts";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return writingPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getWritingPost(params.slug);
  if (!post) return { title: "Writing" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: post.canonicalUrl ? { canonical: post.canonicalUrl } : undefined,
  };
}

export default function WritingPostPage({ params }: PageProps) {
  const post = getWritingPost(params.slug);
  if (!post) notFound();

  return (
    <article className="shell max-w-reading py-16">
      <p className="text-caption uppercase tracking-[0.18em] text-text-secondary">
        {post.kind === "essay" ? "Government reform" : "Newsletter"} · {post.published}
      </p>
      <h1 className="mt-4 font-serif text-h1 text-ink">{post.title}</h1>
      <div className="mt-8 flex flex-col gap-6">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-body">
            {paragraph}
          </p>
        ))}
      </div>
      {post.canonicalUrl && (
        <p className="mt-10 text-body">
          <a href={post.canonicalUrl} data-track={`link:canonical:${post.slug}`} className="underline decoration-accent underline-offset-4">
            Read the original
          </a>
        </p>
      )}
      <p className="mt-10">
        <Link href="/writing" data-track="link:writing_index:post" className="text-body underline decoration-accent underline-offset-4">
          All writing
        </Link>
      </p>
    </article>
  );
}
