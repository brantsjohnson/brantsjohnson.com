// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the content for the Writings page, which groups two kinds
// of writing: the blog (essays and thinking) and poetry (its own quieter
// reading mode, shown as a subsection). Both lists start empty on
// purpose so the page shows an honest "nothing here yet" state until
// real pieces are added.
// ============================================

// THIS SECTION DOES: describe the shape of one written piece
export type Writing = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // human-readable, such as "Mar 2026"
  kind: "Blog" | "Poetry";
};

// THIS SECTION DOES: the blog posts. Empty for now; add entries here as they are written.
export const blogPosts: Writing[] = [];

// THIS SECTION DOES: the poems. Empty for now; add entries here as they are written.
export const poems: Writing[] = [];

// THIS SECTION DOES: the page intro and the honest empty-state copy for each group
export const writings = {
  eyebrow: "Writings",
  heading: "Writing and poetry.",
  intro:
    "Longer thinking lives in the blog. Poetry sits on its own, meant to be read at a slower pace.",
  blog: {
    heading: "Blog",
    emptyTitle: "No posts yet",
    emptyDescription: "Essays and notes will land here as they are written.",
  },
  poetry: {
    heading: "Poetry",
    emptyTitle: "No poems yet",
    emptyDescription: "Poems will appear here, kept apart from the blog on purpose.",
  },
};
