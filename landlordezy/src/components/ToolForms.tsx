/**
 * The three calculators as forms, shared by the tool pages and the guides. The
 * client scripts in src/client/tools mount on [data-tool] and fill [data-out] /
 * toggle [data-show]. Each result ends with the next step (a free account to save
 * and act on it) and a link that reopens the same calculation.
 */
import type { ReactNode } from 'react'
import { Link2 } from 'lucide-react'
import { site, url } from '../site'

const radio = 'flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 has-[:checked]:border-brand has-[:checked]:bg-brand-soft'

function ResultPanel({ children, empty }: { children: ReactNode; empty: string }) {
  return (
    <div className="rounded-4xl bg-brand-ink p-7 text-white sm:p-9" aria-live="polite">
      <p data-show="empty" className="text-white/70">
        {empty}
      </p>
      <div data-show="result" hidden>
        {children}
      </div>
      <noscript>
        <p className="mt-4 text-white/70">Turn on JavaScript to see the result here. The rules are explained below.</p>
      </noscript>
    </div>
  )
}

/** The peak of the visit: a real answer. End it with something useful to do next. */
function NextSteps({ tool, primary, secondary }: { tool: string; primary: string; secondary?: string }) {
  return (
    <div className="no-print mt-7 grid gap-3 border-t border-white/10 pt-6">
      <a href={site.app.signup} className="btn-light w-full !whitespace-normal py-3 text-center leading-snug" data-track={`tool:${tool}:save`}>
        {primary}
      </a>
      {secondary && (
        <a href={site.app.signup} className="btn-ghost-dark w-full !whitespace-normal py-3 text-center leading-snug" data-track={`tool:${tool}:act`}>
          {secondary}
        </a>
      )}
      <button type="button" className="tool-copy" data-tool-copy data-track={`tool:${tool}:copy-link`}>
        <Link2 className="h-4 w-4" aria-hidden />
        <span data-tool-copy-label>Copy a link to this result</span>
      </button>
      <p className="text-center text-[0.75rem] leading-relaxed text-white/60">
        Free account, no card. The link holds only these numbers and dates, nothing that identifies anyone.
      </p>
    </div>
  )
}

export function N4Form() {
  return (
    <form data-tool="n4" data-tool-url={url('tools/n4-date-calculator/')} className="grid gap-6 lg:grid-cols-2" noValidate>
      <div className="rounded-4xl bg-canvas-alt p-7 sm:p-9">
        <label htmlFor="served" className="label">
          Date you’ll give the notice
        </label>
        <input id="served" name="served" type="date" className="field" required />
        <fieldset className="mt-7">
          <legend className="label">How you’ll deliver it</legend>
          <div className="mt-1 grid gap-2.5">
            <label className={radio}>
              <input type="radio" name="method" value="hand" defaultChecked className="h-4 w-4 accent-[#096ef9]" />
              In person, mailbox or under the door
            </label>
            <label className={radio}>
              <input type="radio" name="method" value="courier" className="h-4 w-4 accent-[#096ef9]" />
              Courier (+1 business day)
            </label>
            <label className={radio}>
              <input type="radio" name="method" value="mail" className="h-4 w-4 accent-[#096ef9]" />
              Mail or Xpresspost (+5 days)
            </label>
          </div>
        </fieldset>
      </div>
      <ResultPanel empty="Choose a date to see the earliest termination date.">
        <p className="text-[0.9375rem] text-white/60">Earliest termination date</p>
        <p className="mt-2 font-display text-[2rem] font-bold leading-tight tracking-[-0.025em] sm:text-[2.5rem]" data-out="termination">
          —
        </p>
        <dl className="mt-7 space-y-4 border-t border-white/10 pt-6 text-[0.9375rem]">
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Notice counts as given</dt>
            <dd className="text-right font-semibold" data-out="given">
              —
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Minimum notice</dt>
            <dd className="text-right font-semibold">
              <span data-out="days">7</span> days
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-white/60">Earliest day to file an L1</dt>
            <dd className="text-right font-semibold" data-out="file">
              —
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-[0.875rem] text-white/60" data-out="method-note" />
        <p className="mt-3 rounded-2xl bg-white/10 p-4 text-[0.875rem] text-white/80" data-show="old-rule" hidden>
          This date is before September 21, 2026, so the old 14-day minimum applied (7 days for daily or weekly tenancies).
        </p>
        <NextSteps tool="n4" primary="Save these dates and get a reminder" secondary="Fill my N4 with these dates" />
      </ResultPanel>
    </form>
  )
}

export function RentForm() {
  return (
    <form data-tool="rent" data-tool-url={url('tools/rent-increase-calculator/')} className="grid gap-6 lg:grid-cols-2" noValidate>
      <div className="rounded-4xl bg-canvas-alt p-7 sm:p-9">
        <div className="grid gap-5">
          <div>
            <label htmlFor="rent" className="label">
              Current monthly rent
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3">$</span>
              <input id="rent" name="rent" type="number" min="0" step="0.01" inputMode="decimal" placeholder="1,950.00" className="field pl-8" />
            </div>
          </div>
          <div>
            <label htmlFor="last" className="label">
              Date of the last increase (or move-in)
            </label>
            <input id="last" name="last" type="date" className="field" />
          </div>
          <div>
            <label htmlFor="serve" className="label">
              Date you’ll serve the N1
            </label>
            <input id="serve" name="serve" type="date" className="field" />
          </div>
          <label className="flex items-center gap-3 text-ink-2">
            <input name="mail" type="checkbox" className="h-4 w-4 accent-[#096ef9]" /> I’ll mail the notice (+5 days)
          </label>
          <label className="flex items-center gap-3 text-ink-2">
            <input name="exempt" type="checkbox" className="h-4 w-4 accent-[#096ef9]" /> Unit first occupied after Nov. 15, 2018
          </label>
        </div>
      </div>
      <ResultPanel empty="Enter the rent and dates to see the result.">
        <p className="text-[0.9375rem] text-white/60">Earliest effective date</p>
        <p className="mt-2 font-display text-[2rem] font-bold leading-tight tracking-[-0.025em] sm:text-[2.5rem]" data-out="effective">
          —
        </p>
        <div data-show="capped" hidden>
          <dl className="mt-7 space-y-4 border-t border-white/10 pt-6 text-[0.9375rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">
                Guideline for <span data-out="year" />
              </dt>
              <dd className="font-semibold" data-out="guideline">
                —
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Maximum new rent</dt>
              <dd className="font-semibold" data-out="new-rent">
                —
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Increase</dt>
              <dd className="text-right font-semibold">
                <span data-out="monthly" /> a month · <span data-out="yearly" /> a year
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-6 rounded-2xl bg-white/10 p-4 text-[0.875rem] text-white/80" data-show="exempt" hidden>
          Exempt units aren’t capped by the guideline. The 90-day notice and 12-month rules still apply.
        </p>
        <p className="mt-6 rounded-2xl bg-white/10 p-4 text-[0.875rem] text-white/80" data-show="unknown" hidden>
          The guideline for <span data-out="year" /> hasn’t been announced yet. Ontario publishes it by August 31 of the year before.
        </p>
        <p className="mt-5 text-[0.875rem] text-white/70">
          To raise the rent on the anniversary (<span data-out="anniversary" />), serve the N1 by{' '}
          <strong className="text-white" data-out="serve-by" />.
        </p>
        <p className="mt-2 text-[0.875rem] text-[#ffb35c]" data-show="late" hidden>
          Served on this date, the 90-day notice pushes the increase past the anniversary.
        </p>
        <NextSteps tool="rent" primary="Save the dates and get a reminder" secondary="Prepare the N1" />
      </ResultPanel>
    </form>
  )
}

export function LmrForm() {
  return (
    <form data-tool="lmr" data-tool-url={url('tools/rent-deposit-interest-calculator/')} className="grid gap-6 lg:grid-cols-2" noValidate>
      <div className="rounded-4xl bg-canvas-alt p-7 sm:p-9">
        <div className="grid gap-5">
          <div>
            <label htmlFor="deposit" className="label">
              Last month’s rent deposit held
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3">$</span>
              <input id="deposit" name="deposit" type="number" min="0" step="0.01" inputMode="decimal" placeholder="1,950.00" className="field pl-8" />
            </div>
          </div>
          <div>
            <label htmlFor="year" className="label">
              Year the interest is due
            </label>
            <select id="year" name="year" defaultValue="2026" className="field">
              <option value="2025">2025 (2.5%)</option>
              <option value="2026">2026 (2.1%)</option>
              <option value="2027">2027 (1.9%)</option>
            </select>
          </div>
          <div>
            <label htmlFor="newrent" className="label">
              New monthly rent, if it’s going up (optional)
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3">$</span>
              <input id="newrent" name="newrent" type="number" min="0" step="0.01" inputMode="decimal" placeholder="1,987.05" className="field pl-8" />
            </div>
          </div>
        </div>
      </div>
      <ResultPanel empty="Enter the deposit to see the interest owed.">
        <p className="text-[0.9375rem] text-white/60">
          Interest owed for <span data-out="year" /> at <span data-out="rate" />
        </p>
        <p className="mt-2 font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em]" data-out="interest">
          —
        </p>
        <div data-show="has-gap" hidden>
          <dl className="mt-7 space-y-4 border-t border-white/10 pt-6 text-[0.9375rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Kept to top up the deposit</dt>
              <dd className="font-semibold" data-out="topup" />
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Tenant tops up</dt>
              <dd className="font-semibold" data-out="tenant-topup" />
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">Interest still to pay or credit</dt>
              <dd className="font-semibold" data-out="payable" />
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/60">New deposit</dt>
              <dd className="font-semibold" data-out="new-deposit" />
            </div>
          </dl>
        </div>
        <p className="mt-6 text-[0.875rem] text-white/70" data-show="no-gap" hidden>
          Pay this to the tenant, or credit it against rent, when it comes due.
        </p>
        <NextSteps tool="lmr" primary="Get a reminder when it’s due" />
      </ResultPanel>
    </form>
  )
}
