import { Check, ChevronDown, Minus, Phone } from 'lucide-react'
import { site, url } from '../site'
import { CheckList, CTABand, FAQList, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { pricingFaqs } from '../content/faqs'
import { addOns, landlordPlans, monthly, pmPlans, virtualPm, type Plan } from '../content/pricing'

function PlanCard({ plan, doors }: { plan: Plan; doors: number }) {
  const paid = plan.base > 0
  return (
    <div
      className={`flex flex-col rounded-4xl p-8 sm:p-9 ${plan.popular ? 'bg-white shadow-float ring-2 ring-brand' : 'bg-white shadow-card'}`}
      data-reveal
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-title">{plan.name}</h3>
        {plan.popular && <span className="chip-brand">Most popular</span>}
      </div>
      <p className="mt-1 text-ink-3">{plan.tagline}</p>
      <p className="mt-6 font-display text-[3.25rem] font-bold leading-none tracking-[-0.035em]">
        {paid ? (
          <span data-price-base={plan.base} data-price-per-door={plan.perDoor}>
            {monthly(plan.base, plan.perDoor, doors)}
          </span>
        ) : (
          '$0'
        )}
        <span className="text-[1rem] font-medium tracking-normal text-ink-3"> /month</span>
      </p>
      <p className="mt-2 text-[0.9375rem] text-ink-3">
        {paid ? (
          <>
            ${plan.base.toFixed(2)} + ${plan.perDoor} per door · <span data-doors-out>{doors} doors</span> · plus HST
          </>
        ) : (
          'Free forever · no card needed'
        )}
      </p>
      <a href={site.app.signup} className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} mt-7`} data-track={`start-free:plan:${plan.id}`}>
        {plan.cta}
      </a>
      {paid && <p className="mt-3 text-center text-[0.8125rem] text-ink-4">No card to start · Cancel anytime</p>}
      <p className="mt-8 text-[0.9375rem] font-semibold text-ink">{plan.intro}</p>
      <CheckList className="mt-4 text-[0.9375rem]" items={plan.features} />
    </div>
  )
}

const compare: { group: string; rows: [string, boolean | string, boolean | string][] }[] = [
  {
    group: 'Rent',
    rows: [
      ['Rent ledger, receipts and reminders', 'Up to 2 tenants', true],
      ['Automatic Interac e-Transfer matching', false, true],
      ['Equifax rent reporting', false, true],
      ['Arrears report and late-rent alerts', true, true],
    ],
  },
  {
    group: 'Tenants',
    rows: [
      ['Free listings on EzyRent', true, true],
      ['Tenant pre-screening', true, true],
      ['Equifax credit checks (pay per check)', true, true],
      ['Ontario Standard Lease with e-signature', false, true],
      ['Move-in and move-out inspections', true, true],
    ],
  },
  {
    group: 'Ontario legal tools',
    rows: [
      ['Automated N4 with certificate of service', false, true],
      ['Automated N1 rent increases', false, true],
      ['Ask Ezy AI questions', '3 a day', 'Unlimited'],
      ['Ezy AI notice drafts', false, '3 a month'],
    ],
  },
  {
    group: 'Operations',
    rows: [
      ['Maintenance work orders', false, true],
      ['Fire safety inspections', false, true],
      ['AI receipt scanning', '3 a month', 'Unlimited'],
      ['Team calendar, notes and broadcasts', false, true],
      ['Year-end reports and document storage', false, true],
    ],
  },
]

function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-brand" strokeWidth={2.4} aria-label="Included" />
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-ink-4/60" aria-label="Not included" />
  return <span className="text-[0.875rem] text-ink-2">{v}</span>
}


export function Pricing() {
  const doors = 5
  return (
    <>
      <ChapterNav
        title="Pricing"
        chapters={[
          { id: 'plans', label: 'Plans' },
          { id: 'compare', label: 'Compare' },
          { id: 'addons', label: 'Add-ons' },
          { id: 'faq', label: 'Questions' },
        ]}
      />
      <section data-hero className="bg-canvas-alt pb-10 pt-10 text-center sm:pt-20">
        <div className="wrap">
          <p className="eyebrow">Pricing</p>
          <h1 className="mx-auto mt-3 max-w-[18ch] text-display-xl">Start free. Grow by the door.</h1>
          <p className="mx-auto mt-6 max-w-[38rem] text-lead text-ink-3">
            One simple formula, in Canadian dollars. No per-payment fees, no per-signature fees, no contracts.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="segmented" data-segments="audience" role="group" aria-label="Show plans for">
              <button type="button" data-segment="landlords" aria-pressed="true">
                Landlords
              </button>
              <button type="button" data-segment="pm" aria-pressed="false">
                Property managers
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="bg-canvas-alt pb-20" data-pricing>
        <div className="wrap">
          <div className="mx-auto mb-12 max-w-[36rem] rounded-3xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="doors" className="font-semibold">
                How many doors do you manage?
              </label>
              <span className="whitespace-nowrap text-[0.9375rem] font-semibold text-brand-text" data-doors-out>
                {doors} doors
              </span>
            </div>
            <input id="doors" type="range" min={1} max={100} defaultValue={doors} className="range mt-5" />
            <div className="mt-2 flex justify-between text-[0.75rem] text-ink-4">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          <div data-segment-panel="audience:landlords">
            <h2 className="sr-only">Plans for landlords</h2>
            <div className="mx-auto grid max-w-[62rem] gap-5 lg:grid-cols-2">
              {landlordPlans.map((p) => (
                <PlanCard key={p.id} plan={p} doors={doors} />
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-[46rem] text-center text-[0.9375rem] text-ink-3">
              For comparison, in U.S. dollars: <a href="https://www.buildium.com/pricing/" rel="noopener">Buildium</a> starts at $62 a
              month and <a href="https://www.doorloop.com/pricing" rel="noopener">DoorLoop</a>’s minimum is $199.
            </p>
            <div className="mx-auto mt-5 max-w-[62rem] rounded-4xl bg-brand-ink p-8 text-white sm:p-10" data-reveal>
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                <div>
                  <p className="eyebrow-dark">Done for you</p>
                  <h3 className="mt-2 text-headline !text-white">{virtualPm.name}</h3>
                  <p className="mt-3 font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em]">
                    from ${virtualPm.base}
                    <span className="text-[1rem] font-medium tracking-normal text-white/60"> /month + ${virtualPm.perUnit} per unit</span>
                  </p>
                  <a href={url('contact/')} className="btn-light mt-7">
                    Talk to the team
                  </a>
                </div>
                <CheckList dark items={virtualPm.features} />
              </div>
            </div>
          </div>

          <div data-segment-panel="audience:pm" hidden>
            <h2 className="sr-only">Plans for property management companies</h2>
            <div className="mx-auto grid max-w-[75rem] gap-5 lg:grid-cols-3">
              {pmPlans.map((p) => (
                <PlanCard key={p.id} plan={p} doors={doors} />
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-[44rem] text-center text-ink-3">
              Managing more than 50 doors, or switching from Buildium, AppFolio or Yardi?{' '}
              <a href={url('property-managers/')}>See the platform for property managers</a> or{' '}
              <a href={url('contact/')}>talk to us about custom pricing</a>.
            </p>
          </div>

          <p className="mx-auto mt-8 max-w-[46rem] text-center text-[0.9375rem] text-ink-2">
            <Phone className="mr-1.5 inline h-4 w-4 align-[-2px] text-brand" aria-hidden />
            Rather ask a person? Call{' '}
            <a href={`tel:${site.phone.tel}`} data-track="call:pricing">
              {site.phone.display}
            </a>{' '}
            ({site.hours}) or <a href={site.app.book}>book a 15-minute call</a>.
          </p>
        </div>
      </section>

      <Section id="compare" labelledBy="compare-title">
        <div className="wrap-content">
          <Heading id="compare-title" title="Compare landlord plans" size="md" />
          {/* Folded behind one tap on phones (the script closes it there); always open on laptops. */}
          <details className="fold mt-8 md:mt-12" open data-fold-mobile>
            <summary className="fold-head">
              Compare every feature
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
          <div className="mt-4 overflow-x-auto md:mt-0" tabIndex={0} role="region" aria-label="Plan comparison table">
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">Features included in the Free and Self Management plans</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-4 pr-4 text-[0.9375rem] font-semibold text-ink-3">
                    Feature
                  </th>
                  <th scope="col" className="w-36 py-4 text-center font-semibold">
                    Free
                  </th>
                  <th scope="col" className="w-44 py-4 text-center font-semibold text-brand-text">
                    Self Management
                  </th>
                </tr>
              </thead>
              {compare.map((g) => (
                <tbody key={g.group}>
                  <tr>
                    <th colSpan={3} scope="colgroup" className="pb-2 pt-9 text-left font-display text-[1.125rem] font-semibold">
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map(([label, free, self]) => (
                    <tr key={label} className="border-b border-line-soft">
                      <th scope="row" className="py-3.5 pr-4 font-normal text-ink-2">
                        {label}
                      </th>
                      <td className="py-3.5 text-center">
                        <Cell v={free} />
                      </td>
                      <td className="py-3.5 text-center">
                        <Cell v={self} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          </details>
        </div>
      </Section>

      <Section id="addons" tone="alt" labelledBy="addons-title">
        <div className="wrap-content">
          <Heading id="addons-title" eyebrow="Pay only when you need them" title="Add-ons and services" size="md" />
          <div className="mt-12 overflow-hidden rounded-4xl bg-white shadow-card">
            <ul className="divide-y divide-line-soft">
              {addOns.map((a) => (
                <li key={a.name} className="flex flex-col gap-1 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8">
                  <span>
                    <span className="block font-semibold">{a.name}</span>
                    <span className="block text-[0.9375rem] text-ink-3">{a.note}</span>
                  </span>
                  <span className="shrink-0 font-display text-[1.25rem] font-semibold tracking-[-0.01em] tabular-nums">{a.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <Fine className="mt-6">
            All prices in Canadian dollars; HST added at checkout. MLS® listings and placement are provided by List It Realty Brokerage
            Inc. Legal services are provided by licensed Ontario paralegals. Paralegals researching LTB case law can{' '}
            <a href={url('paralegals/')}>see CaseBuilder memberships</a>.
          </Fine>
        </div>
      </Section>

      <Section id="faq" labelledBy="pfaq-title">
        <div className="wrap-content">
          <h2 id="pfaq-title" className="text-display-md">
            Pricing questions
          </h2>
          <FAQList className="mt-10" items={pricingFaqs} />
        </div>
      </Section>

      <CTABand title="Your first two tenants are free." secondary={{ label: 'Book a 15-minute call', href: site.app.book }} />
    </>
  )
}
