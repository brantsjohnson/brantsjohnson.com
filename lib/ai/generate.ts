// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the spot that will call the AI model provider.
// Only server routes should use it. Swap providers here later
// without changing the website UI.
// ============================================

// THIS SECTION DOES: refuse to answer until an API key and provider are configured
export async function generateAnswer(_prompt: string): Promise<string> {
  throw new Error("AI model not configured yet. Set AI_API_KEY and implement this provider.");
}
