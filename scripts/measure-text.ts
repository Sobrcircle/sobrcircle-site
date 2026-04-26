import { loadImage, createCanvas } from '@napi-rs/canvas'
import path from 'node:path'

const dir = '/home/user/sobrcircle-site/public/badges/v1/preview'
const files = ['24hours-silver.png', '6months-silver.png', '18months-silver.png', '1year-silver.png', '5years-silver.png']

// Detect the vertical extent of bright (text) pixels in the numeral row band
async function measure(fp: string) {
  const img = await loadImage(fp)
  const w = img.width
  const h = img.height
  const c = createCanvas(w, h)
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const data = ctx.getImageData(0, 0, w, h).data
  // Scan the numeral band (above the label) — the numeral baseline is 540
  // and the cap height roughly extends from y=370 to y=540.
  const minY = 350
  const maxY = 555
  let topMostBright = h
  let bottomMostBright = 0
  let leftMostBright = w
  let rightMostBright = 0
  // a pixel is "text" if it's noticeably brighter than the disc gray (~175 avg)
  for (let y = minY; y < maxY; y++) {
    for (let x = 350; x < 700; x++) {
      const i = (y * w + x) * 4
      const a = data[i + 3]
      if (a < 200) continue
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (lum > 230) {
        if (y < topMostBright) topMostBright = y
        if (y > bottomMostBright) bottomMostBright = y
        if (x < leftMostBright) leftMostBright = x
        if (x > rightMostBright) rightMostBright = x
      }
    }
  }
  console.log(`${path.basename(fp).padEnd(22)} numeral bbox: x=${leftMostBright}-${rightMostBright}  y=${topMostBright}-${bottomMostBright}  height=${bottomMostBright - topMostBright}px  width=${rightMostBright - leftMostBright}px`)
}

for (const f of files) {
  await measure(path.join(dir, f))
}
