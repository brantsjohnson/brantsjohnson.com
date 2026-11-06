// ============================================
// WHAT THIS FILE DOES (plain English):
// Magazine features that appear on the Articles page, under the
// Features heading. Each one is a published piece, with the title,
// the magazine, and the file a visitor opens to read it.
// This file only stores those words. The page decides how they look.
// ============================================

export type Feature = {
  id: string;
  title: string;
  publication: string;
  dateLabel: string;
  href: string;
  // The article's own words. Search metadata uses this. The page does not print it.
  body: string;
};

export const features: Feature[] = [
  {
    id: "basin-living",
    title: "Thinking Globally, Acting Locally",
    publication: "Basin Living",
    dateLabel: "November 2020",
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

// THIS SECTION DOES: the search record for one feature. The words live here
// so a search engine can find the article. The page does not print them.
export function featureJsonLd(feature: Feature) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: feature.title,
    datePublished: "2020-11",
    author: { "@type": "Person", name: "Teressa Gray" },
    publisher: { "@type": "Organization", name: feature.publication },
    description: `${feature.title}. ${feature.publication}, ${feature.dateLabel}.`,
    articleBody: feature.body,
  };
}
