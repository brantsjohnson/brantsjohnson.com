// ============================================
// WHAT THIS FILE DOES (plain English):
// /admin opens the analytics dashboard.
// ============================================

import { redirect } from "next/navigation";

export default function AdminHome() {
  redirect("/admin/analytics");
}
