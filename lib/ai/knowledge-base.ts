// ============================================
// WHAT THIS FILE DOES (plain English):
// This loads the PUBLIC facts the Ask about me assistant may say.
// Those facts live in content/about-brant.md, which was checked against
// the career record. Extra notes Brant writes live in content/about-me.md.
// The older data/brant-knowledge.json file is not used
// for public answers, because it still contains corrected and unverified
// claims. Do not point the public prompt back at that JSON.
//
// This file imports "server-only" so it can never end up in the browser
// bundle: the private knowledge base stays on the server, always.
// No AI model is called from this file.
// ============================================

import "server-only";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import brantKnowledge from "@/data/brant-knowledge.json";
import { articleDate, articles } from "@/content/writing/articles";
import { listedPosts } from "@/lib/posts/load";
import { postDate } from "@/lib/posts/model";

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

// THIS SECTION DOES: read a notes file and drop the editor comments visitors never hear
function readNotes(fileName: string): string {
  const notesPath = join(process.cwd(), "content", fileName);
  if (!existsSync(notesPath)) return "";
  return readFileSync(notesPath, "utf8").replace(/<!--[\s\S]*?-->/g, "").trim();
}

// THIS SECTION DOES: true when a file has sentences, not only a heading
function hasFacts(notes: string): boolean {
  return notes.split("\n").some((line) => {
    const trimmed = line.trim();
    return trimmed.length > 0 && !trimmed.startsWith("#");
  });
}

// THIS SECTION DOES: read the checked public notes, then anything Brant added
// in content/about-me.md. Those two files are what the public chatbot may use.
export function generateKnowledgeBaseText(): string {
  const notes = readNotes("about-brant.md");
  const added = readNotes("about-me.md");
  // Articles come from content/writing/articles.ts, so a new article is known
  // to the assistant as soon as it is added there. No change to the notes is needed.
  // Only posts already listed on the site are included. Unlisted posts stay out of the chat until their release day.
  const list = [
    ...listedPosts().map((post) => `- "${post.title}" (${postDate(post.releaseDate)}): /writing/${post.slug} ${post.summary}`),
    ...articles.map((article) => `- "${article.title}" (${articleDate(article.date)}): ${article.url}${article.summary ? ` ${article.summary}` : ""}`),
  ].join("\n");
  const parts = [notes];
  if (hasFacts(added)) parts.push(added);
  if (list) parts.push(`## Published articles\n\n${list}`);
  return `${parts.join("\n\n")}\n`;
}
