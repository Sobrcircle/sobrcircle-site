// Build-time generator for per-poem Open Graph assets.
// Runs after `vite build`. For every poem (and a few hero pages) it:
//   1. Renders a 1200x630 OG PNG to dist/twentyfour/og/<id>.png
//   2. Writes dist/twentyfour/<id>/index.html — a copy of the SPA shell
//      with <meta og:*>, <title>, and canonical swapped to that poem.
//
// This gives every poem its own link preview on Threads / X / iMessage,
// while the SPA itself still boots and routes client-side.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { pages } from '../src/twentyfour/data/pages.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const TF_DIST = path.join(DIST, 'twentyfour')
const OG_DIR = path.join(TF_DIST, 'og')
const SITE = 'https://sobrcircle.com'

const BG = '#0a0a0a'
const TEXT = '#e8e4df'
const MUTED = '#6b6560'
const ACCENT = '#c4a882'

// Register a serif font if one is bundled alongside. Fall back to system serif otherwise.
// Node's canvas has limited font fallback, so bundling a TTF is the safest route.
async function tryRegisterFont() {
  const candidates = [
    path.join(ROOT, 'scripts/fonts/Times New Roman.ttf'),
    path.join(ROOT, 'scripts/fonts/times.ttf'),
    path.join(ROOT, 'public/assets/fonts/serif.ttf'),
  ]
  for (const p of candidates) {
    try {
      await fs.access(p)
      GlobalFonts.registerFromPath(p, 'BookSerif')
      return 'BookSerif'
    } catch {}
  }
  return 'serif'
}

const W = 1200
const H = 630

function wrapText(ctx: any, text: string, maxWidth: number): string[] {
  if (!text) return ['']
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? current + ' ' + word : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : ['']
}

function pickPullQuote(stanzas: string[][] | undefined): string[] {
  if (!stanzas || stanzas.length === 0) return []
  // First stanza tends to carry the opening image. Cap at 4 lines so 1200x630
  // stays readable. The landing page still has the full poem.
  const first = stanzas[0] || []
  return first.slice(0, 4)
}

function renderOg(opts: {
  font: string
  chapter: string
  title: string
  lines: string[]
}) {
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext('2d')
  ctx.textBaseline = 'top'

  // Background
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  // Accent rule top-left
  ctx.fillStyle = ACCENT
  ctx.fillRect(72, 72, 48, 2)

  const PAD_X = 72
  const MAX = W - PAD_X * 2
  let y = 100

  // Chapter label
  ctx.fillStyle = MUTED
  ctx.font = `italic 22px ${opts.font}`
  ctx.fillText(opts.chapter || 'twenty four', PAD_X, y)
  y += 44

  // Title
  ctx.fillStyle = TEXT
  ctx.font = `normal 56px ${opts.font}`
  ctx.fillText(opts.title, PAD_X, y)
  y += 86

  // Pull-quote lines
  ctx.fillStyle = TEXT
  ctx.font = `normal 32px ${opts.font}`
  const lineHeight = 50
  for (const raw of opts.lines) {
    const wrapped = wrapText(ctx, raw, MAX)
    for (const w of wrapped) {
      if (y + lineHeight > H - 110) break
      ctx.fillText(w, PAD_X, y)
      y += lineHeight
    }
  }

  // Footer
  ctx.fillStyle = MUTED
  ctx.font = `italic 22px ${opts.font}`
  ctx.fillText('twenty four \u2014 bm', PAD_X, H - 80)
  ctx.font = `italic 20px ${opts.font}`
  const url = 'sobrcircle.com/twentyfour'
  const urlW = ctx.measureText(url).width
  ctx.fillText(url, W - PAD_X - urlW, H - 78)

  return canvas.toBuffer('image/png')
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ── Readable copy for crawlers ─────────────────────────────────────────────
// The book is a React app, so without this every page looks empty to search
// engines. Each page's HTML gets its own words inside #root; React replaces
// them as soon as it loads, so readers see nothing different.
const STATIC_RE = /<main id="tf-static"[\s\S]*?<\/main>/i
const STATIC_STYLE =
  "max-width:640px;margin:0 auto;padding:48px 20px;color:#e8e4df;background:#0a0a0a;font-family:Georgia,'Times New Roman',serif;line-height:1.7"
const linkStyle = 'color:#c4a882'

function staticMain(inner: string) {
  return `<main id="tf-static" style="${STATIC_STYLE}">${inner}</main>`
}

function contentsHtml() {
  let out = ''
  let open = false
  for (const p of pages as any[]) {
    if (p.type === 'chapter') {
      if (open) out += '</ul>'
      out += `<h2><a href="/twentyfour/${p.id}/" style="${linkStyle}">${escapeHtml(p.title)}</a></h2><ul>`
      open = true
    } else if (p.type === 'poem' && open) {
      out += `<li><a href="/twentyfour/${p.id}/" style="${linkStyle}">${escapeHtml(p.title)}</a></li>`
    }
  }
  if (open) out += '</ul>'
  return out
}

function pageBodyHtml(page: any) {
  const home = `<p><a href="/twentyfour/" style="${linkStyle}">twenty four</a>, by bm</p>`
  const foot = `<p>twenty four is the story behind <a href="/" style="${linkStyle}">SobrCircle</a>, the sobriety app built by someone in recovery.</p>`
  if (page.type === 'poem') {
    const poems = (pages as any[]).filter((p) => p.type === 'poem')
    const i = poems.findIndex((p) => p.id === page.id)
    const prev = i > 0 ? poems.at(i - 1) : null
    const next = i < poems.length - 1 ? poems.at(i + 1) : null
    const stanzas = (page.stanzas || [])
      .map((lines: string[]) => `<p>${lines.map((l) => escapeHtml(l)).join('<br>')}</p>`)
      .join('')
    const nav = [
      prev ? `<a href="/twentyfour/${prev.id}/" style="${linkStyle}">previous: ${escapeHtml(prev.title)}</a>` : '',
      next ? `<a href="/twentyfour/${next.id}/" style="${linkStyle}">next: ${escapeHtml(next.title)}</a>` : '',
    ].filter(Boolean).join(' &middot; ')
    return staticMain(`${home}<p>${escapeHtml(page.chapter || '')}</p><h1>${escapeHtml(page.title)}</h1>${stanzas}<p>${nav}</p>${foot}`)
  }
  if (page.type === 'chapter') {
    const list = (pages as any[])
      .filter((p) => p.type === 'poem' && p.chapter === page.title)
      .map((p) => `<li><a href="/twentyfour/${p.id}/" style="${linkStyle}">${escapeHtml(p.title)}</a></li>`)
      .join('')
    return staticMain(`${home}<h1>${escapeHtml(page.title)}</h1><ul>${list}</ul>${foot}`)
  }
  const paras = (page.paragraphs || []).map((p: any) => `<p>${escapeHtml(p.text)}</p>`).join('')
  return staticMain(`${home}<h1>${escapeHtml(page.title || page.label || 'twenty four')}</h1>${paras}${foot}`)
}

function bookHomeHtml() {
  const note = (pages as any[]).find((p) => p.id === 'note')
  const intro = (note?.paragraphs || []).slice(3, 6).map((p: any) => `<p>${escapeHtml(p.text)}</p>`).join('')
  return staticMain(
    `<h1>twenty four</h1><p>Twenty four poems on addiction, relapse and recovery, in four chapters, in the order they were lived. A poetry memoir by bm, the founder of <a href="/" style="${linkStyle}">SobrCircle</a>.</p>` +
      intro +
      `<h2>Contents</h2>${contentsHtml()}`,
  )
}

function patchHtmlForPage(shell: string, opts: {
  id: string
  title: string
  description: string
  ogImage: string
  canonical: string
  body?: string
}) {
  const t = escapeHtml(opts.title)
  const d = escapeHtml(opts.description)
  const img = escapeHtml(opts.ogImage)
  const canon = escapeHtml(opts.canonical)

  let html = shell

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`)

  // Replace meta tags by property/name
  const replaceMeta = (attr: 'property' | 'name', key: string, value: string) => {
    const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, 'i')
    const tag = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`
    if (re.test(html)) html = html.replace(re, tag)
    else html = html.replace(/<\/head>/i, `    ${tag}\n  </head>`)
  }

  replaceMeta('name', 'description', opts.description)
  replaceMeta('property', 'og:title', opts.title)
  replaceMeta('property', 'og:description', opts.description)
  replaceMeta('property', 'og:url', opts.canonical)
  replaceMeta('property', 'og:image', opts.ogImage)
  replaceMeta('name', 'twitter:title', opts.title)
  replaceMeta('name', 'twitter:description', opts.description)
  replaceMeta('name', 'twitter:image', opts.ogImage)

  // Canonical
  const canonRe = /<link\s+rel="canonical"[^>]*>/i
  const canonTag = `<link rel="canonical" href="${canon}" />`
  if (canonRe.test(html)) html = html.replace(canonRe, canonTag)
  else html = html.replace(/<\/head>/i, `    ${canonTag}\n  </head>`)

  // og:image:width/height — reset to 1200x630 (our generated size)
  replaceMeta('property', 'og:image:width', '1200')
  replaceMeta('property', 'og:image:height', '630')

  if (opts.body) html = html.replace(STATIC_RE, opts.body)

  return html
}

function descriptionFor(page: any): string {
  if (page.type === 'poem' && page.stanzas?.[0]) {
    const first = page.stanzas[0].slice(0, 2).join(' / ')
    return `${first} — from twenty four, by bm.`
  }
  if (page.type === 'chapter') {
    return `${page.title} — a chapter in twenty four, by bm.`
  }
  return 'Twenty four poems across four chapters, in the order they were lived. By bm.'
}

function titleFor(page: any): string {
  if (page.type === 'poem') return `${page.title} \u2014 twenty four`
  if (page.type === 'chapter') return `${page.title} \u2014 twenty four`
  return `${page.label || 'twenty four'} \u2014 twenty four`
}

async function main() {
  // Confirm build output exists
  const shellPath = path.join(TF_DIST, 'index.html')
  try {
    await fs.access(shellPath)
  } catch {
    console.error(`[og] dist/twentyfour/index.html not found — run \`vite build\` first.`)
    process.exit(1)
  }

  const shell = await fs.readFile(shellPath, 'utf8')
  await fs.mkdir(OG_DIR, { recursive: true })

  const font = await tryRegisterFont()

  // Which pages get their own landing page?
  // All poems, all chapter dividers, and a handful of named prose pages.
  const shareable = pages.filter(
    (p) =>
      p.type === 'poem' ||
      p.type === 'chapter' ||
      (p.type === 'prose' && ['note', 'dedication', 'acknowledgements', 'about'].includes(p.id)) ||
      p.type === 'closing',
  )

  let ogCount = 0
  let htmlCount = 0

  for (const page of shareable) {
    const id = page.id
    const canonical = `${SITE}/twentyfour/${id}/`
    const ogImagePath = `/twentyfour/og/${id}.png`
    const ogImageAbs = `${SITE}${ogImagePath}`

    // Render PNG
    try {
      const buf = renderOg({
        font,
        chapter: (page as any).chapter || (page.type === 'chapter' ? 'twenty four' : 'twenty four'),
        title: (page as any).title || page.label || id,
        lines:
          page.type === 'poem'
            ? pickPullQuote((page as any).stanzas)
            : page.type === 'chapter'
            ? ['', 'a chapter in twenty four', 'by bm']
            : [(page as any).title || page.label || ''],
      })
      await fs.writeFile(path.join(OG_DIR, `${id}.png`), buf)
      ogCount++
    } catch (err) {
      console.warn(`[og] failed to render ${id}:`, err)
    }

    // Write per-route HTML
    const html = patchHtmlForPage(shell, {
      id,
      title: titleFor(page),
      description: descriptionFor(page),
      ogImage: ogImageAbs,
      canonical,
      body: pageBodyHtml(page),
    })
    const dir = path.join(TF_DIST, id)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    htmlCount++
  }

  await fs.writeFile(shellPath, shell.replace(STATIC_RE, bookHomeHtml()))

  console.log(`[og] wrote ${ogCount} PNGs and ${htmlCount} per-route HTML files under dist/twentyfour/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
