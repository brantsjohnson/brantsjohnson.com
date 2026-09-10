// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the long-form About copy: the first-person biography and a
// few quick facts shown in a side panel. The paragraphs are migrated
// from the live site and tightened for voice. This is the "who is this
// person" page, written as plain strings so it stays easy to edit.
// ============================================

// THIS SECTION DOES: the page intro (eyebrow, headline, and the lead sentence)
export const about = {
  eyebrow: "About",
  heading: "I believe connection is the antidote to loneliness.",
  lead:
    "I am Brant Johnson, a product-minded entrepreneur and community builder. Connection is the thread through everything I make.",

  // THIS SECTION DOES: the body copy, one string per paragraph, migrated from the live site.
  // Dashes were removed and sentences split so the voice stays plain and direct.
  paragraphs: [
    "Over the years I have worked in product management, AI, media, and government. I have seen both the good and the bad of what technology can do. On one hand it can pull us into endless scrolling and shallow interactions. On the other it has the power to rebuild trust, spark collaboration, and make relationships stronger. I choose the second path.",
    "My career has taken me through startups where I helped shape fintech products, media organizations where I worked alongside CEOs and entrepreneurs, and political spaces where I saw how communities thrive when people are engaged. Across all of it, one theme stays constant. I love building tools, spaces, and stories that bring people together.",
    "I do not see technology as the end goal. I see it as a bridge. A bridge to stronger friendships, better communities, and more meaningful lives. That is the future I want to build, and it is the work that excites me every day.",
  ],

  // THIS SECTION DOES: short, true facts for the side panel. Keep these accurate.
  quickFacts: [
    { label: "Focus", value: "Connection and community products" },
    { label: "Interests", value: "Product, AI, media, government" },
    { label: "Based in", value: "Utah" },
  ],
};
