import { loadImage, createCanvas } from '@napi-rs/canvas'

const img = await loadImage('/home/user/sobrcircle-site/public/badges/template.png')
const w = img.width
const h = img.height
const canvas = createCanvas(w, h)
const ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0)

const data = ctx.getImageData(0, 0, w, h).data
let minX = w
let minY = h
let maxX = 0
let maxY = 0
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const a = data[(y * w + x) * 4 + 3]
    if (a > 5) {
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }
  }
}
console.log(`badge bbox: x=${minX}-${maxX} y=${minY}-${maxY}`)
console.log(`size: ${maxX - minX} x ${maxY - minY}`)
console.log(`center: (${(minX + maxX) / 2}, ${(minY + maxY) / 2})`)

const sample = (x: number, y: number): string => {
  const i = (y * w + x) * 4
  return `(${data[i]}, ${data[i + 1]}, ${data[i + 2]}, ${data[i + 3]})`
}
console.log(`top of badge (512, ${minY + 50}): ${sample(512, minY + 50)}`)
console.log(`above text (512, 350): ${sample(512, 350)}`)
console.log(`above text (512, 400): ${sample(512, 400)}`)
console.log(`below text (512, 700): ${sample(512, 700)}`)
console.log(`below text (512, 750): ${sample(512, 750)}`)
console.log(`inside ring left (380, 500): ${sample(380, 500)}`)
console.log(`inside ring right (644, 500): ${sample(644, 500)}`)
console.log(`text area middle (512, 500): ${sample(512, 500)}`)
console.log(`outside ring left (260, 512): ${sample(260, 512)}`)
console.log(`outside ring right (770, 512): ${sample(770, 512)}`)
