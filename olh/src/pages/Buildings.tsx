import {
  Building,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Droplets,
  FileWarning,
  Flame,
  Gavel,
  Hammer,
  Handshake,
  Home,
  Layers,
  Megaphone,
  Ruler,
  Scale,
  Store,
  TrendingDown,
  TriangleAlert,
  Users,
  Wrench,
} from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'
import { buildingFaqs } from '../content/faqs-buildings'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'model', label: 'Who it’s for' },
  { id: 'review', label: 'Due diligence' },
  { id: 'distressed', label: 'Distressed buildings' },
  { id: 'leases', label: 'Leases and enforcement' },
  { id: 'operations', label: 'Operations and cost' },
  { id: 'faq', label: 'Questions' },
]

const assets = [
  { Icon: Building2, t: 'Apartment buildings', b: 'Large multi-unit residential, up to 200+ units' },
  { Icon: Building, t: 'Mid-rise and low-rise', b: 'Multifamily assets of every common size' },
  { Icon: TriangleAlert, t: 'Distressed buildings', b: 'Poorly managed, or under financial pressure' },
  { Icon: Layers, t: 'Value-add', b: 'Repositioning and turnaround opportunities' },
  { Icon: Store, t: 'Mixed-use', b: 'Buildings with a residential component' },
  { Icon: Home, t: 'Small multi-unit', b: 'Duplexes, triplexes and small portfolios' },
]

const model = [
  { Icon: Scale, t: 'Paralegals on the team', b: 'Our team includes licensed Ontario paralegals. Notices, enforcement and escalation are handled by people who know where each step sits in the Residential Tenancies Act.' },
  { Icon: FileWarning, t: 'Legal and operations together', b: 'Legal issues are spotted early and paperwork is corrected before it costs you, which cuts tenant claims, delays and avoidable mistakes.' },
  { Icon: Users, t: 'Built for high tenant counts', b: 'Inspections, maintenance workflows, arrears escalation and compliance tracking that hold up with dozens or hundreds of tenancies.' },
  { Icon: Megaphone, t: 'Leasing through our brokerage', b: 'Vacancies go on MLS® and REALTOR.ca through List It Realty Brokerage Inc., with co-operating agents and consistent screening.' },
]

const review = [
  'Unit-by-unit walkthroughs of occupied and vacant suites',
  'Deferred maintenance and the expenses driving costs',
  'Rent roll reconciled against the rent ledgers, 12 to 24 months where available',
  'Arrears, chronic non-payment and existing payment plans',
  'A lease-by-lease audit for errors and enforceability',
  'Tenant behaviour patterns and the building’s culture',
  'Existing or likely Landlord and Tenant Board exposure',
  'How enforcement and management were handled before',
]

const signs = [
  { t: 'Arrears you can’t fully account for', b: 'Chronic late or partial payment, and a rent roll that no longer matches the ledgers.' },
  { t: 'Expenses leaking out', b: 'Boiler inefficiency, water intrusion, utility waste and repeat repairs.' },
  { t: 'Inconsistent or unenforceable leases', b: 'Files passed between managers, with missing documents.' },
  { t: 'Problem tenancies left alone', b: 'Smoking, disturbances and non-compliance that were never enforced.' },
  { t: 'Vacant units sitting idle', b: 'Un-renovated, un-marketed units losing revenue every month.' },
  { t: 'Legal exposure in the files', b: 'Liability a tenant may find before you do.' },
]

const stages = [
  { when: 'Day one', t: 'Takeover', b: 'A formal transition. Communications, rent, keys and records move under one accountable team, and tenants know the building is professionally managed.' },
  { when: 'Weeks 1–6', t: 'Diagnosis', b: 'Every tenancy file audited, the rent roll reconciled against real ledgers, and the building inspected end to end.' },
  { when: 'Months 2–4', t: 'Triage and control', b: 'Expense leaks first: heating, water, utilities. Vendors and on-site staffing reviewed. Arrears enforced and tenancies sorted by risk.' },
  { when: 'Months 3–6', t: 'Recovery', b: 'Vacant units scoped, renovated and leased. Below-market tenancies repositioned lawfully. An AGI strategy where capital work qualifies.' },
  { when: 'Handover', t: 'Stabilized', b: 'Systems, documentation and enforcement in place. The building moves to day-to-day management with owner-portal visibility.' },
]

const leaks = [
  { Icon: Droplets, t: 'Water, leaks and moisture', b: 'Active leaks, intrusion, condensation and repeat moisture problems.' },
  { Icon: Flame, t: 'Boiler and heat', b: 'Boiler operation, heat distribution and overheating that inflate utility costs.' },
  { Icon: Wrench, t: 'Plumbing and mechanical', b: 'Systemic failures behind repeat service calls.' },
  { Icon: Handshake, t: 'Maintenance and vendors', b: 'Workflows and response times reviewed; underperforming vendors replaced.' },
  { Icon: ClipboardCheck, t: 'Preventative programs', b: 'Inspection schedules, cleaning routines and seasonal work that reduce emergencies.' },
  { Icon: Users, t: 'Management structure', b: 'On-site structures that add cost without improving performance, reviewed.' },
]

const auditFinds = [
  'Lease terms that differ between units',
  'Outdated or non-compliant clauses',
  'Incorrect rent figures or missing documents',
  'Improper or undocumented rent increases',
  'Missing addenda or unenforceable provisions',
  'Paperwork gaps that weaken an enforcement file',
]

const enforcement = [
  'Chronic non-payment or persistent late payment',
  'Smoking and prohibited activity in units',
  'Unauthorized occupants, alterations or equipment',
  'Repeated lease violations',
  'Legacy tenancies paying well below market',
  'Long-standing issues ignored by prior management',
]

const agiExamples = [
  'Roof replacement or major roof rehabilitation',
  'Boiler replacement or significant modification',
  'Windows and building envelope',
  'Major mechanical, electrical or life-safety upgrades',
]

const maintenance = [
  { t: 'Triage by priority', b: 'Floods, heat loss and life-safety issues are handled ahead of everything else. Routine work is logged and scheduled so it never crowds out the urgent.' },
  { t: 'Preventative, by season', b: 'Boiler and heating serviced before winter, roof and drainage checked after it, life-safety checks kept current.' },
  { t: 'Vendor accountability', b: 'Trades held to quality, transparent pricing and repeat-repair review. Underperformers don’t stay attached to the building out of habit.' },
  { t: 'Documented work orders', b: 'Every request captured, assigned and tracked to completion: what was reported, who did it, what it cost and whether it worked.' },
]

const maintScope = ['Common areas', 'Building systems and mechanicals', 'In-unit repairs', 'Exterior and grounds', 'Life-safety and compliance checks', 'Cost monitoring across the building']

const leaseUp = [
  { t: 'A pricing and absorption plan', b: 'So units lease in the right order, at the right rents.' },
  { t: 'One coordinated campaign', b: 'MLS® and REALTOR.ca through our brokerage, co-operating agents, rental sites and a building presence.' },
  { t: 'Consistent, lawful screening', b: 'Credit, identity, income and references, applied the same way to every applicant, in line with the Human Rights Code.' },
  { t: 'Funnel reporting', b: 'Inquiries, showings, applications and signings, reported as the building fills.' },
  { t: 'Straight into management', b: 'Every tenancy e-signed and onboarded onto LandlordEzy, with no gap between leasing and management.' },
]

const costs = [
  { t: 'Direct contractor invoices', b: 'Invoices come to you directly, with no markup hidden inside them.' },
  { t: 'Documented decisions', b: 'Maintenance decisions are recorded and prioritized by financial impact.' },
  { t: 'Fees only when earned', b: 'Project management fees apply only when work is actively coordinated and overseen.' },
  { t: 'Preventative programs', b: 'Fewer repeat repairs and fewer emergency calls.' },
  { t: 'Vendor accountability', b: 'Performance monitored; underperforming contractors replaced.' },
  { t: 'Full owner visibility', b: 'Where every dollar went, and why each decision was made.' },
]

export function Buildings() {
  return (
    <>
      <ChapterNav title="Apartment buildings" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <PageHero
        eyebrow="Apartment buildings and multifamily"
        title="Your building, run as an operating business."
        lead="Management, licensed paralegals and leasing for multifamily investors, ownership groups and asset managers. From a duplex to a building with hundreds of tenancies, stabilized or in trouble."
        secondary={{ label: 'Is my building distressed?', href: '#distressed' }}
      >
        <ul className="m-snap mx-auto mt-12 grid max-w-[68rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map(({ Icon, t, b }) => (
            <li key={t} className="tile spot flex items-start gap-4 p-5 sm:p-6" data-reveal>
              <span className="icon-badge shrink-0">
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{t}</span>
                <span className="mt-0.5 block text-[0.9375rem] text-ink-3">{b}</span>
              </span>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ---- Who it's for: the model -------------------------------------------- */}
      <Section id="model" tone="alt" labelledBy="model-title">
        <div className="wrap">
          <Heading
            id="model-title"
            eyebrow="Who it’s for"
            title="Casual rental management doesn’t scale."
            lead="A building with dozens or hundreds of tenancies needs systems, enforcement and legal control from day one. That’s the model, whether the building is already stable or needs intervention now."
            size="md"
          />
          <ul className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {model.map(({ Icon, t, b }, idx) => (
              <li key={t} className="tile-white spot p-6 sm:p-7" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Due diligence ------------------------------------------------------ */}
      <Section id="review" labelledBy="review-title">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow">Included with management</p>
            <h2 id="review-title" className="mt-3 text-display-md">
              Due diligence that reads the files, not just the walls.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              The biggest risks in a building are usually in the tenant files, the leases and how it was managed. We review all of it, during
              acquisition or at takeover.
            </p>
            <blockquote className="mt-8 rounded-4xl bg-brand-soft p-6 sm:p-7">
              <p className="font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] text-ink">
                Rent rolls show expected income. Rent ledgers show what was actually collected.
              </p>
              <p className="mt-2 text-[0.9375rem] text-ink-2">Reconciling the two is where arrears, side agreements and quiet underperformers turn up.</p>
            </blockquote>
            <Fine className="mt-5">The review is part of the management engagement. It is never sold separately.</Fine>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {review.map((t, idx) => (
              <li key={t} className="tile flex gap-3 p-5" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.04}s` }}>
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[0.8125rem] font-semibold text-white">{idx + 1}</span>
                <span className="text-[0.9375rem] text-ink-2">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---- Distressed buildings (the page's one dark section) ----------------- */}
      <section id="distressed" aria-labelledby="distressed-title" className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-28">
        <div className="glow-blue pointer-events-none absolute -right-40 -top-20 h-[40rem] w-[40rem] opacity-60" aria-hidden />
        <div className="wrap relative">
          <div className="mx-auto max-w-[46rem] text-center" data-reveal>
            <p className="eyebrow-dark">Is your building distressed?</p>
            <h2 id="distressed-title" className="mt-3 text-display-lg !text-white">
              A structured takeover. Not a hopeful handover.
            </h2>
            <p className="mx-auto mt-5 max-w-[38rem] text-lead text-white/70">
              Distress rarely shows up as one problem. If several of these are true, the building needs stabilization before ordinary management.
            </p>
          </div>

          <ul className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-3 md:grid-cols-2 lg:grid-cols-3">
            {signs.map((s) => (
              <li key={s.t} className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                <TrendingDown className="h-5 w-5 text-brand-glow" strokeWidth={1.8} aria-hidden />
                <h3 className="mt-3 font-display text-[1.0625rem] font-semibold text-white">{s.t}</h3>
                <p className="mt-1 text-[0.9375rem] text-white/70">{s.b}</p>
              </li>
            ))}
          </ul>

          <h3 className="mx-auto mt-16 max-w-[72rem] font-display text-[1.375rem] font-semibold text-white">The stabilization plan</h3>
          <ol className="m-snap mx-auto mt-5 grid max-w-[72rem] gap-3 md:grid-cols-2 lg:grid-cols-5">
            {stages.map((s, idx) => (
              <li key={s.t} className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <span className="text-[0.8125rem] font-semibold text-brand-glow">{s.when}</span>
                </span>
                <h4 className="mt-4 font-display text-[1.125rem] font-semibold text-white">{s.t}</h4>
                <p className="mt-1.5 text-[0.9375rem] text-white/70">{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-5 max-w-[72rem] text-[0.9375rem] text-white/75">
            <Gavel className="mr-2 inline h-4 w-4 align-[-2px] text-brand-glow" aria-hidden />
            <strong className="font-semibold text-white">Legal throughout.</strong> Notices, non-payment, LTB applications and enforcement are handled
            by the licensed paralegals on our team. Capital work and unit renovations run through our{' '}
            <a href={url('projects/')} className="text-brand-glow underline">
              project management service
            </a>
            .
          </p>

          <details className="fold mx-auto mt-8 max-w-[72rem] rounded-3xl bg-white/[0.06] ring-1 ring-white/10">
            <summary className="flex min-h-[52px] cursor-pointer items-center justify-between gap-4 px-5 font-semibold text-white">
              Where the money leaks first: six cost drivers we go after
              <ChevronDown className="fold-icon h-4 w-4 shrink-0" aria-hidden />
            </summary>
            <ul className="grid gap-x-8 gap-y-5 px-5 pb-6 pt-2 sm:grid-cols-2 lg:grid-cols-3">
              {leaks.map(({ Icon, t, b }) => (
                <li key={t} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-glow" strokeWidth={1.8} aria-hidden />
                  <span>
                    <span className="block font-semibold text-white">{t}</span>
                    <span className="mt-0.5 block text-[0.9375rem] text-white/70">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </details>

          <p className="mx-auto mt-10 max-w-[50rem] text-center text-[0.8125rem] text-white/55">
            Expected outcomes are based on experience with comparable assets, not a contractual guarantee of a specific net operating income or
            investment return.
          </p>
        </div>
      </section>

      {/* ---- Leases and enforcement --------------------------------------------- */}
      <Section id="leases" labelledBy="leases-title">
        <div className="wrap">
          <Heading
            id="leases-title"
            eyebrow="Lease audits and enforcement"
            title="Defensible files. Lawful enforcement."
            lead="Buildings that were self-managed or passed between managers almost always carry lease errors. We audit every unit, fix the paperwork, then enforce consistently. The aim isn’t conflict; it’s restoring professional standards."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <ClipboardCheck className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">What a lease audit finds</h3>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {auditFinds.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tile p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Gavel className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">What enforcement addresses</h3>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {enforcement.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-white px-4 py-3 text-[0.9375rem] font-semibold text-ink">Below-market rent alone is not a ground.</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-[64rem] text-ink-2">
            Every termination needs a lawful basis under the Residential Tenancies Act and goes through the Board’s process, which sets its own pace.
            For long-term repositioning, renovation and rent changes follow lawful turnover, paced to your objectives and risk tolerance.
          </p>
          <details className="fold mx-auto mt-8 max-w-[64rem]">
            <summary className="fold-head !flex">
              Above-guideline increases (AGIs): when they’re worth it
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <div className="grid gap-8 px-1 pt-5 md:grid-cols-2">
              <div className="text-[0.9375rem] text-ink-2">
                <p>
                  An AGI can be available where qualifying capital work maintains, replaces or extends the life of the building. Our paralegals can
                  assess it and run the L5 application: documentation, evidence, tenant communication and filing.
                </p>
                <p className="mt-3">
                  Are AGIs always worth pursuing? Not always. Recoverable increases are often limited, so we recommend one only when the return justifies
                  the work. Renegotiating leases unit by unit alongside renovations is often faster.
                </p>
              </div>
              <div>
                <p className="text-[0.8125rem] font-semibold text-ink-3">Examples of qualifying capital work</p>
                <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
                  {agiExamples.map((t) => (
                    <li key={t} className="flex gap-3">
                      <Hammer className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                      <span className="text-ink-2">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Fine className="mt-5 px-1">
              General information, not legal advice. Whether a cost qualifies, and how much can be recovered, is decided by the Landlord and Tenant
              Board.
            </Fine>
          </details>
        </div>
      </Section>

      {/* ---- Operations: maintenance, lease-up, cost --------------------------- */}
      <Section id="operations" tone="alt" labelledBy="operations-title">
        <div className="wrap">
          <Heading
            id="operations-title"
            eyebrow="Operations and cost"
            title="A handyman fixes what broke. A system keeps the building from breaking."
            lead="Maintenance, leasing and cost control, run as one operation and visible in your owner portal."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-tabs-root>
            <TabRow
              name="ops"
              label="Building operations"
              tabs={[
                { key: 'maintenance', label: 'Maintenance' },
                { key: 'lease-up', label: 'Lease-up' },
              ]}
              className="mx-auto"
            />
            <TabPanel name="ops" tab="maintenance" first className="mt-5">
              <p className="tabpanel-label">Maintenance</p>
              <div className="grid gap-8 rounded-4xl bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12 lg:rounded-5xl lg:p-12">
                <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {maintenance.map((m) => (
                    <div key={m.t}>
                      <dt className="font-display text-[1.125rem] font-semibold text-ink">{m.t}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink-3">{m.b}</dd>
                    </div>
                  ))}
                </dl>
                <div className="rounded-4xl bg-canvas-alt p-6">
                  <h3 className="font-display text-[1.0625rem] font-semibold">What we maintain</h3>
                  <ul className="mt-4 space-y-2 text-[0.9375rem]">
                    {maintScope.map((t) => (
                      <li key={t} className="flex gap-3">
                        <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                        <span className="text-ink-2">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[0.875rem] text-ink-3">
                    Repairs are done by contractors and, where the work is regulated, appropriately licensed trades. We don’t hold ourselves out as a
                    general contractor or licensed trade.
                  </p>
                </div>
              </div>
            </TabPanel>
            <TabPanel name="ops" tab="lease-up" className="mt-5">
              <p className="tabpanel-label">Lease-up</p>
              <div className="grid gap-8 rounded-4xl bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1fr_1.6fr] lg:gap-12 lg:rounded-5xl lg:p-12">
                <div>
                  <span className="icon-badge">
                    <Ruler className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-headline">Filling a building is a campaign.</h3>
                  <p className="mt-3 text-ink-3">
                    A new building, a renovated block or one being stabilized: pricing, sequencing, marketing and screening run together. Recovered
                    vacancies are usually the fastest return in the whole mandate.
                  </p>
                  <a href={url('rentals/')} className="link-more mt-5">
                    Filling a single unit instead
                  </a>
                </div>
                <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {leaseUp.map((m) => (
                    <div key={m.t}>
                      <dt className="font-display text-[1.125rem] font-semibold text-ink">{m.t}</dt>
                      <dd className="mt-1 text-[0.9375rem] text-ink-3">{m.b}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TabPanel>
          </div>

          <div className="mx-auto mt-8 grid max-w-[72rem] gap-5 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-4xl bg-white p-7 shadow-card sm:p-9" data-reveal>
              <h3 className="text-title">Cost transparency</h3>
              <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {costs.map((c) => (
                  <div key={c.t}>
                    <dt className="font-semibold text-ink">{c.t}</dt>
                    <dd className="mt-1 text-[0.9375rem] text-ink-3">{c.b}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="tile-dark flex flex-col p-7 sm:p-9" data-reveal>
              <div className="glow-blue pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60" aria-hidden />
              <div className="relative flex flex-1 flex-col">
                <p className="text-[0.8125rem] font-semibold text-white/60">Pricing</p>
                <h3 className="mt-2 text-headline !text-white">Quoted per building.</h3>
                <p className="mt-3 text-[0.9375rem] text-white/75">
                  Every building is different, so we price yours on its condition, its tenant profile and how much legal work it needs. Duplexes,
                  triplexes and portfolios of up to ten tenancies use the standard plans.
                </p>
                <a href={url('pricing/')} className="link-more-dark mt-auto pt-6">
                  See the standard plans
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- FAQ ---------------------------------------------------------------- */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about buildings.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={buildingFaqs} />
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a href={url('projects/')} className="link-more">
              Renovations and capital projects
            </a>
            <a href={url('legal/')} className="link-more">
              Legal help on the same team
            </a>
          </div>
        </div>
      </Section>

      <CTABand
        title="Send us the building."
        lead="Share the rent roll, recent ledgers and an arrears report. We’ll look for the red flags before we quote a plan. Discreet, with no obligation."
        secondary={{ label: 'Email the documents', href: `mailto:${site.email}?subject=Building%20review` }}
      />
    </>
  )
}
