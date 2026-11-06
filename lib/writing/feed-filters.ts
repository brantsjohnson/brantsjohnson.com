// ============================================
// WHAT THIS FILE DOES (plain English):
// This decides which feed URLs belong on the Articles page.
// Substack creates a starter post at /p/coming-soon on a new
// publication. That post is not one of Brant's articles, so
// it stays off the list.
// ============================================

function pathOf(url: string): string {
  try {
    return new URL(url).pathname.replace(/\/$/, "").toLowerCase();
  } catch {
    return url.replace(/\/$/, "").toLowerCase();
  }
}

// THIS SECTION DOES: true when the URL is Substack's default starter post
export function isDefaultSubstackPost(url: string): boolean {
  return pathOf(url).endsWith("/p/coming-soon");
}

// THIS SECTION DOES: true for the starter post from the live RSS item, using the
// path or the title Substack uses before a real first post ships
export function isSubstackStarterFeedItem(url: string, title: string): boolean {
  return isDefaultSubstackPost(url) || title.trim().toLowerCase() === "coming soon";
}
