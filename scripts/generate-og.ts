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

function patchHtmlForPage(shell: string, opts: {
  id: string
  title: string
  description: string
  ogImage: string
  canonical: string
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
    const canonical = `${SITE}/twentyfour/${id}`
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
    })
    const dir = path.join(TF_DIST, id)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(path.join(dir, 'index.html'), html)
    htmlCount++
  }

  console.log(`[og] wrote ${ogCount} PNGs and ${htmlCount} per-route HTML files under dist/twentyfour/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
