import type { ReactNode } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Calculator,
  CalendarClock,
  Check,
  Flame,
  Landmark,
  Leaf,
  Megaphone,
  PenLine,
  PiggyBank,
  ScanLine,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Heading, Section, Stat } from '../components/ui'
import { homeFaqs } from '../content/faqs'
import {
  CollectCard,
  DashboardScreen,
  EzyChatPhone,
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
    body: 'A real Equifax report, read by AI alongside bank statements and ID, with a clear recommendation. A soft inquiry, from $29.99, and the applicant can pay.',
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
    body: 'When rent is missed, a correct N4 is ready in 60 seconds. When it gets serious, licensed paralegals take it from there.',
    href: 'notices/',
    link: 'Notices & legal help',
    visual: <N4Screen className="w-full max-w-[30rem]" />,
  },
]


const credentials = [
  { icon: ShieldCheck, text: 'Equifax-connected rent reporting' },
  { icon: Building2, text: 'Licensed Ontario brokerage' },
  { icon: Scale, text: 'Licensed paralegal team' },
  { icon: BookOpenCheck, text: 'Built on Ontario’s RTA and LTB rules' },
  { icon: Leaf, text: 'Canadian-owned and operated' },
]

function Bento() {
  const tile = 'tile flex flex-col overflow-hidden p-7 sm:p-9'
  return (
    <div className="grid gap-5 md:grid-cols-6">
      <a href={url('ezy-ai/')} className={`${tile} group text-ink hover:no-underline md:col-span-3 md:row-span-2`} data-reveal>
        <p className="eyebrow">Ezy AI</p>
        <h3 className="mt-2 text-headline">Tell it what you need. It does the paperwork.</h3>
        <p className="mt-3 max-w-[26rem] text-ink-3">
          Entry notices, letters and reminders drafted from the tenancy’s real details, sent by email and text, with proof
          they were opened.
        </p>
        <div className="mt-8 flex flex-1 items-end justify-center">
          <EzyChatPhone className="w-[62%] max-w-[17rem] translate-y-10" />
        </div>
      </a>
      <a href={url('maintenance/')} className={`${tile} group text-ink hover:no-underline md:col-span-3`} data-reveal>
        <p className="eyebrow">Maintenance</p>
        <h3 className="mt-1 text-title">One tap sends a repair to tenant, owner and vendor.</h3>
        <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
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
      <a href={url('maintenance/')} className={`${tile} group text-ink hover:no-underline md:col-span-3`} data-reveal>
        <p className="eyebrow">Fire safety</p>
        <h3 className="mt-1 text-title">Ontario Fire Code inspections from your phone.</h3>
        <div className="mt-6 rounded-2xl bg-white p-4 shadow-card" aria-hidden="true">
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
        { href: 'leases/', icon: PenLine, eyebrow: 'E-lease', title: 'Ontario Standard Lease, e-signed anywhere.' },
        { href: 'maintenance/', icon: ScanLine, eyebrow: 'Expenses', title: 'Snap a receipt. AI files it for tax time.' },
        { href: 'listings/', icon: Megaphone, eyebrow: 'Listings', title: 'Free listings. No-show protection.' },
        { href: 'maintenance/', icon: CalendarClock, eyebrow: 'Team calendar', title: 'Every lease, task and inspection on one calendar.' },
        { href: 'property-managers/', icon: Users, eyebrow: 'Teams', title: 'Notes, @mentions and roles for your whole team.' },
        { href: 'legal-help/', icon: Landmark, eyebrow: 'Legal help', title: 'Licensed paralegals, one tap away.' },
      ].map((t) => (
        <a key={t.title} href={url(t.href)} className={`${tile} group text-ink hover:no-underline md:col-span-2`} data-reveal>
          <span className="icon-badge">
            <t.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
          </span>
          <p className="eyebrow mt-6">{t.eyebrow}</p>
          <h3 className="mt-1 text-title">{t.title}</h3>
        </a>
      ))}
    </div>
  )
}

export function Home() {
  const self = landlordPlans[1]
  return (
    <>
      {/* ---- Hero ------------------------------------------------------- */}
      <section data-hero className="relative overflow-hidden bg-white pb-10 pt-14 sm:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow">Landlord software for Ontario</p>
          <h1 className="mx-auto mt-3 max-w-[16ch] text-display-xl">Your rentals, on autopilot.</h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead text-ink-3">
            Collect rent by e-Transfer, screen tenants with Equifax and serve a correct N4 in 60 seconds. One app built around
            Ontario’s rules, with licensed paralegals behind it.
          </p>
          <div className="mt-9">
            <Actions secondary={{ label: 'Try the live demo', href: url('demo/') }} note="Free plan · No credit card · Prices in CAD" />
          </div>
        </div>
        <div className="wrap relative mt-14 sm:mt-16">
          <div className="hero-rise relative mx-auto max-w-[66rem]">
            <DashboardScreen />
            <NotificationsPhone className="hero-rise-2 absolute -bottom-10 right-[-1%] w-[27%] min-w-[7.5rem] max-w-[17rem] sm:-bottom-14 md:right-[-3%]" />
          </div>
        </div>
      </section>

      {/* ---- Credentials + proof ---------------------------------------- */}
      <section aria-label="Why landlords trust LandlordEzy" className="bg-white pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="wrap">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[0.9375rem] text-ink-3">
            {credentials.map((c) => (
              <li key={c.text} className="flex items-center gap-2">
                <c.icon className="h-[18px] w-[18px] text-brand" strokeWidth={1.8} aria-hidden />
                {c.text}
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-14 grid max-w-[60rem] grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4">
            <Stat value="31,700+" count={31700} label="landlords in the Ontario Landlord Help community" />
            <Stat value="23 years" label="in Ontario property management" />
            <Stat value="60 sec" label="to serve a correct N4" />
            <Stat value="$0" label="to start, no credit card" />
          </div>
        </div>
      </section>

      {/* ---- The journey ------------------------------------------------ */}
      <Section tone="alt" labelledBy="journey-title">
        <div className="wrap">
          <Heading
            id="journey-title"
            eyebrow="One app, start to finish"
            title="The whole tenancy. One login."
            lead="Most landlords juggle a listing site, a screening service, a lease tool, a spreadsheet, a paralegal and a forum. LandlordEzy connects every step, so nothing falls through the cracks."
          />
          <div className="mt-16 space-y-6 lg:mt-20 lg:space-y-0" data-journey>
            {journey.map((s, idx) => (
              <article
                key={s.key}
                className="journey-step grid items-center gap-8 rounded-4xl bg-white p-7 shadow-card sm:p-10 lg:min-h-[64vh] lg:grid-cols-2 lg:gap-16 lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none"
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
                  <h3 id={`journey-${s.key}`} className="mt-4 text-display-md">
                    {s.title}
                  </h3>
                  <p className="mt-4 text-lead text-ink-3">{s.body}</p>
                  <a href={url(s.href)} className="link-more mt-6">
                    {s.link}
                  </a>
                </div>
                <div className="journey-visual flex justify-center lg:sticky lg:top-[20vh] lg:self-start lg:py-8">{s.visual}</div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- N4 spotlight ------------------------------------------------- */}
      <section aria-labelledby="n4-title" className="relative overflow-hidden bg-brand-ink py-24 text-white sm:py-32">
        <div className="glow-blue pointer-events-none absolute -right-40 top-10 h-[40rem] w-[40rem] opacity-70" aria-hidden />
        <div className="wrap relative grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[0.8125rem] font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-brand-glow" aria-hidden /> Bill 60-ready since September 21, 2026
            </p>
            <h2 id="n4-title" className="mt-6 text-display-lg !text-white">
              The N4, in 60 seconds.
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
              <a href={url('notices/')} className="btn-primary">
                See how notices work
              </a>
              <a href={url('tools/n4-date-calculator/')} className="link-more-dark">
                Free N4 date calculator
              </a>
            </div>
          </div>
          <N4Screen className="mx-auto w-full max-w-[34rem]" dark />
        </div>
      </section>

      {/* ---- Everything else --------------------------------------------- */}
      <Section labelledBy="more-title">
        <div className="wrap">
          <Heading id="more-title" eyebrow="And everything in between" title="Built for the work nobody sees." size="md" />
          <div className="mt-14">
            <Bento />
          </div>
          <div className="mt-10 text-center">
            <a href={url('product/')} className="link-more">
              Explore every feature
            </a>
          </div>
        </div>
      </Section>

      {/* ---- Replace six tools -------------------------------------------- */}
      <Section tone="alt" labelledBy="replace-title">
        <div className="wrap">
          <Heading
            id="replace-title"
            eyebrow="Why landlords switch"
            title="Six logins and six bills. Or one."
            lead="Each of those tools does one job and none of them talk to each other. LandlordEzy shares one record across every step, so a payment updates the ledger, the ledger fills the N4, and the N4 lands in the tenant’s file."
            size="md"
          />
          <div className="mx-auto mt-14 grid max-w-[60rem] gap-5 md:grid-cols-2">
            <div className="rounded-4xl bg-white p-8 shadow-card" data-reveal>
              <p className="text-[0.9375rem] font-semibold text-ink-3">The usual stack</p>
              <ul className="mt-5 space-y-3.5">
                {['A listing site', 'A screening service', 'An e-signature tool', 'A rent spreadsheet', 'A paralegal for the paperwork', 'A credit-reporting service'].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-3 text-ink-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-canvas-alt text-ink-4">
                        <X className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                      </span>
                      <span className="line-through decoration-ink-4/50">{t}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-4xl bg-brand-ink p-8 text-white shadow-float" data-reveal>
              <div className="glow-blue pointer-events-none absolute -right-24 -top-24 h-72 w-72 opacity-60" aria-hidden />
              <p className="relative text-[0.9375rem] font-semibold text-white/60">LandlordEzy</p>
              <p className="relative mt-5 font-display text-[2.25rem] font-bold leading-tight tracking-[-0.03em]">
                One login.
                <br />
                One record.
                <br />
                From $0.
              </p>
              <ul className="relative mt-6 space-y-2.5 text-white/80">
                {['Listings, screening, leases and rent', 'Equifax reporting and LTB notices', 'Licensed humans when you need them'].map((t) => (
                  <li key={t} className="flex gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-glow" strokeWidth={1.8} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={site.app.signup} className="btn-light relative mt-8">
                Start free
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Pricing teaser --------------------------------------------- */}
      <Section labelledBy="price-title">
        <div className="wrap">
          <Heading id="price-title" eyebrow="Pricing" title="A dollar a door." lead="Start free. Pay by the door when you want the automation. Cancel anytime." size="md" />
          <div className="mx-auto mt-14 grid max-w-[62rem] gap-5 lg:grid-cols-[1fr_1.25fr_1fr]">
            <div className="flex flex-col rounded-4xl bg-canvas-alt p-8" data-reveal>
              <p className="font-semibold">Free</p>
              <p className="mt-4 font-display text-[3rem] font-bold leading-none tracking-[-0.035em]">$0</p>
              <p className="mt-2 text-ink-3">Up to 2 tenants. No card.</p>
              <div className="mt-auto pt-8">
                <a href={site.app.signup} className="btn-secondary w-full">
                  Start free
                </a>
              </div>
            </div>
            <div className="flex flex-col rounded-4xl bg-white p-8 shadow-float ring-2 ring-brand" data-reveal data-pricing>
              <div className="flex items-center justify-between">
                <p className="font-semibold">{self.name}</p>
                <span className="chip-brand">Most popular</span>
              </div>
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
              <a href={site.app.signup} className="btn-primary mt-7">
                Start free, upgrade anytime
              </a>
            </div>
            <div className="flex flex-col rounded-4xl bg-canvas-alt p-8" data-reveal>
              <p className="font-semibold">Property managers</p>
              <p className="mt-4 font-display text-[3rem] font-bold leading-none tracking-[-0.035em]">$29.99</p>
              <p className="mt-2 text-ink-3">+ $1 per door. Owner accounting, statements, CRM.</p>
              <a href={url('property-managers/')} className="link-more mt-auto pt-6">
                For property managers
              </a>
            </div>
          </div>
          <div className="mt-10 text-center">
            <a href={url('pricing/')} className="link-more">
              Compare every plan
            </a>
          </div>
        </div>
      </Section>

      {/* ---- Founder ------------------------------------------------------ */}
      <Section tone="alt" labelledBy="founder-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-5xl bg-[linear-gradient(160deg,#0b1a5c_0%,#050c3b_60%,#02061f_100%)] text-white shadow-float" data-reveal="scale">
            <div className="glow-blue absolute inset-x-0 top-0 h-2/3 opacity-70" aria-hidden />
            <div className="relative flex h-full flex-col justify-between p-9">
              <p className="font-display text-[1.75rem] font-semibold leading-snug tracking-[-0.02em]">“We need each other.”</p>
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
            <p className="eyebrow">Built by a landlord</p>
            <h2 id="founder-title" className="mt-3 text-display-md">
              Made by people who’ve stood in front of the Board.
            </h2>
            <p className="mt-6 text-lead text-ink-3">
              Paul J. Rouillard collected his first rent at 14 and started his own property management company at 22. Twenty-three
              years later he’s Broker of Record at List It Realty, founder of OLH Property Management, and moderator of the
              31,700-member Ontario Landlord Help community.
            </p>
            <p className="mt-4 text-ink-3">
              LandlordEzy is the platform he wished he’d had: built in-house by realtors, paralegals, property managers and
              engineers working side by side, and improved almost every week from what landlords ask for.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
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
      <Section labelledBy="tools-title">
        <div className="wrap">
          <Heading
            id="tools-title"
            eyebrow="Free for every Ontario landlord"
            title="Get the dates right. For free."
            lead="Calculators that follow the official rules, updated for Bill 60 and the 2027 guideline."
            size="md"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { href: 'tools/n4-date-calculator/', icon: Calculator, t: 'N4 termination date', d: 'The 7-day rule, with courier and mail days added.' },
              { href: 'tools/rent-increase-calculator/', icon: PiggyBank, t: 'Rent increase', d: '1.9% for 2027, the earliest legal date and when to serve.' },
              { href: 'tools/rent-deposit-interest-calculator/', icon: Landmark, t: 'Deposit interest', d: 'Interest owed on last month’s rent, and the top-up.' },
            ].map((x) => (
              <a key={x.t} href={url(x.href)} className="tile group flex flex-col p-8 text-ink hover:no-underline" data-reveal>
                <span className="icon-badge">
                  <x.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-6 text-title">{x.t}</h3>
                <p className="mt-2 text-ink-3">{x.d}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-brand-text">
                  Open calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions, answered.
          </h2>
          <FAQList className="mt-10" items={homeFaqs} />
          <a href={url('faq/')} className="link-more mt-8">
            More questions
          </a>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
