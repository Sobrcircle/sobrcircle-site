/**
 * Copy for the nine product pages. Facts and prices come from landlordezy.ca
 * (read 2026-10-15); legal statements are checked against Tribunals Ontario
 * and ontario.ca and linked where they appear.
 */
import type { ReactNode } from 'react'
import {
  AlertTriangle,
  Award,
  BadgeCheck,
  BellRing,
  Calculator,
  CalendarCheck,
  CalendarClock,
  Camera,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  FileText,
  Fingerprint,
  FolderDown,
  History,
  Images,
  Landmark,
  ListChecks,
  Mail,
  MapPinned,
  Megaphone,
  NotebookPen,
  PhoneCall,
  Receipt,
  Repeat,
  ScanLine,
  Scale,
  Send,
  Share2,
  ShieldCheck,
  Signature,
  Sparkles,
  Star,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
  Wrench,
  Zap,
} from 'lucide-react'
import type { IconType, QA } from '../components/ui'
import { site, url } from '../site'

export type Highlight = { icon: IconType; title: string; body: ReactNode }
export type Visual =
  | 'ledger'
  | 'screening'
  | 'reporting'
  | 'n4'
  | 'lease'
  | 'listing'
  | 'maintenance'
  | 'ezy'
  | 'casebuilder'

export type Feature = {
  slug: string
  nav: string
  title: string
  description: string
  eyebrow: string
  /** The job a visitor arrives with, asked as a question above the headline. */
  job: string
  /** The price, in one line, for the first screen. */
  priceLine: string
  h1: string
  lead: string
  visual: Visual
  steps: { title: string; body: ReactNode }[]
  stepsTitle: string
  highlightsTitle: string
  highlights: Highlight[]
  planNote: ReactNode
  faqs: QA[]
  related: string[]
  /** The hero's main button, when this page's next step isn't Start free. */
  cta?: { label: string; href: string }
  /** The hero's second link (default: the live demo). */
  secondary?: { label: string; href: string }
  /** Shown after the price line (default "Start free, no card"); null hides it. */
  noteTail?: string | null
  /** Overrides for the closing band. */
  band?: { title?: string; lead?: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } | null; fine?: string | null }
}

const ext = (href: string, label: string) => (
  <a href={href} rel="noopener">
    {label}
  </a>
)

export const features: Feature[] = [
  {
    slug: 'rent-collection',
    nav: 'Rent collection',
    title: 'Rent Collection by Interac e-Transfer | LandlordEzy',
    description:
      'Tenants keep paying by Interac e-Transfer. LandlordEzy matches each payment, updates the ledger, sends the receipt and flags arrears. No processing fees.',
    eyebrow: 'Rent collection',
    job: 'Tired of matching e-Transfers?',
    priceLine: 'Automatic matching in Self Management: $9.99/month + $1 a door',
    noteTail: 'Free plan tracks rent for 2 tenants, no card',
    h1: 'Rent that reconciles itself.',
    lead: 'Tenants keep paying by Interac e-Transfer, exactly as they do today. LandlordEzy reads each deposit notice, matches it to the right tenant and month, and sends the receipt. No processing fees, and your money never leaves your bank.',
    visual: 'ledger',
    stepsTitle: 'Set it up once. Then stop chasing.',
    steps: [
      {
        title: 'Add one forwarding rule.',
        body: 'Forward your bank’s Interac notification emails to your private LandlordEzy address. Your e-Transfer address, your bank and your tenants’ habits stay exactly the same.',
      },
      {
        title: 'Match once.',
        body: 'Match a payment to a tenant one time and LandlordEzy learns the payer, so next month’s rent records itself.',
      },
      {
        title: 'Receipts and arrears, handled.',
        body: 'Each payment lands on the oldest month owing, the tenant gets a receipt, and anyone behind shows up on your arrears list.',
      },
    ],
    highlightsTitle: 'Everything a bookkeeper would do. Automatically.',
    highlights: [
      { icon: Wallet, title: 'Keep 100% of the rent', body: 'No payment processor and no per-payment fee. The deposit goes from Interac straight into your bank account.' },
      { icon: ShieldCheck, title: 'Never recorded twice', body: 'Every transfer is checked against the ledger, so the same payment is never recorded twice.' },
      { icon: Receipt, title: 'Receipts send themselves', body: 'Tenants get a receipt for every payment, plus a passwordless portal with their full history.' },
      { icon: BellRing, title: 'Reminders before it’s late', body: 'Automatic reminders go out before rent is due, and a friendly nudge follows if it’s late.' },
      { icon: ListChecks, title: 'Who hasn’t paid? One tap.', body: 'A live arrears report shows every balance across your portfolio, month by month.' },
      { icon: FileText, title: 'A ledger that holds up', body: 'Every payment, discount and deposit is a visible line. That record powers late alerts, N4s and Equifax reporting.' },
    ],
    planNote: (
      <>
        Included in Self Management, from $9.99 a month plus $1 per door. The Free plan tracks rent for up to two tenants.{' '}
        <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      {
        q: 'Do my tenants need to download an app?',
        a: 'No. They pay by Interac e-Transfer as they do today. If they like, they can see their rent history and receipts in a passwordless tenant portal.',
      },
      {
        q: 'Does LandlordEzy ever hold my money?',
        a: 'No. The money moves from Interac to your bank. LandlordEzy only reads a copy of the notification email to update your ledger.',
      },
      {
        q: 'What happens with a partial payment?',
        a: 'It’s applied to the oldest month owing, and the rest stays on the ledger as arrears, ready for a reminder or an N4.',
      },
      {
        q: 'What does it cost?',
        a: 'Automatic e-Transfer matching is part of Self Management: $9.99 a month plus $1 per door, plus HST. The Free plan includes rent tracking for up to two tenants.',
      },
    ],
    related: ['rent-reporting', 'notices', 'tenant-screening'],
  },
  {
    slug: 'tenant-screening',
    nav: 'Tenant screening',
    title: 'Tenant Screening & Equifax Credit Checks | LandlordEzy',
    description:
      'Free pre-screening, then a real Equifax report with an AI recommendation from $29.99. ID and bank-statement checks $10 each. The applicant can pay.',
    eyebrow: 'Tenant screening',
    job: 'Choosing between applicants?',
    priceLine: 'Pre-screening free · Equifax credit check $29.99 · The applicant can pay',
    h1: 'Know who you’re renting to.',
    lead: 'Start with a free pre-screening link. When you’re ready, run a real Equifax credit report with an AI recommendation, from $29.99. Add identity and bank-statement checks for $10 each.',
    visual: 'screening',
    stepsTitle: 'Three steps to a confident yes.',
    steps: [
      {
        title: 'Send one link.',
        body: 'Applicants fill in their own profile: income, employment, references, pets and documents. Pre-screening is free.',
      },
      {
        title: 'Run the credit check.',
        body: 'With the applicant’s consent, pull a real Equifax report. It’s a soft inquiry, so it never lowers their score.',
      },
      {
        title: 'Decide with a clear verdict.',
        body: 'AI brings credit, income and documents together into Approve, Caution or Decline, with every detail one tap away.',
      },
    ],
    highlightsTitle: 'More than a score.',
    highlights: [
      { icon: BadgeCheck, title: 'Identity, verified', body: 'Confirm the applicant is who they say they are, before anyone gets keys.' },
      { icon: Landmark, title: 'Affordability, not guesswork', body: 'AI reads up to four months of bank statements for stable income and real affordability.' },
      { icon: FileSearch, title: 'Missing documents, flagged', body: 'If a pay stub or ID is missing, you see it before you decide, and can request it in one tap.' },
      { icon: Users, title: 'The applicant can pay', body: 'Turn on Tenant Pays and the applicant covers the check. Credit it toward their first month if you approve them.' },
      { icon: Share2, title: 'Share it securely', body: 'Send the finished report to a co-signer, partner or property manager with a secure link.' },
      { icon: Fingerprint, title: 'Reports you can verify', body: 'Each report carries a unique ID and stays valid for three months, so an edited PDF or a screenshot is easy to spot.' },
    ],
    planNote: (
      <>
        Pre-screening is free on every plan, and every check is priced below. Want to see what you get?{' '}
        <a href={site.app.sampleReport} rel="noopener">
          See a sample report
        </a>
      </>
    ),
    faqs: [
      {
        q: 'Does a credit check hurt the applicant’s score?',
        a: 'No. LandlordEzy credit checks are soft inquiries, which don’t affect credit scores, so applicants can apply to several places without penalty.',
      },
      {
        q: 'How much does screening cost?',
        a: 'Pre-screening is free. The AI credit check with a full Equifax report is $29.99, and you add only the checks each application needs. You or the applicant can pay.',
      },
      {
        q: 'What can a landlord ask an applicant for in Ontario?',
        a: 'Ontario’s Human Rights Code regulations let landlords ask for rental history, credit references and permission to run a credit check, and to consider income information together with those, not on its own. Decisions can’t be based on protected grounds, including receiving public assistance. This is general information, not legal advice.',
      },
      {
        q: 'Does it work outside Ontario?',
        a: 'Yes. Pre-screening and Equifax credit checks work in every province. Ontario-only checks are labelled as such.',
      },
    ],
    related: ['listings', 'leases', 'rent-reporting'],
  },
  {
    slug: 'rent-reporting',
    nav: 'Rent reporting',
    title: 'Report Rent to Equifax for Your Tenants | LandlordEzy',
    description:
      'Report on-time rent to Equifax so good tenants build credit and everyone has a reason to pay on the first. Consent handled for you. Included in Self Management.',
    eyebrow: 'Rent reporting',
    job: 'Want rent paid on the first?',
    priceLine: 'Included in Self Management: $9.99/month + $1 a door',
    h1: 'Reward the tenants who pay on time.',
    lead: 'Rent is most tenants’ biggest bill, yet it rarely builds their credit. LandlordEzy reports it to Equifax every month, so on-time tenants build credit and everyone has a reason to pay on the first.',
    visual: 'reporting',
    stepsTitle: 'Reporting that runs itself.',
    steps: [
      {
        title: 'Your tenant opts in.',
        body: 'Tenants consent once through a secure, no-login link, or when they sign the lease. Consent stays on file until they withdraw it.',
      },
      {
        title: 'Your ledger does the work.',
        body: 'LandlordEzy builds the monthly Equifax file from the rent you already track. No double entry.',
      },
      {
        title: 'Credit builds, month by month.',
        body: 'Each on-time payment strengthens your tenant’s credit file and their Rental Report Card.',
      },
    ],
    highlightsTitle: 'Good for tenants. Good for you.',
    highlights: [
      { icon: TrendingUp, title: 'Good tenants build credit', body: 'For Canadians with thin credit files, a record of on-time rent can be the strongest proof they’re reliable.' },
      { icon: CalendarCheck, title: 'A reason to pay on the first', body: 'When rent counts toward credit, tenants make it a priority, and the first of the month stops being a guessing game.' },
      { icon: FileCheck2, title: 'Consent, on file and up to date', body: 'On-time reporting needs the tenant’s consent. LandlordEzy records it, and asks again if the wording ever changes.' },
      { icon: Scale, title: 'Arrears, on the record', body: 'Reporting on-time rent needs the tenant’s consent. Reporting unpaid rent as a debt doesn’t. An accurate ledger keeps the record fair to both of you.' },
      { icon: Award, title: 'Rental Report Card', body: 'Every on-time month builds a tenant’s verifiable rental record that they own and can share with their next landlord.' },
      { icon: Repeat, title: 'Monthly, automatically', body: 'Submissions go to Equifax every month from your ledger. You keep the ledger current; LandlordEzy handles the file.' },
    ],
    planNote: (
      <>
        Included for all your tenants in Self Management, from $9.99 a month plus $1 per door.{' '}
        <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      {
        q: 'Does the tenant have to agree?',
        a: 'For on-time (positive) reporting, yes. Consent is captured once and stays active until the tenant withdraws it. Reporting unpaid rent as a debt doesn’t require consent.',
      },
      { q: 'Which credit bureau do you report to?', a: 'Equifax Canada, every month.' },
      {
        q: 'Can late payments hurt a tenant’s credit?',
        a: 'Yes. On-time payments help build credit; late or missed payments may lower it. That’s exactly why tenants pay attention.',
      },
      {
        q: 'What does it cost?',
        a: 'Rent reporting for all your tenants is included in Self Management: $9.99 a month plus $1 per door, plus HST.',
      },
    ],
    related: ['rent-collection', 'tenant-screening', 'notices'],
  },
  {
    slug: 'notices',
    nav: 'N4 & N1 notices',
    title: 'N4 & N1 Notices in 60 Seconds, Bill 60-Ready | LandlordEzy',
    description:
      'Prepare a correct Ontario N4 in under a minute: filled from your ledger, with the 7-day termination date and a Certificate of Service. Automate N1 rent increases too.',
    eyebrow: 'Notices & LTB forms',
    job: 'Tenant hasn’t paid?',
    priceLine: 'N4 and N1 included in Self Management: $9.99/month + $1 a door',
    h1: 'The N4, in 60 seconds.',
    lead: 'LandlordEzy fills the N4 from your rent ledger, calculates the arrears and the 7-day termination date, and generates the Certificate of Service. No drafting, no arithmetic, no paralegal bill for the paperwork.',
    visual: 'n4',
    stepsTitle: 'From missed rent to served notice.',
    steps: [
      { title: 'Rent is missed.', body: 'A morning alert tells you exactly who owes what, and for which months.' },
      {
        title: 'Review and e-sign.',
        body: 'The N4 arrives pre-filled from the ledger: rent periods, amounts, the total and the earliest termination date for how you’ll serve it.',
      },
      { title: 'Serve it with proof.', body: 'Serve the notice and keep the Certificate of Service on the tenant’s file, ready if you need to file an L1.' },
    ],
    highlightsTitle: 'The mistakes that void notices, designed out.',
    highlights: [
      { icon: Calculator, title: 'Arrears, calculated', body: 'Every rent period, charged and paid, comes straight from the ledger. No arithmetic errors.' },
      {
        icon: CalendarClock,
        title: 'The right date, every time',
        body: 'Termination dates account for how you serve: in person, by courier (+1 business day) or by mail (+5 days).',
      },
      { icon: ClipboardCheck, title: 'Certificate of Service', body: 'Generated with every notice, so your proof of service is ready on day one.' },
      { icon: Scale, title: 'A paralegal if it’s contested', body: 'If the tenant disputes it, book a free 15-minute call with the licensed paralegal team, or hand them the file.' },
      { icon: Mail, title: 'Serve by email, with consent', body: 'Tenants e-sign consent to email service once. Then N1s and entry notices go out by email, with proof on file.' },
      { icon: History, title: 'Always the current rules', body: 'Notices follow the forms and rules in force on the day you serve, including Bill 60.' },
    ],
    planNote: (
      <>
        Automated N4 and N1 notices are included in Self Management, from $9.99 a month plus $1 per door.{' '}
        <a href={url('tools/n4-date-calculator/')}>Try the free N4 date calculator</a>
      </>
    ),
    faqs: [
      {
        q: 'Can I serve an N4 myself, without a paralegal?',
        a: (
          <>
            Yes. Landlords can prepare and serve their own N4. LandlordEzy removes the arithmetic and date mistakes that most often
            get notices thrown out. For contested hearings, <a href={url('legal-help/')}>licensed paralegals can represent you</a>.
          </>
        ),
        aText:
          'Yes. Landlords can prepare and serve their own N4. LandlordEzy removes the arithmetic and date mistakes that most often get notices thrown out. For contested hearings, licensed paralegals can represent you.',
      },
      {
        q: 'How many days does an N4 give the tenant now?',
        a: 'For notices given on or after September 21, 2026, the termination date must be at least 7 days after you give the notice, not counting that day. Add one business day if you courier it and five days if you mail it.',
      },
      { q: 'Can the tenant cancel the N4?', a: 'Yes. If the tenant pays everything owing by the termination date, the notice is void.' },
      {
        q: 'What is the 2027 rent increase guideline?',
        a: '1.9% for increases that take effect between January 1 and December 31, 2027. Units first occupied as residential units after November 15, 2018 are generally exempt from the guideline, but still need 90 days’ notice and 12 months between increases.',
      },
    ],
    related: ['rent-collection', 'legal-help', 'leases'],
  },
  {
    slug: 'leases',
    nav: 'Leases & inspections',
    title: 'Ontario Standard Lease with E-Signature | LandlordEzy',
    description:
      'Create the Ontario Standard Lease, check it with AI and e-sign with your tenant from any device. Add photo move-in inspections your tenant approves.',
    eyebrow: 'Leases & inspections',
    job: 'New tenant moving in?',
    priceLine: 'E-lease included in Self Management: $9.99/month + $1 a door · Move-in inspections on every plan',
    h1: 'Sign the Ontario lease from anywhere.',
    lead: 'Build the Ontario Standard Lease in minutes, let AI check it for missing details, and collect signatures on any device. Then document the unit with a move-in inspection your tenant approves.',
    visual: 'lease',
    stepsTitle: 'From handshake to signed lease.',
    steps: [
      { title: 'Fill it once.', body: 'Rent, deposit, utilities and terms flow into the Ontario Standard Lease. AI can fill it from an existing draft.' },
      { title: 'Check before anyone signs.', body: 'Preview the lease and let AI flag missing fields, so nothing has to be re-signed.' },
      { title: 'Sign anywhere.', body: 'Landlord and tenants sign from any device, joint tenants included. The signed copy is filed with the tenancy.' },
    ],
    highlightsTitle: 'Paperwork that protects you later.',
    highlights: [
      { icon: Signature, title: 'Built-in e-signature', body: 'No PDFs, printers or third-party signing tools. Recall a lease to edit it before everyone has signed.' },
      { icon: Camera, title: 'Move-in inspections', body: 'Photograph each room, send the report for your tenant to approve, and keep dated proof of the unit’s condition.' },
      { icon: Images, title: 'Reuse your listing photos', body: 'Turn the photos and video from your listing into a move-in inspection in a couple of clicks.' },
      { icon: Zap, title: 'Utilities, settled', body: 'Record who pays gas, hydro and water. It flows onto the lease, so responsibility is never in question.' },
      { icon: UserCheck, title: 'Deposits, verified', body: 'Request the first month’s rent, the last month’s rent deposit and a key deposit by e-Transfer, and mark each one verified.' },
      { icon: ShieldCheck, title: 'Stored securely', body: 'Leases, inspections and documents live with the tenant, available whenever you need them.' },
    ],
    planNote: (
      <>
        E-leases are included in Self Management, from $9.99 a month plus $1 per door. Move-in and move-out inspections are on
        every plan.{' '}
        <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      {
        q: 'Do I have to use the Ontario Standard Lease?',
        a: (
          <>
            For most residential tenancy agreements signed on or after April 30, 2018, yes. Care homes, most social and supportive
            housing, co-operatives and a few other tenancies are exempt. See the {ext(site.official.standardLease, 'province’s guide')}.
          </>
        ),
        aText:
          'For most residential tenancy agreements signed on or after April 30, 2018, yes. Care homes, most social and supportive housing, co-operatives and a few other tenancies are exempt.',
      },
      {
        q: 'Can the lease be signed electronically?',
        a: 'Yes. The province’s guide to the Standard Lease says the landlord and tenant can sign electronically if they both agree.',
      },
      {
        q: 'Why does a move-in inspection matter?',
        a: 'If there’s ever a damage dispute, a dated, photo-backed record that the tenant acknowledged is exactly the evidence you’ll want at the Landlord and Tenant Board.',
      },
    ],
    related: ['tenant-screening', 'maintenance', 'notices'],
  },
  {
    slug: 'listings',
    nav: 'Listings & placement',
    title: 'Free Rental Listings & Flat-Fee MLS® | LandlordEzy',
    description:
      'List your vacancy free on EzyRent with pre-screening and self-booked showings, or go on REALTOR.ca for a flat $549 + HST with a Legal Guarantee included.',
    eyebrow: 'Listings & tenant placement',
    job: 'Unit sitting empty?',
    priceLine: 'EzyRent listings free on every plan · Flat-fee MLS® from $549 + HST',
    cta: { label: 'List a rental free', href: site.app.ezyrentList },
    secondary: { label: 'Compare the three ways to list', href: '#options' },
    band: { primary: { label: 'List a rental free', href: site.app.ezyrentList } },
    h1: 'Fill your vacancy faster.',
    lead: 'With more vacancies on the market, speed matters. List free on EzyRent and meet only pre-screened renters, or put your unit on REALTOR.ca and the MLS® system for one flat fee.',
    visual: 'listing',
    stepsTitle: 'From vacancy to signed lease.',
    steps: [
      { title: 'List in minutes.', body: 'Post free on EzyRent. AI can import a listing from a PDF or screenshot and polish the description.' },
      { title: 'Meet serious renters.', body: 'Every applicant passes through pre-screening, and showings book themselves with “on my way” confirmations.' },
      { title: 'Move them into a lease.', body: 'Screen, sign the Ontario Standard Lease and collect deposits without retyping a thing.' },
    ],
    highlightsTitle: 'Less time on no-shows. More on good tenants.',
    highlights: [
      { icon: MapPinned, title: 'Free, map-based listings', body: 'Unlimited listings on every plan, discoverable by renters across Canada.' },
      { icon: CalendarCheck, title: 'Showings that book themselves', body: 'Renters pick a time, get reminders and confirm they’re on the way.' },
      { icon: AlertTriangle, title: 'No-show protection', body: 'Report a no-show and a three-strike rule keeps repeat time-wasters off your calendar.' },
      { icon: ScanLine, title: 'For-rent sign with a QR code', body: 'Print a yard sign that sends passers-by straight to your listing.' },
      { icon: Sparkles, title: 'AI listing tools', body: 'Polish your description and copy it to Kijiji and Facebook Marketplace in a tap.' },
      { icon: Star, title: 'Flat-fee MLS® listing', body: 'REALTOR.ca exposure for one flat fee from $549 + HST, no commission, with a Legal Guarantee.' },
    ],
    planNote: (
      <>
        EzyRent listings are free on every plan. MLS® listings and full-service placement are provided by List It Realty Brokerage
        Inc. <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      { q: 'Is listing on EzyRent really free?', a: 'Yes. Listings are free and unlimited on every plan, including Free.' },
      {
        q: 'What is a flat-fee MLS® listing?',
        a: 'Instead of paying a commission, you pay one flat fee to have your rental listed on REALTOR.ca and the MLS® system for 12 months. You keep control and choose your own tenant.',
      },
      {
        q: 'What does the Legal Guarantee cover?',
        a: 'Non-payment of rent: the team prepares and files the N4 and L1, represents you at the Landlord and Tenant Board and coordinates re-listing. Coverage is 3 months with the $549 listing or 12 months with the $749 listing. Report missed rent within 5 days and use LandlordEzy for rent tracking to stay eligible. Damage, maintenance disputes and government fees are not covered.',
      },
      {
        q: 'Can a REALTOR® handle everything?',
        a: 'Yes. Full-service tenant placement is one month’s rent plus HST, paid when the tenant is placed, and includes a 12-month placement guarantee and a 12-month Legal Guarantee.',
      },
    ],
    related: ['tenant-screening', 'leases', 'legal-help'],
  },
  {
    slug: 'maintenance',
    nav: 'Maintenance & compliance',
    title: 'Maintenance, Fire Safety & Expenses | LandlordEzy',
    description:
      'Turn a repair request into a coordinated job in one tap, run Ontario Fire Code inspections from your phone, and scan receipts with AI. For landlords and managers.',
    eyebrow: 'Maintenance & compliance',
    job: 'Something needs fixing?',
    priceLine: 'Included in Self Management: $9.99/month + $1 a door',
    h1: 'Repairs, dispatched in one tap.',
    lead: 'A tenant reports a leak. Tick what you need (their availability, a vendor and, if you manage for an owner, the owner’s approval) and one tap sends it. LandlordEzy notifies everyone with one shared link, tracks photos and costs, and posts the bill.',
    visual: 'maintenance',
    stepsTitle: 'All those phone calls, down to one tap.',
    steps: [
      { title: 'The tenant reports it.', body: 'Requests arrive with photos, straight from the tenant portal.' },
      { title: 'One tap dispatches it.', body: 'Tenant, owner and vendor are notified together and share one live link. Vendors don’t need an account.' },
      { title: 'The bill files itself.', body: 'Costs and photos are tracked, and the bill posts to the owner statement or your expense tracker.' },
    ],
    highlightsTitle: 'The busywork of owning rentals, handled.',
    highlights: [
      { icon: Wrench, title: 'Vendors you can rank', body: 'Rate vendors after each job. Bad ones go on a do-not-call list and quietly disappear from your picks.' },
      { icon: FolderDown, title: 'Year-end, ready for your accountant', body: 'Export a clean PDF or CSV of expenses by property, ready for tax time.' },
      { icon: NotebookPen, title: 'Team notes', body: 'Notes on every property, tenant and job, so everyone on your team knows the history.' },
      { icon: ScanLine, title: 'Receipts read by AI', body: 'Snap a receipt; AI reads the vendor, amount and date and files it to the right property for tax time.' },
      { icon: CalendarClock, title: 'One shared calendar', body: 'Inspections, renewals and tasks in one place, subscribable in Outlook, Google or Apple Calendar.' },
      { icon: Megaphone, title: 'Message everyone at once', body: 'Email and text a building, a portfolio or every tenant at once, with a delivery log.' },
    ],
    planNote: (
      <>
        Maintenance work orders, fire safety inspections and unlimited receipt scanning are included in Self Management.{' '}
        <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      { q: 'Do vendors need a LandlordEzy account?', a: 'No. They get a text with a live link to the job, and that’s it.' },
      {
        q: 'What does the fire safety inspection cover?',
        a: 'The common Ontario Fire Code items for rental units: smoke and carbon monoxide alarms, extinguishers, exits and more, with a photo for each item and a PDF report you can keep on file.',
      },
      { q: 'Can I export expenses for my accountant?', a: 'Yes. Export a clean PDF or CSV of expenses by property at year end.' },
    ],
    related: ['leases', 'ezy-ai', 'rent-collection'],
  },
  {
    slug: 'ezy-ai',
    nav: 'Ezy AI',
    title: 'Ezy AI: Tenant Notices in Plain English | LandlordEzy',
    description:
      'Ezy drafts the notice or letter from the tenancy’s real details, sends it for you, and shows you when the tenant opens it.',
    eyebrow: 'Ezy AI',
    job: 'Need a notice or a letter?',
    priceLine: 'Ezy AI: $9.99/month + $1 a door with code AI20 (reg. $29.99) · 3 free drafts a month with Self Management',
    h1: 'Tell Ezy what you need.',
    lead: 'Ezy lives on every tenant profile and already knows the tenancy. Ask in plain English and it drafts the notice or letter, sends it to your tenant, and shows you the moment it’s opened.',
    visual: 'ezy',
    stepsTitle: 'A notice in 30 seconds.',
    steps: [
      { title: 'Ask in plain English.', body: '“Draft a 24-hour notice. The plumber is coming Thursday afternoon.”' },
      { title: 'Review the draft.', body: 'Names, address and dates come from the tenancy record, and the draft cites the section of the Act it relies on. You check it before it goes.' },
      { title: 'Send and see it opened.', body: 'One tap sends it by text, and by email once your tenant has agreed to email service. No tenant login, and a clean delivery record.' },
    ],
    highlightsTitle: 'Your assistant on every tenant profile.',
    highlights: [
      { icon: CalendarClock, title: '24-hour entry notices', body: 'Repairs, inspections and showings, with the right date window and reason.' },
      { icon: FileText, title: 'Letters that sound professional', body: 'Garbage, pets, parking or noise: a firm, polite letter in seconds.' },
      { icon: Wallet, title: 'Rent reminders that know the numbers', body: 'Ezy knows what’s owed and for which period, so reminders are always accurate.' },
      { icon: Send, title: 'A delivery record on file', body: 'Sent, opened and acknowledged, timestamped on the tenant’s file. Email service needs the tenant’s consent first.' },
      { icon: Sparkles, title: 'It already knows the tenancy', body: 'Rent, dates, the unit and its history come from the tenant profile, so you never retype them.' },
      { icon: ShieldCheck, title: 'You stay in control', body: 'Ezy drafts. You review and send. Nothing goes out without you.' },
    ],
    planNote: (
      <>
        Ezy AI is $29.99 a month plus $1 per door, or $9.99 with code AI20 for as long as you stay subscribed. Self Management
        includes three free drafts a month. <a href={url('pricing/')}>See pricing</a>
      </>
    ),
    faqs: [
      { q: 'Is Ezy giving me legal advice?', a: 'No. Ezy drafts documents and answers general questions. For advice on your specific situation, talk to a licensed paralegal.' },
      { q: 'Will it send anything without me?', a: 'No. Ezy drafts for your review. You decide what goes out and when.' },
      {
        q: 'What does Ezy AI cost?',
        a: '$29.99 a month plus $1 per door, or $9.99 a month plus $1 per door with code AI20, locked in for as long as you stay subscribed. Self Management includes three free drafts a month, and Ask Ezy answers three questions a day free.',
      },
      {
        q: 'How is Ask Ezy different from Ezy AI?',
        a: 'Ask Ezy answers Ontario landlord-tenant questions and is free to try. Ezy AI works inside your account, on each tenant profile, and drafts and sends notices and letters.',
      },
    ],
    related: ['notices', 'maintenance', 'legal-help'],
  },
  {
    slug: 'legal-help',
    nav: 'Legal help',
    title: 'Paralegal Help & Legal Guarantee for Landlords | LandlordEzy',
    description:
      'Talk to a licensed Ontario paralegal free for 15 minutes. Then hand off rent and notices with VirtualPM Legal Shield, or prepare for a hearing with CaseBuilder.',
    eyebrow: 'Legal help',
    job: 'Heading to the Board?',
    priceLine: 'Free 15-minute call · Paralegal time $75 an hour · Legal Shield from $49 a month',
    cta: { label: 'Book a free call', href: site.app.book },
    secondary: { label: 'Ask Ezy a question free', href: site.app.askEzy },
    noteTail: null,
    band: {
      title: 'Talk it through with a paralegal.',
      lead: 'The first 15 minutes are free: your tenant, your notice or your case, with the licensed paralegal team.',
      primary: { label: 'Book a free call', href: site.app.book },
      secondary: { label: 'Ask Ezy a question free', href: site.app.askEzy },
      fine: 'No obligation · Licensed Ontario paralegals · LandlordEzy is not a law firm',
    },
    h1: 'A paralegal team, one tap away.',
    lead: 'Software handles the routine. When a tenancy turns into a Landlord and Tenant Board matter, LandlordEzy connects you with licensed Ontario paralegals who handle these files every day.',
    visual: 'casebuilder',
    stepsTitle: 'Help at every level.',
    steps: [
      { title: 'Ask.', body: 'Ask Ezy answers general Ontario landlord-tenant questions in plain English, three a day free.' },
      { title: 'Talk to a person.', body: 'Book a free 15-minute strategy call with the licensed paralegal team about your tenant, notice or case.' },
      { title: 'Hand it off.', body: 'Buy blocks of paralegal time, or let VirtualPM Legal Shield run rent collection and notices for you.' },
    ],
    highlightsTitle: 'Everything between a question and a hearing.',
    highlights: [
      { icon: PhoneCall, title: 'Free strategy call', body: '15 minutes with the licensed paralegal team about your tenant, your notice or your case. No obligation.' },
      { icon: ShieldCheck, title: 'VirtualPM Legal Shield', body: 'From $49 a month plus $6 a door: rent collected by electronic funds transfer, an N4 on the 5th if rent is unpaid, a 30-minute monthly paralegal consult and $100 off a flat-fee MLS® listing.' },
      { icon: Scale, title: 'Legal Guarantee', body: 'N4, L1 and LTB representation for non-payment of rent, included with flat-fee MLS® listings.' },
      { icon: Landmark, title: 'Paralegal time blocks', body: 'Three- and twelve-hour blocks at $75 an hour for paid members, usable across tenant files. Unused hours never expire.' },
      { icon: FileSearch, title: 'CaseBuilder', body: 'Describe your matter and see how the Board decided similar cases, wins and losses, with the reasons.' },
      { icon: ClipboardCheck, title: 'Hearing prep & disclosure', body: 'A page-numbered hearing pack and a one-click, tabbed disclosure bundle.' },
    ],
    planNote: (
      <>
        LandlordEzy is a technology platform, not a law firm. Legal services are provided by Landlord Pro Legal SPC, a licensed
        Ontario paralegal firm. <a href={site.app.book}>Book a free call</a>
      </>
    ),
    faqs: [
      {
        q: 'What can a three-hour block cover?',
        a: 'Support on one tenant file, such as filing an LTB application, preparing evidence and strategy, with updates and one hearing. The twelve-hour block covers more complex cases or several files.',
      },
      {
        q: 'Is there a guarantee if a paralegal makes a mistake?',
        a: 'Yes. If a paralegal error causes you to lose, you get a full refund and your next eviction handled free.',
      },
      { q: 'Do I need a paid plan for legal blocks?', a: 'Yes. Paralegal blocks are available to paid LandlordEzy members.' },
      {
        q: 'Who provides the legal services?',
        a: 'Landlord Pro Legal SPC, a licensed Ontario paralegal firm. LandlordEzy is the technology platform.',
      },
    ],
    related: ['notices', 'listings', 'ezy-ai'],
  },
]

export function featureBySlug(slug: string): Feature {
  const f = features.find((x) => x.slug === slug)
  if (!f) throw new Error(`Unknown feature: ${slug}`)
  return f
}
