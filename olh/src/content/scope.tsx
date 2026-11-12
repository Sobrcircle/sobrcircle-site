/**
 * What each plan covers, step lists and the Automation Suite, in one place.
 * The deep pages and the detail sheets both read from here, so Paul's wording
 * only ever lives in one file.
 */
import { Bell, CalendarClock, FileSignature, MessageSquare, NotebookPen, Scale, ScrollText, UserSearch, Wallet, Wrench } from 'lucide-react'
import type { IconType } from '../components/ui'
import { site } from '../site'

const E = 'https://landlordezy.ca/'

/* ---- OLH Landlord Shield -------------------------------------------------- */
export const shieldIncluded = [
  'The LandlordEzy Automation Suite for your enrolled tenancies, with no separate software charge',
  'N4 and N1 notices you prepare, sign and serve yourself, with no OLH drafting fee',
  'Equifax rent reporting for enrolled tenancies',
  'Rent payment setup, automated reminders and payment matching',
  'Payment records checked by our team, with corrections where needed',
  'Factual notice to you of any rent owing',
  'Monthly ledger review and statement, and help with rent-ledger questions',
  'Member legal access: a monthly paralegal consultation, and a member case price',
]

export const shieldYours = [
  'Tenant communication, maintenance and decisions about arrears stay with you',
  'You serve your own notices; we don’t chase arrears with your tenants. Professional review, service or representation is quoted, or a member case for an L1 if eligible',
  'Site visits are booked as needed at the standard visit price; tenant placement is separate',
  'Payments made another way are recorded from records you provide',
  'Bringing in an older or incomplete ledger is quoted separately',
  'Support covers rent-payment and ledger questions; other landlord advice is quoted',
]

/* ---- Property Management, and the Legal Guarantee ------------------------- */
export const managementIncluded: [string, string][] = [
  ['Rent administration', 'ledger, monthly owner statements and arrears follow-up'],
  ['The N4 process', 'for late rent'],
  ['Tenant communication', 'through LandlordEzy, email and phone'],
  ['Routine maintenance coordination', 'with one provider per job'],
  ['Connected records', 'leases, documents and owner records in one place'],
  ['LandlordEzy included', 'no separate software bill'],
  ['Member legal access', 'a monthly paralegal consultation, and a member case rate'],
]

export const guaranteeIncluded: [string, string][] = [
  ['Notices', 'reviewed or prepared'],
  ['Eligible LTB applications', 'including L1 for non-payment'],
  ['Evidence and disclosure', 'prepared from your records'],
  ['Settlement and mediation', 'where it serves you'],
  ['Licensed hearing representation', 'by Landlord Pro Legal Services'],
  ['Order review', 'and agreed next-step coordination'],
]

export const guaranteeFacts: [string, string][] = [
  ['Covered', 'Notices, eligible applications including L1, evidence and disclosure, settlement, hearing representation, order review and agreed next steps.'],
  ['Extra', 'Government and LTB fees, sheriff, process servers and approved outside costs.'],
  ['Separate', 'Court appeals, non-LTB matters and exceptional scope, quoted first.'],
  ['Not promised', 'Rent reimbursement, an eviction, or any particular result or timeline.'],
]

export const notInAnyPlan =
  'Physical site visits, repairs, renovation and project work, and tenant placement are each quoted before they’re booked. Condo fee payments aren’t managed. LTB filing fees, sheriff, process servers and other approved outside costs are billed at cost.'

/* ---- Step lists ------------------------------------------------------------ */
export const n4Steps: { Icon: IconType; t: string; b: string }[] = [
  { Icon: Bell, t: 'Rent is missed', b: 'You get a rent-unpaid alert, and the arrears are already in your ledger.' },
  { Icon: NotebookPen, t: 'Review the auto-filled N4', b: 'Periods, amounts and the termination date come from your ledger. Check every detail before you sign.' },
  { Icon: FileSignature, t: 'E-sign and serve', b: 'Serve by a method the rules allow; email only with the tenant’s written consent. LandlordEzy generates the Certificate of Service.' },
  { Icon: CalendarClock, t: 'Filing reminders', b: 'Reminders around the termination and filing dates, so the next step isn’t missed.' },
  { Icon: Scale, t: 'Optional: the L1 and the hearing', b: 'If the tenant doesn’t pay, ask for our licensed paralegals at the member case rate from $995 + HST and disbursements, if eligible. No upgrade required.' },
]

export const rentSteps = [
  { t: 'Rent is paid directly to your bank', b: 'Your tenant pays by Interac e-Transfer into your own account. Timing is set by your bank and the payment.' },
  { t: 'LandlordEzy matches it', b: 'The software reads your bank’s deposit notice and suggests the ledger entry. Reminders and confirmations go out automatically.' },
  { t: 'Our team checks it', b: 'We review your payment records, approve entries and correct them where needed.' },
  { t: 'Monthly review and statement', b: 'Each month we review your rent ledger, send your statement and tell you plainly about any balance owing.' },
]

export const reportingSteps = [
  { t: 'Register the tenant and lease', b: 'Add the tenancy in your LandlordEzy account.' },
  { t: 'Keep the ledger current', b: 'Payments and balances recorded each month; our team checks your ledger.' },
  { t: 'Consent and verification', b: 'LandlordEzy handles the consent request and verification steps that apply.' },
  { t: 'Monthly submission', b: 'Eligible, completed records are submitted each month. Figures known to be wrong or in dispute wait until they’re resolved.' },
]

export const visitPrices = [
  { price: '$75', unit: '+ HST per visit', t: 'Standard scheduled visit', b: 'On Landlord Shield and Property Management. Up to 45 minutes on site, dated photos, a standard checklist, a full report in LandlordEzy and follow-up.' },
  { price: '$55', unit: '+ HST per visit', t: 'With the Legal Guarantee', b: 'The same visit at a lower price for Property Management + Legal Guarantee clients. Still booked and billed one visit at a time.', hi: true },
  { price: 'from $149', unit: '+ HST', t: 'Urgent or after-hours', b: 'Subject to availability, on all three plans.' },
]

/* ---- The LandlordEzy Automation Suite ------------------------------------- */
export const suite: { key: string; Icon: IconType; title: string; note: string; items: { t: string; b: string; href: string }[] }[] = [
  {
    key: 'rent',
    Icon: Wallet,
    title: 'Rent & records',
    note: 'Your ledger keeps itself up to date, and our team checks it every month.',
    items: [
      { t: 'Self-running rent ledger', b: 'Monthly charges, payments, balances and receipts; scheduled rent increases apply on their effective date.', href: `${E}automation` },
      { t: 'Interac e-Transfer matching', b: 'Rent goes straight to your bank; the software matches deposits and our team checks the records.', href: `${E}automatic-rent-collection` },
      { t: 'Reminders and rent-unpaid alerts', b: 'Tenants are reminded before rent is due; you hear when it isn’t paid.', href: `${E}automation` },
      { t: 'Statements, receipts and year-end exports', b: 'Downloadable statements and receipts, and year-end reports for your accountant.', href: `${E}automatic-rent-collection` },
      { t: 'Tenant portal', b: 'Tenants see their rent history and receipts.', href: `${E}help/invite-your-tenant` },
      { t: 'Equifax rent reporting', b: 'On-time rent can be reported to Equifax, subject to tenant consent, verification and program rules.', href: site.ezy.reporting },
    ],
  },
  {
    key: 'notices',
    Icon: ScrollText,
    title: 'Notices & the LTB',
    note: 'Ontario forms, filled from your records. You review, sign and serve.',
    items: [
      { t: 'N4 for non-payment', b: 'Arrears worked out from your ledger, e-signature and a Certificate of Service.', href: site.ezy.n4 },
      { t: 'N1 rent increase', b: 'New rent and earliest legal date pre-filled; the increase is scheduled into your ledger.', href: site.ezy.n1 },
      { t: 'Consent to service by email', b: 'Tenants can agree in writing to receive notices by email.', href: `${E}consent-to-service-by-email` },
      { t: 'LTB order search and Ask Ezy', b: 'Search LTB orders and ask Ontario tenancy questions, within the plan’s limits. General information, not legal advice.', href: `${E}ltb-orders` },
    ],
  },
  {
    key: 'screen',
    Icon: UserSearch,
    title: 'Find & screen tenants',
    note: 'Advertise for free, then screen consistently.',
    items: [
      { t: 'Free rental ads on EzyRent', b: 'List on LandlordEzy’s own rentals marketplace at no cost. Paid MLS® listings through List It Realty start at $549.', href: `${E}list-your-rental-free-ontario` },
      { t: 'Pre-screening and screening workflow', b: 'Applicants answer your questions before a showing.', href: `${E}tenant-screening-ontario` },
      { t: 'Equifax credit reports', b: 'From $29.99 per report; the landlord or the applicant pays. Not included in the monthly fee.', href: `${E}tenant-credit-check-ontario` },
    ],
  },
  {
    key: 'leases',
    Icon: FileSignature,
    title: 'Leases & inspections',
    note: 'Start each tenancy on the record.',
    items: [
      { t: 'Ontario Standard Lease with e-signature', b: 'Built in, signed online.', href: `${E}digital-lease` },
      { t: 'Move-in and move-out inspections', b: 'Photos, tenant acknowledgement and a PDF report. Software you use, not an OLH site visit.', href: `${E}move-in-inspection-report-ontario` },
      { t: 'Fire-safety checklists and reminders', b: 'Ontario Fire Code checklist with photos and reminders. Helps you keep track; not a compliance guarantee.', href: `${E}fire-safety-inspection-ontario` },
    ],
  },
  {
    key: 'maintenance',
    Icon: Wrench,
    title: 'Maintenance & money',
    note: 'Your own vendors and your own books.',
    items: [
      { t: 'Maintenance work orders', b: 'Requests with photos, tracked to completion with the vendors you choose.', href: `${E}property-maintenance-software` },
      { t: 'Vendor contacts and bill records', b: 'Record your own vendors and their bills against each property. OLH doesn’t pay bills or coordinate vendors on Landlord Shield.', href: `${E}property-maintenance-software` },
      { t: 'Expenses and receipt capture', b: 'Snap receipts and file expenses by property; export at year-end.', href: `${E}expense-tracker-receipt-scanning-ontario` },
      { t: 'Utilities and tenant insurance tracking', b: 'Who pays gas, hydro and water, and whether tenant insurance is current.', href: `${E}rental-utilities-tracking` },
    ],
  },
  {
    key: 'messages',
    Icon: MessageSquare,
    title: 'Messages & organisation',
    note: 'One place for every conversation and document.',
    items: [
      { t: 'Landlord–tenant messaging and broadcasts', b: 'Message one tenant, or email and text many at once.', href: `${E}tenant-broadcast-messaging` },
      { t: 'Documents, calendar and tasks', b: 'Document storage, a shared calendar with reminders, and notes.', href: `${E}property-management-calendar` },
    ],
  },
]

export const suiteFinePrint =
  'Included with OLH Landlord Shield as LandlordEzy Self Management, with no separate software bill. Paid extras aren’t included: Equifax credit reports, unlimited Ezy AI drafting, CaseBuilder research and the property-manager CRM. LandlordEzy runs in your browser today and tenants use the tenant portal; a mobile app is planned for January 2027.'
