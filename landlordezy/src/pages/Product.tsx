import { Smartphone, Laptop, Tablet, Download } from 'lucide-react'
import { site, url } from '../site'
import { features } from '../content/features'
import { Actions, CTABand, Heading, Section } from '../components/ui'
import { DashboardScreen, TenantPortalPhone } from '../components/mocks/screens'

const groups: { title: string; lead: string; slugs: string[] }[] = [
  { title: 'Fill and screen', lead: 'Find the right tenant, faster.', slugs: ['listings', 'tenant-screening'] },
  { title: 'Sign and collect', lead: 'Paperwork and payments that run themselves.', slugs: ['leases', 'rent-collection', 'rent-reporting'] },
  { title: 'Protect and maintain', lead: 'Stay compliant and keep the place in shape.', slugs: ['notices', 'maintenance', 'legal-help'] },
  { title: 'Work smarter', lead: 'An assistant on every tenant profile.', slugs: ['ezy-ai'] },
]

export function Product() {
  return (
    <>
      <section data-hero className="overflow-hidden bg-white pb-16 pt-14 sm:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow">The LandlordEzy platform</p>
          <h1 className="mx-auto mt-3 max-w-[18ch] text-display-xl">Everything you do as a landlord. In one place.</h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead text-ink-3">
            From the day a unit is vacant to the day a problem is resolved, every step shares one record: listing, screening,
            lease, rent, reporting and notices.
          </p>
          <div className="mt-9">
            <Actions secondary={{ label: 'See pricing', href: url('pricing/') }} note="Free plan · No credit card" />
          </div>
        </div>
        <div className="wrap mt-16">
          <div className="hero-rise mx-auto max-w-[64rem]">
            <DashboardScreen />
          </div>
        </div>
      </section>

      {groups.map((g, gi) => (
        <Section key={g.title} tone={gi % 2 === 0 ? 'alt' : 'white'} labelledBy={`g-${gi}`}>
          <div className="wrap">
            <Heading id={`g-${gi}`} title={g.title} lead={g.lead} size="md" align="left" />
            <div className={`mt-10 grid gap-5 ${g.slugs.length === 1 ? 'md:grid-cols-1' : g.slugs.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {g.slugs.map((slug) => {
                const f = features.find((x) => x.slug === slug)!
                return (
                  <a
                    key={slug}
                    href={url(`${slug}/`)}
                    className={`${gi % 2 === 0 ? 'bg-white shadow-card' : 'bg-canvas-alt'} group flex flex-col rounded-4xl p-8 text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:no-underline sm:p-9`}
                    data-reveal
                  >
                    <p className="eyebrow">{f.eyebrow}</p>
                    <h3 className="mt-2 text-headline">{f.h1}</h3>
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
                  </a>
                )
              })}
            </div>
          </div>
        </Section>
      ))}

      <Section tone="dark" labelledBy="devices-title">
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

      <Section labelledBy="ontario-title">
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

      <CTABand />
    </>
  )
}
