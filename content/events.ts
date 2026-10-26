// ============================================
// WHAT THIS FILE DOES (plain English):
// The Events section: the archive page (events grouped by kind) and
// a story for each event. It is built so a new event can be added
// as one more entry, without redoing the landing page. The words
// come from the approved copy doc. Where the copy doc says a detail
// is still to be confirmed (the Governor's Summit year, Uintah
// County tourism events), this file leaves that detail out. No
// dollar figures. Words only, no UI.
// ============================================

import { go, type Detail } from "@/content/detail";
import { ph, type Photo } from "@/content/photos";

export type EventItem = {
  title: string;
  tag: string; // the small label, e.g. "EVENT PRODUCTION + SPONSORSHIPS"
  summary: string;
  href: string;
  linkText: string;
  photo?: Photo;
};

export type EventGroup = { id: string; title: string; items: EventItem[] };

export const eventsIntro = {
  label: "Events",
  title: "Events",
  description: "Conferences, summits, tourism events, parties, performances, and community gatherings I've helped bring to life.",
  lead: "I love putting on an event. I like the planning, the people, and the strange collection of problems that appear between having an idea and opening the doors.",
  body: [
    "I've worked on a lot of them: business events, a governor's economic summit, tourism programs, TEDx, scholarship nights, and school productions. I've also thrown parties just because I wanted to.",
    "Some of the experiences below were events I helped produce. For others I worked on the marketing, stage experience, or performance. Open one for the full story.",
  ],
};

export const eventGroups: EventGroup[] = [
  {
    id: "conferences",
    title: "Conferences, summits, and business events",
    items: [
      {
        title: "Utah Business events",
        tag: "Event production + sponsorships",
        summary:
          "I helped put on events across a 52-event annual portfolio while working with around 63 clients. I learned a lot from the people organizing the events and the people paying to be there.",
        href: "/events/utah-business",
        linkText: "See Utah Business events",
        photo: ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday in front of a bright stage."),
      },
      {
        title: "Governor's Economic Summit",
        tag: "Event production",
        summary:
          "I helped put on the summit through my work in state economic development. It meant coordinating around business leaders, public officials, and an event that needed everyone ready on the same day.",
        href: "/events/governors-economic-summit",
        linkText: "See the summit",
      },
      {
        title: "TEDxSaltLakeCity",
        tag: "Organization + volunteers",
        summary:
          "I worked on the teams and logistics behind the event, where every speaker and onstage moment depends on a much longer list of people offstage.",
        href: "/events/tedx",
        linkText: "See TEDxSaltLakeCity",
        photo: ph("general/tedxsaltlakecity.webp", "The TEDxSaltLakeCity stage with glowing red and white letters, a red circle and a blue skyline backdrop."),
      },
      {
        title: "BYU Sandbox Demo Day",
        tag: "Startup launch + presentation",
        summary: "Our BackLocal team made it to Demo Day with paying customers, even while we were still finishing the product.",
        href: "/events/demo-day",
        linkText: "See Demo Day",
        photo: ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage."),
      },
    ],
  },
  {
    id: "tourism",
    title: "Tourism and community gatherings",
    items: [
      {
        title: "Uintah County tourism events",
        tag: "Tourism + event work",
        summary: "I've also helped with events connected to Uintah County tourism. Those experiences deserve a proper place in this archive.",
        href: "/events/uintah-county-tourism",
        linkText: "See the tourism work",
      },
      {
        title: "Resilience Scholarship Night",
        tag: "Community event",
        summary:
          "I founded the scholarship program and helped bring people together to recognize students whose effort doesn't always show up in their grades.",
        href: "/events/scholarship-night",
        linkText: "See scholarship night",
        photo: ph("general/resilience-23.webp", "A scholarship recipient on stage in front of a red and white Utes backdrop.", undefined, { position: "50% 40%" }),
      },
    ],
  },
  {
    id: "parties",
    title: "Parties and experiences",
    items: [
      {
        title: "Parties and gatherings",
        tag: "Hosting + creative direction",
        summary: "I love throwing a party. I get invested in the theme, the room, and everything that makes people want to stay.",
        href: "/events/parties",
        linkText: "The parties",
      },
      {
        title: "Homecoming at an airport",
        tag: "Event planning",
        summary: "We held homecoming at an airport, with a helicopter bringing in the game ball. I still think it was a great idea.",
        href: "/events/airport-homecoming",
        linkText: "The airport story",
      },
      {
        title: "Large-scale installations and parade floats",
        tag: "Environment + build",
        summary: "Three floats from scratch, 25-foot Christmas trees, and oversized set pieces made for people to walk into.",
        href: "/events/holiday-installations",
        linkText: "See the installations",
        photo: ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", undefined, { focus: { x: 0.5, y: 0.35 } }),
      },
    ],
  },
  {
    id: "onstage",
    title: "Onstage and back in the school years",
    items: [
      {
        title: "Theater productions",
        tag: "Performance + marketing",
        summary: "Eight musicals, a touring production, schoolwide set dressing, and a flying car.",
        href: "/events/theater",
        linkText: "See the theater work",
        photo: ph("elf-photos/53362776363-e26ba4db3a-o.webp", "Elves and a yellow taxi on the snowflake stage in Elf the Musical."),
      },
      {
        title: "School events and assemblies",
        tag: "Event planning",
        summary: "More than 55 assemblies, student-led events, and some ambitious plans from before I graduated.",
        href: "/events/school-events",
        linkText: "See school events",
      },
    ],
  },
];

const crumbs = (label: string) => [{ label: "Events", href: "/events" }, { label }];
const back = { href: "/events", label: "All events" };
const L = "Events";

export const eventDetails: Detail[] = [
  {
    slug: "utah-business",
    path: "/events/utah-business",
    title: "Utah Business events",
    metaTitle: "Utah Business Events",
    description: "Helping produce business events, work with sponsors, and bring people together through Utah Business.",
    crumbs: crumbs("Utah Business"),
    label: L,
    lead: [
      "I helped put on a lot of events at Utah Business. My role had a major sponsorship and client component, but I was involved in making the events happen too. The work taught me just how many decisions sit behind a room full of people who are supposed to be having a good time.",
    ],
    glance: [
      { label: "Company", value: "Utah Business Magazine and Deseret News" },
      { label: "Role and dates", value: "Account Executive, Oct 2024 to Nov 2025" },
      { label: "Scale", value: "Around 63 clients, a 52-event annual portfolio" },
    ],
    sections: [
      {
        id: "getting-events-on",
        title: "Helping get the events on",
        body: [
          "I worked with businesses involved in these events, helped bring sponsors into the experience, and was part of the work of getting the events ready and delivered. You're dealing with deadlines, expectations, and a lot of people who all have their own definition of a successful event.",
          "The moments I liked most were when a complicated plan finally turned into something people could attend.",
        ],
        photos: [
          ph("general/brant-at-utah-business.webp", "Brant at a Utah Business Magazine table with a subscribe sign.", "At Utah Business"),
          ph("general/brant-planning-conference-founder-friday.webp", "A group selfie at Founder Friday in front of a bright stage.", "Founder Friday"),
        ],
      },
      {
        id: "sponsors",
        title: "What I heard from sponsors",
        body: [
          "The businesses I worked with wanted more than a logo or a room full of attendees. They were putting money into the event because they wanted the chance to meet people who could help them move something forward.",
          "Hearing what worked and what disappointed them gave me a much clearer view of what event organizers are up against.",
        ],
        photos: [ph("general/brant-planning-conference.webp", "Brant giving a thumbs up in a packed conference hall.", "A full room")],
      },
      {
        id: "intro",
        title: "Where Intro came from",
        body: [
          "I started building Intro after seeing how much of an event's value still depended on chance introductions. The idea was to make it easier for the organizers to create those opportunities and for sponsors to see whether useful meetings happened.",
        ],
      },
    ],
    links: [go("Intro", "/work/intro", "link:intro:event_utah_business"), go("All events", "/events", "link:events:event_utah_business")],
    back,
  },
  {
    slug: "governors-economic-summit",
    path: "/events/governors-economic-summit",
    title: "The Governor's Economic Summit",
    metaTitle: "Governor's Economic Summit",
    description: "My work helping put on the governor's economic summit as part of state economic-development work.",
    crumbs: crumbs("Governor's Economic Summit"),
    label: L,
    lead: [
      "I helped put on the governor's economic summit while working in state economic development. There was a lot to coordinate when business leaders, public officials, and the event team all needed to be ready for the same day.",
    ],
    glance: [{ label: "Role", value: "Event production and coordination through government and economic-development work" }],
    sections: [
      {
        id: "working-on-it",
        title: "Working on the event",
        body: [
          "My time in government involved communication, economic-development work, and helping people get the information they needed. The summit gave that work a very different kind of deadline: the event had to happen, and people had to be ready for it.",
          "I liked being part of that effort. There's something satisfying about seeing a large group of people arrive for something you've helped prepare.",
        ],
      },
    ],
    links: [go("All events", "/events", "link:events:event_summit")],
    back,
  },
  {
    slug: "uintah-county-tourism",
    path: "/events/uintah-county-tourism",
    title: "Uintah County tourism events",
    metaTitle: "Uintah County Tourism Events",
    description: "Events and experiences I've helped with through Uintah County tourism work.",
    crumbs: crumbs("Uintah County tourism"),
    label: L,
    lead: [
      "I've helped with events connected to Uintah County tourism, and I want the work to have its own place here. It involves the kind of coordination I enjoy: taking an idea for an experience and helping the people involved make it happen.",
      "What I like about tourism events is that you're making something people will remember from being there. Getting the word out matters. So does what happens when people arrive.",
    ],
    sections: [],
    links: [go("All events", "/events", "link:events:event_tourism")],
    back,
  },
  {
    slug: "tedx",
    path: "/events/tedx",
    title: "TEDxSaltLakeCity",
    metaTitle: "TEDxSaltLakeCity",
    description: "Event organization and behind-the-scenes work at TEDxSaltLakeCity.",
    crumbs: crumbs("TEDxSaltLakeCity"),
    label: L,
    lead: [
      "TEDx has the kind of production people mostly notice when something goes wrong. Speakers get the stage, but there's a long list of people coordinating and preparing so the day works.",
      "I worked as an Organization Assistant with TEDxSaltLakeCity and helped with the moving pieces behind the event.",
    ],
    glance: [
      { label: "Role", value: "Organization Assistant" },
      { label: "When", value: "Jan to Sep 2021" },
    ],
    sections: [
      {
        id: "behind-the-scenes",
        title: "Behind the scenes",
        body: [
          "I worked with the organizing team and volunteers, helping keep information, tasks, and follow-ups moving as we prepared for the event.",
          "It's still some of my favorite work. I like bringing people into an idea, figuring out what each person can do, and helping them reach the day when it's finally real.",
        ],
        photos: [ph("tedx-brant-photo/img-7981.webp", "Brant standing on a red circle beneath the Welcome to TEDxSaltLakeCity sign.", "TEDxSaltLakeCity")],
      },
    ],
    links: [go("All events", "/events", "link:events:event_tedx")],
    back,
  },
  {
    slug: "theater",
    path: "/events/theater",
    title: "Theater",
    metaTitle: "Theater",
    description: "Brant Johnson's theater work, from student productions and marketing to BYU Young Ambassadors and Elf at Hale Centre Theatre.",
    crumbs: crumbs("Theater"),
    label: L,
    lead: ["I love theater. I still get nervous singing in front of people, which hasn't stopped me from doing eight musicals."],
    sections: [
      {
        id: "vernal",
        title: "Back in Vernal",
        body: [
          "In high school I performed in productions including The Little Mermaid and Chitty Chitty Bang Bang. For The Little Mermaid, I helped turn the school itself into part of the show with decorations hanging from the ceilings. Chitty had a flying car. We took the set dressing very seriously.",
          "I also helped run marketing for the program. I built our first social media ad strategy and led ten students. Across our junior- and senior-year runs, we sold out 1,200 seats a night for twelve performances. The theater program placed among the state's top ten and won best in state one year.",
        ],
        photos: [
          ph("general/brant-eric-in-little-mermaid-highschool.webp", "A high school stage lit in purple for The Little Mermaid.", "The Little Mermaid"),
          ph("chitty-high-school-productions/img-2731.webp", "The flying car on stage at Chitty Chitty Bang Bang, with the cast dancing around it.", "Chitty Chitty Bang Bang"),
        ],
      },
      {
        id: "school-sets",
        title: "The school, dressed for the show",
        body: [],
        photos: [
          ph("chitty-high-school-productions/tara-iphone-july-2017-523.webp", "A school hall decorated for a show with checkered flags and gears.", "The hall"),
          ph("chitty-high-school-productions/tara-iphone-july-2017-527.webp", "A large Chitty Chitty Bang Bang banner in the school hall.", "The banner"),
        ],
      },
      {
        id: "young-ambassadors",
        title: "BYU Young Ambassadors",
        body: [
          "I joined BYU's international musical theater company as a non-major. Our first year was an untested new show that didn't work and was cut. The next year we toured a better-tested show, including performances in South Korea.",
          "I got an unusually clear look at how much work can go into something that doesn't quite land, even with talented people behind it.",
        ],
        photos: [ph("general/ya-group-photo.webp", "The BYU Young Ambassadors company posed in blue blazers in a garden.", "BYU Young Ambassadors")],
      },
      {
        id: "elf",
        title: "Elf at Hale Centre Theatre",
        body: [
          "Being cast in Elf the Musical was something I'd wanted for years. The theater is in the round, which means you can see the audience while you're performing. You can tell pretty quickly when people are having a great time or when something has lost them.",
          "I sometimes describe that as live A/B testing. I realize that's a fairly product-manager way to talk about theater.",
        ],
        photos: [
          ph("general/elf-brant.webp", "Brant outside the Hale Centre Theatre sign for Elf the Musical.", "Outside Hale Centre", { position: "50% 70%" }),
          ph("elf-photos/7301a6fe-b7f2-4c0e-80bf-d0bf389b6934-1-201-a.webp", "The Elf company in a snowy finale with Santa in the middle.", "The finale"),
        ],
      },
      {
        id: "shows",
        title: "Shows",
        body: ["Les Misérables, Chitty Chitty Bang Bang, Elf the Musical, Something Rotten!, The Music Man, The Little Mermaid, Mary Poppins, and Anything Goes."],
        photos: [
          ph("something-rotten/img-8341.webp", "Men in black leather costumes posed on stage in Something Rotten.", "Something Rotten!"),
          ph("general/music-man.webp", "A man in a yellow checked suit holding a suitcase that reads Prof. Harold Hill.", "The Music Man", { position: "50% 30%" }),
        ],
      },
    ],
    gallery: {
      title: "More photos",
      photos: [
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
    links: [go("All events", "/events", "link:events:event_theater")],
    back,
  },
  {
    slug: "parties",
    path: "/events/parties",
    title: "I love throwing a party.",
    metaTitle: "Parties and Gatherings",
    description: "Parties, celebrations, costumes, and the events I put together because I love having people over.",
    crumbs: crumbs("Parties"),
    label: L,
    lead: [
      "I'll happily spend more time than I should thinking about the theme, the room, and what everybody's going to do once they get there. I love the buildup, and I love seeing people have fun with something we've put together.",
      "Some gatherings are pretty straightforward. Others turn into a much bigger production because I keep getting ideas after I should probably stop.",
    ],
    sections: [
      {
        id: "airport",
        title: "The airport homecoming",
        body: ["We held homecoming at an airport, and a helicopter brought in the game ball. I helped plan that one while I was in school."],
        links: [go("Read about it", "/events/airport-homecoming", "link:airport:event_parties")],
      },
      {
        id: "costumes",
        title: "Costumes and themed gatherings",
        body: ["I make several Halloween costumes in a typical year, though I'll take just about any excuse for a costume or a themed party."],
        links: [go("See what I've made", "/about/handmade", "link:handmade:event_parties")],
      },
      {
        id: "decorations",
        title: "Decorations and installations",
        body: [
          "I've made oversized holiday displays and floats, often with a group of people who agreed to the idea before realizing how much work it would be.",
        ],
        links: [go("See the installations", "/events/holiday-installations", "link:installations:event_parties")],
      },
    ],
    links: [go("All events", "/events", "link:events:event_parties")],
    back,
  },
  {
    slug: "airport-homecoming",
    path: "/events/airport-homecoming",
    title: "We held homecoming at an airport.",
    metaTitle: "Homecoming at an Airport",
    description: "The time we held a school homecoming dance at an airport and had a helicopter deliver the game ball.",
    crumbs: crumbs("Airport homecoming"),
    label: L,
    lead: [
      "I helped plan a homecoming dance at an airport while I was in school. We also arranged for a helicopter to bring in the game ball.",
      "I know it sounds like a lot for homecoming. That was part of the appeal.",
    ],
    sections: [
      {
        id: "getting-it-to-happen",
        title: "Getting it to happen",
        body: [
          "There was the normal work of planning a school dance, plus the problem of making an unusual venue work for students and everyone else involved. People had to say yes to an idea that wasn't remotely the standard gym setup.",
          "The school did it again five years later. I'm pretty pleased with that part.",
        ],
      },
    ],
    links: [
      go("Parties and gatherings", "/events/parties", "link:parties:event_airport"),
      go("The pre-college era", "/about/pre-college", "link:pre_college:event_airport"),
      go("All events", "/events", "link:events:event_airport"),
    ],
    back,
  },
  {
    slug: "school-events",
    path: "/events/school-events",
    title: "Before I could put this on a résumé",
    metaTitle: "School Events",
    description: "A very busy pre-college period of assemblies, school events, theater marketing, and student leadership.",
    crumbs: crumbs("School events"),
    label: L,
    lead: ["I was student body president in elementary, middle, and high school. Apparently, I liked organizing things long before I knew it could become a job."],
    glance: [{ label: "At a glance", value: "More than 55 assemblies planned. Student government and event work." }],
    sections: [
      {
        id: "assemblies",
        title: "Assemblies and student events",
        body: [
          "I helped plan assemblies, worked with administrators and counselors on student well-being, and created a student arts chair that grew into a committee. I liked finding ways to involve people who didn't always get asked to be part of things.",
        ],
        photos: [ph("general/fbla-scholars-panel.webp", "Brant in a patterned jacket smiling beside two students at a scholars panel.", "A scholars panel", { position: "30% 40%" })],
      },
      {
        id: "marketing",
        title: "Theater marketing",
        body: [
          "I also helped market our school productions. A team of ten students worked on the promotions, and our shows sold out 1,200 seats nightly across twelve-day runs.",
        ],
      },
      {
        id: "homecoming",
        title: "An exceptionally elaborate homecoming",
        body: ["We had a homecoming dance at an airport. There was a helicopter. I wrote more about that one on its own page."],
      },
    ],
    links: [
      go("Airport homecoming", "/events/airport-homecoming", "link:airport:event_school"),
      go("Pre-college stories", "/about/pre-college", "link:pre_college:event_school"),
      go("All events", "/events", "link:events:event_school"),
    ],
    back,
  },
  {
    slug: "holiday-installations",
    path: "/events/holiday-installations",
    title: "I tend to get carried away with decorations.",
    metaTitle: "Installations and Parade Floats",
    description: "Parade floats, giant decorations, and the creative work behind memorable events.",
    crumbs: crumbs("Installations"),
    label: L,
    lead: [
      "A 25-foot Christmas tree seemed like a good idea. So did painting fifteen-foot nutcrackers. I still think they were good ideas, although putting everything away was another matter.",
    ],
    sections: [
      {
        id: "installations",
        title: "The installations",
        body: [
          "I helped create large school holiday displays and set pieces, sometimes showing up at five in the morning over a weekend to get everything ready before students came back.",
        ],
        photos: [ph("general/brant-ugly-sweaters.webp", "Brant in a handmade nutcracker costume covered in tinsel, saluting.", "The nutcracker", { focus: { x: 0.5, y: 0.35 } })],
      },
      {
        id: "floats",
        title: "Parade floats",
        body: ["I've built three parade floats from scratch. I love the process of taking something from a rough drawing to a physical thing that an audience can see."],
      },
      {
        id: "theater",
        title: "Theater environments",
        body: ["For The Little Mermaid, we extended the set beyond the theater with decorations around the school. I liked the idea that an event could start before people got through the door."],
      },
    ],
    links: [
      go("Parties", "/events/parties", "link:parties:event_installations"),
      go("Theater", "/events/theater", "link:theater:event_installations"),
      go("Handmade", "/about/handmade", "link:handmade:event_installations"),
      go("All events", "/events", "link:events:event_installations"),
    ],
    back,
  },
  {
    slug: "scholarship-night",
    path: "/events/scholarship-night",
    title: "Resilience Scholarship Night",
    metaTitle: "Resilience Scholarship Night",
    description: "A scholarship celebration for students whose efforts aren't always captured by grades or transcripts.",
    crumbs: crumbs("Scholarship Night"),
    label: L,
    lead: [
      "The scholarship started because I wanted students dealing with difficult circumstances to have their effort recognized. Scholarship night is the part where we get to celebrate them with the people who care about them.",
    ],
    sections: [
      {
        id: "the-event",
        title: "The event",
        body: [
          "I helped bring together the program and its community supporters. The evening is a chance to put the attention on the seniors receiving the award and the work it took them to get there.",
          "The scholarship began in 2020, with help from funds left over from the Uintah Resilience Archway project.",
        ],
        photos: [
          ph("general/resilience-23.webp", "A scholarship recipient on stage in front of a red and white Utes backdrop.", "2023", { position: "50% 40%" }),
          ph("general/resilience-scholarship-25.webp", "Brant on stage with a recipient in front of balloons shaped like the number 25.", "2025"),
        ],
      },
      {
        id: "night",
        title: "Scholarship night",
        body: [],
        photos: [ph("general/scholarship-night-fundraiser-event.webp", "A scholarship night event with a piano and round tables.", "Scholarship night")],
      },
    ],
    links: [go("The scholarship", "/community/scholarship", "link:scholarship:event_night"), go("All events", "/events", "link:events:event_night")],
    back,
  },
  {
    slug: "demo-day",
    path: "/events/demo-day",
    title: "Demo Day with paying customers",
    metaTitle: "BackLocal at Demo Day",
    description: "BackLocal's presentation and early customer traction at BYU Sandbox Demo Day.",
    crumbs: crumbs("Demo Day"),
    label: L,
    lead: ["Our BackLocal team got to BYU Sandbox Demo Day with revenue, even though we were still finishing parts of the product."],
    glance: [{ label: "At a glance", value: "BackLocal, Head of Product, BYU Sandbox" }],
    sections: [
      {
        id: "getting-there",
        title: "Getting there",
        body: [
          "We interviewed more than 370 potential users and spent eight months working toward a B2B launch. I led five engineers and two UX designers. When parts of the software weren't ready, I found a white-label product that could help us serve customers sooner.",
          "We were one of only four teams with revenue at Demo Day.",
        ],
        photos: [ph("general/sandbox-stage.webp", "The Sandbox stage with a big sandbox sign and blue floor.", "Sandbox")],
      },
      {
        id: "onstage",
        title: "Onstage",
        body: [
          "The presentation was a chance to show what we'd learned from customers and what people had already been willing to pay for. The team had done the work that made the demonstration possible.",
        ],
        photos: [
          ph("general/brant-presenting-at-sandbox.webp", "Brant presenting BackLocal on the Sandbox stage.", "Demo Day"),
          ph("general/entire-sandbox-team-interns.webp", "The Sandbox team in matching orange headbands.", "The Sandbox team"),
        ],
      },
    ],
    links: [go("BackLocal product story", "/work/backlocal", "link:backlocal:event_demo_day"), go("All events", "/events", "link:events:event_demo_day")],
    back,
  },
];
