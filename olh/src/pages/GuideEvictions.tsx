import { Ban, CalendarClock, ChevronDown, ClipboardList, FileWarning, Gavel, Hourglass, KeyRound, Mailbox, Scale, Search, Siren, Video } from 'lucide-react'
import { site, url } from '../site'
import { $ } from '../content/pricing'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { evictionFaqs } from '../content/faqs-evictions'

const chapters = [
  { id: 'overview', label: 'The short answer' },
  { id: 'grounds', label: 'Grounds and notices' },
  { id: 'steps', label: 'The steps' },
  { id: 'timeline', label: 'How long it takes' },
  { id: 'mistakes', label: 'Mistakes' },
  { id: 'cost', label: 'What it costs' },
  { id: 'faq', label: 'Questions' },
]

const ltb = 'https://tribunalsontario.ca/ltb/'

/** Reason, notice, minimum notice, whether the tenant can fix it, and the application that follows. */
const grounds: { reason: string; notice: string; period: string; fix: string; apply: string }[] = [
  { reason: 'Rent not paid', notice: 'N4', period: 'At least 7 days', fix: 'Yes: paying everything owing voids it', apply: 'L1' },
  { reason: 'Damage, disturbing others or overcrowding', notice: 'N5', period: '20 days on a first N5', fix: 'Yes: 7 days to correct, first N5 only', apply: 'L2' },
  { reason: 'An illegal act in the unit', notice: 'N6', period: 'Set by the form (see the forms guide)', fix: 'No', apply: 'L2' },
  { reason: 'Serious damage or a safety risk', notice: 'N7', period: '10 days', fix: 'No', apply: 'L2' },
  { reason: 'Rent paid late, again and again', notice: 'N8', period: '60 days, ending on the last day of a rental period', fix: 'No', apply: 'L2' },
  { reason: 'You, a buyer or an eligible family member will move in', notice: 'N12', period: '60 days, ending on the last day of a rental period', fix: 'No', apply: 'L2, which can be filed once the notice is served' },
  { reason: 'Demolition, conversion or major repairs', notice: 'N13', period: '120 days, ending on the last day of a rental period', fix: 'No', apply: 'L2, which can be filed once the notice is served' },
]

const steps = [
  {
    Icon: Search,
    t: 'Identify the legal ground',
    b: 'Match what is happening to a reason the Residential Tenancies Act allows. If there is no valid ground, there is no eviction.',
  },
  {
    Icon: Mailbox,
    t: 'Serve the right notice, then wait',
    b: 'The right N form, filled out correctly, delivered by a valid method, with a Certificate of Service. You can’t apply to the Board before the notice period ends.',
  },
  {
    Icon: ClipboardList,
    t: 'File the application',
    b: 'If the tenant hasn’t paid or corrected the problem, file the matching application: an L1 for unpaid rent, an L2 for most other grounds.',
  },
  {
    Icon: Scale,
    t: 'Prepare your evidence',
    b: 'A clean rent ledger, photos, written messages and witnesses, organised the way adjudicators expect. Missing evidence gets hearings adjourned.',
  },
  {
    Icon: Video,
    t: 'Attend the hearing',
    b: 'Usually by video or phone. The tenant can raise defences or ask for more time. The adjudicator decides and issues a written order.',
  },
  {
    Icon: Gavel,
    t: 'Enforce the order',
    b: 'If the tenant stays past the date in the order, file it with the Court Enforcement Office. Only the Sheriff can carry out an eviction.',
  },
]

const stages: { stage: string; when: string; what: string }[] = [
  {
    stage: 'Notice period',
    when: 'Set by the notice: 7 days for an N4, 60 for an N8 or N12, 120 for an N13',
    what: 'The tenant can pay or correct, where the notice allows it, and the notice is void.',
  },
  {
    stage: 'Filing with the Board',
    when: 'As soon as the notice period ends (sooner for an N12 or N13)',
    what: 'You file the L1 or L2 with your evidence and pay the Board’s filing fee.',
  },
  {
    stage: 'Waiting for a hearing',
    when: 'Set by the Board’s schedule. It varies, and it is the least predictable stage',
    what: 'The Board sends both sides a Notice of Hearing with the date, time and how to join.',
  },
  {
    stage: 'Hearing and order',
    when: 'The order follows the hearing',
    what: 'The adjudicator hears both sides and issues a written order with the date the tenant must leave.',
  },
  {
    stage: 'Sheriff enforcement',
    when: 'Only if the tenant stays past the date in the order',
    what: 'You file the order with the Court Enforcement Office, which schedules the Sheriff.',
  },
]

const mistakes = [
  {
    Icon: FileWarning,
    t: 'Serving the wrong notice',
    b: 'An N5 for unpaid rent, or an N12 that doesn’t meet its strict good-faith and compensation rules, gets the application dismissed. So does an old version of the form.',
  },
  {
    Icon: Ban,
    t: 'Invalid service',
    b: 'A text message, email without the tenant’s consent, or a notice taped to the door is not valid service. Complete a Certificate of Service every time.',
  },
  {
    Icon: CalendarClock,
    t: 'Filing too early or too late',
    b: 'File before the notice period ends and the application is rejected. Wait too long and you lose rent, and some applications have deadlines.',
  },
  {
    Icon: KeyRound,
    t: 'Doing it yourself, physically',
    b: 'Changing the locks, removing belongings or cutting off utilities is illegal, even with an order in hand. It can turn your case into a claim against you.',
  },
]

export function GuideEvictions() {
  return (
    <>
      <ChapterNav title="Evictions guide" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <PageHero
        eyebrow="Guide · Evictions in Ontario"
        title="Evicting a tenant in Ontario: the process, step by step."
        lead="Evicting a tenant is a legal process under the Residential Tenancies Act, decided by the Landlord and Tenant Board. You need a reason the law allows, the matching notice served the right way, an application, a hearing and an order. Only the Sheriff can carry out the eviction. The Board sets the pace, and a mistake in the notice or its service starts the clock again."
        secondary={{ label: 'Legal help and prices', href: url('legal/') }}
        note="General information, not legal advice. Last reviewed November 2026."
      />

      {/* ---- Grounds ------------------------------------------------------------ */}
      <Section id="grounds" tone="alt" labelledBy="grounds-title">
        <div className="wrap">
          <Heading
            id="grounds-title"
            eyebrow="Start here"
            title="No valid reason, no eviction."
            lead="Ontario is a for-cause province: you can’t end a tenancy just because you want the unit back. A fixed-term lease continues month to month when it ends, so the end of a lease is not a reason on its own. Each reason has its own notice and its own application."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[68rem] overflow-hidden rounded-4xl bg-white shadow-card md:mt-12" data-reveal>
            <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-label="Eviction grounds, notices and applications">
              <table className="w-full min-w-[46rem] text-left text-[0.9375rem]">
                <caption className="sr-only">Which notice and application go with each reason for ending a tenancy</caption>
                <thead>
                  <tr className="border-b border-line text-[0.8125rem] text-ink-3">
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Reason</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Notice</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Minimum notice</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Can the tenant fix it?</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Then apply</th>
                  </tr>
                </thead>
                <tbody>
                  {grounds.map((g) => (
                    <tr key={g.notice} className="border-b border-line-soft align-top last:border-0">
                      <th scope="row" className="px-5 py-4 font-semibold text-ink sm:px-6">{g.reason}</th>
                      <td className="px-5 py-4 sm:px-6">
                        <span className="chip-brand">{g.notice}</span>
                      </td>
                      <td className="px-5 py-4 text-ink-2 sm:px-6">{g.period}</td>
                      <td className="px-5 py-4 text-ink-3 sm:px-6">{g.fix}</td>
                      <td className="px-5 py-4 font-medium text-ink sm:px-6">{g.apply}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Fine className="mx-auto mt-4 max-w-[68rem]">
            Notice periods are minimums for notices served on or after September 21, 2026. For an N4, don’t count the day you serve, and
            add 5 days if you mail it or 1 if you send it by courier. An own-use N12 with at least 120 days’ notice needs no
            compensation; with less, or for a buyer, one month’s compensation applies. N13 compensation and the tenant’s right to return
            depend on the work and the building. Each form, its deadlines and its version are in the{' '}
            <a href={url('guides/ltb-forms/')}>LTB forms guide</a>; what changed in 2026 is in the{' '}
            <a href={url('guides/bill-60/')}>Bill 60 guide</a>.
          </Fine>
        </div>
      </Section>

      {/* ---- Steps ---------------------------------------------------------------- */}
      <Section id="steps" labelledBy="steps-title">
        <div className="wrap">
          <Heading
            id="steps-title"
            eyebrow="The process"
            title="Six steps, in order."
            lead="Each step has to be done correctly before the next. An error at any stage, especially the notice, can send you back to the start."
            size="md"
          />
          <ol className="m-snap mx-auto mt-10 grid max-w-[72rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {steps.map(({ Icon, t, b }, idx) => (
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

          <details className="fold mx-auto mt-8 max-w-[72rem]">
            <summary className="fold-head !flex">
              Preparing for your hearing
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <div className="grid gap-4 px-1 pt-5 md:grid-cols-3">
              {[
                {
                  t: 'Joining',
                  b: 'Your link, meeting ID or dial-in number is on your own Notice of Hearing and is unique to your case. Join early and test your sound and video. We don’t publish hearing links, and you should never rely on a link from anyone other than the Board.',
                },
                {
                  t: 'What to have ready',
                  b: 'Your Notice of Hearing, your application and the notice you served, your Certificate of Service, your rent ledger and evidence, and photo ID. Keep digital copies open and ready to share.',
                },
                {
                  t: 'On the day',
                  b: 'Stay muted until your case is called, use a quiet space, and let one person speak at a time. If you miss the hearing, the Board may go ahead without you or dismiss your application.',
                },
              ].map((c) => (
                <div key={c.t} className="rounded-3xl bg-canvas-alt p-6">
                  <h3 className="font-display text-[1.0625rem] font-semibold">{c.t}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink-2">{c.b}</p>
                </div>
              ))}
            </div>
            <p className="px-1 pt-4 text-[0.9375rem] text-ink-3">
              Can’t find your Notice of Hearing or your link? Contact the <a href={ltb}>Landlord and Tenant Board</a> before the hearing
              date. Our licensed paralegals attend hearings for clients.
            </p>
          </details>
        </div>
      </Section>

      {/* ---- Timeline --------------------------------------------------------------- */}
      <Section id="timeline" tone="alt" labelledBy="timeline-title">
        <div className="wrap">
          <Heading
            id="timeline-title"
            eyebrow="How long it takes"
            title="The Board sets the pace."
            lead="Nobody can promise you a date, and we won’t. Every case moves through the same five stages. The notice period and the Board’s schedule are fixed; most other delays come from a file that has to start again."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[68rem] overflow-hidden rounded-4xl bg-white shadow-card md:mt-12" data-reveal>
            <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-label="The five stages of an Ontario eviction">
              <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
                <caption className="sr-only">The five stages of an eviction and what sets the length of each</caption>
                <thead>
                  <tr className="border-b border-line text-[0.8125rem] text-ink-3">
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">Stage</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">What sets the length</th>
                    <th scope="col" className="px-5 py-4 font-semibold sm:px-6">What happens</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((s, idx) => (
                    <tr key={s.stage} className="border-b border-line-soft align-top last:border-0">
                      <th scope="row" className="px-5 py-4 font-semibold text-ink sm:px-6">
                        <span className="mr-2 text-brand-text tabular-nums">{idx + 1}.</span>
                        {s.stage}
                      </th>
                      <td className="px-5 py-4 text-ink-2 sm:px-6">{s.when}</td>
                      <td className="px-5 py-4 text-ink-3 sm:px-6">{s.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-[68rem] gap-4 md:grid-cols-2">
            <div className="tile-white p-7" data-reveal>
              <span className="icon-badge">
                <Hourglass className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Outside your control</h3>
              <p className="mt-2 text-ink-3">
                The notice period, the Board’s schedule, the tenant raising defences or asking for a payment plan, and the Sheriff’s
                calendar.
              </p>
            </div>
            <div className="tile-white p-7" data-reveal>
              <span className="icon-badge">
                <Siren className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Avoidable</h3>
              <p className="mt-2 text-ink-3">
                A defective notice or bad service (start over), missing or disorganised evidence (adjournment), filing late, and waiting
                to file with the Court Enforcement Office after the order.
              </p>
            </div>
          </div>
          <Fine className="mx-auto mt-4 max-w-[68rem] text-center">
            Own-use and renovation cases start longer, because the notice period alone is 60 to 120 days. Contested cases take longer
            again. No timeline is guaranteed.
          </Fine>
        </div>
      </Section>

      {/* ---- Mistakes --------------------------------------------------------------- */}
      <Section id="mistakes" labelledBy="mistakes-title">
        <div className="wrap">
          <Heading
            id="mistakes-title"
            eyebrow="Avoid these"
            title="The mistakes that restart the clock."
            lead="A defective notice or bad service means serving again and starting over. Avoiding that one kind of mistake saves the most time."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[72rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {mistakes.map(({ Icon, t, b }) => (
              <li key={t} className="tile spot flex flex-col p-6 sm:p-7" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[46rem] text-center text-ink-3">
            The Board reissued the N4 and ten other forms in September 2026. Check the version on the{' '}
            <a href={ltb}>LTB’s site</a> before you serve or file. Form by form, the{' '}
            <a href={url('guides/ltb-forms/')}>LTB forms guide</a> lists what voids each one.
          </p>
        </div>
      </Section>

      {/* ---- Cost ------------------------------------------------------------------- */}
      <Section id="cost" tone="alt" labelledBy="cost-title">
        <div className="wrap">
          <Heading
            id="cost-title"
            eyebrow="What it costs through OLH"
            title="A licensed paralegal on the file, at a set price."
            lead={`If you file yourself, you pay the Board’s filing fee: ${$.ltbFiling} for an L1. If our paralegals handle it, here is what you pay.`}
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              {
                who: 'On Property Management + Legal Guarantee',
                price: 'Included',
                b: 'Our paralegals’ fees on eligible new Board matters, across your enrolled units, while you’re enrolled.',
                href: url('legal/#guarantee'),
                link: 'How the Legal Guarantee works',
                hi: true,
              },
              {
                who: 'A Landlord Shield or Property Management member',
                price: `From ${$.memberCase}`,
                b: 'The member case: one qualifying new non-payment case through one hearing, per owner account in any rolling 12 months, for a problem that began after enrollment.',
                href: url('legal/#member'),
                link: 'Who qualifies',
              },
              {
                who: 'Not a member, or the problem started first',
                price: `From ${$.standardCase}`,
                b: 'A standalone engagement for an ordinary non-payment matter through one hearing.',
                href: url('legal/#eviction'),
                link: 'Get help with a case now',
              },
            ].map((c) => (
              <li key={c.who} className={`spot flex flex-col rounded-4xl bg-white p-7 sm:p-8 ${c.hi ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
                <p className="text-[0.9375rem] font-medium text-ink-3">{c.who}</p>
                <p className="mt-3 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-ink">{c.price}</p>
                <p className="mt-4 text-[0.9375rem] text-ink-2">{c.b}</p>
                <a href={c.href} className="link-more mt-auto pt-5">
                  {c.link}
                </a>
              </li>
            ))}
          </ul>
          <Fine className="mx-auto mt-5 max-w-[68rem] text-center">
            Professional fees, plus HST. The Board’s filing fee is charged at cost, and sheriff, process servers and approved outside
            costs are extra. Every case is subject to an eligibility check, a conflict check and a written engagement. No result or
            timeline is guaranteed. Full terms on <a href={url('legal/')}>legal help</a>.
          </Fine>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------------- */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={evictionFaqs} />
          <div className="mt-10 rounded-4xl bg-canvas-alt p-6 sm:p-7">
            <p className="text-[0.9375rem] text-ink-2">
              <strong className="font-semibold text-ink">General information, not legal advice. Last reviewed November 2026.</strong>{' '}
              Every tenancy is different and the rules change. For the official forms and rules, go to the{' '}
              <a href={ltb}>Landlord and Tenant Board</a>. Related: <a href={url('guides/ltb-forms/')}>LTB forms guide</a> ·{' '}
              <a href={url('guides/bill-60/')}>Bill 60 guide</a> · <a href={url('resources/')}>all free resources</a>.
            </p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Want a paralegal to look at your file?"
        lead="A 15-minute call with our team. Tell us what has happened so far, the notices served and any dates, and we’ll tell you plainly where you stand and what it would cost."
        secondary={{ label: 'See legal help', href: url('legal/') }}
      />
    </>
  )
}
