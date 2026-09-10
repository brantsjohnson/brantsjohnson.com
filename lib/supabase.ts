// ============================================
// WHAT THIS FILE DOES (plain English):
// This file builds the database helpers (Supabase clients).
// The browser uses a public key. The server can use a stronger
// key for admin and chatbot work. Real login rules come later.
// ============================================

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// THIS SECTION DOES: stop the app with a clear error if a needed secret is missing
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// THIS SECTION DOES: make a browser-safe database client (anon key; RLS still applies)
export function createBrowserClient(): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  );
}

// --- SECURITY: service role key stays on the server only ---
// THIS SECTION DOES: make a powerful server-only database client for admin and chatbot
export function createServerClient(): SupabaseClient {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY")
  );
}
