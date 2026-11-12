# /olh — OLH Property Management website concept

Paul's proposed OLH site (his design preview at
[ontariolandlordhelp.ca/design-preview/home](https://ontariolandlordhelp.ca/design-preview/home)),
rebuilt on the design system of the LandlordEzy concept (`../landlordezy`): the same type scale,
pill buttons, chapter bar with the scroll-progress line, bottom-sheet Menu with search, sticky
phone buttons, and HTML-drawn product screens. Paul's words, plans and prices; our look and flow.

- **Preview:** https://sobrcircle.com/olh/ (kept out of search on purpose)

## How the pages flow (the Apple pattern)

Modelled on Apple's own plan pages (Apple One is six sections; iPhone's "Get to know" cards open
detail in a sheet). Three rules:

1. **Choose on the page.** The home page's plan chooser is one big segmented control: picking a
   plan swaps the panel below in place. Nothing above the fold sends a visitor to another page.
2. **Detail opens over the page.** "+" cards and "Full scope" open a sheet (a native `<dialog>`)
   and close back to the same spot. Without JavaScript they are ordinary links to the full page.
3. **Sideways for sets, down for the story.** Highlights, rentals, steps and the plan comparison
   scroll sideways (arrows on laptops, swipe on phones); the page itself stays short.

Motion is progressive: a highlight slides between tabs and follows the pointer in the header and
chapter bar, cards get a soft pointer light, the "One group" statement fills as it scrolls, prices
roll when the calculator changes, and pages cross-fade. All of it is skipped for visitors who ask
for reduced motion, and none of it is needed to read or use the site.

## Pages

| Path | What | Paul's preview sections it covers |
| --- | --- | --- |
| `/olh/` | Home: hero, plan chooser, highlights row, rentals, how it works, FAQ | Hero, three plans, N4, Legal Guarantee, rentals, how we work, FAQ |
| `/olh/pricing/` | Portfolio calculator, what's included, local visits, terms, FAQ | Pricing, Visits, Terms |
| `/olh/landlord-shield/` | Landlord Shield: N4/N1, the Automation Suite, rent handling, rent reporting, scope | Shield explained, Automation Suite, Rent reporting |
| `/olh/legal/` | Member legal access vs Legal Guarantee, member case rules, 12-month example, eviction help | Shield vs Guarantee, Legal |
| `/olh/rentals/` | Listings snapshot and leasing packages | Available properties, Listing services |

Everything else in Paul's menus links to the live ontariolandlordhelp.ca or landlordezy.ca page.

## Where things are

| Path | What |
| --- | --- |
| `src/content/pricing.ts` | **Every price** and the calculator tariff, in one place |
| `src/content/faqs.tsx` | FAQ copy (also feeds each page's FAQPage structured data) |
| `src/content/listings.ts` | The rentals snapshot (photos in `public/img/listings/`) |
| `src/content/nav.ts` | Menus and footer |
| `src/site.ts` | Phone, email, and every link into the live sites |
| `src/content/scope.tsx` | What each plan covers, step lists and the Automation Suite (shared by pages and sheets) |
| `src/components/olh.tsx` | Plan chooser, plan cards, calculator, rentals strip, legal rates |
| `src/components/interact.tsx` | Sheet, sideways scroller arrows, highlight cards, pill tabs |
| `src/components/sheets.tsx` | The ten detail sheets (seven highlights, three plan scopes) |
| `src/components/mocks/olh.tsx` | The N4 (Paul's sample figures), the lock-screen phone, the case track |
| `src/pages/` | Page layouts |
| `src/client/main.ts` | The small browser script (menu, chapters, tabs, sheets, scrollers, calculator) |
| `../public/olh/` | **Built output** (committed, served by Cloudflare Pages) |

## Commands

Run from this folder. Dependencies come from the parent repo's `node_modules`.

```bash
npm run build       # → ../public/olh (commit the result)
npm run typecheck
npm run og          # regenerate share images and icons after title changes
```

## Keeping the preview out of search

It shows another company's brand and proposed prices on sobrcircle.com, so it is never indexed:
every page carries a `noindex, nofollow, noarchive, noimageindex` robots tag, `public/_headers`
sends the same `X-Robots-Tag` for `/olh/*`, it isn't in the sitemap or `llms.txt`, and a
"Design preview" bar sits on every page.

## Open items for Paul

1. Every price is his proposal, copied as-is. Confirm before anything goes live.
2. The rentals strip is a November 11, 2026 snapshot; on the real site it should be fed live.
3. The logo is his raster artwork; a vector would be sharper.
4. No testimonials are shown, on purpose: add real, permissioned quotes when there are some.
