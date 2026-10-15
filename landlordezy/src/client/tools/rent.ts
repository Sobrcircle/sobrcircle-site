import { GUIDELINES, addDays, addMonths, fmtDate, money, parseDate, roundCents, set, show, today, toInputValue } from './shared'

export type RentInput = {
  rent: number
  lastIncrease: Date
  serve: Date
  mail: boolean
  exempt: boolean
}

/**
 * Ontario rent increase (RTA s.116 and s.119): written notice on Form N1 at
 * least 90 days before the increase takes effect, and at least 12 months since
 * the last increase (or since the tenancy began). The guideline that applies is
 * the one for the calendar year in which the increase takes effect.
 */
export function rentIncrease(input: RentInput) {
  const deemedGiven = input.mail ? addDays(input.serve, 5) : input.serve
  const byNotice = addDays(deemedGiven, 90)
  const anniversary = addMonths(input.lastIncrease, 12)
  const effective = byNotice > anniversary ? byNotice : anniversary
  const year = effective.getFullYear()
  const guideline = GUIDELINES[year]
  const serveBy = addDays(anniversary, input.mail ? -95 : -90)
  const newRent = guideline === undefined ? null : roundCents(input.rent * (1 + guideline / 100))
  return { effective, anniversary, serveBy, year, guideline, newRent, onAnniversary: effective.getTime() === anniversary.getTime() }
}

export function mount() {
  const form = document.querySelector<HTMLFormElement>('[data-tool="rent"]')
  if (!form) return
  const f = (n: string) => form.querySelector<HTMLInputElement>(`[name="${n}"]`)!
  if (!f('serve').value) f('serve').value = toInputValue(today())

  const run = () => {
    const rent = Number(f('rent').value)
    const last = parseDate(f('last').value)
    const serve = parseDate(f('serve').value)
    const ok = rent > 0 && !!last && !!serve
    show(form, 'result', ok)
    show(form, 'empty', !ok)
    if (!ok) return
    const exempt = f('exempt').checked
    const r = rentIncrease({ rent, lastIncrease: last!, serve: serve!, mail: f('mail').checked, exempt })
    set(form, 'effective', fmtDate(r.effective))
    set(form, 'anniversary', fmtDate(r.anniversary, false))
    set(form, 'serve-by', fmtDate(r.serveBy, false))
    show(form, 'late', !r.onAnniversary)
    show(form, 'exempt', exempt)
    show(form, 'capped', !exempt && r.guideline !== undefined)
    show(form, 'unknown', !exempt && r.guideline === undefined)
    set(form, 'year', String(r.year))
    if (!exempt && r.guideline !== undefined && r.newRent !== null) {
      set(form, 'guideline', `${r.guideline}%`)
      set(form, 'new-rent', money(r.newRent))
      set(form, 'monthly', money(roundCents(r.newRent - rent)))
      set(form, 'yearly', money(roundCents((r.newRent - rent) * 12)))
    }
  }
  form.addEventListener('input', run)
  form.addEventListener('change', run)
  form.addEventListener('submit', (e) => e.preventDefault())
  run()
}
