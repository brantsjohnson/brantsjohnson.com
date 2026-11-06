// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the two search files. The page list names every public
// address once, and gives a date only when the content has a real
// date. The image list puts each picture under a page that shows it.
// Photographs that are kept for search, but not placed on a page,
// go with the story they belong to (the archway, a job, a show)
// instead of all sitting under About.
// ============================================

import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { aboutDetails } from "@/content/about";
import { communityDetails, communityLeads, serviceGallery } from "@/content/community";
import { eventDetails, eventGroups } from "@/content/events";
import { features } from "@/content/features";
import { homeIndex, homeStarts } from "@/content/home-media";
import { pageForPhoto, photoRecord } from "@/content/photo-catalog";
import { aboutPhoto, headshot, type Photo, type Video } from "@/content/photos";
import { poems } from "@/content/poems";
import { podcasts, youtubeEmbed } from "@/content/podcasts";
import { publicCvDownload } from "@/content/site-content";
import { crewBrandMedia, workDetails } from "@/content/work";
import type { Detail } from "@/content/detail";
import type { Story } from "@/components/editorial/StoryRow";

export type PageEntry = {
  path: string;
  lastModified?: string; // YYYY-MM-DD, only when that date is known
};

export type ListedImage = {
  src: string;
  title: string;
  caption: string;
  place?: string;
};

export type ListedVideo = {
  thumbnail: string;
  title: string;
  description: string;
  contentUrl?: string;
  playerUrl?: string;
  publicationDate?: string;
};

export type ImagePage = {
  path: string;
  images: ListedImage[];
  videos: ListedVideo[];
};

type DatedPost = { slug: string; written: string };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

// A story row draws at most three photos. Later ones are stored but
// not shown, so they do not belong in the search file for that page.
const PHOTOS_ON_A_ROW = 3;

function unique(paths: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const path of paths) {
    if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api") || path.startsWith("/chat") || path === "/hi") continue;
    if (seen.has(path)) continue;
    seen.add(path);
    out.push(path);
  }
  return out;
}

// THIS SECTION DOES: every public address, once, in a stable order.
// A date is attached only when the content itself has one. A build
// date would tell Google every page changed today, and then it
// stops trusting the dates.
export function pageEntries(posts: DatedPost[]): PageEntry[] {
  const dated = new Map<string, string>();
  for (const post of posts) {
    if (DATE.test(post.written)) dated.set(`/writing/${post.slug}`, post.written);
  }

  const paths = unique([
    "/",
    "/about",
    ...aboutDetails.map((item) => item.path),
    "/work",
    ...workDetails.map((item) => item.path),
    "/work/crew-brand",
    "/events",
    ...eventDetails.map((item) => item.path),
    "/community",
    ...communityDetails.map((item) => item.path),
    "/articles",
    "/writing/poetry",
    "/writing/archive",
    ...posts.map((post) => `/writing/${post.slug}`),
    ...poems.map((poem) => `/writing/poetry/${poem.slug}`),
    "/contact",
    "/ask",
    "/now",
    publicCvDownload.href,
    ...features.map((feature) => feature.href).filter((href) => href.startsWith("/")),
  ]);

  return paths.map((path) => {
    const lastModified = dated.get(path);
    return lastModified ? { path, lastModified } : { path };
  });
}

function listedImage(photo: Pick<Photo, "src" | "alt">): ListedImage | null {
  if (!photo.src.startsWith("/") || photo.src.toLowerCase().includes("scholarship-2023")) return null;
  const record = photoRecord(photo.src);
  return {
    src: photo.src,
    title: record?.title ?? photo.alt,
    caption: record?.caption ?? photo.alt,
    place: record?.place,
  };
}

function addImage(pages: Map<string, ImagePage>, path: string, photo: Pick<Photo, "src" | "alt">) {
  const image = listedImage(photo);
  if (!image) return;
  const page = pages.get(path) ?? { path, images: [], videos: [] };
  if (page.images.some((item) => item.src === image.src)) return;
  page.images.push(image);
  pages.set(path, page);
}

function addVideo(pages: Map<string, ImagePage>, path: string, video: ListedVideo) {
  const page = pages.get(path) ?? { path, images: [], videos: [] };
  const key = video.contentUrl ?? video.playerUrl;
  if (!key || page.videos.some((item) => (item.contentUrl ?? item.playerUrl) === key)) return;
  page.videos.push(video);
  pages.set(path, page);
}

function addStoryMedia(pages: Map<string, ImagePage>, path: string, story: Story) {
  for (const photo of (story.photos ?? []).slice(0, PHOTOS_ON_A_ROW)) addImage(pages, path, photo);
  if (story.video) addVideo(pages, path, videoFromFile(story.video));
}

function addDetail(pages: Map<string, ImagePage>, detail: Detail) {
  for (const section of detail.sections) addStoryMedia(pages, detail.path, section);
  for (const photo of detail.gallery?.photos ?? []) addImage(pages, detail.path, photo);
}

function videoFromFile(video: Video): ListedVideo {
  return {
    thumbnail: video.poster,
    title: video.label,
    description: video.label,
    contentUrl: video.mp4,
  };
}

function filesUnder(dir: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) filesUnder(path, found);
    else if (/\.(webp|jpe?g|png)$/i.test(name)) found.push(path);
  }
  return found;
}

// THIS SECTION DOES: pictures and videos, grouped by the page a
// person would open to see them. Stored photographs that are not
// on a page are added under the matching story page.
export function imagePages(publicDir = join(process.cwd(), "public")): ImagePage[] {
  const pages = new Map<string, ImagePage>();

  addImage(pages, "/", headshot);
  for (const row of homeIndex) addImage(pages, "/", row.photo);
  for (const card of homeStarts) addImage(pages, "/", card.photo);

  addImage(pages, "/about", aboutPhoto);

  for (const item of eventGroups.flatMap((group) => group.items)) {
    if (item.photo) addImage(pages, "/events", item.photo);
  }

  for (const lead of communityLeads) addImage(pages, "/community", lead.photo);
  for (const photo of serviceGallery) addImage(pages, "/community", photo);

  for (const detail of [...aboutDetails, ...workDetails, ...eventDetails, ...communityDetails]) addDetail(pages, detail);

  addImage(pages, "/work/crew-brand", crewBrandMedia.wordmark);
  for (const photo of [...crewBrandMedia.drawings, ...crewBrandMedia.inProduct, ...crewBrandMedia.stills]) {
    addImage(pages, "/work/crew-brand", photo);
  }
  for (const clip of crewBrandMedia.motion) {
    addVideo(pages, "/work/crew-brand", {
      thumbnail: clip.poster,
      title: clip.alt,
      description: `An illustration I drew for Crew. ${clip.alt}`,
      contentUrl: clip.mp4,
    });
  }

  for (const episode of podcasts) {
    const playerUrl = youtubeEmbed(episode.url);
    const id = playerUrl ? new URL(playerUrl).pathname.split("/").pop() : "";
    if (!playerUrl || !id) continue;
    addVideo(pages, "/articles", {
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      title: episode.title,
      description: `${episode.title} ${episode.show}, with Brant S. Johnson of Vernal, Utah.`,
      playerUrl,
      publicationDate: episode.date,
    });
  }

  const already = new Set(Array.from(pages.values()).flatMap((page) => page.images.map((image) => image.src)));
  for (const file of filesUnder(publicDir)) {
    const src = file.slice(publicDir.length);
    if (already.has(src)) continue;
    const record = photoRecord(src);
    if (!record) continue;
    addImage(pages, pageForPhoto(src), { src: record.src, alt: record.title });
    already.add(src);
  }

  return Array.from(pages.values()).filter((page) => page.images.length > 0 || page.videos.length > 0);
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function absolute(origin: string, path: string): string {
  if (path.startsWith("https://")) return path;
  return `${origin}${path}`;
}

// THIS SECTION DOES: the image search file. Each address is a page.
// The pictures and videos listed under it are the ones that page shows.
export function imageSitemapXml(origin: string, pages: ImagePage[]): string {
  const urls = pages
    .map((page) => {
      const images = page.images
        .map((image) => {
          const place = image.place ? `\n      <image:geo_location>${escapeXml(image.place)}</image:geo_location>` : "";
          return `    <image:image>
      <image:loc>${escapeXml(absolute(origin, image.src))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>${place}
    </image:image>`;
        })
        .join("\n");
      const videos = page.videos
        .map((video) => {
          const media = video.contentUrl
            ? `      <video:content_loc>${escapeXml(absolute(origin, video.contentUrl))}</video:content_loc>`
            : `      <video:player_loc>${escapeXml(video.playerUrl ?? "")}</video:player_loc>`;
          const published = video.publicationDate ? `\n      <video:publication_date>${escapeXml(video.publicationDate)}</video:publication_date>` : "";
          return `    <video:video>
      <video:thumbnail_loc>${escapeXml(absolute(origin, video.thumbnail))}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
${media}${published}
    </video:video>`;
        })
        .join("\n");
      return `  <url>
    <loc>${escapeXml(absolute(origin, page.path))}</loc>
${[images, videos].filter(Boolean).join("\n")}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;
}
