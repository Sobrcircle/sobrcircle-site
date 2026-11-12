import { ArrowRight, ArrowUpRight, ClipboardCheck, FileText, KeyRound, MapPin, Phone, Scale } from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { HighlightCard, ScrollerArrows, TabPanel, TabRow } from '../components/interact'
import { GroupRow, ListingStrip, PlanChooser } from '../components/olh'
import { HighlightSheets, ScopeSheets } from '../components/sheets'
import { DashboardScreen, OwnerStatementScreen, ReportingScreen } from '../components/mocks/screens'
import { CaseList, CaseTrack, ConsultCard, HeroListing, LedgerCheck, OlhN4, OlhPhone, VisitReport } from '../components/mocks/olh'
import { homeFaqs } from '../content/faqs'
import { $ } from '../content/pricing'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'plans', label: 'Plans' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'rentals', label: 'Rentals' },
  { id: 'how', label: 'How it works' },
  { id: 'faq', label: 'Questions' },
]

const more: { key: string; label: string; note: string; links: { label: string; href: string }[] }[] = [
  {
    key: 'owners',
    label: 'Owners',
    note: 'By situation',
    links: [
      { label: 'Condo owners', href: url('owners/#condo') },
      { label: 'Student rentals', href: url('owners/#students') },
      { label: 'First-time landlords', href: url('owners/#first-time') },
      { label: 'Owners outside Ontario', href: url('owners/#non-resident') },
      { label: 'Switching managers', href: url('property-management/#switch') },
      { label: 'Service areas', href: url('contact/#areas') },
    ],
  },
  {
    key: 'buildings',
    label: 'Buildings and projects',
    note: 'Scoped and quoted separately',
    links: [
      { label: 'Apartment buildings', href: url('buildings/') },
      { label: 'Distressed building stabilization', href: url('buildings/#distressed') },
      { label: 'Renovations and repairs', href: url('projects/') },
      { label: 'Emergency restoration', href: url('projects/#restoration') },
    ],
  },
  {
    key: 'leasing',
    label: 'Leasing',
    note: 'Through List It Realty',
    links: [
      { label: 'Tenant placement', href: url('rentals/#leasing') },
      { label: 'Homes for rent', href: url('rentals/') },
      { label: 'What is my rental worth?', href: site.live.rentalWorth },
      { label: 'Tenant screening', href: site.live.screening },
    ],
  },
  {
    key: 'legal',
    label: 'Guides',
    note: 'Free, in plain words',
    links: [
      { label: 'Evicting a tenant', href: url('guides/evictions/') },
      { label: 'LTB forms and notices', href: url('guides/ltb-forms/') },
      { label: 'Raising the rent', href: url('guides/rent-increases/') },
      { label: 'Bill 60 changes', href: url('guides/bill-60/') },
      { label: 'All free resources', href: url('resources/') },
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
      <section id="overview" data-hero className="relative overflow-clip bg-white pb-10 pt-6 sm:pt-12 lg:pb-14 lg:pt-14">
        <div className="hero-grid">
          <p className="eyebrow hero-eyebrow">OLH Landlord Shield · Ontario landlords since {site.since}</p>
          <div className="hero-visual">
            <div className="hero-rise relative">
              <DashboardScreen />
              <OlhPhone className="hero-rise-2 absolute -bottom-6 right-[-1%] w-[27%] min-w-[6rem] max-w-[15rem] min-[375px]:min-w-[7rem] sm:-bottom-10 md:right-[-3%]" />
              <HeroListing className="hero-rise-2 absolute -bottom-5 left-[-2%] w-[25%] min-w-[5.75rem] max-w-[13rem] sm:-bottom-9 md:left-[-4%]" />
            </div>
          </div>
          <div className="hero-copy">
            <h1 className="hero-title">
              Self-manage your rentals. <span className="text-brand">With a team behind you.</span>
            </h1>
            <p className="hero-lead mt-5 text-lead text-ink-3">
              The LandlordEzy Automation Suite in your own account, a rent ledger our team checks every month, and a licensed paralegal
              to talk to. Prefer us to run it? Property Management is a step away.
            </p>
            <div className="hero-actions mt-7">
              <Actions
                align="split"
                primary={{ label: 'Book a 15-minute call', href: site.live.book }}
                secondary={{ label: 'See the plans', href: '#plans' }}
                note={
                  <>
                    <strong className="whitespace-nowrap font-semibold text-ink-2">Shield from {$.shield}/mo</strong> ·{' '}
                    <span className="whitespace-nowrap">Management from {$.management}</span>
                    <span className="hidden sm:inline"> · </span>
                    <br className="sm:hidden" />
                    <span className="whitespace-nowrap">With Legal Guarantee from {$.guarantee}</span> ·{' '}
                    <span className="whitespace-nowrap">Plus HST</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Plans: choose here, read here --------------------------------- */}
      <Section id="plans" labelledBy="plans-title" className="!pt-10 sm:!pt-14">
        <div className="wrap">
          <Heading
            id="plans-title"
            eyebrow="Three plans"
            title="How do you want to run your rentals?"
            lead="Pick the one that sounds like you. Every plan is one monthly total for your whole portfolio."
            size="md"
          />
          <div className="mx-auto mt-9 max-w-[70rem] md:mt-11">
            <PlanChooser
              visuals={{
                shield: <OlhN4 className="mx-auto w-full max-w-[30rem]" />,
                management: <OwnerStatementScreen className="w-full" />,
                guarantee: (
                  <div className="rounded-4xl bg-brand-ink p-4 sm:p-5">
                    <CaseTrack className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-2" />
                  </div>
                ),
              }}
            />
          </div>
          <ul className="mx-auto mt-8 flex max-w-[70rem] flex-col items-center justify-center gap-x-8 gap-y-3 text-center text-[0.9375rem] text-ink-3 md:flex-row">
            {[
              { q: 'Tenant problem right now?', a: 'Eviction help from $1,495', href: url('legal/#eviction') },
              { q: 'Need a tenant?', a: 'Leasing from $549', href: url('rentals/#leasing') },
              { q: 'Looking for a place?', a: 'Homes for rent', href: '#rentals' },
            ].map((x) => (
              <li key={x.q}>
                {x.q}{' '}
                <a href={x.href}>
                  <span className="whitespace-nowrap">{x.a}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- One group ------------------------------------------------------ */}
      <section aria-labelledby="group-title" className="bg-white pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="wrap">
          <h2 id="group-title" className="scroll-fill mx-auto max-w-[62rem] text-center">
            <span>
              One group. Property managers, licensed paralegals and a brokerage, all working from the same software. Under one roof
              since {site.since}.
            </span>
          </h2>
          <GroupRow className="mx-auto mt-12 max-w-[68rem] md:mt-16" />
        </div>
      </section>

      {/* ---- Highlights: sideways cards, each opens a sheet ------------------- */}
      <section id="highlights" aria-labelledby="highlights-title" className="section overflow-hidden bg-canvas-alt" data-scroller>
        <div className="wrap flex items-end justify-between gap-6">
          <h2 id="highlights-title" className="text-display-md">
            Get the highlights.
          </h2>
          <ScrollerArrows className="mb-1.5" />
        </div>
        <ul className="hscroll no-scrollbar mt-8 md:mt-10" data-scroller-track tabIndex={0} aria-label="Highlights">
          <HighlightCard sheet="sheet-n4" href={url('landlord-shield/#n4')} eyebrow="The N4" title="From missed rent to a served N4. In about 60 seconds." tone="dark">
            <OlhN4 className="w-full" dark />
          </HighlightCard>
          <HighlightCard sheet="sheet-ledger" href={url('landlord-shield/#rent')} eyebrow="Your rent ledger" title="Checked by a person. Every month.">
            <LedgerCheck className="w-full" />
          </HighlightCard>
          <HighlightCard sheet="sheet-paralegal" href={url('legal/#compare')} eyebrow="Member legal access" title="A licensed paralegal to talk to." tone="blue">
            <ConsultCard className="w-full" />
          </HighlightCard>
          <HighlightCard sheet="sheet-guarantee" href={url('legal/#guarantee')} eyebrow="The Legal Guarantee" title="When it needs the Board, the work is already arranged." tone="dark">
            <CaseList />
          </HighlightCard>
          <HighlightCard sheet="sheet-reporting" href={url('landlord-shield/#reporting')} eyebrow="Equifax rent reporting" title="On-time rent can build your tenant’s credit.">
            <ReportingScreen className="w-full" />
          </HighlightCard>
          <HighlightCard sheet="sheet-visits" href={url('pricing/#visits')} eyebrow="Local visits" title="Eyes on the property, when you need them." tone="blue">
            <VisitReport className="w-full" />
          </HighlightCard>
          <HighlightCard sheet="sheet-suite" href={url('landlord-shield/#suite')} eyebrow="The Automation Suite" title="Software we built and own. Included.">
            <div className="hcard-bleed">
              <DashboardScreen />
            </div>
          </HighlightCard>
        </ul>
        <p className="wrap mt-4 text-[0.8125rem] text-ink-4">Product screens are illustrations with sample figures, not real tenancies.</p>
      </section>

      {/* ---- Rentals ------------------------------------------------------- */}
      <Section id="rentals" labelledBy="rentals-title">
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
          <a href={url('rentals/#leasing')} className="spot mt-8 flex flex-col gap-3 rounded-4xl bg-canvas-alt p-6 text-ink hover:no-underline sm:flex-row sm:items-center sm:justify-between sm:p-7" data-track="leasing:home">
            <span className="flex items-center gap-4">
              <span className="icon-badge shrink-0 !bg-white">
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

      {/* ---- How it works + everything else --------------------------------- */}
      <Section id="how" tone="alt" labelledBy="how-title">
        <div className="wrap">
          <Heading
            id="how-title"
            eyebrow="How it works"
            title="It starts with a 15-minute call."
            lead="Day-to-day management, documented in LandlordEzy. Local visits when you need them, at a set price."
            size="md"
          />
          <ol className="steprow no-scrollbar mt-10 md:mt-12">
            {[
              { Icon: Phone, t: 'A 15-minute call', b: 'Your units, your cities, your current tenants and what you need from us.' },
              { Icon: FileText, t: 'A clear monthly total', b: 'One price for the portfolio. Anything local or project-based is quoted separately.' },
              { Icon: ClipboardCheck, t: 'Onboarding in LandlordEzy', b: 'Leases, ledgers and documents organised, and tenants introduced to their portal.' },
              { Icon: Scale, t: 'Every month', b: 'A checked ledger and statement, Equifax rent reporting, and legal help on the same team.' },
            ].map(({ Icon, t, b }, idx) => (
              <li key={t} className="steprow-item spot" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.08}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-16 max-w-[68rem] md:mt-20" data-tabs-root>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="text-headline">More than monthly management.</h3>
                <p className="mt-2 text-ink-3">Specialist work is scoped and quoted on its own, so your monthly plan stays simple.</p>
              </div>
              <TabRow name="more" label="More from OLH" tabs={more.map((g) => ({ key: g.key, label: g.label }))} className="shrink-0" />
            </div>
            {more.map((g, idx) => (
              <TabPanel key={g.key} name="more" tab={g.key} first={idx === 0} className="mt-6">
                <p className="tabpanel-label">
                  {g.label} <span className="font-normal text-ink-4">· {g.note}</span>
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="morelink spot">
                        <span>{l.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </div>

          <a href={url('sireg/')} className="spot mx-auto mt-10 flex max-w-[68rem] flex-col gap-3 rounded-4xl bg-white p-6 text-ink shadow-card hover:no-underline sm:flex-row sm:items-center sm:justify-between sm:p-7" rel="noopener" data-track="sireg:home">
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
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Good to know before you call.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={homeFaqs} />
          <a href={url('contact/')} className="link-more mt-8">
            Ask us anything
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

      <HighlightSheets />
      <ScopeSheets />
    </>
  )
}
