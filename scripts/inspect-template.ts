import { loadImage, createCanvas } from '@napi-rs/canvas'

const img = await loadImage('/home/user/sobrcircle-site/public/badges/template.png')
const w = img.width
const h = img.height
const canvas = createCanvas(w, h)
const ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0)

const data = ctx.getImageData(0, 0, w, h).data
const sample = (x: number, y: number) => {
  const i = (y * w + x) * 4
  return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] }
}

const CX = 512
const CY = 484

// Walk a horizontal line through center; brightness profile reveals ring location.
console.log('horizontal profile through y=' + CY + ':')
for (let r = 0; r <= 410; r += 10) {
  const left = sample(CX - r, CY)
  const right = sample(CX + r, CY)
  const avgL = Math.round((left.r + left.g + left.b) / 3)
  const avgR = Math.round((right.r + right.g + right.b) / 3)
  console.log(`  r=${r.toString().padStart(3)}: L=${avgL} R=${avgR}`)
}

console.log('\nvertical profile (y values, x=512), avoiding text:')
// scan columns just left of center to avoid text strokes
for (let y = 80; y <= 900; y += 20) {
  const c = sample(CX - 200, y)
  const avg = Math.round((c.r + c.g + c.b) / 3)
  console.log(`  y=${y.toString().padStart(3)}: avg=${avg}`)
}
