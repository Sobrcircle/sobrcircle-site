/**
 * Generates 1200×630 Open Graph images into public/og/ and the favicon PNGs
 * into public/. Run when titles change: `npx tsx scripts/og.ts`.
 * Uses Inter (SIL OFL), already in the parent repo at scripts/fonts/Inter.ttf.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts, Path2D, type SKRSContext2D } from '@napi-rs/canvas'

const here = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(here, '..')
const PUBLIC = path.join(ROOT, 'public')
GlobalFonts.registerFromPath(path.resolve(ROOT, '../scripts/fonts/Inter.ttf'), 'Inter')

const W = 1200
const H = 630

type Card = { file: string; eyebrow: string; title: string }

const cards: Card[] = [
  { file: 'default', eyebrow: 'Landlord software for Ontario', title: 'Your rentals, on autopilot.' },
  { file: 'home', eyebrow: 'Landlord software for Ontario', title: 'Your rentals, on autopilot.' },
  { file: 'product', eyebrow: 'The LandlordEzy platform', title: 'Everything you do as a landlord. In one place.' },
  { file: 'pricing', eyebrow: 'Pricing', title: 'Start free. Grow by the door.' },
  { file: 'rent-collection', eyebrow: 'Rent collection', title: 'Rent that reconciles itself.' },
  { file: 'tenant-screening', eyebrow: 'Tenant screening', title: 'Know who you’re renting to.' },
  { file: 'rent-reporting', eyebrow: 'Rent reporting to Equifax', title: 'Reward the tenants who pay on time.' },
  { file: 'notices', eyebrow: 'Notices & LTB forms', title: 'The N4, in 60 seconds.' },
  { file: 'leases', eyebrow: 'Leases & inspections', title: 'Sign the Ontario lease from anywhere.' },
  { file: 'listings', eyebrow: 'Listings & tenant placement', title: 'Fill your vacancy faster.' },
  { file: 'maintenance', eyebrow: 'Maintenance & compliance', title: 'Repairs, dispatched in one tap.' },
  { file: 'ezy-ai', eyebrow: 'Ezy AI', title: 'Tell it what you need.' },
  { file: 'legal-help', eyebrow: 'Legal help', title: 'A paralegal team, one tap away.' },
  { file: 'property-managers', eyebrow: 'For property managers', title: 'Win the door. Then run it beautifully.' },
  { file: 'paralegals', eyebrow: 'CaseBuilder for paralegals', title: 'The LTB research team you never had.' },
  { file: 'tools', eyebrow: 'Free tools', title: 'Free calculators for Ontario landlords.' },
  { file: 'tool-n4', eyebrow: 'Free tool · Bill 60', title: 'N4 termination date calculator' },
  { file: 'tool-rent', eyebrow: 'Free tool · 2026–2027', title: 'Ontario rent increase calculator' },
  { file: 'tool-lmr', eyebrow: 'Free tool', title: 'Rent deposit interest calculator' },
  { file: 'guides', eyebrow: 'Ontario landlord guides', title: 'Know the rules. Keep your rentals moving.' },
  { file: 'guide-bill-60', eyebrow: 'Ontario landlord guide', title: 'Bill 60: what changed for Ontario landlords' },
  { file: 'guide-n4-notice', eyebrow: 'Ontario landlord guide', title: 'How to serve an N4 in Ontario' },
  { file: 'guide-rent-increase', eyebrow: 'Ontario landlord guide', title: 'Ontario rent increases in 2027: the 1.9% guideline' },
  { file: 'guide-ltb-forms', eyebrow: 'Ontario landlord guide', title: 'Ontario LTB forms, explained' },
  { file: 'about', eyebrow: 'About LandlordEzy', title: 'Built in Ontario, by a landlord, for landlords.' },
  { file: 'demo', eyebrow: 'Live demo · No sales call', title: 'See it with your own portfolio.' },
]

function drawMark(ctx: SKRSContext2D, x: number, y: number, size: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(size / 512, size / 512)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = '#096EF9'
  ctx.lineWidth = 46
  ctx.stroke(new Path2D('M104 228 256 96l152 132'))
  ctx.stroke(new Path2D('M152 198v140a40 40 0 0 0 40 40h44'))
  ctx.fillStyle = '#096EF9'
  for (const [rx, ry] of [
    [221, 226],
    [265, 226],
    [221, 270],
    [265, 270],
  ]) {
    ctx.beginPath()
    ctx.roundRect(rx, ry, 34, 34, 8)
    ctx.fill()
  }
  ctx.strokeStyle = '#79D220'
  ctx.lineWidth = 50
  ctx.stroke(new Path2D('m248 352 48 40 116-98'))
  ctx.restore()
}

function wrap(ctx: SKRSContext2D, text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > max && line) {
      lines.push(line)
      line = w
    } else line = test
  }
  if (line) lines.push(line)
  return lines
}

function render(card: Card): Buffer {
  const c = createCanvas(W, H)
  const ctx = c.getContext('2d')
  // Navy field with a soft blue glow, like the site's dark sections.
  ctx.fillStyle = '#050C3B'
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(980, 40, 20, 980, 40, 720)
  glow.addColorStop(0, 'rgba(76,155,255,0.55)')
  glow.addColorStop(1, 'rgba(76,155,255,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  // Brand row
  const plate = 76
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(72, 64, plate, plate, 20)
  ctx.fill()
  drawMark(ctx, 72 + 6, 64 + 6, plate - 12)
  ctx.font = '700 40px Inter'
  ctx.fillStyle = '#ffffff'
  ctx.fillText('Landlord', 172, 116)
  const lw = ctx.measureText('Landlord').width
  ctx.fillStyle = '#4C9BFF'
  ctx.fillText('Ezy', 172 + lw, 116)

  // Eyebrow + title
  ctx.font = '600 30px Inter'
  ctx.fillStyle = '#4C9BFF'
  ctx.fillText(card.eyebrow, 72, 258)
  let size = 78
  ctx.font = `800 ${size}px Inter`
  let lines = wrap(ctx, card.title, 1040)
  while (lines.length > 3 && size > 54) {
    size -= 4
    ctx.font = `800 ${size}px Inter`
    lines = wrap(ctx, card.title, 1040)
  }
  ctx.fillStyle = '#ffffff'
  lines.forEach((l, i) => ctx.fillText(l, 72, 258 + 26 + size * 1.08 * (i + 1) - size * 0.18))

  // Footer
  ctx.font = '500 26px Inter'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillText('landlordezy.ca', 72, 576)
  const tw = ctx.measureText('Built for Ontario landlords').width
  ctx.fillText('Built for Ontario landlords', W - 72 - tw, 576)
  return c.toBuffer('image/png')
}

await mkdir(path.join(PUBLIC, 'og'), { recursive: true })
for (const card of cards) {
  await writeFile(path.join(PUBLIC, 'og', `${card.file}.png`), render(card))
}

// Favicons and the structured-data logo, drawn from the brand mark.
async function icon(size: number, file: string, bg: string | null, pad: number) {
  const c = createCanvas(size, size)
  const ctx = c.getContext('2d')
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  drawMark(ctx, pad, pad, size - pad * 2)
  await writeFile(path.join(PUBLIC, file), c.toBuffer('image/png'))
}
await mkdir(path.join(PUBLIC, 'img'), { recursive: true })
await icon(32, 'favicon-32.png', null, 0)
await icon(180, 'apple-touch-icon.png', '#ffffff', 18)
await icon(512, 'img/logo-mark-512.png', '#ffffff', 40)
console.log(`Generated ${cards.length} Open Graph images and 3 icons.`)
