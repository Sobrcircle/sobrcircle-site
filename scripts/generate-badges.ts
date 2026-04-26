// Build PNG badges by compositing on top of the master template.
// Template lives at public/badges/template.png (1024x1024, "24 HOURS" worn-chrome disc).
//
// Strategy:
//   1. Draw the template.
//   2. Erase the existing center text by replacing the inner-disc region
//      with a heavily-blurred copy of itself (the blur smears the bright
//      text strokes into the surrounding gray, leaving a clean canvas
//      with the master's exact lighting). A soft circular alpha mask
//      keeps the chrome ring untouched.
//   3. Draw the new "<N> <UNIT>" text in Inter Thin with an etched/worn
//      edge to match the master's distressed-chrome look.
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
// Center of the badge inside the canvas. The master's halo extends below
// the disc, so the disc itself sits slightly above geometric center.
const CX = 512
const CY = 484
// Inner-disc radius — the chrome ring's inner edge is ~r=265, so 240
// covers the existing text without clipping the ring.
const FILL_R = 240
// Soft feather range — alpha fades from full at FEATHER_INNER to 0 at FILL_R.
const FEATHER_INNER = FILL_R * 0.82

type Duration = {
  slug: string
  big: string
  label: string
}

// Replace the inner-disc region with a blurred copy of itself. The bright
// strokes of "24 HOURS" get smeared into the surrounding gray, giving us
// a clean canvas with the master's exact color and lighting. A soft alpha
// mask blends the patch back into the chrome ring at the edges.
function eraseCenterText(ctx: SKRSContext2D, template: any) {
  const off = createCanvas(SIZE, SIZE)
  const offCtx = off.getContext('2d')

  // Draw the template with a heavy blur — this smears the existing text out
  // of recognition while preserving the disc's lighting and color.
  offCtx.filter = 'blur(40px)'
  offCtx.drawImage(template, 0, 0, SIZE, SIZE)
  offCtx.filter = 'none'

  // Soft circular alpha mask centered on the disc.
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

// Apply a distressed / etched edge to a freshly drawn text layer by punching
// out small random clusters of alpha. Operates only inside the bbox so the
// rest of the canvas isn't touched.
function distressLayer(canvas: any, bbox: { x: number; y: number; w: number; h: number }) {
  const ctx = canvas.getContext('2d')
  const img = ctx.getImageData(bbox.x, bbox.y, bbox.w, bbox.h)
  const px = img.data
  let seed = 1
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 0x100000000
    return seed / 0x100000000
  }
  for (let i = 3; i < px.length; i += 4) {
    if (px[i] === 0) continue
    const r = rand()
    if (r < 0.10) px[i] = Math.max(0, px[i] - Math.floor(rand() * 200))
    else if (r < 0.13) px[i] = 0
    else px[i] = Math.max(0, Math.min(255, px[i] - Math.floor(rand() * 18)))
  }
  ctx.putImageData(img, bbox.x, bbox.y)
}

// Visual size matching: a single chunky "6" carries all the visual weight
// in one character, so at the same font-size as "24" it reads bigger. Drop
// 1-digit numerals about 12% so they feel the same on the disc.
const BIG_SIZE_DOUBLE = 240
const BIG_SIZE_SINGLE = 210
const LABEL_SIZE = 52
const LABEL_TRACKING = 14
const NUMERAL_BASELINE = 540
const LABEL_BASELINE = 615

function drawText(ctx: SKRSContext2D, d: Duration) {
  const layer = createCanvas(SIZE, SIZE)
  const lctx = layer.getContext('2d')
  lctx.fillStyle = 'rgba(252, 253, 255, 0.95)'

  const bigSize = d.big.length === 1 ? BIG_SIZE_SINGLE : BIG_SIZE_DOUBLE
  drawCenteredText(lctx, d.big, CX, NUMERAL_BASELINE, bigSize, 200)
  drawCenteredText(lctx, d.label, CX, LABEL_BASELINE, LABEL_SIZE, 400, LABEL_TRACKING)

  distressLayer(layer, {
    x: CX - 290,
    y: NUMERAL_BASELINE - BIG_SIZE_DOUBLE,
    w: 580,
    h: BIG_SIZE_DOUBLE + 160,
  })

  ctx.save()
  ctx.shadowColor = 'rgba(255, 255, 255, 0.55)'
  ctx.shadowBlur = 10
  ctx.drawImage(layer, 0, 0)
  ctx.restore()
}

async function renderBadge(template: any, d: Duration): Promise<Buffer> {
  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(template, 0, 0, SIZE, SIZE)
  eraseCenterText(ctx, template)
  drawText(ctx, d)
  return canvas.toBuffer('image/png')
}

const SAMPLE: Duration[] = [
  { slug: '24hours',  big: '24', label: 'HOURS'  },
  { slug: '6months',  big: '6',  label: 'MONTHS' },
  { slug: '18months', big: '18', label: 'MONTHS' },
  { slug: '1year',    big: '1',  label: 'YEAR'   },
  { slug: '5years',   big: '5',  label: 'YEARS'  },
]

async function main() {
  const template = await loadImage(TEMPLATE)
  await fs.mkdir(OUT_DIR, { recursive: true })
  for (const d of SAMPLE) {
    const buf = await renderBadge(template, d)
    const filename = `${d.slug}-silver.png`
    await fs.writeFile(path.join(OUT_DIR, filename), buf)
    console.log(`wrote ${filename}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
