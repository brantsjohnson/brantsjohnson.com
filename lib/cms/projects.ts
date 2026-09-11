// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the public-page doorway to project data. Pages should call
// these functions instead of talking to a database themselves. Right
// now they read from content/projects.ts. Later they can swap to
// Supabase without changing the pages.
// ============================================

import {
  getProjectBySlug as getStaticProject,
  projects as projectList,
  type Project,
} from "@/content/projects";

export type { Project };

// THIS SECTION DOES: return every project, newest intent first
export async function getProjects(): Promise<Project[]> {
  return projectList;
}

// THIS SECTION DOES: look up one project by its URL name
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return getStaticProject(slug) ?? null;
}
