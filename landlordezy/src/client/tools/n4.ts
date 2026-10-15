import { addDays, fmtDate, nextBusinessDay, parseDate, set, show, today, toInputValue } from './shared'

/** Bill 60: N4s given on or after this date use the 7-day minimum. */
const BILL_60 = new Date(2026, 8, 21, 12)

export type N4Method = 'hand' | 'courier' | 'mail'

/**
 * Earliest termination date for an Ontario N4, following the LTB's N4
 * instructions: at least 7 days after the notice is given, not counting the day
 * it is given; add one business day for courier, five days for mail/Xpresspost.
 * (LTB example: handed over March 3 → March 10; mailed March 3 → March 15.)
 */
export function n4Dates(served: Date, method: N4Method) {
  const given = method === 'mail' ? addDays(served, 5) : method === 'courier' ? nextBusinessDay(served) : served
  const days = given < BILL_60 ? 14 : 7
  const termination = addDays(given, days)
  return { given, days, termination, fileFrom: addDays(termination, 1) }
}

export function mount() {
  const form = document.querySelector<HTMLFormElement>('[data-tool="n4"]')
  if (!form) return
  const date = form.querySelector<HTMLInputElement>('input[name="served"]')!
  if (!date.value) date.value = toInputValue(today())

  const run = () => {
    const served = parseDate(date.value)
    const method = (new FormData(form).get('method') as N4Method) || 'hand'
    show(form, 'result', !!served)
    show(form, 'empty', !served)
    if (!served) return
    const r = n4Dates(served, method)
    set(form, 'termination', fmtDate(r.termination))
    set(form, 'given', fmtDate(r.given))
    set(form, 'file', fmtDate(r.fileFrom))
    set(form, 'days', String(r.days))
    set(
      form,
      'method-note',
      method === 'mail'
        ? 'Mailed notices are deemed given five days after mailing.'
        : method === 'courier'
          ? 'Couriered notices are deemed given one business day later. If that day is a holiday, count the next business day.'
          : 'Handed to the tenant or an adult in the unit, left in the mailbox, or slid under the door.',
    )
    show(form, 'old-rule', r.days === 14)
  }
  form.addEventListener('input', run)
  form.addEventListener('change', run)
  form.addEventListener('submit', (e) => e.preventDefault())
  run()
}
