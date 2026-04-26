// Build PNG badges by compositing on top of the master template.
// Template lives at public/badges/template.png (1024x1024, "24 HOURS" worn-chrome disc).
// For each duration we erase the existing center text by overlaying a
// matching vertical gradient inside a soft circular mask, then draw the
// new "<N> <UNIT>" text in a similar light/etched style.
//
// First-pass output goes to public/badges/v1/preview/ so it doesn't clobber
// the existing AI-generated v1 badges until we sign off on the look.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage } from '@napi-rs/canvas'
import type { SKRSContext2D } from '@napi-rs/canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TEMPLATE = path.join(ROOT, 'public/badges/template.png')
const OUT_DIR = path.join(ROOT, 'public/badges/v1/preview')

const SIZE = 1024
// Center of badge inside the canvas (slightly above geometric center because
// the template's original glow extends below the disc).
const CX = 512
const CY = 484
// Radius of the area we want to repaint (inside the chrome ring).
const FILL_R = 230
// Soft feather radius — alpha fades from full at FILL_R*0.78 to 0 at FILL_R.
const FEATHER_INNER = FILL_R * 0.78

type Duration = {
  slug: string
  big: string
  label: string
}

// Erase the existing text region by overlaying a vertical gradient that
// matches the inner-disc lighting, soft-masked at the edges so it blends
// into the surrounding chrome instead of leaving a visible disc.
function eraseCenterText(ctx: SKRSContext2D) {
  const off = createCanvas(SIZE, SIZE)
  const offCtx = off.getContext('2d')

  // Vertical lighting matching the template (sampled values).
  const grad = offCtx.createLinearGradient(0, CY - FILL_R, 0, CY + FILL_R)
  grad.addColorStop(0, 'rgb(198, 200, 213)')
  grad.addColorStop(0.5, 'rgb(186, 189, 202)')
  grad.addColorStop(1, 'rgb(168, 171, 186)')
  offCtx.fillStyle = grad
  offCtx.fillRect(CX - FILL_R, CY - FILL_R, FILL_R * 2, FILL_R * 2)

  // Soft circular alpha mask: opaque in center, fading to 0 at edge.
  const mask = offCtx.createRadialGradient(CX, CY, FEATHER_INNER, CX, CY, FILL_R)
  mask.addColorStop(0, 'rgba(0,0,0,1)')
  mask.addColorStop(1, 'rgba(0,0,0,0)')
  offCtx.globalCompositeOperation = 'destination-in'
  offCtx.fillStyle = mask
  offCtx.fillRect(CX - FILL_R, CY - FILL_R, FILL_R * 2, FILL_R * 2)

  ctx.drawImage(off, 0, 0)
}

// Draw the big numeral and small label in a light, slightly transparent
// white that approximates the etched-chrome look of the master template.
function drawText(ctx: SKRSContext2D, d: Duration) {
  const bigLen = d.big.length
  const bigSize = bigLen === 1 ? 300 : bigLen === 2 ? 240 : 200
  const labelSize = 50

  ctx.fillStyle = 'rgba(248, 249, 252, 0.92)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // Numeral
  ctx.font = `300 ${bigSize}px "DejaVu Sans", "Liberation Sans", "FreeSans", sans-serif`
  ctx.fillText(d.big, CX, CY + bigSize * 0.18)

  // Label — manually space the letters since canvas has no letterSpacing.
  ctx.font = `400 ${labelSize}px "DejaVu Sans", "Liberation Sans", "FreeSans", sans-serif`
  const tracking = 14
  const chars = d.label.split('')
  let totalW = 0
  const widths = chars.map((c) => {
    const w = ctx.measureText(c).width
    totalW += w
    return w
  })
  totalW += tracking * (chars.length - 1)
  let x = CX - totalW / 2
  const y = CY + bigSize * 0.18 + 80
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x + widths[i] / 2, y)
    x += widths[i] + tracking
  }
}

async function renderBadge(template: any, d: Duration): Promise<Buffer> {
  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(template, 0, 0, SIZE, SIZE)
  eraseCenterText(ctx)
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
