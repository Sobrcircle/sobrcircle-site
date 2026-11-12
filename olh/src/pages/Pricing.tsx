import { Check, Clock, Hourglass, Minus, PauseCircle, ShieldCheck, Tag, X } from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { Calculator, HowCalculated, PlanCards, ScopeLink } from '../components/olh'
import { ScopeSheets } from '../components/sheets'
import { notInAnyPlan, visitPrices } from '../content/scope'
import { $, plans } from '../content/pricing'
import { pricingFaqs } from '../content/faqs'

const chapters = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'included', label: 'Compare' },
  { id: 'visits', label: 'Local visits' },
  { id: 'terms', label: 'Terms' },
  { id: 'faq', label: 'Questions' },
]

/** Side by side, in Paul's terms, in the same order as the plans (most complete first). `true` renders a tick. */
const compare: { row: string; cells: [string | true, string | true, string | true] }[] = [
  { row: 'Who deals with your tenants', cells: ['Our team', 'Our team', 'You do'] },
  { row: 'A new LTB matter', cells: ['Our paralegals’ fees included', `Member case from ${$.memberCase}`, `Member case from ${$.memberCase}`] },
  { row: 'Late rent and the N4', cells: ['Arrears follow-up and the N4 process', 'Arrears follow-up and the N4 process', 'You prepare, sign and serve'] },
  { row: 'Rent ledger and statements', cells: ['Run by our team', 'Run by our team', 'Checked by our team monthly'] },
  { row: 'Maintenance', cells: ['Coordinated for you', 'Coordinated for you', 'Your own vendors'] },
  { row: 'LandlordEzy software', cells: ['Included, with an owner portal', 'Included, with an owner portal', 'Your own account'] },
  { row: 'Equifax rent reporting', cells: [true, true, true] },
  { row: 'Monthly paralegal consultation', cells: [true, true, true] },
  { row: 'Standard local visit', cells: [`${$.visitGuarantee} + HST`, `${$.visit} + HST`, `${$.visit} + HST`] },
  { row: 'Term', cells: ['90 days, then 30 days’ notice', '90 days, then 30 days’ notice', 'Month-to-month'] },
]

export function Pricing() {
  return (
    <>
      <ChapterNav title="Pricing" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Calculator + plans ------------------------------------------ */}
      <section id="calculator" data-hero aria-labelledby="pricing-title" className="bg-canvas-alt pb-16 pt-8 sm:pb-24 sm:pt-10">
        <div className="wrap">
          <Heading
            as="h1"
            id="pricing-title"
            eyebrow="Proposed pricing · CAD, plus HST"
            title="One monthly total for your portfolio."
            lead="Choose your property type and how many tenancies. Every plan is priced for your whole portfolio, not per unit."
            size="md"
          />
          <div className="mt-7" aria-labelledby="calc-title">
            <Calculator />
          </div>
          <PlanCards className="mx-auto mt-6 max-w-[72rem] lg:mt-8" />
          <HowCalculated />
          <div className="mx-auto mt-10 max-w-[44rem] rounded-4xl bg-white p-6 text-center shadow-card sm:p-7">
            <p className="text-[0.9375rem] text-ink-2">
              <strong className="font-semibold text-ink">Already have a tenant problem?</strong> Standalone eviction help starts from
              $1,495 + HST and disbursements for an ordinary non-payment matter, through one hearing. You can add management
              separately.
            </p>
            <a href={url('legal/#eviction')} className="link-more mt-3">
              Existing-case help
            </a>
          </div>
        </div>
      </section>

      {/* ---- What's included ------------------------------------------------ */}
      {/* ---- Compare ---------------------------------------------------------- */}
      <Section id="included" labelledBy="included-title">
        <div className="wrap">
          <Heading
            id="included-title"
            eyebrow="What’s included"
            title="Side by side."
            lead="Day-to-day management by our Ontario team, documented in LandlordEzy. Or the same software in your own hands, with the team behind you."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[68rem] md:mt-12" data-reveal>
            <div className="cmp-scroll no-scrollbar" tabIndex={0} role="region" aria-label="Plan comparison">
              <table className="cmp">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Feature</span>
                    </th>
                    {plans.map((p, idx) => (
                      <th key={p.key} scope="col" className={idx === 0 ? 'cmp-hi' : ''}>
                        <span className="block font-display text-[1.0625rem] font-semibold leading-tight tracking-[-0.01em] text-ink">{p.short}</span>
                        <span className="mt-1 block text-[0.8125rem] font-normal text-ink-3">from ${p.from}/mo</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{r.row}</th>
                      {r.cells.map((c, idx) => (
                        <td key={idx} className={idx === 0 ? 'cmp-hi' : ''}>
                          {c === true ? (
                            <>
                              <Check className="mx-auto h-[18px] w-[18px] text-brand" strokeWidth={2.8} aria-hidden />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            c
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="cmp-foot">
                    <th scope="row">Everything in the plan</th>
                    {plans.map((p, idx) => (
                      <td key={p.key} className={idx === 0 ? 'cmp-hi' : ''}>
                        <ScopeLink plan={p.key} href={url(p.href)} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-[0.8125rem] text-ink-4 md:hidden">Swipe sideways to compare.</p>
          </div>
          <div className="mx-auto mt-6 flex max-w-[68rem] gap-4 rounded-4xl border border-line-soft p-6 sm:p-7" data-reveal>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-canvas-alt text-ink-3">
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <p className="text-[0.9375rem] text-ink-3">
              <strong className="font-semibold text-ink">Not in any plan.</strong> {notInAnyPlan}
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Local visits ---------------------------------------------------- */}
      <Section id="visits" tone="alt" labelledBy="visits-title">
        <div className="wrap">
          <Heading
            id="visits-title"
            eyebrow="Local attendance"
            title="Local visits when you need them."
            lead="Booked separately from your monthly plan, at a set per-visit price, subject to availability and confirmed with you before anyone attends."
            size="md"
          />
          <div className="m-snap mx-auto mt-12 grid max-w-[64rem] gap-4 md:grid-cols-3">
            {visitPrices.map((v) => (
              <div key={v.t} className={`spot flex flex-col rounded-4xl bg-white p-7 ${v.hi ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
                <p className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em] tabular-nums">
                  {v.price} <span className="text-[0.875rem] font-medium tracking-normal text-ink-3">{v.unit}</span>
                </p>
                <h3 className="mt-4 text-title">{v.t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{v.b}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-5 grid max-w-[64rem] gap-4 md:grid-cols-2">
            <div className="rounded-4xl bg-white p-7 shadow-card" data-reveal>
              <p className="chip-brand">Quoted</p>
              <h3 className="mt-3 text-title">Planned Local Care</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                For owners who want regular attendance. We name the properties, agree a frequency for each, confirm a local provider
                and fix a monthly amount, added to either Property Management plan. Unused visits don’t carry over.
              </p>
            </div>
            <div className="rounded-4xl bg-white p-7 shadow-card" data-reveal>
              <p className="chip-gray">As needed</p>
              <h3 className="mt-3 text-title">One-off visits</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                Booked when something needs eyes on site, subject to local availability. Several units at one building are combined
                into one booking.
              </p>
            </div>
          </div>
          <Fine className="mx-auto mt-6 max-w-[64rem] text-center">
            Repairs, technical assessments and unusual travel are agreed separately before work starts. Tenant entry follows Ontario’s
            notice rules. Visit prices are proposed and confirmed in writing before booking.
          </Fine>
        </div>
      </Section>

      {/* ---- Terms ------------------------------------------------------------ */}
      <Section id="terms" labelledBy="terms-title">
        <div className="wrap">
          <Heading id="terms-title" eyebrow="Terms in plain words" title="No surprises after you sign." size="md" />
          <ul className="mx-auto mt-12 grid max-w-[64rem] gap-x-10 gap-y-9 md:grid-cols-2">
            {[
              { Icon: ShieldCheck, t: 'Landlord Shield: month-to-month', b: 'Cancel before your next monthly renewal and it ends at the end of the month you’ve paid for. A case engagement already accepted continues under its own terms.' },
              { Icon: Hourglass, t: 'Management plans: 90 days, then monthly', b: 'Either side can end with 30 calendar days’ written notice, which can be given during the initial period, so the earliest ordinary end date is day 90.' },
              { Icon: Tag, t: 'Price hold', b: 'Proposed: your monthly rates are held for 12 months, then any change comes with 60 days’ notice. Not a 12-month locked contract.' },
              { Icon: PauseCircle, t: 'Vacant units', b: 'The monthly fee continues while an enrolled unit is vacant, because your software, records and the plan’s services continue. Existing agreements keep their own vacancy terms.' },
              { Icon: Clock, t: 'Leaving', b: 'When management ends we hand over records, balances and open matters properly. Nothing is simply dropped.' },
              { Icon: Minus, t: 'Existing clients', b: 'This page shows proposed pricing. Current agreements, listings and their terms don’t change because of it.' },
            ].map(({ Icon, t, b }) => (
              <li key={t} className="flex gap-4" data-reveal>
                <span className="icon-badge shrink-0">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-[1.1875rem] font-semibold tracking-[-0.01em]">{t}</h3>
                  <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Pricing questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={pricingFaqs} />
        </div>
      </Section>

      <CTABand
        title="Want a quote for your portfolio?"
        lead="Tell us your properties and cities. We’ll confirm the monthly total and anything local in writing."
        secondary={{ label: 'Back to home', href: url() }}
      />

      <ScopeSheets />
    </>
  )
}
