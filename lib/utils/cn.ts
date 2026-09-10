// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a tiny helper that merges CSS class names cleanly.
// UI pieces (like shadcn) use it so conditional classes do not
// fight each other. No business logic lives here.
// ============================================

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// THIS SECTION DOES: combine class name pieces the way Tailwind expects
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
