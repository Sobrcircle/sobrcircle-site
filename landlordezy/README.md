# /landlordezy — LandlordEzy website concept

A ground-up redesign of [landlordezy.ca](https://landlordezy.ca), built as a concept and
hosted inside sobrcircle.com the same way `/lisadale` and `/twentyfour` are: one repo, one
domain, one Cloudflare Pages deploy.

- **Preview:** https://sobrcircle.com/landlordezy/ (kept out of search on purpose)
- **Production build:** the same pages, indexable, for the landlordezy.ca root

## How it works

Every page is React, rendered to static HTML at build time. No React ships to the browser:
each page is real HTML (instant first paint, fully crawlable), styled by one ~15 KB (gzip)
Tailwind stylesheet, and enhanced by a ~6 KB script for the menu, chapters, scroll reveals,
sliders and calculators (the calculators and search load only where they're used). With
JavaScript off, every page still reads and every link still works.

The product shots are drawn in HTML/CSS (`src/components/mocks/`), sized in `em` and scaled by
container query units, so they stay sharp at any width and weigh almost nothing.

After rendering, `scripts/typeset.ts` stops lines breaking in places that read as typos. It keeps
hyphenated words ("e-Transfer"), dates ("September 21, 2026"), a number and its unit
("15 minutes") and prices ("$9.99 + $1 a door") together, without changing any text.

## Getting around

The site is built so a visitor never hunts. Most pages answer one question first: what job
are you here to do?

- **Chapter bar** (`ChapterNav`): a slim bar under the nav on long pages. It fills as you
  scroll, names the chapter you're in and, on laptops, lists them all. Tapping it on a phone
  opens the menu at that page's chapters.
- **Menu sheet** (`MenuSheet` in `Chrome.tsx`): replaces the hamburger. A bottom sheet with
  search, the six jobs, this page's chapters and the main pages. Back closes it, and so do
  swiping it down, Escape and tapping outside it. Without JavaScript it still opens (`#menu`).
- **Search** runs in the browser on `search-index.json`, which the build writes from
  `src/content/search.ts`. A page can't be added without search words; the build stops.
- **Job chips** (`src/content/jobs.tsx`): "Collect rent", "Serve an N4"… on the home, product
  and 404 pages and in the menu. The last job picked is offered back as "Continue" for 14 days.
- **Alert bar** (`src/content/alert.ts`): one line for a rule change. Set it to `null` to hide it.
- **The next step follows the page.** The closing band (`CTABand`) takes a `primary` button, so
  legal help leads with a free call, paralegals with CaseBuilder and the demo page with the
  demo. The phone's sticky bar picks its two buttons by page (`barFor` in `Chrome.tsx`).
- **Deep link:** `pricing/?for=pm` opens the property-manager plans.

## What the browser remembers

Only on the visitor's own device, in `localStorage`; nothing is sent anywhere:

| Key | What |
| --- | --- |
| `le-doors` | The door count on the pricing slider |
| `le-job` | The last job chip picked, for 14 days |
| `le-tool-n4`, `le-tool-rent`, `le-tool-lmr` | The last inputs in each calculator |

On a calculator's own page the inputs are also written to the URL, so "Copy a link to this
result" reopens the same calculation. The link carries only numbers and dates.

The calculators' "Save the dates" and "Fill my N4" buttons send those same values to sign-up,
for example `/login?from=n4&served=2026-10-20&method=hand`. **For the app team:** read `from`
and the values after sign-up and open the N4, N1 or reminder already filled in.

## Measuring clicks

Buttons and links that matter carry a `data-track` name, for example `start-free:hero`,
`start-free:plan:self`, `job:n4`, `tool:n4:save`, `menu:open` and `chapters:jump`. No analytics
script loads yet. Whichever tool LandlordEzy picks can listen for clicks on `[data-track]`.

## Where things are

| Path | What |
| --- | --- |
| `src/content/features.tsx` | Copy for the nine product pages |
| `src/content/pricing.ts` | **Every price**, in one place |
| `src/content/faqs.ts` | FAQ copy (also feeds the FAQPage structured data) |
| `src/content/guides.tsx` | The four Ontario guides; each rule is linked to its official source |
| `src/content/redirects.ts` | Old landlordezy.ca URLs → new pages (production only) |
| `src/content/nav.ts` | Menus and footer |
| `src/content/jobs.tsx` | The six jobs, and which pages belong to each |
| `src/content/search.ts` | Search words for every page |
| `src/content/alert.ts` | The one-line rule-change alert |
| `src/content/voices.ts` | Landlord quotes: **empty until real ones arrive, with permission** |
| `src/pages/` | Page layouts |
| `src/components/ChapterNav.tsx` | The chapter bar and scroll progress |
| `src/components/ToolForms.tsx` | The three calculators, shared by the tool pages and guides |
| `src/components/mocks/` | Illustrative product screens |
| `src/client/` | The small browser script; calculators in `src/client/tools/`, search in `search.ts` |
| `src/site.ts` | Mode, base path, phone, and every link into the live app |
| `scripts/build.tsx` | Prerender + Vite build |
| `scripts/og.ts` | Generates the share images and favicons |
| `../public/landlordezy/` | **Built output** for the preview (committed, served by Pages) |

## Commands

Run from this folder. Dependencies come from the parent repo's `node_modules`.

```bash
npm run build              # preview → ../public/landlordezy (commit the result)
npm run build:production   # landlordezy.ca → ./dist-production (not committed)
npm run typecheck
npx tsx scripts/test-tools.ts   # calculators vs. the LTB's worked examples
npx tsx scripts/og.ts           # regenerate share images after title changes
```

The parent site's build (`npm run build` at the repo root) copies `public/landlordezy` into
`dist/` untouched, so the preview deploys with every push to `main`.

## Keeping the preview out of search

The preview shows another company's brand on sobrcircle.com, so it must never be indexed:

- every page carries `<meta name="robots" content="noindex, nofollow, noarchive, noimageindex">`
- `public/_headers` sends the same `X-Robots-Tag` for `/landlordezy/*`
- it isn't in sobrcircle.com's sitemap
- a "Concept preview" bar links to the live site, and the contact form sends nothing

The production build drops all of that, adds canonicals to landlordezy.ca, and writes
`sitemap.xml`, `robots.txt`, `_redirects` (53 permanent redirects) and `_headers`.

## Before this goes live on landlordezy.ca

1. Have a licensed paralegal review the guides and calculators, and name them as reviewer.
2. Confirm every price in `src/content/pricing.ts` (the current site has conflicting lists).
3. Replace the redrawn logo mark with the official vector, and add a real founder photo.
4. Decide how the marketing pages and the Laravel app share the domain (see the report).
5. Collect three short quotes from real landlords, with written permission to use their name,
   and add them to `src/content/voices.ts`. The section stays hidden until then. Never write one.
6. Connect the `data-track` names to an analytics tool, and update the privacy policy and the
   site's Content Security Policy to match.
7. Swap the "Live on EzyRent" link for a real count or feed of current listings, if EzyRent can
   provide one.
8. Give sign-up its own address. Every "Start free" goes to `/login`, as on the current site; a
   page that opens on "Create account" loses fewer people. Then read the calculators' `from=`
   values (see above).
9. Confirm the claims the concept couldn't verify on landlordezy.ca:
   - the guarantee that a paralegal error means a full refund and the next eviction free (Legal help FAQ)
   - the CaseBuilder plan names (the $249 plan is also called "CaseBuilder")
   - which Ezy AI features each property-manager plan includes
   - whether a faxed N4 counts as given that day; the N4 guide lists fax, but the calculator has no fax option
