# To confirm before this goes live

Everything on the concept comes from the old site (ontariolandlordhelp.ca, read in full on
November 12, 2026) or from Paul's design preview. Where old pages disagreed or looked out of
date, the concept takes the cautious version. These are the items a person needs to confirm.

## Prices and plans (Paul and Ben)

- **The ladder:** Landlord Shield $59 (+$29), Property Management $149 (+$79), Management + Legal
  Guarantee $199 (+$99), first tenancy, plus HST. One price for any property type. All in
  `src/content/pricing.ts`. Existing customers keep their agreements.
- **House premium:** none on the concept. Add one (+$30 to +$50 on both managed tiers) or not.
- **"New matters only":** the Legal Guarantee covers new LTB matters. The agreement needs a tight
  definition so owners can't upgrade the day rent stops.
- **Visit prices:** $75, $55 on the Legal Guarantee, urgent from $149. These replace the old $99
  inspection.
- **Still current?** REALTOR.ca listing $29/mo (12-month term, management agreement extends to
  match), tenant placement $549 / $749 / one month's rent, Rent Guarantee (linked, not described).
- **Emergency line:** which plans get after-hours emergency handling, and is it 24/7?
- **Statements:** monthly owner statements plus a year-end summary (the old pricing page said annual).
- **Screening on management:** is the Equifax credit report included or passed through?
- **Project fees:** restoration Option B is 25% of approved contractor costs plus HST; planned
  renovation projects are written as "quoted per project".
- **NR4 / NR6:** on request on management plans; any fee?

## Company facts (Paul)

- Founding year shown as 2003 (the old about page said 2002).
- Proof numbers: 4.9 on Google, 121+ reviews, 31,000+ community members (some old pages say
  30,000+), 84,000+ LTB orders (one help page says 45,000+), 140+ videos. In `src/site.ts`.
- Are all property managers licensed paralegals, or does the team include them? The concept
  says the team includes licensed paralegals.
- Local claims kept on the Contact page (Windsor head office and the city list); no local staff
  or vendors are claimed in other cities.
- Realtor referral program: confirm the agreement and the RECO/TRESA wording.
- Buildings: "up to 200+ units", and that the due-diligence review stays free.

## Law (a licensed paralegal)

- **N6 notice period:** two old pages disagree (10 days vs 20/10). The guides give no number.
- **N13 compensation and right of return:** the old pages differ. The guides give no amount.
- **T5 deadline:** the old page says 12 months; the guides use the Bill 60 rule for N13 cases.
- **N12:** the old `n12-form` page predates Bill 60; the guides follow the Bill 60 page.
- **Email service:** written as "only with the tenant's written consent".
- **Reissued forms:** 11 forms reissued as version 2026/09; confirm the November 30, 2026 cut-off
  wording, and whether `/downloads` serves the new versions.
- **Fees:** $186 L1 filing fee (online?); the L5 fee is not stated.
- **Rent increase:** the guides lead with 1.9% for 2027 (N1s served now take effect in 2027).
- **Timelines:** the concept makes no promise about how long an eviction takes.
- **Tax:** non-resident withholding (25% of gross, NR6 on net, NR4 slips) is kept with the old
  site's "general information, not tax advice" line.

## Old URLs

The concept covers about 200 old pages in 17. If it replaces the live site, every old URL needs
a redirect to its new home. The page map is in the inventories (scratch files, not in the repo):
city pages go to `contact/#areas`, form pages to `guides/ltb-forms/#<form>`, and so on.
