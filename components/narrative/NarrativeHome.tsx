// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the home page story. A sticky name and section list sit
// on the left on a wide screen. The story scrolls on the right.
// On a phone the list collapses into the Menu bar from HomeNav.
// ============================================

import Image from "next/image";
import { AreaTags } from "@/components/narrative/AreaTags";
import { CopyText } from "@/components/narrative/CopyText";
import { HeroCard } from "@/components/narrative/HeroCard";
import { HomeNav } from "@/components/narrative/HomeNav";
import { PhotoSlot } from "@/components/narrative/PhotoSlot";
import { StoryLink } from "@/components/narrative/StoryLink";
import {
  activist,
  beliefs,
  contactBlock,
  creator,
  entrepreneur,
  performer,
  product,
  publishedWriting,
  story,
} from "@/content/narrative";
import { booking, experience, identity, inquiries } from "@/content/site-content";

const headingClass = "scroll-mt-24 font-serif text-h2 text-ink outline-none";

export function NarrativeHome() {
  return (
    <div className="shell lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-12 lg:pt-10 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-x-16">
      <HomeNav />
      <div className="min-w-0">
        <HeroCard />

        <section aria-labelledby={product.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={product.id} tabIndex={-1} className={headingClass}>
            {product.title}
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            {product.paragraphs.map((parts, index) => (
              <CopyText key={index} parts={parts} />
            ))}
          </div>
          <blockquote className="mt-10 max-w-reading border-l-2 border-accent pl-6">
            <p className="font-serif text-h3 text-ink">{product.quote}</p>
            <p className="mt-4">
              <StoryLink href={product.quoteLink.href} track={product.quoteLink.track}>
                {product.quoteLink.text}
              </StoryLink>
            </p>
          </blockquote>
          <ol className="mt-12">
            {experience.map((role) => (
              <li
                key={`${role.org}-${role.dates}`}
                className="grid gap-2 border-t border-border-subtle py-6 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <p className="text-caption text-text-secondary">{role.dates}</p>
                <div>
                  <h3 className="font-serif text-h3 text-ink">{role.org}</h3>
                  <p className="mt-1 text-body text-ink">{role.role}</p>
                  <p className="mt-3 max-w-reading text-body text-text-secondary">{role.summary}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <StoryLink href="/work" track="link:work_history:product">
              See full work history
            </StoryLink>
            <StoryLink href="/resume.pdf" track="link:resume:product">
              See résumé
            </StoryLink>
          </p>
        </section>

        <section aria-labelledby={creator.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={creator.id} tabIndex={-1} className={headingClass}>
            {creator.title}
          </h2>
          <CopyText parts={creator.intro} className="mt-6 max-w-reading text-body text-text-secondary" />

          <article className="mt-12 border-t border-border-subtle pt-10">
            <h3 id={creator.crew.id} tabIndex={-1} className="scroll-mt-24 font-serif text-h3 text-ink outline-none">
              {creator.crew.title}
            </h3>
            <div className="mt-4">
              <AreaTags tags={creator.crew.tags} />
            </div>
            <p className="mt-4 max-w-reading text-body text-text-secondary">{creator.crew.body}</p>
            <div className="mt-8 max-w-xs">
              <Image
                src={creator.crew.wordmark.src}
                alt={creator.crew.wordmark.alt}
                width={creator.crew.wordmark.width}
                height={creator.crew.wordmark.height}
                className="h-auto w-full mix-blend-multiply"
              />
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {creator.crew.motion.map((item) => (
                <div key={item.src} className="overflow-hidden rounded-panel border border-border-subtle bg-surface p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                    className="mx-auto h-auto max-h-72 w-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {creator.crew.stills.map((item) => (
                <div key={item.src} className="overflow-hidden rounded-panel border border-border-subtle bg-surface">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
            <p className="mt-6">
              <StoryLink href={creator.crew.back.href} track={creator.crew.back.track}>
                {creator.crew.back.text}
              </StoryLink>
            </p>
          </article>

          <article className="mt-12 border-t border-border-subtle pt-10">
            <h3
              id={creator.backlocal.id}
              tabIndex={-1}
              className="scroll-mt-24 font-serif text-h3 text-ink outline-none"
            >
              {creator.backlocal.title}
            </h3>
            <div className="mt-4">
              <AreaTags tags={creator.backlocal.tags} />
            </div>
            <p className="mt-4 max-w-reading text-body text-text-secondary">
              {creator.backlocal.body}{" "}
              <StoryLink href={creator.backlocal.link.href} track={creator.backlocal.link.track}>
                {creator.backlocal.link.text}
              </StoryLink>
            </p>
          </article>

          <article className="mt-12 border-t border-border-subtle pt-10">
            <h3 id={creator.writing.id} tabIndex={-1} className="scroll-mt-24 font-serif text-h3 text-ink outline-none">
              {creator.writing.title}
            </h3>
            <ol className="mt-6">
              {publishedWriting.map((post) => (
                <li key={post.href} className="border-t border-border-subtle py-5">
                  <p className="text-caption text-text-secondary">{post.date}</p>
                  <a
                    href={post.href}
                    className="mt-1 inline-block max-w-reading font-serif text-h3 text-ink underline decoration-accent decoration-2 underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <StoryLink href={creator.writing.all.href} track={creator.writing.all.track}>
                {creator.writing.all.text}
              </StoryLink>
              <StoryLink href={creator.writing.subscribe.href} track={creator.writing.subscribe.track}>
                {creator.writing.subscribe.text}
              </StoryLink>
            </p>
          </article>

          <article className="mt-12 border-t border-border-subtle pt-10">
            <h3 id={creator.poetry.id} tabIndex={-1} className="scroll-mt-24 font-serif text-h3 text-ink outline-none">
              {creator.poetry.title}
            </h3>
            <p className="mt-4 max-w-reading text-body text-text-secondary">{creator.poetry.intro}</p>
            <div className="mt-10 flex flex-col gap-16">
              {creator.poetry.poems.map((poem) => (
                <figure key={poem.title}>
                  <h4 className="font-serif text-h3 text-ink">
                    {poem.title} <span className="text-text-secondary">({poem.year})</span>
                  </h4>
                  <div className="mt-6 max-w-reading font-serif text-[1.35rem] leading-snug text-ink">
                    {poem.stanzas.map((stanza, stanzaIndex) => (
                      <p key={`${poem.title}-${stanzaIndex}`} className="mt-6 first:mt-0">
                        {stanza.map((line, lineIndex) => (
                          <span key={`${stanzaIndex}-${lineIndex}`} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                  {poem.credit && <figcaption className="mt-6 text-caption text-text-secondary">{poem.credit}</figcaption>}
                </figure>
              ))}
            </div>
          </article>
        </section>

        <section aria-labelledby={performer.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={performer.id} tabIndex={-1} className={headingClass}>
            {performer.title}
          </h2>
          <div className="mt-4">
            <AreaTags tags={performer.tags} />
          </div>
          <div className="mt-6 flex flex-col gap-6">
            {performer.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="max-w-reading text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
            <p>
              <StoryLink href={performer.workLink.href} track={performer.workLink.track}>
                {performer.workLink.text}
              </StoryLink>
            </p>
            <p>
              <StoryLink href={performer.essay.href} track={performer.essay.track}>
                {performer.essay.text}
              </StoryLink>
            </p>
          </div>
          <PhotoSlot orientation="landscape" className="mt-10" />
        </section>

        <section aria-labelledby={entrepreneur.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={entrepreneur.id} tabIndex={-1} className={headingClass}>
            {entrepreneur.title}
          </h2>
          <p className="mt-6 max-w-reading text-body text-text-secondary">{entrepreneur.intro}</p>
          <div className="mt-10 flex flex-col gap-12">
            {entrepreneur.cards.map((card) => (
              <article key={card.name} className="border-t border-border-subtle pt-8">
                <AreaTags tags={card.tags} />
                <h3 className="mt-4 font-serif text-h3 text-ink">{card.name}</h3>
                <p className="mt-2 text-body text-ink">
                  {card.role}, {card.dates}
                </p>
                <p className="mt-3 max-w-reading text-body text-text-secondary">{card.summary}</p>
                {card.image && (
                  <div className="relative mt-6 aspect-[4/3] max-w-md overflow-hidden rounded-panel border border-border-subtle bg-surface">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw"
                      className="object-contain p-4"
                    />
                  </div>
                )}
                {card.href && card.hrefLabel && card.track && (
                  <p className="mt-4">
                    <StoryLink href={card.href} track={card.track}>
                      {card.hrefLabel}
                    </StoryLink>
                  </p>
                )}
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-reading text-body text-text-secondary">{entrepreneur.close}</p>
          <p className="mt-8 font-serif text-h3 text-ink">{entrepreneur.echo}</p>
        </section>

        <section aria-labelledby={activist.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={activist.id} tabIndex={-1} className={headingClass}>
            {activist.title}
          </h2>
          <p className="mt-6 max-w-reading text-body text-text-secondary">{activist.intro}</p>

          <article className="mt-12">
            <h3 className="font-serif text-h3 text-ink">{activist.archway.title}</h3>
            {activist.archway.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 max-w-reading text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
            <figure className="mt-8 max-w-3xl">
              <video
                controls
                playsInline
                preload="metadata"
                aria-label={activist.archway.video.label}
                className="w-full rounded-panel bg-ink"
              >
                <source src={activist.archway.video.src} type="video/mp4" />
              </video>
              <figcaption className="mt-3 text-caption text-text-secondary">{activist.archway.video.label}</figcaption>
            </figure>
          </article>

          <article className="mt-12">
            <h3 className="font-serif text-h3 text-ink">{activist.scholarship.title}</h3>
            {activist.scholarship.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 max-w-reading text-body text-text-secondary">
                {paragraph}
              </p>
            ))}
          </article>

          <article className="mt-12">
            <h3 className="font-serif text-h3 text-ink">{activist.government.title}</h3>
            <CopyText parts={activist.government.parts} className="mt-4 max-w-reading text-body text-text-secondary" />
          </article>
        </section>

        <section aria-labelledby={story.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={story.id} tabIndex={-1} className={headingClass}>
            {story.title}
          </h2>
          <div className="mt-8 flex flex-col gap-6">
            {story.paragraphs.map((parts, index) => (
              <CopyText key={index} parts={parts} />
            ))}
          </div>
        </section>

        <section aria-labelledby={beliefs.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={beliefs.id} tabIndex={-1} className={headingClass}>
            {beliefs.title}
          </h2>
          <ul className="mt-8 flex max-w-reading flex-col gap-5">
            {beliefs.items.map((item) => (
              <li key={item} className="border-t border-border-subtle pt-5 text-body text-ink">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={contactBlock.id} className="border-t border-border-subtle py-16 md:py-24">
          <h2 id={contactBlock.id} tabIndex={-1} className={headingClass}>
            {contactBlock.title}
          </h2>
          <p className="mt-6 max-w-reading text-body text-text-secondary">{contactBlock.line}</p>
          <div className="mt-6 flex flex-col gap-1">
            <StoryLink href={inquiries.href} track="link:email:contact_home">
              {inquiries.email}
            </StoryLink>
            <StoryLink href={identity.linkedin} track="link:linkedin:contact_home">
              LinkedIn
            </StoryLink>
            <StoryLink href={booking.href} track="link:book_time:contact_home">
              {booking.label}
            </StoryLink>
          </div>
        </section>
      </div>
    </div>
  );
}
