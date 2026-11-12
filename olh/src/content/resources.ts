/**
 * Link data for the Resources hub (resources/). Every external link points at a
 * page that exists on the live site or its partners today (see inventory-B).
 */
import { BookOpenCheck, Calculator, FileText, Gauge, Gavel, LineChart, ListChecks, MessageCircleQuestion, Scale, TrendingUp } from 'lucide-react'
import type { IconType } from '../components/ui'
import { live, site, url } from '../site'

export type ResourceLink = { Icon: IconType; t: string; b: string; href: string; tag?: string; cta: string }

/** The four guides on this site. */
export const guides: ResourceLink[] = [
  {
    Icon: Gavel,
    t: 'Evicting a tenant in Ontario',
    b: 'The legal grounds, which notice goes with which, the steps from notice to the Sheriff, and why the Board sets the pace.',
    href: url('guides/evictions/'),
    tag: 'Evictions',
    cta: 'Read the evictions guide',
  },
  {
    Icon: FileText,
    t: 'LTB forms and notices',
    b: 'What each N, L and T form is for, its notice period and deadline, how to serve it, and the mistakes that void it.',
    href: url('guides/ltb-forms/'),
    tag: 'Forms',
    cta: 'Read the forms guide',
  },
  {
    Icon: TrendingUp,
    t: 'Raising the rent',
    b: 'The guideline, the 90-day and 12-month rules, units that are exempt, and increases above the guideline.',
    href: url('guides/rent-increases/'),
    tag: 'Rent increases',
    cta: 'Read the rent increase guide',
  },
  {
    Icon: Scale,
    t: 'Bill 60: what changed',
    b: 'The changes in force since July 1 and September 21, 2026, and what is still not in force.',
    href: url('guides/bill-60/'),
    tag: 'Bill 60',
    cta: 'Read the Bill 60 guide',
  },
]

/** Free tools, most on the live site. */
export const tools: ResourceLink[] = [
  {
    Icon: Gauge,
    t: 'Free rent analysis',
    b: 'A free written rent range from our licensed Realtors, based on what comparable units leased for, plus a vacancy cost calculator.',
    href: live('/what-is-my-rental-worth'),
    tag: 'Free',
    cta: 'Price my rental',
  },
  {
    Icon: ListChecks,
    t: 'Tenant screening questions',
    b: 'What to ask an applicant, from the first message to the showing, and the red flags to watch for.',
    href: live('/tenant-screening-questions'),
    tag: 'Free',
    cta: 'Read the questions',
  },
  {
    Icon: BookOpenCheck,
    t: 'LTB judgment database',
    b: `${site.proof.ltbOrders} Landlord and Tenant Board orders, searchable in LandlordEzy and checked on every OLH screening.`,
    href: live('/ltb-judgment-database'),
    tag: 'LandlordEzy',
    cta: 'How the database works',
  },
  {
    Icon: MessageCircleQuestion,
    t: 'Ask Ezy',
    b: 'An assistant in LandlordEzy for Ontario landlord questions: what the Act says, which form fits, what to do next. General information, not legal advice.',
    href: live('/ask-ezy'),
    tag: 'LandlordEzy',
    cta: 'Meet Ask Ezy',
  },
  {
    Icon: LineChart,
    t: 'Equifax rent reporting',
    b: 'Report rent to Equifax every month, so on-time payments count. Included with OLH Landlord Shield.',
    href: url('landlord-shield/#reporting'),
    tag: 'Landlord Shield',
    cta: 'How reporting works',
  },
  {
    Icon: Calculator,
    t: 'Pricing calculator',
    b: 'Every OLH plan priced for one to ten tenancies, monthly, plus HST. No setup fee.',
    href: url('pricing/'),
    tag: 'OLH',
    cta: 'Price my portfolio',
  },
]

/** What the download centre holds, by group, as the live page lists it. */
export const downloadGroups: { key: string; label: string; groups: { t: string; items: string }[] }[] = [
  {
    key: 'notices',
    label: 'Notices',
    groups: [
      { t: 'Rent increase notices', items: 'N1, N2, N3 and the N10 agreement to increase above the guideline.' },
      { t: 'Notices to end a tenancy (landlord)', items: 'N4, N5, N6, N7, N8, N12, N13 and N14.' },
      { t: 'Tenant notices and agreements', items: 'N9, the N11 agreement to end the tenancy, N15 and the tenant’s statement that goes with it.' },
    ],
  },
  {
    key: 'applications',
    label: 'Applications',
    groups: [
      { t: 'Landlord applications', items: 'L1 to L10, A1, A2 and A4, and the S2 and S3 motions.' },
      { t: 'Tenant applications', items: 'T1 to T7.' },
      {
        t: 'Service, hearing and other forms',
        items: 'Certificate of Service, Fee Waiver Request, Payment Agreement, Request to Review an Order, Request to Reschedule a Hearing, Consent to Service by Email and more.',
      },
    ],
  },
  {
    key: 'templates',
    label: 'Lease and templates',
    groups: [
      { t: 'The lease', items: 'The Ontario Standard Lease (Form 2229E).' },
      {
        t: 'Landlord toolkit templates',
        items: 'Tenant screening checklist, rental application, move-in and move-out inspection report, fire and safety checklist, 24-hour notice of entry, rent receipts, guarantor agreement, parking addendum and more.',
      },
    ],
  },
]

/** A few evergreen videos, each with a written guide and transcript on LandlordEzy. */
export const videoPicks: { t: string; len: string; href: string }[] = [
  {
    t: 'When to serve an N4 in Ontario',
    len: '4:42',
    href: 'https://landlordezy.ca/videos/when-to-serve-an-n4-in-ontario-the-1-day-rule-every-landlord-must-know',
  },
  {
    t: 'What happens after you serve an N4?',
    len: '3:38',
    href: 'https://landlordezy.ca/videos/what-happens-after-you-serve-an-n4-i-served-my-tenant-an-n4-in-ontario-what',
  },
  {
    t: 'Questions to ask when interviewing prospective tenants',
    len: '11:09',
    href: 'https://landlordezy.ca/videos/top-questions-every-ontario-landlord-should-ask-when-interviewing-prospective',
  },
  {
    t: 'Move-in inspection guide for landlords',
    len: '14:34',
    href: 'https://landlordezy.ca/videos/move-in-inspection-guide-for-landlords-before-your-tenant-moves-in-protect',
  },
  {
    t: 'Do you really need property management?',
    len: '18:50',
    href: 'https://landlordezy.ca/videos/do-you-really-need-property-management-honest-advice-for-ontario-landlords',
  },
]

/** Official sources the hub points to. */
export const official = {
  ltb: 'https://tribunalsontario.ca/ltb/',
  lawLibrary: live('/ontario-law'),
  rta: live('/rta'),
  downloads: live('/downloads'),
  help: live('/help'),
}
