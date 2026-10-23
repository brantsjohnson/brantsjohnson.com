// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the scenes on each section page: the short panels of story
// and the photos that go with them. Every fact comes from
// docs/about-brant.md or content/narrative.ts. The pages read it and
// draw it. It does not draw any UI. No dollar figures, no em dashes.
// ============================================

import type { AreaTag, CopyPart } from "@/content/narrative";
import { creator, entrepreneur, product, publishedWriting, story } from "@/content/narrative";
import { photoSizes } from "@/content/photo-sizes";

// THIS SECTION DOES: one photo on a page. Width and height reserve its space before it loads.
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  bg?: string; // a ground for drawings with see-through edges
  fit?: "cover" | "contain";
  position?: string; // which part stays in view when a photo is cropped
};

export type SceneStat = { value: string; label: string };

export type SceneLink = { text: string; href: string; track: string };

export type SceneVideo = {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
  width: number;
  height: number;
};

// THIS SECTION DOES: one panel of a section's story
export type Scene = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  body: (string | CopyPart[])[];
  quote?: string;
  stats?: SceneStat[];
  photos?: Photo[];
  video?: SceneVideo;
  links?: SceneLink[];
  tags?: AreaTag[];
};

export type Chapter = {
  id: string;
  number: string;
  title: string;
  kicker: string;
  intro: CopyPart[];
  scenes: Scene[];
  stripTitle: string;
  stripIntro: string;
  strip: Photo[];
};

const UPLOADS = "/images/brant-uploads/";

// THIS SECTION DOES: build a Photo from a file in public/images/brant-uploads
function ph(file: string, alt: string, caption?: string, extra?: Partial<Photo>): Photo {
  const size = photoSizes[file];
  if (!size) throw new Error(`No size on record for ${file}`);
  return { src: `${UPLOADS}${file}`, alt, width: size[0], height: size[1], caption, ...extra };
}

const text = (value: string): CopyPart => ({ type: "text", text: value });
const link = (value: string, href: string, track: string): CopyPart => ({ type: "link", text: value, href, track });

// Drawings with see-through edges sit on this ground.
const INK = "#0a0806";

// ---------------------------------------------------------------------------
// PRODUCT
// ---------------------------------------------------------------------------
export const productChapter: Chapter = {
  id: "product",
  number: "01",
  title: "Senior Product Manager",
  kicker: "Product",
  intro: [
    text(
      "I build technology as a bridge to real human connection. I own the whole product, from a Visa card program to onboarding to analytics, and I've sold what I ship. Pick a stop below."
    ),
  ],
  scenes: [
    {
      id: "overview",
      label: "How I work",
      eyebrow: "About six years in product",
      title: "I own the whole thing.",
      body: [
        "Ownership isn't doing every task. It's knowing which tasks have to happen and getting the right people on them.",
        "I'm comfortable with instinct. I want my instinct fed good data and good interviews, and I trust proven methods before I reinvent the wheel. Sales and product should talk constantly, and I like being the one who translates between them.",
      ],
      quote: product.quote,
      links: [{ text: product.quoteLink.text, href: product.quoteLink.href, track: product.quoteLink.track }],
      photos: [
        ph("general/brant-at-crew.webp", "Brant grinning at a desk in the Crew office.", "At Crew", { position: "50% 25%" }),
        ph("general/brant-coding.webp", "Brant working on a laptop from a couch.", "Building"),
      ],
    },
    {
      id: "utah-business",
      label: "Utah Business",
      eyebrow: "Utah Business Magazine and Deseret News · Account Executive · Oct 2024 to Nov 2025",
      title: "Sales, on purpose.",
      body: [
        "I sold print, digital and event campaigns, and I chose that job on purpose. I wanted to hear \"I can't justify this spend\" from the person saying it. It changed how I think about value.",
        "I brought sponsor objections back to product. Sponsors could not measure the return on their spend. That problem led to Intro.",
      ],
      stats: [
        { value: "63", label: "clients" },
        { value: "52", label: "annual events" },
      ],
      photos: [
        ph("general/brant-at-utah-business.webp", "Brant at a Utah Business Magazine table with a subscribe sign.", "At the Utah Business table"),
        ph("general/brant-planning-conference-founder-friday.webp", "Brant in a group selfie at Founder Friday.", "Founder Friday"),
        ph("general/brant-planning-conference-green-business.webp", "Brant in front of the Utah Business Green Business backdrop.", "Green Business"),
      ],
      links: [{ text: "See where that problem led", href: "/entrepreneur", track: "link:entrepreneur:product_utah_business" }],
      tags: [
        { label: "Product", href: "/product" },
        { label: "Entrepreneur", href: "/entrepreneur" },
      ],
    },
    {
      id: "crew",
      label: "Crew Finance",
      eyebrow: "Senior Product Manager and first employee · Dec 2022 to Apr 2024",
      title: "A Visa card, from nothing.",
      body: [
        "I was the first employee at Crew Finance, a family banking startup. I owned the Visa card issuing program end to end: the card, KYC with our banking and compliance partners, manufacturing and shipping, and the onboarding a parent and a kid both had to get through. That meant PCI and COPPA requirements and 8 outside suppliers.",
        [
          text("The experiments I ran cut onboarding time in half and raised engagement. There was no outside brand partner that fit, so I sketched one on my iPad. "),
          link("See how I did the branding for Crew", "/creator/crew", "link:crew_brand:product"),
        ],
      ],
      stats: [
        { value: "50%", label: "faster onboarding" },
        { value: "20%", label: "more engagement" },
        { value: "8", label: "outside suppliers" },
      ],
      photos: [
        ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "The Crew team"),
        ph("crew-illustrations-in-product/img-3756.webp", "The Crew sign-in screen with an illustrated blue door.", "Sign in", { bg: "#000", fit: "contain" }),
        ph("crew-illustrations-in-product/img-1615.webp", "The Crew listing in the App Store.", "In the App Store", { fit: "contain", bg: "#fff" }),
      ],
      tags: [
        { label: "Product", href: "/product" },
        { label: "Creator", href: "/creator" },
      ],
    },
    {
      id: "washington",
      label: "Washington",
      eyebrow: "Office of Senator Mitt Romney · Congressional Intern · Sept to Dec 2022",
      title: "Five hundred pages into two.",
      body: [
        "In Washington, D.C., I handled 50 to 200 constituent inquiries a day. I also turned about 500 pages of nuclear licensing policy into a 2-page brief.",
        [
          text("Listening for what sits under the anger turned out to be a product skill too. "),
          link("More on that in the Activist story", "/activist#government", "link:activist:product_washington"),
        ],
      ],
      stats: [
        { value: "50 to 200", label: "inquiries a day" },
        { value: "500 to 2", label: "pages of policy, cut to a brief" },
      ],
      photos: [
        ph("general/mitt-romney-photo-with-brant.webp", "Brant and Senator Mitt Romney on a staircase.", "With Senator Romney"),
        ph("general/brant-on-presidential-steps-in-capitol.webp", "Brant standing on grand steps in the Capitol.", "In the Capitol", { position: "50% 55%" }),
      ],
    },
    {
      id: "divvy",
      label: "Divvy",
      eyebrow: "Divvy (now BILL) · Associate Product Management Analyst · Jun to Sept 2022",
      title: "The project nobody wanted.",
      body: [
        "I got in by following up for four months until Divvy created an internship for me. Then I took the project nobody wanted: fix Pendo. I interviewed every product pod, rebuilt the taxonomy and trained the teams.",
        "A product manager texted my boss, \"You should hire this guy.\" Product managers can't build good products without good data.",
      ],
      stats: [
        { value: "93%", label: "data accuracy" },
        { value: "13", label: "teams trained" },
        { value: "8", label: "PMs I partnered with" },
      ],
      photos: [
        ph("general/screenshot-2026-10-23-at-14-25-57.webp", "A LinkedIn post sharing a Pendo Essentials badge.", "The Pendo Essentials badge", { fit: "contain", bg: "#fff" }),
      ],
    },
    {
      id: "backlocal",
      label: "BackLocal",
      eyebrow: "BackLocal · Head of Product · Sandbox, BYU · Sept 2021 to Sept 2022",
      title: "Revenue before the code was ready.",
      body: [
        "In BYU's Sandbox venture program, I led 5 engineers and 2 UX designers to a revenue-generating B2B launch in an 8-month program. We ran more than 370 user interviews. I sold door to door, and when the code wasn't there yet, I white-labeled a working product. We were one of only four teams with revenue at Demo Day.",
        "The hard lesson was leading a team through bad news: say hard things clearly, gently and together. I also learned to trust engineers and verify, not micromanage.",
        [link("BackLocal is also a creator story", "/creator#backlocal", "link:backlocal_creator:product")],
      ],
      stats: [
        { value: "370+", label: "user interviews" },
        { value: "1 of 4", label: "teams with revenue at Demo Day" },
      ],
      photos: [
        ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Demo Day"),
        ph("general/entire-sandbox-team-interns.webp", "The Sandbox team in matching orange headbands.", "The Sandbox team"),
        ph("general/brant-talking-at-sandbox.webp", "Brant speaking at a Sandbox event with BackLocal on the screen.", "On stage"),
      ],
      tags: [
        { label: "Product", href: "/product" },
        { label: "Creator", href: "/creator" },
        { label: "Entrepreneur", href: "/entrepreneur" },
      ],
    },
    {
      id: "birmingham",
      label: "Birmingham",
      eyebrow: "Regional volunteer organization, Birmingham, England · Oct 2017 to Sept 2019",
      title: "My first product wasn't called product.",
      body: [
        "In Birmingham, England, I was a pro bono product manager and regional volunteer. I designed and coded three reporting tools by myself, and the organization added a second engineer to keep them running.",
        "I moved about 90% of admin work off paper in three weeks, and I led and trained about 400 volunteers across more than 20 regions.",
      ],
      stats: [
        { value: "2 days to 3 hours", label: "weekly reporting" },
        { value: "400", label: "volunteers led" },
        { value: "3", label: "tools I built" },
      ],
    },
  ],
  stripTitle: "In the room",
  stripIntro: "Panels, podcasts and events from the product years.",
  strip: [
    ph("general/brant-speaking-2.webp", "Brant speaking at a lectern in warm light.", "Speaking"),
    ph("general/brant-talking-on-panel.webp", "Brant on a panel with three other speakers.", "On a panel"),
    ph("general/brant-on-podcast.webp", "A video call recording of the Quick Before You Forget podcast.", "Quick Before You Forget"),
    ph("general/brant-talking-at-panel-2.webp", "A panel conversation in front of a seated crowd.", "Panel"),
    ph("general/brant-speaking.webp", "Brant speaking at a microphone.", "Speaking"),
    ph("general/brant-planning-conference-utah-business-forward.webp", "Brant at the Utah Business Forward backdrop.", "Utah Business Forward"),
    ph("general/brant-planning-conference-30-women-to-watch-conference.webp", "Brant taking a selfie with honorees at a conference.", "30 Women to Watch"),
    ph("general/brant-planning-conference-20s-in-their-20s.webp", "Brant at a 20s in their 20s event.", "20s in their 20s"),
    ph("general/brant-planning-conference-executive-excellence.webp", "Brant taking a selfie at an Executive Excellence event.", "Executive Excellence"),
    ph("general/brant-planning-conference-south-valley-chamber.webp", "Brant at the South Valley Chamber backdrop.", "South Valley Chamber"),
    ph("general/utah-economic-forum-conference-planned.webp", "A group at the Utah Economic Forum.", "Utah Economic Forum"),
  ],
};

// ---------------------------------------------------------------------------
// CREATOR
// ---------------------------------------------------------------------------
export const creatorChapter: Chapter = {
  id: "creator",
  number: "02",
  title: "Creator",
  kicker: "Creator",
  intro: creator.intro,
  scenes: [
    {
      id: "crew-brand",
      label: "Crew brand",
      eyebrow: "Brand · Crew Finance",
      title: "I sketched it on an iPad.",
      body: [
        "I wasn't a trained designer, so I learned the tools, learned enough illustration to carry a system, and worked with our UX designer so the card, the packaging, the landing page, onboarding and the app felt like one product.",
        "I chose symbols (money, connection, kids, growing up, nostalgia) instead of drawing families, so every kind of family could feel included. Test users praised the brand unprompted.",
      ],
      links: [{ text: "Open the Crew gallery", href: "/creator/crew", track: "link:crew_gallery:creator" }],
      tags: creator.crew.tags,
      photos: [
        ph("crew-illustrations/door-summer.webp", "A Crew illustration of a blue front door with a wreath and two shrubs.", "The door, in summer", { bg: INK, fit: "contain" }),
        ph("crew-illustrations/pig-mascot.webp", "A Crew illustration of a pig mascot.", "The pig", { bg: INK, fit: "contain" }),
        ph("crew-illustrations/letters2x.webp", "A Crew illustration of a pile of green envelopes.", "Letters", { bg: INK, fit: "contain" }),
      ],
    },
    {
      id: "tone",
      label: "The hard part",
      eyebrow: "Crew landing page",
      title: "Not childish. Not stuffy.",
      body: [
        "The hard part was tone. Family banking can't feel childish to the parent or like your mom's bank to the kid.",
        "So I took the homepage on an iPad to parents at a local shopping center and redesigned it five times from their reactions.",
      ],
      photos: [
        ph("crew-illustrations-in-product/img-4335.webp", "A dark Crew screen with a drawn tandem bicycle.", "In the app", { bg: "#000", fit: "contain" }),
        ph("crew-illustrations-in-product/img-0538.webp", "A Crew web page with a drawn desk and filing cabinet.", "On the web", { bg: "#fff", fit: "contain" }),
        ph("crew-illustrations-in-product/img-0546.webp", "The Crew App Store page.", "In the store", { bg: "#fff", fit: "contain" }),
      ],
    },
    {
      id: "backlocal",
      label: "BackLocal",
      eyebrow: "Brand · BackLocal",
      title: "Designed alongside the product.",
      body: [creator.backlocal.body],
      links: [{ text: creator.backlocal.link.text, href: creator.backlocal.link.href, track: creator.backlocal.link.track }],
      tags: creator.backlocal.tags,
      photos: [
        ph("general/backlocal-designs.webp", "Three people in BackLocal shirts at an outdoor event.", "In BackLocal shirts"),
        ph("general/backlocal-designs-first-designs.webp", "BackLocal stickers on the grass.", "The first stickers"),
        ph("backlocal-icons/untitled-design-86.webp", "A BackLocal icon of an arch above a row of buildings.", "The mark", { fit: "contain", bg: "#fff" }),
      ],
    },
    {
      id: "writing",
      label: "Writing",
      eyebrow: "Substack, LinkedIn and a podcast",
      title: "Essays on connection and craft.",
      body: [
        "I write about the things I keep learning: why theater kids make good employees, what I would build if I could build any company, and why human connection matters more in an AI world.",
      ],
      links: [
        ...publishedWriting.map((piece) => ({
          text: `${piece.title} (${piece.date})`,
          href: piece.href,
          track: "link:substack:creator_writing",
        })),
        {
          text: "YES, you need marketing: Don't fall for the Elon Musk Myth (LinkedIn, Nov 2024)",
          href: "https://www.linkedin.com/pulse/yes-you-need-marketing-dont-fall-elon-musk-myth-learn-s-johnson-divvc/",
          track: "link:linkedin_article:creator_writing",
        },
        {
          text: "Quick Before You Forget: Believe in Yourself (podcast, May 2026)",
          href: "https://www.youtube.com/watch?v=qhj9oJrPxfg",
          track: "link:podcast:creator_writing",
        },
        { text: "All writing", href: "/writing", track: "link:writing:creator" },
      ],
      photos: [
        ph("general/brant-on-podcast.webp", "A video call recording of the Quick Before You Forget podcast.", "On Quick Before You Forget"),
      ],
    },
    {
      id: "poetry",
      label: "Poetry",
      eyebrow: "2022 and 2024",
      title: creator.poetry.intro,
      body: [
        "There are two poems on this site: To The Sky, from 2022, and Your understanding charm, from 2024. One poem to a page, with the line breaks kept exactly.",
      ],
      links: [{ text: "Read the poems", href: "/creator/poetry", track: "link:poetry:creator_scene" }],
      photos: [
        ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on the road under the Uintah archway.", "Under the arch", { position: "50% 40%" }),
      ],
    },
    {
      id: "handmade",
      label: "Handmade",
      eyebrow: "Things people can see and hold",
      title: "Costumes, floats and 25-foot trees.",
      body: [
        "I make my own Christmas sweater every year and have never lost a sweater contest (17 and counting as of 2024). I have 4 or 5 Halloween costumes every year, and I built 3 parade floats from scratch.",
        "I decorated my school for every holiday, with 25-foot Christmas trees and hand-painted 15-foot nutcrackers, often coming in at 5 AM on weekends so students walked into a new world on Monday.",
      ],
      photos: [
        ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { position: "50% 20%" }),
        ph("chitty-high-school-productions/tara-iphone-july-2017-523.webp", "A school hall decorated like a Grand Prix with checkered flags and gears.", "The hall, decorated"),
        ph("chitty-high-school-productions/tara-iphone-july-2017-526.webp", "A giant red and blue banner hanging in the school hall.", "The banner"),
      ],
    },
  ],
  stripTitle: "The Crew drawings",
  stripIntro: "A few of the illustrations that carry the Crew brand.",
  strip: [
    ph("crew-illustrations/door-spring.webp", "A Crew illustration of a blue door in spring, with a kite.", "Spring", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/door-winter.webp", "A Crew illustration of a blue door in winter with lights.", "Winter", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/lemonade-new.webp", "A Crew illustration of a yellow lemonade tent and a lemon.", "Lemonade", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/champagne-new.webp", "A Crew illustration of two glasses clinking.", "Cheers", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/img-3719.webp", "A grid of Crew paint swatches in purple, yellow, red and green.", "The palette", { fit: "contain" }),
    ph("crew-illustrations/tandem-2-seat-still.webp", "A Crew illustration of a two-seat tandem bike.", "Tandem", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/lights-still.webp", "A Crew illustration of string lights.", "Lights", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/frames-new.webp", "A Crew illustration of picture frames.", "Frames", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/file-new.webp", "A Crew illustration of a yellow filing cabinet.", "The file", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/thank-you-bags-still.webp", "Crew illustrations of thank you bags.", "Thank you", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/newspaper-new.webp", "A Crew illustration of a teal bow.", "The bow", { bg: INK, fit: "contain" }),
    ph("crew-illustrations/fridge-new.webp", "A Crew illustration of fridge magnets reading you're on the list.", "On the list", { bg: INK, fit: "contain" }),
  ],
};

// ---------------------------------------------------------------------------
// PERFORMER
// ---------------------------------------------------------------------------
export const performerChapter: Chapter = {
  id: "performer",
  number: "03",
  title: "Performer",
  kicker: "Performer",
  intro: [
    text(
      "I love theater, even though singing in public is one of my biggest fears. I do it anyway. Here is the road from a high school stage in Vernal to Hale Centre Theatre."
    ),
  ],
  scenes: [
    {
      id: "vernal",
      label: "Vernal stage",
      eyebrow: "High school theater, Vernal, Utah",
      title: "Seaweed curtains and a car that flew.",
      body: [
        "In high school I was recognized twice among the top high-school actors in Utah. I also ran marketing for our shows.",
        "For The Little Mermaid I turned the school into part of the show: seaweed curtains, banners, things hanging overhead. My senior year production was Chitty Chitty Bang Bang, with a car that flew.",
      ],
      photos: [
        ph("general/brant-eric-in-little-mermaid-highschool.webp", "A high school stage lit in purple for The Little Mermaid.", "The Little Mermaid"),
        ph("chitty-high-school-productions/img-2731.webp", "The flying car on stage at Chitty Chitty Bang Bang, with the cast dancing around it.", "Chitty Chitty Bang Bang"),
        ph("chitty-high-school-productions/fb-img-1510765043923.webp", "The Chitty car lifting off in a beam of light.", "Lift off"),
      ],
    },
    {
      id: "marketing",
      label: "The marketing",
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
        ph("chitty-high-school-productions/tara-iphone-july-2017-524.webp", "A red-ceilinged school hall dressed for opening night.", "Opening night"),
        ph("chitty-high-school-productions/tara-iphone-july-2017-527.webp", "A large Chitty Chitty Bang Bang banner.", "The banner"),
      ],
    },
    {
      id: "young-ambassadors",
      label: "Young Ambassadors",
      eyebrow: "BYU Young Ambassadors · Apr 2021 to May 2023",
      title: "A flop, then South Korea.",
      body: [
        "I made BYU Young Ambassadors, the international musical theatre company, as a non-major. Year one was a brand-new, untested show that flopped and was cut. Year two was a well-tested show that toured internationally, including South Korea.",
        "My lesson: even Broadway veterans fail when they skip testing.",
      ],
      stats: [
        { value: "2", label: "years with the company" },
        { value: "South Korea", label: "on the tour" },
      ],
      photos: [ph("general/ya-group-photo.webp", "The BYU Young Ambassadors company posed in blue blazers in a garden.", "BYU Young Ambassadors")],
    },
    {
      id: "elf",
      label: "Elf",
      eyebrow: "Elf the Musical · Hale Centre Theatre, Sandy, Utah",
      title: "Theater in the round is live A/B testing.",
      body: [
        "I was cast in Elf the Musical at Hale Centre Theatre, a dream I'd said out loud for years.",
        "The stage is in the round, so you see every face. You see boredom, confusion or delight in real time. I call it live A/B testing.",
      ],
      photos: [
        ph("general/elf-brant.webp", "Brant outside the Hale Centre Theatre sign for Elf the Musical.", "Outside Hale Centre", { position: "50% 70%" }),
        ph("elf-photos/7301a6fe-b7f2-4c0e-80bf-d0bf389b6934-1-201-a.webp", "The Elf company in a snowy finale with Santa in the middle.", "The finale"),
        ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage.", "New York"),
      ],
    },
    {
      id: "shows",
      label: "The shows",
      eyebrow: "Musicals I have performed in",
      title: "Eight musicals so far.",
      body: [
        "Les Misérables, Chitty Chitty Bang Bang, Elf the Musical, Something Rotten, The Music Man, The Little Mermaid, Mary Poppins and Anything Goes.",
      ],
      photos: [
        ph("something-rotten/img-8341.webp", "Men in black leather costumes posed on stage in Something Rotten.", "Something Rotten!"),
        ph("general/music-man.webp", "A man in a yellow checked suit holding a suitcase that reads Prof. Harold Hill.", "The Music Man", { position: "50% 30%" }),
        ph("something-rotten/img-9545.webp", "A performer on stage in front of the Something Rotten sign.", "On stage"),
      ],
    },
    {
      id: "tedx",
      label: "TEDx",
      eyebrow: "TEDxSaltLakeCity · Organization Assistant · Jan to Sept 2021",
      title: "Making the stage ready.",
      body: [
        "In 2021 I helped organize TEDxSaltLakeCity as an Organization Assistant. I like the part of a show that comes before anyone claps.",
      ],
      photos: [
        ph("tedx-brant-photo/img-7981.webp", "Brant standing on a red circle under a Welcome to TEDxSaltLakeCity sign.", "At TEDxSaltLakeCity"),
      ],
    },
    {
      id: "why",
      label: "Why theater",
      eyebrow: "Theater as product",
      title: "The PM is the assistant director.",
      body: [
        "Theater taught me how I run a product team. The costume designer isn't the choreographer. Nobody's craft is decoration.",
        "As a product manager I make the costumes, lights and sets serve the director's vision and the audience. Rehearsals are messy, and I love shaping rough into remarkable.",
      ],
      quote: product.quote,
      links: [
        { text: "How that shows up at work", href: "/product", track: "link:product:performer" },
        {
          text: 'Read "13 Reasons Theatre Kids Make Exceptional Employees"',
          href: "https://brantsjohnson.substack.com/p/13-reasons-theatre-kids-make-exceptional",
          track: "link:theatre_essay:performer",
        },
      ],
      tags: [
        { label: "Creator", href: "/creator" },
        { label: "Product", href: "/product" },
      ],
    },
  ],
  stripTitle: "Curtain call",
  stripIntro: "More from the stage.",
  strip: [
    ph("elf-photos/53361749782-147746384d-o.webp", "Elves dancing in the round at Hale Centre Theatre.", "Elf"),
    ph("elf-photos/53362764908-79aaaac7d3-o.webp", "Elves and a candy-cane set piece on stage.", "Elf"),
    ph("elf-photos/53362915119-e78ca3062a-o.webp", "An office scene from Elf the Musical on a snowflake floor.", "Elf"),
    ph("elf-photos/53362926889-1b8b602d64-o.webp", "Two performers embracing in winter coats.", "Elf"),
    ph("something-rotten/img-7513.webp", "A colorful Something Rotten street scene.", "Something Rotten!"),
    ph("general/music-man-2.webp", "Two men in yellow checked suits and bowler hats.", "The Music Man"),
    ph("general/brant-in-elf.webp", "The full Elf cast in red and green on a round stage.", "Elf the Musical"),
    ph("chitty-high-school-productions/img-2732.webp", "The Chitty car and cast on stage.", "Chitty Chitty Bang Bang"),
  ],
};

// ---------------------------------------------------------------------------
// ENTREPRENEUR
// ---------------------------------------------------------------------------
export const entrepreneurChapter: Chapter = {
  id: "entrepreneur",
  number: "04",
  title: "Entrepreneur",
  kicker: "Entrepreneur",
  intro: [
    text(
      "I can build by myself. I don't want to. I'd rather build big things with a great team. Good ideas deserve to happen."
    ),
  ],
  scenes: [
    {
      id: "spark",
      label: "The spark",
      eyebrow: "Where Intro started",
      title: "People pay for connection, then leave it to chance.",
      body: [entrepreneur.intro],
      photos: [
        ph("general/brant-planning-conference-founder-friday.webp", "A selfie at Founder Friday in front of a bright stage.", "Founder Friday"),
        ph("general/brant-planning-conference.webp", "Brant giving a thumbs up in a packed conference hall.", "A full room"),
      ],
    },
    {
      id: "intro",
      label: "Intro",
      eyebrow: "Founder and Product Lead · Nov 2025 to present",
      title: "AI agents that explain every match.",
      body: [
        "Intro is AI agent software for live events of about 100 to 600 people. It matches attendees, sponsors and organizers and explains every recommendation in plain language instead of a score.",
        "Success means accepted recommendations and completed meetings, not clicks.",
      ],
      links: [{ text: "Visit Intro", href: "https://intro.events", track: "link:visit_intro:entrepreneur" }],
      tags: [
        { label: "Entrepreneur", href: "/entrepreneur" },
        { label: "Product", href: "/product" },
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
    {
      id: "bridger",
      label: "Bridger",
      eyebrow: "Founder · Apr 2025 to present",
      title: "Friends, around what you love.",
      body: [
        "Bridger is an app that helps people become friends around what they love. It's in a TestFlight beta, built with contracted engineers and designers.",
        "I'm working on connection technology because isolation is on the rise.",
      ],
      links: [{ text: "Visit Bridger", href: "https://bridger.social", track: "link:visit_bridger:entrepreneur" }],
      tags: [
        { label: "Entrepreneur", href: "/entrepreneur" },
        { label: "Product", href: "/product" },
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
      id: "backlocal",
      label: "BackLocal",
      eyebrow: "Head of Product · Sept 2021 to Sept 2022",
      title: "My first company-sized bet.",
      body: [
        "BackLocal began inside BYU's Sandbox venture program. I worked on product and branding together, and we had revenue at Demo Day.",
        [
          link("Read the BackLocal product story", "/product#backlocal", "link:product:entrepreneur_backlocal"),
          text(", or "),
          link("see the brand work", "/creator#backlocal", "link:creator:entrepreneur_backlocal"),
          text("."),
        ],
      ],
      tags: [
        { label: "Product", href: "/product" },
        { label: "Creator", href: "/creator" },
        { label: "Entrepreneur", href: "/entrepreneur" },
      ],
      photos: [
        ph("general/sandbox-stage.webp", "The Sandbox stage with a big sandbox sign and blue floor.", "Sandbox"),
        ph("general/sandbox-retreat-conference.webp", "A group of Sandbox participants in matching orange headbands.", "The Sandbox retreat"),
      ],
    },
    {
      id: "chatbot",
      label: "A chatbot of me",
      eyebrow: "Before Intro, in 2024",
      title: "Forty-five pages, and a chatbot.",
      body: [
        "Before going all in on Intro, I wrote 45 pages of my accomplishments, fun facts and work philosophies and used them to build an AI chatbot of myself, so recruiters could learn about me interactively.",
        "Because I knew the whole dataset, I could see how much it left out when asked generic questions. AI knows a lot but will not share it unless you ask specifically. The prompt was too generic, so the output was generic.",
        [text("You can "), link("ask the chatbot about me", "/ask", "link:ask:entrepreneur_chatbot"), text(".")],
      ],
      stats: [{ value: "45", label: "pages of source material" }],
    },
    {
      id: "team",
      label: "The team",
      eyebrow: "What building alone taught me",
      title: "I'd rather build with a great team.",
      body: [entrepreneur.close],
      quote: entrepreneur.echo,
      photos: [ph("general/crew-team-photo.webp", "The Crew team piled onto a yellow couch.", "The Crew team")],
    },
  ],
  stripTitle: "Sandbox, up close",
  stripIntro: "From the venture program that taught me to build.",
  strip: [
    ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Demo Day"),
    ph("general/brant-talking-at-sandbox.webp", "Brant speaking at Sandbox with BackLocal on the screen.", "On stage"),
    ph("general/entire-sandbox-team-interns.webp", "The Sandbox team in orange headbands.", "The team"),
    ph("general/sandbox-stage.webp", "The Sandbox stage.", "The stage"),
    ph("general/backlocal-designs-first-designs.webp", "BackLocal stickers on grass.", "First designs"),
    ph("backlocal-icons/img-8165.webp", "BackLocal hashtag stickers on a wooden table.", "Stickers"),
    ph("backlocal-icons/img-8171.webp", "A tote bag with a smiley face on an orange ground.", "The tote", { fit: "cover" }),
  ],
};

// ---------------------------------------------------------------------------
// ACTIVIST
// ---------------------------------------------------------------------------
export const activistChapter: Chapter = {
  id: "activist",
  number: "05",
  title: "Activist",
  kicker: "Activist",
  intro: [text("I care about who gets seen. That started in a small town and it has followed me to Washington.")],
  scenes: [
    {
      id: "archway",
      label: "The archway",
      eyebrow: "Uintah Resilience Archway · Vernal, Utah",
      title: "Nothing like this ever gets done.",
      body: [
        "The old arch over my high school's road came down when the road was widened, and it sat in a yard for years. At eighteen I drew a bigger one and started cold-calling companies for money, steel, engineering and labor. Someone told me nothing like this ever gets done.",
        "It took about five years, three principals, two school boards and two superintendents. I didn't weld it. My job was getting the people who could into one project and keeping it alive.",
      ],
      stats: [
        { value: "25 ft", label: "tall" },
        { value: "63 ft", label: "wide" },
        { value: "5", label: "years" },
      ],
      photos: [
        ph("general/screenshot-2026-10-23-at-14-01-53.webp", "Red steel arch pieces lying in the grass.", "Red steel"),
        ph("general/real-blueprints-for-archway.webp", "The engineering blueprint of the Uintah arch.", "The blueprint", { fit: "contain", bg: "#fff" }),
        ph("general/brant-arch-being-welded.webp", "Brant with two builders in front of the steel arch frame.", "The frame", { position: "50% 35%" }),
      ],
    },
    {
      id: "finished",
      label: "Finished",
      eyebrow: "What it became",
      title: "Seniors take their photos under it.",
      body: [
        "More than once I was told it was overbuilt. That's how I learned about feature creep. I designed it modular and raised it five feet so buses clear it.",
        "Seniors take graduation photos under it every year. The funds left over started the Resilience Scholarship.",
      ],
      video: activistVideo(),
      photos: [
        ph("general/screenshot-2026-10-23-at-14-03-32.webp", "A group of students standing on the road beneath the finished Uintah arch.", "Under the finished arch"),
        ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on the road beneath the Uintah arch.", "The arch from the road", { position: "50% 40%" }),
      ],
    },
    {
      id: "scholarship",
      label: "The scholarship",
      eyebrow: "Resilience Scholarship · Founded 2020",
      title: "For what no transcript shows.",
      body: [
        "I knew students carrying things no transcript shows: siblings to raise, homes that weren't safe, money that wasn't there. Most scholarships reward lives that already make room for perfect grades.",
        "I founded the Resilience Scholarship in 2020 and started a weekly meeting with the school counselors so those seniors get seen.",
      ],
      photos: [
        ph("general/resilience-23.webp", "A scholarship recipient on stage in front of a red and white Utes backdrop.", "2023", { position: "50% 40%" }),
        ph("general/resilience-scholarship-25.webp", "Brant on stage with a recipient in front of balloons shaped like the number 25.", "2025"),
        ph("general/scholarship-night-fundraiser-event.webp", "A scholarship night event with a piano and round tables.", "Scholarship night"),
      ],
    },
    {
      id: "government",
      label: "Government",
      eyebrow: "City hall, the Governor's Office and Washington",
      title: "Listen for what sits under the anger.",
      body: [
        "At sixteen I called our city manager and asked to be the city's first intern. He said yes. Later I interned in the Governor's Office and worked with the Governor's Office of Economic Development during COVID, advising about 950 businesses on federal grant rules. In fall 2022 I interned for Senator Mitt Romney in Washington, D.C.",
        [
          text("What I took from it: listen for what sits under the anger. Cost, fairness, fear, a need to be heard. That's a product skill too. "),
          link("See how I listen to customers", "/product", "link:product:activist"),
        ],
      ],
      stats: [{ value: "950", label: "businesses advised during COVID" }],
      photos: [
        ph("general/brant-with-gov-gary-herbert.webp", "Brant in a tuxedo with Governor Gary Herbert and his wife at a holiday event.", "The Governor's Office", { position: "50% 30%" }),
        ph("general/mitt-romney-photo-with-brant.webp", "Brant and Senator Mitt Romney on a staircase.", "Washington, D.C."),
      ],
    },
    {
      id: "students",
      label: "Student leader",
      eyebrow: "Student government, 4th grade through senior year",
      title: "Seen first, then the party.",
      body: [
        "I was student body president in elementary, middle and high school. I was the first student body president to meet weekly with administrators and counselors about student well-being. I created an arts chair role and grew it into a committee.",
        "I made posters for students who deserved to be seen and hung them while they were in class. I also planned 55+ assemblies, and I threw a homecoming dance inside an airport, with a helicopter delivering the game ball. The school repeated it five years later.",
        "I'm an Eagle Scout, and my project redesigned the city's roundabout. I've also volunteered with the Boys & Girls Club.",
      ],
      stats: [
        { value: "3", label: "student body presidencies" },
        { value: "55+", label: "assemblies planned" },
      ],
      photos: [
        ph("general/fbla-scholars-panel.webp", "Brant in a patterned jacket smiling beside two students at a scholars panel.", "A scholars panel", { position: "30% 40%" }),
        ph("chitty-high-school-productions/tara-iphone-july-2017-526.webp", "A giant red and blue banner in the school hall.", "The school, dressed up"),
      ],
    },
  ],
  stripTitle: "The arch, start to finish",
  stripIntro: "From a yard of steel to a gate with a view.",
  strip: [
    ph("general/original-archway.webp", "The old Home of the Utes arch over the road.", "The old arch"),
    ph("general/screenshot-2026-10-23-at-14-01-53.webp", "Red arch pieces lying in the grass.", "Red steel"),
    ph("general/real-blueprints-for-archway.webp", "The Uintah arch blueprint.", "The blueprint", { fit: "contain", bg: "#fff" }),
    ph("general/brant-arch-being-welded.webp", "Brant in front of the arch frame.", "The frame"),
    ph("general/screenshot-2026-10-23-at-14-03-32.webp", "Students under the finished arch.", "Finished"),
    ph("general/brant-alone-at-the-archway.webp", "Brant on the road beneath the arch.", "The view"),
    ph("general/resilience-scholarship-2023.webp", "Two scholarship recipients with Brant on stage.", "Scholarship, 2023"),
  ],
};

function activistVideo(): SceneVideo {
  return {
    mp4: "/activist/archway-video.mp4",
    webm: "/activist/archway-video.webm",
    poster: "/activist/archway-poster.webp",
    label: "The Uintah Resilience Archway in Vernal, Utah",
    width: 1280,
    height: 720,
  };
}

// ---------------------------------------------------------------------------
// STORY
// ---------------------------------------------------------------------------
export const storyChapter: Chapter = {
  id: "story",
  number: "",
  title: story.title,
  kicker: "Story",
  intro: [text("A small town, a lot of posters, and one pattern that keeps repeating.")],
  scenes: [
    {
      id: "vernal",
      label: "Vernal",
      eyebrow: "Where I grew up",
      title: "One person can touch hundreds of lives.",
      body: [story.paragraphs[0] as CopyPart[]],
      photos: [
        ph("general/brant-alone-at-the-archway.webp", "Brant standing on a long road beneath the Uintah arch.", "Vernal, Utah", { position: "50% 40%" }),
      ],
    },
    {
      id: "posters",
      label: "Posters",
      eyebrow: "Small ways first",
      title: "Proof that someone noticed.",
      body: [story.paragraphs[1] as CopyPart[]],
      photos: [
        ph("general/brant-arch-being-welded.webp", "Brant smiling with two builders at the arch frame.", "The archway came next", { position: "50% 35%" }),
      ],
    },
    {
      id: "road",
      label: "The road",
      eyebrow: "After high school",
      title: "Same work, new titles.",
      body: [story.paragraphs[2] as CopyPart[]],
      photos: [
        ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Sandbox"),
        ph("general/brant-on-presidential-steps-in-capitol.webp", "Brant on the steps of the Capitol.", "Washington"),
        ph("general/crew-team-photo.webp", "The Crew team on a yellow couch.", "Crew"),
      ],
    },
    {
      id: "pattern",
      label: "The pattern",
      eyebrow: "Read it as a life",
      title: "The titles changed more than the work did.",
      body: [story.paragraphs[3] as CopyPart[]],
    },
    {
      id: "silly",
      label: "The silly side",
      eyebrow: "Being serious about work and silly about life",
      title: "Bees, worms and a helicopter.",
      body: [
        "In 3rd grade I petitioned to put bees on the endangered species list. I collected two pages of signatures and planned to mail them to the President. It never made it out of the house.",
        "I've waxed my legs and eaten worms for charity. I became best friends with the school janitors, because they had the real power. My superpower is hyping people up and helping them feel seen, and I speak with a bit of British English from my years in England.",
      ],
      photos: [
        ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume, saluting.", "The sweater contest record stands", { position: "50% 20%" }),
      ],
    },
  ],
  stripTitle: "A few more frames",
  stripIntro: "Moments from the road.",
  strip: [
    ph("general/brant-speaking-2.webp", "Brant speaking in warm stage light.", "Speaking"),
    ph("general/hxp-cave-exploring.webp", "A group in helmets exploring a cave.", "Cave exploring"),
    ph("general/hxp-manta-ray-swimming.webp", "Swimmers in the ocean near a manta ray.", "Swimming with manta rays"),
    ph("general/i-was-on-the-cover-of-a-magazine.webp", "Brant holding up a Basin Living magazine with his own photo on the cover.", "Basin Living"),
    ph("general/tedxsaltlakecity.webp", "The TEDxSaltLakeCity stage glowing red and blue.", "TEDxSaltLakeCity"),
  ],
};

export const chapters: Record<string, Chapter> = {
  product: productChapter,
  creator: creatorChapter,
  performer: performerChapter,
  entrepreneur: entrepreneurChapter,
  activist: activistChapter,
  story: storyChapter,
};
