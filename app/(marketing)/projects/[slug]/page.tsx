// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one project's detail page. The word in the URL (slug) will
// later match a project saved in the database. Right now it only
// proves the URL shape works.
// ============================================

// THIS SECTION DOES: show which project slug was requested until real project data is wired
export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section>
      <h1>Project</h1>
      <p>Slug: {params.slug}</p>
    </section>
  );
}
