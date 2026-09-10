// ============================================
// WHAT THIS FILE DOES (plain English):
// This builds the written prompt the AI model will read.
// The chatbot's own standing instructions must come from the
// versioned database config later, not hardcoded here forever.
// ============================================

// THIS SECTION DOES: wrap the visitor question and any found notes into one plain prompt string
export function assemblePrompt(question: string, contextChunks: string[]): string {
  const contextBlock =
    contextChunks.length > 0
      ? contextChunks.join("\n\n")
      : "(no context retrieved yet)";

  return [`Question: ${question}`, `Context:`, contextBlock].join("\n");
}
