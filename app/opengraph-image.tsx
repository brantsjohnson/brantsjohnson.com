// ============================================
// WHAT THIS FILE DOES (plain English):
// This paints the image that shows when someone shares the site.
// Black band, gold name, one line. No empty default image.
// ============================================

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#E9BF85",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px",
          fontSize: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4 }}>BRANT S. JOHNSON</div>
        <div style={{ marginTop: 24, fontSize: 64, lineHeight: 1.05 }}>
          Technology as a bridge to real human connection.
        </div>
      </div>
    ),
    size
  );
}
