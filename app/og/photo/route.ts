// ============================================
// WHAT THIS FILE DOES (plain English):
// This makes the share picture for a page that has a cover photo.
// It takes one of the site's own photos, crops it to the 1200 by 630
// share card shape with the subject kept centered (the focus point),
// and sends back a JPEG. Only files inside public/images, public/photos,
// public/creator and public/activist are allowed, so it cannot be used
// to read any other file.
// ============================================

import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";
import sharp from "sharp";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;
const ALLOWED_FOLDERS = ["/images/", "/photos/", "/creator/", "/activist/"];
const ALLOWED_TYPES = /\.(webp|jpe?g|png)$/i;

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

function fraction(raw: string | null): number {
  const value = Number.parseFloat(raw ?? "");
  return Number.isFinite(value) ? clamp(value, 0, 1) : 0.5;
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const src = params.get("src") ?? "";

  // --- SECURITY: only the site's own pictures, and nothing that climbs out of public/ ---
  if (!src.startsWith("/") || src.includes("..") || !ALLOWED_TYPES.test(src) || !ALLOWED_FOLDERS.some((folder) => src.startsWith(folder))) {
    return new Response("Not found", { status: 404 });
  }
  const root = join(process.cwd(), "public");
  const file = normalize(join(root, src));
  if (!file.startsWith(root)) return new Response("Not found", { status: 404 });

  let input: Buffer;
  try {
    input = await readFile(file);
  } catch {
    return new Response("Not found", { status: 404 });
  }

  let output: Buffer;
  if (params.get("fit") === "contain") {
    const bg = /^[0-9a-f]{6}$/i.test(params.get("bg") ?? "") ? `#${params.get("bg")}` : "#f6f1ec";
    output = await sharp(input).resize(WIDTH, HEIGHT, { fit: "contain", background: bg }).flatten({ background: bg }).jpeg({ quality: 84, progressive: true }).toBuffer();
  } else {
    // Scale until the photo covers the card, then cut the card window so the focus point is as central as the photo allows.
    const meta = await sharp(input).metadata();
    const width = meta.width ?? WIDTH;
    const height = meta.height ?? HEIGHT;
    const scale = Math.max(WIDTH / width, HEIGHT / height);
    const scaledWidth = Math.max(WIDTH, Math.round(width * scale));
    const scaledHeight = Math.max(HEIGHT, Math.round(height * scale));
    const left = clamp(Math.round(fraction(params.get("fx")) * scaledWidth - WIDTH / 2), 0, scaledWidth - WIDTH);
    const top = clamp(Math.round(fraction(params.get("fy")) * scaledHeight - HEIGHT / 2), 0, scaledHeight - HEIGHT);
    output = await sharp(input)
      .resize(scaledWidth, scaledHeight, { fit: "fill" })
      .extract({ left, top, width: WIDTH, height: HEIGHT })
      .jpeg({ quality: 84, progressive: true })
      .toBuffer();
  }

  return new Response(new Uint8Array(output), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
    },
  });
}
