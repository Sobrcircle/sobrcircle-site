/**
 * Generates 1200×630 Open Graph images into public/og/ and the favicon PNGs
 * into public/. Run when titles change: `npx tsx scripts/og.ts`.
 * Uses Inter (SIL OFL), already in the parent repo at scripts/fonts/Inter.ttf,
 * and the real OLH logo from public/img.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts, loadImage, type Image, type SKRSContext2D } from '@napi-rs/canvas'

const here = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(here, '..')
const PUBLIC = path.join(ROOT, 'public')
GlobalFonts.registerFromPath(path.resolve(ROOT, '../scripts/fonts/Inter.ttf'), 'Inter')

const W = 1200
const H = 630

type Card = { file: string; eyebrow: string; title: string }

const cards: Card[] = [
  { file: 'default', eyebrow: 'Ontario landlords since 2003', title: 'Self-manage your rentals. With a team behind you.' },
  { file: 'home', eyebrow: 'OLH Landlord Shield · from $49 a month', title: 'Self-manage your rentals. With a team behind you.' },
  { file: 'pricing', eyebrow: 'Proposed pricing · CAD, plus HST', title: 'One monthly total for your portfolio.' },
  { file: 'landlord-shield', eyebrow: 'OLH Landlord Shield', title: 'From missed rent to a served N4, in your own account.' },
  { file: 'legal', eyebrow: 'Legal help on the same team', title: 'Licensed paralegals, before you need them.' },
  { file: 'rentals', eyebrow: 'Rentals & leasing', title: 'Homes on our platforms.' },
]

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

function render(card: Card, logo: Image): Buffer {
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

  // Brand row: the real OLH logo on a white plate.
  const lh = 84
  const lw = Math.round((logo.width / logo.height) * lh)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(72, 56, lw + 40, lh + 28, 22)
  ctx.fill()
  ctx.drawImage(logo, 92, 70, lw, lh)

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
  ctx.fillText('ontariolandlordhelp.ca', 72, 576)
  const tw = ctx.measureText('Design preview').width
  ctx.fillText('Design preview', W - 72 - tw, 576)
  return c.toBuffer('image/png')
}

const logo = await loadImage(path.join(PUBLIC, 'img/olh-logo-720.png'))
// The Ontario-and-house mark: the left 31% of the logo artwork.
const markW = Math.round(logo.width * 0.31)

await mkdir(path.join(PUBLIC, 'og'), { recursive: true })
for (const card of cards) {
  await writeFile(path.join(PUBLIC, 'og', `${card.file}.png`), render(card, logo))
}

async function icon(size: number, file: string, bg: string | null, pad: number) {
  const c = createCanvas(size, size)
  const ctx = c.getContext('2d')
  if (bg) {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, size, size)
  }
  const box = size - pad * 2
  const scale = Math.min(box / markW, box / logo.height)
  const w = markW * scale
  const h = logo.height * scale
  ctx.drawImage(logo, 0, 0, markW, logo.height, (size - w) / 2, (size - h) / 2, w, h)
  await writeFile(path.join(PUBLIC, file), c.toBuffer('image/png'))
}
await icon(32, 'favicon-32.png', null, 0)
await icon(180, 'apple-touch-icon.png', '#ffffff', 16)
await icon(512, 'img/olh-mark-512.png', '#ffffff', 36)
console.log(`Generated ${cards.length} Open Graph images and 3 icons.`)
