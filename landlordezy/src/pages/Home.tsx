import type { ReactNode } from 'react'
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  Flame,
  Landmark,
  Leaf,
  Megaphone,
  MonitorSmartphone,
  PiggyBank,
  ScanLine,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Heading, Section, Stat, Voices } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { JobChips } from '../components/JobChips'
import { LiveRentals } from '../components/LiveRentals'
import { homeFaqs } from '../content/faqs'
import { voicesFor } from '../content/voices'
import {
  CollectCard,
  DashboardScreen,
  EzyChatPhone,
  LateRentAlert,
  LeaseScreen,
  ListingScreen,
  N4Screen,
  NotificationsPhone,
  ReportingScreen,
  ScreeningScreen,
} from '../components/mocks/screens'
import { landlordPlans } from '../content/pricing'

const journey: { key: string; step: string; title: string; body: string; href: string; link: string; visual: ReactNode }[] = [
  {
    key: 'list',
    step: 'List',
    title: 'Fill the vacancy.',
    body: 'Post free on EzyRent and meet only pre-screened renters, with showings that book themselves. Or go on REALTOR.ca for one flat fee.',
    href: 'listings/',
    link: 'Listings & placement',
    visual: <ListingScreen className="w-full max-w-[30rem]" />,
  },
  {
    key: 'screen',
    step: 'Screen',
    title: 'Choose the right tenant.',
    body: 'A real Equifax report with an AI recommendation, from $29.99 and a soft inquiry. Add ID and bank-statement checks for $10 each, and the applicant can pay.',
    href: 'tenant-screening/',
    link: 'Tenant screening',
    visual: <ScreeningScreen className="w-full max-w-[30rem]" />,
  },
  {
    key: 'sign',
    step: 'Sign',
    title: 'Sign the Ontario lease.',
    body: 'The Ontario Standard Lease, checked by AI and e-signed on any device. Then a move-in inspection your tenant approves.',
    href: 'leases/',
    link: 'Leases & inspections',
    visual: <LeaseScreen className="w-full max-w-[30rem]" />,
  },
  {
    key: 'collect',
    step: 'Collect',
    title: 'Get paid without chasing.',
    body: 'Tenants pay by Interac e-Transfer as they always have. Each payment is matched to the right month, receipted and reconciled. No processing fees.',
    href: 'rent-collection/',
    link: 'Rent collection',
    visual: <CollectCard className="w-full max-w-[26rem]" />,
  },
  {
    key: 'report',
    step: 'Report',
    title: 'Reward good tenants.',
    body: 'On-time rent is reported to Equifax every month, so good tenants build credit and everyone has a reason to pay on the first.',
    href: 'rent-reporting/',
    link: 'Rent reporting',
    visual: <ReportingScreen className="w-full max-w-[30rem]" />,
  },
  {
    key: 'enforce',
    step: 'Enforce',
    title: 'Handle problems by the book.',
    body: 'If rent is missed, you know by 7 a.m., and a correct N4 is ready to serve in 60 seconds. When it gets serious, licensed paralegals take it from there.',
    href: 'notices/',
    link: 'Notices & legal help',
    visual: <LateRentAlert className="w-full max-w-[26rem]" />,
  },
]

const credentials = [
  { icon: ShieldCheck, text: 'Equifax rent reporting' },
  { icon: Building2, text: 'Licensed Ontario brokerage' },
  { icon: Scale, text: 'Licensed paralegals' },
  { icon: BookOpenCheck, text: 'Built on Ontario’s RTA' },
  { icon: Leaf, text: 'Canadian-owned' },
]

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'how', label: 'How it works' },
  { id: 'n4', label: 'The N4 in 60 seconds' },
  { id: 'features', label: 'Everything included' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'founder', label: 'Who’s behind it' },
  { id: 'tools', label: 'Free calculators' },
  { id: 'faq', label: 'Questions' },
]

/** On phones the visuals step aside and every tile becomes a compact, tappable card. */
function Bento() {
  const tile = 'tile group flex flex-col overflow-hidden p-5 text-ink hover:no-underline sm:p-7 md:p-9'
  const smallTitle = 'mt-1 text-[1rem] font-semibold leading-snug tracking-[-0.01em] md:text-title'
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 md:gap-5">
      <a href={url('ezy-ai/')} className={`${tile} col-span-2 md:col-span-3 md:row-span-2`} data-reveal>
        <span className="icon-badge mb-4 md:hidden">
          <Sparkles className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
        </span>
        <p className="eyebrow">Ezy AI</p>
        <h3 className="mt-1 text-[1.125rem] font-semibold leading-snug tracking-[-0.015em] md:mt-2 md:text-headline">
          Tell Ezy what you need. It does the paperwork.
        </h3>
        <p className="mt-3 hidden max-w-[26rem] text-ink-3 md:block">
          Entry notices, letters and reminders drafted from the tenancy’s real details and sent for you, with proof they were
          opened.
        </p>
        {/* The phone runs off the tile's bottom edge, so it never stretches the row. */}
        <div className="mt-8 hidden min-h-[12rem] grow basis-0 justify-center overflow-hidden md:flex">
          <EzyChatPhone className="w-[62%] max-w-[17rem] self-start" />
        </div>
      </a>
      <a href={url('maintenance/')} className={`${tile} md:col-span-3`} data-reveal>
        <span className="icon-badge mb-4 md:hidden">
          <Wrench className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
        </span>
        <p className="eyebrow">Maintenance</p>
        <h3 className={smallTitle}>One tap sends a repair to tenant, owner and vendor.</h3>
        <div className="mt-6 hidden grid-cols-3 gap-2 md:grid" aria-hidden="true">
          {[
            ['Tenant', 'Thu 1–3 p.m.'],
            ['Owner', 'Approved'],
            ['Vendor', 'On the way'],
          ].map(([k, v]) => (
            <span key={k} className="rounded-2xl bg-white px-3 py-2.5 text-center shadow-card">
              <span className="block text-[0.75rem] text-ink-4">{k}</span>
              <span className="block text-[0.8125rem] font-semibold text-go-ink">{v}</span>
            </span>
          ))}
        </div>
      </a>
      <a href={url('maintenance/')} className={`${tile} md:col-span-3`} data-reveal>
        <span className="icon-badge mb-4 md:hidden">
          <Flame className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
        </span>
        <p className="eyebrow">Fire safety</p>
        <h3 className={smallTitle}>Ontario Fire Code inspections from your phone.</h3>
        <div className="mt-6 hidden rounded-2xl bg-white p-4 shadow-card md:block" aria-hidden="true">
          <div className="flex items-center justify-between text-[0.8125rem]">
            <span className="flex items-center gap-2 font-semibold">
              <Flame className="h-4 w-4 text-warn" aria-hidden /> 48 Maple Ave
            </span>
            <span className="text-ink-3">5 of 7</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-canvas-deep">
            <span className="block h-full w-[71%] rounded-full bg-brand" />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['Smoke alarms', 'CO alarm', 'Extinguisher', 'Exits'].map((t) => (
              <span key={t} className="chip-go">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden /> {t}
              </span>
            ))}
          </div>
        </div>
      </a>
      {[
        { href: 'rent-collection/', icon: MonitorSmartphone, eyebrow: 'Tenant portal', title: 'Receipts and rent history, no password needed.' },
        { href: 'maintenance/', icon: ScanLine, eyebrow: 'Expenses', title: 'Snap a receipt. AI files it for tax time.' },
        { href: 'maintenance/', icon: Megaphone, eyebrow: 'Broadcasts', title: 'Text or email every tenant at once.' },
        { href: 'maintenance/', icon: CalendarClock, eyebrow: 'Team calendar', title: 'Every lease, task and inspection on one calendar.' },
        { href: 'property-managers/', icon: Users, eyebrow: 'Teams', title: 'Notes, @mentions and roles for your whole team.' },
        { href: 'leases/', icon: Zap, eyebrow: 'Utilities', title: 'Who pays gas, hydro and water, settled on the lease.' },
      ].map((t) => (
        <a key={t.title} href={url(t.href)} className={`${tile} md:col-span-2`} data-reveal>
          <span className="icon-badge">
            <t.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
          </span>
          <p className="eyebrow mt-4 md:mt-6">{t.eyebrow}</p>
          <h3 className={smallTitle}>{t.title}</h3>
        </a>
      ))}
    </div>
  )
}

export function Home() {
  const self = landlordPlans[1]
  return (
    <>
      <ChapterNav chapters={chapters} cta={null} />

      {/* ---- Hero ------------------------------------------------------- */}
      {/* Phones: the product picture sits between the eyebrow and the headline, so the
          first screen shows the app. Laptops: headline left, picture right, both above the fold. */}
      <section id="overview" data-hero className="relative overflow-hidden bg-white pb-12 pt-6 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="hero-grid">
          <p className="eyebrow hero-eyebrow">Landlord software for Ontario</p>
          <div className="hero-visual">
            <div className="hero-rise relative">
              <DashboardScreen />
              <NotificationsPhone className="hero-rise-2 absolute -bottom-6 right-[-1%] w-[27%] min-w-[6rem] max-w-[15rem] min-[375px]:min-w-[7rem] sm:-bottom-10 md:right-[-3%]" />
            </div>
          </div>
          <div className="hero-copy">
            <h1 className="hero-title">Your rentals, on autopilot.</h1>
            <p className="hero-lead mt-5 text-lead text-ink-3">
              Collect rent by e-Transfer, screen tenants with Equifax and prepare a correct N4 in 60 seconds. Built for
              Ontario’s rules, with licensed paralegals behind it.
            </p>
            <div className="hero-actions mt-7">
              <Actions
                align="split"
                secondary={{ label: 'Try the live demo', href: url('demo/') }}
                note={
                  <>
                    <strong className="whitespace-nowrap font-semibold text-ink-2">Free for 2 tenants</strong> ·{' '}
                    <span className="whitespace-nowrap">then $9.99 + $1 a door</span>
                    {/* Two tidy lines on a phone, one line on anything wider. */}
                    <span className="hidden sm:inline"> · </span>
                    <br className="sm:hidden" />
                    <span className="whitespace-nowrap">No card</span> · <span className="whitespace-nowrap">About 30 seconds</span>
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

      {/* ---- Credentials + proof ---------------------------------------- */}
      <section aria-label="Why landlords trust LandlordEzy" className="bg-white pb-14 pt-6 sm:pb-20 sm:pt-8">
        <div className="wrap">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.9375rem] text-ink-3">
            {credentials.map((c) => (
              <li key={c.text} className="flex items-center gap-2">
                <c.icon className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                {c.text}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-12 grid max-w-[60rem] grid-cols-2 gap-x-6 gap-y-9 text-center md:grid-cols-4">
            <Stat value="31,700+" count={31700} label="landlords in the Ontario Landlord Help community" />
            <Stat value="23 years" label="in Ontario property management" />
            <Stat value="60 sec" label="to a correct N4, ready to serve" />
            <Stat value="$0" label="to start, no credit card" />
          </div>
        </div>
      </section>

      {/* ---- The journey ------------------------------------------------ */}
      <Section id="how" tone="alt" labelledBy="journey-title">
        <div className="wrap">
          <Heading
            id="journey-title"
            eyebrow="One app, start to finish"
            title={
              <>
                The whole tenancy. <span className="inline-block">One login.</span>
              </>
            }
            lead="Every step shares one record, so nothing falls through the cracks."
          />
          {/* Phones: six labelled chips over a swipeable row of steps. Laptops: the pinned scroll story. */}
          <div className="journey-tabs no-scrollbar lg:hidden" role="group" aria-label="Jump to a step" data-journey-tabs>
            {journey.map((s, idx) => (
              <a
                key={s.key}
                href={`#journey-step-${s.key}`}
                className="journey-tab"
                data-journey-tab={s.key}
                aria-current={idx === 0 ? 'step' : undefined}
                data-track={`journey:${s.key}`}
              >
                <span className="journey-tab-n">{idx + 1}</span> {s.step}
              </a>
            ))}
          </div>
          <div className="journey-track mt-5 lg:mt-20" data-journey>
            {journey.map((s, idx) => (
              <article
                key={s.key}
                id={`journey-step-${s.key}`}
                className="journey-step grid items-center gap-7 rounded-4xl bg-white p-6 shadow-card sm:p-10 lg:min-h-[64vh] lg:grid-cols-2 lg:gap-16 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none"
                data-journey-step={s.key}
                data-active={idx === 0 ? 'true' : 'false'}
                aria-labelledby={`journey-${s.key}`}
              >
                <div className="max-w-[30rem]">
                  <p className="flex items-center gap-3 text-[0.9375rem] font-semibold text-brand-text">
                    <span className="journey-badge inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[0.8125rem] text-white">
                      {idx + 1}
                    </span>
                    {s.step}
                  </p>
                  <h3 id={`journey-${s.key}`} className="mt-3 text-display-md lg:mt-4">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-lead text-ink-3 lg:mt-4">{s.body}</p>
                  <a href={url(s.href)} className="link-more mt-5 lg:mt-6">
                    {s.link}
                  </a>
                </div>
                <div className="journey-visual flex justify-center lg:sticky lg:top-[20vh] lg:self-start lg:py-8">{s.visual}</div>
              </article>
            ))}
          </div>
          <LiveRentals className="mx-auto mt-6 lg:mt-12" />
        </div>
      </Section>

      {/* ---- N4 spotlight ------------------------------------------------- */}
      <section id="n4" aria-labelledby="n4-title" className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-32">
        <div className="glow-blue pointer-events-none absolute -right-40 top-10 h-[40rem] w-[40rem] opacity-70" aria-hidden />
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-brand-glow" aria-hidden /> Bill 60-ready since September 21, 2026
            </p>
            <h2 id="n4-title" className="mt-6 text-display-lg !text-white">
              The N4, in&nbsp;60 seconds.
            </h2>
            <p className="mt-6 max-w-[34rem] text-lead text-white/70">
              It used to mean a paralegal bill, hand-done math and a form that could be thrown out over one mistake. Now the N4
              fills itself from your rent ledger, with the arrears, the new 7-day termination date and the Certificate of
              Service.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {['Arrears pulled from the ledger, period by period', 'The right date for hand, courier or mail delivery', 'E-signed, served and filed with proof'].map(
                (t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand-glow" strokeWidth={2.6} aria-hidden />
                    {t}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={url('notices/')} className="btn-primary" data-track="n4:notices">
                See how notices work
              </a>
              <a href={url('tools/n4-date-calculator/')} className="link-more-dark" data-track="n4:calculator">
                Free N4 date calculator
              </a>
            </div>
          </div>
          <N4Screen className="mx-auto w-full max-w-[34rem]" dark />
        </div>
      </section>

      {/* ---- Everything else --------------------------------------------- */}
      <Section id="features" labelledBy="more-title">
        <div className="wrap">
          <Heading id="more-title" eyebrow="And everything in between" title="Built for the work nobody sees." size="md" />
          <div className="mt-10 md:mt-14">
            <Bento />
          </div>
          <div className="mt-8 text-center md:mt-10">
            <a href={url('product/')} className="link-more">
              Explore every feature
            </a>
          </div>
        </div>
      </Section>

      <Voices items={voicesFor('')} tone="white" />

      {/* ---- Pricing: the usual stack against one price -------------------- */}
      <Section id="pricing" tone="alt" labelledBy="price-title">
        <div className="wrap">
          <Heading
            id="price-title"
            eyebrow="Pricing"
            title="A dollar a door."
            lead="Six logins and six bills, or one record for the whole tenancy. Start free, then $9.99 a month plus a dollar a door when you want the automation."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[62rem] gap-4 md:mt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-5">
            <div className="flex flex-col rounded-4xl bg-white p-7 shadow-card sm:p-8" data-reveal>
              <p className="text-[0.9375rem] font-semibold text-ink-3">The usual stack</p>
              <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-[0.9375rem] sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-3">
                {['A listing site', 'A screening service', 'An e-signature tool', 'A rent spreadsheet', 'A paralegal for the paperwork', 'A credit-reporting service'].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2.5 text-ink-3">
                      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-canvas-alt text-ink-4">
                        <X className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                      </span>
                      <span className="line-through decoration-ink-4/50">{t}</span>
                    </li>
                  ),
                )}
              </ul>
              <p className="mt-6 border-t border-line-soft pt-5 text-[0.875rem] leading-relaxed text-ink-3 lg:mt-auto">
                Or one big suite: <a href="https://www.buildium.com/pricing/" rel="noopener">Buildium</a> starts at US$62 a month, and{' '}
                <a href="https://www.doorloop.com/pricing" rel="noopener">DoorLoop</a>’s minimum is US$199 (as of October 2026).
              </p>
            </div>
            <div className="flex flex-col rounded-4xl bg-white p-7 shadow-float ring-2 ring-brand sm:p-8" data-reveal data-pricing>
              <p className="font-semibold">{self.name}</p>
              <p className="mt-4 font-display text-[3rem] font-bold leading-none tracking-[-0.035em]">
                <span data-price-base={self.base} data-price-per-door={self.perDoor}>
                  $14.99
                </span>
                <span className="text-[1rem] font-medium tracking-normal text-ink-3"> /month</span>
              </p>
              <p className="mt-2 text-ink-3">
                $9.99 + $1 per door, for <span data-doors-out>5 doors</span>, plus HST.
              </p>
              <label className="mt-6 block">
                <span className="sr-only">Number of doors</span>
                <input type="range" min={1} max={60} defaultValue={5} className="range" aria-label="Number of doors" />
              </label>
              <p className="mt-6 text-[0.9375rem] text-ink-3">Equifax reporting, automated N4/N1, e-lease, screening and e-Transfer rent collection.</p>
              <a href={site.app.signup} className="btn-primary plan-cta mt-7" data-track="start-free:pricing">
                Start free, upgrade anytime
              </a>
              <p className="mt-3 text-center text-[0.8125rem] text-ink-4">No card · Cancel anytime</p>
            </div>
          </div>
          <div className="mx-auto mt-6 flex max-w-[62rem] flex-col items-center gap-2 text-center text-[0.9375rem] text-ink-3">
            <p>
              <strong className="font-semibold text-ink-2">Just starting?</strong> The Free plan is $0 for up to 2 tenants, with no
              card. <strong className="font-semibold text-ink-2">Managing for owners?</strong> $29.99/month + $1 per door.{' '}
              <a href={url('property-managers/')}>See the plans</a>
            </p>
            <p>
              Rather ask a person? Call{' '}
              <a href={`tel:${site.phone.tel}`} data-track="call:home-pricing">
                {site.phone.display}
              </a>{' '}
              or{' '}
              <a href={site.app.book} data-track="book-call:home-pricing">
                book a free 15-minute call
              </a>
              .
            </p>
          </div>
          <div className="mt-8 text-center">
            <a href={url('pricing/')} className="link-more">
              Compare every plan
            </a>
          </div>
        </div>
      </Section>

      {/* ---- Founder ------------------------------------------------------ */}
      <Section id="founder" labelledBy="founder-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-5xl bg-[linear-gradient(160deg,#0b1a5c_0%,#050c3b_60%,#02061f_100%)] text-white shadow-float lg:block" data-reveal="scale">
            <div className="glow-blue absolute inset-x-0 top-0 h-2/3 opacity-70" aria-hidden />
            <div className="relative flex h-full flex-col justify-between p-9">
              <p className="font-display text-[1.75rem] font-semibold leading-snug tracking-[-0.02em]">
                Twenty-three years of Ontario rentals, built into one app.
              </p>
              <div>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 font-display text-[1.375rem] font-bold">
                  PR
                </span>
                <p className="mt-4 font-semibold">Paul J. Rouillard</p>
                <p className="text-[0.9375rem] text-white/60">Founder · Broker of Record</p>
              </div>
            </div>
          </div>
          <div data-reveal>
            <div className="mb-6 flex items-center gap-4 lg:hidden">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-ink font-display text-[1.125rem] font-bold text-white">
                PR
              </span>
              <span>
                <span className="block font-semibold">Paul J. Rouillard</span>
                <span className="block text-[0.875rem] text-ink-3">Founder · Broker of Record</span>
              </span>
            </div>
            <p className="eyebrow">Built by a landlord</p>
            <h2 id="founder-title" className="mt-3 text-display-md">
              Made by people who’ve stood in front of the Board.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Paul J. Rouillard collected his first rent at 14 and started his own property management company at 22. Twenty-three
              years later he’s Broker of Record at List It Realty, founder of OLH Property Management, and moderator of the
              31,700-member Ontario Landlord Help community.
            </p>
            <p className="mt-4 text-ink-3">
              LandlordEzy is the platform he wished he’d had, built under one roof by licensed REALTORS®, paralegals, property
              managers, accountants and engineers.
              The next goal is bigger: a rental credit system for Canada, where every on-time rent payment counts.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <a href={url('about/')} className="link-more">
                Our story
              </a>
              <a href={site.social.facebookGroup} className="link-more" rel="noopener">
                Join the free community
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Free tools ---------------------------------------------------- */}
      <Section id="tools" tone="alt" labelledBy="tools-title">
        <div className="wrap">
          <Heading
            id="tools-title"
            eyebrow="Free for every Ontario landlord"
            title="Get the dates right. For free."
            lead="Calculators that follow the official rules, updated for Bill 60 and the 2027 guideline."
            size="md"
          />
          <div className="mt-10 grid gap-3 sm:gap-5 md:mt-12 md:grid-cols-3">
            {[
              { href: 'tools/n4-date-calculator/', icon: Calculator, t: 'N4 termination date', d: 'The 7-day rule, with courier and mail days added.' },
              { href: 'tools/rent-increase-calculator/', icon: PiggyBank, t: 'Rent increase', d: '1.9% for 2027, the earliest legal date and when to serve.' },
              { href: 'tools/rent-deposit-interest-calculator/', icon: Landmark, t: 'Deposit interest', d: 'Interest owed on last month’s rent, and the top-up.' },
            ].map((x) => (
              <a key={x.t} href={url(x.href)} className="group flex items-center gap-4 rounded-4xl bg-white p-5 text-ink shadow-card hover:no-underline md:flex-col md:items-start md:p-8" data-reveal>
                <span className="icon-badge shrink-0">
                  <x.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[1.125rem] font-semibold tracking-[-0.01em] md:mt-6 md:text-title">{x.t}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-3 md:mt-2 md:text-body">{x.d}</span>
                </span>
                <span className="hidden items-center gap-1 text-brand-text md:mt-6 md:inline-flex">
                  Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-brand md:hidden" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions, answered.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={homeFaqs} />
          <a href={url('faq/')} className="link-more mt-8">
            More questions
          </a>
        </div>
      </Section>

      <CTABand
        title="Start free in about 30 seconds."
        fine={
          <>
            Free plan · No credit card · Rather talk?{' '}
            <a href={`tel:${site.phone.tel}`} className="text-white/80 underline" data-track="call:cta-band">
              {site.phone.display}
            </a>
          </>
        }
      />
    </>
  )
}

