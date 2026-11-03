// ============================================
// WHAT THIS FILE DOES (plain English):
// This paints the default share image used by any page that does not
// pick its own: a warm white card with a short gold rule, the name,
// and the one public sentence. Pages with a cover photo or a title
// card use /og/photo and /og/card instead (see lib/site/page-metadata.ts).
// ============================================

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Brant S. Johnson. Good ideas deserve to happen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(join(process.cwd(), "app/fonts/CormorantGaramond-Medium.ttf"));

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
          <div style={{ display: "flex", marginTop: 28, fontSize: 24, letterSpacing: 5, color: "#8a6428" }}>BRANT S. JOHNSON</div>
        </div>
        <div style={{ display: "flex", fontSize: 112, lineHeight: 0.98, letterSpacing: -2, maxWidth: 980 }}>
          Good ideas deserve to happen.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#554e42" }}>brantsjohnson.com</div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant Garamond", data: font, weight: 500, style: "normal" }],
    }
  );
}
