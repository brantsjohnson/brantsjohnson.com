// ============================================
// WHAT THIS FILE DOES (plain English):
// This fetches project info for public pages from the database
// (CMS helpers). Pages should call these functions instead of
// talking to the database directly.
// ============================================

// THIS SECTION DOES: describe the shape of a project summary we will show on the site
export type ProjectSummary = {
  slug: string;
  title: string;
  status: "in_progress" | "shipped" | "archived";
};

// THIS SECTION DOES: return an empty project list until Supabase is connected
export async function getProjects(): Promise<ProjectSummary[]> {
  return [];
}

// THIS SECTION DOES: look up one project by its URL name; returns nothing until the database is live
export async function getProjectBySlug(_slug: string): Promise<ProjectSummary | null> {
  return null;
}
