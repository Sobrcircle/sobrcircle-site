import { loadImage, createCanvas } from '@napi-rs/canvas'

const img = await loadImage('/home/user/sobrcircle-site/public/badges/v1/preview/6months.png')
const w = img.width
const h = img.height
const c = createCanvas(w, h)
const ctx = c.getContext('2d')
ctx.drawImage(img, 0, 0)
const data = ctx.getImageData(0, 0, w, h).data

const sample = (x: number, y: number) => {
  const i = (y * w + x) * 4
  return `(r=${data[i]} g=${data[i + 1]} b=${data[i + 2]} a=${data[i + 3]})`
}
console.log('6months.png pixel samples:')
console.log(`top-left corner (0,0):       ${sample(0, 0)}`)
console.log(`top-right corner (1023,0):   ${sample(1023, 0)}`)
console.log(`bottom-left (0,1023):        ${sample(0, 1023)}`)
console.log(`outside badge (50, 50):      ${sample(50, 50)}`)
console.log(`badge halo edge (110, 484):  ${sample(110, 484)}`)
console.log(`badge halo outer (200, 484): ${sample(200, 484)}`)
console.log(`disc center (512, 484):      ${sample(512, 484)}`)
console.log(`disc clean (380, 484):       ${sample(380, 484)}`)
console.log(`disc clean (640, 484):       ${sample(640, 484)}`)
console.log(`ring brushed (300, 484):     ${sample(300, 484)}`)
console.log(`outer halo (200, 484):       ${sample(200, 484)}`)
