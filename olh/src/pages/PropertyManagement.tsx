import {
  ArrowRightLeft,
  BedDouble,
  Building2,
  Camera,
  Check,
  ChevronDown,
  ClipboardCheck,
  Hammer,
  KeyRound,
  Megaphone,
  MessageSquare,
  MonitorSmartphone,
  Scale,
  ShieldCheck,
  Store,
  Users,
  Wallet,
  Wrench,
  X,
} from 'lucide-react'
import { live, site, url } from '../site'
import { $, planByKey } from '../content/pricing'
import { notInAnyPlan } from '../content/scope'
import { managementFaqs } from '../content/faqs-property-management'
import { CTABand, FAQList, Fine, Heading, PageHero, Section, type IconType } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'included', label: 'What we handle' },
  { id: 'money', label: 'Getting paid' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'switch', label: 'Switching' },
  { id: 'addons', label: 'Add-ons' },
  { id: 'faq', label: 'Questions' },
]

/** What the plan covers, grouped as the old pricing matrix was, with its contradictions resolved the cautious way. */
const groups: { key: string; Icon: IconType; title: string; note: string; items: string[] }[] = [
  {
    key: 'rent',
    Icon: Wallet,
    title: 'Rent and money',
    note: 'Rent collected, matched to your unit and paid out to you, with a statement every month.',
    items: [
      'Rent collection, with reminders and receipts for your tenants',
      'A rent ledger kept current, with arrears tracked to the dollar',
      'Owner payouts started as soon as rent clears (see below)',
      'A monthly owner statement, and a year-end summary for tax time',
      'Equifax rent reporting, under the program’s consent rules',
      'N1 rent increase notices prepared on request',
    ],
  },
  {
    key: 'tenants',
    Icon: MessageSquare,
    title: 'Tenants',
    note: 'One point of contact for your tenants, so their calls don’t come to you.',
    items: [
      'Tenant messages through LandlordEzy, email and phone, handled during office hours',
      'An emergency line for no heat, flooding, lockouts and safety risks',
      'Welcome package and portal setup for every tenant',
      'Formal letters and notices when a rule is broken',
      'Disagreements worked through calmly, and documented',
    ],
  },
  {
    key: 'maintenance',
    Icon: Wrench,
    title: 'Maintenance',
    note: 'We coordinate the trades. You set the spending limit.',
    items: [
      'Routine maintenance coordinated, with one provider per job',
      'Urgent repairs arranged through the emergency line',
      'Spending kept within the approval limit you set',
      'Photo or video proof on every completed work order',
      'Costs shown on your statement, with the invoice on file',
    ],
  },
  {
    key: 'turnover',
    Icon: KeyRound,
    title: 'Move-ins and move-outs',
    note: 'When a tenant leaves, the next one starts on a clean record.',
    items: [
      'Applicant screening: credit, income, ID, references and an LTB order search',
      'Ontario Standard Lease prepared and e-signed',
      'Move-in and move-out coordination, with dated records',
      'Finding the tenant is separate: see the add-ons below',
    ],
  },
  {
    key: 'legal',
    Icon: Scale,
    title: 'Notices and legal',
    note: 'Licensed paralegals are part of the same team, on every plan.',
    items: [
      'Arrears follow-up and the N4 process for late rent',
      'A 15-minute consultation with a licensed paralegal every month',
      `A member case from ${$.memberCase} if a new non-payment problem reaches the LTB`,
      `Eligible new LTB work included on the Legal Guarantee, ${$.legalStep} a month more`,
    ],
  },
  {
    key: 'software',
    Icon: MonitorSmartphone,
    title: 'Software',
    note: 'LandlordEzy is the system we built and run your rental on. No separate software bill.',
    items: [
      'Your own owner portal, live all the time',
      'A tenant portal for rent, repairs and messages',
      'Leases, notices and documents stored in one place',
      'Ask Ezy for quick answers: legal information, not legal advice',
    ],
  },
]

const maintenanceSteps = [
  { Icon: MessageSquare, t: 'Your tenant reports it', b: 'Through their portal, with photos. Time-stamped from the first minute, never lost in a text thread.' },
  { Icon: ClipboardCheck, t: 'We sort and book it', b: 'Triaged by urgency and booked with a provider. Emergencies go straight to the emergency line.' },
  { Icon: Wrench, t: 'Within your limit', b: 'Jobs under your approval limit go ahead. Anything over it comes to you with a price before work is ordered.' },
  { Icon: Camera, t: 'Proof, then payment', b: 'The work order closes with photo or video proof. The cost lands on your statement with the invoice attached.' },
]

const ownerPortal = [
  'Live rent ledger and balances',
  'Monthly statements and payout history',
  'Maintenance requests with photo and video proof',
  'Signed leases, notices and documents',
  'Year-end reports',
  'Every message, in one history',
]

const tenantPortal = [
  'Rent balance, history and receipts',
  'Repair requests with photos',
  'Their lease, documents and notices',
  'Two-way messages with our team',
  'Rent reminders',
  'Answers to common questions, any time',
]

const audit = [
  'Signed leases and all addendums for every unit',
  'The rent ledger, reconciled against deposits received',
  'Last month’s rent deposits, and the interest owed on them',
  'Any open N4, N5 or LTB file, checked for validity',
  'Keys, fobs, garage remotes, lockbox and access codes',
  'Maintenance history, warranties and vendor contacts',
  'Tenant contact details and communication history',
]

export function PropertyManagement() {
  const term = planByKey('management').term
  return (
    <>
      <ChapterNav title="Property Management" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <PageHero
        eyebrow={`Property Management · from ${$.management} a month`}
        title="We run the tenancy. You see all of it."
        lead="Rent collected and paid out, tenants answered, repairs coordinated and proven, and the N4 process handled. Licensed paralegals sit on the same team, and every record lives in your owner portal."
        secondary={{ label: 'Price my portfolio', href: url('pricing/') }}
        note={`${$.management} first tenancy · ${$.managementMore} each additional · Any property type · Plus HST · No setup fee`}
      >
        <ul className="m-snap mx-auto mt-12 grid max-w-[68rem] gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Wallet, t: 'Flat monthly price', b: `From ${$.management} a month, never a percentage of your rent.` },
            { Icon: Users, t: 'Tenants handled', b: 'Messages in office hours, and an emergency line for urgent repairs.' },
            { Icon: Camera, t: 'Repairs proven', b: 'Your approval limit on spending, and photo proof before payment.' },
            { Icon: Scale, t: 'Paralegals on the team', b: 'A consultation every month, and a member case rate if rent stops.' },
          ].map(({ Icon, t, b }) => (
            <li key={t} className="tile spot p-6" data-reveal>
              <span className="icon-badge">
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</h2>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-[44rem] text-center text-[0.9375rem] text-ink-3">
          Want the legal work arranged in advance? Property Management + Legal Guarantee is {$.legalStep} a month more and includes our
          paralegals’ fees on eligible new LTB matters. <a href={url('legal/#guarantee')}>How the Legal Guarantee works</a>
        </p>
      </PageHero>

      {/* ---- What we handle ------------------------------------------------- */}
      <Section id="included" tone="alt" labelledBy="included-title">
        <div className="wrap">
          <Heading
            id="included-title"
            eyebrow="What we handle"
            title="Rent, tenants, repairs and notices."
            lead="Everything below is part of the monthly price. Where something isn’t included, we say so."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[68rem] md:mt-12" data-tabs-root>
            <TabRow name="pm" label="What Property Management includes" tabs={groups.map((g) => ({ key: g.key, label: g.title }))} className="mx-auto" />
            {groups.map((g, idx) => (
              <TabPanel key={g.key} name="pm" tab={g.key} first={idx === 0} className="mt-5">
                <div className="grid gap-8 rounded-4xl bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12 lg:rounded-5xl lg:p-12">
                  <div>
                    <span className="icon-badge">
                      <g.Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-headline">{g.title}</h3>
                    <p className="mt-3 text-ink-3">{g.note}</p>
                  </div>
                  <ul className="grid content-start gap-x-10 gap-y-4 sm:grid-cols-2">
                    {g.items.map((t) => (
                      <li key={t} className="flex gap-3 text-[0.9375rem]">
                        <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                        <span className="text-ink-2">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
            ))}
          </div>
          <div className="mx-auto mt-6 flex max-w-[68rem] gap-4 rounded-4xl bg-white p-6 shadow-card sm:p-7" data-reveal>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-canvas-alt text-ink-3">
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <p className="text-[0.9375rem] text-ink-3">
              <strong className="font-semibold text-ink">Not in the monthly price.</strong> {notInAnyPlan}
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Getting paid, and the portals ---------------------------------- */}
      <Section id="money" labelledBy="money-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[68rem] items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">How you get paid</p>
              <h2 id="money-title" className="mt-3 text-display-md">
                Paid when it clears, not on a fixed date.
              </h2>
              <p className="mt-6 text-ink-2">
                <strong className="font-semibold text-ink">How owner payouts work.</strong> OLH normally initiates an owner payout the
                same business day after the tenant payment has been received, identified, available as cleared funds, and matched and
                allocated to the authorized managed unit. For example, if November rent arrives on October 25, the payout is normally
                initiated once that payment has cleared and been matched, rather than waiting for the first of the month.
              </p>
              <p className="mt-4 text-ink-2">
                When you actually receive the funds depends on banking cut-offs and processing, weekends and holidays, correct
                remittance details, and any hold, reversal or review. Initiating a payout is not the same as the bank completing it.
              </p>
              <p className="mt-6 text-[0.9375rem] text-ink-3">Every payout and every expense shows on your monthly statement.</p>
            </div>
            <div className="rounded-5xl bg-canvas-alt p-7 sm:p-9" data-reveal>
              <h3 className="text-title">Hands-off, not in the dark.</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">Two portals in LandlordEzy, included with your plan.</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {[
                  { t: 'Your owner portal', items: ownerPortal },
                  { t: 'Your tenant’s portal', items: tenantPortal },
                ].map((p) => (
                  <div key={p.t}>
                    <p className="font-semibold text-ink">{p.t}</p>
                    <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
                      {p.items.map((t) => (
                        <li key={t} className="flex gap-2.5">
                          <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                          <span className="text-ink-2">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Maintenance ------------------------------------------------------ */}
      <Section id="maintenance" tone="alt" labelledBy="maintenance-title">
        <div className="wrap">
          <Heading
            id="maintenance-title"
            eyebrow="Maintenance"
            title="From request to receipt."
            lead="Every repair runs through one record: who asked, who was booked, what it cost and the proof it was done."
            size="md"
          />
          <ol className="steprow no-scrollbar mt-10 md:mt-12">
            {maintenanceSteps.map(({ Icon, t, b }, idx) => (
              <li key={t} className="steprow-item spot" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-8 grid max-w-[68rem] gap-4 md:grid-cols-2">
            <div className="tile-white p-6 sm:p-7" data-reveal>
              <h3 className="font-display text-[1.125rem] font-semibold">What counts as an emergency</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">
                No heat, flooding, lockouts, and anything threatening the property or tenant safety. Those go to the emergency line
                and don’t wait for office hours.
              </p>
            </div>
            <div className="tile-white p-6 sm:p-7" data-reveal>
              <h3 className="font-display text-[1.125rem] font-semibold">What we are, and aren’t</h3>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">
                We coordinate and supervise the work. Licensed trades do it, and each stays responsible for their own workmanship.
                Bigger renovation work is a separate project, quoted first.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Getting started ---------------------------------------------- */}
      <Section id="start" labelledBy="start-title">
        <div className="wrap">
          <Heading id="start-title" eyebrow="Getting started" title="Three steps. You forward one email." size="md" />
          <ol className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              { t: 'Choose a plan', b: <>Property Management, or with the Legal Guarantee for {$.legalStep} a month more. <a href={url('pricing/')}>See the prices</a></> },
              { t: 'Talk to us', b: 'A free 15-minute call confirms your rate, your units and what we need from you.' },
              { t: 'Start management', b: 'We take over tenant introductions, portals, rent collection and maintenance. You forward one email.' },
            ].map((s, idx) => (
              <li key={s.t} className="tile spot p-7 sm:p-8" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.08}s` }}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[0.9375rem] font-semibold text-white">{idx + 1}</span>
                <h3 className="mt-5 text-title">{s.t}</h3>
                <p className="mt-2 text-ink-3">{s.b}</p>
              </li>
            ))}
          </ol>
          <Fine className="mx-auto mt-6 max-w-[68rem] text-center">
            Term: {term}. No setup fee. The monthly fee continues while an enrolled unit is vacant.
          </Fine>
        </div>
      </Section>

      {/* ---- Switching ------------------------------------------------------ */}
      <Section id="switch" tone="alt" labelledBy="switch-title">
        <div className="wrap">
          <Heading
            id="switch-title"
            eyebrow="Switching to OLH"
            title="We do the move. You send one letter."
            lead="Bring us your current management agreement. We’ll read it free, find your notice period and lay out the handover. If staying put is better for you, we’ll say so."
            size="md"
          />
          <ol className="steprow no-scrollbar mt-10 md:mt-12">
            {[
              { t: 'Free switch review', b: 'A 15-minute call. We read your agreement, find the notice period (usually 30 to 60 days) and flag any exit cost.' },
              { t: 'You send one letter', b: 'We give you the termination notice, worded and dated to your agreement. That’s your whole job.' },
              { t: 'We collect everything', b: 'Leases, ledgers, last month’s rent deposits and interest, keys, fobs, maintenance history and vendor contacts.' },
              { t: 'Tenants onboarded', b: 'Written notice of the change, new payment instructions and portal logins. Same lease, same rent, same rights.' },
            ].map((s, idx) => (
              <li key={s.t} className="steprow-item spot" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                <h3 className="mt-5 text-title">{s.t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{s.b}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-8 grid max-w-[68rem] gap-5 lg:grid-cols-[1.2fr_1fr]">
            <details className="fold-plain tile-white p-7 sm:p-9" open data-fold-mobile data-reveal>
              <summary className="flex items-center justify-between gap-4">
                <h3 className="text-title">The handover audit</h3>
                <ChevronDown className="fold-icon h-5 w-5 shrink-0 text-ink-3 md:hidden" aria-hidden />
              </summary>
              <p className="mt-3 text-[0.9375rem] text-ink-3">
                Most managers transfer a folder and consider the job done. We reconcile it, while there’s still time to fix what’s
                missing.
              </p>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {audit.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </details>
            <ul className="grid content-start gap-3">
              {[
                { Icon: ShieldCheck, t: 'No setup fee', b: 'Nothing to pay to move. Your monthly plan starts when we start.' },
                { Icon: ArrowRightLeft, t: 'You don’t pay two managers at once', b: 'We date the handover to your notice period, and set up rent collection before it.' },
                { Icon: Scale, t: 'Open files checked', b: 'Any N4, N5 or LTB file you’re handed is checked for validity. Taking over a dispute already under way is quoted separately.' },
              ].map(({ Icon, t, b }) => (
                <li key={t} className="flex gap-4 rounded-4xl bg-white p-6 shadow-card" data-reveal>
                  <span className="icon-badge shrink-0">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-3">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- Add-ons and what's separate -------------------------------------- */}
      <Section id="addons" labelledBy="addons-title">
        <div className="wrap">
          <Heading
            id="addons-title"
            eyebrow="Add-ons and what’s separate"
            title="Priced on their own. Agreed before they start."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-2">
            <div className="tile spot flex flex-col p-7 sm:p-8" data-reveal>
              <p className="chip-brand w-fit">{$.visit} + HST a visit</p>
              <h3 className="mt-4 text-title">Local visits</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                Up to 45 minutes on site, dated photos, a standard checklist and a report in your owner portal. Booked when you want
                one, subject to availability, and confirmed with you before anyone attends. {$.visitGuarantee} a visit on the Legal
                Guarantee.
              </p>
              <a href={url('pricing/#visits')} className="link-more mt-auto pt-5">
                Visit prices
              </a>
            </div>
            <div className="tile spot flex flex-col p-7 sm:p-8" data-reveal>
              <p className="chip-brand w-fit">{$.realtorListing} a month</p>
              <h3 className="mt-4 text-title">REALTOR.ca listing on tap</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                For management clients. One active MLS® and REALTOR.ca listing at a time, with unlimited turnovers; each extra listing
                running at the same time is {$.realtorListing} a month more.
              </p>
              <p className="mt-3 rounded-2xl bg-white p-4 text-[0.9375rem] text-ink-2">
                <strong className="font-semibold text-ink">The term, plainly.</strong> The listing carries a 12-month listing term, and
                your management agreement extends to match it.
              </p>
            </div>
            <div className="tile spot flex flex-col p-7 sm:p-8" data-reveal>
              <Megaphone className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-3 text-title">Tenant placement</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                Finding and placing a tenant through our brokerage, List It Realty Brokerage Inc., from {$.basicListing} + HST. Separate
                from monthly management.
              </p>
              <a href={url('rentals/#leasing')} className="link-more mt-auto pt-5">
                Leasing packages
              </a>
            </div>
            <div className="tile spot flex flex-col p-7 sm:p-8" data-reveal>
              <Hammer className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-3 text-title">Renovations and bigger repairs</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                Unit renovations, capital work and emergency restoration are run as separate projects, with the scope and any fee
                agreed before work starts.
              </p>
              <a href={url('projects/')} className="link-more mt-auto pt-5">
                Projects
              </a>
            </div>
          </div>
          <Fine className="mx-auto mt-6 max-w-[68rem] text-center">
            The Rent Guarantee is a separate rental-income product with its own terms and eligibility, not part of any management plan.{' '}
            <a href={live('/rent-guarantee-ontario')}>Read its terms</a>
          </Fine>
        </div>
      </Section>

      {/* ---- Who it's not for --------------------------------------------- */}
      <Section id="fit" tone="alt" labelledBy="fit-title">
        <div className="wrap">
          <Heading
            id="fit-title"
            eyebrow="Straight answer"
            title="Who it isn’t for."
            lead="We manage residential tenancies under Ontario’s Residential Tenancies Act. If you need one of these, call someone else."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[64rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              { Icon: Building2, t: 'A live-in superintendent', b: 'We don’t provide on-site staff living at the building.' },
              { Icon: Store, t: 'Commercial or retail', b: 'Offices, storefronts and other commercial space are outside what we do.' },
              { Icon: BedDouble, t: 'Short-term rentals', b: 'Airbnb-style stays aren’t residential tenancies, so they’re not for us.' },
            ].map(({ Icon, t, b }) => (
              <li key={t} className="tile-white p-6 sm:p-7" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-4 text-title">{t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[44rem] text-center text-ink-2">
            Managing it yourself? <a href={url('landlord-shield/')}>OLH Landlord Shield</a> gives you the software, a monthly ledger
            check and a paralegal to talk to, from {$.shield} a month. If we’re not the right fit, we’ll tell you on the first call.
          </p>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about management.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={managementFaqs} />
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a href={url('pricing/')} className="link-more">
              Price my portfolio
            </a>
            <a href={url('legal/#guarantee')} className="link-more">
              Add the Legal Guarantee
            </a>
          </div>
        </div>
      </Section>

      <CTABand title="Hand over the day-to-day." lead="A 15-minute call: your units, your cities, what you pay now and what management with us would cost." />
    </>
  )
}
