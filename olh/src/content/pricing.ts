/**
 * Every price on the site, in one place. These are Paul's proposed rates from the
 * OLH design preview (ontariolandlordhelp.ca/design-preview/pricing), November 2026.
 * All amounts are monthly unless named otherwise, in CAD, plus HST.
 *
 * The pricing calculator on /pricing/ reads `tariff` from a data attribute, so the
 * numbers the browser shows and the numbers in the HTML can never drift apart.
 */
export const tariff = {
  min: 1,
  max: 10,
  shield: { first: 49, additional: 29 },
  management: {
    condo: { first: 99, additional: 79, noun: 'condo or apartment', label: 'Condo or apartment' },
    house: { first: 149, additional: 99, noun: 'whole-house', label: 'Whole house' },
  },
  /** Legal Guarantee, added to Property Management: [from unit, to unit, rate each]. */
  legalBands: [
    [1, 1, 50],
    [2, 5, 25],
    [6, 10, 15],
  ] as [number, number, number][],
} as const

export type PropertyType = keyof typeof tariff.management

export function shieldTotal(n: number): number {
  return tariff.shield.first + (n - 1) * tariff.shield.additional
}

export function managementTotal(type: PropertyType, n: number): number {
  const c = tariff.management[type]
  return c.first + (n - 1) * c.additional
}

export function legalTotal(n: number): number {
  return tariff.legalBands.reduce((sum, [from, to, rate]) => sum + Math.max(0, Math.min(n, to) - from + 1) * rate, 0)
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
} as const

export type PlanKey = 'shield' | 'management' | 'guarantee'

export const plans: {
  key: PlanKey
  name: string
  short: string
  who: string
  from: number
  fromNote: string
  term: string
  points: string[]
  legal: string
  href: string
  link: string
  recommended?: boolean
}[] = [
  {
    key: 'shield',
    name: 'OLH Landlord Shield',
    short: 'Landlord Shield',
    who: 'You’d rather manage your tenants yourself',
    from: 49,
    fromNote: 'each additional tenancy $29',
    term: 'Month-to-month from the start',
    points: [
      'The LandlordEzy Automation Suite, incl. N4 and N1',
      'Equifax rent reporting and a checked monthly ledger',
      'A 15-minute paralegal consultation each month',
    ],
    legal: 'Member case from $995 + HST and disbursements, for problems that first arise after enrollment',
    href: 'landlord-shield/',
    link: 'How Landlord Shield works',
    recommended: true,
  },
  {
    key: 'management',
    name: 'Property Management',
    short: 'Property Management',
    who: 'You’d rather we ran the day-to-day',
    from: 99,
    fromNote: 'whole house from $149',
    term: '90-day initial period, then 30 days’ notice',
    points: [
      'Tenant communication and maintenance coordination',
      'Rent, statements, arrears follow-up and the N4 process',
      'LandlordEzy included, with your own owner portal',
    ],
    legal: 'A monthly paralegal consultation, and a member case from $995 for problems that first arise after enrollment',
    href: 'pricing/#included',
    link: 'What’s included',
  },
  {
    key: 'guarantee',
    name: 'Property Management + Legal Guarantee',
    short: 'Management + Legal Guarantee',
    who: 'You want LTB work arranged in advance too',
    from: 149,
    fromNote: 'whole house from $199',
    term: '90-day initial period, then 30 days’ notice',
    points: [
      'Everything in Property Management',
      'Eligible new LTB matters, all enrolled units',
      'A 15-minute paralegal consultation each month',
    ],
    legal: 'Eligible new LTB work included, no activation fee; external costs extra',
    href: 'legal/#guarantee',
    link: 'How the Legal Guarantee works',
  },
]
