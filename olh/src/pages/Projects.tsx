import {
  Building,
  Check,
  ChevronDown,
  ClipboardList,
  Flame,
  Hammer,
  Home,
  Layers,
  PaintRoller,
  Phone,
  Receipt,
  Repeat,
  ShieldCheck,
  Siren,
  Wrench,
  X,
} from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { projectFaqs } from '../content/faqs-projects'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'scope', label: 'What we take on' },
  { id: 'process', label: 'How it runs' },
  { id: 'trades', label: 'Trades and permits' },
  { id: 'billing', label: 'How it’s billed' },
  { id: 'restoration', label: 'Emergency restoration' },
  { id: 'faq', label: 'Questions' },
]

const scope = [
  { Icon: Wrench, t: 'Single repairs and turnovers', b: 'One job or a vacant unit made rent-ready, managed the same disciplined way.' },
  { Icon: Home, t: 'Unit renovations', b: 'Kitchens, baths, flooring, paint and fixtures, to a leasable standard.' },
  { Icon: PaintRoller, t: 'Common areas', b: 'Entrances, hallways, lighting and lobbies.' },
  { Icon: Flame, t: 'Building systems', b: 'Boiler, heating and plumbing, with the licensed trades qualified to do it.' },
  { Icon: Building, t: 'Exterior and envelope', b: 'Roof, windows and exterior work.' },
  { Icon: ClipboardList, t: 'Capital programs', b: 'Roofs, boilers, windows, mechanical, electrical and life-safety upgrades, scoped and sequenced.' },
  { Icon: Hammer, t: 'Deferred-maintenance rehab', b: 'Years of unfinished repairs triaged into a plan, worst risks first.' },
  { Icon: Repeat, t: 'Staged repositioning', b: 'Units renovated as they turn over, so the building improves without emptying it.' },
]

const steps = [
  { t: 'Assessment and scope', b: 'We inspect, record existing conditions with photos and measurements, flag urgent items and write a scope a contractor can quote accurately.' },
  { t: 'Sourcing and vetting trades', b: 'We find qualified contractors and check licensing, insurance, experience and references.' },
  { t: 'Quotations, managed', b: 'Trades quote a comparable scope. We check for missing work, exclusions and taxes, compare side by side and recommend.' },
  { t: 'Budget and your approval', b: 'An itemized budget: labour, materials, permits, disposal, contingency and HST. Nothing non-urgent goes past the approved limit without your sign-off.' },
  { t: 'Scheduling and tenants', b: 'We sequence the trades and arrange access. Where units are occupied, we handle lawful notice and service-interruption warnings.' },
  { t: 'Supervision and reports', b: 'Site visits and photo review of attendance, workmanship and materials, with updates and photos for you.' },
  { t: 'Changes and cost control', b: 'Hidden conditions are documented and quoted as change orders for your approval. Invoices are reviewed line by line.' },
  { t: 'Closeout and warranty', b: 'A deficiency list cleared before sign-off, a budget-versus-actual reconciliation, and warranty follow-up afterward.' },
]

const trades = [
  'General contractors and renovation crews',
  'Electricians, for ESA-permitted work',
  'Plumbers and drain work',
  'HVAC technicians',
  'Roofers and restoration companies',
  'Painters, drywallers and flooring installers',
  'Structural, floor levelling and subfloor',
  'Landscapers, engineers and other specialists',
]

const permits = [
  'Building permits for structural and renovation work',
  'Electrical (ESA) and plumbing permits',
  'Engineering or professional inspections where required',
  'Rooming-house and lodging-house licensing',
  'Fire-safety requirements',
  'City permits, including street-parking permits for the crew',
]

const receiveBefore = [
  'A clear description of the problem and the recommended action',
  'A detailed scope of work',
  'Contractor quotes and a side-by-side comparison',
  'An itemized budget with HST and total',
  'Our contractor recommendation and approval requests',
  'Progress reports with photos, and schedule updates',
  'Change-order requests and cost-to-date reporting',
]

const receiveAfter = [
  'Final inspection and deficiency follow-up',
  'A final cost reconciliation: budget against actual, with variances explained',
  'Invoice and payment records',
  'Warranties, manuals, permits and inspection records',
  'Recommended future maintenance or capital work',
]

const firstResponse = [
  { Icon: Phone, t: 'We take the report and triage it', b: 'You tell us once. We identify the urgent risks and start coordinating.' },
  { Icon: Wrench, t: 'First inspection, coordinated', b: 'We arrange the first contractor or specialist to attend and report their findings.' },
  { Icon: ShieldCheck, t: 'Authorized urgent protection', b: 'Within your management authority: stopping active leaks or further damage and securing the unit.' },
  { Icon: ClipboardList, t: 'Your preliminary plan', b: 'A Condition Assessment & Restoration Plan, written to be useful to you, an insurer or the municipality.' },
]

const planSets = [
  'What was reported, what we observed and what is confirmed, kept apart',
  'The urgent risks, and what was done to protect people and the property',
  'Known uncertainties and concealed-condition caveats, stated up front',
  'A prioritized list: what’s urgent, what’s next, what can wait',
  'Recommended next steps and the decision in front of you',
  'Documentation to show an insurer or the municipality that action is underway',
]

const optionA = [
  'You hire, direct, schedule, supervise and review the contractor',
  'You approve and pay the contractor’s invoices',
  'You handle poor workmanship, deficiencies, delays, disputes or claims directly',
  'OLH does not supervise, inspect, manage or step into the project or a contractor dispute',
  'OLH continues your regular management duties as normal',
]

const optionB = [
  'Itemized quotes obtained, compared and recommended',
  'Scope, phases, trades, materials and schedule coordinated',
  'Budget and your approval limits tracked throughout',
  'Tenant notice and access coordinated where it applies',
  'Work documented and monitored against the approved scope',
  'Agreed updates with photos and videos',
  'Payment coordination and closeout records',
  'Deficiencies pursued directly, with corrective trades if you authorize them',
]

const compare: [string, string, string][] = [
  ['Included first response and preliminary plan', 'Yes', 'Yes'],
  ['Who hires and directs the contractor', 'You', 'OLH, under your authorization'],
  ['Quotes obtained and compared', 'You', 'OLH'],
  ['Scheduling, trades and tenant access', 'You', 'OLH'],
  ['Supervision and progress updates', 'You', 'OLH, with photos and videos'],
  ['Budget and approval-limit tracking', 'You', 'OLH'],
  ['Deficiencies and contractor problems', 'You handle directly', 'OLH pursues directly; corrective trades if authorized'],
  ['Documentation and closeout records', 'You', 'OLH'],
  ['Urgent safety and property protection', 'Continues under management', 'Continues under management'],
  ['Project coordination fee', 'None', '25% of approved contractor project costs + HST on the fee'],
]

export function Projects() {
  return (
    <>
      <ChapterNav title="Renovations and repairs" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <PageHero
        eyebrow="Renovations, repairs and emergency restoration"
        title="We manage the project. Licensed trades do the work."
        lead="One person coordinating the whole job, from the first inspection to the final reconciliation. We are not a general contractor, engineering firm or building inspector, and we don’t pretend to be."
        secondary={{ label: 'Damage right now? See restoration', href: '#restoration' }}
      >
        <div className="mx-auto mt-12 grid max-w-[60rem] gap-4 md:grid-cols-2">
          <div className="tile p-6 sm:p-7">
            <p className="text-[0.8125rem] font-semibold text-ink-3">We do</p>
            <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
              {['Scope, quote, schedule, coordinate and procure', 'Inspect, document and verify the work', 'Manage tenant access, progress and deficiencies to completion'].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                  <span className="text-ink-2">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-4xl border border-line p-6 sm:p-7">
            <p className="text-[0.8125rem] font-semibold text-ink-3">We don’t</p>
            <ul className="mt-3 space-y-2.5 text-[0.9375rem]">
              {['Perform regulated construction ourselves', 'Act as the general contractor, engineer or inspector', 'Bury our fee inside a contractor’s invoice'].map((t) => (
                <li key={t} className="flex gap-3">
                  <X className="mt-[3px] h-4 w-4 shrink-0 text-ink-4" strokeWidth={2.4} aria-hidden />
                  <span className="text-ink-3">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageHero>

      {/* ---- What we take on --------------------------------------------------- */}
      <Section id="scope" tone="alt" labelledBy="scope-title">
        <div className="wrap">
          <Heading
            id="scope-title"
            eyebrow="What we take on"
            title="From one repair to a whole building brought back."
            lead="Where a job means several trades, a real budget or tenants in place, you get one manager coordinating it, not a phone full of contractor numbers."
            size="md"
          />
          <ul className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {scope.map(({ Icon, t, b }, idx) => (
              <li key={t} className="tile-white spot p-6" data-reveal style={{ ['--reveal-delay' as string]: `${(idx % 4) * 0.06}s` }}>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[56rem] text-center text-ink-2">
            Planning work across a whole building? We stage capital work and renovate units as they turn over, so you spread the cost.{' '}
            <a href={url('buildings/')}>Apartment buildings and multifamily</a>.
          </p>
        </div>
      </Section>

      {/* ---- Process ------------------------------------------------------------ */}
      <Section id="process" labelledBy="process-title">
        <div className="wrap">
          <Heading
            id="process-title"
            eyebrow="How a project runs"
            title="Eight steps, every time."
            lead="Clearly defined, properly authorized, completed, documented and reported. Our job is to represent your interests until the approved work is done properly and within budget."
            size="md"
          />
          <ol className="m-snap mx-auto mt-12 grid max-w-[72rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => (
              <li key={s.t} className="tile spot p-6" data-reveal style={{ ['--reveal-delay' as string]: `${(idx % 4) * 0.06}s` }}>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{s.b}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <details className="fold-plain rounded-4xl border border-line p-7 sm:p-8" open data-fold-mobile>
              <summary className="flex items-center justify-between gap-4">
                <h3 className="text-title">What you receive: before and during</h3>
                <ChevronDown className="fold-icon h-5 w-5 shrink-0 text-ink-3 md:hidden" aria-hidden />
              </summary>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {receiveBefore.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </details>
            <details className="fold-plain rounded-4xl border border-line p-7 sm:p-8" open data-fold-mobile>
              <summary className="flex items-center justify-between gap-4">
                <h3 className="text-title">What you receive: at completion</h3>
                <ChevronDown className="fold-icon h-5 w-5 shrink-0 text-ink-3 md:hidden" aria-hidden />
              </summary>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {receiveAfter.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.9375rem] text-ink-3">A complete, organized project history you keep.</p>
            </details>
          </div>
        </div>
      </Section>

      {/* ---- Trades and permits ------------------------------------------------ */}
      <Section id="trades" tone="alt" labelledBy="trades-title">
        <div className="wrap">
          <Heading
            id="trades-title"
            eyebrow="Trades and permits"
            title="The right trade for each part. The approvals handled."
            lead="Paperwork is where owner-run renovations stall or get red-tagged. We work out what a job needs and manage it, so the work is legal and ready for inspection."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile-white p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Hammer className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Trades we coordinate</h3>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {trades.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.875rem] text-ink-3">If a job needs a trade that isn’t listed, we source it.</p>
            </div>
            <div className="tile-white p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <ClipboardList className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Permits and approvals</h3>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {permits.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.875rem] text-ink-3">We deal with the city and the trades, so you don’t have to learn the permit system.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- How work is billed ------------------------------------------------ */}
      <Section id="billing" labelledBy="billing-title">
        <div className="wrap">
          <Heading
            id="billing-title"
            eyebrow="How work is billed"
            title="Two ways work gets billed. No hidden third."
            lead="You always see the contractor’s real cost and our fee as separate lines. Nothing is marked up inside an invoice you can’t read."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile spot flex flex-col p-7 sm:p-9" data-reveal>
              <Wrench className="h-6 w-6 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-4 text-headline">Dispatched repairs</h3>
              <p className="mt-2 font-display text-[1.25rem] font-semibold">No management charge</p>
              <p className="mt-4 text-ink-3">
                For ordinary small repairs, we dispatch a contractor and you pay them directly. We coordinate it, with no added fee for routine work.
              </p>
            </div>
            <div className="tile spot flex flex-col p-7 sm:p-9" data-reveal>
              <Layers className="h-6 w-6 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="mt-4 text-headline">Managed projects</h3>
              <p className="mt-2 font-display text-[1.25rem] font-semibold">A fee agreed up front</p>
              <p className="mt-4 text-ink-3">
                When we run a real project, attending, inspecting, coordinating trades, procuring materials and handling the accounting, a project
                management fee applies on top of the contractor’s cost. Each project is quoted on its own scope and size.
              </p>
            </div>
          </div>
          <ul className="mx-auto mt-6 grid max-w-[64rem] gap-3 sm:grid-cols-3">
            {[
              { Icon: Receipt, t: 'Materials at cost', b: 'Bought on your behalf and billed at what they cost.' },
              { Icon: Check, t: 'You approve first', b: 'An itemized budget before non-emergency work begins.' },
              { Icon: ClipboardList, t: 'Reconciled at the end', b: 'Budget against actual, with any variance explained.' },
            ].map(({ Icon, t, b }) => (
              <li key={t} className="rounded-3xl bg-canvas-alt p-5">
                <Icon className="h-5 w-5 text-brand" strokeWidth={2} aria-hidden />
                <p className="mt-3 font-semibold text-ink">{t}</p>
                <p className="mt-1 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Emergency restoration --------------------------------------------- */}
      <Section id="restoration" tone="alt" labelledBy="restoration-title">
        <div className="wrap">
          <Heading
            id="restoration-title"
            eyebrow="Emergency restoration program"
            title="Damage at your rental? The first response is already covered."
            lead="A burst pipe, a roof leak, fire or storm damage. For properties we manage, the first response is part of the management you already pay for. If it grows into a full restoration, you choose how it’s run."
            size="md"
          />
          <ol className="steprow no-scrollbar mt-10 md:mt-12">
            {firstResponse.map(({ Icon, t, b }, idx) => (
              <li key={t} className="steprow-item spot" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-6 max-w-[68rem] text-[0.9375rem] text-ink-2">
            <strong className="font-semibold text-ink">Included vs. what you pay.</strong> The first response, the first contractor or specialist
            inspection and your preliminary plan are included in regular management. The contractor’s work and materials are owner costs, as for any
            repair.
          </p>

          <details className="fold mx-auto mt-6 max-w-[68rem]">
            <summary className="fold-head !flex">
              What the Condition Assessment & Restoration Plan sets out
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <ul className="grid gap-x-8 gap-y-2.5 px-1 pt-5 text-[0.9375rem] sm:grid-cols-2">
              {planSets.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                  <span className="text-ink-2">{t}</span>
                </li>
              ))}
            </ul>
            <Fine className="mt-4 px-1">
              It is a preliminary assessment, not a guarantee of a hidden condition or of any outcome. Showing that action is underway is not a
              promise of compliance or of a particular result.
            </Fine>
          </details>

          <h3 className="mx-auto mt-14 max-w-[68rem] text-center text-headline">When a repair grows into a restoration, you choose.</h3>
          <p className="mx-auto mt-3 max-w-[44rem] text-center text-ink-3">
            Multi-trade, staged or invasive work, a vacant-unit rebuild or weeks of coordination: that’s when it stops being ordinary maintenance.
            Either option is fine with us.
          </p>
          <div className="mx-auto mt-10 grid max-w-[68rem] gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-4xl bg-white p-7 shadow-card sm:p-9" data-reveal>
              <p className="chip-gray w-fit">Option A · Owner-led</p>
              <h4 className="mt-4 text-headline">You run it yourself</h4>
              <p className="mt-2 font-display text-[1.25rem] font-semibold">No project-management fee</p>
              <p className="mt-3 text-[0.9375rem] text-ink-3">We hand you the assessment and the initial contractor findings. Best if you have your own trades and the time.</p>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {optionA.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-4" aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="flex flex-col rounded-4xl bg-white p-7 shadow-float ring-2 ring-brand sm:p-9" data-reveal>
              <p className="chip-brand w-fit">Option B · OLH-coordinated</p>
              <h4 className="mt-4 text-headline">We run it end to end</h4>
              <p className="mt-2 font-display text-[1.25rem] font-semibold">25% of approved contractor project costs</p>
              <p className="mt-3 text-[0.9375rem] text-ink-3">
                With a separately signed project authorization. Best for multi-trade and staged restoration.
              </p>
              <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
                {optionB.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-brand-soft p-4 text-[0.9375rem] text-ink-2">
                <strong className="font-semibold text-ink">Fee:</strong> 25% of the approved contractor project costs, plus HST on OLH’s fee, for the
                authorized program work only, disclosed in writing before work begins.
              </p>
            </article>
          </div>

          <div className="mx-auto mt-8 max-w-[68rem] overflow-hidden rounded-4xl bg-white shadow-card" data-reveal>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Option A and Option B compared">
              <table className="w-full min-w-[38rem] text-left text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-line text-[0.8125rem] text-ink-3">
                    <th className="px-6 py-4 font-semibold">What happens</th>
                    <th className="px-6 py-4 font-semibold">Option A · Owner-led</th>
                    <th className="px-6 py-4 font-semibold">Option B · OLH-coordinated</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map(([what, a, b]) => (
                    <tr key={what} className="border-b border-line-soft last:border-0">
                      <th scope="row" className="px-6 py-3.5 font-semibold text-ink">
                        {what}
                      </th>
                      <td className="px-6 py-3.5 text-ink-3">{a}</td>
                      <td className="px-6 py-3.5 text-ink-2">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-[68rem] gap-5 md:grid-cols-2">
            <div className="rounded-4xl bg-white p-7 shadow-card" data-reveal>
              <Siren className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h4 className="mt-3 font-display text-[1.125rem] font-semibold">Safety never waits on the decision</h4>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">
                Whichever you choose, urgent safety and property-protection work continues under your existing management agreement.
              </p>
            </div>
            <div className="rounded-4xl bg-white p-7 shadow-card" data-reveal>
              <ShieldCheck className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <h4 className="mt-3 font-display text-[1.125rem] font-semibold">If a contractor doesn’t deliver</h4>
              <p className="mt-1.5 text-[0.9375rem] text-ink-3">
                Under Option B, we pursue deficiencies directly, including, where warranted, paralegal-supported correspondence, a demand or litigation
                letter. Formal proceedings are outside the 25% fee and need a separate engagement. Under Option A, a dispute is yours to handle.
              </p>
            </div>
          </div>

          <details className="fold mx-auto mt-6 max-w-[68rem]">
            <summary className="fold-head !flex">
              How the Option B fee works
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <ul className="space-y-2.5 px-1 pt-5 text-[0.9375rem]">
              {[
                'It applies only to authorized program work, never to routine maintenance',
                'Scope, fee basis, limits and approval requirements are disclosed in writing before work begins',
                'The sample authorization applies the fee to approved contractor invoices for labour and contractor-supplied materials',
                'Separately purchased materials, permits, the contractor’s own HST and change orders are handled as your project authorization sets out',
                'Option A carries no project-management fee at all',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                  <span className="text-ink-2">{t}</span>
                </li>
              ))}
            </ul>
          </details>
          <Fine className="mx-auto mt-6 max-w-[68rem] text-center">
            Each contractor remains responsible for their own technical work, licensing and workmanship under either option. Your signed project
            authorization governs the exact fee treatment for your restoration. No legal result is promised.
          </Fine>
        </div>
      </Section>

      {/* ---- FAQ ---------------------------------------------------------------- */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about projects.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={projectFaqs} />
          <a href={url('buildings/')} className="link-more mt-8">
            Managing a whole building
          </a>
        </div>
      </Section>

      <CTABand
        title="Have a project, or damage right now?"
        lead="Tell us the property and what needs doing: one repair, a renovation, capital work or an emergency. We’ll look, scope it and come back with a written quote."
        secondary={{ label: 'Property management', href: url('property-management/') }}
      />
    </>
  )
}
