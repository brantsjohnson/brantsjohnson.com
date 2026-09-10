// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the content for the Photography page. There are no real
// photo collections loaded yet, so the list starts empty and the page
// shows an honest empty state until collections are added here.
// ============================================

// THIS SECTION DOES: describe the shape of one photo collection
export type PhotoCollection = {
  slug: string;
  title: string;
  description: string;
  coverAlt: string; // plain description of the cover image, for accessibility
};

// THIS SECTION DOES: the collections. Empty for now; add entries here when photos are ready.
export const collections: PhotoCollection[] = [];

// THIS SECTION DOES: the page intro and the honest empty-state copy
export const photography = {
  eyebrow: "Photography",
  heading: "Photography.",
  intro: "A place for the photos worth slowing down for. Collections are on the way.",
  emptyTitle: "No collections yet",
  emptyDescription: "Photo collections will appear here once the first set is ready.",
};
