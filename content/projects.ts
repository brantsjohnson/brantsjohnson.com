// ============================================
// WHAT THIS FILE DOES (plain English):
// The Projects page: the creative and built work, as cards that open
// a short case study or gallery. Each project also holds its own
// story sections and photos. Facts come from docs/about-brant.md and
// the earlier site copy. No dollar figures. Words only, no UI.
// ============================================

import type { Story } from "@/components/editorial/StoryRow";
import { crew, ph, type Photo } from "@/content/photos";

export type ProjectCover =
  | { kind: "photo"; photo: Photo }
  | { kind: "text"; big: string; note: string };

export type Project = {
  slug: string;
  title: string;
  kind: string; // the short tags under the title, e.g. "Brand · Product"
  blurb: string;
  href: string;
  cover: ProjectCover;
  lead: string;
  meta: { label: string; value: string }[];
  stories: Story[];
  gallery?: Photo[];
  links?: { text: string; href: string; track: string }[];
};

export const projectsIntro = {
  label: "Projects",
  title: "Things I made.",
  lead: "Brands, shows, companies and a few odd experiments. Each one opens into its story.",
};

export const projects: Project[] = [
  {
    slug: "crew",
    title: "Crew brand",
    kind: "Brand · Illustration · Product",
    blurb: "A family banking brand I sketched on an iPad.",
    href: "/projects/crew",
    cover: { kind: "photo", photo: crew("door-summer.webp", "A Crew illustration of a blue front door with a wreath and two shrubs.") },
    lead: "No outside brand partner fit, so I sketched one.",
    meta: [],
    stories: [],
  },
  {
    slug: "theater",
    title: "Theater",
    kind: "Performance · Marketing",
    blurb: "From a high school stage in Vernal to Hale Centre Theatre.",
    href: "/projects/theater",
    cover: {
      kind: "photo",
      photo: ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage in Elf the Musical.", undefined, { position: "50% 55%" }),
    },
    lead: "I love theater, even though singing in public is one of my biggest fears. I do it anyway.",
    meta: [
      { label: "Stages", value: "Vernal, BYU, Hale Centre Theatre" },
      { label: "Shows", value: "Eight musicals" },
    ],
    stories: [
      {
        id: "vernal",
        eyebrow: "High school theater, Vernal, Utah",
        title: "Seaweed curtains and a car that flew.",
        body: [
          "In high school I was recognized twice among the top high-school actors in Utah. I also ran marketing for our shows.",
          "For The Little Mermaid I turned the school into part of the show: seaweed curtains, banners, things hanging overhead. My senior year production was Chitty Chitty Bang Bang, with a car that flew.",
        ],
        photos: [
          ph("general/brant-eric-in-little-mermaid-highschool.webp", "A high school stage lit in purple for The Little Mermaid.", "The Little Mermaid"),
          ph("chitty-high-school-productions/img-2731.webp", "The flying car on stage at Chitty Chitty Bang Bang, with the cast dancing around it.", "Chitty Chitty Bang Bang"),
        ],
      },
      {
        id: "marketing",
        eyebrow: "Junior and senior year",
        title: "A sold-out house, every night.",
        body: [
          "I built our first social media ad strategy and led a 10-person student team. We sold out 1,200 seats every night of a 12-day run, both my junior and senior years.",
          "The program placed top 10 in the state and won best in state one year. I was also a 2017 Regional Sterling Scholar runner-up in Speech, Forensics and Theater Arts.",
        ],
        stats: [
          { value: "1,200", label: "seats, sold out nightly" },
          { value: "12", label: "days a run" },
          { value: "10", label: "students on the team" },
        ],
        photos: [
          ph("chitty-high-school-productions/tara-iphone-july-2017-523.webp", "A school hall decorated for a show with checkered flags and gears.", "The hall"),
          ph("chitty-high-school-productions/tara-iphone-july-2017-527.webp", "A large Chitty Chitty Bang Bang banner in the school hall.", "The banner"),
        ],
      },
      {
        id: "young-ambassadors",
        eyebrow: "BYU Young Ambassadors · Apr 2021 to May 2023",
        title: "A flop, then South Korea.",
        body: [
          "I made BYU Young Ambassadors, the international musical theatre company, as a non-major. Year one was a brand-new, untested show that flopped and was cut. Year two was a well-tested show that toured internationally, including South Korea.",
          "My lesson: even Broadway veterans fail when they skip testing.",
        ],
        photos: [ph("general/ya-group-photo.webp", "The BYU Young Ambassadors company posed in blue blazers in a garden.", "BYU Young Ambassadors")],
      },
      {
        id: "elf",
        eyebrow: "Elf the Musical · Hale Centre Theatre, Sandy, Utah",
        title: "Theater in the round is live A/B testing.",
        body: [
          "I was cast in Elf the Musical at Hale Centre Theatre, a dream I'd said out loud for years.",
          "The stage is in the round, so you see every face. You see boredom, confusion or delight in real time. I call it live A/B testing.",
        ],
        photos: [
          ph("general/elf-brant.webp", "Brant outside the Hale Centre Theatre sign for Elf the Musical.", "Outside Hale Centre", { position: "50% 70%" }),
          ph("elf-photos/7301a6fe-b7f2-4c0e-80bf-d0bf389b6934-1-201-a.webp", "The Elf company in a snowy finale with Santa in the middle.", "The finale"),
        ],
      },
      {
        id: "shows",
        eyebrow: "Musicals I have performed in",
        title: "Eight musicals so far.",
        body: [
          "Les Misérables, Chitty Chitty Bang Bang, Elf the Musical, Something Rotten, The Music Man, The Little Mermaid, Mary Poppins and Anything Goes.",
          [
            { type: "text", text: "Theater taught me how I run a product team. The costume designer isn't the choreographer. Nobody's craft is decoration. " },
            { type: "link", text: "Read the essay on theatre kids at work", href: "https://brantsjohnson.substack.com/p/13-reasons-theatre-kids-make-exceptional", track: "link:theatre_essay:theater" },
          ],
        ],
        quote: "Product teams are closer to theater than to a sports team: different crafts, different constraints, one experience.",
        photos: [
          ph("something-rotten/img-8341.webp", "Men in black leather costumes posed on stage in Something Rotten.", "Something Rotten!"),
          ph("general/music-man.webp", "A man in a yellow checked suit holding a suitcase that reads Prof. Harold Hill.", "The Music Man", { position: "50% 30%" }),
        ],
      },
    ],
    gallery: [
      ph("elf-photos/53361749782-147746384d-o.webp", "Elves dancing in the round at Hale Centre Theatre.", "Elf"),
      ph("something-rotten/img-7513.webp", "A colorful Something Rotten street scene.", "Something Rotten!"),
      ph("elf-photos/53362915119-e78ca3062a-o.webp", "An office scene from Elf the Musical on a snowflake floor.", "Elf"),
      ph("general/music-man-2.webp", "Two men in yellow checked suits and bowler hats.", "The Music Man"),
      ph("something-rotten/img-9545.webp", "A performer on stage in front of the Something Rotten sign.", "Something Rotten!"),
      ph("elf-photos/53362926889-1b8b602d64-o.webp", "Two performers embracing in winter coats.", "Elf"),
      ph("general/brant-in-elf.webp", "The full Elf cast in red and green on a round stage.", "Elf the Musical"),
      ph("chitty-high-school-productions/fb-img-1510765043923.webp", "The Chitty car lifting off in a beam of light.", "Chitty Chitty Bang Bang"),
      ph("tedx-brant-photo/img-7981.webp", "Brant standing on a red circle under a Welcome to TEDxSaltLakeCity sign.", "TEDxSaltLakeCity"),
    ],
  },
  {
    slug: "backlocal",
    title: "BackLocal",
    kind: "Product · Brand · Venture",
    blurb: "Head of Product, and part of the brand, in BYU's Sandbox.",
    href: "/projects/backlocal",
    cover: {
      kind: "photo",
      photo: ph("general/backlocal-designs.webp", "Three people in BackLocal shirts at an outdoor event.", undefined, { position: "50% 35%" }),
    },
    lead: "We had revenue at Demo Day, before the code was fully there.",
    meta: [
      { label: "Role", value: "Head of Product" },
      { label: "When", value: "Sept 2021 to Sept 2022" },
      { label: "Where", value: "Sandbox, BYU" },
    ],
    stories: [
      {
        id: "product",
        eyebrow: "Product",
        title: "Revenue before the code was ready.",
        body: [
          "In BYU's Sandbox venture program, I led 5 engineers and 2 UX designers to a revenue-generating B2B launch in an 8-month program. We ran more than 370 user interviews.",
          "I sold door to door, and when the code wasn't there yet, I white-labeled a working product. We were one of only four teams with revenue at Demo Day.",
          "The hard lesson was leading a team through bad news: say hard things clearly, gently and together. I also learned to trust engineers and verify, not micromanage.",
        ],
        stats: [
          { value: "370+", label: "user interviews" },
          { value: "1 of 4", label: "teams with revenue at Demo Day" },
        ],
        photos: [
          ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Demo Day"),
          ph("general/entire-sandbox-team-interns.webp", "The Sandbox team in matching orange headbands.", "The Sandbox team"),
        ],
      },
      {
        id: "brand",
        eyebrow: "Brand",
        title: "Designed alongside the product.",
        body: [
          "In Sandbox I worked on branding as well as product, alongside customer interviews and a team of about ten people.",
        ],
        photos: [
          ph("general/backlocal-designs-first-designs.webp", "BackLocal stickers on the grass.", "The first stickers"),
          ph("backlocal-icons/untitled-design-86.webp", "A BackLocal icon of an arch above a row of buildings.", "The mark", { fit: "contain", bg: "#ffffff" }),
        ],
      },
    ],
    gallery: [
      ph("general/sandbox-stage.webp", "The Sandbox stage with a big sandbox sign and blue floor.", "Sandbox"),
      ph("general/brant-talking-at-sandbox.webp", "Brant speaking at Sandbox with BackLocal on the screen.", "On stage"),
      ph("general/sandbox-retreat-conference.webp", "A group of Sandbox participants in matching orange headbands.", "The retreat"),
      ph("backlocal-icons/img-8165.webp", "BackLocal hashtag stickers on a wooden table.", "Stickers"),
      ph("backlocal-icons/img-8171.webp", "A tote bag with a smiley face on an orange ground.", "The tote"),
    ],
  },
  {
    slug: "intro",
    title: "Intro",
    kind: "Venture · AI · Product",
    blurb: "AI agents that match people at live events and explain why.",
    href: "/projects/intro",
    cover: {
      kind: "photo",
      photo: {
        src: "/photos/intro-live.webp",
        alt: "The live Intro site, with the attendee experience on a phone.",
        width: 1200,
        height: 750,
        position: "50% 0%",
      },
    },
    lead: "People pay for connection at events, then leave it to chance.",
    meta: [
      { label: "Role", value: "Founder and Product Lead" },
      { label: "Since", value: "Nov 2025" },
      { label: "For", value: "Events of about 100 to 600 people" },
    ],
    stories: [
      {
        id: "problem",
        eyebrow: "The problem",
        title: "Paying for connection with no way to make it happen.",
        body: [
          "At Utah Business I kept seeing the same problem. Events and sponsorships are full of people paying for connection with no good way to make it happen or measure it. Sponsors want real conversations. Attendees want the right people, not more people.",
          "I'd been teaching myself the new AI stack at night so I wouldn't go stale. So I built.",
        ],
        photos: [
          ph("general/brant-at-utah-business.webp", "Brant at a Utah Business Magazine table with a subscribe sign.", "At Utah Business"),
          ph("general/brant-planning-conference.webp", "Brant giving a thumbs up in a packed conference hall.", "A full room"),
        ],
      },
      {
        id: "product",
        eyebrow: "The product",
        title: "Every match comes with a reason.",
        body: [
          "Intro is AI agent software for live events. It matches attendees, sponsors and organizers and explains every recommendation in plain language instead of a score.",
          "Success means accepted recommendations and completed meetings, not clicks.",
        ],
        photos: [
          {
            src: "/photos/intro-live.webp",
            alt: "The live Intro site, with the attendee experience on a phone.",
            width: 1200,
            height: 750,
            caption: "intro.events",
          },
        ],
      },
    ],
    links: [{ text: "Visit Intro", href: "https://intro.events", track: "link:visit_intro:projects" }],
  },
  {
    slug: "bridger",
    title: "Bridger",
    kind: "Venture · Mobile · Product",
    blurb: "An app that helps people become friends around what they love.",
    href: "/projects/bridger",
    cover: {
      kind: "photo",
      photo: {
        src: "/photos/bridger-live.webp",
        alt: "The live Bridger waitlist window.",
        width: 900,
        height: 989,
        position: "50% 0%",
      },
    },
    lead: "I'm working on connection technology because isolation is on the rise.",
    meta: [
      { label: "Role", value: "Founder" },
      { label: "Since", value: "Apr 2025" },
      { label: "Stage", value: "TestFlight beta" },
    ],
    stories: [
      {
        id: "about",
        eyebrow: "Bridger",
        title: "Friends, around what you love.",
        body: [
          "Bridger is an app that helps people become friends around what they love. It's in a TestFlight beta, built with contracted engineers and designers.",
          "I can build by myself. I don't want to. The parts I've loved most were watching a designer make something better than I could and an engineer find a way through a wall.",
        ],
        photos: [
          {
            src: "/photos/bridger-live.webp",
            alt: "The live Bridger waitlist window.",
            width: 900,
            height: 989,
            caption: "bridger.social",
          },
        ],
      },
    ],
    links: [{ text: "Visit Bridger", href: "https://bridger.social", track: "link:visit_bridger:projects" }],
  },
  {
    slug: "poetry",
    title: "Poetry",
    kind: "Writing",
    blurb: "Two poems, one to a page, with the line breaks kept exactly.",
    href: "/projects/poetry",
    cover: { kind: "text", big: "Each beam is raised to scrape the sky.", note: "From To The Sky, 2022" },
    lead: "",
    meta: [],
    stories: [],
  },
  {
    slug: "handmade",
    title: "Handmade",
    kind: "Costume · Craft",
    blurb: "Sweaters, costumes, floats and 25-foot trees.",
    href: "/projects/handmade",
    cover: {
      kind: "photo",
      photo: ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", undefined, { position: "50% 20%" }),
    },
    lead: "I make things people can see and hold.",
    meta: [
      { label: "Sweater contests lost", value: "None, as of 2024" },
      { label: "Parade floats built", value: "3, from scratch" },
    ],
    stories: [
      {
        id: "handmade",
        eyebrow: "Costumes, floats and trees",
        title: "A new world on Monday.",
        body: [
          "I make my own Christmas sweater every year and have never lost a sweater contest (17 and counting as of 2024). I have 4 or 5 Halloween costumes every year, and I built 3 parade floats from scratch.",
          "I decorated my school for every holiday, with 25-foot Christmas trees and hand-painted 15-foot nutcrackers, often coming in at 5 AM on weekends so students walked into a new world on Monday.",
        ],
        photos: [ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { position: "50% 20%" })],
      },
    ],
  },
  {
    slug: "chatbot",
    title: "A chatbot of me",
    kind: "AI · Experiment",
    blurb: "Forty-five pages of my life, turned into a chatbot.",
    href: "/projects/chatbot",
    cover: { kind: "text", big: "45", note: "pages of source material" },
    lead: "AI knows a lot but will not share it unless you ask specifically.",
    meta: [
      { label: "Built", value: "2024" },
      { label: "Source", value: "45 pages I wrote" },
    ],
    stories: [
      {
        id: "chatbot",
        eyebrow: "Before Intro, in 2024",
        title: "Forty-five pages, and a chatbot.",
        body: [
          "Before going all in on Intro, I wrote 45 pages of my accomplishments, fun facts and work philosophies and used them to build an AI chatbot of myself, so recruiters could learn about me interactively.",
          "Because I knew the whole dataset, I could see how much it left out when asked generic questions. The prompt was too generic, so the output was generic. If you want better results, have better prompts.",
          [
            { type: "text", text: "You can " },
            { type: "link", text: "ask the chatbot about me", href: "/ask", track: "link:ask:projects_chatbot" },
            { type: "text", text: "." },
          ],
        ],
        stats: [{ value: "45", label: "pages of source material" }],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

// THIS SECTION DOES: the Crew brand case study. It has its own page with videos and a drawing gallery.
export const crewProject = {
  label: "Projects · Brand",
  title: "Crew brand",
  lead: "I sketched the brand on an iPad, and the CEO said run with it.",
  body: [
    "There was no outside brand partner that fit, so I sketched one on my iPad. I wasn't a trained designer, so I learned the tools, learned enough illustration to carry a system, and worked with our UX designer so the card, the packaging, the landing page, onboarding and the app felt like one product.",
    "The hard part was tone. Family banking can't feel childish to the parent or like your mom's bank to the kid.",
    "I chose symbols (money, connection, kids, growing up, nostalgia) instead of drawing families, so every kind of family could feel included. Test users praised the brand unprompted. I also took the homepage on an iPad to parents at a local shopping center and redesigned it five times from their reactions.",
  ],
  wordmark: {
    src: "/images/crew-wordmark-2024.webp",
    alt: "Crew wordmark Brant designed in 2024",
    width: 1200,
    height: 300,
  },
  motion: [
    {
      mp4: "/creator/crew/van-crew.mp4",
      webm: "/creator/crew/van-crew.webm",
      poster: "/creator/crew/van-crew-poster.webp",
      alt: "Crew illustration of a van packed with household things.",
      width: 2530,
      height: 2827,
    },
    {
      mp4: "/creator/crew/bathtub-crew.mp4",
      webm: "/creator/crew/bathtub-crew.webm",
      poster: "/creator/crew/bathtub-crew-poster.webp",
      alt: "Crew illustration of a claw-foot bathtub and a rubber duck.",
      width: 2732,
      height: 2048,
    },
  ],
  stills: [
    {
      src: "/creator/crew/crew-social-announcement.webp",
      alt: "Crew announcement graphic reading Banking built for families, with a drawn hand holding a card.",
      width: 1080,
      height: 1080,
    },
    {
      src: "/creator/crew/crew-linkedin-announcement.webp",
      alt: "Wide Crew announcement graphic reading Banking built for families, with a drawn hand holding a card.",
      width: 1400,
      height: 889,
    },
  ] as Photo[],
  inProduct: [
    ph("crew-illustrations-in-product/img-3756.webp", "The Crew sign-in screen with an illustrated blue door.", "Sign in", { bg: "#000000", fit: "contain" }),
    ph("crew-illustrations-in-product/img-4335.webp", "A Crew screen with a drawn tandem bicycle.", "Combine accounts", { bg: "#000000", fit: "contain" }),
    ph("crew-illustrations-in-product/img-0538.webp", "A Crew web page with a drawn desk and filing cabinet.", "On the web", { bg: "#ffffff", fit: "contain" }),
    ph("crew-illustrations-in-product/img-0546.webp", "The Crew App Store page.", "In the store", { bg: "#ffffff", fit: "contain" }),
  ] as Photo[],
  drawings: [
    crew("door-spring.webp", "A Crew illustration of a blue door in spring, with a kite.", "Spring"),
    crew("door-summer.webp", "A Crew illustration of a blue door in summer with a wreath.", "Summer"),
    crew("door-winter.webp", "A Crew illustration of a blue door in winter with a snowman.", "Winter"),
    crew("pig-mascot.webp", "A Crew illustration of a smiling pig mascot.", "The pig"),
    crew("lemonade-new.webp", "A Crew illustration of a yellow lemonade tent and a lemon.", "Lemonade"),
    crew("letters2x.webp", "A Crew illustration of a pile of green envelopes.", "Letters"),
    crew("champagne-new.webp", "A Crew illustration of two glasses clinking.", "Cheers"),
    crew("tandem-2-seat-still.webp", "A Crew illustration of a two-seat tandem bike.", "Tandem"),
    crew("newspaper-new.webp", "A Crew illustration of a newspaper tied with a bow.", "Great news"),
    crew("frames-new.webp", "A Crew illustration of picture frames.", "Frames"),
    crew("fridge-new.webp", "A Crew illustration of fridge magnets reading you're on the list.", "On the list"),
    crew("file-new.webp", "A Crew illustration of a desk, a dog and a yellow filing cabinet.", "The desk"),
    crew("lights-still.webp", "A Crew illustration of hanging light bulbs.", "Lights"),
    crew("packages-still.webp", "A Crew illustration of tumbling packages.", "Packages"),
    crew("thank-you-bags-still.webp", "Crew illustrations of thank you bags.", "Thank you"),
    crew("drink-new.webp", "A Crew illustration of a tall iced drink with a lemon.", "Lemon drink"),
    ph("crew-illustrations/img-3719.webp", "A grid of Crew paint swatches in purple, yellow, red and green.", "The palette", { fit: "contain", bg: "#ffffff" }),
  ] as Photo[],
};
