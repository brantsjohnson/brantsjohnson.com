/**
 * Home page content.
 *
 * Purpose: holds the copy shown on the landing page — the hero headline, the
 * supporting paragraph, and the short "what I care about" list. Keeping it here
 * lets Brant rewrite the front door without touching layout code.
 */

export const home = {
  // The big first line a visitor reads.
  heroHeadline: "I build tools that help people actually connect.",

  // One or two sentences under the headline. Honest and human, not a slogan.
  heroSubhead:
    "I'm a product-minded entrepreneur and community builder. I've worked across product, AI, media, and government, and I keep coming back to one belief: technology should be a bridge to real human connection, not a replacement for it.",

  // Short interest areas rendered as chips/badges on the home page.
  interests: ["Product", "AI", "Media", "Government"],

  // A few themed cards that summarize what I do and point deeper into the site.
  highlights: [
    {
      title: "Connection is the antidote",
      body: "I believe connection is the antidote to loneliness, and the foundation of any thriving society. Most of what I build turns strangers into the right conversations and moments into real relationships.",
    },
    {
      title: "Technology as a bridge",
      body: "I don't see technology as the end goal. I see it as a bridge to stronger friendships, better communities, and more meaningful lives.",
    },
    {
      title: "Product, AI, media & government",
      body: "My work spans startups, media, and public service. Across all of it, the throughline is the same: build tools, spaces, and stories that bring people together.",
    },
  ],
};
