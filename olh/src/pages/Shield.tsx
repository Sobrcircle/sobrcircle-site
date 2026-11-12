import { ArrowUpRight, BadgeCheck, Check, ChevronDown, Landmark, MonitorSmartphone, Receipt, Scale } from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'
import { ScopeLink } from '../components/olh'
import { ScopeSheets } from '../components/sheets'
import { CollectCard, ReportingScreen } from '../components/mocks/screens'
import { OlhN4, OlhPhone } from '../components/mocks/olh'
import { shieldFaqs } from '../content/faqs'
import { $ } from '../content/pricing'
import { n4Steps, rentSteps, reportingSteps, shieldIncluded, shieldYours, suite, suiteFinePrint } from '../content/scope'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'n4', label: 'N4 and N1' },
  { id: 'suite', label: 'The suite' },
  { id: 'rent', label: 'Your rent' },
  { id: 'reporting', label: 'Rent reporting' },
  { id: 'scope', label: 'What’s yours' },
  { id: 'faq', label: 'Questions' },
]

export function Shield() {
  return (
    <>
      <ChapterNav title="OLH Landlord Shield" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <section id="overview" data-hero className="relative overflow-hidden bg-white pb-14 pt-8 sm:pt-14 lg:pb-20">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="eyebrow">OLH Landlord Shield · from {$.shield} a month</p>
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
                note={`${$.shield} first tenancy · ${$.shieldMore} each additional · Any property type · Plus HST`}
              />
            </div>
          </div>
          <div className="hero-rise phone-crop mx-auto w-full max-w-[19rem] lg:max-w-[21rem]">
            <OlhPhone />
          </div>
        </div>
        <div className="wrap">
          <ul className="m-snap mx-auto mt-12 grid max-w-[68rem] gap-3 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {[
              { Icon: MonitorSmartphone, t: 'The Automation Suite', b: 'Self Management software in your own account, for your enrolled tenancies. No separate software bill.' },
              { Icon: BadgeCheck, t: 'Ledger checked monthly', b: 'Payments matched by the software and checked by our team, with a monthly statement.' },
              { Icon: Scale, t: 'A paralegal to talk to', b: 'One 15-minute consultation per owner account each month, by appointment. Advice, not representation.' },
              { Icon: Landmark, t: `Member case from ${$.memberCase}`, b: 'One qualifying new non-payment case through one hearing, in any rolling 12 months. No waiting period.' },
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
            <ol className="m-snap space-y-3">
              {n4Steps.map(({ Icon, t, b }, idx) => (
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
          <div className="mx-auto mt-10 max-w-[68rem] md:mt-12" data-tabs-root>
            <TabRow name="suite" label="Parts of the suite" tabs={suite.map((g) => ({ key: g.key, label: g.title }))} className="mx-auto" />
            {suite.map((g, idx) => (
              <TabPanel key={g.key} name="suite" tab={g.key} first={idx === 0} className="mt-5">
                <div className="grid gap-8 rounded-4xl bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12 lg:rounded-5xl lg:p-12">
                  <div>
                    <span className="icon-badge">
                      <g.Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    <h3 className="mt-5 text-headline">{g.title}</h3>
                    <p className="mt-3 text-ink-3">{g.note}</p>
                    <p className="mt-5 text-[0.875rem] font-medium text-ink-4">
                      {g.items.length} tools · {idx + 1} of {suite.length}
                    </p>
                  </div>
                  <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {g.items.map((it) => (
                      <li key={it.t}>
                        <a href={it.href} className="suite-item" rel="noopener">
                          {it.t} <ArrowUpRight className="inline h-3.5 w-3.5 opacity-50" aria-hidden />
                        </a>
                        <p className="mt-1 text-[0.9375rem] leading-snug text-ink-3">{it.b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabPanel>
            ))}
          </div>
          <Fine className="mx-auto mt-8 max-w-[56rem] text-center">{suiteFinePrint}</Fine>
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
              {rentSteps.map((s, idx) => (
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
          <ol className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {reportingSteps.map((s, idx) => (
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
                {shieldIncluded.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <details className="fold-plain rounded-4xl border border-line p-7 sm:p-9" open data-fold-mobile data-reveal>
              <summary className="flex items-center justify-between gap-4">
                <h3 className="text-title">Yours to handle, or quoted</h3>
                <ChevronDown className="fold-icon h-5 w-5 shrink-0 text-ink-3 md:hidden" aria-hidden />
              </summary>
              <ul className="mt-5 space-y-3 text-[0.9375rem] text-ink-3">
                {shieldYours.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-4" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </details>
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
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a href={url('legal/#compare')} className="link-more">
              Shield vs Legal Guarantee
            </a>
            <ScopeLink plan="shield" href="#scope" label="Full scope on one sheet" />
          </div>
        </div>
      </Section>

      <ScopeSheets />
      <CTABand title="Run it yourself. Keep the team behind you." lead="A 15-minute call: your units, your cities, and whether Landlord Shield fits." />
    </>
  )
}
