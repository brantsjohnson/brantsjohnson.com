// ============================================
// WHAT THIS FILE DOES (plain English):
// The Work section: the overview page (quick previews, grouped by
// kind of work) and the longer story for each project: Intro,
// Bridger, Crew, the Crew brand, BackLocal and the chatbot. The
// words come from the approved copy doc. Dates use "to". No dollar
// figures. Words only, no UI.
// ============================================

import { go, type Detail } from "@/content/detail";
import { crew, ph, type Photo } from "@/content/photos";

export type WorkItem = {
  org: string;
  role: string;
  dates?: string;
  summary: string;
  links?: { text: string; href: string }[];
};

export type WorkGroup = { id: string; title: string; items: WorkItem[] };

export const workIntro = {
  label: "Work",
  title: "Work",
  description: "Products, brands, research, and teams Brant Johnson has helped bring to life.",
  lead: "My favorite kind of work starts when somebody has an idea they care about and needs help getting it out into the world. I like being close enough to the people and the details to help make that happen.",
  second: "Here's a quick look. Each project opens into the longer story.",
};

export const workGroups: WorkGroup[] = [
  {
    id: "now",
    title: "What I'm building now",
    items: [
      {
        org: "Bridger",
        role: "Founder",
        dates: "2025 to present",
        summary:
          "Social software I'm building to help people make friends through shared interests and help third places bring their communities together.",
        links: [{ text: "About Bridger", href: "/work/bridger" }],
      },
      {
        org: "Intro",
        role: "Founder and Product Lead",
        dates: "2025 to present",
        summary: "AI software for event organizers who want introductions, sponsor value, and conversations to happen on purpose.",
        links: [{ text: "About Intro", href: "/work/intro" }],
      },
    ],
  },
  {
    id: "products",
    title: "Products I've worked on",
    items: [
      {
        org: "Crew Finance",
        role: "Senior Product Manager and first employee",
        dates: "Dec 2022 to Apr 2024",
        summary:
          "Worked across card issuing, banking integrations, and onboarding for families. Our experiments cut onboarding time 50% and raised engagement 20%.",
        links: [
          { text: "Product work", href: "/work/crew" },
          { text: "Crew illustrations", href: "/work/crew-brand" },
        ],
      },
      {
        org: "BackLocal",
        role: "Head of Product, BYU Sandbox",
        dates: "Sep 2021 to Sep 2022",
        summary: "Led a team of five engineers and two designers. We did more than 370 customer interviews and reached Demo Day with revenue.",
        links: [{ text: "The BackLocal story", href: "/work/backlocal" }],
      },
    ],
  },
  {
    id: "creative",
    title: "Creative work and experiments",
    items: [
      {
        org: "Crew brand",
        role: "",
        summary:
          "I began sketching on my iPad when we couldn't find a brand direction that fit. The illustrations ended up across the product and packaging.",
        links: [{ text: "See the illustrations", href: "/work/crew-brand" }],
      },
      {
        org: "A chatbot of me",
        role: "",
        summary:
          "Forty-five pages of notes about my life, made searchable by a chatbot. An interesting way to discover what AI leaves out.",
        links: [{ text: "Read about the experiment", href: "/work/ai-chatbot" }],
      },
    ],
  },
  {
    id: "beyond",
    title: "Experience beyond the product teams",
    items: [
      {
        org: "Utah Business Magazine and Deseret News",
        role: "Account Executive",
        dates: "Oct 2024 to Nov 2025",
        summary:
          "I worked with around 63 clients and helped put on events across a 52-event annual portfolio. The sponsor conversations became part of the research behind Intro.",
        links: [{ text: "The events", href: "/events/utah-business" }],
      },
      {
        org: "TEDxSaltLakeCity",
        role: "Organization Assistant",
        dates: "Jan to Sep 2021",
        summary: "Worked on the event's organizing and volunteer coordination.",
        links: [{ text: "TEDx event work", href: "/events/tedx" }],
      },
      {
        org: "Divvy (now BILL)",
        role: "Product Management Analyst Intern",
        dates: "Jun to Sep 2022",
        summary: "Improved Pendo instrumentation and reporting, trained thirteen teams, and helped bring analytics accuracy to 93%.",
      },
      {
        org: "Regional volunteer organization, Birmingham, England",
        role: "Product and volunteer leadership",
        dates: "2017 to 2019",
        summary:
          "Built three reporting tools that took a recurring task from about two days to three hours, and helped train volunteers across more than twenty regions.",
      },
      {
        org: "BYU Public Ethics Lab",
        role: "Product and Data Analyst",
        dates: "2020 to 2021",
        summary: "Worked with research drawn from 250 interviews with local-government leaders.",
      },
      {
        org: "U.S. Senate, Office of Senator Mitt Romney",
        role: "Congressional Intern",
        dates: "2022",
        summary: "Handled constituent correspondence and condensed a lengthy nuclear-licensing policy file into a short briefing.",
      },
      {
        org: "Utah Governor's Office and Economic Development",
        role: "Internships",
        dates: "2019 to 2020",
        summary:
          "Worked on constituent requests, business assistance, and economic-development programs. I was also involved in the governor's economic summit.",
        links: [{ text: "The summit", href: "/events/governors-economic-summit" }],
      },
    ],
  },
];

const T = "Work";
const crumbs = (label: string) => [{ label: "Work", href: "/work" }, { label }];

export const crewBrandMedia = {
  wordmark: { src: "/images/crew-wordmark-2024.webp", alt: "Crew wordmark Brant designed in 2024", width: 1200, height: 300 },
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

// THIS SECTION DOES: the Crew brand page has its own layout (videos and drawings), so it keeps a lighter record
export const crewBrandPage = {
  slug: "crew-brand",
  path: "/work/crew-brand",
  title: "Crew brand",
  metaTitle: "Crew brand",
  description: "How I developed illustrations for Crew, the family banking product, from early iPad sketches to cards and app screens.",
  crumbs: crumbs("Crew brand"),
  lead: "I started drawing a few ideas on my iPad because we hadn't found an outside brand partner that felt right. The CEO liked them and told me to keep going. I hadn't trained as an illustrator, so there was a lot of learning as I went.",
  sections: [
    {
      heading: "How it started",
      body: [
        "Crew was building a banking app for parents and kids. We wanted the product to feel familiar to both, which is a pretty awkward brief when your audience includes adults and children.",
        "I worked with our UX designer to carry the illustrations into the card, packaging, website, onboarding, and app. The drawings needed to work in all those places without losing their character.",
      ],
    },
    {
      heading: "The visual direction",
      body: [
        "I kept coming back to objects from family life: a door, a tandem bike, a fridge with magnets, a newspaper. I leaned toward objects and symbols instead of illustrations of a particular kind of family.",
        "Test users commented positively on the illustrations without being prompted. I also took the homepage out to parents at a shopping center and revised it five times based on their reactions.",
      ],
    },
  ],
  links: [go("Crew product work", "/work/crew", "link:crew_product:crew_brand"), go("All work", "/work", "link:work:crew_brand")],
};

export const workDetails: Detail[] = [
  {
    slug: "intro",
    path: "/work/intro",
    title: "Intro",
    metaTitle: "Intro",
    description: "Why I started Intro, AI software to help event organizers make introductions and measure meaningful connections.",
    crumbs: crumbs("Intro"),
    label: T,
    lead: [
      "I've spent enough time helping put on events to know how much work goes into getting everybody in the same room. Once they're there, whether they meet the people they came to meet is often left to chance.",
    ],
    glance: [
      { label: "Role", value: "Founder and Product Lead" },
      { label: "Since", value: "Nov 2025" },
    ],
    sections: [
      {
        id: "idea",
        title: "Where the idea came from",
        body: [
          "At Utah Business, I worked on events and talked with sponsors who had spent real money to be there. They wanted conversations that might lead somewhere. Event organizers wanted people to enjoy the experience and feel it was worth coming back.",
          "I kept thinking there should be a better way to help with that, especially as AI became useful for understanding why two people might want to meet.",
        ],
        photos: [
          ph("general/brant-at-utah-business.webp", "Brant at a Utah Business Magazine table with a subscribe sign.", "At Utah Business"),
          ph("general/brant-planning-conference.webp", "Brant giving a thumbs up in a packed conference hall.", "A full room"),
        ],
      },
      {
        id: "building",
        title: "What I'm building",
        body: [
          "Intro recommends introductions for attendees, sponsors, and organizers, with an explanation for each recommendation. The goal is to help event teams create better experiences and see which meetings happen.",
          "I'm much more interested in a completed introduction than another dashboard full of clicks.",
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
    links: [
      go("Visit Intro", "https://intro.events", "link:visit_intro:work_intro"),
      go("Events I've helped put on", "/events", "link:events:work_intro"),
      go("All work", "/work", "link:work:work_intro"),
    ],
    back: { href: "/work", label: "All work" },
  },
  {
    slug: "bridger",
    path: "/work/bridger",
    title: "Bridger",
    metaTitle: "Bridger",
    description: "Bridger is social software I'm building to help people make friends and strengthen third places.",
    crumbs: crumbs("Bridger"),
    label: T,
    lead: [
      "Making friends gets harder when you no longer have a classroom, campus, or built-in group putting you next to the same people every day.",
      "I've been thinking about what software could do to help people meet and keep showing up for each other in real life.",
    ],
    glance: [
      { label: "Role", value: "Founder" },
      { label: "Started", value: "Apr 2025" },
      { label: "Stage", value: "TestFlight beta" },
    ],
    sections: [
      {
        id: "idea",
        title: "The idea",
        body: [
          "I want Bridger to help people become friends around the things they already enjoy. I'm also interested in how it could help third places, like community spaces and local gathering spots, bring people together more often.",
          "Those places already have people, activities, and reasons to visit. I want to give them better tools for helping friendships grow there.",
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
      {
        id: "building",
        title: "Building it",
        body: [
          "I'm working with contracted designers and engineers. One of my favorite parts has been watching somebody take an idea I've been stuck on and make it much better.",
        ],
      },
    ],
    links: [
      go("Visit Bridger", "https://bridger.social", "link:visit_bridger:work_bridger"),
      go("About Intro", "/work/intro", "link:intro:work_bridger"),
      go("All work", "/work", "link:work:work_bridger"),
    ],
    back: { href: "/work", label: "All work" },
  },
  {
    slug: "crew",
    path: "/work/crew",
    title: "Crew Finance",
    metaTitle: "Crew Finance",
    description: "Product management work on Crew's family banking product, Visa card program, and onboarding.",
    crumbs: crumbs("Crew Finance"),
    label: T,
    lead: [
      "Crew was building a banking product for families. I joined as the first employee and worked across card issuing, banking partners, and the experience parents and kids had when they signed up. I liked getting to help turn a big idea into something families could use.",
    ],
    glance: [
      { label: "Role", value: "Senior Product Manager" },
      { label: "When", value: "Dec 2022 to Apr 2024" },
    ],
    sections: [
      {
        id: "card-program",
        title: "The card program",
        body: [
          "I owned work across card issuing, KYC with banking and compliance partners, card manufacturing and shipping, and parent and child onboarding. The program involved eight outside suppliers, with PCI and COPPA requirements to account for.",
        ],
        photos: [ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "The Crew team", { focus: { x: 0.5, y: 0.55 } })],
      },
      {
        id: "onboarding",
        title: "Onboarding",
        body: ["We ran experiments to make signup easier. Those changes cut onboarding time by 50% and increased engagement by 20%."],
        stats: [
          { value: "50%", label: "faster onboarding" },
          { value: "20%", label: "more engagement" },
          { value: "8", label: "outside suppliers" },
        ],
      },
      {
        id: "second-job",
        title: "An unexpected second job",
        body: [
          "We couldn't find an outside brand direction that felt right. I started sketching on my iPad and eventually worked on illustrations used throughout the product. That part has a story of its own.",
        ],
      },
    ],
    links: [go("See the Crew illustrations", "/work/crew-brand", "link:crew_brand:work_crew"), go("All work", "/work", "link:work:work_crew")],
    back: { href: "/work", label: "All work" },
  },
  {
    slug: "backlocal",
    path: "/work/backlocal",
    title: "BackLocal",
    metaTitle: "BackLocal",
    description: "How our BYU Sandbox team interviewed hundreds of potential customers and found a way to launch BackLocal with paying customers.",
    crumbs: crumbs("BackLocal"),
    label: T,
    lead: ["We got customers paying for the product before the code was completely ready. I learned quite a bit from that."],
    glance: [
      { label: "At a glance", value: "Head of Product" },
      { label: "Where", value: "BYU Sandbox" },
      { label: "When", value: "Sep 2021 to Sep 2022" },
    ],
    sections: [
      {
        id: "product",
        title: "The product",
        body: [
          "During BYU's Sandbox venture program, I led five engineers and two UX designers. We ran more than 370 customer interviews while trying to find a version of the business that people would pay for.",
          "I went door to door selling it. When the software wasn't finished, I used a white-labeled product so customers could start using something real. Eight months in, we were one of four teams with revenue at Demo Day.",
        ],
        stats: [
          { value: "370+", label: "customer interviews" },
          { value: "1 of 4", label: "teams with revenue at Demo Day" },
        ],
        photos: [
          ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Demo Day"),
          ph("general/entire-sandbox-team-interns.webp", "The Sandbox team in matching orange headbands.", "The Sandbox team"),
        ],
      },
      {
        id: "team",
        title: "Working with the team",
        body: [
          "There were difficult updates to give as we worked through the product. I learned to share bad news earlier and give engineers room to solve problems without hovering over every step.",
          "I also worked on the brand alongside the rest of the team. The first stickers and designs are below.",
        ],
      },
      {
        id: "designs",
        title: "Early designs",
        body: [],
        photos: [
          ph("general/backlocal-designs-first-designs.webp", "BackLocal stickers on the grass.", "The first stickers"),
          ph("backlocal-icons/untitled-design-86.webp", "A BackLocal icon of an arch above a row of buildings.", "The mark", { fit: "contain", bg: "#ffffff" }),
        ],
      },
    ],
    gallery: {
      title: "More photos",
      photos: [
        ph("general/sandbox-stage.webp", "The Sandbox stage with a big sandbox sign and blue floor.", "Sandbox"),
        ph("general/brant-talking-at-sandbox.webp", "Brant speaking at Sandbox with BackLocal on the screen.", "On stage"),
        ph("general/sandbox-retreat-conference.webp", "A group of Sandbox participants in matching orange headbands.", "The retreat"),
        ph("backlocal-icons/img-8165.webp", "BackLocal hashtag stickers on a wooden table.", "Stickers"),
        ph("backlocal-icons/img-8171.webp", "A tote bag with a smiley face on an orange ground.", "The tote"),
      ],
    },
    links: [go("All work", "/work", "link:work:work_backlocal")],
    back: { href: "/work", label: "All work" },
  },
  {
    slug: "ai-chatbot",
    path: "/work/ai-chatbot",
    title: "A chatbot of me",
    metaTitle: "A chatbot of me",
    description: "An experiment using 45 pages of personal notes to build an AI chatbot that could answer questions about Brant Johnson.",
    crumbs: crumbs("A chatbot of me"),
    label: T,
    lead: [
      "I wrote 45 pages about myself so people could ask a chatbot questions instead of reading a very long résumé. A surprisingly large amount of personal information, for an experiment that still managed to leave things out.",
    ],
    glance: [
      { label: "Built", value: "2024" },
      { label: "Source", value: "45 pages of notes" },
    ],
    sections: [
      {
        id: "what-happened",
        title: "What happened",
        body: [
          "I put my work, experiences, and assorted facts into a chatbot and tried asking it questions. It did fine when I was specific. With broad questions, it often missed the details I thought were most interesting.",
          "I knew everything in the notes, so I could spot what it left out. That made it an especially useful way to learn about prompting and how much information a model needs to give a useful answer.",
        ],
        stats: [{ value: "45", label: "pages of source notes" }],
      },
    ],
    links: [go("Ask the chatbot", "/ask", "link:ask:work_chatbot"), go("All work", "/work", "link:work:work_chatbot")],
    back: { href: "/work", label: "All work" },
  },
];
