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

/* ---- remembering inputs and sharing a result ------------------------------ */

type Field = HTMLInputElement | HTMLSelectElement

function fieldsNamed(form: HTMLFormElement, name: string): Field[] {
  return Array.from(form.querySelectorAll<Field>(`[name="${name}"]`))
}

/** The form's current values: radios by their checked value, checkboxes as "1"/"0". */
export function values(form: HTMLFormElement, names: string[]): Record<string, string> {
  const out: Record<string, string> = {}
  for (const name of names) {
    const els = fieldsNamed(form, name)
    const first = els[0]
    if (!first) continue
    if (first instanceof HTMLInputElement && first.type === 'radio') {
      const checked = els.find((el) => (el as HTMLInputElement).checked)
      if (checked) out[name] = checked.value
    } else if (first instanceof HTMLInputElement && first.type === 'checkbox') {
      out[name] = first.checked ? '1' : '0'
    } else if (first.value) out[name] = first.value
  }
  return out
}

/**
 * Fill the form from a shared link (?served=…) if there is one, otherwise from
 * the last visit on this device. Only the calculator's own numbers and dates are
 * kept, never anything that identifies a person.
 */
export function restore(form: HTMLFormElement, key: string, names: string[]) {
  const params = new URLSearchParams(window.location.search)
  let saved: Record<string, string> = {}
  try {
    saved = JSON.parse(window.localStorage.getItem(key) ?? '{}')
  } catch {
    saved = {}
  }
  const fromLink = names.some((n) => params.has(n))
  for (const name of names) {
    const v = fromLink ? params.get(name) : saved[name]
    if (v == null) continue
    for (const el of fieldsNamed(form, name)) {
      if (el instanceof HTMLInputElement && el.type === 'radio') el.checked = el.value === v
      else if (el instanceof HTMLInputElement && el.type === 'checkbox') el.checked = v === '1'
      else el.value = v
    }
  }
}

function linkFor(form: HTMLFormElement, names: string[]): string {
  const query = new URLSearchParams(values(form, names)).toString()
  const page = new URL(form.dataset.toolUrl ?? window.location.pathname, window.location.href)
  page.search = query
  return page.href
}

/**
 * After each change: remember the inputs on this device and, on the calculator's
 * own page, keep the address bar pointing at this exact result.
 */
export function remember(form: HTMLFormElement, key: string, names: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(values(form, names)))
  } catch {
    /* storage unavailable */
  }
  const page = new URL(form.dataset.toolUrl ?? window.location.pathname, window.location.href)
  if (page.pathname === window.location.pathname) history.replaceState(history.state, '', linkFor(form, names))
}

/** "Copy a link to this result": the clipboard where allowed, a share sheet or prompt otherwise. */
export function setupCopy(form: HTMLFormElement, names: string[]) {
  const button = form.querySelector<HTMLButtonElement>('[data-tool-copy]')
  const label = button?.querySelector<HTMLElement>('[data-tool-copy-label]')
  if (!button || !label) return
  const original = label.textContent
  let timer = 0
  button.addEventListener('click', async () => {
    const link = linkFor(form, names)
    try {
      await navigator.clipboard.writeText(link)
      label.textContent = 'Link copied'
    } catch {
      window.prompt('Copy this link:', link)
    }
    window.clearTimeout(timer)
    timer = window.setTimeout(() => (label.textContent = original), 2200)
  })
}
