// ============================================
// WHAT THIS FILE DOES (plain English):
// About now lives on the story page. This route sends people there.
// ============================================

import { redirect } from "next/navigation";

export default function AboutPage() {
  redirect("/story");
}
