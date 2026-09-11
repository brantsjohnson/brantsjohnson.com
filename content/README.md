# content

Static structured content that is not edited at runtime through the admin portal. Editable projects, media, and posts will live in Supabase instead.

- `site-content.ts` holds the words and facts the public pages show: the full-name wordmark, the navigation labels, the home hero copy, the proof stats, and the Experience, Service, Leadership, Skills, About, and Projects entries. Pages read from here so copy lives in one place and is never hardcoded inside a component. All copy follows the no-dashes rule in `docs/03` (date ranges read "Oct 2024 to Nov 2025").
