// ============================================
// WHAT THIS FILE DOES (plain English):
// This makes the share picture for a page with no cover photo: a warm
// white card with a short gold rule, the page's small label, the title
// in the display serif, and the site name. It matches the look of the
// site. The title is cut to a safe length so no one can use this
// address to print a long message.
// ============================================

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const clip = (value: string | null, limit: number) => (value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const title = clip(params.get("title"), 90) || "Good ideas deserve to happen.";
  const kicker = clip(params.get("kicker"), 40);
  const font = await readFile(join(process.cwd(), "app/fonts/CormorantGaramond-Medium.ttf"));
  const size = title.length > 60 ? 64 : title.length > 36 ? 80 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fbf9f5",
          color: "#16130e",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "Cormorant Garamond",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 72, height: 4, background: "#c9a25a" }} />
          {kicker ? (
            <div style={{ display: "flex", marginTop: 28, fontSize: 24, letterSpacing: 5, color: "#8a6428", textTransform: "uppercase" }}>
              {kicker}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: size, lineHeight: 1.02, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#554e42" }}>
          <div style={{ display: "flex" }}>Brant S. Johnson</div>
          <div style={{ display: "flex", fontStyle: "italic" }}>Good ideas deserve to happen.</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Cormorant Garamond", data: font, style: "normal", weight: 500 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400" },
    }
  );
}
