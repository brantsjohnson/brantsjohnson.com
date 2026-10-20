// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Writing page. It has two shelves: government reform
// essays, and newsletter letters. It also has a working signup.
// When a shelf is empty, it says so. It does not invent a post.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { NoteForm } from "@/components/forms/NoteForm";
import { writingIntro } from "@/content/site-content";
import { postsByKind, type WritingKind } from "@/content/writing/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: writingIntro.deck,
};

function Shelf({ title, kind, empty }: { title: string; kind: WritingKind; empty: string }) {
  const posts = postsByKind(kind);
  return (
    <section aria-labelledby={`${kind}-shelf`} className="border-t border-border-subtle py-12">
      <h2 id={`${kind}-shelf`} className="font-serif text-h2 text-ink">
        {title}
      </h2>
      {posts.length === 0 ? (
        <p className="mt-4 text-body text-text-secondary">{empty}</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="text-caption text-text-secondary">{post.published}</p>
              <Link href={`/writing/${post.slug}`} className="mt-1 block font-serif text-h3 text-ink" data-track={`link:open_writing:${post.slug}`}>
                {post.title}
              </Link>
              <p className="mt-2 max-w-reading text-body text-text-secondary">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default function WritingPage() {
  return (
    <>
      <PageHero eyebrow={writingIntro.eyebrow} title={writingIntro.title} deck={writingIntro.deck} />
      <div className="shell pb-8">
        <p className="text-caption">
          <a href="/writing/feed.xml" data-track="link:writing_feed:writing" className="underline decoration-accent underline-offset-4">
            RSS
          </a>
        </p>
        <Shelf title={writingIntro.essayShelf} kind="essay" empty="No essays are published here yet." />
        <Shelf title={writingIntro.letterShelf} kind="newsletter" empty="No letters are mirrored here yet." />
      </div>
      <section className="border-t border-border-subtle">
        <div className="shell grid gap-8 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-h2 text-ink">Get the letter</h2>
            <p className="mt-4 max-w-reading text-body text-text-secondary">
              Leave your name and email. A letter is a newsletter note, mirrored here the day after it goes out.
            </p>
          </div>
          <NoteForm kind="newsletter" submitLabel="Send me the letter" track="button:submit_newsletter:writing" />
        </div>
      </section>
    </>
  );
}
