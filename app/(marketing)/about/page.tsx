// ============================================
// WHAT THIS FILE DOES (plain English):
// About now lives inside the home story. This page sends people
// to that section. A link stays here for anyone the redirect misses.
// ============================================

import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/#story");
}
