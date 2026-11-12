import { ArrowUpRight, BadgeCheck, Bell, CalendarClock, Check, ChevronDown, FileSignature, Landmark, MessageSquare, MonitorSmartphone, NotebookPen, Receipt, Scale, ScrollText, UserSearch, Wallet, Wrench } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Fine, Heading, Section, type IconType } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { CollectCard, ReportingScreen } from '../components/mocks/screens'
import { OlhN4, OlhPhone } from '../components/mocks/olh'
import { shieldFaqs } from '../content/faqs'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'n4', label: 'N4 and N1' },
  { id: 'suite', label: 'The suite' },
  { id: 'rent', label: 'Your rent' },
  { id: 'reporting', label: 'Rent reporting' },
  { id: 'scope', label: 'What’s yours' },
  { id: 'faq', label: 'Questions' },
]

const E = 'https://landlordezy.ca/'

const suite: { Icon: IconType; title: string; note: string; items: { t: string; b: ReactNode; href: string }[] }[] = [
  {
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
    Icon: MessageSquare,
    title: 'Messages & organisation',
    note: 'One place for every conversation and document.',
    items: [
      { t: 'Landlord–tenant messaging and broadcasts', b: 'Message one tenant, or email and text many at once.', href: `${E}tenant-broadcast-messaging` },
      { t: 'Documents, calendar and tasks', b: 'Document storage, a shared calendar with reminders, and notes.', href: `${E}property-management-calendar` },
    ],
  },
]

export function Shield() {
  return (
    <>
      <ChapterNav title="OLH Landlord Shield" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <section id="overview" data-hero className="relative overflow-hidden bg-white pb-14 pt-8 sm:pt-14 lg:pb-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow">OLH Landlord Shield · from $49 a month</p>
            <h1 className="mt-3 text-display-xl">Self-manage, with a team behind you.</h1>
            <p className="mx-auto mt-5 max-w-[38rem] text-lead text-ink-3 lg:mx-0">
              For owners who look after their own tenants. The full LandlordEzy Automation Suite, Equifax rent reporting, a rent ledger
              our team checks every month, and a licensed paralegal to talk to. Month-to-month from the start.
            </p>
            <div className="mt-7">
              <Actions
                align="split"
                primary={{ label: 'Book a 15-minute call', href: site.live.book }}
                secondary={{ label: 'Price my portfolio', href: url('pricing/') }}
                note="$49 first tenancy · $29 each additional · Any property type · Plus HST"
              />
            </div>
          </div>
          <div className="hero-rise mx-auto w-full max-w-[19rem] lg:max-w-[21rem]">
            <OlhPhone />
          </div>
        </div>
        <div className="wrap">
          <ul className="mx-auto mt-14 grid max-w-[68rem] gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {[
              { Icon: MonitorSmartphone, t: 'The Automation Suite', b: 'Self Management software in your own account, for your enrolled tenancies. No separate software bill.' },
              { Icon: BadgeCheck, t: 'Ledger checked monthly', b: 'Payments matched by the software and checked by our team, with a monthly statement.' },
              { Icon: Scale, t: 'A paralegal to talk to', b: 'One 15-minute consultation per owner account each month, by appointment. Advice, not representation.' },
              { Icon: Landmark, t: 'Member case from $995', b: 'One qualifying new non-payment case through one hearing, in any rolling 12 months. No waiting period.' },
            ].map(({ Icon, t, b }) => (
              <li key={t} className="tile p-6" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h2 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</h2>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- N4 ---------------------------------------------------------------- */}
      <section id="n4" aria-labelledby="n4-title" className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-28">
        <div className="glow-blue pointer-events-none absolute -left-40 top-0 h-[40rem] w-[40rem] opacity-60" aria-hidden />
        <div className="wrap relative">
          <div className="mx-auto max-w-[46rem] text-center" data-reveal>
            <p className="eyebrow-dark">N4 and N1, included</p>
            <h2 id="n4-title" className="mt-3 text-display-lg !text-white">
              From missed rent to a served N4.
            </h2>
            <p className="mx-auto mt-5 max-w-[38rem] text-lead text-white/70">
              LandlordEzy fills the official N4 from your rent ledger and works out the arrears, so you can prepare one in around 60
              seconds when your ledger is accurate. No OLH drafting fee for notices you prepare yourself.
            </p>
          </div>
          <div className="mt-14 grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <ol className="space-y-3">
              {[
                { Icon: Bell, t: 'Rent is missed', b: 'You get a rent-unpaid alert, and the arrears are already in your ledger.' },
                { Icon: NotebookPen, t: 'Review the auto-filled N4', b: 'Periods, amounts and the termination date come from your ledger. Check every detail before you sign.' },
                { Icon: FileSignature, t: 'E-sign and serve', b: 'Serve by a method the rules allow; email only with the tenant’s written consent. LandlordEzy generates the Certificate of Service.' },
                { Icon: CalendarClock, t: 'Filing reminders', b: 'Reminders around the termination and filing dates, so the next step isn’t missed.' },
                { Icon: Scale, t: 'Optional: the L1 and the hearing', b: 'If the tenant doesn’t pay, ask for our licensed paralegals at the member case rate from $995 + HST and disbursements, if eligible. No upgrade required.' },
              ].map(({ Icon, t, b }, idx) => (
                <li key={t} className="flex gap-4 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-glow">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[1.125rem] font-semibold text-white">{t}</span>
                    <span className="mt-1 block text-[0.9375rem] text-white/70">{b}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+5rem)]">
              <OlhN4 className="mx-auto w-full max-w-[34rem]" dark />
              <p className="mt-3 text-center text-[0.75rem] text-white/50">Illustration with sample figures, not a real tenancy.</p>
              <div className="mx-auto mt-6 max-w-[34rem] rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                <p className="text-[0.8125rem] font-semibold text-brand-glow">Also included · N1 rent increase</p>
                <p className="mt-1.5 text-[0.9375rem] text-white/75">
                  The new rent and earliest legal effective date are pre-filled. You e-sign and serve, and the increase applies to your
                  rent ledger on its effective date.{' '}
                  <a href={site.ezy.n1} className="text-brand-glow underline" rel="noopener">
                    How N1 works
                  </a>
                </p>
              </div>
            </div>
          </div>
          <p className="mx-auto mt-12 max-w-[50rem] text-center text-[0.8125rem] leading-relaxed text-white/55">
            LandlordEzy is software: it doesn’t guarantee a notice is valid, serve paper notices for you or file at the LTB, and no
            eviction timeline is promised. Professional review, service or representation is a separate paid service.{' '}
            <a href={site.ezy.n4} className="text-white/75 underline" rel="noopener">
              How the N4 tool works
            </a>
          </p>
        </div>
      </section>

      {/* ---- The suite ------------------------------------------------------------ */}
      <Section id="suite" tone="alt" labelledBy="suite-title">
        <div className="wrap">
          <Heading
            id="suite-title"
            eyebrow="The LandlordEzy Automation Suite"
            title="Everything, in your own account."
            lead="Software we built and own, included with Landlord Shield. Run rent, notices, screening, leases, inspections, maintenance and messages yourself, with our team checking your rent ledger every month."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suite.map((g) => (
              <details key={g.title} className="suite-group" open data-fold-mobile data-reveal>
                <summary className="flex items-start gap-4">
                  <span className="icon-badge shrink-0">
                    <g.Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.01em]">{g.title}</h3>
                      <span className="chip-gray shrink-0">{g.items.length}</span>
                    </span>
                    <span className="mt-1 block text-[0.875rem] text-ink-3">{g.note}</span>
                  </span>
                  <ChevronDown className="fold-icon mt-3 h-4 w-4 shrink-0 text-ink-3 md:hidden" aria-hidden />
                </summary>
                <ul className="mt-5 divide-y divide-line-soft">
                  {g.items.map((it) => (
                    <li key={it.t} className="py-3">
                      <a href={it.href} className="suite-item" rel="noopener">
                        {it.t} <ArrowUpRight className="inline h-3.5 w-3.5 opacity-50" aria-hidden />
                      </a>
                      <p className="mt-0.5 text-[0.875rem] leading-snug text-ink-3">{it.b}</p>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <Fine className="mx-auto mt-8 max-w-[56rem] text-center">
            Included with OLH Landlord Shield as LandlordEzy Self Management, with no separate software bill. Paid extras aren’t
            included: Equifax credit reports, unlimited Ezy AI drafting, CaseBuilder research and the property-manager CRM. LandlordEzy
            runs in your browser today and tenants use the tenant portal; a mobile app is planned for January 2027.
          </Fine>
        </div>
      </Section>

      {/* ---- How rent is handled ---------------------------------------------- */}
      <Section id="rent" labelledBy="rent-title">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Your rent</p>
            <h2 id="rent-title" className="mt-3 text-display-md">
              Paid to your bank. Checked by our team.
            </h2>
            <ol className="mt-8 space-y-6">
              {[
                { t: 'Rent is paid directly to your bank', b: 'Your tenant pays by Interac e-Transfer into your own account. Timing is set by your bank and the payment.' },
                { t: 'LandlordEzy matches it', b: 'The software reads your bank’s deposit notice and suggests the ledger entry. Reminders and confirmations go out automatically.' },
                { t: 'Our team checks it', b: 'We review your payment records, approve entries and correct them where needed.' },
                { t: 'Monthly review and statement', b: 'Each month we review your rent ledger, send your statement and tell you plainly about any balance owing.' },
              ].map((s, idx) => (
                <li key={s.t} className="flex gap-4" data-reveal>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <span>
                    <span className="block font-display text-[1.1875rem] font-semibold tracking-[-0.01em]">{s.t}</span>
                    <span className="mt-1 block text-ink-3">{s.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex justify-center rounded-5xl bg-canvas-alt p-8 sm:p-12" data-reveal>
            <CollectCard className="w-full max-w-[26rem]" />
          </div>
        </div>
      </Section>

      {/* ---- Rent reporting ------------------------------------------------------ */}
      <Section id="reporting" tone="alt" labelledBy="reporting-title">
        <div className="wrap">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <p className="eyebrow">Included · Equifax rent reporting</p>
              <h2 id="reporting-title" className="mt-3 text-display-md">
                Rent reporting to Equifax, every month.
              </h2>
              <p className="mt-5 text-lead text-ink-3">
                On-time rent can help your tenants build credit history. When rent goes unpaid, it can be reported as a delinquency
                where the program permits. LandlordEzy runs the monthly workflow, with no extra reporting subscription.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-5 shadow-card">
                  <p className="chip-go">Paying on time</p>
                  <p className="mt-3 text-[0.9375rem] text-ink-2">Positive reporting can help a tenant build credit history. It may need the tenant’s consent, which LandlordEzy requests for you.</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-card">
                  <p className="chip-warn">Rent unpaid</p>
                  <p className="mt-3 text-[0.9375rem] text-ink-2">Arrears may be reported as a delinquency where permitted, subject to the program’s accuracy, verification and consent rules.</p>
                </div>
              </div>
            </div>
            <ReportingScreen className="mx-auto w-full max-w-[34rem]" />
          </div>
          <ol className="mx-auto mt-14 grid max-w-[72rem] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Register the tenant and lease', b: 'Add the tenancy in your LandlordEzy account.' },
              { t: 'Keep the ledger current', b: 'Payments and balances recorded each month; our team checks your ledger.' },
              { t: 'Consent and verification', b: 'LandlordEzy handles the consent request and verification steps that apply.' },
              { t: 'Monthly submission', b: 'Eligible, completed records are submitted each month. Figures known to be wrong or in dispute wait until they’re resolved.' },
            ].map((s, idx) => (
              <li key={s.t} className="tile-white p-6" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{s.b}</p>
              </li>
            ))}
          </ol>
          <Fine className="mx-auto mt-8 max-w-[56rem] text-center">
            Reporting doesn’t guarantee payment or any change to a credit score, and it doesn’t replace an N4 or resolve an eviction.
            Rent reporting is different from tenant credit checks: Equifax credit reports for screening cost from $29.99 each and aren’t
            included.{' '}
            <a href={site.ezy.reporting} rel="noopener">
              Read the rent reporting guide
            </a>
          </Fine>
        </div>
      </Section>

      {/* ---- What's included vs yours ------------------------------------------ */}
      <Section id="scope" labelledBy="scope-title">
        <div className="wrap">
          <Heading id="scope-title" eyebrow="Clear lines" title="What we do. What stays with you." size="md" />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile p-7 sm:p-9" data-reveal>
              <h3 className="text-title">Included</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {[
                  'The LandlordEzy Automation Suite for your enrolled tenancies, with no separate software charge',
                  'N4 and N1 notices you prepare, sign and serve yourself, with no OLH drafting fee',
                  'Equifax rent reporting for enrolled tenancies',
                  'Rent payment setup, automated reminders and payment matching',
                  'Payment records checked by our team, with corrections where needed',
                  'Factual notice to you of any rent owing',
                  'Monthly ledger review and statement, and help with rent-ledger questions',
                  'Member legal access: a monthly paralegal consultation, and a member case price',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-line p-7 sm:p-9" data-reveal>
              <h3 className="text-title">Yours to handle, or quoted</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem] text-ink-3">
                {[
                  'Tenant communication, maintenance and decisions about arrears stay with you',
                  'You serve your own notices; we don’t chase arrears with your tenants. Professional review, service or representation is quoted, or a member case for an L1 if eligible',
                  'Site visits are booked as needed at the standard visit price; tenant placement is separate',
                  'Payments made another way are recorded from records you provide',
                  'Bringing in an older or incomplete ledger is quoted separately',
                  'Support covers rent-payment and ledger questions; other landlord advice is quoted',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-4" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-5 grid max-w-[64rem] gap-5 md:grid-cols-2">
            <div className="rounded-4xl bg-canvas-alt p-7" data-reveal>
              <Receipt className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-3 font-display text-[1.125rem] font-semibold">If you cancel</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">
                Shield ends at the end of your paid month, and the included software access ends with it. Your LandlordEzy account and
                records stay yours; choosing a paid software plan is up to you, and nothing is billed automatically.
              </p>
            </div>
            <div className="rounded-4xl bg-brand-soft p-7" data-reveal>
              <BadgeCheck className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-3 font-display text-[1.125rem] font-semibold">On Property Management today?</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink-2">
                Ready to manage it yourself? Keep the team behind you. Move to Landlord Shield instead of leaving, and we agree the change
                in writing: who your tenants contact, which responsibilities pass to you, and how any open matter is handed over.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about Shield.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={shieldFaqs} />
          <a href={url('legal/#compare')} className="link-more mt-8">
            Shield vs Legal Guarantee
          </a>
        </div>
      </Section>

      <CTABand title="Run it yourself. Keep the team behind you." lead="A 15-minute call: your units, your cities, and whether Landlord Shield fits." />
    </>
  )
}
