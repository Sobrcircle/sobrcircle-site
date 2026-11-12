/**
 * The four owner situations on /owners/: condo unit owners, student rentals,
 * first-time landlords, and non-resident or out-of-province owners. Facts come
 * from the old site's four pages (inventory section 2.10). Shared material
 * (plans, the screening list, the software grid) lives on its own pages.
 */
import { Building2, Globe, GraduationCap, KeyRound } from 'lucide-react'
import type { IconType, QA } from '../components/ui'
import { condoFaqs, firstTimeFaqs, nonResidentFaqs, studentFaqs } from './faqs-owners'

export type OwnerKey = 'condo' | 'students' | 'first-time' | 'non-resident'

export type OwnerPanel = {
  key: OwnerKey
  /** The tab label. */
  label: string
  Icon: IconType
  /** One line for the picker at the top of the page. */
  door: string
  eyebrow: string
  title: string
  lead: string
  different: { t: string; b: string }[]
  does: string[]
  faqs: QA[]
}

export const owners: OwnerPanel[] = [
  {
    key: 'condo',
    label: 'Condo owners',
    Icon: Building2,
    door: 'Your unit and your tenancy. Not the corporation.',
    eyebrow: 'Condo apartments and condo townhouses',
    title: 'Rental management for the person who owns the unit.',
    lead: 'This is management of your unit and your tenancy. It is not management of the condominium corporation, the board or the common elements.',
    different: [
      { t: 'Two people get paid before you do', b: 'Your lender and the condominium corporation are paid on schedule whether or not your tenant pays. One missed month comes out of your own account.' },
      { t: 'Two sets of rules apply', b: 'The tenancy runs under the Residential Tenancies Act. The declaration, by-laws and rules bind you as the owner and, through the lease, your tenant.' },
      { t: 'Many condo landlords are accidental', b: 'You moved, kept the unit, and now run a tenancy from your phone between meetings. That works until the day a legal deadline lands.' },
    ],
    does: [
      'Marketing, screening and the lease for your unit',
      'Rent, deposits and a live owner ledger',
      'Maintenance inside your unit, with photos and video',
      'Notices and Landlord and Tenant Board work through our licensed paralegals',
      'Coordination with your condominium corporation on your behalf',
    ],
    faqs: condoFaqs,
  },
  {
    key: 'students',
    label: 'Student rentals',
    Icon: GraduationCap,
    door: 'Leased on the student calendar, guarantors screened.',
    eyebrow: 'University and college towns',
    title: 'Student rentals don’t fail slowly. They fail on one date.',
    lead: 'Miss the leasing window and a room can sit empty for the whole 8- or 12-month cycle, because the students who would have rented it have signed somewhere else.',
    different: [
      { t: 'The window is weeks, not months', b: 'Most student houses lease well ahead of the term. Once it starts, demand drops and a lower rent no longer brings it back.' },
      { t: 'Everything turns over at once', b: 'A five-bedroom house is five move-outs, five inspections, five sets of keys and five new leases, all in the same fortnight.' },
      { t: 'The person paying often isn’t the tenant', b: 'Parents and guarantors mean two sets of expectations, and a guarantee only helps if it was screened and written down at signing.' },
      { t: 'Per-room tenancies multiply the paperwork', b: 'Separate leases mean separate ledgers, separate arrears and separate notices. One house can produce the admin of a small building.' },
    ],
    does: [
      'Listing timed to the student intake, on MLS® and REALTOR.ca through our brokerage',
      'Guarantors screened exactly like applicants, with the guarantee written into the lease at signing',
      'A ledger for every room, so you see which tenancy is short this month',
      'The Ontario Standard Lease e-signed, so a student and a guarantor in other provinces can sign the same day',
      'Dated move-in photos and documented repairs, so a damage claim rests on evidence',
      'Noise and bylaw complaints handled with written warnings that build a proper file',
    ],
    faqs: studentFaqs,
  },
  {
    key: 'first-time',
    label: 'First-time landlords',
    Icon: KeyRound,
    door: 'The eight costly mistakes, and a first-tenancy checklist.',
    eyebrow: 'New and about-to-be Ontario landlords',
    title: 'Nobody hands you a rulebook. This is the rulebook.',
    lead: 'You bought a rental, inherited a tenant, finished a basement suite, or kept the old house when you moved. Read this even if you never call us.',
    different: [
      { t: 'Mistakes cost months, not fines', b: 'A wrong deposit, a missing lease form or an N4 with the wrong date is measured in months of your own rent.' },
      { t: 'The careful part comes first', b: 'Once you hand over keys, Ontario law protects the tenancy. The time to be thorough is before the lease is signed.' },
      { t: 'Waiting doesn’t help', b: 'The Board’s timeline starts when you file, not when the trouble started. Kindness is not a strategy, and the Board does not reward waiting.' },
    ],
    does: [
      'Screening every adult applicant the same way, before the lease',
      'The Ontario Standard Lease, prepared and e-signed',
      'Rent tracked in a ledger from day one',
      'N4 and N1 notices prepared properly',
      'A licensed paralegal to talk to on every plan',
    ],
    faqs: firstTimeFaqs,
  },
  {
    key: 'non-resident',
    label: 'Non-resident owners',
    Icon: Globe,
    door: 'Out of province or overseas, with NR4 and NR6 coordinated.',
    eyebrow: 'Overseas and out-of-province owners',
    title: 'Own an Ontario rental from anywhere, without flying back for a hearing.',
    lead: 'You can’t drive over when the furnace quits, or sit in a Landlord and Tenant Board hearing from another time zone. We’re your Ontario team, with an owner portal you can check any time.',
    different: [
      { t: 'Distance', b: 'Arrears you hear about late, small leaks that become ceilings, and a vacancy you can’t show from abroad.' },
      { t: 'The hearing', b: 'The process that gets your property back happens in a hearing you can’t easily attend from another country.' },
      { t: 'The CRA', b: 'Rent paid to a non-resident owner is subject to withholding. Owners who never set it up find out at tax time.' },
    ],
    does: [
      'A live owner portal: rent ledger, statements and repairs with photos',
      'The Ontario Standard Lease e-signed, with no courier',
      'Applicants screened and placed through our brokerage',
      'On Property Management + Legal Guarantee, our licensed paralegals represent you at hearings on eligible new LTB matters',
      'NR4 and NR6 filings coordinated on request, with records kept for your accountant',
    ],
    faqs: nonResidentFaqs,
  },
]

/* ---- Condo ---------------------------------------------------------------- */
export const condoNot = [
  'Managing a condominium corporation or condo board',
  'Reserve fund studies, budgets or common-expense collection',
  'Common elements, amenities, lobby or grounds',
  'Issuing status certificates (that’s the corporation’s manager)',
  'Board meetings, AGMs or corporation governance',
]

export const condoCoordination = [
  { t: 'Declaration and rules', b: 'Attached to and referenced in the lease, so the obligations reach your tenant instead of landing back on you.' },
  { t: 'Tenant-information filings', b: 'Handled at move-in, on renewal and at turnover, where your corporation requires them.' },
  { t: 'Elevator and move-in bookings', b: 'Move slots, service entrances, deposits and time windows booked and confirmed.' },
  { t: 'Parking, lockers and fobs', b: 'Assignments and fob programming recorded in the lease and your portal, not a text thread.' },
  { t: 'Status certificates', b: 'Requested from the corporation’s manager when a lender, buyer or accountant needs one.' },
  { t: 'Short-term rental limits', b: 'Your building’s restrictions checked before we market the unit, and the lease written to match.' },
]

export const condoSituations = [
  'Rent stops arriving and the mortgage is due',
  'Repeated rule breaches: noise, balcony, pets, smoking',
  'Unauthorized occupants or an unapproved sublet',
  'Short-term rental listings against the corporation’s rules',
  'Damage inside the unit, with photo evidence assembled',
  'Chargebacks and compliance letters from the corporation',
  'An owner moving abroad who needs the tenancy off their plate',
  'A pre-construction unit that has just reached interim occupancy',
]

/* ---- Students ------------------------------------------------------------- */
export const guarantorChecks = [
  'Equifax credit report and score',
  'Government-issued ID verified',
  'Employment and income verified',
  'Bank statements and income stability reviewed',
  'Previous landlord references',
  'A search of past Landlord and Tenant Board orders',
  'Application fraud check by cross-matching details',
]

export const studentLaw = [
  { t: 'A fixed term doesn’t end the tenancy', b: 'When an 8- or 12-month term ends, the tenancy continues month to month unless the tenant gives proper written notice and leaves, or you both agree in writing to end it.' },
  { t: 'Off-campus isn’t exempt', b: 'Residences run by a college or university can be exempt from parts of the Residential Tenancies Act. An ordinary off-campus house or apartment is not.' },
  { t: 'Guarantors are lawful', b: 'Asking for a guarantor is common and sensible where an applicant has little income or credit history, as long as the guarantee is documented properly.' },
]

export const campusTowns = [
  { city: 'Windsor', schools: 'University of Windsor, St. Clair College' },
  { city: 'London', schools: 'Western, Fanshawe' },
  { city: 'Waterloo', schools: 'University of Waterloo, Laurier, Conestoga' },
  { city: 'Kingston', schools: 'Queen’s, St. Lawrence' },
  { city: 'Hamilton', schools: 'McMaster, Mohawk' },
  { city: 'Ottawa', schools: 'uOttawa, Carleton' },
  { city: 'Guelph', schools: 'University of Guelph' },
  { city: 'Oshawa', schools: 'Ontario Tech, Durham College' },
  { city: 'St. Catharines', schools: 'Brock' },
  { city: 'Peterborough', schools: 'Trent, Fleming' },
  { city: 'Sudbury', schools: 'Laurentian' },
  { city: 'Thunder Bay', schools: 'Lakehead' },
]

/* ---- First-time landlords ------------------------------------------------- */
export const firstTimeMistakes = [
  {
    t: 'Renting to the first nice person who shows up',
    b: '“They seemed great” isn’t screening. A real file is a credit report, verified income and employment, government ID, landlord references and a check of past LTB orders. After the lease, your options are slow and expensive.',
  },
  {
    t: 'Using a lease you found online',
    b: 'For most private residential tenancies entered into on or after April 30, 2018, Ontario’s Standard Form of Lease is mandatory. If a tenant asks for it in writing and doesn’t get it, they may be entitled to withhold up to one month’s rent. Clauses that contradict the Residential Tenancies Act are unenforceable, signed or not.',
  },
  {
    t: 'Collecting a “damage deposit”',
    b: 'Ontario allows a rent deposit, normally last month’s rent and capped at one rent period, with interest owed to the tenant each year, plus a refundable key deposit. A separate damage or security deposit isn’t allowed, and the rent deposit can’t be spent on repairs.',
  },
  {
    t: 'Serving an N4 with the wrong dates or amounts',
    b: 'The termination date has to be far enough out: at least 7 days for any tenancy since Bill 60 took effect on September 21, 2026, plus 5 days if mailed. The amount must be rent only, not NSF charges, late fees or utilities. Get either wrong and the application can be dismissed, and you start again.',
  },
  {
    t: 'Not documenting the unit at move-in',
    b: 'There’s no mandatory inspection form, so most first-timers skip it. A dated photo and video walkthrough of every room, acknowledged by the tenant, is the difference between a provable damage claim and your word against theirs.',
  },
  {
    t: 'Letting arrears run “just one more month”',
    b: 'You can serve an N4 the day after rent is late, and serving it doesn’t force anyone out. Most tenants simply pay. Landlords who wait three or four months to act are the ones who lose the most.',
  },
  {
    t: 'Raising the rent the casual way',
    b: 'A text saying “rent’s going up in January” isn’t a rent increase. You need Form N1, given at least 90 days ahead, and generally no more than once every 12 months. Most units are held to the yearly guideline. An improper increase can be void.',
  },
  {
    t: 'Thinking the one-year lease ends the tenancy',
    b: 'When the term ends, the tenancy continues month to month on the same terms. Ending it needs a lawful reason and the Board’s process. Changing locks, removing belongings or cutting utilities is illegal.',
  },
]

export const firstTenancyChecklist = [
  'Confirm the unit is legal and safe for the use: zoning, fire separation, egress windows, working smoke and CO alarms',
  'Set the rent from real local comparables, not a guess',
  'Advertise properly and screen every adult applicant the same way',
  'Pull credit, verify income and ID, and call the previous landlord',
  'Use Ontario’s Standard Form of Lease, and read it before the tenant does',
  'Collect only a lawful rent deposit and, if you wish, a refundable key deposit',
  'Photograph and video every room on move-in day, dated and acknowledged',
  'Give the tenant a written way to request repairs, and keep every request',
  'Start a rent ledger on day one: memory is not evidence',
  'Confirm your insurance covers a rental, and require tenant insurance',
]

/* ---- Non-resident owners -------------------------------------------------- */
export const portalChecks = [
  'Live rent ledger: what was owed, what was paid, what’s outstanding',
  'Owner statements, ready for your accountant',
  'Maintenance requests with photos or video of the finished work',
  'The Ontario Standard Lease, e-signed with no courier',
  'Screening results on every applicant',
  'Equifax rent reporting for your tenants',
]

export const nonResidentTax = [
  { t: '25% withholding on gross rent', b: 'A non-resident landlord’s agent in Canada is required to withhold 25% of gross rent and remit it to the CRA monthly. Gross, not net.' },
  { t: 'NR6: withholding on net instead', b: 'Filing an NR6 allows the withholding to be worked out on net rental income rather than gross.' },
  { t: 'NR4: the annual slip', b: 'An NR4 slip reporting the rent and the tax withheld is issued each year.' },
]
