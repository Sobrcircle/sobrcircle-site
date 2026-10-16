import type { ReactNode } from 'react'
import { ArrowRight, Calculator, Landmark, PiggyBank, ScanLine, BookOpen, FileText, Sparkles } from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, Section, type QA } from '../components/ui'
import { LmrForm, N4Form, RentForm } from '../components/ToolForms'
import { lmrFaqs, n4Faqs, rentFaqs } from '../content/faqs'

/* ---- shared shell ---------------------------------------------------------- */

function ToolShell({
  eyebrow,
  title,
  lead,
  children,
  rules,
  sources,
  faqs,
  automate,
}: {
  eyebrow: string
  title: string
  lead: string
  children: ReactNode
  rules: ReactNode
  sources: { label: string; href: string }[]
  faqs: QA[]
  automate: { title: string; body: string; href: string; link: string }
}) {
  return (
    <>
      <section data-hero className="bg-white pb-14 pt-10 sm:pt-14">
        <div className="wrap-content">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-[20ch] text-display-lg">{title}</h1>
          <p className="mt-5 max-w-[40rem] text-lead text-ink-3">{lead}</p>
        </div>
        <div className="wrap-content mt-10">{children}</div>
      </section>

      <Section tone="alt" tight labelledBy="rules-title">
        <div className="wrap-content grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="rules-title" className="text-headline">
              How it’s calculated
            </h2>
            <div className="prose-le">{rules}</div>
            <p className="mt-6 text-[0.875rem] text-ink-3">
              Sources:{' '}
              {sources.map((s, i) => (
                <span key={s.href}>
                  {i > 0 && ' · '}
                  <a href={s.href} rel="noopener">
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
            <Fine className="mt-3">
              General information for Ontario, reviewed {site.lastReviewedLabel}. Not legal advice; confirm with Tribunals Ontario or a
              licensed paralegal before you serve.
            </Fine>
          </div>
          <aside className="h-fit rounded-4xl bg-brand-ink p-8 text-white" aria-labelledby="automate-title">
            <Sparkles className="h-6 w-6 text-brand-glow" aria-hidden />
            <h2 id="automate-title" className="mt-4 text-title !text-white">
              {automate.title}
            </h2>
            <p className="mt-3 text-white/70">{automate.body}</p>
            <a href={site.app.signup} className="btn-light mt-6">
              Start free
            </a>
            <a href={url(automate.href)} className="link-more-dark mt-4 block">
              {automate.link}
            </a>
          </aside>
        </div>
      </Section>

      <Section tight labelledBy="tfaq-title">
        <div className="wrap-content">
          <h2 id="tfaq-title" className="text-headline">
            Common questions
          </h2>
          <FAQList className="mt-8" items={faqs} />
        </div>
      </Section>

      <MoreTools />
      <CTABand />
    </>
  )
}

function MoreTools() {
  const tools = [
    { href: url('tools/n4-date-calculator/'), icon: Calculator, t: 'N4 termination date' },
    { href: url('tools/rent-increase-calculator/'), icon: PiggyBank, t: 'Rent increase' },
    { href: url('tools/rent-deposit-interest-calculator/'), icon: Landmark, t: 'Deposit interest' },
    { href: url('guides/'), icon: BookOpen, t: 'Ontario landlord guides' },
  ]
  return (
    <Section tone="alt" tight labelledBy="more-tools">
      <div className="wrap-content">
        <h2 id="more-tools" className="text-headline">
          More free tools
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((x) => (
            <a key={x.t} href={x.href} className="group flex items-center gap-3 rounded-3xl bg-white p-5 text-ink shadow-card hover:no-underline">
              <x.icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
              <span className="flex-1 font-semibold">{x.t}</span>
              <ArrowRight className="h-4 w-4 text-ink-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ---- N4 -------------------------------------------------------------------- */

export function N4Tool() {
  return (
    <ToolShell
      eyebrow="Free tool · Updated for Bill 60"
      title="N4 termination date calculator"
      lead="Pick the day you’ll give the notice and how you’ll deliver it. The calculator applies the 7-day rule in force since September 21, 2026."
      rules={
        <>
          <p>
            For an N4 given on or after September 21, 2026, the termination date must be at least <strong>7 days</strong> after you
            give the notice. Don’t count the day you give it.
          </p>
          <ul>
            <li>
              <strong>In person, mailbox or under the door:</strong> the notice is given that day.
            </li>
            <li>
              <strong>Courier:</strong> add one business day for delivery.
            </li>
            <li>
              <strong>Mail or Xpresspost:</strong> add five days for delivery.
            </li>
          </ul>
          <p>
            The tenant can void the notice by paying everything owing by the termination date. If they don’t, the earliest day to file
            an L1 is the day after the termination date. Notices given before September 21, 2026 used the old 14-day minimum.
          </p>
        </>
      }
      sources={[
        { label: 'LTB N4 instructions', href: site.official.n4Instructions },
        { label: 'Tribunals Ontario, Sept. 21, 2026 update', href: site.official.bill60Update },
      ]}
      faqs={n4Faqs}
      automate={{
        title: 'Let the N4 fill itself.',
        body: 'LandlordEzy builds the N4 from your rent ledger, with the arrears, this date and the Certificate of Service, in about 60 seconds.',
        href: 'notices/',
        link: 'See how notices work',
      }}
    >
      <N4Form />
    </ToolShell>
  )
}

/* ---- Rent increase --------------------------------------------------------- */

export function RentTool() {
  return (
    <ToolShell
      eyebrow="Free tool · 2026 and 2027 guidelines"
      title="Ontario rent increase calculator"
      lead="Enter the current rent and the date of the last increase. You’ll get the maximum new rent, the earliest date it can take effect, and the day to serve your N1 by."
      rules={
        <>
          <p>An Ontario rent increase has to clear three rules:</p>
          <ul>
            <li>
              <strong>12 months</strong> since the last increase, or since the tenancy began.
            </li>
            <li>
              <strong>90 days’ written notice</strong> on the LTB’s Form N1. If you mail it, it counts as given five days after
              mailing.
            </li>
            <li>
              <strong>The guideline</strong> for the year the increase takes effect: <strong>2.1% in 2026</strong> and{' '}
              <strong>1.9% in 2027</strong>, unless the unit is exempt.
            </li>
          </ul>
          <p>Units first occupied as residential units after November 15, 2018 are exempt from the guideline, but not from the notice and timing rules.</p>
        </>
      }
      sources={[
        { label: 'Ontario.ca: residential rent increases', href: site.official.rentIncreases },
        { label: 'Residential Tenancies Act, ss. 116 and 119', href: site.official.rta },
      ]}
      faqs={rentFaqs}
      automate={{
        title: 'Raise the rent once. Let it apply itself.',
        body: 'The automated N1 fills in the guideline and the earliest date, e-signs and serves the notice, then updates the ledger on the effective date.',
        href: 'notices/',
        link: 'See the automated N1',
      }}
    >
      <RentForm />
    </ToolShell>
  )
}

/* ---- Last month's rent interest ------------------------------------------- */

export function LmrTool() {
  return (
    <ToolShell
      eyebrow="Free tool · Last month’s rent"
      title="Rent deposit interest calculator"
      lead="Work out the interest you owe on a last month’s rent deposit this year, and how much of it can top the deposit up after a rent increase."
      rules={
        <>
          <p>
            Each year, a landlord owes interest on a rent deposit at the <strong>rent increase guideline</strong> in effect when the
            payment is due: <strong>2.1% in 2026</strong> and <strong>1.9% in 2027</strong>.
          </p>
          <p>
            When the rent has gone up, the landlord can keep that interest to top the deposit up toward the new rent, and can require
            the tenant to pay the rest of the difference. If interest is owed and not paid, the tenant can deduct it from rent.
          </p>
        </>
      }
      sources={[{ label: 'Residential Tenancies Act, s. 106', href: site.official.rta }]}
      faqs={lmrFaqs}
      automate={{
        title: 'Top-ups, scheduled for you.',
        body: 'When an N1 takes effect, LandlordEzy can schedule the last-month’s-rent top-up to come due with the new rent.',
        href: 'notices/',
        link: 'See the automated N1',
      }}
    >
      <LmrForm />
    </ToolShell>
  )
}

/* ---- Hub --------------------------------------------------------------------- */

export function ToolsHub() {
  const tools = [
    { href: 'tools/n4-date-calculator/', icon: Calculator, t: 'N4 termination date calculator', d: 'The 7-day rule since Bill 60, with courier and mail days added, and the first day to file an L1.' },
    { href: 'tools/rent-increase-calculator/', icon: PiggyBank, t: 'Rent increase calculator', d: 'Maximum new rent under the 2026 and 2027 guidelines, the earliest effective date and the serve-by date.' },
    { href: 'tools/rent-deposit-interest-calculator/', icon: Landmark, t: 'Deposit interest calculator', d: 'Annual interest on a last month’s rent deposit, and how much can top it up after an increase.' },
  ]
  const more = [
    { href: site.app.signMaker, icon: ScanLine, t: 'For-rent sign maker', d: 'A printable yard sign with a QR code to your listing.' },
    { href: site.app.forms, icon: FileText, t: 'Ontario forms library', d: 'Official LTB forms and the Standard Lease, explained.' },
    { href: site.app.askEzy, icon: Sparkles, t: 'Ask Ezy', d: 'Ontario landlord-tenant questions, answered with sources.' },
    { href: site.app.lawLibrary, icon: BookOpen, t: 'RTA in plain English', d: 'Every section of the Residential Tenancies Act, searchable.' },
  ]
  return (
    <>
      <section data-hero className="bg-white pb-6 pt-10 sm:pt-14">
        <div className="wrap-content">
          <p className="eyebrow">Free tools</p>
          <h1 className="mt-3 max-w-[20ch] text-display-lg">Free calculators for Ontario landlords.</h1>
          <p className="mt-5 max-w-[40rem] text-lead text-ink-3">
            Built on the official rules, updated for Bill 60 and the 2027 guideline. No account needed.
          </p>
        </div>
      </section>
      <Section tight labelledBy="calc-title">
        <div className="wrap-content">
          <h2 id="calc-title" className="sr-only">
            Calculators
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {tools.map((x) => (
              <a key={x.t} href={url(x.href)} className="tile group flex flex-col p-8 text-ink hover:no-underline" data-reveal>
                <span className="icon-badge">
                  <x.icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-6 text-title">{x.t}</h3>
                <p className="mt-2 text-ink-3">{x.d}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-brand-text">
                  Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="alt" tight labelledBy="more-title">
        <div className="wrap-content">
          <Heading id="more-title" title="More free help" size="md" align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {more.map((x) => (
              <a key={x.t} href={x.href} rel="noopener" className="flex gap-4 rounded-3xl bg-white p-6 text-ink shadow-card hover:no-underline">
                <x.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
                <span>
                  <span className="block font-semibold">{x.t}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-3">{x.d}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
