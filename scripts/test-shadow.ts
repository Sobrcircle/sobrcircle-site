import { createCanvas } from '@napi-rs/canvas'
import fs from 'node:fs'

const c = createCanvas(400, 400)
const ctx = c.getContext('2d')
ctx.fillStyle = '#000'
ctx.fillRect(0, 0, 400, 400)
ctx.shadowColor = 'rgba(0, 200, 255, 1)'
ctx.shadowBlur = 40
ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
ctx.lineWidth = 4
ctx.beginPath()
ctx.arc(200, 200, 100, 0, Math.PI * 2)
ctx.stroke()
fs.writeFileSync('/tmp/shadow-test.png', c.toBuffer('image/png'))
console.log('wrote /tmp/shadow-test.png')
