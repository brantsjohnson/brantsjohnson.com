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
    "I'm a product-minded founder. My work keeps circling back to the same question: how do we help people find each other, build community, and follow through in real life?",

  // Short interest areas rendered as chips/badges on the home page.
  interests: ["Product", "AI", "Media", "Government"],

  // A few themed cards that summarize what I do and point deeper into the site.
  highlights: [
    {
      title: "Connection & community",
      body: "Most of what I build is aimed at the same thing: turning strangers into the right conversations, and one-off moments into real relationships.",
    },
    {
      title: "Product-minded",
      body: "I like starting from a sharp problem, shipping something small, and letting real use tell me what to build next.",
    },
    {
      title: "Media & government",
      body: "I'm curious about how policy and public conversation actually work, and I make media that tries to explain it honestly.",
    },
  ],
};
