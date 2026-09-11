// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds all the fixed words for the "Now" section on the home
// page (the heading, the intro line, the small labels, and the
// message shown when nothing is shared yet). Keeping the copy here
// means the words live in one place and the section component stays
// about layout, not text.
//
// Important: this file never invents tastes. The real hobbies,
// movies, and books come from Bridger at runtime. When Bridger has
// nothing to share, we show the honest empty message below.
// ============================================

// THIS SECTION DOES: hold the words shown in the Now section
export const nowContent = {
  // Section heading and one short line under it.
  heading: "Now",
  intro: "What I am into lately, pulled from my Bridger profile.",

  // Small labels above each group of shared tastes.
  labels: {
    hobbies: "Hobbies",
    movies: "Movies",
    books: "Books",
    currentlyReading: "Currently reading",
  },

  // The word "by" used between a book title and its author, kept here so copy stays in one place.
  readingByline: "by",

  // Shown when Bridger is not connected yet, or when tastes are set to private.
  // This is a placeholder message only. It does not pretend to list any tastes.
  emptyState: "Nothing shared here yet. Check back soon.",

  // Prefix for the small timestamp that tells visitors how fresh the shared tastes are.
  updatedPrefix: "Updated",
} as const;
