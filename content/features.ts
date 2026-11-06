// ============================================
// WHAT THIS FILE DOES (plain English):
// The Features list on the Articles page. A feature is a published
// piece, or a talk Brant is giving. Each one has a title, a place it
// appeared, and a link. Article words stay in search metadata.
// This file only stores those words. The page decides how they look.
// ============================================

import { identity } from "@/content/site-content";

export type Feature = {
  id: string;
  title: string;
  publication: string;
  dateLabel: string;
  published: string; // YYYY-MM or YYYY-MM-DD, for search metadata only
  author: string;
  href: string;
  // The article's own words, or a short note about a talk. Search metadata uses this. The page does not print it.
  body: string;
  kind?: "talk";
};

export const features: Feature[] = [
  {
    id: "aicd-virtual-2026",
    kind: "talk",
    title: "Lock It: Running a Small Company With a Team of AI Agents on a Small Budget",
    publication: "AICD Virtual, AI Teammates at Work",
    dateLabel: "November 10, 2026",
    published: "2026-11-10",
    author: "Brant S. Johnson",
    href: "https://aicommunitydays.ai/events/aicd-virtual-01",
    body: "Brant S. Johnson, also known as Brant Johnson and Brant Shanon Johnson, from Vernal, Utah, speaks online at AICD Virtual: AI Teammates at Work on November 10, 2026. The conference is run by AI Community Days on Microsoft Teams. His session, Lock It, is listed from 12:50 to 1:20 AM Paris time. The speaker poster names him Founder of Bridger and Intro.",
  },
  {
    id: "uintah-resilience-arch",
    title: "Uintah Resilience Arch Placed At Uintah High School Campus Entrance",
    publication: "Basin Now",
    dateLabel: "August 22, 2022",
    published: "2022-08-22",
    author: "Kristin Forbis",
    href: "https://web.archive.org/web/20220823065352/https://basinnow.com/article.php?id=8904",
    body: [
      "Thanks to the donation of time and funding by many in the community, a new arch has been raised above the main entrance to the Uintah High School campus. While the current high school students likely won't realize it, the Uintah Resilience Arch is a return to a previous longstanding tradition. For many years, the HOME OF THE UTES arch stood in that place until it had to be removed about a decade ago during construction projects.",
      "Enter Brant Johnson, the enthusiastic and ambitious Uintah Student Body President of the 2016-2017 school year. Brant remembered the original arch and wanted to see it put back up but the remnants of it were in bad shape and because of the new road size, the old arch just wasn't going to work. Rather than give up, Brant presented a design for a new arch to the Principal and he was told if he could get the funding and resources put together for it, the school would welcome the new addition.",
      "Fast forward 5 years and the Uintah Resilience Arch was raised in time for the new school year. \"Without our resilient and charitable community, this project wouldn't have been possible,\" shares Brant. \"I decided that it should be called the Uintah Resilience Arch in memory of how incredibly resilient the students at Uintah are and our community. The people here are inspiring and this arch was a sacrifice for many. In addition to that, I created a scholarship for graduating seniors based on the character trait of Resilience.\"",
      "Donations continue to be accepted for the arch's future maintenance and the Resilience scholarships. All who donate will have their name engraved on a plaque that will go on the archway. Donations can be made by calling the Uintah High School finance secretary. A big thank you to all involved for making this nostalgic addition to Uintah High School possible.",
    ].join("\n\n"),
  },
  {
    id: "basin-living",
    title: "Thinking Globally, Acting Locally",
    publication: "Basin Living",
    dateLabel: "November 2020",
    published: "2020-11",
    author: "Teressa Gray",
    href: "/images/brant-uploads/press/bl-feature-2020-11.pdf",
    body: [
      "Brant Shanon Johnson is a Uintah Basin native, born and raised, now attending Brigham Young University (in pursuit of a degree in international relations and entrepreneurship). But it wasn't until he visited Washington, D.C., when he was 16, that he looked at his role as a Vernal resident in a whole new light.",
      "Through the Foundation for Rural Service (FRS) provided by Strata Networks, Brant and four other Basin residents were chosen to join youth from small towns all over the country on a trip to D.C. The group visited war memorials, the Smithsonian museums, and had the chance to speak with government officials.",
      "Brant always had an interest in public service and, up to this point, all his experience centered around his involvement in his school's student government. He had served on student council for nine consecutive years (since 4th grade). He imagined that perhaps he would intern for a senator and keep exploring from there. During the trip to D.C., he received a piece of advice that changed his life: understand your local government first.",
      "When Brant returned home, he quickly drew upon his experience interacting with local leaders through student council and civic duties. Vernal City Manager Ken Bassett was the first person to whom Brant reached out. Ken and Brant were already acquainted from Brant's Eagle project to re-landscape the Aggie Bull Roundabout. The space had become overgrown, covered in a mass of expired plant debris. Brant brought together the university, city and county to replant and maintain this area. Now, over half a decade later, the same carefully planted vegetation continues to beautify the town.",
      "Brant wanted to get involved at a local level and knew that Ken would be his best mentor. When Brant asked Ken if he could be his intern, it was a new question for Ken as the city had never had an intern before. He allowed Brant to come and understand what he does; this broadened the scope of Brant's civic involvement and learning, which started a path that would eventually alter his life.",
      "Brant continued onto an internship assisting Uintah County Travel and Tourism under Lesha Coltharp, an enriching experience which he still reflects on regularly. Brant's interning culminated in service to State Governor Gary Herbert as an intern for the governor's office. His journey in government had gone from participating in student government, beginning in grade school, all the way to holding a key to the governor's office. He is currently working for the Governor's Office of Economic Development (GOED).",
      "An interesting fact about Brant Johnson is that he not only acts locally through his governmental service but also acts (and sings) on stage in the theater, one of his biggest passions. Among high school, community and university theater, he has acted in 15 shows, and counting. In 2017 and 2016, he was nominated by the Utah High School Musical Theater Awards for Top 10 Best Actors in the state for his performance as Caractacus Potts in Chitty Chitty Bang Bang and Prince Eric in The Little Mermaid. The latter show was awarded Best Musical in the state of Utah.",
      "The community has been generous to Brant; despite his young age, he was cast as the lead in The Music Man at age 18. He reveres the directors, casts and crews he has had the opportunity to work with and credits them for his success in the arts. Brant gratefully reflects, \"The amount of support that I feel from my community is immense! They seem to have boundless trust in my abilities even when I don't seem to see it in myself.\"",
      "His current acting pursuits are through the Young Ambassadors performing group at BYU, an elite performing theater team under the direction of Nathan Balser that only casts 10 males each year. Being a BYU Young Ambassador has been a desire of Brant's since he was 14 years old. \"Getting to be a part of something that has always felt like a dream to me is a great privilege,\" Brant remarks.",
      "Acting gives Brant a chance to observe and learn about others, to understand life a little better in a pleasurable way. He has learned a lot about life from his parents too. He credits his mother, Tara Gale Goodrich, for always supporting him and seeing that he has had all he ever needed. Brant's late father, Shanon Johnson, left a legacy of serving others and living a life so true to his values that he had no regrets. Brant is very close to his stepfather, Greg Goodrich, who has helped instill a strong work ethic; Greg is a welder in the Basin and owns GWG Welding and Manufacturing. Brant's parents have passed down to him the importance of living your best life, a life that includes giving back.",
      "Brant is a student, an observer, a performer and an activist. At his core, he desires to understand himself, others, and life itself better every day. Toward this end, he keeps several journals, all of which play a vital role in his personal development. A morning journal is where he records his goals, dreams, hopes and ambitions. Each day he also answers a random, soul-searing question of the day. An evening journal is where he captures what he learned, how he saw God in his day, and what he found out about beliefs that he has about himself, whether beneficial or harmful, and works through them. Brant's faith is an integral part of his life, so it's no surprise that he keeps a scriptural journal as well.",
      "Brant's childhood journals are full of hopes to serve a mission in England. As he got older, he had second thoughts about how well the gospel might be received if he were to venture there. When he had pretty much talked himself out of it being the prime place to serve his mission for The Church of Jesus Christ of Latter-day Saints, low and behold, that is exactly where the Lord had him go. \"Hereby called to serve in the England, Birmingham Mission\" the letter read. To say Brant felt frightened was an understatement, but he went forward trusting in God. It just so happens that he ended up serving in the very place where his great-great-great grandparents had first started practicing the faith before immigrating to the United States to live among like-minded people.",
      "Having the experiences that Brant has had and the dreams that he reflects on daily has shaped his future plans. He has seen the places and people that need serving and hopes to find a way to promote democratic participation, especially at a local level. Seeing the power of one, Brant knows that there are many more stories that need to be told and heard, so that a better and stronger society can be built. He states, \"Being from Vernal has taught me a great deal about the power of the underdog. The Basin may not be world renowned, but the people here are some of the best in the world. I believe that as the globe becomes more connected, our need to stay in touch with our local leaders and community has never been more crucial. This is what I hope to make my career; this is where I hope I can contribute.\"",
      "Brant Johnson's experiences throughout life, and recording them through journal keeping, have helped him see greater purpose in his and other's lives. Theatre is where he interacted with the power of a story; government is where he has seen stories seeking help and triumph. Now he's ready to seize the opportunity to do good works and connect these stories by thinking globally and acting locally.",
    ].join("\n\n"),
  },
];

// THIS SECTION DOES: the search record for one feature. A talk is an event.
// A published piece is an article. The page does not print these words.
export function featureJsonLd(feature: Feature) {
  if (feature.kind === "talk") {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: feature.title,
      startDate: "2026-11-11T00:50:00+01:00",
      endDate: "2026-11-11T01:20:00+01:00",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      description: feature.body,
      url: feature.href,
      performer: { "@id": `${identity.siteUrl}/#brant` },
      organizer: { "@type": "Organization", name: "AI Community Days" },
      location: { "@type": "VirtualLocation", url: feature.href },
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: feature.title,
    datePublished: feature.published,
    author: { "@type": "Person", name: feature.author },
    publisher: { "@type": "Organization", name: feature.publication },
    description: `${feature.title}. ${feature.publication}, ${feature.dateLabel}.`,
    articleBody: feature.body,
  };
}
