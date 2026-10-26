// ============================================
// WHAT THIS FILE DOES (plain English):
// The About section: the personal introduction, plus two deeper
// pages (the pre-college years, and Handmade). The words come from
// the approved copy doc. No dollar figures. Words only, no UI.
// ============================================

import type { Story } from "@/components/editorial/StoryRow";
import { go, type Detail } from "@/content/detail";
import { ph, type Photo } from "@/content/photos";

export const aboutIntro = {
  label: "About",
  title: "Hi, I'm Brant.",
  description: "Meet Brant Johnson: product builder, event organizer, performer, and enthusiastic supporter of other people's ideas.",
  body: [
    "I get very invested in other people's ideas. Tell me what you're trying to make happen, and there's a decent chance I'll start asking who we need, what it'll take, and whether you've called the people who could help.",
    "That's shown up in a lot of places. I work in product, love putting on events, and have an unreasonable willingness to take on something complicated if I think people will be glad it exists.",
    "I'm now building Intro and Bridger. Both started with the same frustration: people want to meet, make things, and spend time together, but the existing tools don't always help much once they're in the same room.",
  ],
  links: [
    go("What I'm building", "/work", "link:work:about"),
    go("The events", "/events", "link:events:about"),
  ],
};

// THIS SECTION DOES: the three stories on the About page, each with its photo and links
export const aboutStories: Story[] = [
  {
    id: "how-i-got-here",
    title: "How I got here",
    body: [
      "After high school I spent two years in Birmingham, England, doing regional volunteer work. I built reporting tools when I saw how much time people were spending on paperwork. Later I worked in startup teams, product, government, sales, and theater. I earned my BS in Business and Analysis in 2025.",
      "I deliberately took a sales role at Utah Business after product. I wanted to hear why somebody would pay for an idea and why they might walk away. That work also put me in the middle of event production. Intro came out of those conversations and experiences.",
    ],
    photos: [ph("general/crew-team-photo.webp", "The Crew team gathered on a yellow couch.", "The Crew team", { focus: { x: 0.5, y: 0.55 } })],
  },
  {
    id: "party",
    title: "I love throwing a party",
    body: [
      "Give me a theme and a group of people and I will probably have an opinion about the decorations. I like figuring out what will make an event feel special, including the parts people don't notice until they're missing.",
      "I've done conferences and organized productions, and I still make time for costumes, Christmas sweaters, and whatever excuse there is to bring friends together. I've built three parade floats from scratch. Storage has become an issue.",
    ],
    links: [
      go("Parties and gatherings", "/events/parties", "link:parties:about"),
      go("Things I've made", "/about/handmade", "link:handmade:about"),
    ],
    photos: [ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { focus: { x: 0.5, y: 0.35 } })],
  },
  {
    id: "pre-college",
    title: "The pre-college era",
    body: [
      "Before I had a LinkedIn profile, I had a petition about endangered bees, a lot of student government meetings, and some fairly elaborate event plans.",
      "I'm keeping those stories together, because I like them and because there are some good ones.",
    ],
    links: [go("The pre-college years", "/about/pre-college", "link:pre_college:about")],
  },
];

export const aboutGallery: { title: string; photos: Photo[] } = {
  title: "A few photos",
  photos: [
    ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker"),
    ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage in Elf the Musical.", "Elf the Musical"),
    ph("general/ya-group-photo.webp", "The BYU Young Ambassadors company in blue blazers in a garden.", "BYU Young Ambassadors"),
    ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Sandbox"),
    ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday.", "Founder Friday"),
  ],
};

const crumbs = (label: string) => [{ label: "About", href: "/about" }, { label }];
const back = { href: "/about", label: "Back to About" };

export const aboutDetails: Detail[] = [
  {
    slug: "pre-college",
    path: "/about/pre-college",
    title: "The pre-college era",
    metaTitle: "The Pre-College Era",
    description: "Student government, school productions, ambitious decorations, and a petition about bees.",
    crumbs: crumbs("The pre-college era"),
    label: "About",
    lead: ["I was apparently already very comfortable asking adults for permission to do increasingly inconvenient things."],
    sections: [
      {
        id: "bees",
        title: "The bee petition",
        body: [
          "In third grade I tried to get bees placed on the endangered species list. I collected two pages of signatures to send to the President. The petition never left the house.",
        ],
      },
      {
        id: "student-government",
        title: "Student government",
        body: [
          "I was student body president in elementary, middle, and high school. In high school I started meeting weekly with administrators and counselors about student well-being, helped introduce an arts chair, and planned more than 55 assemblies.",
          "I also made posters for students I thought deserved some recognition, then hung them while they were in class. A few asked if they could keep them. That was the idea.",
          "I became friends with the school janitors, too. They knew where everything was and usually knew how to get things done.",
        ],
        photos: [ph("general/fbla-scholars-panel.webp", "Brant in a patterned jacket smiling beside two students at a scholars panel.", "A scholars panel", { position: "30% 40%" })],
      },
      {
        id: "productions",
        title: "The productions",
        body: [
          "I ran marketing for high school theater shows and worked with a ten-person student team. We filled 1,200 seats nightly across twelve-day runs and the program placed among the state's top ten. One show had a flying car. Another took over the school hallways with decorations.",
          "Then there was the homecoming dance we held at an airport. A helicopter brought in the game ball. The school brought the idea back five years later.",
        ],
        links: [
          go("Homecoming at the airport", "/events/airport-homecoming", "link:airport:pre_college"),
          go("Theater", "/events/theater", "link:theater:pre_college"),
          go("School events", "/events/school-events", "link:school_events:pre_college"),
        ],
        photos: [
          ph("chitty-high-school-productions/img-2731.webp", "The flying car on stage at Chitty Chitty Bang Bang, with the cast dancing around it.", "Chitty Chitty Bang Bang"),
        ],
      },
      {
        id: "archway",
        title: "An idea that followed me into adulthood",
        body: ["At eighteen, I began working on replacing the arch over the road to my high school. That one took about five years, and a lot of other people made it possible."],
        links: [go("The archway story", "/community/archway", "link:archway:pre_college")],
      },
    ],
    back,
  },
  {
    slug: "handmade",
    path: "/about/handmade",
    title: "I make things for the occasion.",
    metaTitle: "Handmade",
    description: "Handmade costumes, Christmas sweaters, parade floats, and oversized decorations by Brant Johnson.",
    crumbs: crumbs("Handmade"),
    label: "About",
    lead: ["Sometimes that's a sweater. It has also involved a fifteen-foot nutcracker, and I'm still not sure where everything is supposed to go afterward."],
    sections: [
      {
        id: "sweaters",
        title: "The sweaters",
        body: ["I've made my own Christmas sweater every year and, as of 2024, hadn't lost any of the seventeen contests I'd entered. I've kept track, obviously."],
        photos: [ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { focus: { x: 0.5, y: 0.35 } })],
      },
      {
        id: "costumes",
        title: "Costumes and parties",
        body: [
          "I tend to make four or five Halloween costumes a year, but I love a theme for any kind of party. Planning the experience is half the fun. I also like the part when everybody finally shows up and starts enjoying the thing we spent so long making.",
        ],
      },
      {
        id: "too-large",
        title: "Things too large for a closet",
        body: [
          "I've built three parade floats from scratch. In school we put up 25-foot Christmas trees and hand-painted nutcrackers around fifteen feet tall. A few weekends started at five in the morning so the decorations would be ready when students arrived.",
        ],
        links: [
          go("Parties and gatherings", "/events/parties", "link:parties:handmade"),
          go("Event installations", "/events/holiday-installations", "link:installations:handmade"),
          go("About", "/about", "link:about:handmade"),
        ],
      },
    ],
    back,
  },
];
