/**
 * The detail sheets: Paul's full wording for each topic, opened over the page
 * from a "+" card or a "Full scope" button. Each one ends with a link to the
 * page that covers the topic in full.
 */
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { site, url } from '../site'
import { Sheet, SheetTile } from './interact'
import { LegalRates } from './olh'
import {
  guaranteeFacts,
  guaranteeIncluded,
  managementIncluded,
  n4Steps,
  notInAnyPlan,
  rentSteps,
  reportingSteps,
  shieldIncluded,
  shieldYours,
  suite,
  suiteFinePrint,
  visitPrices,
} from '../content/scope'

function Numbered({ steps }: { steps: { t: string; b: string }[] }) {
  return (
    <ol className="mt-6 space-y-5">
      {steps.map((s, idx) => (
        <li key={s.t} className="flex gap-4">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-[0.875rem] font-semibold text-white">{idx + 1}</span>
          <span>
            <span className="block font-display text-[1.125rem] font-semibold tracking-[-0.01em] text-ink">{s.t}</span>
            <span className="mt-0.5 block text-[0.9375rem] text-ink-3">{s.b}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function Ticks({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-5 space-y-3 text-[0.9375rem]">
      {items.map((t, idx) => (
        <li key={idx} className="flex gap-3">
          <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
          <span className="text-ink-2">{t}</span>
        </li>
      ))}
    </ul>
  )
}

const pairs = (list: [string, string][]) =>
  list.map(([b, t]) => (
    <>
      <strong className="font-semibold text-ink">{b}</strong>, {t}
    </>
  ))

function Small({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-4">{children}</p>
}

/* ---- Highlights ------------------------------------------------------------ */
export function N4Sheet() {
  return (
    <Sheet id="sheet-n4" eyebrow="Included with OLH Landlord Shield" title="From missed rent to a served N4." more={{ label: 'N4 and N1 on Landlord Shield', href: url('landlord-shield/#n4') }}>
      <SheetTile lead="In your own account." className="mt-7">
        LandlordEzy fills the official N4 from your rent ledger and works out the arrears, so you can prepare one in around 60 seconds
        when your ledger is accurate. You review it, sign it and serve it. No OLH drafting fee for notices you prepare yourself.
      </SheetTile>
      <Numbered steps={n4Steps} />
      <SheetTile lead="Also included: the N1 rent increase." className="mt-7">
        The new rent and earliest legal effective date are pre-filled. You e-sign and serve, and the increase applies to your rent ledger
        on its effective date.
      </SheetTile>
      <Small>
        LandlordEzy is software: it doesn’t guarantee a notice is valid, serve paper notices for you or file at the LTB, and no eviction
        timeline is promised. Professional review, service or representation is a separate paid service.
      </Small>
    </Sheet>
  )
}

export function LedgerSheet() {
  return (
    <Sheet id="sheet-ledger" eyebrow="Every plan" title="Paid to your bank. Checked by our team." more={{ label: 'How your rent is handled', href: url('landlord-shield/#rent') }}>
      <SheetTile lead="A person looks at your books every month." className="mt-7">
        Rent goes straight into your own account. The software matches each payment, and our team checks the records and sends your
        statement.
      </SheetTile>
      <Numbered steps={rentSteps} />
    </Sheet>
  )
}

export function ParalegalSheet() {
  return (
    <Sheet id="sheet-paralegal" eyebrow="Landlord Shield and Property Management" title="A paralegal to talk to, every month." more={{ label: 'Shield vs Legal Guarantee', href: url('legal/#compare') }}>
      <SheetTile lead="Member legal access." className="mt-7">
        Advice every month, and case representation at a member price for a qualifying new problem. It isn’t a separate plan.
      </SheetTile>
      <dl className="mt-7 space-y-5 text-[0.9375rem]">
        <div>
          <dt className="font-semibold text-ink">Every month</dt>
          <dd className="mt-1 text-ink-3">
            One 15-minute consultation per owner account with a licensed paralegal, by appointment during business hours, about your
            enrolled Ontario tenancies. Advice, not representation. Unused time doesn’t carry over.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">When you need it</dt>
          <dd className="mt-1 text-ink-3">
            One qualifying ordinary non-payment (L1) case through one hearing, from $995 + HST and disbursements. The standard price for
            the same scope is from $1,495.
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">When the member price applies</dt>
          <dd className="mt-1 text-ink-3">
            For a new problem that first arises after the unit is enrolled. No waiting period. One member case per owner account in any
            rolling 12 months.
          </dd>
        </div>
      </dl>
      <Small>Subject to an eligibility check, a conflict check and a separate written engagement with Landlord Pro Legal Services.</Small>
    </Sheet>
  )
}

export function GuaranteeSheet() {
  return (
    <Sheet id="sheet-guarantee" eyebrow="The Legal Guarantee" title="Every enrolled unit. Not one chosen unit." more={{ label: 'How the Legal Guarantee works', href: url('legal/#guarantee') }}>
      <SheetTile lead="You approve the steps. We do the work." className="mt-7">
        Landlord Pro Legal Services, our licensed paralegal team, handles eligible new Landlord and Tenant Board matters for every enrolled
        unit, with no activation fee and no one-case limit.
      </SheetTile>
      <dl className="mt-7 grid gap-3 sm:grid-cols-2">
        {guaranteeFacts.map(([k, v]) => (
          <div key={k} className="rounded-3xl border border-line-soft p-5">
            <dt className="font-semibold text-ink">{k}</dt>
            <dd className="mt-1 text-[0.9375rem] text-ink-3">{v}</dd>
          </div>
        ))}
      </dl>
      <h3 className="mt-8 font-display text-[1.125rem] font-semibold">What it adds to Property Management</h3>
      <div className="mt-3">
        <LegalRates flat />
      </div>
      <Small>
        A dispute that started before you enrolled isn’t absorbed by enrolling or upgrading. Legal work is under a separate written
        engagement with Landlord Pro Legal Services.
      </Small>
    </Sheet>
  )
}

export function ReportingSheet() {
  return (
    <Sheet id="sheet-reporting" eyebrow="Included with OLH Landlord Shield" title="Rent reporting to Equifax, every month." more={{ label: 'Rent reporting on Landlord Shield', href: url('landlord-shield/#reporting') }}>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <SheetTile lead="Paying on time.">Positive reporting can help a tenant build credit history. It may need the tenant’s consent, which LandlordEzy requests for you.</SheetTile>
        <SheetTile lead="Rent unpaid.">Arrears may be reported as a delinquency where permitted, subject to the program’s accuracy, verification and consent rules.</SheetTile>
      </div>
      <Numbered steps={reportingSteps} />
      <Small>
        Reporting doesn’t guarantee payment or any change to a credit score, and it doesn’t replace an N4 or resolve an eviction. Equifax
        credit reports for screening cost from $29.99 each and aren’t included.
      </Small>
    </Sheet>
  )
}

export function VisitsSheet() {
  return (
    <Sheet id="sheet-visits" eyebrow="Local attendance" title="Local visits when you need them." more={{ label: 'Visit prices and Planned Local Care', href: url('pricing/#visits') }}>
      <SheetTile lead="Booked separately from your monthly plan." className="mt-7">
        A set per-visit price, subject to availability, and confirmed with you before anyone attends.
      </SheetTile>
      <ul className="mt-7 divide-y divide-line-soft border-y border-line-soft">
        {visitPrices.map((v) => (
          <li key={v.t} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="w-[11rem] shrink-0 font-display text-[1.625rem] font-bold tracking-[-0.03em] tabular-nums">
              {v.price} <span className="text-[0.8125rem] font-medium tracking-normal text-ink-3">{v.unit}</span>
            </p>
            <p className="text-[0.9375rem] text-ink-3">
              <strong className="font-semibold text-ink">{v.t}.</strong> {v.b}
            </p>
          </li>
        ))}
      </ul>
      <Small>
        Repairs, technical assessments and unusual travel are agreed separately before work starts. Tenant entry follows Ontario’s notice
        rules. Visit prices are proposed and confirmed in writing before booking.
      </Small>
    </Sheet>
  )
}

export function SuiteSheet() {
  return (
    <Sheet id="sheet-suite" eyebrow="The LandlordEzy Automation Suite" title="Everything, in your own account." more={{ label: 'Explore the whole suite', href: url('landlord-shield/#suite') }}>
      <SheetTile lead="Software we built and own." className="mt-7">
        Run rent, notices, screening, leases, inspections, maintenance and messages yourself, with our team checking your rent ledger every
        month. No separate software bill.
      </SheetTile>
      <div className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
        {suite.map((g) => (
          <div key={g.key}>
            <h3 className="flex items-center gap-2.5 font-display text-[1.0625rem] font-semibold">
              <g.Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden /> {g.title}
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-[0.9375rem] text-ink-3">
              {g.items.map((it) => (
                <li key={it.t}>{it.t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Small>{suiteFinePrint}</Small>
    </Sheet>
  )
}

/** The seven sheets behind the home page's highlight cards. */
export function HighlightSheets() {
  return (
    <>
      <N4Sheet />
      <LedgerSheet />
      <ParalegalSheet />
      <GuaranteeSheet />
      <ReportingSheet />
      <VisitsSheet />
      <SuiteSheet />
    </>
  )
}

/* ---- Full scope of each plan ---------------------------------------------- */
export function ScopeSheets() {
  return (
    <>
      <Sheet id="scope-shield" eyebrow="OLH Landlord Shield · from $49 a month" title="Full scope: you manage, we back you up." more={{ label: 'Everything about Landlord Shield', href: url('landlord-shield/') }}>
        <h3 className="mt-8 font-display text-[1.125rem] font-semibold">Included</h3>
        <Ticks items={shieldIncluded} />
        <h3 className="mt-8 font-display text-[1.125rem] font-semibold">Yours to handle, or quoted</h3>
        <ul className="mt-4 space-y-3 text-[0.9375rem] text-ink-3">
          {shieldYours.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-4" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <SheetTile lead="Month-to-month from the start." className="mt-7">
          Cancel before your next monthly renewal and it ends at the end of the month you’ve paid for. Your LandlordEzy account and
          records stay yours.
        </SheetTile>
      </Sheet>

      <Sheet id="scope-management" eyebrow="Property Management · from $99 a month" title="Full scope: we run the day-to-day." more={{ label: 'Price it for your portfolio', href: url('pricing/') }}>
        <SheetTile lead="Day-to-day management by our Ontario team," className="mt-7">
          documented in LandlordEzy, with your own owner portal.
        </SheetTile>
        <Ticks items={pairs(managementIncluded)} />
        <SheetTile lead="Not in any plan." className="mt-7">
          {notInAnyPlan}
        </SheetTile>
        <Small>A 90-day initial service period, then month-to-month; either side can end with 30 calendar days’ written notice.</Small>
      </Sheet>

      <Sheet id="scope-guarantee" eyebrow="Property Management + Legal Guarantee · from $149 a month" title="Full scope: managed, with LTB work arranged." more={{ label: 'How the Legal Guarantee works', href: url('legal/#guarantee') }}>
        <SheetTile lead="Everything in Property Management," className="mt-7">
          plus professional legal work on eligible new LTB matters for all enrolled units.
        </SheetTile>
        <Ticks items={pairs(guaranteeIncluded)} />
        <h3 className="mt-8 font-display text-[1.125rem] font-semibold">What the Legal Guarantee adds</h3>
        <div className="mt-3">
          <LegalRates flat />
        </div>
        <Small>
          Not rent reimbursement or a guaranteed result or timeline. LTB filing fees, sheriff, process servers and approved outside costs
          are extra. Legal services are provided by Landlord Pro Legal Services under a separate written engagement. Questions? Call or
          text <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>.
        </Small>
      </Sheet>
    </>
  )
}
