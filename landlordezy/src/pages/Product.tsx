import { Download, FileClock, House, Laptop, PenLine, Scale, Smartphone, Sparkles, Tablet, TrendingUp, UserSearch, Wallet, Wrench } from 'lucide-react'
import type { IconType } from '../components/ui'
import { site, url } from '../site'
import { features } from '../content/features'
import { Actions, CTABand, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { JobChips } from '../components/JobChips'
import { DashboardScreen, EzyChatPhone, TenantPortalPhone } from '../components/mocks/screens'

/** One icon per product page, matching the job buttons. */
const icons: Record<string, IconType> = {
  listings: House,
  'tenant-screening': UserSearch,
  leases: PenLine,
  'rent-collection': Wallet,
  'rent-reporting': TrendingUp,
  notices: FileClock,
  maintenance: Wrench,
  'legal-help': Scale,
  'ezy-ai': Sparkles,
}

const groups: { id: string; title: string; lead: string; slugs: string[] }[] = [
  { id: 'fill', title: 'Fill and screen', lead: 'Find the right tenant, faster.', slugs: ['listings', 'tenant-screening'] },
  { id: 'collect', title: 'Sign and collect', lead: 'Paperwork and payments that run themselves.', slugs: ['leases', 'rent-collection', 'rent-reporting'] },
  { id: 'protect', title: 'Protect and maintain', lead: 'Stay compliant and keep the place in shape.', slugs: ['notices', 'maintenance', 'legal-help'] },
  { id: 'smarter', title: 'Work smarter', lead: 'An assistant on every tenant profile.', slugs: ['ezy-ai'] },
]

export function Product() {
  return (
    <>
      <ChapterNav
        title="Product"
        chapters={[
          { id: 'overview', label: 'Overview' },
          ...groups.map((g) => ({ id: g.id, label: g.title })),
          { id: 'devices', label: 'Every screen' },
          { id: 'ontario', label: 'Built for Ontario' },
        ]}
      />
      {/* Same two-column hero as the homepage: your dashboard, and your tenant's view of the same record. */}
      <section id="overview" data-hero className="relative overflow-hidden bg-white pb-12 pt-6 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="hero-grid">
          <p className="eyebrow hero-eyebrow">The LandlordEzy platform</p>
          <div className="hero-visual">
            <div className="hero-rise relative">
              <DashboardScreen />
              <TenantPortalPhone className="hero-rise-2 absolute -bottom-6 right-[-1%] w-[27%] min-w-[6rem] max-w-[15rem] min-[375px]:min-w-[7rem] sm:-bottom-10 md:right-[-3%]" />
            </div>
          </div>
          <div className="hero-copy">
            <h1 className="hero-title">
              Everything you do as a&nbsp;landlord. <span className="whitespace-nowrap">In one place.</span>
            </h1>
            <p className="hero-lead mt-5 text-lead text-ink-3">
              From the day a unit is vacant to the day a problem is resolved, every step shares one record: listing, screening,
              lease, rent, reporting and notices.
            </p>
            <div className="hero-actions mt-7">
              <Actions
                align="split"
                secondary={{ label: 'Try the live demo', href: url('demo/') }}
                note={
                  <>
                    <strong className="whitespace-nowrap font-semibold text-ink-2">Free for 2 tenants</strong> ·{' '}
                    <span className="whitespace-nowrap">then $9.99 + $1 a door</span> · <span className="whitespace-nowrap">No card</span>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <div className="wrap">
          <JobChips className="mx-auto mt-10 max-w-[60rem] text-center sm:mt-14 lg:mt-16" heading="Start with the job in front of you" />
        </div>
      </section>

      {groups.map((g, gi) => (
        <Section key={g.title} id={g.id} tone={gi % 2 === 0 ? 'alt' : 'white'} labelledBy={`g-${gi}`}>
          <div className="wrap">
            <Heading id={`g-${gi}`} title={g.title} lead={g.lead} size="md" align="left" />
            <div className={`mt-10 grid gap-5 ${g.slugs.length === 1 ? 'md:grid-cols-1' : g.slugs.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {g.slugs.map((slug) => {
                const f = features.find((x) => x.slug === slug)!
                const Icon = icons[slug]
                const wide = g.slugs.length === 1
                return (
                  <a
                    key={slug}
                    href={url(`${slug}/`)}
                    className={`${gi % 2 === 0 ? 'bg-white shadow-card' : 'bg-canvas-alt'} group relative flex flex-col overflow-hidden rounded-4xl p-8 text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:no-underline sm:p-9 ${wide ? 'md:min-h-[26rem] md:pr-[46%]' : ''}`}
                    data-reveal
                  >
                    <span className="flex items-center gap-3">
                      <span className="icon-badge shrink-0">
                        <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                      </span>
                      <span className="eyebrow">{f.job}</span>
                    </span>
                    <h3 className="mt-5 text-headline">{f.h1}</h3>
                    <p className="mt-3 text-ink-3">{f.description.replace(/ \| LandlordEzy$/, '')}</p>
                    <ul className="mt-6 space-y-2 text-[0.9375rem] text-ink-2">
                      {f.highlights.slice(0, 3).map((h) => (
                        <li key={h.title} className="flex items-center gap-2.5">
                          <h.icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                          {h.title}
                        </li>
                      ))}
                    </ul>
                    <span className="link-more mt-auto pt-7">Learn more</span>
                    {wide && (
                      <span className="absolute right-[6%] top-10 hidden w-[15rem] md:block lg:right-[10%]" aria-hidden="true">
                        <EzyChatPhone className="w-full" />
                      </span>
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </Section>
      ))}

      <Section id="devices" tone="dark" labelledBy="devices-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_auto]">
          <div data-reveal>
            <p className="eyebrow-dark">On every screen</p>
            <h2 id="devices-title" className="mt-3 text-display-md !text-white">
              The whole job fits in your pocket.
            </h2>
            <p className="mt-5 max-w-[34rem] text-lead text-white/70">
              LandlordEzy works in any browser and installs to your home screen like an app, with no app store needed. Walk a unit,
              snap photos and they file themselves to the right property. Your tenants get their own portal, too.
            </p>
            <ul className="mt-8 grid max-w-[30rem] grid-cols-2 gap-4 text-white/85">
              {[
                { icon: Smartphone, t: 'iPhone and Android' },
                { icon: Tablet, t: 'iPad and tablets' },
                { icon: Laptop, t: 'Mac and PC' },
                { icon: Download, t: 'Installs from the browser' },
              ].map((d) => (
                <li key={d.t} className="flex items-center gap-3">
                  <d.icon className="h-5 w-5 text-brand-glow" strokeWidth={1.7} aria-hidden />
                  {d.t}
                </li>
              ))}
            </ul>
          </div>
          <TenantPortalPhone className="mx-auto w-[16rem] sm:w-[18rem]" />
        </div>
      </Section>

      <Section id="ontario" labelledBy="ontario-title">
        <div className="wrap-content text-center">
          <p className="eyebrow">Built for Ontario’s rules</p>
          <h2 id="ontario-title" className="mx-auto mt-3 max-w-[22ch] text-display-md">
            Software that knows the Residential Tenancies Act.
          </h2>
          <p className="mx-auto mt-5 max-w-[40rem] text-lead text-ink-3">
            Most landlord software is built in the U.S. and adapted for Canada. LandlordEzy starts with Ontario: the Standard Lease,
            the rent increase guideline, LTB notices and timelines, and the Bill 60 changes that took effect September 21, 2026.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href={url('guides/bill-60/')} className="link-more">
              What Bill 60 changed
            </a>
            <a href={site.app.lawLibrary} className="link-more" rel="noopener">
              The RTA in plain English
            </a>
          </div>
        </div>
      </Section>

      <CTABand
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
