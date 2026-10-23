// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws a QR code for the /hi page so Brant can put it on a
// card or a phone lock screen. The code points at the public URL.
// It returns SVG markup the page can drop in. It does not track scans.
// ============================================

import QRCode from "qrcode";

export async function hiQrSvg(url: string): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    margin: 1,
    color: { dark: "#000000", light: "#F4F2EC" },
    errorCorrectionLevel: "M",
  });
}
