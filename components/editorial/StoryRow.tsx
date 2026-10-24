// ============================================
// WHAT THIS FILE DOES (plain English):
// One story on a page: a label, a headline, a few short paragraphs,
// optional big numbers and links, and one or two photos beside the
// words. Rows can flip sides so a page has a rhythm. White space
// does the separating, with a hairline between rows.
// ============================================

import { clsx } from "clsx";
import { Figure } from "@/components/editorial/Figure";
import { Prose, type Paragraph } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { StoryLink } from "@/components/narrative/StoryLink";
import type { Photo, Video } from "@/content/photos";

export type StoryLinkItem = { text: string; href: string; track: string };

export type Story = {
  id: string;
  eyebrow: string;
  title: string;
  body: Paragraph[];
  stats?: { value: string; label: string }[];
  quote?: string;
  links?: StoryLinkItem[];
  photos?: Photo[];
  video?: Video;
};

type StoryRowProps = {
  story: Story;
  flip?: boolean;
};

export function StoryRow({ story, flip = false }: StoryRowProps) {
  const photos = story.photos ?? [];
  const hasMedia = photos.length > 0 || Boolean(story.video);

  return (
    <article id={story.id} className="scroll-mt-24 border-t border-border-subtle py-16 md:py-24">
      <div className="shell">
        <div className={clsx("grid items-start gap-10 lg:grid-cols-12 lg:gap-16", !hasMedia && "lg:grid-cols-12")}>
          <Reveal className={clsx(hasMedia ? "lg:col-span-5" : "lg:col-span-8", flip && hasMedia && "lg:order-2")}>
            <p className="label text-accent-deep">{story.eyebrow}</p>
            <h2 className="mt-4 font-serif text-h2 text-ink">{story.title}</h2>
            <Prose body={story.body} className="mt-8" />

            {story.stats?.length ? (
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                {story.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="m-0">
                      <span className="block font-serif text-[clamp(2.4rem,4.4vw,3.8rem)] leading-none text-ink">{stat.value}</span>
                      <span className="label mt-2 block text-[0.66rem] text-text-secondary">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {story.quote ? (
              <blockquote className="mt-10 max-w-reading border-l-2 border-accent pl-6 font-serif text-[1.7rem] italic leading-snug text-ink">
                {story.quote}
              </blockquote>
            ) : null}

            {story.links?.length ? (
              <ul className="mt-8 flex flex-col gap-3">
                {story.links.map((item) => (
                  <li key={item.href}>
                    <StoryLink href={item.href} track={item.track}>
                      {item.text}
                    </StoryLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          {hasMedia ? (
            <div className={clsx("grid gap-6 lg:col-span-7", flip && "lg:order-1")}>
              {story.video ? (
                <Reveal>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={story.video.poster}
                    aria-label={story.video.label}
                    width={story.video.width}
                    height={story.video.height}
                    className="aspect-video w-full bg-bg-deep object-cover"
                  >
                    <source src={story.video.webm} type="video/webm" />
                    <source src={story.video.mp4} type="video/mp4" />
                  </video>
                </Reveal>
              ) : null}
              {photos.length === 1 ? <Figure photo={photos[0]} sizes="(min-width: 1024px) 56vw, 92vw" /> : null}
              {photos.length >= 2 ? (
                <div className="grid grid-cols-2 items-start gap-6">
                  {photos.slice(0, 2).map((photo, index) => (
                    <Figure
                      key={photo.src}
                      photo={photo}
                      sizes="(min-width: 1024px) 28vw, 46vw"
                      delay={index * 0.15}
                      className={index === 1 ? "mt-12" : undefined}
                    />
                  ))}
                </div>
              ) : null}
              {photos.length >= 3 ? <Figure photo={photos[2]} sizes="(min-width: 1024px) 56vw, 92vw" ratio="16 / 9" /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
