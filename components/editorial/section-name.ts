// ============================================
// WHAT THIS FILE DOES (plain English):
// The menu names and the page titles use the same words.
// Work is shown as Experience, Community as Leadership, and
// Writing as Articles. A date after the name is kept.
// ============================================

export function sectionName(value: string): string {
  const [first, ...rest] = value.split("·");
  const renamed = first
    .replace(/^Work$/, "Experience")
    .replace(/^Community$/, "Leadership")
    .replace(/^Writing$/, "Articles");
  return [renamed.trim(), ...rest].join("·");
}
