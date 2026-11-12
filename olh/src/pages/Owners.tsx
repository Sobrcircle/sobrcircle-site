import { ArrowDown, Check, ChevronDown, KeyRound, MonitorSmartphone, Scale, Wallet, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { site, url } from '../site'
import { $ } from '../content/pricing'
import { CheckList, CTABand, FAQList, FeatureTile, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'
import {
  campusTowns,
  condoCoordination,
  condoNot,
  condoSituations,
  firstTenancyChecklist,
  firstTimeMistakes,
  guarantorChecks,
  nonResidentTax,
  owners,
  portalChecks,
  studentLaw,
  type OwnerKey,
  type OwnerPanel,
} from '../content/owners'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'situations', label: 'Your situation' },
  { id: 'team', label: 'Same team' },
  { id: 'plans', label: 'Which plan fits' },
]

/** A small block inside a panel: an h4 and its content, on a white card. */
function Block({ title, children, className = '' }: { title: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-4xl bg-white p-6 shadow-card sm:p-8 ${className}`}>
      <h4 className="font-display text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">{title}</h4>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Dots({ items, tone = 'brand' }: { items: string[]; tone?: 'brand' | 'gray' }) {
  return (
    <ul className="space-y-2.5 text-[0.9375rem]">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          {tone === 'brand' ? (
            <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
          ) : (
            <X className="mt-[3px] h-4 w-4 shrink-0 text-ink-4" strokeWidth={2.4} aria-hidden />
          )}
          <span className={tone === 'brand' ? 'text-ink-2' : 'text-ink-3'}>{t}</span>
        </li>
      ))}
    </ul>
  )
}

function Pairs({ items, cols = 'sm:grid-cols-2' }: { items: { t: string; b: string }[]; cols?: string }) {
  return (
    <dl className={`grid gap-x-8 gap-y-5 ${cols}`}>
      {items.map((it) => (
        <div key={it.t}>
          <dt className="font-semibold text-ink">{it.t}</dt>
          <dd className="mt-1 text-[0.9375rem] text-ink-3">{it.b}</dd>
        </div>
      ))}
    </dl>
  )
}

/* ---- The extra material each situation carries ------------------------------ */
function Extra({ which }: { which: OwnerKey }) {
  if (which === 'condo')
    return (
      <>
        <Block title="What we don’t do: the corporation’s side">
          <Dots items={condoNot} tone="gray" />
          <p className="mt-5 text-[0.9375rem] text-ink-3">
            If you’re a board director looking for a firm to manage the building itself, we’re not that company, and we’ll tell you on the first call.
          </p>
        </Block>
        <Block title="Working with your condominium corporation" className="lg:col-span-2">
          <Pairs items={condoCoordination} cols="sm:grid-cols-2 lg:grid-cols-3" />
          <p className="mt-6 text-[0.9375rem] text-ink-3">
            Compliance letters, rule complaints and chargebacks from the corporation come to us. If a rule breach needs to become a notice or a
            Board application, our licensed paralegals take it from there.
          </p>
        </Block>
        <Block title="Condo situations we handle" className="lg:col-span-2">
          <ul className="grid gap-x-8 gap-y-2.5 text-[0.9375rem] sm:grid-cols-2">
            {condoSituations.map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                <span className="text-ink-2">{t}</span>
              </li>
            ))}
          </ul>
        </Block>
      </>
    )

  if (which === 'students')
    return (
      <>
        <Block title="We screen the guarantor too. That’s often who actually pays.">
          <p className="text-[0.9375rem] text-ink-3">
            A first-year student usually has an empty credit file. That isn’t a red flag, which is why guarantors matter. Every applicant and every
            guarantor gets the same checks:
          </p>
          <div className="mt-4">
            <Dots items={guarantorChecks} />
          </div>
        </Block>
        <Block title="Students are tenants, with full rights" className="lg:col-span-2">
          <Pairs items={studentLaw} cols="sm:grid-cols-3" />
          <Fine className="mt-5">
            General information, not legal advice. Removing any tenant needs the correct notice, a Landlord and Tenant Board application and a hearing.
            The Board sets the pace.
          </Fine>
        </Block>
        <Block title="Campus towns we work in" className="lg:col-span-2">
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {campusTowns.map((c) => (
              <li key={c.city} className="rounded-2xl bg-canvas-alt px-4 py-3">
                <span className="block font-semibold text-ink">{c.city}</span>
                <span className="block text-[0.875rem] text-ink-3">{c.schools}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.9375rem] text-ink-3">A house rented by the room is quoted for your house, after a short call.</p>
        </Block>
      </>
    )

  if (which === 'first-time')
    return (
      <>
        <Block title="Two units on one property">
          <p className="text-[0.9375rem] text-ink-3">
            Renting a basement suite as well as the main floor, or both sides of a duplex? You don’t buy two plans. We count tenancies, so the first
            is at the first-tenancy rate and the second costs less: {$.shieldMore} a month on Landlord Shield, {$.managementMore} on Property
            Management. <a href={url('pricing/')}>See the calculator</a>.
          </p>
        </Block>
        <div className="lg:col-span-2">
          <h4 className="font-display text-[1.375rem] font-semibold tracking-[-0.015em] text-ink">The 8 most expensive first-time mistakes.</h4>
          <p className="mt-2 max-w-[44rem] text-ink-3">Every one of these turns up in real files, most weeks. If you read nothing else, read these.</p>
          <ol className="mt-6 grid gap-3 md:grid-cols-2">
            {firstTimeMistakes.map((m, idx) => (
              <li key={m.t}>
                <details className="fold-plain h-full rounded-4xl bg-white p-5 shadow-card sm:p-6" open data-fold-mobile>
                  <summary className="flex items-start gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                    <span className="flex-1 pt-1 font-display text-[1.0625rem] font-semibold leading-snug text-ink">{m.t}</span>
                    <ChevronDown className="fold-icon mt-1.5 h-4 w-4 shrink-0 text-ink-3 md:hidden" aria-hidden />
                  </summary>
                  <p className="mt-3 text-[0.9375rem] text-ink-3 md:pl-11">{m.b}</p>
                </details>
              </li>
            ))}
          </ol>
          <Fine className="mt-4">
            General information about Ontario residential tenancies, not legal advice, and the exceptions matter. Last reviewed {site.lastReviewed}. See the{' '}
            <a href={url('guides/bill-60/')}>Bill 60 guide</a>, <a href={url('guides/ltb-forms/')}>LTB forms</a> and{' '}
            <a href={url('guides/rent-increases/')}>rent increases</a>.
          </Fine>
        </div>
        <Block title="Your first tenancy, in order" className="lg:col-span-2">
          <p className="-mt-1 text-[0.9375rem] text-ink-3">Do these before you hand over keys. It’s the same sequence we follow for our own management clients.</p>
          <ol className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
            {firstTenancyChecklist.map((t, idx) => (
              <li key={t} className="flex gap-3 text-[0.9375rem]">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.75rem] font-semibold text-brand-text">{idx + 1}</span>
                <span className="text-ink-2">{t}</span>
              </li>
            ))}
          </ol>
        </Block>
      </>
    )

  return (
    <>
      <Block title="What you can check from anywhere">
        <Dots items={portalChecks} />
      </Block>
      <Block title="NR4 and NR6, coordinated by your Ontario manager" className="lg:col-span-2">
        <p className="chip-gray">General information, not tax advice</p>
        <div className="mt-5">
          <Pairs items={nonResidentTax} cols="sm:grid-cols-3" />
        </div>
        <p className="mt-6 text-[0.9375rem] text-ink-2">
          NR4 and NR6 filings are available on request on Property Management plans. We coordinate them and keep the records your accountant needs:
          every rent receipt, statement and expense is already in your owner portal. Owners in another Canadian province generally aren’t affected by
          the withholding rules.
        </p>
        <Fine className="mt-4">
          We’re a property manager with licensed paralegals on the team, not tax advisors. The specifics of your situation belong with your
          accountant, and we’ll work alongside them.
        </Fine>
      </Block>
    </>
  )
}

function Panel({ p }: { p: OwnerPanel }) {
  return (
    <div id={p.key} className="scroll-mt-40">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-4xl bg-white p-7 shadow-card sm:p-9 lg:col-span-2 lg:rounded-5xl lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <span className="icon-badge">
                <p.Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="eyebrow mt-5">{p.eyebrow}</p>
              <h3 className="mt-2 text-headline">{p.title}</h3>
              <p className="mt-4 text-ink-3">{p.lead}</p>
            </div>
            <div>
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-ink-4">What’s different</p>
              <div className="mt-4">
                <Pairs items={p.different} cols="" />
              </div>
            </div>
          </div>
        </div>
        <Block title={p.key === 'condo' ? 'What we do: your unit, your tenant' : 'What we do about it'}>
          <Dots items={p.does} />
        </Block>
        <Extra which={p.key} />
        <div className="rounded-4xl bg-white p-6 shadow-card sm:p-8 lg:col-span-2">
          <p className="font-display text-[1.1875rem] font-semibold tracking-[-0.01em] text-ink">Questions owners ask first</p>
          <FAQList className="mt-4" items={p.faqs} />
        </div>
      </div>
    </div>
  )
}

/* ---- Which plan fits --------------------------------------------------------- */
const fits = [
  {
    name: 'OLH Landlord Shield',
    price: $.shield,
    more: $.shieldMore,
    who: 'You live nearby and want to run it yourself.',
    examples: ['A first-time landlord with a basement suite', 'A condo owner who lives close to the unit', 'Anyone who wants the software, a checked ledger and a paralegal to talk to'],
    href: url('landlord-shield/'),
    link: 'About Landlord Shield',
  },
  {
    name: 'Property Management',
    price: $.management,
    more: $.managementMore,
    who: 'You want the day-to-day off your plate.',
    examples: ['A condo owner who moved and kept the unit', 'A student house with several tenancies', 'An owner in another province'],
    href: url('property-management/'),
    link: 'About Property Management',
  },
  {
    name: 'Property Management + Legal Guarantee',
    price: $.guarantee,
    more: $.guaranteeMore,
    who: 'You can’t be there if it goes to the Board.',
    examples: ['A non-resident or overseas owner', 'An owner who wants LTB work arranged in advance', 'Anyone with no slack in the budget for a legal bill'],
    href: url('legal/#guarantee'),
    link: 'How the Legal Guarantee works',
    hi: true,
  },
]

export function Owners() {
  return (
    <>
      <ChapterNav title="Owner situations" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <PageHero
        eyebrow="Condo · Student · First-time · Non-resident"
        title="Your kind of rental. The help it actually needs."
        lead="A condo, a student house, your first tenancy or a rental you own from another country each go wrong in their own way. Pick yours and read only that."
        secondary={{ label: 'See the plans', href: url('pricing/') }}
      >
        <ul className="mx-auto mt-12 grid max-w-[68rem] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {owners.map((o) => (
            <li key={o.key}>
              <a
                href={url(`owners/?owner=${o.key}#situations`)}
                className="spot group flex h-full flex-col rounded-4xl bg-canvas-alt p-6 text-ink hover:no-underline"
                data-track={`owners:door-${o.key}`}
              >
                <o.Icon className="h-6 w-6 text-brand" strokeWidth={1.8} aria-hidden />
                <span className="mt-4 block font-display text-[1.1875rem] font-semibold tracking-[-0.015em]">{o.label}</span>
                <span className="mt-1 block text-[0.9375rem] text-ink-3">{o.door}</span>
                <span className="mt-auto pt-5">
                  <ArrowDown className="h-5 w-5 text-brand transition-transform group-hover:translate-y-0.5" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section id="situations" tone="alt" labelledBy="situations-title">
        <div className="wrap">
          <Heading
            id="situations-title"
            eyebrow="Your situation"
            title="Pick the one that’s you."
            lead="What’s different about this kind of rental, what we do about it, and the questions owners in your position ask first."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-tabs-root>
            <TabRow name="owner" label="Owner situations" tabs={owners.map((o) => ({ key: o.key, label: o.label }))} className="mx-auto" />
            {owners.map((o, idx) => (
              <TabPanel key={o.key} name="owner" tab={o.key} first={idx === 0} className="mt-6">
                <p className="tabpanel-label">{o.label}</p>
                <Panel p={o} />
              </TabPanel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="team" labelledBy="team-title">
        <div className="wrap">
          <Heading
            id="team-title"
            eyebrow="Whatever your situation"
            title="The same team behind every one."
            lead="Management, licensed paralegals, a brokerage and the software, under one roof. Nothing is handed off to a stranger."
            size="md"
          />
          <div className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FeatureTile icon={Scale} title="Paralegals on the team" body="A licensed paralegal to talk to on every plan, and on the file when a tenancy goes wrong." href={url('legal/')} linkLabel="Legal help" />
            <FeatureTile icon={Wallet} title="A flat monthly price" body="Priced per tenancy, never a percentage of the rent. One price for any property type." href={url('pricing/')} linkLabel="See pricing" />
            <FeatureTile icon={MonitorSmartphone} title="Your own owner portal" body="Rent ledger, statements, leases and repairs with photos, in LandlordEzy, from anywhere." href={url('property-management/')} linkLabel="How management works" />
            <FeatureTile icon={KeyRound} title="Tenants found properly" body="MLS® and REALTOR.ca listings through our own brokerage, with screening before any lease." href={url('rentals/')} linkLabel="Leasing and listings" />
          </div>
        </div>
      </Section>

      <Section id="plans" tone="alt" labelledBy="plans-title">
        <div className="wrap">
          <Heading
            id="plans-title"
            eyebrow="Which plan fits"
            title="Three plans. Match yours to your situation."
            lead="Every plan includes a licensed paralegal to talk to. The difference is how much of the tenancy we run, and whether LTB work is arranged in advance."
            size="md"
          />
          <ul className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 lg:grid-cols-3 lg:gap-5">
            {fits.map((f, idx) => (
              <li
                key={f.name}
                className={`spot flex flex-col rounded-4xl bg-white p-7 sm:p-8 ${f.hi ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${idx * 0.08}s` }}
              >
                <h3 className="text-title">{f.name}</h3>
                <p className="mt-4 font-display text-[2rem] font-bold leading-none tracking-[-0.03em]">
                  {f.price} <span className="text-[0.9375rem] font-medium tracking-normal text-ink-3">a month</span>
                </p>
                <p className="mt-1.5 text-[0.875rem] text-ink-3">First tenancy · {f.more} each additional</p>
                <p className="mt-5 font-semibold text-ink">{f.who}</p>
                <div className="mt-3">
                  <CheckList items={f.examples} className="text-[0.9375rem]" />
                </div>
                <a href={f.href} className="link-more mt-auto pt-6">
                  {f.link}
                </a>
              </li>
            ))}
          </ul>
          <Fine className="mx-auto mt-6 max-w-[72rem] text-center">
            Monthly, plus HST. One price for any property type; we count tenancies, not addresses. Mixed or larger portfolios and houses rented by the
            room are quoted. <a href={url('pricing/')}>Compare every plan</a>.
          </Fine>
        </div>
      </Section>

      <CTABand title="Tell us your situation." lead="A 15-minute call: your unit, where you live, and which plan fits. If we’re not the right fit, we’ll say so." />
    </>
  )
}
