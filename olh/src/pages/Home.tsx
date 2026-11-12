import { ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, FileText, KeyRound, MapPin, Phone, Scale } from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { JobChips } from '../components/JobChips'
import { GroupRow, LegalRates, ListingStrip, PlanCards } from '../components/olh'
import { DashboardScreen } from '../components/mocks/screens'
import { CaseTrack, OlhN4, OlhPhone } from '../components/mocks/olh'
import { homeFaqs } from '../content/faqs'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'plans', label: 'Three plans' },
  { id: 'shield', label: 'Landlord Shield' },
  { id: 'legal', label: 'Legal Guarantee' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'how', label: 'How we work' },
  { id: 'faq', label: 'Questions' },
]

const services: { heading: string; note: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Management',
    note: 'By property and owner',
    links: [
      { label: 'Condos', href: site.live.condos },
      { label: 'Multifamily & apartment buildings', href: site.live.multifamily },
      { label: 'Student rentals', href: site.live.students },
      { label: 'First-time landlords', href: site.live.firstTime },
      { label: 'Out-of-province & overseas owners', href: site.live.nonResident },
      { label: 'Switching managers', href: site.live.switching },
    ],
  },
  {
    heading: 'Projects',
    note: 'Scoped separately',
    links: [
      { label: 'Distressed building stabilization', href: site.live.distressed },
      { label: 'Renovations & project management', href: site.live.renovation },
      { label: 'Emergency restoration & repair', href: site.live.restoration },
      { label: 'Multifamily renovation & rehab', href: site.live.rehab },
      { label: 'Apartment building maintenance', href: site.live.buildingMaintenance },
      { label: 'Multifamily lease-up', href: site.live.leaseUp },
    ],
  },
  {
    heading: 'Leasing',
    note: 'Through List It Realty',
    links: [
      { label: 'Basic & Premium rental listings', href: url('rentals/#leasing') },
      { label: 'Full-service tenant placement', href: url('rentals/#leasing') },
      { label: 'What is my rental worth?', href: site.live.rentalWorth },
      { label: 'Screening & credit checks', href: site.live.screening },
      { label: 'Screening questions', href: site.live.screeningQuestions },
      { label: 'LTB judgment database', href: site.live.judgments },
    ],
  },
  {
    heading: 'Legal & resources',
    note: 'Free help included',
    links: [
      { label: 'Eviction help', href: url('legal/#eviction') },
      { label: 'Eviction timelines', href: site.live.evictionTime },
      { label: 'LTB forms', href: site.live.ltbForms },
      { label: 'Ontario law library', href: site.live.law },
      { label: 'Self-help centre & guides', href: site.live.selfHelp },
      { label: 'Ask Ezy', href: site.live.askEzy },
    ],
  },
]

export function Home() {
  return (
    <>
      <ChapterNav chapters={chapters} cta={null} />

      {/* ---- Hero --------------------------------------------------------- */}
      {/* Phones: eyebrow, the picture, then the words and buttons on the first screen.
          Laptops: words left, picture right, both above the fold. */}
      <section id="overview" data-hero className="relative overflow-hidden bg-white pb-12 pt-6 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="hero-grid">
          <p className="eyebrow hero-eyebrow">OLH Landlord Shield · Ontario landlords since {site.since}</p>
          <div className="hero-visual">
            <div className="hero-rise relative">
              <DashboardScreen />
              <OlhPhone className="hero-rise-2 absolute -bottom-6 right-[-1%] w-[27%] min-w-[6rem] max-w-[15rem] min-[375px]:min-w-[7rem] sm:-bottom-10 md:right-[-3%]" />
            </div>
          </div>
          <div className="hero-copy">
            <h1 className="hero-title">
              Self-manage your rentals. <span className="text-brand">With a team behind you.</span>
            </h1>
            <p className="hero-lead mt-5 text-lead text-ink-3">
              The full LandlordEzy Automation Suite in your own account, a rent ledger our team checks every month, and a licensed
              paralegal to talk to. Prefer us to run it? Property Management is a step away.
            </p>
            <div className="hero-actions mt-7">
              <Actions
                align="split"
                primary={{ label: 'Book a 15-minute call', href: site.live.book }}
                secondary={{ label: 'Price my portfolio', href: url('pricing/') }}
                note={
                  <>
                    <strong className="whitespace-nowrap font-semibold text-ink-2">Shield from $49/mo</strong> ·{' '}
                    <span className="whitespace-nowrap">Management from $99</span>
                    <span className="hidden sm:inline"> · </span>
                    <br className="sm:hidden" />
                    <span className="whitespace-nowrap">With Legal Guarantee from $149</span> ·{' '}
                    <span className="whitespace-nowrap">Plus HST</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <div className="wrap">
          <JobChips className="mx-auto mt-10 max-w-[60rem] text-center sm:mt-14 lg:mt-16" />
        </div>
      </section>

      {/* ---- One group ----------------------------------------------------- */}
      <section aria-labelledby="group-title" className="bg-white pb-14 pt-4 sm:pb-20">
        <div className="wrap">
          <h2 id="group-title" className="text-center text-[0.9375rem] font-semibold text-ink-3">
            One group, three disciplines, one software
          </h2>
          <GroupRow className="mx-auto mt-8 max-w-[68rem]" />
        </div>
      </section>

      {/* ---- Plans ---------------------------------------------------------- */}
      <Section id="plans" tone="alt" labelledBy="plans-title">
        <div className="wrap">
          <Heading
            id="plans-title"
            eyebrow="Three plans"
            title="Which level suits you?"
            lead="Manage your own tenants with a team behind you, hand us the day-to-day, or have LTB work arranged in advance. Priced for your whole portfolio."
          />
          <PlanCards className="mx-auto mt-12 max-w-[72rem] md:mt-14" />
          <div className="mx-auto mt-8 flex max-w-[60rem] flex-col items-center gap-4 text-center">
            <a href={url('pricing/')} className="btn-primary" data-track="pricing:home-plans">
              Price my portfolio
            </a>
            <p className="text-[0.875rem] text-ink-3">
              Shield is month-to-month. Management plans: 90 days, then 30 days’ notice. 1–10 tenancies priced online; larger or
              mixed portfolios quoted.
            </p>
            <p className="text-[0.9375rem] text-ink-2">
              <strong className="font-semibold">Already have a tenant problem?</strong> Standalone eviction help from $1,495 + HST
              and disbursements, through one hearing. <a href={url('legal/#eviction')}>Existing-case help</a>
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Shield spotlight: the N4 ------------------------------------- */}
      <section id="shield" aria-labelledby="shield-title" className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-28">
        <div className="glow-blue pointer-events-none absolute -right-40 top-10 h-[40rem] w-[40rem] opacity-70" aria-hidden />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div data-reveal>
            <p className="eyebrow-dark">Included with OLH Landlord Shield</p>
            <h2 id="shield-title" className="mt-3 text-display-lg !text-white">
              From missed rent to a served N4. In your own account.
            </h2>
            <p className="mt-6 max-w-[34rem] text-lead text-white/70">
              LandlordEzy fills the official N4 from your rent ledger and works out the arrears, so you can prepare one in around 60
              seconds when the ledger is accurate. You review it, sign it and serve it. No OLH drafting fee.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {['A rent-unpaid alert, with the arrears already in your ledger', 'E-signature and a Certificate of Service', 'Reminders around the termination and filing dates', 'If it goes further: a licensed paralegal at the member rate'].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand-glow" strokeWidth={2.6} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={url('landlord-shield/')} className="btn-primary" data-track="shield:home">
                See Landlord Shield
              </a>
              <a href={url('landlord-shield/#suite')} className="link-more-dark">
                Everything in the suite
              </a>
            </div>
          </div>
          <div>
            <OlhN4 className="mx-auto w-full max-w-[34rem]" dark />
            <p className="mt-3 text-center text-[0.75rem] text-white/50">Illustration with sample figures, not a real tenancy.</p>
          </div>
        </div>
      </section>

      {/* ---- Legal Guarantee --------------------------------------------- */}
      <Section id="legal" labelledBy="legal-title">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
          <div data-reveal>
            <p className="eyebrow">The Legal Guarantee</p>
            <h2 id="legal-title" className="mt-3 text-display-md">
              When a tenancy needs the Board, the work is already arranged.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Landlord Pro Legal Services, our licensed paralegal team, handles eligible new Landlord and Tenant Board matters for
              every enrolled unit, not just one. You approve the steps. We do the work.
            </p>
            <div className="mt-8">
              <LegalRates />
            </div>
            <ul className="mt-7 space-y-2 text-[0.875rem] text-ink-3">
              {['Not rent reimbursement, a guaranteed result or a timeline', 'Not for a dispute that started before you enrolled', 'LTB fees, sheriff, process servers and outside costs are extra', 'Under a separate written engagement with Landlord Pro Legal Services'].map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden className="text-ink-4">–</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <a href={url('legal/')} className="link-more">
                How the Legal Guarantee works
              </a>
              <a href={url('legal/#compare')} className="link-more">
                Shield vs Legal Guarantee
              </a>
            </div>
          </div>
          <div className="rounded-5xl bg-brand-ink p-5 sm:p-7" data-reveal>
            <CaseTrack className="!grid-cols-1 sm:!grid-cols-2" />
          </div>
        </div>
      </Section>

      {/* ---- Rentals ------------------------------------------------------- */}
      <Section id="rentals" tone="alt" labelledBy="rentals-title">
        <div className="wrap">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Available now</p>
              <h2 id="rentals-title" className="mt-3 text-display-md">
                Homes on our platforms.
              </h2>
            </div>
            <a href={url('rentals/')} className="link-more shrink-0">
              Rentals & leasing
            </a>
          </div>
          <ListingStrip limit={8} className="mt-8" />
          <a href={url('rentals/#leasing')} className="mt-8 flex flex-col gap-3 rounded-4xl bg-white p-6 text-ink shadow-card hover:no-underline sm:flex-row sm:items-center sm:justify-between sm:p-7" data-track="leasing:home">
            <span className="flex items-center gap-4">
              <span className="icon-badge shrink-0">
                <KeyRound className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[1.1875rem] font-semibold tracking-[-0.015em]">Need a tenant?</span>
                <span className="block text-[0.9375rem] text-ink-3">MLS® rental listing from $549, or full-service placement.</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1 text-brand-text">
              Leasing prices <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </Section>

      {/* ---- How we work ---------------------------------------------------- */}
      <Section id="how" labelledBy="how-title">
        <div className="wrap">
          <Heading
            id="how-title"
            eyebrow="How we work"
            title="Day-to-day management. Local visits when you need them."
            lead="Everything documented in LandlordEzy. When a property needs eyes on it, you book a visit at a set price, confirmed before anyone attends."
            size="md"
          />
          <ol className="mx-auto mt-12 grid max-w-[68rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Phone, t: 'A 15-minute call', b: 'Your units, your cities, your current tenants and what you need from us.' },
              { Icon: FileText, t: 'A clear monthly total', b: 'One price for the portfolio. Anything local or project-based is quoted separately.' },
              { Icon: ClipboardCheck, t: 'Onboarding in LandlordEzy', b: 'Leases, ledgers and documents organised, and tenants introduced to their portal.' },
              { Icon: Scale, t: 'Every month', b: 'A checked ledger and statement, Equifax rent reporting, and legal help on the same team.' },
            ].map(({ Icon, t, b }, idx) => (
              <li key={t} className="tile p-6 sm:p-7" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.07}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-16 max-w-[68rem]">
            <h3 className="text-headline">More than monthly management.</h3>
            <p className="mt-2 text-ink-3">Specialist work is scoped and quoted on its own, so your monthly plan stays simple.</p>
            <div className="mt-8 grid gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
              {services.map((g) => (
                <details key={g.heading} className="fgroup border-b border-line lg:border-0" open data-fold-mobile>
                  <summary className="fgroup-head">
                    <span>
                      <span className="block font-semibold text-ink">{g.heading}</span>
                      <span className="block text-[0.8125rem] text-ink-4">{g.note}</span>
                    </span>
                    <ChevronDown className="fgroup-icon h-4 w-4 text-ink-3" aria-hidden />
                  </summary>
                  <ul className="space-y-2 pb-5 pt-1 text-[0.9375rem] lg:pt-3">
                    {g.links.map((l) => (
                      <li key={l.label}>
                        <a href={l.href} className="text-ink-2 hover:text-brand-text">
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>

          <a href={site.live.sireg} className="mx-auto mt-14 flex max-w-[68rem] flex-col gap-3 rounded-4xl bg-canvas-alt p-6 text-ink hover:no-underline sm:flex-row sm:items-center sm:justify-between sm:p-7" rel="noopener" data-track="sireg:home">
            <span className="flex items-start gap-4">
              <span className="icon-badge shrink-0">
                <MapPin className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <span>
                <span className="block font-display text-[1.1875rem] font-semibold tracking-[-0.015em]">SIREG or Simple Investor owner?</span>
                <span className="block text-[0.9375rem] text-ink-3">
                  Dated updates, videos, the free owner registry and next steps are in the Owner Centre. Joining OLH is optional.
                </span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-brand-text">
              Owner Centre <ArrowUpRight className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Good to know before you call.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={homeFaqs} />
          <a href={site.live.faq} className="link-more mt-8">
            More questions
          </a>
        </div>
      </Section>

      <CTABand
        fine={
          <>
            Or call or text{' '}
            <a href={`tel:${site.phone.tel}`} className="text-white/80 underline" data-track="call:cta-band">
              {site.phone.display}
            </a>
          </>
        }
      />
    </>
  )
}
