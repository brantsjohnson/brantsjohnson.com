// ============================================
// WHAT THIS FILE DOES (plain English):
// This will read public GitHub repo facts (stars, language,
// last update) to help fill project cards. Needs a token when
// we turn it on.
// ============================================

// THIS SECTION DOES: describe the repo facts we care about for project cards
export type GithubRepoSummary = {
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
};

// THIS SECTION DOES: return nothing until the GitHub API call is implemented
export async function fetchPublicRepo(_fullName: string): Promise<GithubRepoSummary | null> {
  return null;
}
