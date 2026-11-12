import { ArrowRight, Ban, CalendarDays, ChevronDown, FileText, Gavel, UserRound } from 'lucide-react'
import { live, site, url } from '../site'
import { $ } from '../content/pricing'
import { CTABand, CheckList, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'
import { formsFaqs } from '../content/faqs-forms'
import {
  invalidService,
  landlordApps,
  ltbFormsUrl,
  notices,
  otherForms,
  reissued,
  serviceMethods,
  tenantApps,
  type LtbForm,
} from '../content/ltb-forms'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'chooser', label: 'Which form?' },
  { id: 'notices', label: 'Notices' },
  { id: 'applications', label: 'Applications' },
  { id: 'serving', label: 'Serving' },
  { id: 'versions', label: 'Form versions' },
  { id: 'faq', label: 'Questions' },
]

/** The chooser: a situation, then the forms in the order you use them. */
const chooser: { key: string; label: string; paths: { t: string; flow: string[]; b: string }[] }[] = [
  {
    key: 'rent',
    label: 'Rent not paid',
    paths: [
      { t: 'Rent is owed now', flow: ['n4', 'l1'], b: 'Serve the N4 as soon as rent is late. If it isn’t paid in full by the termination date, file the L1 the next day.' },
      { t: 'You want payment, not an eviction', flow: ['l9'], b: 'The L9 asks for a money order while the tenancy continues. No notice is needed first.' },
      { t: 'Rent is paid, but always late', flow: ['n4', 'n8', 'l2'], b: 'Serve an N4 each late month to build the record. Then an N8 ending at the end of a period, then the L2.' },
    ],
  },
  {
    key: 'conduct',
    label: 'Damage or disturbance',
    paths: [
      { t: 'Noise, damage or too many occupants', flow: ['n5', 'l2'], b: 'On a first N5 the tenant has 7 days to correct the problem. If they don’t, file the L2.' },
      { t: 'Serious safety problems or serious damage', flow: ['n7', 'l2'], b: 'The N7 gives 10 days’ notice and no chance to correct.' },
      { t: 'An illegal act or illegal business', flow: ['n6', 'l2'], b: 'The N6 has no correction window. Check the current form for the notice period.' },
    ],
  },
  {
    key: 'own-use',
    label: 'Own use or a buyer',
    paths: [
      {
        t: 'You, a close family member or a buyer will move in',
        flow: ['n12', 'l2'],
        b: '60 days’ notice with one month’s compensation, or 120 days or more with none for your own or a family member’s use. A buyer’s N12 always owes compensation. You can file the L2 right after serving.',
      },
    ],
  },
  {
    key: 'renovation',
    label: 'Renovation or demolition',
    paths: [
      { t: 'Work that needs a permit and an empty unit', flow: ['n13', 'l2'], b: '120 days’ notice, and compensation. You can file the L2 right after serving.' },
      { t: 'Recovering the capital cost', flow: ['l5'], b: 'Eligible capital work may support an above-guideline increase afterwards.' },
    ],
  },
  {
    key: 'agreed',
    label: 'Tenant agreed to leave',
    paths: [
      { t: 'A signed agreement, or the tenant’s own notice', flow: ['n11', 'l3'], b: 'The tenant signed an N11 or gave an N9, then stayed past the date. Most L3s are decided without a hearing.' },
      { t: 'A settlement or conditional order was broken', flow: ['l4'], b: 'File the L4 within 30 days of the breach.' },
    ],
  },
  {
    key: 'increase',
    label: 'Rent increase',
    paths: [
      { t: 'A guideline increase', flow: ['n1'], b: 'At least 90 days’ written notice, once every 12 months.' },
      { t: 'A unit exempt from the guideline', flow: ['n2'], b: 'Typically one first occupied after November 15, 2018. The same 90-day and 12-month rules apply.' },
      { t: 'More than the guideline', flow: ['l5'], b: 'Needs the Board’s approval.' },
    ],
  },
  {
    key: 'tenant',
    label: 'Tenant applied',
    paths: [
      { t: 'About rights: entry, locks, services, harassment', flow: ['t2'], b: 'The response is documentation: entry notices, messages and repair records.' },
      { t: 'Bad faith after an N12 or N13', flow: ['t5'], b: 'The response is proof of genuine intent.' },
    ],
  },
]

const codeOf = (id: string) => id.toUpperCase()

/** One group of forms as a table that swipes sideways on phones; each row is an anchor. */
function FormTable({ forms, label, alt = false }: { forms: LtbForm[]; label: string; alt?: boolean }) {
  const stick = alt ? '!bg-canvas-alt' : ''
  return (
    <div className="cmp-scroll no-scrollbar" tabIndex={0} role="region" aria-label={label}>
      <table className="cmp !min-w-[54rem] !text-left">
        <thead>
          <tr>
            <th scope="col" className={`text-[0.8125rem] !text-ink-3 ${stick}`}>
              Form
            </th>
            <th scope="col" className="text-[0.8125rem] !text-ink-3">
              What it’s for
            </th>
            <th scope="col" className="w-[36%] text-[0.8125rem] !text-ink-3">
              The rules that matter
            </th>
            <th scope="col" className="text-[0.8125rem] !text-ink-3">
              What comes next
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.map((f) => (
            <tr key={f.id} id={f.id}>
              <th scope="row" className={`!align-top ${stick}`}>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[1.25rem] font-bold tracking-[-0.01em] text-ink">{f.code}</span>
                  {f.v2026 && <span className="chip-brand">2026/09</span>}
                </span>
                <span className="mt-1 block text-ink">{f.name}</span>
                <span className="mt-3 block text-[0.8125rem] font-normal">
                  <a href={live(f.old)}>Full {f.code} guide</a>
                  <span className="text-ink-4" aria-hidden="true">
                    {' · '}
                  </span>
                  <a href={ltbFormsUrl} rel="noopener">
                    Official form
                  </a>
                </span>
              </th>
              <td className="!align-top">{f.for}</td>
              <td className="!align-top">
                <ul className="space-y-2">
                  {f.rules.map((r) => (
                    <li key={r} className="flex gap-2.5">
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="!align-top">{f.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function GuideForms() {
  return (
    <>
      <ChapterNav title="LTB forms guide" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <PageHero
        eyebrow="Guide · LTB forms and notices"
        title="LTB forms and notices, in plain words."
        lead="Which notice to serve, which application follows it, and the numbers that matter. Every Landlord and Tenant Board form Ontario landlords use most, on one page."
        secondary={{ label: 'Which form do I need?', href: '#chooser' }}
      >
        <p className="mx-auto mt-12 max-w-[46rem] text-center text-ink-2">
          Ending or enforcing a tenancy almost always starts with a notice, an N form, served on the tenant. If the tenant doesn’t pay,
          fix the problem or leave by the date on it, you apply to the Board with the matching L form, and a hearing is scheduled. A
          tenant can apply too, with a T form. Only the Board can order an eviction, and only the Sheriff enforces it.
        </p>
        <ol className="m-snap mx-auto mt-10 grid max-w-[64rem] gap-3 md:grid-cols-3">
          {[
            { Icon: FileText, k: 'N forms', t: 'Notices you serve', b: 'Each has its own grounds, notice period and rules. Served on the tenant first.', href: '#notices' },
            { Icon: Gavel, k: 'L forms', t: 'Applications you file', b: `Filed with the Board after the notice period. This is where the ${$.ltbFiling} filing fee and the hearing come in.`, href: '#applications' },
            { Icon: UserRound, k: 'T forms', t: 'Applications a tenant files', b: 'About rights, repairs or a notice given in bad faith. The response is documentation.', href: '#tenant-apps' },
          ].map(({ Icon, k, t, b, href }) => (
            <li key={k}>
              <a href={href} className="tile spot group flex h-full flex-col p-6 text-ink hover:no-underline" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="mt-4 text-[0.8125rem] font-semibold text-brand-text">{k}</span>
                <span className="mt-1 block font-display text-[1.25rem] font-semibold tracking-[-0.015em]">{t}</span>
                <span className="mt-1.5 block text-[0.9375rem] text-ink-3">{b}</span>
              </a>
            </li>
          ))}
        </ol>
      </PageHero>

      {/* ---- Chooser -------------------------------------------------------- */}
      <Section id="chooser" tone="alt" labelledBy="chooser-title">
        <div className="wrap">
          <Heading
            id="chooser-title"
            eyebrow="Which form do I need?"
            title="Start with what’s happening."
            lead="Pick the situation. Each path shows the notice, then the application that follows it. Tap a form to jump to its rules."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[68rem] md:mt-12" data-tabs-root>
            <TabRow name="chooser" label="Situations" tabs={chooser.map((c) => ({ key: c.key, label: c.label }))} className="mx-auto" />
            {chooser.map((c, idx) => (
              <TabPanel key={c.key} name="chooser" tab={c.key} first={idx === 0} className="mt-6">
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {c.paths.map((p) => (
                    <li key={p.t} className="tile-white flex flex-col p-6 sm:p-7">
                      <span className="flex flex-wrap items-center gap-1.5">
                        {p.flow.map((id, i) => (
                          <span key={id} className="inline-flex items-center gap-1.5">
                            {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-ink-4" strokeWidth={2.2} aria-label="then" />}
                            <a href={`#${id}`} className="chip-brand hover:no-underline">
                              {codeOf(id)}
                            </a>
                          </span>
                        ))}
                      </span>
                      <h3 className="mt-4 text-title">{p.t}</h3>
                      <p className="mt-2 text-[0.9375rem] text-ink-3">{p.b}</p>
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[44rem] text-center text-[0.9375rem] text-ink-2">
            <strong className="font-semibold text-ink">Does the wrong form matter?</strong> Yes. Filing the wrong notice or application is
            one of the most common reasons eviction cases are delayed or dismissed at the LTB.
          </p>
        </div>
      </Section>

      {/* ---- Notices -------------------------------------------------------- */}
      <Section id="notices" labelledBy="notices-title">
        <div className="wrap">
          <Heading
            id="notices-title"
            eyebrow="N forms"
            title="Notices you serve."
            lead="What each notice is for, the notice period and other rules, and the application that comes next. Forms marked 2026/09 were reissued after Bill 60."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-reveal>
            <FormTable forms={notices} label="Notices to end or change a tenancy" />
            <p className="mt-3 text-center text-[0.8125rem] text-ink-4 md:hidden">Swipe sideways to read each row.</p>
          </div>
          <Fine className="mx-auto mt-6 max-w-[56rem] text-center">
            Rent increases (N1, N2) have their own guide: <a href={url('guides/rent-increases/')}>raising the rent in Ontario</a>. Notice
            periods count from the date of service; see <a href="#serving">how to serve a notice</a>.
          </Fine>
        </div>
      </Section>

      {/* ---- Applications ----------------------------------------------------- */}
      <Section id="applications" tone="alt" labelledBy="applications-title">
        <div className="wrap">
          <Heading
            id="applications-title"
            eyebrow="L and T forms"
            title="Applications to the Board."
            lead="Landlords file L forms after the notice period, with the filing fee. Tenants file T forms. Either way, a hearing usually follows."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-reveal>
            <h3 className="text-headline">Landlord applications</h3>
            <div className="mt-5">
              <FormTable forms={landlordApps} label="Landlord applications to the LTB" alt />
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[72rem] gap-5 lg:grid-cols-2">
            <div className="tile-white p-7 sm:p-8" data-reveal>
              <h3 className="text-title">Filing checklist</h3>
              <CheckList
                className="mt-5 text-[0.9375rem]"
                items={[
                  'The completed application form',
                  'A copy of the notice you served',
                  'The Certificate of Service, showing how and when you served it',
                  `The ${$.ltbFiling} LTB filing fee (L1, L2, L3, L4 and L9)`,
                  'Your evidence: the rent ledger, photos, messages, inspection reports',
                ]}
              />
            </div>
            <div className="tile-white p-7 sm:p-8" data-reveal>
              <h3 className="text-title">After the hearing</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-3">
                A request to review an LTB order must be filed within 15 days of the order. Only the Sheriff can carry out an eviction
                order: changing the locks, removing belongings or shutting off utilities yourself is illegal, even after an order.
              </p>
              <a href={url('guides/evictions/')} className="link-more mt-5">
                The eviction process, step by step
              </a>
            </div>
          </div>

          <div id="tenant-apps" className="mx-auto mt-14 max-w-[72rem]" data-reveal>
            <h3 className="text-headline">Tenant applications</h3>
            <p className="mt-2 max-w-[44rem] text-ink-3">When a tenant files against you, the response is documentation.</p>
            <div className="mt-5">
              <FormTable forms={tenantApps} label="Tenant applications to the LTB" alt />
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Serving -------------------------------------------------------- */}
      <Section id="serving" labelledBy="serving-title">
        <div className="wrap">
          <Heading
            id="serving-title"
            eyebrow="Serving a notice"
            title="Serve it right, or start over."
            lead="Invalid service is one of the most common reasons notices fail at the LTB. These are the approved methods, with the days to count for an N4."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[60rem] md:mt-12" data-reveal>
            <div className="cmp-scroll no-scrollbar" tabIndex={0} role="region" aria-label="Approved methods of service">
              <table className="cmp !min-w-[36rem] !text-left">
                <thead>
                  <tr>
                    <th scope="col" className="text-[0.8125rem] !text-ink-3">
                      Method
                    </th>
                    <th scope="col" className="text-[0.8125rem] !text-ink-3">
                      Counts as served
                    </th>
                    <th scope="col" className="text-[0.8125rem] !text-ink-3">
                      N4: days to count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {serviceMethods.map((m) => (
                    <tr key={m.method}>
                      <th scope="row" className="!w-[36%]">
                        {m.method}
                      </th>
                      <td>{m.effective}</td>
                      <td className="whitespace-nowrap font-semibold tabular-nums text-ink">{m.n4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[60rem] gap-5 md:grid-cols-2">
            <div className="tile p-7 sm:p-8" data-reveal>
              <span className="icon-badge">
                <Ban className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">Not valid service</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {invalidService.map((s) => (
                  <li key={s} className="chip-warn">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.9375rem] text-ink-3">
                Invalid service means an invalid notice, and starting over. Fill in a Certificate of Service the day you serve.
              </p>
            </div>
            <div className="tile p-7 sm:p-8" data-reveal>
              <span className="icon-badge">
                <CalendarDays className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-title">A worked N4 example</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-3">
                You email the N4, with the tenant’s written consent to email service, on December 6. Don’t count the day you serve. The
                earliest termination date is December 13. If the rent owing isn’t paid in full by then, file the L1 on December 14.
              </p>
              <p className="mt-3 text-[0.9375rem] text-ink-3">A one-day error voids the notice.</p>
            </div>
          </div>
          <Fine className="mx-auto mt-6 max-w-[56rem] text-center">
            The same methods apply to every N form; the day counts above are for the N4. By regular mail, add 5 days; by courier, add 1.
          </Fine>
        </div>
      </Section>

      {/* ---- Versions ------------------------------------------------------- */}
      <Section id="versions" tone="alt" labelledBy="versions-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-start gap-10 rounded-5xl bg-white p-7 shadow-card sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">Form versions</p>
              <h2 id="versions-title" className="mt-3 text-display-md">
                Eleven forms were reissued.
              </h2>
              <p className="mt-5 text-ink-2">
                After Bill 60, the LTB reissued eleven forms as version 2026/09. Old versions stop being accepted on November 30, 2026.
                Download forms from the LTB’s own site so you always have the current version.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a href={ltbFormsUrl} className="link-more" rel="noopener">
                  Official LTB forms
                </a>
                <a href={url('guides/bill-60/')} className="link-more">
                  What Bill 60 changed
                </a>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Forms reissued as version 2026/09">
              {reissued.map((code) => (
                <li key={code} className="inline-flex h-12 min-w-[4rem] items-center justify-center rounded-2xl bg-brand-soft px-3 font-display text-[1.0625rem] font-semibold text-brand-text">
                  {code}
                </li>
              ))}
            </ul>
          </div>

          <details className="fold mx-auto mt-8 max-w-[64rem]">
            <summary className="fold-head !flex">
              Other LTB forms you may come across
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <dl className="grid gap-x-8 gap-y-4 px-1 pt-5 text-[0.9375rem] sm:grid-cols-2">
              {otherForms.map(([code, what]) => (
                <div key={code}>
                  <dt className="font-semibold text-ink">{code}</dt>
                  <dd className="mt-0.5 text-ink-3">{what}</dd>
                </div>
              ))}
            </dl>
            <p className="px-1 pt-5 text-[0.9375rem] text-ink-3">
              Every one is on the <a href={ltbFormsUrl} rel="noopener">LTB forms page</a>, and in our{' '}
              <a href={live('/downloads')}>download centre</a>.
            </p>
          </details>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions about LTB forms.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={formsFaqs} />
          <Fine className="mt-8">
            General information, not legal advice. Last reviewed November 2026. Rules and forms change; confirm on the{' '}
            <a href={ltbFormsUrl} rel="noopener">
              LTB’s forms page
            </a>{' '}
            before you serve or file.
          </Fine>
        </div>
      </Section>

      <CTABand
        title="Rather have a paralegal check it?"
        lead="Before you serve anything, our licensed paralegal team can confirm which notice, which dates and which application fit your situation."
        secondary={{ label: 'See legal help', href: url('legal/') }}
      />
    </>
  )
}
