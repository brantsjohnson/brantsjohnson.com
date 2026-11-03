// ============================================
// WHAT THIS FILE DOES (plain English):
// A small helper that collects every piece of text inside a nested
// content object, so a test can check all the words on the site.
// ============================================

export function strings(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") found.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, found));
  else if (value && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach((item) => strings(item, found));
  }
  return found;
}
