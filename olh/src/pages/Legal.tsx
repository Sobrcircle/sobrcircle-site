import { ArrowDown, CalendarCheck, Check, ChevronDown, FileWarning, Gavel, Handshake, ShieldCheck, Siren, UserCheck } from 'lucide-react'
import { site, url } from '../site'
import { Actions, CTABand, FAQList, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { LegalRates } from '../components/olh'
import { CaseTrack } from '../components/mocks/olh'
import { legalFaqs } from '../content/faqs'
import { guaranteeFacts } from '../content/scope'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'compare', label: 'Shield vs Guarantee' },
  { id: 'guarantee', label: 'Legal Guarantee' },
  { id: 'member', label: 'Member case' },
  { id: 'example', label: 'A 12-month example' },
  { id: 'eviction', label: 'Problem already?' },
  { id: 'faq', label: 'Questions' },
]

/** One condo, 12 months, one qualifying new non-payment case (Paul's worked example). */
const example = [
  { plan: 'Landlord Shield', fees: 588, legal: 995, total: 1583, note: 'You manage the tenancy yourself.' },
  { plan: 'Property Management + Legal Guarantee', fees: 1788, legal: 0, total: 1788, note: 'Case fee included; eligible new matters still covered afterwards.', hi: true },
  { plan: 'Property Management', fees: 1188, legal: 995, total: 2183, note: 'Plus the member case.' },
]

export function Legal() {
  const max = Math.max(...example.map((e) => e.total))
  return (
    <>
      <ChapterNav title="Legal help" chapters={chapters} cta={{ label: 'Talk to us', href: site.live.book }} />

      {/* ---- Hero: three doors ------------------------------------------- */}
      <section id="overview" data-hero aria-labelledby="legal-h1" className="bg-white pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="wrap">
          <Heading
            as="h1"
            id="legal-h1"
            size="xl"
            eyebrow="Legal help on the same team"
            title="Licensed paralegals, before you need them."
            lead="Landlord Pro Legal Services is part of the OLH group. How much legal help is arranged in advance depends on your plan, and on whether the problem has already started."
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-3 md:grid-cols-3">
            {[
              { href: '#compare', Icon: UserCheck, t: 'On Shield or Management', b: 'A paralegal every month, and a member case from $995.', track: 'legal:door-member' },
              { href: '#guarantee', Icon: ShieldCheck, t: 'Arranged in advance', b: 'The Legal Guarantee: eligible new LTB work, all enrolled units.', track: 'legal:door-guarantee', hi: true },
              { href: '#eviction', Icon: Siren, t: 'A problem right now', b: 'Standalone eviction help from $1,495, scoped up front.', track: 'legal:door-now' },
            ].map(({ href, Icon, t, b, track, hi }) => (
              <a key={t} href={href} className={`spot group flex flex-col rounded-4xl p-6 text-ink hover:no-underline ${hi ? 'tile-dark bg-brand-ink text-white' : 'bg-canvas-alt'}`} data-track={track}>
                <Icon className={`h-6 w-6 ${hi ? 'text-brand-glow' : 'text-brand'}`} strokeWidth={1.8} aria-hidden />
                <span className={`mt-4 block font-display text-[1.25rem] font-semibold tracking-[-0.015em] ${hi ? 'text-white' : ''}`}>{t}</span>
                <span className={`mt-1 block text-[0.9375rem] ${hi ? 'text-white/70' : 'text-ink-3'}`}>{b}</span>
                <ArrowDown className={`mt-5 h-5 w-5 transition-transform group-hover:translate-y-0.5 ${hi ? 'text-brand-glow' : 'text-brand'}`} aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Compare ------------------------------------------------------------ */}
      <Section id="compare" tone="alt" labelledBy="compare-title">
        <div className="wrap">
          <Heading
            id="compare-title"
            eyebrow="Shield vs Legal Guarantee"
            title="Member legal access, or the Legal Guarantee."
            lead="Landlord Shield and Property Management include advice every month and a member price for a qualifying new case. Property Management + Legal Guarantee adds eligible new LTB case work with no activation fee."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-5 lg:grid-cols-2">
            <div className="tile-white flex flex-col p-7 sm:p-9" data-reveal>
              <p className="text-[0.8125rem] font-semibold text-ink-3">Landlord Shield and Property Management</p>
              <h3 className="mt-2 text-headline">Member legal access</h3>
              <p className="mt-2 font-display text-[1.375rem] font-semibold tabular-nums">
                Member case from $995 <span className="text-[0.875rem] font-medium text-ink-3">+ HST and disbursements</span>
              </p>
              <dl className="mt-6 space-y-5 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold text-ink">Every month</dt>
                  <dd className="mt-1 text-ink-3">One 15-minute consultation per owner account with a licensed paralegal, by appointment, about your enrolled Ontario tenancies. Advice, not representation. Unused time doesn’t carry over.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">When you need it</dt>
                  <dd className="mt-1 text-ink-3">One qualifying ordinary non-payment (L1) case through one hearing: preparation, the application, settlement efforts and representation. Standard price for the same scope: from $1,495.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">When the member price applies</dt>
                  <dd className="mt-1 text-ink-3">For a new problem that first arises after the unit is enrolled. No waiting period. One member case per owner account in any rolling 12 months.</dd>
                </div>
              </dl>
            </div>
            <div className="tile-dark flex flex-col p-7 sm:p-9" data-reveal>
              <div className="glow-blue pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60" aria-hidden />
              <div className="relative">
                <p className="text-[0.8125rem] font-semibold text-white/60">Property Management + Legal Guarantee</p>
                <h3 className="mt-2 text-headline !text-white">Legal Guarantee</h3>
                <p className="mt-2 font-display text-[1.375rem] font-semibold text-white">
                  Included <span className="text-[0.875rem] font-medium text-white/60">no activation fee</span>
                </p>
                <p className="mt-6 text-[0.9375rem] text-white/75">
                  Professional work on eligible new LTB matters across all enrolled units while you’re enrolled: notices, applications
                  including L1, evidence, settlement, hearing representation and order review. No one-case limit, and no member case fee.
                  Covered work isn’t limited to the monthly consultation. External costs are extra.
                </p>
                <a href="#guarantee" className="link-more-dark mt-6">
                  How the Legal Guarantee works
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-[64rem] overflow-hidden rounded-4xl bg-white shadow-card" data-reveal>
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Legal price comparison">
              <table className="w-full min-w-[34rem] text-left text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-line text-[0.8125rem] text-ink-3">
                    <th className="px-6 py-4 font-semibold">You are</th>
                    <th className="px-6 py-4 font-semibold">What’s covered</th>
                    <th className="px-6 py-4 text-right font-semibold">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['On Property Management + Legal Guarantee', 'Eligible new LTB matters across all enrolled units, while enrolled', 'Included', true],
                    ['A Landlord Shield or Property Management member', 'One new non-payment case per owner account in any rolling 12 months, for problems arising after enrollment', 'From $995', false],
                    ['Not a member, or the problem began before enrollment', 'The same ordinary non-payment scope', 'From $1,495', false],
                  ].map(([who, what, price, hi]) => (
                    <tr key={String(who)} className={`border-b border-line-soft last:border-0 ${hi ? 'bg-brand-soft/50' : ''}`}>
                      <td className="px-6 py-4 font-semibold text-ink">{who}</td>
                      <td className="px-6 py-4 text-ink-3">{what}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-display text-[1.0625rem] font-semibold tabular-nums">{price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Fine className="mx-auto mt-4 max-w-[64rem] text-center">
            Professional fees, plus HST. LTB filing fees, sheriff, process servers and approved outside costs are extra. No result or
            timeline is guaranteed, and nothing here is rent reimbursement.
          </Fine>
        </div>
      </Section>

      {/* ---- Legal Guarantee (dark) ------------------------------------------ */}
      <section id="guarantee" aria-labelledby="guarantee-title" className="relative overflow-hidden bg-brand-ink py-20 text-white sm:py-28">
        <div className="glow-blue pointer-events-none absolute -right-40 -top-20 h-[40rem] w-[40rem] opacity-60" aria-hidden />
        <div className="wrap relative">
          <div className="mx-auto max-w-[46rem] text-center" data-reveal>
            <p className="eyebrow-dark">The Legal Guarantee</p>
            <h2 id="guarantee-title" className="mt-3 text-display-lg !text-white">
              Every enrolled unit. Not one chosen unit.
            </h2>
            <p className="mx-auto mt-5 max-w-[38rem] text-lead text-white/70">
              Our licensed paralegal team’s professional work on eligible new Landlord and Tenant Board matters that arise in managed
              tenancies after enrolment. No hidden one-case-at-a-time limit. You approve the steps. We do the work.
            </p>
          </div>
          <CaseTrack className="m-snap mx-auto mt-12 max-w-[64rem]" />
          <div className="mx-auto mt-12 grid max-w-[64rem] gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <dl className="m-snap grid gap-3 md:grid-cols-2">
              {guaranteeFacts.map(([k, v]) => (
                <div key={k} className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                  <dt className="font-semibold text-white">{k}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-white/70">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3 className="font-display text-[1.25rem] font-semibold text-white">Progressive legal rates</h3>
              <div className="mt-4">
                <LegalRates dark />
              </div>
              <p className="mt-6 text-[0.9375rem] text-white/70">
                <strong className="font-semibold text-white">Existing disputes.</strong> A dispute you already know about isn’t absorbed
                by enrolling or upgrading after it starts; it’s a separate engagement. If you’re already covered when a new matter arises,
                there’s no extra existing-case fee.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-[50rem] text-center text-[0.8125rem] text-white/55">
            Legal services are provided by Landlord Pro Legal Services under a separate written engagement. Representation is arranged
            under that engagement.
          </p>
        </div>
      </section>

      {/* ---- Member case ------------------------------------------------------------ */}
      <Section id="member" labelledBy="member-title">
        <div className="wrap">
          <Heading id="member-title" eyebrow="On a member plan" title="If a new problem starts." size="md" />
          <ol className="steprow no-scrollbar mt-10 md:mt-12">
            {[
              { Icon: CalendarCheck, t: 'Join before trouble', b: 'Each enrolled unit has its own enrollment date. No waiting period. Tell us about any existing issues when you join.' },
              { Icon: FileWarning, t: 'A new problem starts', b: 'Rent is first missed after the unit’s enrollment date. Call or book with our team.' },
              { Icon: Handshake, t: 'Eligibility and engagement', b: 'We confirm eligibility, run a conflict check and send a written engagement with Landlord Pro Legal Services.' },
              { Icon: Gavel, t: 'We handle the case', b: 'You pay the member case fee and stay on your plan throughout. When the case work ends, nothing changes back.' },
            ].map(({ Icon, t, b }, idx) => (
              <li key={t} className="steprow-item spot !bg-canvas-alt !shadow-none" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                </span>
                <h3 className="mt-5 text-title">{t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ol>
          <details className="fold mx-auto mt-8 max-w-[68rem]">
            <summary className="fold-head !flex">
              Who qualifies for the member case rate
              <ChevronDown className="fold-icon h-4 w-4" aria-hidden />
            </summary>
            <ul className="space-y-3 px-1 pt-5 text-[0.9375rem] text-ink-2">
              {[
                'The facts behind the problem first arise after the affected unit’s enrollment date (the date your paid Shield or Management membership is accepted with that unit enrolled) and membership has been continuous since. Each unit has its own date.',
                'An older problem can’t qualify later: a new notice, a filing date, waiting, or leaving and rejoining doesn’t change when it started.',
                'When the unit was enrolled there were no existing arrears or related dispute, as disclosed at joining.',
                'One member case per owner account in any rolling 12 months, measured from the start of the previous accepted member case. The clock follows the owner account: cancelling, rejoining or adding units never resets it.',
                'After a gap in membership, a unit’s date is its new accepted enrollment; moving between our plans while continuously enrolled doesn’t change it.',
                'A problem that began before the unit’s enrollment date is quoted at the standard rate (from $1,495).',
                'Legal Guarantee matters are covered from your accepted service start; they never use up or trigger the member case.',
                'Every case is subject to an eligibility check, a conflict check and a separate written engagement before work starts. The member case is a paid, fixed-scope engagement, not a temporary Legal Guarantee.',
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </Section>

      {/* ---- Worked example ---------------------------------------------------- */}
      <Section id="example" tone="alt" labelledBy="example-title">
        <div className="wrap">
          <Heading
            id="example-title"
            eyebrow="A worked example"
            title="One condo. Twelve months. One new non-payment case."
            lead="Paying when you need it, or having it arranged in advance. Here’s what each plan costs over a year with one qualifying case."
            size="md"
          />
          <figure className="play mx-auto mt-12 max-w-[56rem] rounded-4xl bg-white p-6 shadow-card sm:p-9" data-play>
            <figcaption className="sr-only">Twelve-month cost with one qualifying new non-payment case, by plan</figcaption>
            <ul className="space-y-7">
              {example.map((e, idx) => (
                <li key={e.plan}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-semibold text-ink">{e.plan}</span>
                    <span className="font-display text-[1.5rem] font-bold tracking-[-0.02em] tabular-nums">${e.total.toLocaleString('en-CA')}</span>
                  </div>
                  <div className="mt-2.5 flex h-3.5 overflow-hidden rounded-full bg-canvas-alt" aria-hidden="true">
                    <span className={e.hi ? 'bg-brand' : 'bg-ink-2'} data-fill style={{ width: `${(e.fees / max) * 100}%`, ['--i' as string]: String(idx * 0.5) }} />
                    {e.legal > 0 && <span className="ml-0.5 bg-warn" data-fill style={{ width: `${(e.legal / max) * 100}%`, ['--i' as string]: String(idx * 0.5 + 0.9) }} />}
                  </div>
                  <p className="mt-2 text-[0.875rem] text-ink-3">
                    ${e.fees.toLocaleString('en-CA')} in monthly fees{e.legal ? ` + $${e.legal} member case` : ''}. {e.note}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line-soft pt-5 text-[0.8125rem] text-ink-3" aria-hidden="true">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ink-2" /> Monthly fees
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand" /> Monthly fees, case work included
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-warn" /> Member case fee
              </span>
            </div>
          </figure>
          <p className="mx-auto mt-8 max-w-[56rem] text-ink-2">
            Comparing like with like, Property Management + Legal Guarantee costs less than Property Management plus a member case here,
            and keeps covering eligible new matters. Landlord Shield costs less again, because you manage the tenancy yourself.
          </p>
          <Fine className="mx-auto mt-4 max-w-[56rem]">
            With no case, or a larger portfolio, the numbers change. The example uses the listed rates with no discounts and assumes the
            problem arises after the unit is enrolled. All amounts plus HST; disbursements and external costs extra; no timeline is
            promised. Proposed packages for review; final eligibility, scope, fees and terms will be confirmed before launch.
          </Fine>
        </div>
      </Section>

      {/* ---- Eviction help ---------------------------------------------------------- */}
      <Section id="eviction" labelledBy="eviction-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-center gap-10 rounded-5xl bg-canvas-alt p-7 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">Already have a tenant problem?</p>
              <h2 id="eviction-title" className="mt-3 text-display-md">
                Standalone eviction help, scoped up front.
              </h2>
              <p className="mt-5 text-ink-2">
                For an ordinary non-payment matter: preparation, the application, settlement efforts and representation through one
                hearing. Further hearings, complex matters and enforcement are quoted before work begins. This isn’t an unlimited eviction
                package.
              </p>
              <p className="mt-4 text-[0.9375rem] text-ink-3">
                Already a Shield or Management member, and the problem started after the unit was enrolled? You may qualify for the
                member case rate from $995 instead. You can still join any plan for the future; the existing case stays separate.
              </p>
            </div>
            <div className="rounded-4xl bg-white p-7 text-center shadow-card">
              <p className="text-[0.875rem] font-medium text-ink-3">From</p>
              <p className="mt-1 font-display text-[3.25rem] font-bold leading-none tracking-[-0.04em] tabular-nums">$1,495</p>
              <p className="mt-2 text-[0.875rem] text-ink-3">+ HST and disbursements</p>
              <div className="mt-6">
                <Actions primary={{ label: 'Talk to a paralegal', href: site.live.book }} note={<>Or call or text <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a></>} />
              </div>
            </div>
          </div>
          <ul className="mx-auto mt-8 flex max-w-[64rem] flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9375rem]">
            <li><a href={site.live.howToEvict}>How to evict a tenant in Ontario</a></li>
            <li><a href={site.live.evictionTime}>How long an eviction takes</a></li>
            <li><a href={site.live.ltbForms}>LTB forms</a></li>
            <li><a href={site.live.hearingLinks}>LTB hearing links</a></li>
          </ul>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Legal questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={legalFaqs} />
          <a href={url('pricing/')} className="link-more mt-8">
            See every plan’s price
          </a>
        </div>
      </Section>

      <CTABand title="Tenant problem right now?" lead="Talk to our licensed paralegal team about notices, applications and hearings. No obligation." primary={{ label: 'Book a 15-minute call', href: site.live.book }} />
    </>
  )
}
