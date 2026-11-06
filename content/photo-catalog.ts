// ============================================
// WHAT THIS FILE DOES (plain English):
// This decides which stored photographs belong to Brant, and the
// words a search tool should use to find them. The pictures stay
// off the page design. A search file lists them with his names,
// Vernal, Utah, his schools, and the jobs the photo is actually about.
// Screenshots, icons, and drawings are left out so they are not
// offered as portraits of him.
// ============================================

const NAMES = "Brant S. Johnson, also known as Brant Johnson and Brant Shanon Johnson";
const FROM = "from Vernal, Utah";

export type PhotoRecord = {
  src: string;
  title: string;
  caption: string;
  place: string;
};

// THIS SECTION DOES: a caption for one photo, or nothing if it should not be indexed as him
export function photoRecord(src: string): PhotoRecord | null {
  const file = src.split("/").pop()?.toLowerCase() ?? "";
  const folder = src.toLowerCase();
  if (!file || file.endsWith(".svg")) return null;
  if (file.includes("screenshot") || file.includes("icon") || file.includes("wordmark") || file.includes("scholarship-2023")) return null;
  if (file.includes("blueprint") && !file.includes("archway")) return null;
  if (folder.includes("/crew-illustrations") || folder.includes("/backlocal-icons") || file.startsWith("certificate")) return null;

  const place = /arch|vernal|uintah|highschool|high-school|chitty|music-man|magazine|basin/.test(folder + file)
    ? "Vernal, Utah"
    : "Utah";

  const scene = sceneFor(folder, file);
  if (!scene) return null;
  const showsHim = !/original-archway|blueprint|scholarship-tara|scholarship-night/.test(file);
  const lead = showsHim
    ? `Photograph of ${NAMES}, ${FROM}.`
    : `Picture from a Vernal, Utah project led by ${NAMES}, ${FROM}. He is not the person in this frame.`;

  return {
    src,
    title: showsHim ? `${NAMES}, ${place}` : `Uintah High School, Vernal, Utah`,
    caption: `${lead} ${scene} Schools: Uintah High School in Vernal, Utah; Brigham Young University; Utah Valley University. Work includes Bridger, Intro, Crew Finance, Utah Business, Deseret News, BackLocal, BYU Sandbox, Divvy (BILL), the office of Senator Mitt Romney, and the Utah Governor's Office.`,
    place,
  };
}

function sceneFor(folder: string, file: string): string | null {
  if (file.includes("brant-s-johnson") || file.includes("brant-headshot")) return "Official portrait in a black suit and tie.";
  if (file.includes("brant-about") || file.includes("rainbow")) return "Standing on a road in Utah under a double rainbow.";
  if (folder.includes("chitty")) return "In Chitty Chitty Bang Bang at Uintah High School in Vernal, Utah.";
  if (folder.includes("something-rotten")) return "In the musical Something Rotten!.";
  if (folder.includes("elf")) return "In Elf the Musical at Hale Centre Theatre in Utah.";
  if (folder.includes("tedx")) return "At TEDxSaltLakeCity in Utah, where he was an organization assistant.";
  if (file.includes("music-man")) return "As Harold Hill in The Music Man in Vernal, Utah.";
  if (file.includes("little-mermaid") || file.includes("mermaid")) return "As Prince Eric in The Little Mermaid at Uintah High School in Vernal, Utah.";
  if (file.includes("young-ambassador") || file.includes("ya-group")) return "With the BYU Young Ambassadors at Brigham Young University.";
  if (file.includes("sandbox")) return "At BYU Sandbox, where he was Head of Product at BackLocal.";
  if (file.includes("crew-team") || file.includes("brant-at-crew")) return "At Crew Finance, where he was Senior Product Manager.";
  if (file.includes("utah-business") || file.includes("planning-conference") || file.includes("20s-in-their-20s") || file.includes("20-in-their-20s") || file.includes("women-to-watch") || file.includes("founder-friday") || file.includes("green-business") || file.includes("chamber") || file.includes("executive-excellence")) {
    return "At a Utah Business or Deseret News event, where he was an account executive.";
  }
  if (file.includes("romney")) return "With U.S. Senator Mitt Romney, during his congressional internship.";
  if (file.includes("herbert") || file.includes("gov-gary")) return "With Utah Governor Gary Herbert, from his work in the Utah Governor's Office.";
  if (file.includes("original-archway")) return "The earlier Uintah archway in Vernal, Utah, later replaced by the Resilience Archway he led.";
  if (file.includes("blueprint")) return "Drawings for the Uintah Resilience Archway in Vernal, Utah.";
  if (file.includes("arch")) return "Brant S. Johnson with the Uintah Resilience Archway he led in Vernal, Utah.";
  if (file.includes("magazine") || file.includes("cover")) return "Holding the November 2020 Basin Living cover, Thinking Globally, Acting Locally.";
  if (file.includes("podcast")) return "On the Quick Before You Forget podcast.";
  if (file.includes("white-house") || file.includes("presidential") || file.includes("capitol") || file.includes("kamala") || file.includes("motorcade")) {
    return "During public-service travel connected to Washington, D.C., and Utah government work.";
  }
  if (file.includes("scholarship") || file.includes("resilience")) return "A Resilience Scholarship night at Uintah High School in Vernal, Utah, for the scholarship he founded.";
  if (file.includes("fbla")) return "On an FBLA scholars panel in Utah.";
  if (file.includes("pitching")) return "Presenting BackLocal, from his time as Head of Product in BYU Sandbox.";
  if (file.includes("hxp") || file.includes("wake") || file.includes("ugly-sweater") || file.includes("coding") || file.includes("speaking") || file.includes("talking") || file.includes("wreck") || file.includes("sql")) {
    return "A personal photograph from Utah.";
  }
  if (file.includes("brant")) return "A photograph of Brant S. Johnson in Utah.";
  return null;
}
