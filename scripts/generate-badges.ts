// Build PNG badges by compositing on top of the master template.
// Template lives at public/badges/template.png (1024x1024, "24 HOURS" worn-chrome disc).
//
// Per-duration color map (provided by user). The master is silver-gray;
// each badge gets tinted via canvas "color" blend so the chrome luminance,
// halo, and worn ring texture are preserved while hue/saturation shift to
// the assigned color.
//
// Output goes to public/badges/v1/preview/.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import type { SKRSContext2D } from '@napi-rs/canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TEMPLATE = path.join(ROOT, 'public/badges/template.png')
const OUT_DIR = path.join(ROOT, 'public/badges/v1/preview')
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

type Duration = {
  slug: string  // filename without color suffix
  big: string   // numeral
  label: string // unit (HOURS / MONTHS / YEAR / YEARS)
  color: string // assigned hex
}

// Duration → assigned color (user-provided).
const DURATIONS: Duration[] = [
  { slug: '24hours',  big: '24', label: 'HOURS',  color: '#C0C6CF' },
  { slug: '1month',   big: '1',  label: 'MONTH',  color: '#00A86B' },
  { slug: '2months',  big: '2',  label: 'MONTHS', color: '#6A0DAD' },
  { slug: '3months',  big: '3',  label: 'MONTHS', color: '#CC5500' },
  { slug: '4months',  big: '4',  label: 'MONTHS', color: '#0057D9' },
  { slug: '5months',  big: '5',  label: 'MONTHS', color: '#B11226' },
  { slug: '6months',  big: '6',  label: 'MONTHS', color: '#008B8B' },
  { slug: '7months',  big: '7',  label: 'MONTHS', color: '#C2185B' },
  { slug: '8months',  big: '8',  label: 'MONTHS', color: '#3F00FF' },
  { slug: '9months',  big: '9',  label: 'MONTHS', color: '#B87333' },
  { slug: '10months', big: '10', label: 'MONTHS', color: '#39FF14' },
  { slug: '11months', big: '11', label: 'MONTHS', color: '#0F52BA' },
  { slug: '18months', big: '18', label: 'MONTHS', color: '#B76E79' },
  { slug: '1year',    big: '1',  label: 'YEAR',   color: '#D4A017' },
  { slug: '2years',   big: '2',  label: 'YEARS',  color: '#00A86B' },
  { slug: '3years',   big: '3',  label: 'YEARS',  color: '#6A0DAD' },
  { slug: '4years',   big: '4',  label: 'YEARS',  color: '#CC5500' },
  { slug: '5years',   big: '5',  label: 'YEARS',  color: '#0057D9' },
  { slug: '6years',   big: '6',  label: 'YEARS',  color: '#B11226' },
  { slug: '7years',   big: '7',  label: 'YEARS',  color: '#008B8B' },
  { slug: '8years',   big: '8',  label: 'YEARS',  color: '#C2185B' },
  { slug: '9years',   big: '9',  label: 'YEARS',  color: '#3F00FF' },
  { slug: '10years',  big: '10', label: 'YEARS',  color: '#D4A017' },
  { slug: '11years',  big: '11', label: 'YEARS',  color: '#00A86B' },
  { slug: '12years',  big: '12', label: 'YEARS',  color: '#6A0DAD' },
  { slug: '13years',  big: '13', label: 'YEARS',  color: '#CC5500' },
  { slug: '14years',  big: '14', label: 'YEARS',  color: '#0057D9' },
  { slug: '15years',  big: '15', label: 'YEARS',  color: '#B11226' },
  { slug: '16years',  big: '16', label: 'YEARS',  color: '#008B8B' },
  { slug: '17years',  big: '17', label: 'YEARS',  color: '#C2185B' },
  { slug: '18years',  big: '18', label: 'YEARS',  color: '#3F00FF' },
  { slug: '19years',  big: '19', label: 'YEARS',  color: '#B87333' },
  { slug: '20years',  big: '20', label: 'YEARS',  color: '#D4A017' },
  { slug: '21years',  big: '21', label: 'YEARS',  color: '#00A86B' },
  { slug: '22years',  big: '22', label: 'YEARS',  color: '#6A0DAD' },
  { slug: '23years',  big: '23', label: 'YEARS',  color: '#CC5500' },
  { slug: '24years',  big: '24', label: 'YEARS',  color: '#0057D9' },
  { slug: '25years',  big: '25', label: 'YEARS',  color: '#B11226' },
  { slug: '26years',  big: '26', label: 'YEARS',  color: '#008B8B' },
  { slug: '27years',  big: '27', label: 'YEARS',  color: '#C2185B' },
  { slug: '28years',  big: '28', label: 'YEARS',  color: '#3F00FF' },
  { slug: '29years',  big: '29', label: 'YEARS',  color: '#B87333' },
  { slug: '30years',  big: '30', label: 'YEARS',  color: '#D4A017' },
  { slug: '31years',  big: '31', label: 'YEARS',  color: '#00A86B' },
  { slug: '32years',  big: '32', label: 'YEARS',  color: '#6A0DAD' },
  { slug: '33years',  big: '33', label: 'YEARS',  color: '#CC5500' },
  { slug: '34years',  big: '34', label: 'YEARS',  color: '#0057D9' },
  { slug: '35years',  big: '35', label: 'YEARS',  color: '#B11226' },
  { slug: '36years',  big: '36', label: 'YEARS',  color: '#008B8B' },
  { slug: '37years',  big: '37', label: 'YEARS',  color: '#C2185B' },
  { slug: '38years',  big: '38', label: 'YEARS',  color: '#3F00FF' },
  { slug: '39years',  big: '39', label: 'YEARS',  color: '#B87333' },
  { slug: '40years',  big: '40', label: 'YEARS',  color: '#D4A017' },
  { slug: '41years',  big: '41', label: 'YEARS',  color: '#00A86B' },
  { slug: '42years',  big: '42', label: 'YEARS',  color: '#6A0DAD' },
  { slug: '43years',  big: '43', label: 'YEARS',  color: '#CC5500' },
  { slug: '44years',  big: '44', label: 'YEARS',  color: '#0057D9' },
  { slug: '45years',  big: '45', label: 'YEARS',  color: '#B11226' },
  { slug: '46years',  big: '46', label: 'YEARS',  color: '#008B8B' },
  { slug: '47years',  big: '47', label: 'YEARS',  color: '#C2185B' },
  { slug: '48years',  big: '48', label: 'YEARS',  color: '#3F00FF' },
  { slug: '49years',  big: '49', label: 'YEARS',  color: '#B87333' },
  { slug: '50years',  big: '50', label: 'YEARS',  color: '#D4A017' },
  { slug: '51years',  big: '51', label: 'YEARS',  color: '#00A86B' },
  { slug: '52years',  big: '52', label: 'YEARS',  color: '#6A0DAD' },
  { slug: '53years',  big: '53', label: 'YEARS',  color: '#CC5500' },
  { slug: '54years',  big: '54', label: 'YEARS',  color: '#0057D9' },
  { slug: '55years',  big: '55', label: 'YEARS',  color: '#B11226' },
  { slug: '56years',  big: '56', label: 'YEARS',  color: '#008B8B' },
  { slug: '57years',  big: '57', label: 'YEARS',  color: '#C2185B' },
  { slug: '58years',  big: '58', label: 'YEARS',  color: '#3F00FF' },
  { slug: '59years',  big: '59', label: 'YEARS',  color: '#B87333' },
  { slug: '60years',  big: '60', label: 'YEARS',  color: '#D4A017' },
]

// Erase old text by overlaying a heavily-blurred copy of the template,
// soft-masked inside the chrome ring. Uses the master's actual lighting
// so there's no seam.
function eraseCenterText(ctx: SKRSContext2D, template: any) {
  const off = createCanvas(SIZE, SIZE)
  const offCtx = off.getContext('2d')

  offCtx.filter = 'blur(40px)'
  offCtx.drawImage(template, 0, 0, SIZE, SIZE)
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

// Apply a distressed / etched edge to the text layer to match the ring's
// brushed-chrome character: random alpha erosion for chipped edges plus
// a horizontal brushwork pass that lifts/cuts narrow horizontal bands so
// the strokes get the same swept look as the chrome ring brushwork.
function distressLayer(canvas: any, bbox: { x: number; y: number; w: number; h: number }) {
  const ctx = canvas.getContext('2d')
  const img = ctx.getImageData(bbox.x, bbox.y, bbox.w, bbox.h)
  const px = img.data
  const w = bbox.w
  const h = bbox.h

  let seed = 1
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 0x100000000
    return seed / 0x100000000
  }

  // Pre-compute a per-row brushwork modulation: each horizontal scanline
  // gets a small darken/lighten factor that runs across the row, so when
  // applied it looks like a swept brush stroke.
  const rowMod = new Float32Array(h)
  for (let y = 0; y < h; y++) {
    rowMod[y] = (rand() - 0.5) * 0.55
  }

  for (let y = 0; y < h; y++) {
    const row = rowMod[y]
    const rowBase = y * w * 4
    for (let x = 0; x < w; x++) {
      const i = rowBase + x * 4 + 3
      if (px[i] === 0) continue
      const r = rand()
      // ~22% of opaque pixels get heavily eroded (chipped edges)
      if (r < 0.22) px[i] = Math.max(0, px[i] - Math.floor(rand() * 230))
      // ~5% knocked out entirely (worn through)
      else if (r < 0.27) px[i] = 0
      else px[i] = Math.max(0, Math.min(255, px[i] - Math.floor(rand() * 30)))
      // Apply the row brushwork — narrow horizontal bands of slightly
      // varied alpha to read as swept chrome marks across the strokes.
      if (px[i] > 0) {
        px[i] = Math.max(0, Math.min(255, px[i] + Math.floor(row * 70)))
      }
    }
  }
  ctx.putImageData(img, bbox.x, bbox.y)
}

// Lighten a hex toward white by `amount` (0..1). Used to render the text
// in the same hue family as the chrome-ring highlights — ties the numerals
// and label visually to the ring brushwork instead of solid white.
function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgb(${Math.round(r + (255 - r) * amount)}, ${Math.round(g + (255 - g) * amount)}, ${Math.round(b + (255 - b) * amount)})`
}

function drawText(ctx: SKRSContext2D, d: Duration) {
  const layer = createCanvas(SIZE, SIZE)
  const lctx = layer.getContext('2d')
  // Text color matches the brushed-ring highlight family: same hue as the
  // tint, lifted ~62% toward white for clean readability against the disc.
  lctx.fillStyle = lighten(d.color, 0.62)

  const bigSize = d.big.length === 1 ? BIG_SIZE_SINGLE : BIG_SIZE_DOUBLE
  drawCenteredText(lctx, d.big, CX, NUMERAL_BASELINE, bigSize, 200)
  drawCenteredText(lctx, d.label, CX, LABEL_BASELINE, LABEL_SIZE, 400, LABEL_TRACKING)

  distressLayer(layer, {
    x: CX - 290,
    y: NUMERAL_BASELINE - BIG_SIZE_DOUBLE,
    w: 580,
    h: BIG_SIZE_DOUBLE + 160,
  })

  // No glow — soft shadow erodes the sharp etched edges we want here.
  ctx.drawImage(layer, 0, 0)
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

// We anchor the master's inner-disc luminance to the assigned tint so the
// disc interior reads as the exact assigned color. Anchor pushed to 0.80
// so chrome highlights have to be quite bright to lift toward white;
// everything else (most of the disc) lands at the full tint or slightly
// darker. Alpha is preserved so the outer halo keeps its soft fade and
// the canvas outside the badge stays transparent for in-app use.
const DISC_REF_LUM = 0.8

function applyTint(ctx: SKRSContext2D, hex: string) {
  const [tr, tg, tb] = hexToRgb(hex)
  const img = ctx.getImageData(0, 0, SIZE, SIZE)
  const px = img.data

  for (let i = 0; i < px.length; i += 4) {
    const a = px[i + 3]
    if (a === 0) continue
    const lum =
      (px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114) / 255

    let r: number
    let g: number
    let b: number
    if (lum >= DISC_REF_LUM) {
      // Brighter than the disc interior: blend tint toward white.
      const t = (lum - DISC_REF_LUM) / (1 - DISC_REF_LUM)
      r = tr + (255 - tr) * t
      g = tg + (255 - tg) * t
      b = tb + (255 - tb) * t
    } else {
      // Darker than the disc interior: pull tint toward black.
      const t = lum / DISC_REF_LUM
      r = tr * t
      g = tg * t
      b = tb * t
    }
    px[i]     = Math.round(r)
    px[i + 1] = Math.round(g)
    px[i + 2] = Math.round(b)
    // alpha untouched
  }
  ctx.putImageData(img, 0, 0)
}

// Crescent glow that hugs the bottom curvature of the coin — both the
// inner and outer edges are arcs concentric with the disc, so the glow
// band itself follows the coin's curve. Built as an annular sector
// (donut wedge) at the disc's bottom, filled with a radial gradient
// that's brightest at the disc edge and fades outward, then composited
// with multi-radius blur for a soft halo.
function drawUnderGlow(ctx: SKRSContext2D, hex: string) {
  const [r, g, b] = hexToRgb(hex)
  const a = 0.4
  const lr = Math.round(r + (255 - r) * a)
  const lg = Math.round(g + (255 - g) * a)
  const lb = Math.round(b + (255 - b) * a)

  const off = createCanvas(SIZE, SIZE)
  const octx = off.getContext('2d')

  // Annular sector that wraps the bottom of the disc.
  const innerR = 395  // disc outer edge — glow's inner edge touches here
  const outerR = 485  // glow extends 90px outward
  const startAng = Math.PI * (38 / 180)
  const endAng = Math.PI * (142 / 180)

  octx.beginPath()
  octx.arc(CX, CY, outerR, startAng, endAng)
  octx.arc(CX, CY, innerR, endAng, startAng, true)
  octx.closePath()

  // Bright at inner edge (touching the coin), fading to transparent
  // at the outer edge of the band.
  const grad = octx.createRadialGradient(CX, CY, innerR, CX, CY, outerR)
  grad.addColorStop(0, `rgba(${lr}, ${lg}, ${lb}, 0.95)`)
  grad.addColorStop(0.5, `rgba(${lr}, ${lg}, ${lb}, 0.45)`)
  grad.addColorStop(1, `rgba(${lr}, ${lg}, ${lb}, 0)`)
  octx.fillStyle = grad
  octx.fill()

  // Composite back with stacked blurs so the band's hard angle ends
  // soften into a natural taper and the inner edge bleeds slightly
  // up against the coin.
  ctx.save()
  ctx.globalAlpha = 0.65
  ctx.filter = 'blur(22px)'
  ctx.drawImage(off, 0, 0)
  ctx.globalAlpha = 0.85
  ctx.filter = 'blur(8px)'
  ctx.drawImage(off, 0, 0)
  ctx.globalAlpha = 1
  ctx.filter = 'none'
  ctx.drawImage(off, 0, 0)
  ctx.restore()
}

async function renderBadge(template: any, d: Duration): Promise<Buffer> {
  // Pre-tint the template so the disc-gray anchor maps exactly to the
  // assigned color. Doing this first (rather than at the end) avoids the
  // blur-erase pass lightening the inner disc and shifting the anchor.
  const tinted = createCanvas(SIZE, SIZE)
  const tctx = tinted.getContext('2d')
  tctx.drawImage(template, 0, 0, SIZE, SIZE)
  applyTint(tctx, d.color)

  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')

  // Soft under-glow first so the badge sits on top of it, then the
  // tinted disc, then erase the master text, then write the new text.
  drawUnderGlow(ctx, d.color)
  ctx.drawImage(tinted, 0, 0)
  eraseCenterText(ctx, tinted)
  drawText(ctx, d)

  return canvas.toBuffer('image/png')
}

// Sample subset for visual review before generating the full set.
const SAMPLE_SLUGS = new Set(['24hours', '6months', '18months', '1year', '5years'])

async function main() {
  const onlySamples = process.argv.includes('--samples')
  const target = onlySamples ? DURATIONS.filter((d) => SAMPLE_SLUGS.has(d.slug)) : DURATIONS

  const template = await loadImage(TEMPLATE)
  await fs.mkdir(OUT_DIR, { recursive: true })
  for (const d of target) {
    const buf = await renderBadge(template, d)
    const filename = `${d.slug}.png`
    await fs.writeFile(path.join(OUT_DIR, filename), buf)
    console.log(`wrote ${filename} (${d.color})`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
