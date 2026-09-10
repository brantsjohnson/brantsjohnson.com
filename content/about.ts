/**
 * About page content.
 *
 * Purpose: the longer, first-person introduction. Written as an array of
 * paragraphs so it renders cleanly and stays easy to edit. Placeholder lines are
 * marked with TODO so Brant can quickly find and replace them with real detail.
 */

export const about = {
  heading: "About",
  intro:
    "I'm Brant S. Johnson. I care about the space where product, people, and public life meet.",

  // Body copy, one string per paragraph.
  paragraphs: [
    "I build products, and the ones that stick with me are about connection: helping people meet the right person, keep up with the friends who matter, and turn good intentions into plans that actually happen.",
    "My interests run across product, AI, media, and government. I like understanding how systems work — a product, a community, a policy — and then trying to make them a little more human and a little more useful.",
    // TODO(brant): Replace with a short, true line about where you're based and
    // what you're focused on right now.
    "TODO: Add a short, personal note here — where you're based, what you're focused on this year, and how you like to work.",
  ],

  // Optional quick facts. Keep these true; delete any you don't want.
  quickFacts: [
    { label: "Focus", value: "Connection & community products" },
    { label: "Interests", value: "Product · AI · Media · Government" },
    { label: "Contact", value: "me@brantsjohnson.com" },
  ],
};
