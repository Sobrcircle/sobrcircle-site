# OLH site: house style

One guide for every page, so the site reads and moves as one thing. Two halves: how we write, and
how pages are built.

## 1. The site in one paragraph

OLH Property Management helps Ontario landlords in three ways, sold as a ladder: **OLH Landlord
Shield** (you manage, with our software, a monthly ledger check and a paralegal to talk to),
**Property Management** (we run the tenancy), and **Property Management + Legal Guarantee** (we
run it, and our paralegals' fees on eligible new Landlord and Tenant Board matters are included).
The thing no page should lose sight of: licensed paralegals are part of the same team, on every
plan. Prices live in `src/content/pricing.ts` and nowhere else.

## 2. Voice

Write the way a good property manager talks to an owner across a desk: plain, specific, calm.

- **Lead with what the owner gets**, then how it works. "Rent in your account, a statement every
  month" before "our platform reconciles".
- **Numbers over adjectives.** "$75 a visit, up to 45 minutes, dated photos" beats "affordable,
  thorough inspections".
- **Short sentences. One idea each.** Headlines are a sentence or two fragments, not a slogan pile.
- **Second person, active voice.** "You approve. We run it."
- **Say who a thing is for and who it isn't for.** It reads as honest and saves everyone a call.
- **Canadian spelling** (centre, cheque, organise is fine either way: match the page).
- **Sentence case** for headings and buttons. No exclamation marks. No emoji.
- **One term per thing**, everywhere: "tenancy" (what we price), "unit" (the physical place),
  "Landlord and Tenant Board" first, then "LTB" or "the Board"; "paralegal" (never "lawyer");
  "member case" (the $995 rate); "Legal Guarantee" (the plan feature).
- **Buttons say what happens:** "Book a 15-minute call", "Price my portfolio", "See the plans".
  The site's main action is always the 15-minute call.

### Angles that work (from the market research)

1. A flat monthly price, never a percentage of the rent.
2. Every price is on the page. No setup fee.
3. When a tenant stops paying, a licensed paralegal is already on the file.
4. The notice done right the first time, so weeks aren't lost to a restart.
5. One outside eviction file costs about $1,495; the Legal Guarantee is $50 a month more.
6. Built for owners of one to ten tenancies.
7. Management, paralegals, a brokerage and the software under one roof, so nothing is handed off.
8. A person checks your rent ledger every month (Shield).
9. You approve. We run it.

### Never write

- **A promised outcome or a Board timeline.** No "guaranteed eviction", "we always win", "tenant
  out in 60–90 days", "fast eviction". The Board sets the pace; say so.
- **"Zero legal fees", "unlimited", "every notice"** without the limits in the same breath. The
  honest version: professional fees on eligible *new* LTB matters are included; filing fees
  ($186 for an L1), sheriff, process servers and outside costs are extra.
- **"Insurance", "rent guaranteed", "lawyers".** Paralegals are not lawyers; the plans are not
  insurance.
- **"The only / first / largest / nowhere else in Ontario"**, or any superlative we can't prove.
- **Language that attacks tenants** ("bad tenants", "professional tenants", "get rid of").
- **Invented anything:** testimonials, statistics, case studies, team members, local offices.
  The only testimonials are the three on the live site. If a fact isn't in the inventory, leave
  it out.
- **"Most popular"** (we have no sales data). Use factual labels: "Most complete".
- **Old plan names and prices** ("Full-Service $139", "$199 Legal Guarantee package" as a
  package name, "$69/unit"). Use the three plans and the `$` helper.
- Filler: "seamless", "robust", "cutting-edge", "peace of mind", "one-stop shop", "white-glove",
  "world-class", "take the stress out of".

### Legal and tax content

- Say what the rule is, in one or two sentences, and link the official source or the live OLH
  guide. Every guide page carries "General information, not legal advice" and a last-reviewed date.
- Where the old site's pages disagree with each other, or look out of date, **do not pick a
  number from memory**: use the most recent old page (the Bill 60 page is the newest), say less,
  and add the item to your "to verify" list.
- Tax (non-resident withholding, NR4/NR6): keep the old site's own caution, "general information,
  not tax advice".

## 3. How a page is built

Pages are React components rendered to static HTML at build time (no React in the browser).
Read `src/pages/Legal.tsx` and `src/pages/Shield.tsx` before writing one: copy their patterns.

### Skeleton

```tsx
import { site, url, live } from '../site'
import { $ } from '../content/pricing'
import { CTABand, FAQList, Fine, Heading, PageHero, Section, CheckList, Steps, FeatureTile, type QA } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'

const chapters = [
  { id: 'overview', label: 'Overview' },   // 4 to 7 chapters; ids must match the sections
  { id: 'faq', label: 'Questions' },
]

export function MyPage() {
  return (
    <>
      <ChapterNav title="Short page name" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />
      <PageHero eyebrow="…" title="…" lead="…" secondary={{ label: 'See the plans', href: url('pricing/') }} />
      <Section id="…" tone="alt" labelledBy="x-title">
        <div className="wrap">
          <Heading id="x-title" eyebrow="…" title="…" lead="…" size="md" />
          …
        </div>
      </Section>
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">Questions.</h2>
          <FAQList className="mt-8 md:mt-10" items={faqs} />
        </div>
      </Section>
      <CTABand title="…" lead="…" />
    </>
  )
}
```

Rules that keep pages consistent:

- **One h1** (PageHero). Sections use `Heading size="md"` (h2). Cards use h3.
- **Alternate `tone="alt"` and white** sections; at most one dark (`bg-brand-ink`) section a page.
- **A page is 5 to 8 sections.** If a list has more than six items, put it in tabs
  (`TabRow`/`TabPanel` inside a `data-tabs-root` div) or a `<details className="fold">`.
- **Lists of steps or cards that would stack tall on a phone get `m-snap`** (they become a
  swipeable row under 834px): `<ol className="m-snap grid gap-4 md:grid-cols-2 lg:grid-cols-4">`.
- **Cards:** `tile` (mist), `tile-white` (white with shadow, for alt sections), `tile-dark`.
  Add `spot` for the pointer light and `data-reveal` to fade in on scroll. Radius is always
  `rounded-4xl` (cards) or `rounded-5xl` (big panels). Padding `p-6 sm:p-7` or `p-7 sm:p-9`.
- **Type:** `text-display-lg` (h1), `text-display-md` (h2), `text-headline`, `text-title` (card
  h3), `text-lead` (intro sentence), body is the default; small print via `<Fine>`.
  Colours: `text-ink` (headings), `text-ink-2` (body on cards), `text-ink-3` (secondary),
  `text-ink-4` (fine print), `text-brand-text` (links), `eyebrow` class for the blue kicker.
- **Icons:** `lucide-react`, in an `icon-badge` span: `<span className="icon-badge"><Icon
  className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden /></span>`.
- **Links:** pages on this site use `url('pricing/')`; pages still on the old site use
  `live('/ltb-forms')`; the booking link is `site.live.book`; phone is `site.phone`.
  `className="link-more"` gives the chevron link. Body links need no class (they underline).
- **Prices:** import `$` from `content/pricing` (`$.shield`, `$.management`, `$.guarantee`,
  `$.legalStep`, `$.memberCase`, `$.standardCase`, `$.visit`, `$.basicListing`, `$.ltbFiling`…).
  Never type a plan price as a literal.
- **Site map** (for cross-links): `''` home · `pricing/` · `property-management/` ·
  `landlord-shield/` · `legal/` · `rentals/` (leasing and listings) · `owners/` (condo, student,
  first-time, non-resident) · `buildings/` · `projects/` · `about/` · `resources/` ·
  `guides/evictions/` · `guides/ltb-forms/` · `guides/rent-increases/` · `guides/bill-60/` ·
  `contact/` · `sireg/`.
- TypeScript is strict (`noUnusedLocals`). Run `npx tsc -p tsconfig.json` from `olh/`.
- Apostrophes and quotes in copy are typographic (’ “ ”). No em dashes in copy; use a period,
  a comma or a colon.
