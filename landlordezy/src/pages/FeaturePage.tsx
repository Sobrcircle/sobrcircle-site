import type { ReactElement } from 'react'
import { ArrowRight, BellRing, CheckCircle2, FileCheck2, ShieldCheck, Sparkles } from 'lucide-react'
import { site, url } from '../site'
import { featureBySlug, features, type Feature, type Visual } from '../content/features'
import { Actions, CheckList, CTABand, FAQList, Fine, FeatureTile, Heading, Section, Steps, Voices } from '../components/ui'
import { ChapterNav, type Chapter } from '../components/ChapterNav'
import { LiveRentals } from '../components/LiveRentals'
import { voicesFor } from '../content/voices'
import {
  CaseBuilderScreen,
  EzyChatPhone,
  InspectionPhone,
  LeaseScreen,
  LedgerScreen,
  ListingScreen,
  MaintenanceScreen,
  N1Screen,
  N4Screen,
  ReportingScreen,
  ScreeningScreen,
  TenantPortalPhone,
} from '../components/mocks/screens'

function HeroVisual({ visual }: { visual: Visual }): ReactElement {
  switch (visual) {
    case 'ledger':
      return <LedgerScreen className="mx-auto w-full max-w-[64rem]" />
    case 'ezy':
      return <EzyChatPhone className="mx-auto w-[72%] max-w-[20rem]" />
    case 'screening':
      return <ScreeningScreen className="mx-auto w-full max-w-[34rem]" />
    case 'reporting':
      return <ReportingScreen className="mx-auto w-full max-w-[34rem]" />
    case 'n4':
      return <N4Screen className="mx-auto w-full max-w-[36rem]" />
    case 'lease':
      return <LeaseScreen className="mx-auto w-full max-w-[34rem]" />
    case 'listing':
      return <ListingScreen className="mx-auto w-full max-w-[34rem]" />
    case 'maintenance':
      return <MaintenanceScreen className="mx-auto w-full max-w-[34rem]" />
    case 'casebuilder':
      return <CaseBuilderScreen className="mx-auto w-full max-w-[36rem]" />
  }
}

/** Sections that only one product page needs. */
function Extra({ slug }: { slug: string }) {
  switch (slug) {
    case 'rent-collection':
      return (
        <Section id="alerts" tone="dark" labelledBy="late-title">
          <div className="wrap grid items-center gap-14 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow-dark">Late-rent alerts</p>
              <h2 id="late-title" className="mt-3 text-display-md !text-white">
                Late? You’ll know first.
              </h2>
              <p className="mt-5 text-lead text-white/70">
                The morning rent is missed, you get an email listing exactly who owes what, with a one-tap path to a correct
                N4. No spreadsheet, no awkward texts.
              </p>
              <a href={url('notices/')} className="link-more-dark mt-7">
                See how notices work
              </a>
            </div>
            <div className="mock-fit" style={{ ['--em' as string]: '30' }} data-reveal="scale">
              <div className="mock mock-dark" aria-hidden="true">
                <div className="m-card !rounded-[1.2em] !p-[1.3em]">
                  <p className="m-label flex items-center gap-[0.4em]">
                    <BellRing className="m-ico-s text-[#ff9f0a]" /> Rent-unpaid alert · 7:00 a.m.
                  </p>
                  {[
                    ['Ravi Singh', '7 Wyandotte St · Unit 3', '$1,610'],
                    ['Chloe Martin', '233 Victoria Ave', '$950'],
                  ].map(([n, a, v]) => (
                    <div key={n} className="m-row">
                      <span>
                        <span className="m-sm block font-semibold">{n}</span>
                        <span className="m-xs m-faint">{a}</span>
                      </span>
                      <span className="flex items-center gap-[0.6em]">
                        <span className="m-sm tabnum font-semibold">{v}</span>
                        <span className="m-btn !py-[0.4em] !text-[0.72em]">Serve N4</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )
    case 'tenant-screening':
      return (
        <Section id="prices" tone="alt" labelledBy="prices-title">
          <div className="wrap-content grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div data-reveal>
              <p className="eyebrow">Simple, honest pricing</p>
              <h2 id="prices-title" className="mt-3 text-display-md">
                Pay for the checks each application needs.
              </h2>
              <p className="mt-5 text-lead text-ink-3">No subscription required. You or the applicant can pay.</p>
              <div className="mt-8 rounded-3xl bg-white p-6 shadow-card">
                <p className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-5 w-5 text-brand" aria-hidden /> Screening built on consent
                </p>
                <p className="mt-2 text-ink-3">
                  Applicants authorize every credit check and choose what they share. That keeps you on the right side of
                  privacy law, and good applicants appreciate it.
                </p>
              </div>
            </div>
            <div className="tile-white p-2" data-reveal>
              <table className="w-full text-left">
                <caption className="sr-only">Tenant screening prices</caption>
                <tbody>
                  {[
                    ['Pre-screening application', 'Free'],
                    ['AI credit check with full Equifax report', '$29.99'],
                    ['AI bank-statement analysis', '$10'],
                    ['AI identity verification', '$10'],
                    ['Ontario LTB order check', '$5'],
                    ['Landlord Reference Network check', '$5'],
                    ['Guarantor or co-signer check', '$29.99'],
                    ['Expert human review', '$65'],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-line-soft last:border-0">
                      <th scope="row" className="px-5 py-4 font-normal text-ink-2">
                        {k}
                      </th>
                      <td className="px-5 py-4 text-right font-semibold tabular-nums">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="wrap-content mt-8">
            <Fine>Prices per check, plus HST. Soft inquiry: the applicant’s credit score is not affected.</Fine>
          </div>
        </Section>
      )
    case 'rent-reporting':
      return (
        <Section id="tenant-portal" tone="alt" labelledBy="tenant-view">
          <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div className="max-w-[34rem]" data-reveal>
              <p className="eyebrow">What your tenant sees</p>
              <h2 id="tenant-view" className="mt-3 text-display-md">
                A rent record they’re proud of.
              </h2>
              <p className="mt-5 text-lead text-ink-3">
                Tenants see every receipt, how to pay, and their on-time streak in a passwordless portal. The Rental Report Card
                they build with you goes with them to their next home.
              </p>
              <CheckList
                className="mt-8"
                items={[
                  'Consent captured once, by a no-login link or at lease signing',
                  'Positive reporting held as “consent pending” until they agree',
                  'Re-consent requested automatically if the wording changes',
                ]}
              />
            </div>
            <TenantPortalPhone className="mx-auto w-[16rem] sm:w-[18rem]" />
          </div>
        </Section>
      )
    case 'notices':
      return (
        <>
          <Section id="bill-60" tone="dark" labelledBy="bill60-title">
            <div className="wrap-content text-center" data-reveal>
              <p className="eyebrow-dark">Bill 60, built in</p>
              <h2 id="bill60-title" className="mt-3 text-display-md !text-white">
                The rules changed on September 21. Your notices already know.
              </h2>
              <p className="mx-auto mt-5 max-w-[42rem] text-lead text-white/70">
                An N4 now needs only 7 days. Tenants who want to raise other issues at an arrears hearing must first pay you half
                the arrears. And older versions of ten LTB forms stop being accepted on November 30, 2026.
              </p>
            </div>
            <div className="wrap mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ['7 days', 'Minimum N4 notice for notices given on or after September 21, 2026.'],
                ['50%', 'Of the arrears claimed, paid to you 7 days before the hearing if the tenant raises other issues.'],
                ['Nov 30', 'Last day the LTB accepts the old N5, N6, N8, N12, N13, L1, L2, L9, L10 and T5.'],
              ].map(([n, t]) => (
                <div key={n} className="rounded-4xl bg-white/[0.06] p-7 ring-1 ring-white/10" data-reveal>
                  <p className="font-display text-[3rem] font-bold leading-none tracking-[-0.03em] text-white">{n}</p>
                  <p className="mt-3 text-white/70">{t}</p>
                </div>
              ))}
            </div>
            <div className="wrap mt-8 text-center">
              <a href={url('guides/bill-60/')} className="link-more-dark">
                Read the Bill 60 guide
              </a>
              <p className="mt-3 text-[0.8125rem] text-white/60">
                Source:{' '}
                <a href={site.official.bill60Update} className="text-white/60 underline" rel="noopener">
                  Tribunals Ontario operational update, September 21, 2026
                </a>
              </p>
            </div>
          </Section>
          <Section id="n1" labelledBy="n1-title">
            <div className="wrap grid items-center gap-14 lg:grid-cols-2">
              <div data-reveal>
                <p className="eyebrow">Automated N1</p>
                <h2 id="n1-title" className="mt-3 text-display-md">
                  Raise the rent. Let the system run the rest.
                </h2>
                <p className="mt-5 text-lead text-ink-3">
                  The N1 pre-fills the guideline (1.9% for increases taking effect in 2027), sets the earliest legal date, and
                  applies the new rent to your ledger on the effective date. It can even top up the last month’s rent deposit.
                </p>
                <a href={url('tools/rent-increase-calculator/')} className="link-more mt-7">
                  Try the free rent increase calculator
                </a>
              </div>
              <N1Screen className="mx-auto w-full max-w-[30rem]" />
            </div>
          </Section>
        </>
      )
    case 'leases':
      return (
        <Section id="inspections" tone="alt" labelledBy="inspect-title">
          <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div className="max-w-[34rem]" data-reveal>
              <p className="eyebrow">Inspections</p>
              <h2 id="inspect-title" className="mt-3 text-display-md">
                Evidence, collected as you walk.
              </h2>
              <p className="mt-5 text-lead text-ink-3">
                Photograph each room on move-in and move-out. Your tenant approves the report in the app, and every photo is
                filed to the right property and date.
              </p>
              <CheckList
                className="mt-8"
                items={['Move-in and move-out inspections', 'Ontario Fire Code safety checklist', 'Signed PDF reports for your records']}
              />
            </div>
            <InspectionPhone className="mx-auto w-[16rem] sm:w-[18rem]" />
          </div>
        </Section>
      )
    case 'listings':
      return (
        <Section id="options" tone="alt" labelledBy="options-title">
          <div className="wrap">
            <Heading
              id="options-title"
              eyebrow="Two ways to fill a unit"
              title="Free on EzyRent. Or everywhere on MLS®."
              size="md"
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                {
                  name: 'EzyRent listing',
                  price: 'Free',
                  sub: 'on every plan',
                  items: ['Unlimited listings across Canada', 'Pre-screening built into every enquiry', 'Self-booking showings and no-show protection', 'QR yard sign and AI listing tools'],
                  cta: { label: 'List a rental free', href: site.app.ezyrentList },
                },
                {
                  name: 'Flat-fee MLS® listing',
                  price: '$549',
                  sub: '+ HST, one time',
                  items: ['12 months on REALTOR.ca and MLS®', 'Up to 40 photos and open houses', 'Lease preparation and deposit coordination', '3-month Legal Guarantee ($749 for 12 months)'],
                  cta: { label: 'Get listed on MLS®', href: site.app.listit },
                  featured: true,
                },
                {
                  name: 'Full-service placement',
                  price: '1 month’s rent',
                  sub: '+ HST, when the tenant is placed',
                  items: ['A licensed Realtor does everything', 'Marketing, showings and screening', 'Lease and move-in coordination', '12-month placement and Legal Guarantee'],
                  cta: { label: 'Request placement', href: site.app.book },
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`flex flex-col rounded-4xl p-8 ${p.featured ? 'bg-white shadow-float ring-2 ring-brand' : 'bg-white shadow-card'}`}
                  data-reveal
                >
                  <p className="font-semibold">{p.name}</p>
                  <p className="mt-4 font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em]">{p.price}</p>
                  <p className="mt-2 text-[0.9375rem] text-ink-3">{p.sub}</p>
                  <CheckList className="mt-6" items={p.items} />
                  <a href={p.cta.href} className={`${p.featured ? 'btn-primary' : 'btn-secondary'} mt-8`}>
                    {p.cta.label}
                  </a>
                </div>
              ))}
            </div>
            <Fine className="mt-8 text-center">
              MLS® listings and placement by List It Realty Brokerage Inc., a licensed Ontario brokerage; Broker of Record Paul J.
              Rouillard. Paying LandlordEzy members save $100 on MLS® packages.
            </Fine>
          </div>
        </Section>
      )
    case 'maintenance':
      return (
        <Section id="fire-safety" tone="alt" labelledBy="fire-title">
          <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div className="max-w-[34rem]" data-reveal>
              <p className="eyebrow">Fire safety</p>
              <h2 id="fire-title" className="mt-3 text-display-md">
                Compliance, from your pocket.
              </h2>
              <p className="mt-5 text-lead text-ink-3">
                Walk the Ontario Fire Code checklist room by room, photograph each alarm, extinguisher and exit, and generate a
                signed report on the spot. Reminders make sure the next one happens on time.
              </p>
            </div>
            <InspectionPhone className="mx-auto w-[16rem] sm:w-[18rem]" />
          </div>
        </Section>
      )
    case 'ezy-ai':
      return (
        <Section id="ask-ezy" tone="dark" labelledBy="askezy-title">
          <div className="wrap-content text-center" data-reveal>
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-glow">
              <Sparkles className="h-7 w-7" aria-hidden />
            </span>
            <h2 id="askezy-title" className="mt-6 text-display-md !text-white">
              Got a landlord question? Ask Ezy.
            </h2>
            <p className="mx-auto mt-5 max-w-[38rem] text-lead text-white/70">
              N4 timing, rent increases, entry rules, the LTB process: plain-English answers grounded in Ontario sources, reviewed
              daily by a licensed paralegal team. Three free questions a day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
              <a href={site.app.askEzy} className="btn-primary">
                Ask a question
              </a>
              <a href={site.app.book} className="link-more-dark">
                Prefer a person? Book a free call
              </a>
            </div>
          </div>
        </Section>
      )
    case 'legal-help':
      return (
        <Section id="levels" tone="alt" labelledBy="paths-title">
          <div className="wrap">
            <Heading id="paths-title" eyebrow="Choose your level of help" title="From a question to full representation." size="md" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                { t: 'Ask Ezy', p: 'Free', d: 'Ontario answers in plain English, 3 a day free.', href: site.app.askEzy, cta: 'Ask now' },
                { t: 'Strategy call', p: 'Free', d: '15 minutes with the licensed paralegal team.', href: site.app.book, cta: 'Book a call' },
                { t: 'Paralegal blocks', p: '$75/hr', d: '3- or 12-hour blocks for any tenant file. Hours never expire.', href: url('contact/'), cta: 'Get started' },
                { t: 'VirtualPM Legal Shield', p: 'from $49/mo', d: '+ $6 per unit. Rent collection, N4s on schedule and a monthly consult.', href: url('contact/'), cta: 'Talk to us' },
              ].map((o) => (
                <div key={o.t} className="flex flex-col rounded-4xl bg-white p-7 shadow-card" data-reveal>
                  <p className="font-semibold">{o.t}</p>
                  <p className="mt-3 font-display text-[1.75rem] font-bold tracking-[-0.02em]">{o.p}</p>
                  <p className="mt-2 text-ink-3">{o.d}</p>
                  <a href={o.href} className="link-more mt-auto pt-6">
                    {o.cta}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-4xl bg-white p-7 shadow-card sm:p-8" data-reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-semibold">
                    <FileCheck2 className="h-5 w-5 text-brand" aria-hidden /> For paralegals and contested hearings
                  </p>
                  <p className="mt-2 max-w-[40rem] text-ink-3">
                    CaseBuilder ranks comparable Ontario LTB decisions against your facts and builds the hearing pack and disclosure
                    bundle. Research by situation, never by person.
                  </p>
                </div>
                <a href={url('paralegals/')} className="btn-secondary shrink-0">
                  Explore CaseBuilder
                </a>
              </div>
            </div>
          </div>
        </Section>
      )
    default:
      return null
  }
}

/** Chapters for the sections only one product page has (see Extra). */
const extraChapters: Record<string, Chapter[]> = {
  'rent-collection': [{ id: 'alerts', label: 'Late-rent alerts' }],
  'tenant-screening': [{ id: 'prices', label: 'Prices' }],
  'rent-reporting': [{ id: 'tenant-portal', label: 'What tenants see' }],
  notices: [
    { id: 'bill-60', label: 'Bill 60' },
    { id: 'n1', label: 'Automated N1' },
  ],
  leases: [{ id: 'inspections', label: 'Inspections' }],
  listings: [{ id: 'options', label: 'Ways to list' }],
  maintenance: [{ id: 'fire-safety', label: 'Fire safety' }],
  'ezy-ai': [{ id: 'ask-ezy', label: 'Ask Ezy' }],
  'legal-help': [{ id: 'levels', label: 'Levels of help' }],
}

export function FeaturePage({ slug }: { slug: string }) {
  const f: Feature = featureBySlug(slug)
  const isPhone = f.visual === 'ezy'
  return (
    <>
      <ChapterNav
        title={f.nav}
        chapters={[
          { id: 'overview', label: 'Overview' },
          { id: 'how', label: 'How it works' },
          { id: 'features', label: 'What’s included' },
          ...(extraChapters[f.slug] ?? []),
          { id: 'faq', label: 'Questions' },
        ]}
      />
      <section id="overview" data-hero className="overflow-hidden bg-white pb-14 pt-10 sm:pb-16 sm:pt-20">
        <div className={`wrap ${isPhone ? 'grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]' : ''}`}>
          <div className={isPhone ? '' : 'mx-auto max-w-[50rem] text-center'}>
            <p className="eyebrow">{f.job}</p>
            <h1 className="mt-3 text-display-xl">{f.h1}</h1>
            <p className={`mt-6 text-lead text-ink-3 ${isPhone ? 'max-w-[34rem]' : 'mx-auto max-w-[40rem]'}`}>{f.lead}</p>
            <div className="mt-9">
              <Actions
                align={isPhone ? 'left' : 'center'}
                secondary={{ label: 'Try the live demo', href: url('demo/') }}
                note={
                  <>
                    <strong className="font-semibold text-ink-2">{f.priceLine}</strong>
                    <span className="mt-1 block sm:mt-0 sm:inline">
                      <span className="hidden sm:inline"> · </span>Free plan, no card
                    </span>
                  </>
                }
              />
            </div>
          </div>
          {f.slug === 'listings' && <LiveRentals className="mx-auto mt-8" />}
          <div className={`hero-rise ${isPhone ? '' : 'mt-16'}`}>
            <HeroVisual visual={f.visual} />
          </div>
        </div>
      </section>

      <Section tone="alt" id="how" labelledBy="how-title">
        <div className="wrap">
          <Heading id="how-title" eyebrow="How it works" title={f.stepsTitle} size="md" />
          <div className="mt-12">
            <Steps steps={f.steps} />
          </div>
        </div>
      </Section>

      <Section id="features" labelledBy="features-title">
        <div className="wrap">
          <Heading id="features-title" title={f.highlightsTitle} size="md" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {f.highlights.map((h) => (
              <FeatureTile key={h.title} icon={h.icon} title={h.title} body={h.body} />
            ))}
          </div>
          <div className="mx-auto mt-12 flex max-w-[46rem] items-start gap-3 rounded-3xl bg-brand-soft px-6 py-5 text-[0.9375rem] text-ink-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
            <p>{f.planNote}</p>
          </div>
        </div>
      </Section>

      <Voices items={voicesFor(`${f.slug}/`)} tone="alt" />

      <Extra slug={f.slug} />

      <Section id="faq" tone={f.slug === 'tenant-screening' || f.slug === 'listings' || f.slug === 'legal-help' || f.slug === 'rent-reporting' || f.slug === 'leases' || f.slug === 'maintenance' ? 'white' : 'alt'} labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions, answered.
          </h2>
          <FAQList className="mt-10" items={f.faqs} />
        </div>
      </Section>

      <Section tight labelledBy="related-title" tone="alt">
        <div className="wrap">
          <h2 id="related-title" className="text-headline">
            Works even better with
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {f.related.map((slug) => {
              const r = features.find((x) => x.slug === slug)!
              return (
                <a
                  key={slug}
                  href={url(`${slug}/`)}
                  className="group flex items-center justify-between rounded-3xl bg-white p-6 text-ink shadow-card transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:no-underline"
                >
                  <span>
                    <span className="block text-[0.8125rem] text-ink-3">{r.eyebrow}</span>
                    <span className="mt-1 block font-display text-[1.25rem] font-semibold tracking-[-0.015em]">{r.h1}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-brand transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              )
            })}
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
