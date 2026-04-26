// Build SVG badges and rasterize to 1024x1024 PNGs.
// Renders one badge per (duration, color) combo into public/badges/v1/preview/.
//
// SVG approach: a chrome radial gradient for the disc, two concentric rings,
// a big numeral, and a small spaced label. Colors are driven by the palette
// passed in — gradient stops shift toward the chosen hue, rings + text stay
// near-white so they read against the disc.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, loadImage } from '@napi-rs/canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public/badges/v1/preview')

const SIZE = 1024

type Palette = {
  id: string            // filename suffix, e.g. "silver"
  highlight: string     // top-of-disc color
  mid: string           // mid-tone
  shadow: string        // bottom-of-disc color
  ring: string          // inner ring stroke
  text: string          // numeral + label fill
}

const SILVER: Palette = {
  id: 'silver',
  highlight: '#f5f5f7',
  mid: '#c8ccd3',
  shadow: '#9aa0a8',
  ring: '#eef0f2',
  text: '#fafbfc',
}

type Duration = {
  slug: string          // filename, e.g. "24hours"
  big: string           // top text, e.g. "24"
  label: string         // bottom text, e.g. "HOURS"
}

function buildSvg(d: Duration, p: Palette): string {
  // Smaller numerals (4-char like "18") need a slight size bump-down so they
  // don't crowd the rings. One char ("1") can go a touch bigger.
  const bigLen = d.big.length
  const bigSize = bigLen === 1 ? 460 : bigLen === 2 ? 380 : 300

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    <radialGradient id="disc" cx="50%" cy="35%" r="70%">
      <stop offset="0%"  stop-color="${p.highlight}"/>
      <stop offset="55%" stop-color="${p.mid}"/>
      <stop offset="100%" stop-color="${p.shadow}"/>
    </radialGradient>
    <radialGradient id="rim" cx="50%" cy="50%" r="50%">
      <stop offset="92%" stop-color="${p.highlight}" stop-opacity="0"/>
      <stop offset="98%" stop-color="${p.highlight}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${p.highlight}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- main disc -->
  <circle cx="512" cy="512" r="500" fill="url(#disc)"/>
  <!-- soft outer rim highlight -->
  <circle cx="512" cy="512" r="500" fill="url(#rim)"/>

  <!-- inner chrome ring -->
  <circle cx="512" cy="512" r="380" fill="none" stroke="${p.ring}" stroke-width="14" opacity="0.85"/>
  <circle cx="512" cy="512" r="365" fill="none" stroke="${p.shadow}" stroke-width="2" opacity="0.6"/>

  <!-- big numeral -->
  <text x="512" y="540" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif"
        font-size="${bigSize}" font-weight="300"
        fill="${p.text}" opacity="0.92">${d.big}</text>

  <!-- bottom label -->
  <text x="512" y="660" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif"
        font-size="60" font-weight="400" letter-spacing="14"
        fill="${p.text}" opacity="0.9">${d.label}</text>
</svg>`
}

async function renderBadge(d: Duration, p: Palette): Promise<Buffer> {
  const svg = buildSvg(d, p)
  const img = await loadImage(Buffer.from(svg))
  const canvas = createCanvas(SIZE, SIZE)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, SIZE, SIZE)
  return canvas.toBuffer('image/png')
}

// First small batch — silver only, mixed durations.
const SAMPLE: Duration[] = [
  { slug: '24hours',   big: '24', label: 'HOURS'  },
  { slug: '6months',   big: '6',  label: 'MONTHS' },
  { slug: '18months',  big: '18', label: 'MONTHS' },
  { slug: '1year',     big: '1',  label: 'YEAR'   },
  { slug: '5years',    big: '5',  label: 'YEARS'  },
]

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  for (const d of SAMPLE) {
    const buf = await renderBadge(d, SILVER)
    const filename = `${d.slug}-${SILVER.id}.png`
    await fs.writeFile(path.join(OUT_DIR, filename), buf)
    console.log(`wrote ${filename}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
