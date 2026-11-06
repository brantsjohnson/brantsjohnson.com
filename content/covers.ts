// ============================================
// WHAT THIS FILE DOES (plain English):
// The cover photo for each main section. The home page uses these
// for the index, and the share preview for each section page uses
// the same photo, so a shared link looks like the page it points to.
// To change a cover, change it here. The focus point keeps Brant
// centered when a photo is cropped. Words only, no UI.
// ============================================

import { aboutPhoto, ph, type Photo } from "@/content/photos";

export const sectionCovers: Record<"about" | "work" | "events" | "community" | "writing", Photo> = {
  about: aboutPhoto,
  work: ph(
    "general/begin-again-speaking.webp",
    "Brant speaking into a microphone on the Begin Again panel in Salt Lake City.",
    undefined,
    { focus: { x: 0.58, y: 0.32 } }
  ),
  events: ph(
    "general/tedxsaltlakecity.webp",
    "The TEDxSaltLakeCity stage with glowing red and white letters, a red circle and a blue skyline backdrop.",
    undefined,
    { focus: { x: 0.55, y: 0.6 } }
  ),
  community: ph("general/brant-alone-at-the-archway.webp", "Brant standing alone on a long road beneath the Uintah arch.", undefined, {
    focus: { x: 0.5, y: 0.62 },
  }),
  writing: ph(
    "general/brant-one-new-person-a-day-series7-overview.webp",
    "Handwritten notes on gray paper, each with a small instant photo clipped to it.",
    undefined,
    { focus: { x: 0.5, y: 0.45 } }
  ),
};
