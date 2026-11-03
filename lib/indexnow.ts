// ============================================
// WHAT THIS FILE DOES (plain English):
// Tells search engines about new or changed pages the moment they
// exist, using the open IndexNow standard (Bing, Yandex, Naver, Seznam
// and others share it). Bing's index feeds ChatGPT search, Copilot and
// Perplexity, so this is the fastest way to get a new post found.
// It needs the INDEXNOW_KEY setting. Google does not use IndexNow;
// for Google, submit the sitemap once in Google Search Console.
// Server only.
// ============================================

import "server-only";
import { createHash } from "node:crypto";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// The key is INDEXNOW_KEY if set. Otherwise it is made (one-way) from the admin password setting,
// so nothing extra needs to be configured. It is not secret: IndexNow publishes it at /indexnow-key.txt.
export function indexNowKey(): string | null {
  const key = process.env.INDEXNOW_KEY?.trim();
  if (key && /^[A-Za-z0-9-]{8,128}$/.test(key)) return key;
  const seed = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD;
  return seed ? createHash("sha256").update(`indexnow|${seed}`).digest("hex").slice(0, 32) : null;
}

// THIS SECTION DOES: send up to 10,000 addresses from this site to IndexNow
export async function submitToIndexNow(origin: string, urls: string[]): Promise<{ ok: boolean; status: number; sent: number; reason?: string }> {
  const key = indexNowKey();
  if (!key) return { ok: false, status: 0, sent: 0, reason: "INDEXNOW_KEY is not set." };
  const host = new URL(origin).host;
  const list = Array.from(new Set(urls.filter((url) => url.startsWith(origin)))).slice(0, 10_000);
  if (list.length === 0) return { ok: false, status: 0, sent: 0, reason: "No addresses to send." };
  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `${origin}/indexnow-key.txt`, urlList: list }),
      signal: AbortSignal.timeout(10_000),
    });
    return { ok: response.status === 200 || response.status === 202, status: response.status, sent: list.length };
  } catch (error) {
    return { ok: false, status: 0, sent: 0, reason: error instanceof Error ? error.message : "The request failed." };
  }
}
