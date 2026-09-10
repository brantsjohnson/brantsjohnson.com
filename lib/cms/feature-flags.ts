// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks on/off switches for site features.
// Every major section or tool should ask here before showing.
// ============================================

// THIS SECTION DOES: treat every feature as off until the feature_flags table is connected
export async function isFeatureEnabled(_flagKey: string): Promise<boolean> {
  return false;
}
