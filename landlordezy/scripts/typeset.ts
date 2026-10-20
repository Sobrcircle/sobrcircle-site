/**
 * Typesetting for the prerendered HTML: stop lines breaking in places that read
 * as mistakes, without changing a single word (search engines see the same text).
 *
 *   - Hyphenated words stay whole: "e-Transfer", "7-day", "co-signer" (outside the
 *     product mock-ups, whose boxes are tiny and drawn to size).
 *   - A date stays together: "September 21, 2026", "Nov. 15".
 *   - A number stays with its unit: "15 minutes", "2 tenants", "5 p.m. ET".
 *   - Prices stay together: "$9.99 + $1 a door".
 *   - A few names stay together: "List It Realty", "Ezy AI", "Bill 60", "Unit 2".
 *
 * Only text between tags is touched. Attributes, scripts, styles, SVG and select
 * options are left alone.
 */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
/** Elements whose text is never touched. */
const RAW = new Set(['script', 'style', 'textarea', 'title', 'svg', 'code', 'pre'])
/** Elements that can hold text but not markup, so they get spaces but no <span>. */
const PLAIN = new Set(['option'])

const NB = ' '
const month = String.raw`(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sept?(?:ember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?`
const unit = String.raw`(?:business days?|minutes?|seconds?|hours?|days?|weeks?|months?|years?|doors?|tenants?|units?|questions?|drafts?|photos?|checks?|properties|landlords|a\.m\.|p\.m\.)`

const spaceRules: [RegExp, string][] = [
  // "September 21, 2026" / "Nov. 15"
  [new RegExp(String.raw`\b(${month}) (\d{1,2})\b`, 'g'), `$1${NB}$2`],
  [/\b(\d{1,2}), (\d{4})\b/g, `$1,${NB}$2`],
  // "15 minutes", "2 tenants", "5 p.m."
  [new RegExp(String.raw`(\d[\d,.]*%?) (${unit})(?![\w-])`, 'g'), `$1${NB}$2`],
  [/\b(a\.m\.|p\.m\.) (ET)\b/g, `$1${NB}$2`],
  // "$9.99 + $1 a door", "/month + $1", "$1 per door"
  [/(\S) \+ (\$)/g, `$1${NB}+${NB}$2`],
  [/(\$1) (a|per) (door|unit)\b/g, `$1${NB}$2${NB}$3`],
  // Names and labels that read wrongly when split.
  [/\bList It Realty\b/g, `List${NB}It${NB}Realty`],
  [/\bEzy AI\b/g, `Ezy${NB}AI`],
  [/\bLegal Shield\b/g, `Legal${NB}Shield`],
  [/\b(Bill|Unit|Form) (\d+)\b/g, `$1${NB}$2`],
  [/\b(s\.|ss\.) (\d)/g, `$1${NB}$2`],
]

// A hyphenated word: up to three parts, short enough to never force an overflow.
const hyphenated = /(^|[\s(“"‘[])((?:[A-Za-z0-9$][\w’']{0,13})(?:-[\w’']{1,16}){1,2})(?=$|[\s.,;:!?)”"’\]])/g

function setText(text: string, mock: boolean, plain: boolean): string {
  let t = text
  for (const [re, to] of spaceRules) t = t.replace(re, to)
  if (!mock && !plain) {
    let wrapped = false
    t = t.replace(hyphenated, (all, lead: string, word: string) => {
      if (word.length > 24 || /^\d+-\d+$/.test(word)) return all
      wrapped = true
      return `${lead}<span class="nobr">${word}</span>`
    })
    // Inside a flex or grid parent, every span becomes its own item with a gap around it
    // ("E-signed   , served"). One outer span keeps the run a single item.
    if (wrapped) t = `<span>${t}</span>`
  }
  return t
}

export function typeset(html: string): string {
  const parts = html.split(/(<[^>]*>)/)
  const stack: { tag: string; mock: boolean }[] = []
  let raw: { tag: string; depth: number } | null = null
  let out = ''

  for (const part of parts) {
    if (!part) continue
    if (part[0] !== '<') {
      if (raw) {
        out += part
        continue
      }
      const mock = stack.some((s) => s.mock)
      const plain = stack.some((s) => PLAIN.has(s.tag))
      out += setText(part, mock, plain)
      continue
    }

    out += part
    if (part.startsWith('<!') || part.startsWith('<?')) continue
    const closing = part.startsWith('</')
    const name = (/^<\/?\s*([a-zA-Z][\w-]*)/.exec(part)?.[1] ?? '').toLowerCase()
    if (!name) continue

    if (raw) {
      if (name === raw.tag) {
        if (closing) raw.depth -= 1
        else if (!part.endsWith('/>')) raw.depth += 1
        if (raw.depth === 0) raw = null
      }
      continue
    }
    if (closing) {
      const at = stack.map((s) => s.tag).lastIndexOf(name)
      if (at !== -1) stack.length = at
      continue
    }
    if (VOID.has(name) || part.endsWith('/>')) continue
    if (RAW.has(name)) {
      raw = { tag: name, depth: 1 }
      continue
    }
    const cls = /\sclass="([^"]*)"/.exec(part)?.[1] ?? ''
    stack.push({ tag: name, mock: cls.split(/\s+/).includes('mock') })
  }
  return out
}
