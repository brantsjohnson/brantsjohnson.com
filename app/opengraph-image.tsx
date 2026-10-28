// ============================================
// WHAT THIS FILE DOES (plain English):
// This paints the image that shows when someone shares the site.
// Paper card, black serif, the one public sentence.
// ============================================

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Brant S. Johnson. Good things deserve to happen.";
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
          background: "#f4f2ec",
          color: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 22,
            letterSpacing: 3,
            fontFamily: "Cormorant Garamond",
          }}
        >
          <div style={{ display: "flex" }}>SENIOR PRODUCT MANAGER</div>
          <div style={{ display: "flex", color: "#3f3d39" }}>BRANT S. JOHNSON</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 0.95,
            letterSpacing: -1.5,
            fontFamily: "Cormorant Garamond",
            maxWidth: 980,
          }}
        >
          Good things deserve to happen.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cormorant Garamond", data: font, weight: 500, style: "normal" }],
    }
  );
}
