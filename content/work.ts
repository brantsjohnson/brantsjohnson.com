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
  id: string; // short key. An article that is "about" work/<id> shows under this item.
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
        id: "bridger",
        org: "Bridger",
        role: "Founder",
        dates: "2025 to present",
        summary:
          "Social software I'm building to help people make friends through shared interests and help third places bring their communities together.",
        links: [{ text: "About Bridger", href: "/work/bridger" }],
      },
      {
        id: "intro",
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
        id: "crew",
        org: "Crew Finance",
        role: "Senior Product Manager and first employee",
        dates: "Dec 2022 to Apr 2024",
        summary:
          "I was the first employee and only product manager at Crew, a banking product for families. I worked across customer discovery, card issuing, banking and compliance partners, onboarding experiments, and the parent-and-child product experience. I also led the brand identity and illustrations used across the app, website, card and packaging.",
        links: [
          { text: "Product work", href: "/work/crew" },
          { text: "Crew illustrations", href: "/work/crew-brand" },
        ],
      },
      {
        id: "backlocal",
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
        id: "crew-brand",
        org: "Crew brand",
        role: "",
        summary:
          "I began sketching on my iPad when we couldn't find a brand direction that fit. The illustrations ended up across the product and packaging.",
        links: [{ text: "See the illustrations", href: "/work/crew-brand" }],
      },
      {
        id: "ai-chatbot",
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
        id: "utah-business",
        org: "Utah Business Magazine and Deseret News",
        role: "Account Executive",
        dates: "Oct 2024 to Nov 2025",
        summary:
          "I worked with around 63 clients and helped put on events across a 52-event annual portfolio. The sponsor conversations became part of the research behind Intro.",
        links: [{ text: "The events", href: "/events/utah-business" }],
      },
      {
        id: "tedx",
        org: "TEDxSaltLakeCity",
        role: "Organization Assistant",
        dates: "Jan to Sep 2021",
        summary: "Worked on the event's organizing and volunteer coordination.",
        links: [{ text: "TEDx event work", href: "/events/tedx" }],
      },
      {
        id: "divvy",
        org: "Divvy (now BILL)",
        role: "Associate Product Management Analyst (internship)",
        dates: "Jun to Sep 2022",
        summary: "Improved Pendo instrumentation and reporting, trained thirteen teams, and helped bring analytics accuracy to 93%.",
      },
      {
        id: "birmingham",
        org: "Regional volunteer organization, Birmingham, England",
        role: "Product and volunteer leadership",
        dates: "2017 to 2019",
        summary:
          "Built three reporting tools that took a recurring task from about two days to three hours, and helped train volunteers across more than twenty regions.",
      },
      {
        id: "public-ethics-lab",
        org: "BYU Public Ethics Lab",
        role: "Product and Data Analyst",
        dates: "2020 to 2021",
        summary: "Worked with research drawn from 250 interviews with local-government leaders.",
      },
      {
        id: "senate",
        org: "U.S. Senate, Office of Senator Mitt Romney",
        role: "Congressional Intern",
        dates: "2022",
        summary: "Handled constituent correspondence and condensed a lengthy nuclear-licensing policy file into a short briefing.",
      },
      {
        id: "governors-office",
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

// THIS SECTION DOES: build one Crew app screenshot for the /work/crew gallery.
// Dark screens sit on black so letterboxed phones keep their edges. Light
// screens sit on white. contain keeps the whole phone visible.
const crewApp = (file: string, alt: string, caption: string, dark = false): Photo =>
  ph(`crew-app-design/${file}`, alt, caption, { bg: dark ? "#000000" : "#ffffff", fit: "contain" });

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
          "Before starting Intro, I worked at Utah Business on events and talked with sponsors who had spent real money to be there. They wanted conversations that might lead somewhere. Event organizers wanted people to enjoy the experience and feel it was worth coming back.",
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
    description: "How I built Crew's debit-card program from the ground up: issuing, processing, KYC, card lifecycle, fulfillment, and the brand still in use.",
    crumbs: crumbs("Crew Finance"),
    label: T,
    lead: [
      "Crew was building a banking product for families. I joined as the first employee and the only product manager, and I helped build the debit-card program from the ground up.",
      "The work ran from customer discovery and KYC through issuing, processing, card lifecycle, fulfillment, and the experience parents and children had when they signed up. My job was to connect those systems so a family could open accounts and receive cards that worked.",
    ],
    glance: [
      { label: "Role", value: "Senior Product Manager" },
      { label: "When", value: "Dec 2022 to Apr 2024" },
      { label: "Domain", value: "Family fintech, payments and onboarding" },
    ],
    sections: [
      {
        id: "role-scope",
        title: "The first product manager",
        body: [
          "I was Senior Product Manager, the first employee, and the only product manager. The brief was a family product, not a visual-design assignment sitting to the side of the card program.",
        ],
        bullets: [
          "I coordinated the product across parent and child accounts, debit cards, onboarding, and controls, so the app, the card, and the signup flow stayed one program.",
          "I mapped requirements and dependencies across card issuing, processors, banking partners, identity and account rules, manufacturing, and fulfillment so a customer-facing promise stayed implementable.",
          "I worked with banking and compliance partners, UX and design, engineering, and suppliers on product direction and operating tradeoffs. I did not write firmware, run the bank, engineer cryptography, or manage a named engineering staff.",
          "KYC sat in customer onboarding and identity verification. PCI and COPPA were part of the program. I was not the bank's compliance officer, and I did not write a certification or approve regulated accounts.",
        ],
      },
      {
        id: "card-program",
        title: "A debit-card program from the ground up",
        body: [
          "This was an end-to-end card-program workstream, not a UI initiative. A working debit card needed an issuing bank, a network, processing, identity and account rules, a manufacturer, and a way to personalize and mail cards. I coordinated that program-management workstream so those parties stayed aligned with what the product could promise.",
        ],
        bullets: [
          "Crew's debit card was issued by Bangor Savings Bank on the Mastercard network. A BIN identifies the issuing institution and the card range used to route transactions. I translated those issuer and network requirements into the customer-facing card. I did not operate the bank or the network, and I did not sign a separate sponsor agreement.",
          "Processing work covered the issuer processor, ledger, fraud controls, authorization, and program controls. I treated a parent-control setting in the app as different from a rule the processor could enforce on a child's card. That was a product-design question, not a claim that a specific control had shipped.",
          "The payment lifecycle is why the screens have to be careful. A contactless tap uses NFC. For EMV contactless transactions the card can produce transaction-specific cryptographic data. Authorization, clearing, and settlement are different steps, so an approval can stay pending, change, or post at another amount. Product copy and support had to explain holds, refunds, and posting differences. I did not operate settlement rails.",
          "PIN creation and resets belong with processors, protected key management, and hardware security modules. I mapped who was responsible for those credentials and how a customer would set or reset a PIN. The app team should not see a PIN in plaintext or store it in a customer database. I did not name a final PIN vendor.",
          "We evaluated Unit and i2c while building, and my January 2023 notes consider i2c as a technology platform that could help us move faster. Later Crew materials name Treasury Prime in the operating stack. Vendor research is not a signed contract, and I do not claim I selected the final processor.",
        ],
        photos: [ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "The Crew team", { focus: { x: 0.5, y: 0.55 } })],
        links: [
          go("Inside a Card Payment: Authorization to Settlement", "/writing/inside-a-card-payment-authorization-to-settlement", "link:crew_tap_article:work_crew"),
          go("The Integration Work Behind a Banking App", "/writing/the-integration-work-behind-a-banking-app", "link:crew_integrations_article:work_crew"),
        ],
      },
      {
        id: "onboarding",
        title: "Family accounts, onboarding, and discovery",
        body: [
          "The question I kept bringing back was what would persuade a family to move a primary banking relationship, not only to download an app.",
        ],
        bullets: [
          "Customer interviews and hands-on research looked at trust, hesitation, and what a family needed from shared accounts. I heard enough concern about giving children access to credit that I wanted us to take it seriously. I do not have a recovered survey percentage for that reaction.",
          "I advocated for digital pockets, the envelope habit as buckets in the account, as a reason to keep using the product after the card arrived. I was not the only person who could see that, and later Crew materials on pockets do not prove that my advocacy caused the later roadmap.",
          "We ran experiments to make signup easier for parents and children. Those changes cut onboarding time by 50% and increased engagement by 20%.",
          "I tested the homepage with parents at a shopping center and revised it five times based on their reactions. Test users also commented positively on the illustrations without being prompted. That is qualitative evidence, not a sample size or a conversion rate.",
        ],
        stats: [
          { value: "50%", label: "faster onboarding" },
          { value: "20%", label: "more engagement" },
        ],
      },
      {
        id: "manufacturing",
        title: "Physical cards, packaging, and fulfillment",
        body: [
          "I ran manufacturing work for the physical cards and their packaging, from early explorations through supplier research, samples, production constraints, and fulfillment planning. Prototypes were labeled separately from what shipped. I did not operate factory equipment, and I do not claim every sample became a customer card.",
        ],
        bullets: [
          "I owned physical-card and packaging manufacturing coordination: design specifications, material and finish options, supplier research, physical samples, and how those choices changed production and delivery.",
          "I researched plastic, metal-core, veneer, and finish options, plus tactile weight and contactless antenna compatibility. Metal can interfere with NFC, so a heavier card is also an antenna problem. Those metal constructions were concepts and samples, not a launched metal card.",
          "March 2023 notes listed Idemia, Perfect Plastic, CPI, Tag Systems, and CompoSecure among companies we were researching. That list shows the discovery, not that each was hired or that any of them was the production stack.",
          "Card lifecycle work covered physical design, secure personalization, matching a card to the account holder, carrier attachment, packaging, mailing, activation, replacements, returns, and inventory. A fulfillment matrix across family size, card colors, and replacements was a way to explore those combinations early. I do not claim a documented matrix shipped.",
          "I drew packaging schematics and made mechanical push-button wallet prototypes and a paper-airplane mailer by hand, then asked how a supplier would manufacture, kit, and mail them. The package was the first physical proof a new bank was real. I have not found a confirmed record that the airplane mailer went into production.",
          "A rigid case sized for six cards failed as soon as a household had seven people. Four cards of one color plus one of another also broke a fulfillment path that assumed one envelope per color. Those were design constraints, not customer metrics.",
        ],
        photos: [crew("packages-still.webp", "A Crew illustration of tumbling packages.", "Packages")],
        links: [go("The Manufacturing Economics of Card Mailers", "/writing/the-manufacturing-economics-of-card-mailers", "link:crew_mailer_article:work_crew")],
      },
      {
        id: "integrations",
        title: "Banking integrations and money movement",
        body: [
          "Connecting an existing bank is not one feature. The bank, the processor, the network, the compliance system, and the customer's old institution can each have a different idea of when a transaction exists.",
        ],
        bullets: [
          "In August 2023 we created two MX compatibility sheets covering 41 financial institutions, looking at account-owner verification, balance checks, and aggregation. Coverage can support one of those jobs and struggle with another. That was compatibility research, not 41 live integrations.",
          "I examined ACH processing days, authorization and return states, and what the app could say about transfer availability. If a screen shows money before an incoming transfer has settled, somebody is making a risk and liquidity decision. Same-day ACH had different windows and pricing in early provider conversations.",
          "I mapped owner verification, PIN support, ATM fees, and disputes to the partners who could perform those jobs, rather than treating an integration as finished because a button existed.",
          "Those questions came back to a product decision: what the app could promise when a customer connected an existing bank or started a transfer.",
        ],
        links: [go("The Integration Work Behind a Banking App", "/writing/the-integration-work-behind-a-banking-app", "link:crew_integrations_article_section:work_crew")],
      },
      {
        id: "commercial",
        title: "Commercial models and growth experiments",
        body: [
          "I modeled costs and growth so a generous idea had to survive the spreadsheet. None of the figures below are achievement KPIs or a published Crew profit-and-loss statement.",
        ],
        bullets: [
          "I built the product-economics model from researched processing costs and household-use assumptions. Changing those inputs changed whether a generous card or a premium package still made sense. The figures were research models, not validated cohort analytics.",
          "I examined a rewards structure of 1% cashback plus an additional 1% for early payment, and compared how X1, Chase, and Capital One structured rewards, redemption, and restrictions. That was product research, not a live Crew offer.",
          "I explored photo-friendly family billboards and researched creator-contract models: flat fees, commission, hybrid arrangements, usage rights, and what counted as an attributed conversion. I interviewed someone at Gabb about their influencer program. Homie was a reference for bold local marketing. Neither was a Crew client or a formal partner.",
          "I wanted us to separate attention, signup, KYC completion, funded accounts, and repeat behavior. A campaign that wins views does not automatically open funded accounts. I do not claim these experiments caused growth or that they shipped.",
        ],
        modeled: {
          heading: "What I modeled",
          items: [
            "Processing research: two and a half to four cents per card transaction.",
            "Early household model: about 3.5 cards per family and 36 transactions a month.",
            "One comparison household: about 150 to 170 transactions in 30 days, used to stress the model, not as a representative sample.",
            "Rewards research: 1% cashback plus 1% for paying early, compared with other card programs.",
          ],
        },
      },
      {
        id: "brand",
        title: "The brand I drew, still in use",
        body: [
          "I owned brand identity at Crew. When outside creative directions did not meet the brief, I taught myself to draw on an iPad and drew the brand myself.",
        ],
        bullets: [
          "Earlier outside directions did not fit. I learned the drawing approach, started sketching on my iPad, and kept going after the CEO told me to continue. The result became Crew's recognizable brand, not a temporary exercise.",
          "I built a vocabulary of objects and shared activities so parents and children could see themselves in the product without depicting only one kind of household. I worked with our UX designer to carry that into screens. A 2023 exploratory visual deck is credited to Adam Eastburn and said the images were not final. Those credits do not transfer ownership of the brand I drew.",
          "I carried the system across onboarding, explainers, the website, the app, the card, and packaging so the identity was part of the product, not a standalone campaign.",
          "I personally drew the 2024 Crew wordmark and the brand illustrations. Crew still uses that wordmark today on trycrew.com and on the App Store listing, including the six-dot mark on the app icon and on the card face. I do not claim ownership of all later app or product design.",
        ],
        photos: [
          ph("crew-illustrations/img-3719.webp", "A grid of Crew paint swatches in purple, yellow, red and green.", "The palette", { fit: "contain", bg: "#ffffff" }),
          crew("tandem-2-seat-still.webp", "A Crew illustration of a two-seat tandem bike.", "Tandem"),
        ],
        links: [go("See the drawings I made for Crew", "/work/crew-brand", "link:crew_brand_section:work_crew")],
      },
      {
        id: "demonstrates",
        title: "What this role demonstrates",
        body: [
          "This was an early-stage startup role. I wore many hats because the team was small, not because I ran every department.",
        ],
        bullets: [
          "I was the first employee and only product manager, and the work spanned program dependencies, customer discovery, KYC and onboarding, payment operations, economics models, supplier and manufacturing coordination, packaging, growth research, and brand creation.",
          "The original premium family credit concept required financing the company could not secure. The direction changed to debit. I do not claim I single-handedly drove that decision.",
          "The useful judgment was joining customer trust, issuer and partner capabilities, regulations, economics, fulfillment, and design into dependencies the product could keep.",
          "Physical samples and prototypes informed what not to pursue. The unlaunched metal card was a real investigation, not a customer product, and I do not quantify savings I cannot presently verify.",
        ],
        links: [
          go("See the drawings I made for Crew", "/work/crew-brand", "link:crew_brand_close:work_crew"),
          go("Inside a Card Payment: Authorization to Settlement", "/writing/inside-a-card-payment-authorization-to-settlement", "link:crew_tap_close:work_crew"),
        ],
      },
    ],
    // THIS SECTION DOES: show real Crew app screens on /work/crew. The
    // illustrations on these screens are Brant's drawings, still in use.
    appDesignGallery: {
      title: "App design",
      intro:
        "These are Crew screens from the product. The illustrations are my own drawings for Crew, and they are still used today.",
      photos: [
        crewApp(
          "img-3756.webp",
          "Crew sign-in screen with a drawn teal door, balloons, a gift, and a Welcome ribbon. Sign in and Apply now sit below.",
          "Sign in",
          true
        ),
        crewApp(
          "img-0538.webp",
          "Crew application-under-review page on apply.trycrew.com, with a drawn desk, a sleeping dog, and a teal filing cabinet.",
          "Application under review"
        ),
        crewApp(
          "img-0544.webp",
          "Crew approved page asking the visitor to download the app, with a drawn purple van packed with household things, plus App Store and Google Play buttons.",
          "Approved"
        ),
        crewApp(
          "img-0546.webp",
          "Apple App Store listing for Crew Finance, with the six-dot icon and a preview of a drawn claw-foot bathtub.",
          "App Store"
        ),
        crewApp(
          "img-1615.webp",
          "Apple App Store listing for Crew Finance showing preview cards of a family member named Amelia and a drawn bathtub.",
          "App Store previews"
        ),
        crewApp(
          "img-3955.webp",
          "Crew Menu screen with Profile, Linked bank accounts, Settings, Contact Crew, and Log out, plus a drawn red toolbox.",
          "Menu"
        ),
        crewApp(
          "img-4335.webp",
          "Crew screen inviting a family to combine checking and savings into a high-yield checking account, with a drawn tandem bicycle.",
          "Combine accounts",
          true
        ),
        crewApp(
          "img-4336.webp",
          "Crew Family tab for a Business pocket, with an empty recent-activity state and a drawn treadmill carrying clothes.",
          "Recent activity",
          true
        ),
        crewApp(
          "img-4338.webp",
          "Crew Family tab offering to order a physical or virtual debit card, with a drawn spotted dog holding a treat.",
          "Order a card",
          true
        ),
        crewApp(
          "img-4339.webp",
          "Crew month-in-review opening screen for May, with a drawn pig wearing a party hat.",
          "Month in review",
          true
        ),
        crewApp(
          "img-4340.webp",
          "Crew month-in-review Interest screen, with a drawn dog sitting on a purple sofa looking out a window.",
          "Interest",
          true
        ),
        crewApp(
          "img-4341.webp",
          "Crew month-in-review Spending screen with a drawn treadmill of clothes and no card activity in May.",
          "Spending",
          true
        ),
        crewApp(
          "img-4343.webp",
          "Crew month-in-review Money out screen for Travel's account, with a drawn piggy bank and an Order card link.",
          "Money out",
          true
        ),
        crewApp(
          "img-4344.webp",
          "Crew month-in-review closing screen with a drawn finish-line banner and confetti.",
          "See you next month",
          true
        ),
      ],
    },
    links: [
      go("See the drawings I made for Crew", "/work/crew-brand", "link:crew_brand:work_crew"),
      go("All work", "/work", "link:work:work_crew"),
    ],
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
