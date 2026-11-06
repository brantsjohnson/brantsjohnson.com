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
