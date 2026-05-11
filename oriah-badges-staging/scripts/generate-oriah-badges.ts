// Oriah badge generator — forked from sobrcircle-site/scripts/generate-badges.ts
// for the Oriah church app. Same worn-chrome coin master, same compositing
// pipeline (tint → median-filter ring → erase old text → new duration text
// → Oriah micro-typography), with Oriah-specific additions:
//
//   - Brand text is "Oriah" (single weight, no bold/regular split)
//   - Color palette is church-appropriate deep tones (no neon)
//   - Gold anchors every year ending in 0 + 24 Hours; Silver every year ending in 5
//   - Year cycle goes 1–120 (no 18 Months — annual after 1–11 Months)
//   - Crown-of-thorns ring drawn between the inner disc and the chrome ring
//
// Outputs to ./out/. No manifest, no hosting — PNGs are bundled into the
// Oriah app directly.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import type { SKRSContext2D } from '@napi-rs/canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TEMPLATE = path.join(ROOT, 'template.png')
const OUT_DIR = path.join(ROOT, 'out')
const FONT_PATH = path.join(ROOT, 'scripts/fonts/Inter.ttf')

GlobalFonts.registerFromPath(FONT_PATH, 'Inter')

const SIZE = 1024
const CX = 512
const CY = 484
const FILL_R = 240
const FEATHER_INNER = FILL_R * 0.82

const BIG_SIZE_DOUBLE = 295
const BIG_SIZE_SINGLE = 258
const LABEL_SIZE = 60
const LABEL_TRACKING = 16
const NUMERAL_BASELINE = 555
const LABEL_BASELINE = 638

// Anchor the master's inner-disc gray to the assigned tint.
const DISC_REF_LUM = 0.8

type Duration = {
  slug: string
  big: string
  label: string
  color: string
}

// ---------------------------------------------------------------------------
// Oriah palette: deep, dignified, no neon. Gold anchors every year ending
// in 0 (and 24 Hours). Silver anchors every year ending in 5.
// ---------------------------------------------------------------------------
const GOLD          = '#B8860B'
const SILVER        = '#A8A8B0'
const ROYAL_PURPLE  = '#4A148C'
const DEEP_CRIMSON  = '#8B0000'
const FOREST_GREEN  = '#1B4332'
const NAVY_BLUE     = '#14213D'
const BURGUNDY      = '#6D1F1F'
const BRONZE        = '#8B4513'
const DEEP_TEAL     = '#00524A'
const INDIGO        = '#2C3E50'
const OLIVE         = '#556B2F'   // months only
const SIENNA        = '#6B3410'   // months only

// Last-digit → hex for years (year N % 10 → cycle index).
const YEAR_CYCLE: Record<number, string> = {
  0: GOLD,
  1: ROYAL_PURPLE,
  2: DEEP_CRIMSON,
  3: FOREST_GREEN,
  4: NAVY_BLUE,
  5: SILVER,
  6: BURGUNDY,
  7: BRONZE,
  8: DEEP_TEAL,
  9: INDIGO,
}

// Months 1–11 — mirror the year non-anchor colors for 1–9, silver at 5,
// plus two unique colors for 10/11 so they don't echo year 10 (gold) or
// year 11 (purple).
const MONTH_COLORS: Record<number, string> = {
  1:  ROYAL_PURPLE,
  2:  DEEP_CRIMSON,
  3:  FOREST_GREEN,
  4:  NAVY_BLUE,
  5:  SILVER,
  6:  BURGUNDY,
  7:  BRONZE,
  8:  DEEP_TEAL,
  9:  INDIGO,
  10: OLIVE,
  11: SIENNA,
}

function buildDurations(): Duration[] {
  const ds: Duration[] = []
  ds.push({ slug: '24hours', big: '24', label: 'HOURS', color: GOLD })
  for (let m = 1; m <= 11; m++) {
    ds.push({
      slug: m === 1 ? '1month' : `${m}months`,
      big: String(m),
      label: m === 1 ? 'MONTH' : 'MONTHS',
      color: MONTH_COLORS[m],
    })
  }
  for (let y = 1; y <= 120; y++) {
    // Year 1 is a special anchor (matches 24h gold). All multiples of 10
    // are gold; all multiples of 5 (other than 0) are silver; the rest
    // cycle through the 8 deep colors by last digit.
    const color = y === 1 ? GOLD : YEAR_CYCLE[y % 10]
    ds.push({
      slug: y === 1 ? '1year' : `${y}years`,
      big: String(y),
      label: y === 1 ? 'YEAR' : 'YEARS',
      color,
    })
  }
  return ds
}

const DURATIONS = buildDurations()

// ---------------------------------------------------------------------------
// Pixel helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgb(${Math.round(r + (255 - r) * amount)}, ${Math.round(g + (255 - g) * amount)}, ${Math.round(b + (255 - b) * amount)})`
}

// Luminance-anchored duotone tint: disc-gray maps to the assigned hex,
// brighter pixels lift toward white, darker pixels pull toward black.
// In the outer halo (r>380) the lift is capped at 0.4 so the rim reads
// as a tint of the badge color, not near-white.
function applyTint(ctx: SKRSContext2D, hex: string) {
  const [tr, tg, tb] = hexToRgb(hex)
  const img = ctx.getImageData(0, 0, SIZE, SIZE)
  const px = img.data
  const w = SIZE

  for (let i = 0; i < px.length; i += 4) {
    const a = px[i + 3]
    if (a === 0) continue
    const lum =
      (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255

    let r: number
    let g: number
    let b: number
    if (lum >= DISC_REF_LUM) {
      const idx = i >> 2
      const px_x = idx % w
      const px_y = (idx - px_x) / w
      const dx = px_x - CX
      const dy = px_y - CY
      const pr2 = dx * dx + dy * dy

      let t = (lum - DISC_REF_LUM) / (1 - DISC_REF_LUM)
      if (pr2 > 380 * 380) t = Math.min(t, 0.4)

      r = tr + (255 - tr) * t
      g = tg + (255 - tg) * t
      b = tb + (255 - tb) * t
    } else {
      const t = lum / DISC_REF_LUM
      r = tr * t
      g = tg * t
      b = tb * t
    }
    px[i]     = Math.round(r)
    px[i + 1] = Math.round(g)
    px[i + 2] = Math.round(b)
  }
  ctx.putImageData(img, 0, 0)
}

function sortInPlace(a: Uint8Array) {
  for (let i = 1; i < a.length; i++) {
    const v = a[i]
    let j = i - 1
    while (j >= 0 && a[j] > v) {
      a[j + 1] = a[j]
      j--
    }
    a[j + 1] = v
  }
}

// 9×9 median filter over the chrome ring annulus — removes brushwork
// noise while keeping ring edges sharp. Feathered at both edges so the
// filtered band blends into the unmodified disc and halo.
function medianFilterRing(canvas: any) {
  const ctx = canvas.getContext('2d')
  const img = ctx.getImageData(0, 0, SIZE, SIZE)
  const src = img.data
  const dst = new Uint8ClampedArray(src.length)
  dst.set(src)

  const w = SIZE
  const half = 4
  const inR = 270
  const outR = 378
  const feather = 8
  const inMin2 = (inR - feather) * (inR - feather)
  const inMax2 = inR * inR
  const outMin2 = outR * outR
  const outMax2 = (outR + feather) * (outR + feather)

  const k = (half * 2 + 1) ** 2
  const rs = new Uint8Array(k)
  const gs = new Uint8Array(k)
  const bs = new Uint8Array(k)
  const midIdx = Math.floor(k / 2)

  for (let y = half; y < SIZE - half; y++) {
    const dy = y - CY
    const dy2 = dy * dy
    for (let x = half; x < SIZE - half; x++) {
      const dx = x - CX
      const r2 = dx * dx + dy2
      if (r2 < inMin2 || r2 > outMax2) continue
      const i = (y * w + x) * 4
      if (src[i + 3] === 0) continue

      let n = 0
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const ki = ((y + ky) * w + (x + kx)) * 4
          rs[n] = src[ki]
          gs[n] = src[ki + 1]
          bs[n] = src[ki + 2]
          n++
        }
      }
      sortInPlace(rs)
      sortInPlace(gs)
      sortInPlace(bs)

      let blend = 1
      if (r2 < inMax2) blend = (r2 - inMin2) / (inMax2 - inMin2)
      else if (r2 > outMin2) blend = 1 - (r2 - outMin2) / (outMax2 - outMin2)
      blend = Math.max(0, Math.min(1, blend))

      dst[i]     = Math.round(src[i]     * (1 - blend) + rs[midIdx] * blend)
      dst[i + 1] = Math.round(src[i + 1] * (1 - blend) + gs[midIdx] * blend)
      dst[i + 2] = Math.round(src[i + 2] * (1 - blend) + bs[midIdx] * blend)
    }
  }

  ctx.putImageData(new img.constructor(dst, SIZE), 0, 0)
}

// Erase old "24 HOURS" text by replacing the inner-disc region with a
// blurred copy of the template's matching area.
function eraseCenterText(ctx: SKRSContext2D, source: any) {
  const off = createCanvas(SIZE, SIZE)
  const offCtx = off.getContext('2d')
  offCtx.filter = 'blur(40px)'
  offCtx.drawImage(source, 0, 0, SIZE, SIZE)
  offCtx.filter = 'none'

  const mask = offCtx.createRadialGradient(CX, CY, FEATHER_INNER, CX, CY, FILL_R)
  mask.addColorStop(0, 'rgba(0,0,0,1)')
  mask.addColorStop(1, 'rgba(0,0,0,0)')
  offCtx.globalCompositeOperation = 'destination-in'
  offCtx.fillStyle = mask
  offCtx.fillRect(0, 0, SIZE, SIZE)
  ctx.drawImage(off, 0, 0)
}

function drawCenteredText(
  ctx: SKRSContext2D,
  text: string,
  cx: number,
  cy: number,
  size: number,
  weight: number,
  tracking = 0,
) {
  ctx.font = `${weight} ${size}px Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  const chars = text.split('')
  const widths = chars.map((c) => ctx.measureText(c).width)
  const totalW = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1)
  let x = cx - totalW / 2
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x + widths[i] / 2, cy)
    x += widths[i] + tracking
  }
}

function drawText(ctx: SKRSContext2D, d: Duration) {
  const layer = createCanvas(SIZE, SIZE)
  const lctx = layer.getContext('2d')
  lctx.fillStyle = lighten(d.color, 0.62)
  const bigSize = d.big.length === 1 ? BIG_SIZE_SINGLE : BIG_SIZE_DOUBLE
  drawCenteredText(lctx, d.big, CX, NUMERAL_BASELINE, bigSize, 200)
  drawCenteredText(lctx, d.label, CX, LABEL_BASELINE, LABEL_SIZE, 400, LABEL_TRACKING)
  ctx.drawImage(layer, 0, 0)
}

// Oriah micro-typography around the outer band — "Oriah" repeated with
// large dot separators. Single weight throughout (Oriah is one word).
function drawMicroTypography(ctx: SKRSContext2D, hex: string) {
  const fill = lighten(hex, 0.4)
  const radius = 358
  const fontSize = 25
  const dotSize = 36

  type Seg = { text: string; size: number }
  const segments: Seg[] = []
  // Oriah is short — 8 repeats around the ring keeps spacing tight.
  const repeats = 8
  for (let i = 0; i < repeats; i++) {
    segments.push({ text: 'Oriah',  size: fontSize })
    segments.push({ text: '   ',    size: fontSize })
    segments.push({ text: '•',      size: dotSize })
    segments.push({ text: '   ',    size: fontSize })
  }

  const layer = createCanvas(SIZE, SIZE)
  const lctx = layer.getContext('2d')

  const chars: { c: string; w: number; size: number }[] = []
  let totalWidth = 0
  for (const seg of segments) {
    lctx.font = `400 ${seg.size}px Inter`
    for (const c of seg.text) {
      const w = lctx.measureText(c).width
      chars.push({ c, w, size: seg.size })
      totalWidth += w
    }
  }

  const circumference = 2 * Math.PI * radius
  const slack = circumference - totalWidth
  const perCharExtra = slack / chars.length

  lctx.save()
  lctx.translate(CX, CY)
  lctx.fillStyle = fill
  lctx.textAlign = 'center'
  lctx.textBaseline = 'middle'

  let angle = -Math.PI / 2
  for (const ch of chars) {
    const arcW = ch.w + perCharExtra
    const charAngle = arcW / radius
    angle += charAngle / 2
    lctx.save()
    lctx.rotate(angle)
    lctx.translate(0, -radius)
    lctx.font = `400 ${ch.size}px Inter`
    lctx.fillText(ch.c, 0, 0)
    lctx.restore()
    angle += charAngle / 2
  }
  lctx.restore()
  ctx.drawImage(layer, 0, 0)
}

// Crown of thorns — a jagged closed ring drawn between the inner disc
// and the chrome ring. Many sharp inward-pointing spikes around the
// perimeter, evoking the crown without being literal. Drawn in a slightly
// darker etched tone of the badge color so it reads as engraved metal.
function drawCrownOfThorns(ctx: SKRSContext2D, hex: string) {
  // Spikes alternate between two radii (outer base + inner tip).
  const baseR = 282      // outer line — sits just outside the inner disc edge
  const tipR  = 252      // inner tip — pokes inward toward the date area
  const points = 36      // number of inward spikes
  // Small organic wobble so it doesn't read as perfectly geometric.
  const wobble = 4

  const [r, g, b] = hexToRgb(hex)
  // Darker, etched-into-metal tone — pull toward black + reduce sat.
  const darkR = Math.round(r * 0.55)
  const darkG = Math.round(g * 0.55)
  const darkB = Math.round(b * 0.55)

  // Build the jagged closed path: outer vertex, inner tip, outer vertex, …
  ctx.save()
  ctx.beginPath()
  for (let i = 0; i < points; i++) {
    const baseAngle = (i / points) * Math.PI * 2 - Math.PI / 2
    const tipAngle  = baseAngle + Math.PI / points
    const br = baseR + (Math.sin(i * 1.7) * wobble)
    const tr = tipR + (Math.cos(i * 2.3) * wobble * 0.5)
    const bx = CX + Math.cos(baseAngle) * br
    const by = CY + Math.sin(baseAngle) * br
    const tx = CX + Math.cos(tipAngle) * tr
    const ty = CY + Math.sin(tipAngle) * tr
    if (i === 0) ctx.moveTo(bx, by)
    else ctx.lineTo(bx, by)
    ctx.lineTo(tx, ty)
  }
  ctx.closePath()

  // Stroke only — keeps the interior visible (date showing through).
  ctx.strokeStyle = `rgba(${darkR}, ${darkG}, ${darkB}, 0.85)`
  ctx.lineWidth = 2.2
  ctx.lineJoin = 'miter'
  ctx.miterLimit = 4
  ctx.stroke()

  // Subtle inner highlight — a fainter offset stroke on the lighter side
  // so the thorns read as 3D etched marks, not flat outlines.
  ctx.strokeStyle = `rgba(255, 255, 255, 0.12)`
  ctx.lineWidth = 0.8
  ctx.stroke()
  ctx.restore()
}

async function renderBadge(template: any, d: Duration): Promise<Buffer> {
  const tinted = createCanvas(SIZE, SIZE)
  const tctx = tinted.getContext('2d')
  tctx.drawImage(template, 0, 0, SIZE, SIZE)
  applyTint(tctx, d.color)
  medianFilterRing(tinted)

  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(tinted, 0, 0)
  eraseCenterText(ctx, tinted)
  drawCrownOfThorns(ctx, d.color)
  drawText(ctx, d)
  drawMicroTypography(ctx, d.color)

  return canvas.toBuffer('image/png')
}

// Sample subset for visual review.
const SAMPLE_SLUGS = new Set(['24hours', '3months', '6months', '1year', '5years'])

async function main() {
  const onlySamples = process.argv.includes('--samples')
  const target = onlySamples ? DURATIONS.filter((d) => SAMPLE_SLUGS.has(d.slug)) : DURATIONS

  const template = await loadImage(TEMPLATE)
  await fs.mkdir(OUT_DIR, { recursive: true })

  let count = 0
  const t0 = Date.now()
  for (const d of target) {
    const buf = await renderBadge(template, d)
    await fs.writeFile(path.join(OUT_DIR, `${d.slug}.png`), buf)
    count++
    if (!onlySamples && count % 10 === 0) {
      const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
      console.log(`  ${count}/${target.length} written (${elapsed}s)`)
    }
  }
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1)
  console.log(`wrote ${count} badge${count === 1 ? '' : 's'} to ${OUT_DIR} in ${elapsed}s`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
