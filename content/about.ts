// ============================================
// WHAT THIS FILE DOES (plain English):
// The About page: the personal story (where I come from, the
// pattern, what drives me) and a short "outside of work" section
// with a few photos. Facts come from docs/about-brant.md. This file
// holds words only and does not draw UI.
// ============================================

import type { Story } from "@/components/editorial/StoryRow";
import { ph, type Photo } from "@/content/photos";
import { story } from "@/content/narrative";
import type { CopyPart } from "@/content/narrative";

export const aboutIntro = {
  label: "About",
  title: "Hello, I'm Brant.",
  lead: "I see something that isn't working, I care enough to get involved, and I pull people together.",
  body: [
    "I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me. I live in American Fork, Utah, and I'm open to relocating.",
    "I earned a BS in Business and Analysis at Utah Valley University, Woodbury School of Business, in 2025, with coursework at BYU's Marriott School of Business before that.",
  ],
};

// THIS SECTION DOES: the personal story, one short story at a time
export const aboutStories: Story[] = [
  {
    id: "vernal",
    eyebrow: "Where I come from",
    title: "One person can touch hundreds of lives.",
    body: [story.paragraphs[0] as CopyPart[]],
    photos: [ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", "Vernal, Utah", { position: "50% 40%" })],
  },
  {
    id: "posters",
    eyebrow: "Small ways first",
    title: "Proof that someone noticed.",
    body: [story.paragraphs[1] as CopyPart[]],
    photos: [ph("general/brant-arch-being-welded.webp", "Brant smiling with two builders at the steel arch frame.", "The archway came next", { position: "50% 35%" })],
  },
  {
    id: "road",
    eyebrow: "After high school",
    title: "Same work, new titles.",
    body: [story.paragraphs[2] as CopyPart[]],
    photos: [
      ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Sandbox"),
      ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "Crew"),
    ],
  },
  {
    id: "pattern",
    eyebrow: "Read it as a life",
    title: "The titles changed more than the work did.",
    body: [story.paragraphs[3] as CopyPart[]],
  },
];

// THIS SECTION DOES: the short list of what drives me, shown as a numbered list
export { beliefs } from "@/content/narrative";

// THIS SECTION DOES: the "outside of work" section. A short note, a few photos, a few fun facts.
export const outside = {
  id: "outside",
  label: "Outside of work",
  title: "Serious about work, silly about life.",
  body: [
    "I love theater, even though singing in public is one of my biggest fears. I do it anyway. I make my own Christmas sweater every year and have never lost a sweater contest (17 and counting as of 2024). I have 4 or 5 Halloween costumes every year, and I built 3 parade floats from scratch.",
    "My superpower is hyping people up and helping them feel seen. I'm a connector who gives new and isolated kids the tour.",
  ],
  facts: [
    "In 3rd grade I petitioned to put bees on the endangered species list. I collected two pages of signatures and planned to mail them to the President. It never made it out of the house.",
    "I've waxed my legs and eaten worms for charity.",
    "I became best friends with the school janitors, because they had the real power.",
    "I threw a homecoming dance inside an airport, with a helicopter delivering the game ball. The school repeated it five years later.",
    "I speak with a bit of British English from my years in England.",
    "I worked with the local paper at 14. I tried cross country for one year and hated it.",
  ],
  photos: [
    ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { position: "50% 20%" }),
    ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage in Elf the Musical.", "Elf the Musical"),
    ph("general/ya-group-photo.webp", "The BYU Young Ambassadors company in blue blazers in a garden.", "BYU Young Ambassadors"),
    ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday.", "Founder Friday"),
  ] as Photo[],
};
