// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the long About story. There is a short introduction,
// then 27 sections from childhood through the work Brant is doing
// now. The words come from his About page handoff and stay as he
// wrote them. The page shows each title, the time and place, and
// the opening paragraph. The rest of a section stays closed until
// a visitor chooses to keep reading.
// ============================================

import life from "./about-life.json";

export type LifeSection = {
  id: string;
  title: string;
  subtitle: string;
  preview: string;
  expanded: string;
};

type AboutLifeFile = {
  pageTitle: string;
  intro: {
    title: string;
    text: string;
    motto: string;
  };
  sections: LifeSection[];
};

export const aboutLife = life as AboutLifeFile;
