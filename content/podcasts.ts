// ============================================
// WHAT THIS FILE DOES (plain English):
// Podcast episodes that appear on the Articles page, under the
// Podcasts heading. Each one is a show Brant was on, with the
// episode title and the address where a visitor can watch or listen.
// This file only stores those words. The page decides how they look.
// ============================================

export type Podcast = {
  id: string;
  show: string;
  title: string;
  date: string; // YYYY-MM-DD
  url: string;
};

export const podcasts: Podcast[] = [
  {
    id: "quick-before-you-forget",
    show: "Quick Before You Forget",
    title: "Believe in Yourself: How to Overcome Self-Doubt and Find Purpose in Life with Brant Johnson",
    date: "2026-05-11",
    url: "https://www.youtube.com/watch?v=qhj9oJrPxfg&t=1594s",
  },
];

// THIS SECTION DOES: turn a YouTube watch link into the address the page
// uses to show the player. A start time in the link is kept.
export function youtubeEmbed(url: string): string | null {
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("v");
    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
    const start = parsed.searchParams.get("t")?.replace(/s$/, "");
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    if (start && /^\d+$/.test(start)) embed.searchParams.set("start", start);
    return embed.toString();
  } catch {
    return null;
  }
}
