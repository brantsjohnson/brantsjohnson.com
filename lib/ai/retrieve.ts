// ============================================
// WHAT THIS FILE DOES (plain English):
// This finds helpful notes for a chatbot question.
// It will search public site content and private knowledge on
// the server. It does not talk to the AI model by itself.
// ============================================

// --- PRIVACY: private knowledge is only read on the server ---
// THIS SECTION DOES: return no context yet until the database search is connected
export async function retrieveContext(_question: string): Promise<string[]> {
  return [];
}
