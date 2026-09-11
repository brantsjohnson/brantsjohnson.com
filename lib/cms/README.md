# lib/cms

Functions that fetch public content (projects, media, links, flags). Pages call these helpers instead of querying a database directly.

Right now `projects.ts` reads from `content/projects.ts`. Later these helpers can swap to the `site` schema in Supabase without changing the pages. No UI lives here.
