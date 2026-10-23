// ============================================
// WHAT THIS FILE DOES (plain English):
// Pure Substack URL helpers (no server-only) so tests can import them.
// ============================================

export const SUBSTACK_PUBLICATION_URL = "https://brantsjohnson.substack.com";

export function substackBaseFromEnv(envValue: string | undefined): string {
  const raw = envValue?.trim();
  const candidate =
    raw && /^https?:\/\//i.test(raw) ? raw : SUBSTACK_PUBLICATION_URL;
  return candidate.replace(/\/+$/, "").replace(/\/(feed|subscribe)$/i, "");
}

export function substackSubscribeUrlFromBase(base: string): string {
  return `${base}/subscribe`;
}
