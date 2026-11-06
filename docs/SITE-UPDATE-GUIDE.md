# How we update the site

This is the guide for changing the public site. Read it before you add an article, edit a page, change the chat, or name something for analytics.

This folder is the only copy of the public site. Photos you can use are already in `public/images/brant-uploads/`. A page loads one through `ph()` in `content/photos.ts`. Do not add a second photo pile or a second copy of the site.

If another doc disagrees with this file about headers, spacing, motion, mobile, URL slugs, articles, the chat, or analytics names, follow this file. Empty drafts do not override it. Those drafts include `DESIGN-SYSTEM.md`, `ANALYTICS-TAXONOMY.md`, `AI-SYSTEM.md`, `06-ANALYTICS-INTEGRATIONS.md`, and `09-NAMING-TRACKING-TAXONOMY.md`.

Field lists for a new event, a poem, or a photo still live in `docs/PUBLISHING.md`. Voice and privacy still live in `CLAUDE.md`. This file does not replace those. It stops them from being restated in a second, conflicting way.

## Words on the menu, and the address under them

The menu is Home, About, Experience, Events, Leadership, Articles. Contact is a page, reached from the home page and the footer. Do not add a menu item.

The word a visitor reads and the folder in the URL are a fixed pair. Do not rename a URL so it matches the menu word.

| Visitor reads | Address |
|---|---|
| Home | `/` |
| About | `/about` and `/about/<slug>` |
| Experience | `/work` and `/work/<slug>` |
| Events | `/events` and `/events/<slug>` |
| Leadership | `/community` and `/community/<slug>` |
| Articles | `/articles` |
| One article written on this site | `/writing/<slug>` |
| One poem | `/writing/poetry/<slug>` |
| Contact | `/contact` |
| Ask about me | `/ask` |

`/writing` by itself redirects to `/articles`. Poem pages and on-site posts stay under `/writing`.

In stored page labels, the words Work, Community, and Writing are shown as Experience, Leadership, and Articles. That swap lives in `components/editorial/section-name.ts`. Write the stored label as the old word (`Work`) or the shown word (`Experience`). Do not write both, and do not add a second swap.

## The top of a page

Every inner page starts with `PageHeader` (Contact uses `PageHero`, which is the same header). Home does not. Home is the headline, the photo, and the index.

There is one `h1`. It uses `font-serif text-h1 text-ink`.

A small gold label can sit above that title. It uses the `.label` class and `text-accent-deep`. It shows only when it says something the title does not already say.

- About shows the small word ABOUT because the title is "Hi, I'm Brant."
- Contact shows CONTACT because the title is "Get in touch."
- Experience, Events, Leadership, and Articles do not show a small label, because the section name and the title are the same word. That is correct. Do not add a second Experience above Experience.

The menu and that small label may share a word. That is the section name, not a duplicate to delete. Do not remove ABOUT from About to make it match Experience.

A date, a breadcrumb, or a "at a glance" label uses `.label` in quiet gray (`text-text-secondary`), not gold.

## Header versus body

| Role | What to use |
|---|---|
| Page title | The `h1` inside `PageHeader`. Serif, `text-h1`, near-black. |
| Small section label | `.label`, gold, only when the title is a different phrase. |
| Sentence under the title | The `lead` on `PageHeader`. It stays in the reading column. |
| Body paragraphs | The `Prose` component. Sans, `text-body`, `text-text-secondary`, one idea per paragraph. |
| A heading inside the page | An `h2` with `font-serif text-h2 text-ink`. |
| A link inside a sentence | A real link in the sentence, through `Prose` or `go()`. |

Do not center a page title. Do not set a new type size on one page. Do not restyle one page's paragraphs with a different color, width, or gap.

Body copy on the site is first person. The Ask about me chat speaks about Brant in the third person. Both are correct. Do not make the pages third person, and do not make the chat first person.

## Spacing

Width and side padding come from the `.shell` class. It is the same centered column on every page, with the same gutter on a phone and on a desktop. Do not add `px-6`, `max-w-3xl`, or a new max width on a page.

The header's own padding is `pt-8 pb-4` on a phone and `md:pt-12 md:pb-6` on a wider screen. Do not wrap `PageHeader` in more padding.

A new band down the page uses `border-t border-border-subtle py-14 md:py-20`, and the words sit inside `.shell`. Story rows already have their padding inside `StoryRow` (`py-10 md:py-14`). Do not wrap a story row in a second padded section.

Paragraphs inside `Prose` are separated by `gap-5`. Leave that gap. Do not add a different margin under one paragraph.

On a large screen, words and a photo share a 12-column grid: `gap-10`, then `lg:gap-16`. They stack until the `lg` breakpoint. Do not pull a photo beside the text at a smaller size.

## Mobile

Under the `md` breakpoint the top links hide. One Menu button opens a full-screen list. Escape closes it. Do not add a second menu, a hamburger icon set, or a row of links that wrap under the name.

Links and buttons keep a tap height of at least 44px (`min-h-[44px]`).

Text is not hidden on a phone. Photos stack above or below the writing until `lg`. Article rows keep a small picture beside the title. The featured article stacks the picture, then the words, until `lg`.

A long article list uses the existing "See more articles" button. Do not add a new kind of dropdown.

Photo captions appear on hover and on keyboard focus. They are not printed again as a paragraph under the photo.

Check the page at a phone width and at a desktop width before you call it done. The phone width is under 768px. Side-by-side columns start at 1024px.

## Motion

Use the motion that already exists.

- Text that should ease in on scroll is wrapped in `Reveal`.
- A photo is a `Figure`. It wipes open once as it enters.
- The page fade is `.page-enter`.
- Hover is a gold underline, or the small arrow already on an article row.

Do not add a new fade, bounce, parallax, or duration on one page. If the whole site should move differently, change `Reveal`, `Figure`, or the motion tokens in `styles/tokens.css`.

When a device asks for less motion, animation is off. `Reveal` and `Figure` already do this. A new animation has to do it too. Confirm the page still reads with reduced motion on.

## URL slugs

A slug is lowercase letters and numbers, joined by single hyphens: `crew-brand`. Spaces, capitals, underscores, and a trailing hyphen are wrong.

The tests require `^[a-z0-9]+(-[a-z0-9]+)*$`. A detail page path is `/<section>/<slug>` and the slug field must match. Sections in those paths are `work`, `events`, `community`, and `about`, even when the menu says Experience or Leadership.

For a post written on this site, the file name is the slug. `content/posts/crew-onboarding.md` is `/writing/crew-onboarding`.

An article's `about` key uses that same section and slug, for example `work/crew`. `experience/crew` fails the test.

Do not change an existing URL. If one must move, add a 301 in `next.config.mjs` from the old address.

## Add an article

There are two kinds. Pick one.

### Already published on Substack or another newsletter

Add one object at the top of the list in `content/writing/articles.ts`. Newest first.

```ts
{
  id: "crew-onboarding-experiments",
  title: "Exactly as published",
  date: "2026-11-10",
  url: "https://brantsjohnson.substack.com/p/...",
  source: "articles",
  summary: "One plain sentence.",
  about: ["work/crew"]
}
```

`id` is a slug. `date` is `YYYY-MM-DD`. `url` starts with `https://`. `source` is an id from `content/writing/sources.ts`. `about` is optional and must be a real `section/slug`. A cover is optional and needs a real file plus an alt description.

This article shows on `/articles`. Each page named in `about` gets a Read more link. The chat learns the title, date, address, and summary on its own. Do not also paste the article into the chat notes.

### Written on this site

Add `content/posts/<slug>.md` using the template in `content/posts/README.md`.

The page works at `/writing/<slug>` before the release day, but it stays off `/articles`, off Read more, and out of the chat until `releaseDate`. A `draft: true` post is not available at all. Do not add a sample post. Do not put these files in `content/blog`. That folder is the other site.

After either kind, run `npm test` from `brantsjohnson-handoff`. It names a bad slug, a bad date, a missing page, or a missing photo.

## What the chat is allowed to know

Ask about me answers from three places, and only these:

1. `content/about-brant.md`, the checked record.
2. `content/about-me.md`, extra notes. Visitors never see this file as a page. If it disagrees with the checked record, the chat follows `about-me.md`.
3. Article titles that are already public: entries in `content/writing/articles.ts`, and on-site posts whose release day has arrived.

Do not point the chat at `data/brant-knowledge.json`. Do not put a home address, a phone number, health, family, relationship, money, or job-search details in either notes file. Anything in `about-me.md` can be said to anyone who asks.

When a fact on a page changes, change it in `content/about-brant.md` too, or in `about-me.md` if that is where the extra note lives. The chat does not read the page components.

The chat rules in `lib/ai/prompt.ts` stay as they are: one to three short sentences, third person, no guessed fact, no dash used as punctuation, no dollar amount, and no claim that is not in the notes. Do not add a second prompt somewhere else.

## Analytics names

A click name is plain words, so the analytics page can be read without a codebook. The attribute is:

`data-track="type:name:place"`

- `type` is one of `link`, `button`, `nav_item`, or `form_field`. Do not invent a type.
- `name` is lowercase words joined by underscores. It says what the click does: `open_article`, `visit_bridger`, `send_question`. The same action uses the same name on every page.
- `place` is where it sits: `work_crew`, `articles`, `contact`, or `global` for the header. The footer uses `footer`.

Examples already on the site: `link:home_wordmark:global`, `nav_item:experience:global`, `button:toggle_menu:global`, `link:featured_article:articles`, `button:see_more_articles:articles`, `link:visit_bridger:work_bridger`.

Pass the name through `Button`, `TextLink`, or `go()`. Do not leave a new link or button unnamed. Do not record the words a person typed, their email, or an IP address. Page views and scroll depth are already collected. Do not add a second tracker.

## Voice, in one place

Pages: first person, short, warm, specific. Chat: third person, short, only from the notes.

Do not use an em dash or an en dash. Do not use a hyphen to join two clauses. A hyphen inside a real compound word is fine. Do not use the word "actually". Do not state a dollar amount unless Brant has approved that figure. Do not invent a date, a title, a number, or a quote. If the fact is not in the content file or the chat notes, leave it out and ask.

`npm test` checks the public copy for those slips.

## Before you finish

From `brantsjohnson-handoff`:

```
npm test
```

Then look at the changed page on a phone width and a desktop width. Open the menu. Confirm the small label follows the rule above. Confirm a new link has a `data-track` name you could read out loud.
