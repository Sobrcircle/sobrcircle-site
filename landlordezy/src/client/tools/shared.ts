/**
 * Date and money helpers for the calculators. Dates are handled as calendar
 * dates at local noon, so daylight-saving changes can never shift a day.
 */
export const GUIDELINES: Record<number, number> = {
  2020: 2.2,
  2021: 0,
  2022: 1.2,
  2023: 2.5,
  2024: 2.5,
  2025: 2.5,
  2026: 2.1,
  2027: 1.9,
}

export function parseDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12)
  return Number.isNaN(d.getTime()) ? null : d
}

export function toInputValue(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

/** Same calendar day `n` months later (Jan 31 + 1 month → Feb 28/29). */
export function addMonths(d: Date, n: number): Date {
  const r = new Date(d.getFullYear(), d.getMonth() + n, 1, 12)
  const last = new Date(r.getFullYear(), r.getMonth() + 1, 0, 12).getDate()
  r.setDate(Math.min(d.getDate(), last))
  return r
}

export function isWeekend(d: Date): boolean {
  const day = d.getDay()
  return day === 0 || day === 6
}

export function nextBusinessDay(d: Date): Date {
  let r = addDays(d, 1)
  while (isWeekend(r)) r = addDays(r, 1)
  return r
}

export function fmtDate(d: Date, weekday = true): string {
  return d.toLocaleDateString('en-CA', {
    weekday: weekday ? 'long' : undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function money(n: number): string {
  return n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' }).replace('CA', '')
}

export function roundCents(n: number): number {
  return Math.round(n * 100) / 100
}

export function set(root: ParentNode, key: string, text: string) {
  root.querySelectorAll<HTMLElement>(`[data-out="${key}"]`).forEach((el) => (el.textContent = text))
}

export function show(root: ParentNode, key: string, visible: boolean) {
  root.querySelectorAll<HTMLElement>(`[data-show="${key}"]`).forEach((el) => (el.hidden = !visible))
}

export function today(): Date {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12)
}
