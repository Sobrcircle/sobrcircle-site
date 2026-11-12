import { Hourglass, MonitorSmartphone, Scale } from 'lucide-react'
import { site, url } from '../site'
import { $ } from '../content/pricing'
import { CTABand, CheckList, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { bill60Faqs } from '../content/faqs-bill60'
import { ltbFormsUrl, reissued } from '../content/ltb-forms'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'compare', label: 'Before and after' },
  { id: 'notices', label: 'N4, N12, N13' },
  { id: 'deadlines', label: 'Deadlines' },
  { id: 'forms', label: 'New forms' },
  { id: 'todo', label: 'What to do now' },
  { id: 'faq', label: 'Questions' },
]

/**
 * Every change, as the old bill-60-ontario page states it (last updated
 * September 22, 2026). "Before" is filled only where that page says what the
 * old rule was; otherwise the change is labelled new or tightened.
 */
const changes: { topic: string; before: string; now: string; from: string }[] = [
  {
    topic: 'N4 notice period',
    before: 'A monthly and weekly split: 14 days for monthly tenancies.',
    now: 'At least 7 days for every tenancy. Don’t count the day of service; add 5 days by mail, 1 by courier. The tenant can still void it by paying in full.',
    from: 'N4s served on or after Sept 21, 2026',
  },
  {
    topic: 'The N4 form',
    before: 'The previous version.',
    now: 'A new 4-page N4 (2026/09), with the address split into separate boxes. Ten other forms reissued too.',
    from: 'Old versions stop being accepted Nov 30, 2026',
  },
  {
    topic: 'Tenant’s issues at an L1 hearing',
    before: 'A “satisfactory explanation” route was available.',
    now: 'To raise maintenance or other issues, the tenant first pays the landlord at least half the arrears claimed, at least 7 days before the hearing, with written notice of the issues.',
    from: 'L1s filed on or after Sept 21, 2026',
  },
  {
    topic: 'N12 compensation',
    before: 'One month’s rent, or another acceptable unit.',
    now: 'None for an own-use or family N12 giving 120 or more days, ending on a period end. A purchaser’s N12 still owes it.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'N12 move-in',
    before: 'New rule.',
    now: 'Whoever moves in must take occupancy within 60 days of the termination date, or bad faith is presumed on a T5.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'Persistent late payment (N8)',
    before: 'New definition.',
    now: 'Rent received more than 7 days late at least 3 times in any 6-month period (O. Reg. 516/06 s. 8.1). Payments applied to older arrears don’t count. The Board can still find persistence on other patterns.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'Relief from eviction',
    before: 'Tightened.',
    now: 'Postponing an eviction needs the landlord’s consent, or compelling reasons plus a finding that delay isn’t unfair (N12 and N13: the not-unfair test only). Set-aside motions on ex parte orders can’t rely on later changes in the tenant’s circumstances.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'N13 right of first refusal',
    before: 'The tenant could ask in writing to move back in.',
    now: 'The landlord also gives a written estimated completion date, updates, a completion notice and 60 days to reoccupy.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'T5 deadline after a renovation N13',
    before: 'Changed.',
    now: 'The later of 2 years after move-out or 6 months after the work finishes.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'LTB rules and guidelines',
    before: 'Updated.',
    now: 'Rules of Procedure, the Practice Direction on Evidence and Interpretation Guidelines 7, 11 and 12. Guideline 11 says the N4 must state the correct rent owing when it’s given.',
    from: 'Sept 21, 2026',
  },
  {
    topic: 'Review of an LTB order',
    before: '30 days.',
    now: '15 days from the order. Written into the Act for orders issued on or after Sept 21, 2026.',
    from: 'July 1, 2026',
  },
  {
    topic: 'Arrears repayment plans',
    before: 'New requirement.',
    now: 'Must be on the LTB’s Payment Agreement form to be enforceable. Filed before the hearing, it can become a consent order without a hearing.',
    from: 'July 1, 2026',
  },
  {
    topic: 'Maximum RTA fines',
    before: 'Half today’s maximums.',
    now: '$100,000 for individuals, $500,000 for corporations.',
    from: 'July 1, 2026',
  },
  {
    topic: 'Above-guideline increase (AGI) documents',
    before: 'New deadline.',
    now: 'Served within 7 days of the Board’s direction, with a certificate of service filed within 5 days of service.',
    from: 'July 1, 2026',
  },
  {
    topic: 'Tenant air conditioners',
    before: 'New rule.',
    now: 'A tenant may install a window or portable unit with written notice where it’s safe. Where electricity is included in the rent, a seasonal charge is allowed.',
    from: 'July 1, 2026',
  },
]

export function GuideBill60() {
  return (
    <>
      <ChapterNav title="Bill 60 guide" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <PageHero
        eyebrow="Guide · Bill 60"
        title="Bill 60: what changed for Ontario landlords."
        lead="The Fighting Delays, Building Faster Act, 2025 is in force. What it changed for the N4, N12 and N13, for arrears hearings and deadlines, and the few pieces still waiting."
        secondary={{ label: 'See what changed', href: '#compare' }}
      >
        <ol className="m-snap mx-auto mt-12 grid max-w-[64rem] gap-3 md:grid-cols-3">
          {[
            { d: 'November 27, 2025', t: 'Royal Assent', b: 'Bill 60 became law. Its Residential Tenancies Act changes arrived in two waves.' },
            { d: 'July 1, 2026', t: 'The first wave', b: 'The 15-day review window, the Payment Agreement form, doubled fines, AGI service deadlines and tenant air conditioners.' },
            { d: 'September 21, 2026', t: 'The headline changes', b: 'The 7-day N4, new forms, the 50% arrears rule, N12 compensation, persistent late payment and tighter relief from eviction.' },
          ].map(({ d, t, b }) => (
            <li key={d} className="tile spot p-6" data-reveal>
              <p className="text-[0.8125rem] font-semibold text-brand-text">{d}</p>
              <h2 className="mt-2 font-display text-[1.25rem] font-semibold tracking-[-0.015em]">{t}</h2>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
            </li>
          ))}
        </ol>
        <div className="mx-auto mt-5 flex max-w-[64rem] gap-4 rounded-4xl border border-line p-6 sm:p-7" data-reveal>
          <Hourglass className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
          <p className="text-[0.9375rem] text-ink-2">
            <strong className="font-semibold text-ink">The trigger-date rule.</strong> Each September 21 rule is keyed to a trigger date:
            the day a notice is served, an application is filed, or an order is issued. A notice served on or before September 20, 2026
            stays on the old rules and doesn’t need to be served again.
          </p>
        </div>
      </PageHero>

      {/* ---- Before and after ------------------------------------------- */}
      <Section id="compare" tone="alt" labelledBy="compare-title">
        <div className="wrap">
          <Heading
            id="compare-title"
            eyebrow="Before and after"
            title="Every change, side by side."
            lead="What the rule was, what it is now, and the date it applies from."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-reveal>
            <div className="cmp-scroll no-scrollbar" tabIndex={0} role="region" aria-label="Bill 60 changes, before and after">
              <table className="cmp !min-w-[50rem] !text-left">
                <thead>
                  <tr>
                    <th scope="col" className="!bg-canvas-alt text-[0.8125rem] !text-ink-3">
                      What
                    </th>
                    <th scope="col" className="w-[22%] text-[0.8125rem] !text-ink-3">
                      Before
                    </th>
                    <th scope="col" className="w-[38%] text-[0.8125rem] !text-ink-3">
                      Now
                    </th>
                    <th scope="col" className="w-[16%] text-[0.8125rem] !text-ink-3">
                      Applies from
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {changes.map((c) => (
                    <tr key={c.topic}>
                      <th scope="row" className="!bg-canvas-alt !align-top">
                        {c.topic}
                      </th>
                      <td className="!align-top text-[0.875rem] !text-ink-3">{c.before}</td>
                      <td className="!align-top">{c.now}</td>
                      <td className="!align-top text-[0.875rem]">{c.from}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-[0.8125rem] text-ink-4 md:hidden">Swipe sideways to read each row.</p>
          </div>

          <h3 className="mx-auto mt-14 max-w-[72rem] text-headline">Not yet in force, or dropped</h3>
          <ul className="m-snap mx-auto mt-5 grid max-w-[72rem] gap-4 md:grid-cols-3">
            {[
              { k: 'Not proclaimed', t: 'Renoviction report', b: 'A qualified person’s report with a repair or renovation N13 (RTA s. 50(3)) is not yet required.' },
              { k: 'Not set', t: 'Empty-unit presumption period', b: 'The period after which an empty unit is presumed a bad-faith N12 (s. 57(6.1)) hasn’t been set. The 60-day move-in rule is what applies today.' },
              { k: 'Dropped', t: 'Fixed-term roll-over', b: 'Ending the automatic month-to-month continuation of fixed-term leases was removed before Royal Assent. Fixed-term leases still roll over.' },
            ].map(({ k, t, b }) => (
              <li key={t} className="tile-white p-6 sm:p-7" data-reveal>
                <span className="chip-gray">{k}</span>
                <h4 className="mt-4 text-title">{t}</h4>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- N4, N12, N13 ------------------------------------------------- */}
      <Section id="notices" labelledBy="notices-title">
        <div className="wrap">
          <Heading
            id="notices-title"
            eyebrow="What it means for your notices"
            title="The N4, N8, N12 and N13 now."
            lead="These apply to notices you serve today."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[68rem] gap-5 md:mt-12 md:grid-cols-2">
            {[
              {
                id: 'n4',
                code: 'N4',
                t: 'Non-payment of rent',
                items: [
                  'Termination date at least 7 days after service, for any tenancy type. Don’t count the day you serve.',
                  'Add 5 days by mail, 1 by courier.',
                  'The tenant can still void it by paying everything owing.',
                  'N4s served on or before September 20 keep their 14-day date.',
                  'Use the 2026/09 form, and state the rent owing exactly: Guideline 11 now says so expressly.',
                ],
              },
              {
                id: 'n8',
                code: 'N8',
                t: 'Persistent late payment',
                items: [
                  'More than 7 days late at least 3 times in any 6-month period.',
                  'Payments you applied to older arrears don’t count as late.',
                  'The Board can still find persistence on other facts.',
                  'A ledger of due dates and paid dates is the evidence.',
                ],
              },
              {
                id: 'n12',
                code: 'N12',
                t: 'You, family or a buyer moving in',
                items: [
                  '60 days’ notice with one month’s compensation, or 120 days or more with none, for your own or a family member’s use.',
                  'A purchaser’s N12 always owes compensation.',
                  'Whoever moves in must occupy within 60 days of the termination date, or bad faith is presumed on a T5.',
                  'Delaying an eviction on an N12 now turns on whether delay would be unfair.',
                ],
              },
              {
                id: 'n13',
                code: 'N13',
                t: 'Demolition, conversion or major repairs',
                items: [
                  'After a renovation N13: a written estimated completion date, updates, a completion notice and 60 days to reoccupy.',
                  'The T5 deadline is the later of 2 years after move-out or 6 months after the work finishes.',
                  'The renoviction report requirement is not yet in force.',
                ],
              },
            ].map(({ id, code, t, items }) => (
              <div key={id} className="tile flex flex-col p-7 sm:p-8" data-reveal>
                <p className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-brand">{code}</p>
                <h3 className="mt-3 text-title">{t}</h3>
                <CheckList className="mt-5 text-[0.9375rem]" items={items} />
                <a href={url(`guides/ltb-forms/#${id}`)} className="link-more mt-auto pt-6">
                  The {code} in the forms guide
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- Deadlines ------------------------------------------------------ */}
      <Section id="deadlines" tone="alt" labelledBy="deadlines-title">
        <div className="wrap">
          <Heading
            id="deadlines-title"
            eyebrow="Hearings and deadlines"
            title="The numbers to diarize."
            lead="Shorter timelines reward landlords whose paperwork is exact."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              { n: '7 days', t: 'The N4 minimum', b: 'For any tenancy type, from the day after service.' },
              { n: '7 days before', t: 'The 50% payment', b: 'On L1s filed since September 21, a tenant raising issues pays at least half the arrears to you this far ahead of the hearing. Issue a receipt.' },
              { n: '15 days', t: 'Asking for a review', b: 'A request to review an LTB order is due within 15 days of the order. Diarize it the day the order arrives.' },
              { n: '60 days', t: 'Moving in, or moving back', b: 'An N12 occupant moves in within 60 days of the termination date. After a renovation N13, the tenant gets 60 days to reoccupy.' },
              { n: '7 + 5 days', t: 'AGI service', b: 'Serve above-guideline documents within 7 days of the direction, and file the certificate of service within 5 days.' },
              { n: '2 years', t: 'T5 after an N13', b: 'Or 6 months after the work finishes, whichever is later.' },
            ].map(({ n, t, b }) => (
              <li key={t} className="tile-white p-6 sm:p-7" data-reveal>
                <p className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.02em] tabular-nums text-ink">{n}</p>
                <h3 className="mt-3 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Forms ---------------------------------------------------------- */}
      <Section id="forms" labelledBy="forms-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-start gap-10 rounded-5xl bg-canvas-alt p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">New forms</p>
              <h2 id="forms-title" className="mt-3 text-display-md">
                Eleven forms, version 2026/09.
              </h2>
              <p className="mt-5 text-ink-2">
                The LTB reissued the N4, N5, N6, N8, N12, N13, L1, L2, L9, L10 and T5. Old versions stop being accepted on November 30,
                2026. Replace any saved copies with the current versions from the LTB’s own site.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={ltbFormsUrl} className="link-more" rel="noopener">
                  Official LTB forms
                </a>
                <a href={url('guides/ltb-forms/')} className="link-more">
                  Every form, in plain words
                </a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Forms reissued as version 2026/09">
              {reissued.map((code) => (
                <li key={code} className="inline-flex h-12 min-w-[4rem] items-center justify-center rounded-2xl bg-white px-3 font-display text-[1.0625rem] font-semibold text-brand-text shadow-card">
                  {code}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- What to do now ------------------------------------------------ */}
      <Section id="todo" tone="alt" labelledBy="todo-title">
        <div className="wrap">
          <Heading id="todo-title" eyebrow="What to do now" title="Six things to change on your files." size="md" />
          <div className="mx-auto mt-10 grid max-w-[68rem] items-start gap-5 md:mt-12 lg:grid-cols-[1.15fr_1fr]">
            <div className="tile-white p-7 sm:p-9" data-reveal>
              <CheckList
                items={[
                  <>
                    Use the 2026/09 forms, and count 7 days on an N4 without the day of service.{' '}
                    <a href={url('guides/ltb-forms/#serving')}>How to serve</a>
                  </>,
                  'Issue a receipt for any 50% payment a tenant makes before an L1 hearing.',
                  'For an own-use N12, choose between 60 days with compensation and 120 days without.',
                  'Keep a ledger of due dates and paid dates, the evidence an N8 needs.',
                  'Diarize the 15-day review window the day an order arrives.',
                  'Put any repayment plan on the LTB’s Payment Agreement form.',
                ]}
              />
            </div>
            <div className="space-y-4">
              <div className="tile-white p-7" data-reveal>
                <span className="flex items-center gap-3">
                  <MonitorSmartphone className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                  <h3 className="text-title">The software</h3>
                </span>
                <p className="mt-3 text-[0.9375rem] text-ink-3">
                  On Landlord Shield (from {$.shield} a month), LandlordEzy fills the official N4 from your rent ledger, which keeps
                  monthly charges, payments and receipts in one place. You review, sign and serve.
                </p>
                <a href={url('landlord-shield/#n4')} className="link-more mt-4">
                  See the N4 on Landlord Shield
                </a>
              </div>
              <div className="tile-white p-7" data-reveal>
                <span className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                  <h3 className="text-title">The paralegals</h3>
                </span>
                <p className="mt-3 text-[0.9375rem] text-ink-3">
                  Every plan includes a monthly consultation. Shield and Management members have a member rate of {$.memberCase} for a
                  qualifying new non-payment case. On Property Management + Legal Guarantee, professional fees on eligible new LTB matters
                  are included. Filing fees ({$.ltbFiling} for an L1) and outside costs are extra.
                </p>
                <a href={url('legal/')} className="link-more mt-4">
                  See legal help
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Bill 60 questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={bill60Faqs} />
          <Fine className="mt-8">
            General information, not legal advice. Last reviewed November 2026. Based on the Landlord and Tenant Board’s September 21, 2026
            operational update and O. Reg. 241/26. Rules and forms change; confirm on the{' '}
            <a href="https://tribunalsontario.ca/ltb/" rel="noopener">
              LTB’s website
            </a>{' '}
            before you serve or file.
          </Fine>
        </div>
      </Section>

      <CTABand
        title="Rather have a paralegal check it?"
        lead="Shorter timelines reward landlords whose paperwork is exact. Talk to our licensed paralegal team before you serve or file."
        secondary={{ label: 'See legal help', href: url('legal/') }}
      />
    </>
  )
}
