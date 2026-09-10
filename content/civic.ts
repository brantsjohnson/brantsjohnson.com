// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the copy for the Civic Engagement page. Per the sitemap
// notes, this section is about an intellectual interest in how democratic
// and government systems work, not a party platform or endorsement.
// It favors process, systems thinking, and participation.
// ============================================

// THIS SECTION DOES: describe the shape of one "how I think about it" pillar
export type CivicPillar = {
  title: string;
  body: string;
};

// THIS SECTION DOES: the page intro (eyebrow, headline, and framing sentence)
export const civic = {
  eyebrow: "Civic Engagement",
  heading: "Civic work here is about process, not party.",
  intro:
    "My interest is in how public decisions actually get made, and how ordinary people can take part without needing an insider to translate for them.",

  // THIS SECTION DOES: the three lenses I use to think about civic systems
  pillars: [
    {
      title: "Systems over slogans",
      body: "I study how rules, timelines, and incentives shape outcomes before anyone casts a vote.",
    },
    {
      title: "Process made legible",
      body: "Most public process is knowable. It is just explained badly. I care about the explaining part.",
    },
    {
      title: "Participation is local",
      body: "City councils and school boards decide more of daily life than most national coverage suggests.",
    },
  ] satisfies CivicPillar[],

  // THIS SECTION DOES: a resource I value, framed as a resource and not an endorsement.
  // Filibusters is my own policy-theory series about how the machinery works.
  resource: {
    title: "A resource I keep coming back to",
    body:
      "Filibusters is my policy-theory series on how government and public conversation actually work. It stays on structure and mechanics, not teams or opinions.",
    linkLabel: "See Filibusters in projects",
    href: "/projects/filibusters",
  },
};
