/**
 * OLH building blocks shared by several pages: the three plan cards, the
 * portfolio calculator, the rentals strip, the group row and the legal rates.
 */
import { ArrowUpRight, Check, Minus, Plus, Scale, Building2, MonitorSmartphone, Users } from 'lucide-react'
import { site, url } from '../site'
import { plans, tariff, type PlanKey } from '../content/pricing'
import { listings, listingCounts } from '../content/listings'

const money = (n: number) => `$${n.toLocaleString('en-CA')}`

/* ------------------------------------------------------------------------ */
/* Plan cards                                                               */
/* ------------------------------------------------------------------------ */
/**
 * The three plans side by side. `live` wires the prices to the calculator above
 * them (pricing page); otherwise they show "from" prices and link onward.
 */
export function PlanCards({ live = false, className = '' }: { live?: boolean; className?: string }) {
  return (
    <div className={`grid gap-4 lg:grid-cols-3 lg:gap-5 ${className}`}>
      {plans.map((p) => (
        <article
          key={p.key}
          className={`relative flex flex-col rounded-4xl bg-white p-7 sm:p-8 ${p.recommended ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`}
          aria-labelledby={`plan-${p.key}`}
          data-reveal
        >
          {p.recommended && (
            <p className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[0.75rem] font-semibold text-white sm:left-8">
              Recommended for self-managing owners
            </p>
          )}
          <h3 id={`plan-${p.key}`} className="text-title">
            {p.name}
          </h3>
          <p className="mt-1 text-[0.9375rem] text-ink-3">{p.who}</p>
          <p className="mt-5 flex items-baseline gap-1.5">
            {!live && <span className="text-[0.9375rem] font-medium text-ink-3">from</span>}
            <span className="font-display text-[3rem] font-bold leading-none tracking-[-0.035em] tabular-nums">
              $<span data-out={live ? p.key : undefined}>{p.from}</span>
            </span>
            <span className="text-[0.9375rem] font-medium text-ink-3">/month</span>
          </p>
          {live ? (
            <p className="mt-2 min-h-[2.75rem] text-[0.875rem] leading-snug text-ink-3">
              <span data-math={p.key}>{p.key === 'guarantee' ? '$99 management + $50 legal' : `${money(p.from)} first tenancy`}</span>
              <span className="block" data-avg={p.key} hidden />
            </p>
          ) : (
            <p className="mt-2 text-[0.875rem] text-ink-3">plus HST · {p.fromNote}</p>
          )}
          <p className="mt-5 inline-flex w-fit items-center rounded-full bg-canvas-alt px-3 py-1 text-[0.8125rem] font-medium text-ink-2">{p.term}</p>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
            {p.points.map((t) => (
              <li key={t} className="flex gap-2.5">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                <span className="text-ink-2">{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-2xl bg-brand-soft/60 px-4 py-3 text-[0.8125rem] leading-snug text-ink-2">
            <strong className="font-semibold text-ink">{p.key === 'guarantee' ? 'Legal Guarantee: ' : 'Member legal access: '}</strong>
            {p.legal}
          </p>
          <div className="mt-auto pt-6">
            <a href={url(p.href)} className="link-more" data-track={`plan:${p.key}`}>
              {p.link}
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* Portfolio calculator                                                     */
/* ------------------------------------------------------------------------ */
/**
 * Property type and number of tenancies. Prices are prerendered for one condo,
 * so the cards read correctly without JavaScript; the client script (setupCalc)
 * recomputes from the same tariff, passed in data-tariff.
 */
export function Calculator() {
  return (
    <div
      className="calc mx-auto max-w-[44rem] rounded-4xl bg-white p-6 shadow-card sm:p-8 lg:grid lg:max-w-[66rem] lg:grid-cols-[minmax(0,1.6fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:px-10 lg:py-7"
      data-calc
      data-tariff={JSON.stringify(tariff)}
    >
      <h2 id="calc-title" className="text-center font-display text-[1.25rem] font-semibold tracking-[-0.015em] lg:sr-only">
        Your portfolio
      </h2>
      <fieldset className="mt-5 lg:mt-0">
        <legend className="sr-only">Property type</legend>
        <div className="seg" role="radiogroup" aria-label="Property type">
          {(Object.keys(tariff.management) as (keyof typeof tariff.management)[]).map((k, idx) => (
            <label key={k} className="seg-option">
              <input type="radio" name="ptype" value={k} defaultChecked={idx === 0} autoComplete="off" data-cat />
              <span>
                {tariff.management[k].label}
                <span className="seg-sub">{k === 'condo' ? 'or a unit in a multiplex' : 'one tenancy'}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-7 flex items-center justify-between gap-4 lg:mt-0 lg:gap-5">
        <button type="button" className="stepper" data-step="-1" aria-label="One fewer tenancy" disabled>
          <Minus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
        </button>
        <p className="min-w-[7.5rem] text-center" aria-live="polite">
          <span className="block font-display text-[3.25rem] font-bold leading-none tracking-[-0.04em] tabular-nums lg:text-[2.75rem]" data-units-out>
            1
          </span>
          <span className="mt-1 block text-[0.875rem] leading-tight text-ink-3" data-units-word>
            tenancy
          </span>
        </p>
        <button type="button" className="stepper" data-step="1" aria-label="One more tenancy">
          <Plus className="h-5 w-5" strokeWidth={2.2} aria-hidden />
        </button>
      </div>
      <div className="mt-6 lg:mt-0">
        <label className="block">
          <span className="sr-only">Number of tenancies</span>
          <input type="range" min={tariff.min} max={tariff.max} defaultValue={1} autoComplete="off" className="range" data-units aria-valuetext="1 tenancy" />
        </label>
        <div className="mt-2 flex justify-between text-[0.75rem] text-ink-4 tabular-nums" aria-hidden="true">
          <span>1 tenancy</span>
          <span>10</span>
        </div>
      </div>
      <p className="mt-5 text-center text-[0.8125rem] leading-relaxed text-ink-3 lg:col-span-3 lg:mt-5 lg:border-t lg:border-line-soft lg:pt-4">
        Count tenancies, not addresses: a duplex is 2. The first-tenancy rate applies once per owner account, not once per city.
        Mixed types or 11+ tenancies? <a href={site.live.book}>Ask for a portfolio quote</a>.
      </p>
    </div>
  )
}

/** The breakdown under the cards, recomputed by the client script. */
export function HowCalculated() {
  return (
    <details className="fold mx-auto mt-8 max-w-[44rem]" data-calc-how>
      <summary className="fold-head !flex">
        How these totals are calculated
        <Plus className="fold-icon h-4 w-4" aria-hidden />
      </summary>
      <div className="px-1 pt-4">
        <table className="w-full text-left text-[0.9375rem]">
          <tbody data-how-body>
            <tr className="calc-grp"><td colSpan={2}>Landlord Shield</td></tr>
            <tr><td>First tenancy</td><td>$49</td></tr>
            <tr className="calc-tot"><td>Landlord Shield total</td><td>$49</td></tr>
            <tr className="calc-grp"><td colSpan={2}>Property Management</td></tr>
            <tr><td>First tenancy</td><td>$99</td></tr>
            <tr className="calc-tot"><td>Property Management total</td><td>$99</td></tr>
            <tr className="calc-grp"><td colSpan={2}>Legal Guarantee (added to Property Management)</td></tr>
            <tr><td>Unit 1 · 1 × $50</td><td>$50</td></tr>
            <tr className="calc-tot"><td>Property Management + Legal Guarantee</td><td>$149</td></tr>
          </tbody>
        </table>
        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-3">
          Landlord Shield is $49 for the first tenancy and $29 for each additional tenancy, whatever the property type. Legal rates
          are progressive: $50 for unit 1, $25 each for units 2–5 and $15 each for units 6–10. All amounts monthly, CAD, plus HST.
        </p>
      </div>
    </details>
  )
}

/* ------------------------------------------------------------------------ */
/* Rentals strip                                                            */
/* ------------------------------------------------------------------------ */
export function ListingStrip({ limit, eager = 0, className = '' }: { limit?: number; eager?: number; className?: string }) {
  const items = limit ? listings.slice(0, limit) : listings
  return (
    <div className={className} data-listings>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="segmented" role="group" aria-label="Show listings">
          {(
            [
              ['all', 'All'],
              ['rent', 'For rent'],
              ['sale', 'For sale'],
            ] as const
          ).map(([k, label], idx) => (
            <button key={k} type="button" aria-pressed={idx === 0} data-filter={k}>
              {label}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 md:flex" aria-hidden="true">
          <button type="button" className="strip-arrow" data-strip="-1" tabIndex={-1}>
            ‹
          </button>
          <button type="button" className="strip-arrow" data-strip="1" tabIndex={-1}>
            ›
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" data-listing-status />
      <ul className="strip no-scrollbar mt-5" data-strip-track tabIndex={0} aria-label="Available properties">
        {items.map((l, idx) => (
          <li key={l.href} className="strip-item" data-kind={l.kind}>
            <a href={l.href} className="lcard" data-track="listing">
              <span className="lcard-img">
                <img src={url(`img/listings/${l.img}.webp`)} alt="" width={720} height={540} loading={idx < eager ? 'eager' : 'lazy'} decoding="async" />
                <span className={`lcard-badge ${l.kind === 'sale' ? 'is-sale' : ''}`}>{l.kind === 'sale' ? 'For sale' : 'For rent'}</span>
              </span>
              <span className="block p-4">
                <span className="block font-display text-[1.1875rem] font-semibold tracking-[-0.015em] text-ink tabular-nums">{l.price}</span>
                <span className="mt-0.5 block truncate text-[0.9375rem] text-ink-2">
                  {l.street}, {l.city}
                </span>
                <span className="mt-1 block text-[0.8125rem] text-ink-3">{l.meta}</span>
                <span className="mt-2 block text-[0.75rem] text-ink-4">Listed via {l.via}</span>
              </span>
            </a>
          </li>
        ))}
        <li className="strip-item" data-kind="all">
          <a href={site.live.rentals} className="lcard lcard-more" data-track="listing:all">
            <span className="font-display text-[1.375rem] font-semibold tracking-[-0.015em] text-ink">See all {listingCounts.all}</span>
            <span className="mt-1 text-[0.9375rem] text-ink-3">
              {listingCounts.rent} for rent and {listingCounts.sale} for sale on ontariolandlordhelp.ca
            </span>
            <ArrowUpRight className="mt-4 h-6 w-6 text-brand" aria-hidden />
          </a>
        </li>
      </ul>
      <p className="mt-3 text-[0.8125rem] text-ink-4">
        A snapshot from {listingCounts.asOf}. Prices and availability come from each listing and can change.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------------ */
/* One group, three disciplines                                             */
/* ------------------------------------------------------------------------ */
export function GroupRow({ className = '' }: { className?: string }) {
  const items = [
    { Icon: Users, t: 'OLH Property Management', s: `Ontario landlords since ${site.since}` },
    { Icon: Scale, t: 'Landlord Pro Legal Services', s: 'Licensed paralegals for notices, the LTB and hearings' },
    { Icon: MonitorSmartphone, t: 'LandlordEzy', s: 'Software we built and own: ledgers, portals, maintenance' },
    { Icon: Building2, t: 'List It Realty Brokerage Inc.', s: 'Our licensed brokerage for listings and placement' },
  ]
  return (
    <ul className={`grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map(({ Icon, t, s }) => (
        <li key={t} className="flex items-start gap-3 text-left">
          <span className="icon-badge !h-10 !w-10 shrink-0">
            <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </span>
          <span>
            <span className="block text-[0.9375rem] font-semibold text-ink">{t}</span>
            <span className="mt-0.5 block text-[0.875rem] leading-snug text-ink-3">{s}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ------------------------------------------------------------------------ */
/* Legal Guarantee rates                                                    */
/* ------------------------------------------------------------------------ */
export function LegalRates({ dark = false }: { dark?: boolean }) {
  const rows = [
    ['Unit 1', '$50', '/ mo'],
    ['Units 2–5', '$25', 'each / mo'],
    ['Units 6–10', '$15', 'each / mo'],
  ]
  return (
    <div>
      <dl className={`grid grid-cols-3 overflow-hidden rounded-3xl ${dark ? 'bg-white/[0.06] ring-1 ring-white/10' : 'bg-white shadow-card'}`}>
        {rows.map(([k, v, u], idx) => (
          <div key={k} className={`px-4 py-5 text-center ${idx ? (dark ? 'border-l border-white/10' : 'border-l border-line-soft') : ''}`}>
            <dt className={`text-[0.8125rem] font-medium ${dark ? 'text-white/60' : 'text-ink-3'}`}>{k}</dt>
            <dd className={`mt-1 font-display text-[1.75rem] font-bold leading-none tracking-[-0.03em] tabular-nums ${dark ? 'text-white' : 'text-ink'}`}>{v}</dd>
            <dd className={`mt-1 text-[0.75rem] ${dark ? 'text-white/60' : 'text-ink-4'}`}>{u}</dd>
          </div>
        ))}
      </dl>
      <p className={`mt-3 text-[0.8125rem] ${dark ? 'text-white/60' : 'text-ink-4'}`}>
        Added to Property Management. Each rate applies only to units in its band: 3 units = $50 + $25 + $25 = $100 a month, plus HST.
      </p>
    </div>
  )
}

export type { PlanKey }
