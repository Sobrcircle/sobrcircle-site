// One-off generator for the unified twenty four link-preview cover.
// Produces a 1200x630 PNG at public/assets/og-twentyfour.png matching the
// black-background "twenty four / bm / sobrcircle.com/twentyfour" cover.
//
// Run with: npx tsx scripts/generate-tf-cover.ts

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public/assets/og-twentyfour.png')

const W = 1200
const H = 630
const BG = '#0a0a0a'
const TEXT = '#e8e4df'
const MUTED = '#6b6560'

async function pickFont(): Promise<string> {
  const candidates = [
    path.join(ROOT, 'scripts/fonts/Times New Roman.ttf'),
    path.join(ROOT, 'scripts/fonts/times.ttf'),
    path.join(ROOT, 'public/assets/fonts/serif.ttf'),
    '/System/Library/Fonts/Supplemental/Times New Roman Italic.ttf',
    '/Library/Fonts/Times New Roman Italic.ttf',
    '/System/Library/Fonts/NewYorkItalic.ttf',
    '/System/Library/Fonts/Times.ttc',
  ]
  for (const p of candidates) {
    try {
      await fs.access(p)
      GlobalFonts.registerFromPath(p, 'CoverSerif')
      return 'CoverSerif'
    } catch {}
  }
  return 'serif'
}

async function main() {
  const font = await pickFont()
  const canvas = createCanvas(W, H)
  const ctx = canvas.getContext('2d')

  // Black background
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)

  // Centered title + subtitle as a visual unit
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'

  // "twenty four" — italic serif, large
  const titleSize = 128
  ctx.fillStyle = TEXT
  ctx.font = `italic ${titleSize}px ${font}`
  const titleY = H / 2 + titleSize / 3 // optical center
  ctx.fillText('twenty four', W / 2, titleY)

  // "bm" — italic serif, muted, directly below the title
  const bmSize = 40
  ctx.fillStyle = MUTED
  ctx.font = `italic ${bmSize}px ${font}`
  ctx.fillText('bm', W / 2, titleY + 64)

  // Footer URL — italic serif, smaller and muted, centered near the bottom
  ctx.fillStyle = MUTED
  ctx.font = `italic 26px ${font}`
  ctx.fillText('sobrcircle.com/twentyfour', W / 2, H - 56)

  const buf = canvas.toBuffer('image/png')
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  await fs.writeFile(OUT, buf)
  console.log(`[tf-cover] wrote ${OUT} (${W}x${H}) using font: ${font}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
