// ============================================
// WHAT THIS FILE DOES (plain English):
// These are the two poems the narrative spec puts on the site.
// The lines are the document text, with each stanza kept in order.
// To The Sky names its author, because the source document does.
// This file only stores the words. The page decides how they look.
// ============================================

export type Poem = {
  title: string;
  year: string;
  stanzas: string[][];
  credit?: string;
};

export const poems: Poem[] = [
  {
    title: "To The Sky",
    year: "2022",
    credit: "Author: Kassidy J. Bowen, 2017 Uintah Alumni",
    stanzas: [
      [
        "After drawing years of plans",
        "Each T is crossed and lines drawn straight",
        "The day has come to built it great",
        "with hopeful hearts and able hands",
      ],
      [
        "Each beam is raised to scrape the sky.",
        "The steel is pulled and shaped to last",
        "through years of life that hold steadfast",
        "and remain standing head held high.",
      ],
      [
        "A back that's braced with heavy care",
        "resolved to carry all it holds",
        "tenacity worth more than gold",
        "and fortitude beyond compare",
      ],
      [
        "Resilient through the trying years",
        "it rises yet, and standing tall",
        "is stronger, greater, than them all.",
        "Much more to it than first appears.",
      ],
      [
        "And with this arch, drawn up with grit",
        "let us stand, both tall and true.",
        "And like this gateway, so are you,",
        "So always rise and never quit.",
      ],
    ],
  },
  {
    title: "Your understanding charm",
    year: "2024",
    stanzas: [
      [
        "Your understanding charm",
        "With the grace to step aside",
        "Makes me want to burn",
        "At the stake and say goodbye",
      ],
      [
        "The piercing of my heart",
        "With the diagnosis of self-inflicted",
        "Was when I caused yours",
        "In my bedroom when couldn't continue",
      ],
      [
        "What's wrong with me?",
        "Runs glaring light marathons",
        "On the screen of my mind",
        "And only static plays on blast",
      ],
      [
        "Confusion fogs up everything I see",
        "I am lost in the vision of my life",
        "It is so close to what I designed",
        "How do I fit in something good in my life?",
      ],
      [
        "Was the timing the cause of the fall",
        "It's easy to write that off as true",
        "The truth is in me knowing that's false",
        "When you asked me to jump I decided to run",
      ],
      [
        "The portrait of you that hangs in the Louvre",
        "Is one of mastery and brilliance",
        "Not perfect but accepted by the greats of our time",
        "It's not on the tourist map",
        "And it brings you no shame",
        "Except for the need I have to be a Michael Angelo",
        "Though he is long died",
      ],
      [
        "You try and teach me who I am inside",
        "It's not the rarity I was predesignated to be",
        "But the architect of that was a cult of misconception",
        "I seem unable to let myself be free from.",
        "Can I be hung by you in this corner of the muse?",
        "Wasn't I meant to be next to the Mona Lisa?",
      ],
      [
        "Can I handle the accidental flashes?",
        "That barrage those with such fame",
        "I can't even face the front camera",
        "That has no desire to flatter or admire",
        "The genetics weren't mine for that pleasure",
      ],
      [
        "The way you'd repaint your whole canvas for me",
        "Causes me to reel in the destruction I've caused",
        "Your brush strokes need no touchups",
        "It's me learning I can't be the whole show",
        "And I need to decide what I want to display.",
      ],
      [
        "So I need to go, as your painting is one of tragedy",
        "That I can no longer bear to see",
        "Because it reflects the things in me",
        "That I no longer believe I want to be",
      ],
      [
        "My insecurities are going to ruin this",
        "Echoing the thoughts of artists",
        "Saying after this one it'll be bliss",
        "But finding that it was all amiss.",
      ],
      [
        "Let me leave this display",
        "I know what you'll say",
        "But the frame is constricting",
        "And you'll just get hurt on the way",
      ],
      [
        "You don't need a repaint",
        "At least not for me",
        "For I can't even see",
        "Where I want to be",
      ],
      ["It'll be found", "But for now", "On my own", "My journeys alone"],
      [
        "I'll visit your painting",
        "As I know you'll make changes",
        "But please dont keep waiting",
        "For that can bring danger",
      ],
      [
        "Your naivety had a siren pull",
        "Something I'd lost to those long ago",
      ],
      [
        "Confusion fogs up everything I see",
        "I am lost in the vision of my life",
        "It is so close to what I designed",
        "How do I fit in something good in my life?",
      ],
    ],
  },
];
