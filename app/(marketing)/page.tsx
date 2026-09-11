// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. It still shows the temporary title while the
// real hero and design land later, and it now also shows the "Now"
// section: a live look at the tastes Brant shares from Bridger.
//
// The page fetches those tastes on the server and hands them to the
// Now section. If Bridger is not set up or is private, the section
// shows a short placeholder, so the page always renders.
// ============================================

import { getBridgerInterests } from "@/lib/integrations/bridger";
import { Now } from "@/components/sections/Now";

// THIS SECTION DOES: show a temporary Brant S. Johnson title, then the Now section
export default async function HomePage() {
  // Read the shared tastes on the server. This returns nothing when Bridger
  // is off, not configured, or opted out, and the Now section handles that.
  const interests = await getBridgerInterests();

  return (
    <>
      <section>
        <h1>Brant S. Johnson</h1>
        <p>Site foundation is running. Content and UI come next.</p>
      </section>

      <Now interests={interests} />
    </>
  );
}
