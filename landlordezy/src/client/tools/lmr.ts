import { GUIDELINES, money, remember, restore, roundCents, set, setupCopy, show } from './shared'

const FIELDS = ['deposit', 'year', 'newrent']

/**
 * Last month's rent deposit interest (RTA s.106). Each year the landlord owes
 * interest on the deposit at the guideline in effect when the payment is due
 * (s.106(6)). If the rent has gone up, the landlord may keep that interest to
 * top the deposit up toward the new rent (s.106(7)); any shortfall beyond the
 * interest can be requested from the tenant (s.106(3)).
 */
export function lmrInterest(deposit: number, year: number, newRent: number | null) {
  const rate = GUIDELINES[year]
  if (rate === undefined) return null
  const interest = roundCents((deposit * rate) / 100)
  const gap = newRent && newRent > deposit ? roundCents(newRent - deposit) : 0
  const topUpFromInterest = Math.min(interest, gap)
  const payable = roundCents(interest - topUpFromInterest)
  const tenantTopUp = roundCents(Math.max(0, gap - interest))
  return { rate, interest, gap, topUpFromInterest, payable, tenantTopUp }
}

export function mount() {
  const form = document.querySelector<HTMLFormElement>('[data-tool="lmr"]')
  if (!form) return
  const f = (n: string) => form.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${n}"]`)!
  restore(form, 'le-tool-lmr', FIELDS)

  const run = () => {
    const deposit = Number(f('deposit').value)
    const year = Number(f('year').value)
    const newRentRaw = Number(f('newrent').value)
    const ok = deposit > 0
    show(form, 'result', ok)
    show(form, 'empty', !ok)
    if (!ok) return
    const r = lmrInterest(deposit, year, newRentRaw > 0 ? newRentRaw : null)
    if (!r) return
    set(form, 'rate', `${r.rate}%`)
    set(form, 'year', String(year))
    set(form, 'interest', money(r.interest))
    set(form, 'topup', money(r.topUpFromInterest))
    set(form, 'payable', money(r.payable))
    set(form, 'tenant-topup', money(r.tenantTopUp))
    set(form, 'new-deposit', money(roundCents(deposit + r.topUpFromInterest + r.tenantTopUp)))
    show(form, 'has-gap', r.gap > 0)
    show(form, 'no-gap', r.gap === 0)
  }
  const changed = () => {
    run()
    remember(form, 'le-tool-lmr', FIELDS)
  }
  form.addEventListener('input', changed)
  form.addEventListener('change', changed)
  form.addEventListener('submit', (e) => e.preventDefault())
  setupCopy(form, FIELDS)
  run()
}
