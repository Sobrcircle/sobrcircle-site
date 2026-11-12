import { Building2, CalendarClock, FileText, MonitorSmartphone, Percent, Repeat, Scale, TriangleAlert, UserCheck } from 'lucide-react'
import { site, url } from '../site'
import { $ } from '../content/pricing'
import { CTABand, CheckList, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { rentFaqs } from '../content/faqs-rent'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'guideline', label: 'The guideline' },
  { id: 'rules', label: 'The rules' },
  { id: 'exempt', label: 'Exemptions and L5' },
  { id: 'deposits', label: 'Deposits' },
  { id: 'help', label: 'How we help' },
  { id: 'faq', label: 'Questions' },
]

/** As the old ontario-rent-increase-guideline page gives them (November 2026). */
const years = [
  { year: '2027', pct: 1.9, note: 'For increases that take effect during 2027. An N1 served now lands here.', now: true },
  { year: '2026', pct: 2.1, note: 'For increases that took effect during 2026.' },
  { year: '2025', pct: 2.5, note: '' },
  { year: '2024', pct: 2.5, note: '' },
]

const example = (rent: number, pct: number) => {
  const up = Math.round(rent * pct) / 100
  return { up, next: rent + up }
}
const money = (n: number) => `$${n.toLocaleString('en-CA')}`

export function GuideRent() {
  const e27 = example(2000, 1.9)
  const e26 = example(2000, 2.1)
  return (
    <>
      <ChapterNav title="Rent increases guide" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <PageHero
        eyebrow="Guide · Rent increases"
        title="Raising the rent in Ontario."
        lead="How much, how often, and how much notice. For most units: up to the guideline, once every 12 months, after 90 days’ written notice on an N1."
        secondary={{ label: 'See the guideline by year', href: '#guideline' }}
      >
        <ul className="m-snap mx-auto mt-12 grid max-w-[64rem] gap-3 md:grid-cols-3">
          {[
            { Icon: Percent, t: '1.9% for 2027', b: 'The guideline for increases that take effect during 2027, set by the province.' },
            { Icon: CalendarClock, t: '90 days’ notice', b: 'Serve a written N1 at least 90 days before the new rent starts.' },
            { Icon: Repeat, t: 'Once every 12 months', b: 'And not in a tenant’s first 12 months. Miss the window and you wait a full year.' },
          ].map(({ Icon, t, b }) => (
            <li key={t} className="tile spot p-6" data-reveal>
              <span className="icon-badge">
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-[1.25rem] font-semibold tracking-[-0.015em]">{t}</h2>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
            </li>
          ))}
        </ul>
      </PageHero>

      {/* ---- Guideline ---------------------------------------------------- */}
      <Section id="guideline" tone="alt" labelledBy="guideline-title">
        <div className="wrap">
          <Heading
            id="guideline-title"
            eyebrow="The guideline, year by year"
            title="Serving an N1 now? Use 1.9%."
            lead="An N1 needs at least 90 days’ notice, so one served now takes effect in 2027 at the earliest. The 2027 guideline applies to increases that take effect during 2027."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[64rem] items-start gap-5 md:mt-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="tile-white p-3 sm:p-4" data-reveal>
              <div className="cmp-scroll no-scrollbar !mx-0 !px-0" tabIndex={0} role="region" aria-label="Ontario rent increase guideline by year">
                <table className="cmp !min-w-0 !text-left">
                  <thead>
                    <tr>
                      <th scope="col" className="!pl-4 text-[0.8125rem] !text-ink-3">
                        Year
                      </th>
                      <th scope="col" className="text-[0.8125rem] !text-ink-3">
                        Guideline
                      </th>
                      <th scope="col" className="text-[0.8125rem] !text-ink-3">
                        Applies to
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {years.map((y) => (
                      <tr key={y.year} className={y.now ? 'cmp-hi' : ''}>
                        <th scope="row" className={`!w-auto !pl-4 !shadow-none ${y.now ? '!bg-[#f4f8ff]' : ''}`}>
                          {y.year}
                        </th>
                        <td className="font-display text-[1.25rem] font-bold tabular-nums !text-ink">{y.pct}%</td>
                        <td className="text-[0.875rem]">
                          {y.now && <span className="chip-brand mb-1.5">For N1s served now</span>}
                          <span className="block">{y.note || ' '}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tile-white p-7 sm:p-8" data-reveal>
              <h3 className="text-title">How to work it out</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">Multiply the current rent by the guideline. That’s the most you can add.</p>
              <dl className="mt-6 space-y-5">
                {[
                  { k: '2027 at 1.9%', e: e27 },
                  { k: '2026 at 2.1%', e: e26 },
                ].map(({ k, e }) => (
                  <div key={k} className="rounded-3xl bg-canvas-alt p-5">
                    <dt className="text-[0.8125rem] font-semibold text-ink-3">{k}</dt>
                    <dd className="mt-1 font-display text-[1.125rem] font-semibold tabular-nums text-ink">
                      {money(2000)} + {money(e.up)} = {money(e.next)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[0.9375rem] text-ink-3">
                The exact new rent goes on the N1, with an effective date at least 90 days after you serve it.
              </p>
            </div>
          </div>
          <Fine className="mx-auto mt-6 max-w-[56rem] text-center">
            The guideline is set each year by Ontario’s Ministry of Municipal Affairs and Housing and announced around late summer of the
            year before. Confirm the current figure on{' '}
            <a href="https://www.ontario.ca/page/residential-rent-increases" rel="noopener">
              ontario.ca
            </a>
            .
          </Fine>
        </div>
      </Section>

      {/* ---- Rules ---------------------------------------------------------- */}
      <Section id="rules" labelledBy="rules-title">
        <div className="wrap">
          <Heading
            id="rules-title"
            eyebrow="The rules"
            title="Three rules, and the mistakes that break them."
            lead="The wrong form or short notice makes the increase invalid."
            size="md"
          />
          <ol className="m-snap mx-auto mt-10 grid max-w-[64rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              { Icon: Percent, t: 'Within the guideline', b: 'For most rent-controlled units, no more than the year’s guideline unless the LTB approves more.' },
              { Icon: Repeat, t: 'Once every 12 months', b: 'No more than one increase in 12 months, and none until the tenant has lived there 12 months.' },
              { Icon: FileText, t: '90 days on the N1', b: 'At least 90 days’ written notice on the official N1, served by an approved method.' },
            ].map(({ Icon, t, b }, idx) => (
              <li key={t} className="tile spot p-6 sm:p-7" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-8 grid max-w-[64rem] gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-4xl border border-line p-7 sm:p-8" data-reveal>
              <span className="flex items-center gap-3">
                <TriangleAlert className="h-5 w-5 text-warn" strokeWidth={1.9} aria-hidden />
                <h3 className="text-title">Common mistakes</h3>
              </span>
              <CheckList
                className="mt-5 text-[0.9375rem]"
                items={[
                  'Giving less than 90 days’ notice, or notice that isn’t on the official N1.',
                  'Raising the rent twice in 12 months, or in the tenant’s first 12 months.',
                  'Going above the guideline without the Board’s approval.',
                  'Using an N1 for a unit that’s exempt from the guideline (that’s an N2), or the reverse.',
                  'Getting the new rent wrong. Work it out from the current rent and the guideline for the year it takes effect.',
                  'Serving by an invalid method, such as taping it to the door or sending a text.',
                ]}
              />
            </div>
            <div className="rounded-4xl bg-canvas-alt p-7 sm:p-8" data-reveal>
              <h3 className="text-title">Serving the N1</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-3">
                The N1 is served like any other notice: in person, in the mailbox, under the door, by courier, by mail, or by email with
                the tenant’s written consent. By regular mail it counts as served 5 days after mailing, so allow for that in the 90 days.
              </p>
              <a href={url('guides/ltb-forms/#serving')} className="link-more mt-5">
                How to serve a notice
              </a>
              <p className="mt-6 border-t border-line-soft pt-5 text-[0.9375rem] font-semibold text-ink">
                A mistimed or badly served N1 costs you a full year of the increase.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Exempt units and L5 ------------------------------------------- */}
      <Section id="exempt" tone="alt" labelledBy="exempt-title">
        <div className="wrap">
          <Heading
            id="exempt-title"
            eyebrow="Exemptions and above-guideline increases"
            title="When the guideline doesn’t apply, and when it isn’t enough."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:mt-12 lg:grid-cols-2">
            <div className="tile-white flex flex-col p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Building2 className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="mt-5 text-[0.8125rem] font-semibold text-brand-text">N2</p>
              <h3 className="mt-1 text-headline">Exempt units</h3>
              <p className="mt-3 text-ink-3">
                Units first occupied after November 15, 2018 are generally exempt from the guideline cap. They’re served an N2, Notice of
                Rent Increase (Unit Partially Exempt), not an N1.
              </p>
              <CheckList
                className="mt-5 text-[0.9375rem]"
                items={['The 90 days’ written notice still applies.', 'So does once every 12 months.', 'Some care homes and social housing follow separate rules.']}
              />
            </div>
            <div className="tile-white flex flex-col p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Scale className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="mt-5 text-[0.8125rem] font-semibold text-brand-text">L5</p>
              <h3 className="mt-1 text-headline">Above the guideline</h3>
              <p className="mt-3 text-ink-3">
                Going above the guideline needs the LTB’s approval, through an Application for an Above Guideline Rent Increase (L5). These
                applications are contested and closely scrutinised.
              </p>
              <CheckList
                className="mt-5 text-[0.9375rem]"
                items={[
                  'For major capital work (roof, boiler or mechanical, windows, elevators, life-safety systems) or extraordinary municipal tax or utility cost increases.',
                  'At most 3% above the guideline a year, spread over up to 3 years if the justified increase is larger.',
                  'Invoices, contracts, permits and proof of payment for every item.',
                  'Since July 1, 2026: serve the documents within 7 days of the Board’s direction, and file a certificate of service within 5 days of serving.',
                ]}
              />
              <p className="mt-5 text-[0.9375rem] text-ink-3">
                A separate form, the N10, records an above-guideline increase the tenant agrees to. Check the L5 filing fee on the LTB
                site.
              </p>
              <a href={url('guides/ltb-forms/#l5')} className="link-more mt-auto pt-5">
                The L5 in the forms guide
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Deposits ------------------------------------------------------- */}
      <Section id="deposits" labelledBy="deposits-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">Deposits and interest</p>
              <h2 id="deposits-title" className="mt-3 text-display-md">
                Last month’s rent, and the interest on it.
              </h2>
              <p className="mt-5 text-lead text-ink-3">
                A rent increase touches the deposit too. Interest on it is owed each year, at the guideline rate.
              </p>
            </div>
            <dl className="space-y-3">
              {[
                { k: 'What you can collect', v: 'A rent deposit equal to one rental period’s rent, usually one month. It can only be applied to the last month’s rent, not to damage or cleaning.' },
                { k: 'What you can’t', v: 'Damage deposits, key deposits beyond the actual replacement cost, and automatic cleaning fees.' },
                { k: 'Interest', v: 'Paid to the tenant on the rent deposit each year, at the guideline rate.' },
                { k: 'After an increase', v: 'The deposit can be topped up to the new rent when the increase takes effect. LandlordEzy does it in one step.' },
              ].map(({ k, v }) => (
                <div key={k} className="tile p-5 sm:p-6" data-reveal>
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-3">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ---- How OLH helps ------------------------------------------------- */}
      <Section id="help" tone="alt" labelledBy="help-title">
        <div className="wrap">
          <Heading
            id="help-title"
            eyebrow="How OLH helps"
            title="The right amount, on the right date."
            lead="Do it yourself with the N1 pre-filled, or have us do it for you."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              {
                Icon: MonitorSmartphone,
                k: `Landlord Shield · from ${$.shield} a month`,
                t: 'The N1, pre-filled',
                b: 'LandlordEzy fills in the guideline, the new rent and the earliest legal effective date (90 days out and 12 months since the last increase) on the official N1. You e-sign and serve, and the increase applies to your ledger on its effective date.',
                href: url('landlord-shield/#n4'),
                link: 'See the N1 on Landlord Shield',
              },
              {
                Icon: UserCheck,
                k: `Property Management · from ${$.management} a month`,
                t: 'We prepare and serve it',
                b: 'For managed tenancies, we prepare and serve guideline N1s and track every anniversary date, so an increase isn’t missed or mistimed.',
                href: url('property-management/'),
                link: 'See Property Management',
              },
              {
                Icon: Scale,
                k: 'Every plan',
                t: 'A paralegal to ask',
                b: 'A 15-minute consultation with a licensed paralegal each month. Ask whether a unit is exempt, or whether your costs could support an above-guideline increase.',
                href: url('legal/'),
                link: 'See legal help',
              },
            ].map(({ Icon, k, t, b, href, link }) => (
              <li key={t} className="tile-white spot flex flex-col p-7 sm:p-8" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <p className="mt-5 text-[0.8125rem] font-semibold text-ink-3">{k}</p>
                <h3 className="mt-1 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
                <a href={href} className="link-more mt-auto pt-5">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <Fine className="mx-auto mt-6 max-w-[56rem] text-center">
            LandlordEzy is software: it doesn’t guarantee a notice is valid. Check the current guideline and any exemption before you serve.
            Prices are monthly, plus HST.
          </Fine>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about rent increases.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={rentFaqs} />
          <Fine className="mt-8">
            General information, not legal advice. Last reviewed November 2026. The province’s own page:{' '}
            <a href="https://www.ontario.ca/page/residential-rent-increases" rel="noopener">
              residential rent increases
            </a>
            . Related: <a href={url('guides/ltb-forms/')}>LTB forms guide</a> · <a href={url('guides/bill-60/')}>Bill 60</a>.
          </Fine>
        </div>
      </Section>

      <CTABand
        title="Rather have a paralegal check it?"
        lead="A mistimed or badly served N1 costs you a full year of the increase. Book a 15-minute call and we’ll check the amount, the form and the date."
      />
    </>
  )
}
