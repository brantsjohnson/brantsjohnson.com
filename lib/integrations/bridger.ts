// ============================================
// WHAT THIS FILE DOES (plain English):
// This talks to Bridger (a separate app) to read the tastes Brant
// has chosen to share publicly: hobbies, movies, books, and what he
// is currently reading. It only runs on the server, and it is built
// so it can NEVER crash the page. If Bridger is turned off, not set
// up, or Brant has opted out, this quietly returns nothing and the
// Now section shows its placeholder instead.
//
// This file is logic only. It does not draw any UI.
// ============================================

// THIS SECTION DOES: describe the exact shape of the data Bridger sends back
export type BridgerCurrentlyReading = {
  title: string;
  author?: string;
};

export type BridgerInterests = {
  hobbies: string[];
  movies: string[];
  books: string[];
  currentlyReading?: BridgerCurrentlyReading;
  updatedAt: string;
};

// THIS SECTION DOES: decide how often the server re-checks Bridger.
// Short window so shared tastes stay fresh without hitting Bridger on every page view.
const REVALIDATE_SECONDS = 300; // re-check Bridger at most once every 5 minutes

// THIS SECTION DOES: make sure whatever Bridger returns is really the shape we expect.
// If a field is missing or the wrong type, we drop it rather than trusting bad data.
function normalizeInterests(raw: unknown): BridgerInterests | null {
  if (typeof raw !== "object" || raw === null) return null;
  const value = raw as Record<string, unknown>;

  // Keep only the entries that are non-empty strings, so no blanks leak onto the page.
  const toStringList = (input: unknown): string[] =>
    Array.isArray(input)
      ? input.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : [];

  const hobbies = toStringList(value.hobbies);
  const movies = toStringList(value.movies);
  const books = toStringList(value.books);

  // Currently reading is optional. Only include it when there is a real title.
  let currentlyReading: BridgerCurrentlyReading | undefined;
  if (typeof value.currentlyReading === "object" && value.currentlyReading !== null) {
    const reading = value.currentlyReading as Record<string, unknown>;
    if (typeof reading.title === "string" && reading.title.trim().length > 0) {
      currentlyReading = {
        title: reading.title,
        author: typeof reading.author === "string" && reading.author.trim().length > 0 ? reading.author : undefined,
      };
    }
  }

  const updatedAt = typeof value.updatedAt === "string" ? value.updatedAt : "";

  return { hobbies, movies, books, currentlyReading, updatedAt };
}

// THIS SECTION DOES: fetch the shared tastes from Bridger on the server.
// It returns the data only when Bridger is configured and responds normally.
// In every other case (not configured, opted out, network error) it returns
// nothing, and the caller shows the static placeholder.
export async function getBridgerInterests(): Promise<BridgerInterests | null> {
  const base = process.env.BRIDGER_API_BASE;
  const slug = process.env.BRIDGER_SHARE_SLUG;

  // No base URL or slug means the feature is not turned on. Show the placeholder.
  if (!base || !slug) return null;

  // --- SECURITY: this token is a server-only secret. It must never be a
  // NEXT_PUBLIC_ variable and must never reach the browser bundle. ---
  const token = process.env.BRIDGER_SHARE_TOKEN;

  try {
    // Build the public share URL and keep it tidy if the base has a trailing slash.
    const cleanBase = base.replace(/\/+$/, "");
    const url = `${cleanBase}/public/share/interests/${encodeURIComponent(slug)}`;

    const headers: Record<string, string> = { Accept: "application/json" };
    // Only send the token when one is set (token mode is optional).
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS }, // cache briefly, then refresh
    });

    // 404 means Brant opted out; any other non-OK status is treated the same way: show placeholder.
    if (!response.ok) return null;

    const data = (await response.json()) as unknown;
    return normalizeInterests(data);
  } catch {
    // Network hiccup or bad JSON should never take the page down.
    return null;
  }
}
