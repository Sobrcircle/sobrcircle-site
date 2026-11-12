/**
 * Every price on the site, in one place. All amounts are monthly unless named
 * otherwise, in CAD, plus HST. Copy elsewhere reads these numbers through `$`
 * and `plans`, so changing a price here changes it everywhere, including the
 * calculator (which receives `tariff` in a data attribute).
 *
 * THE LADDER (November 2026 concept, for new customers):
 *
 *   OLH Landlord Shield                      $59   first tenancy, $29 each additional
 *   Property Management                      $149  first tenancy, $79 each additional
 *   Property Management + Legal Guarantee    $199  first tenancy, $99 each additional
 *
 * Why these numbers:
 * - $199 is already the public Legal Guarantee price on the live site. Existing
 *   owners keep whatever their agreement says; this ladder is for new customers.
 * - The steps shrink as you climb (+$90, then +$50), the way Apple's do, so the
 *   last step is the easiest one to take. The top is 34% above the middle.
 * - The Legal Guarantee is a round "+$50 a month" (first tenancy; +$20 for each
 *   additional), which sits against a single outside eviction file at $1,495.
 * - $59 keeps Shield under the cheapest full management in the market (~$89–98)
 *   and near the price of advice-only legal plans (~$49).
 * - One price for any home. Paul's draft had a lower condo rate and a higher
 *   whole-house rate; this ladder uses a single rate, as the live site does.
 *
 * Paul's own draft (design preview, Nov 2026) was Shield $49/$29, Management
 * $99/$79 (house $149/$99), Legal Guarantee +$50 / +$25 (units 2–5) / +$15 (6–10).
 */
export const tariff = {
  min: 1,
  max: 10,
  shield: { first: 59, additional: 29 },
  management: { first: 149, additional: 79 },
  /** The Legal Guarantee, added to Property Management. */
  legal: { first: 50, additional: 20 },
} as const

export type PlanKey = 'guarantee' | 'management' | 'shield'

export function planTotal(key: PlanKey, n: number): number {
  const extra = n - 1
  const mgmt = tariff.management.first + extra * tariff.management.additional
  if (key === 'shield') return tariff.shield.first + extra * tariff.shield.additional
  if (key === 'management') return mgmt
  return mgmt + tariff.legal.first + extra * tariff.legal.additional
}

export const fees = {
  memberCase: 995,
  standardCase: 1495,
  visitStandard: 75,
  visitGuarantee: 55,
  visitUrgent: 149,
  creditReport: 29.99,
  basicListing: 549,
  premiumListing: 749,
  realtorListing: 29,
  ltbFiling: 186,
} as const

const fmt = (n: number) => `$${n.toLocaleString('en-CA')}`

/** Ready-to-print prices for copy: `${$.shield}`, `${$.memberCase}`. */
export const $ = {
  shield: fmt(tariff.shield.first),
  shieldMore: fmt(tariff.shield.additional),
  management: fmt(tariff.management.first),
  managementMore: fmt(tariff.management.additional),
  guarantee: fmt(tariff.management.first + tariff.legal.first),
  guaranteeMore: fmt(tariff.management.additional + tariff.legal.additional),
  legalStep: fmt(tariff.legal.first),
  legalStepMore: fmt(tariff.legal.additional),
  manageStep: fmt(tariff.management.first - tariff.shield.first),
  memberCase: fmt(fees.memberCase),
  standardCase: fmt(fees.standardCase),
  caseSaving: fmt(fees.standardCase - fees.memberCase),
  visit: fmt(fees.visitStandard),
  visitGuarantee: fmt(fees.visitGuarantee),
  visitUrgent: fmt(fees.visitUrgent),
  basicListing: fmt(fees.basicListing),
  premiumListing: fmt(fees.premiumListing),
  realtorListing: fmt(fees.realtorListing),
  ltbFiling: fmt(fees.ltbFiling),
  /** Twelve months on each plan (first tenancy), for the worked example. */
  yearShield: fmt(tariff.shield.first * 12),
  yearManagement: fmt(tariff.management.first * 12),
  yearGuarantee: fmt((tariff.management.first + tariff.legal.first) * 12),
} as const

/**
 * The three plans, most complete first. Listing high-to-low is deliberate: the
 * first price a visitor reads becomes the reference for the other two.
 */
export const plans: {
  key: PlanKey
  name: string
  short: string
  /** The owner's own words for choosing it. */
  need: string
  who: string
  from: number
  more: number
  term: string
  /** A factual label, never "most popular" (we have no sales data to back that). */
  badge?: string
  points: string[]
  legal: string
  /** How this plan differs from the one below it, as a price step. */
  step?: string
  href: string
}[] = [
  {
    key: 'guarantee',
    name: 'Property Management + Legal Guarantee',
    short: 'Management + Legal Guarantee',
    need: 'Run it for me, legal work included',
    who: 'We run the tenancy, and LTB work is already arranged',
    from: tariff.management.first + tariff.legal.first,
    more: tariff.management.additional + tariff.legal.additional,
    term: '90-day start, then 30 days’ notice',
    badge: 'Most complete',
    points: [
      'Everything in Property Management',
      'Our paralegals handle eligible new LTB matters, for every enrolled unit',
      'Notices, L1 applications, evidence and hearing representation',
    ],
    legal: 'Eligible new LTB work included, with no activation fee. Filing fees and outside costs are extra.',
    step: `${fmt(tariff.legal.first)} a month more than Property Management`,
    href: 'legal/#guarantee',
  },
  {
    key: 'management',
    name: 'Property Management',
    short: 'Property Management',
    need: 'Run the day-to-day for me',
    who: 'We run the tenancy; you pay for legal work only if you need it',
    from: tariff.management.first,
    more: tariff.management.additional,
    term: '90-day start, then 30 days’ notice',
    points: [
      'Rent, statements and arrears follow-up, including the N4 process',
      'Tenant communication and maintenance coordination',
      'LandlordEzy included, with your own owner portal',
    ],
    legal: `A paralegal consultation every month, and a member rate of ${fmt(fees.memberCase)} if a new non-payment case arises.`,
    step: `${fmt(tariff.management.first - tariff.shield.first)} a month more than Landlord Shield`,
    href: 'property-management/',
  },
  {
    key: 'shield',
    name: 'OLH Landlord Shield',
    short: 'Landlord Shield',
    need: 'I’ll manage my tenants myself',
    who: 'You run the tenancy, with our software and team behind you',
    from: tariff.shield.first,
    more: tariff.shield.additional,
    term: 'Month-to-month',
    badge: 'For self-managing owners',
    points: [
      'The LandlordEzy Automation Suite, including N4 and N1 notices',
      'Your rent ledger checked by our team every month',
      'Equifax rent reporting for your tenants',
    ],
    legal: `A paralegal consultation every month, and a member rate of ${fmt(fees.memberCase)} if a new non-payment case arises.`,
    href: 'landlord-shield/',
  },
]

export const planByKey = (key: PlanKey) => plans.find((p) => p.key === key)!
