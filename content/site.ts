// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the one place for site-wide facts that show up in many spots:
// the name, the role, the tagline, the contact email, the navigation
// menu, and placeholders for the headshot and CV. Editing the site's
// identity or menu means editing this file only, not the layout code.
// ============================================

// THIS SECTION DOES: hold the core identity strings used in metadata and headers
export const site = {
  name: "Brant S. Johnson",
  initials: "BSJ",
  role: "Product-minded founder",
  // One honest line used for metadata and as the hero promise.
  tagline: "I build technology as a bridge to real human connection.",
  email: "me@brantsjohnson.com",
  url: "https://brantsjohnson.com",
};

// THIS SECTION DOES: hold links to the headshot and CV that do not exist yet.
// Both are null on purpose so the UI can show a tasteful placeholder until the files arrive.
// TODO(brant): add a headshot to /public (for example /headshot.jpg) and set `headshot` to that path.
// TODO(brant): add the CV PDF to /public (for example /brant-johnson-cv.pdf) and set `cvUrl` to that path.
export const assets: { headshot: string | null; cvUrl: string | null } = {
  headshot: null,
  cvUrl: null,
};

// THIS SECTION DOES: describe the shape of one navigation link
export type NavLink = {
  href: string; // the page URL this link points to
  label: string; // the words shown in the menu
};

// THIS SECTION DOES: drive the header menu and the footer.
// Contact points at its own page (/contact), never a mailto, so contact details live in one place.
export const nav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writings", label: "Writings" },
  { href: "/photography", label: "Photography" },
  { href: "/civic-engagement", label: "Civic Engagement" },
  { href: "/contact", label: "Contact" },
];
