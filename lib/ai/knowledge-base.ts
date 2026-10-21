// ============================================
// WHAT THIS FILE DOES (plain English):
// This loads the PUBLIC facts the Ask about me assistant may say.
// Those facts live in content/about-brant.md, which was checked against
// the career record. The older data/brant-knowledge.json file is not used
// for public answers, because it still contains corrected and unverified
// claims. Do not point the public prompt back at that JSON.
//
// This file imports "server-only" so it can never end up in the browser
// bundle: the private knowledge base stays on the server, always.
// No AI model is called from this file.
// ============================================

import "server-only";
import { readFileSync } from "fs";
import { join } from "path";
import brantKnowledge from "@/data/brant-knowledge.json";

// THIS SECTION DOES: describe the shape of the facts file so the rest of the
// code gets type help. Optional sections may or may not be present.
export interface BrantKnowledge {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    portfolio: string;
  };
  professionalBackground: string[];
  skills: {
    technical: string[];
    productManagement: string[];
    businessStrategy: string[];
    marketing: string[];
    leadership: string[];
    analytics: string[];
    design: string[];
    systems: string[];
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    location: string;
    degree: string;
    graduationDate: string;
    description: string;
    gpa?: string;
    scholarships?: string;
  }>;
  achievements: string[];
  careerStories: string[];
  leadership: string[];
  interests: string[];
  certifications: string[];
  favorites?: {
    foods?: string[];
    holiday?: { name?: string; why?: string };
    movies?: string[];
    moviesReason?: string;
    artist?:
      | {
          names?: string[];
          notes?: string;
          favoriteSongs?: Array<{ title: string; artist: string }>;
        }
      | string;
  };
  funFacts?: {
    nicknames?: string[];
  };
  areasOfImprovement?: {
    delegation?: string;
    scopeManagement?: string;
  };
  weaknesses?: {
    [key: string]: string;
  };
  growthAreas?: {
    [key: string]: string;
  };
  lastUpdated: string;
}

// THIS SECTION DOES: hand back the raw facts object loaded from the data file
export function getBrantKnowledge(): BrantKnowledge {
  return brantKnowledge as BrantKnowledge;
}

// THIS SECTION DOES: read the checked public notes. This is the only
// source the public chatbot may use.
export function generateKnowledgeBaseText(): string {
  const notesPath = join(process.cwd(), "content", "about-brant.md");
  return readFileSync(notesPath, "utf8");
}
