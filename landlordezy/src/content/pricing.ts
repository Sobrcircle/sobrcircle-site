/**
 * One source of truth for prices, reconciled from landlordezy.ca on
 * 2026-10-15. The live site shows several conflicting price lists (see the
 * report); this follows /packages, which is the page checkout actually uses,
 * plus VirtualPM from the homepage and add-ons from their own product pages.
 * All prices in CAD; HST extra.
 */
export type Plan = {
  id: string
  name: string
  tagline: string
  base: number
  perDoor: number
  unitLabel?: string
  popular?: boolean
  intro: string
  features: string[]
  cta: string
}

export const landlordPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'For your first rental',
    base: 0,
    perDoor: 0,
    intro: 'Everything to get started. No card needed.',
    features: [
      'Up to 2 tenants: profiles, rent tracking and receipts',
      'Rent reminders and a one-click arrears report',
      'Passwordless tenant portal',
      'Unlimited free listings on EzyRent',
      'Tenant pre-screening',
      'Ask Ezy AI: 3 questions a day',
      'Receipt scanning: 3 a month',
      'LandlordTalk forum and Landlord Reference Network',
    ],
    cta: 'Start free',
  },
  {
    id: 'self',
    name: 'Self Management',
    tagline: 'Run it yourself, on autopilot',
    base: 9.99,
    perDoor: 1,
    popular: true,
    intro: 'Everything in Free, for your whole portfolio, plus:',
    features: [
      'Equifax rent reporting for every tenant',
      'Automatic Interac e-Transfer rent collection',
      'Automated N4 and N1 notices with certificate of service',
      'Ontario Standard Lease with e-signature',
      'Full tenant screening and pre-screening',
      'Move-in, move-out and fire safety inspections',
      'Maintenance work orders, calendar and team notes',
      'Broadcasts, utilities tracking and year-end reports',
      'Unlimited Ask Ezy, receipt scans and document storage',
      'Ezy AI: 3 free notice drafts a month',
    ],
    cta: 'Start free, upgrade anytime',
  },
]

export const virtualPm = {
  name: 'VirtualPM Legal Shield',
  base: 49,
  perUnit: 6,
  features: [
    'Everything in Self Management',
    'Rent collected by EFT by the OLH team',
    'N4 issued on the 5th if rent is unpaid',
    '30-minute paralegal consultation every month',
    'Legal Guarantee available when an eviction is needed',
    'Ezy AI included, and $100 off a flat-fee MLS® listing',
  ],
}

export const pmPlans: Plan[] = [
  {
    id: 'pm-free',
    name: 'PM Free',
    tagline: 'Onboard your firm at zero cost',
    base: 0,
    perDoor: 0,
    intro: 'A real account, not a trial:',
    features: [
      'Unlimited owners, properties and units',
      'Rent collection, ledger and arrears report',
      'Free EzyRent listings and pre-screening',
      'Move-in and move-out inspections',
      'Tenant portal and invites',
      'Basic CRM and website lead widget',
    ],
    cta: 'Start free',
  },
  {
    id: 'pm-manage',
    name: 'PM Manage',
    tagline: 'Run doors on behalf of owners',
    base: 29.99,
    perDoor: 1,
    popular: true,
    intro: 'Everything in PM Free, plus:',
    features: [
      'Owner accounting: ledgers, fees and distributions',
      'Monthly owner statements and a read-only owner portal',
      'Automatic e-Transfer collection through to owner accounting',
      'AI data import from any software',
      'Full CRM, meeting scheduler and e-signature agreements',
      'Automation, e-leases and Equifax rent reporting',
      'Team calendar, notes and broadcasts',
    ],
    cta: 'Start free, upgrade anytime',
  },
  {
    id: 'pm-growth',
    name: 'PM Growth',
    tagline: 'Win more doors',
    base: 129,
    perDoor: 1,
    intro: 'Everything in PM Manage, plus:',
    features: [
      'Automated follow-up sequences that stop when a landlord replies',
      'Follow-ups written by Ezy AI for each landlord',
      'Email your whole pipeline, paced for the inbox',
      'Collect management fees by card through your own Stripe',
      'Unlimited N4s, N1s, leases and agreements',
    ],
    cta: 'Start free, upgrade anytime',
  },
]

export const addOns = [
  { name: 'Ezy AI assistant', price: '$29.99/mo + $1/door', note: 'Code AI20 locks in $9.99/mo. Included with VirtualPM.' },
  { name: 'AI credit check with Equifax report', price: '$29.99', note: 'Per check. You or the applicant can pay.' },
  { name: 'Bank-statement analysis · ID verification', price: '$10 each', note: 'Optional screening add-ons.' },
  { name: 'Guarantor check · Expert human review', price: '$29.99 · $65', note: 'Optional screening add-ons.' },
  { name: 'Flat-fee MLS® listing', price: 'from $549', note: '$749 with a 12-month Legal Guarantee. Members save $100.' },
  { name: 'Full-service tenant placement', price: '1 month’s rent', note: 'Paid when the tenant is placed.' },
  { name: 'Paralegal time blocks', price: '$75/hour', note: '3- or 12-hour blocks. Unused hours never expire.' },
  { name: 'Concierge onboarding (property managers)', price: '$159', note: 'One time. We import and build your whole book.' },
]

export const paralegalPlans = [
  { name: 'Free', price: '$0', unit: 'forever', features: ['Search comparable orders', 'Upload your notice', 'Wins and losses', '2 AI analyses to try'] },
  { name: 'Research Pass', price: '$49', unit: 'per year', features: ['AI comparative case analysis', '4 analyses a month', 'Deciding factors and hearing questions'], popular: true },
  { name: 'CaseBuilder', price: '$249', unit: 'per year', features: ['Everything in Research Pass', '15 analyses a month', 'For paralegals building real matters'] },
  { name: 'Pro', price: '$499', unit: 'per year', features: ['Everything in CaseBuilder', '25 analyses a month', 'Top-ups: 10 analyses for $14.99'] },
]

export function monthly(base: number, perDoor: number, doors: number): string {
  return (base + perDoor * doors).toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }).replace('CA', '')
}
