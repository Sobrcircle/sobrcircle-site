# /landlordezy — LandlordEzy website concept

A ground-up redesign of [landlordezy.ca](https://landlordezy.ca), built as a concept and
hosted inside sobrcircle.com the same way `/lisadale` and `/twentyfour` are: one repo, one
domain, one Cloudflare Pages deploy.

- **Preview:** https://sobrcircle.com/landlordezy/ (kept out of search on purpose)
- **Production build:** the same pages, indexable, for the landlordezy.ca root

## How it works

Every page is React, rendered to static HTML at build time. No React ships to the browser:
each page is real HTML (instant first paint, fully crawlable), styled by one ~12 KB (gzip)
Tailwind stylesheet, and enhanced by a ~3 KB script for menus, scroll reveals, sliders and the
calculators. With JavaScript off, every page still reads and every link still works.

The product shots are drawn in HTML/CSS (`src/components/mocks/`), sized in `em` and scaled by
container query units, so they stay sharp at any width and weigh almost nothing.

## Where things are

| Path | What |
| --- | --- |
| `src/content/features.tsx` | Copy for the nine product pages |
| `src/content/pricing.ts` | **Every price**, in one place |
| `src/content/faqs.ts` | FAQ copy (also feeds the FAQPage structured data) |
| `src/content/guides.tsx` | The four Ontario guides; each rule is linked to its official source |
| `src/content/redirects.ts` | Old landlordezy.ca URLs → new pages (production only) |
| `src/content/nav.ts` | Menus and footer |
| `src/pages/` | Page layouts |
| `src/components/mocks/` | Illustrative product screens |
| `src/client/` | The small browser script; calculators in `src/client/tools/` |
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
