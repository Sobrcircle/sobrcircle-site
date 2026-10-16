/**
 * Search for the Menu sheet. The index (search-index.json) is written at build
 * time from the routes plus the words landlords actually use ("tenant not paying",
 * "raise rent", "credit check"), so no server is involved and results are instant.
 */
export type Entry = { t: string; u: string; k: string; d: string; y: string }

let index: Promise<Entry[]> | null = null

export function load(base: string): Promise<Entry[]> {
  return (index ??= fetch(`${base}search-index.json`, { credentials: 'same-origin' })
    .then((r) => (r.ok ? (r.json() as Promise<Entry[]>) : []))
    .catch(() => []))
}

/** Words that carry no meaning in a search like "how much can I raise the rent". */
const STOP = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'does', 'for', 'how', 'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'the', 'to', 'what', 'when', 'with', 'you', 'your'])

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9.\s-]/g, ' ')
}

function score(entry: Entry, tokens: string[]): { s: number; full: boolean } {
  const fields: [string[], string, number][] = [entry.t, entry.k, entry.d].map((text, i) => {
    const n = norm(text)
    return [n.split(/[\s-]+/), n, [5, 3, 1][i]] as [string[], string, number]
  })
  let total = 0
  let matched = 0
  for (const token of tokens) {
    let best = 0
    for (const [words, text, weight] of fields) {
      if (words.includes(token)) best = Math.max(best, weight * 1.5)
      else if (words.some((w) => w.startsWith(token))) best = Math.max(best, weight)
      else if (token.length > 3 && text.includes(token)) best = Math.max(best, weight * 0.5)
    }
    if (best > 0) matched++
    total += best
  }
  return { s: total, full: matched === tokens.length }
}

export async function search(base: string, query: string, limit = 6): Promise<Entry[]> {
  const entries = await load(base)
  const tokens = norm(query)
    .split(/[\s-]+/)
    .filter((t) => t && !STOP.has(t))
  if (!tokens.length) return []
  const scored = entries
    .map((entry) => ({ entry, ...score(entry, tokens) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
  // When some pages match every word typed, show only those; partial matches are noise then.
  const full = scored.filter((x) => x.full)
  return (full.length ? full : scored).slice(0, limit).map((x) => x.entry)
}
