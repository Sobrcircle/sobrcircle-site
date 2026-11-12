import { Check, Clock, Hourglass, Minus, PauseCircle, Scale, ShieldCheck, Tag, Users, X } from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { Calculator, HowCalculated, PlanCards } from '../components/olh'
import { pricingFaqs } from '../content/faqs'

const chapters = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'included', label: 'What’s included' },
  { id: 'visits', label: 'Local visits' },
  { id: 'terms', label: 'Terms' },
  { id: 'faq', label: 'Questions' },
]

export function Pricing() {
  return (
    <>
      <ChapterNav title="Pricing" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Calculator + plans ------------------------------------------ */}
      <section id="calculator" data-hero aria-labelledby="pricing-title" className="bg-canvas-alt pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className="wrap">
          <Heading
            as="h1"
            id="pricing-title"
            eyebrow="Proposed pricing · CAD, plus HST"
            title="One monthly total for your portfolio."
            lead="Choose your property type and how many tenancies you have. Every plan is priced for your whole portfolio, not per unit."
          />
          <div className="mt-9" aria-labelledby="calc-title">
            <Calculator />
          </div>
          <PlanCards live className="mx-auto mt-6 max-w-[72rem] lg:mt-8" />
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
      <Section id="included" labelledBy="included-title">
        <div className="wrap">
          <Heading
            id="included-title"
            eyebrow="What’s included"
            title="Property Management, and the Legal Guarantee."
            lead="Day-to-day management by our Ontario team, documented in LandlordEzy. Add the Legal Guarantee to have LTB work arranged in advance."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Users className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Property Management</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-3">From $99 a month · whole house from $149</p>
              <ul className="mt-6 space-y-3 text-[0.9375rem]">
                {[
                  ['Rent administration', 'ledger, monthly owner statements and arrears follow-up'],
                  ['The N4 process', 'for late rent'],
                  ['Tenant communication', 'through LandlordEzy, email and phone'],
                  ['Routine maintenance coordination', 'with one provider per job'],
                  ['Connected records', 'leases, documents and owner records in one place'],
                  ['LandlordEzy included', 'no separate software bill'],
                  ['Member legal access', 'a monthly paralegal consultation, and a member case rate'],
                ].map(([b, t]) => (
                  <li key={b} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">
                      <strong className="font-semibold text-ink">{b}</strong>, {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tile-dark p-7 sm:p-9" data-reveal>
              <div className="glow-blue pointer-events-none absolute inset-x-0 -top-20 h-64 opacity-60" aria-hidden />
              <div className="relative">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-glow">
                  <Scale className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-5 text-title !text-white">Property Management + Legal Guarantee</h3>
                <p className="mt-1 text-[0.9375rem] text-white/65">Everything in Property Management, plus legal work on eligible new LTB matters for all enrolled units.</p>
                <ul className="mt-6 space-y-3 text-[0.9375rem]">
                  {[
                    ['Notices', 'reviewed or prepared'],
                    ['Eligible LTB applications', 'including L1 for non-payment'],
                    ['Evidence and disclosure', 'prepared from your records'],
                    ['Settlement and mediation', 'where it serves you'],
                    ['Licensed hearing representation', 'by Landlord Pro Legal Services'],
                    ['Order review', 'and agreed next-step coordination'],
                  ].map(([b, t]) => (
                    <li key={b} className="flex gap-3">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand-glow" strokeWidth={2.6} aria-hidden />
                      <span className="text-white/80">
                        <strong className="font-semibold text-white">{b}</strong>, {t}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href={url('legal/#guarantee')} className="link-more-dark mt-7">
                  How the Legal Guarantee works
                </a>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-5 flex max-w-[64rem] gap-4 rounded-4xl border border-line-soft p-6 sm:p-7" data-reveal>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-canvas-alt text-ink-3">
              <X className="h-5 w-5" strokeWidth={2} aria-hidden />
            </span>
            <p className="text-[0.9375rem] text-ink-3">
              <strong className="font-semibold text-ink">Not in any plan.</strong> Physical site visits, repairs, renovation and
              project work, and tenant placement are each quoted before they’re booked. Condo fee payments aren’t managed. LTB filing
              fees, sheriff, process servers and other approved outside costs are billed at cost.
            </p>
          </div>
          <p className="mx-auto mt-8 max-w-[64rem] text-center text-[0.9375rem] text-ink-3">
            Managing your own tenants? <a href={url('landlord-shield/')}>See everything in OLH Landlord Shield</a>.
          </p>
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
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-4 md:grid-cols-3">
            {[
              { price: '$75', unit: '+ HST per visit', t: 'Standard scheduled visit', b: 'On Landlord Shield and Property Management. Up to 45 minutes on site, dated photos, a standard checklist, a full report in LandlordEzy and follow-up.' },
              { price: '$55', unit: '+ HST per visit', t: 'With the Legal Guarantee', b: 'The same visit at a lower price for Property Management + Legal Guarantee clients. Still booked and billed one visit at a time.', hi: true },
              { price: 'from $149', unit: '+ HST', t: 'Urgent or after-hours', b: 'Subject to availability, on all three plans.' },
            ].map((v) => (
              <div key={v.t} className={`flex flex-col rounded-4xl bg-white p-7 ${v.hi ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
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
    </>
  )
}
