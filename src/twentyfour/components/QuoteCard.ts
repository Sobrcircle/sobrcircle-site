const CARD_SIZE = 1080
const BG = '#0a0a0a'
const TEXT = '#e8e4df'
const MUTED = '#6b6560'
const ACCENT = '#c4a882'
const FONT = "'Times New Roman', Times, serif"

const PAD_X = 90
const PAD_TOP = 120
const MAX_WIDTH = CARD_SIZE - PAD_X * 2

export async function generateQuoteCard(opts: {
  chapter: string
  title: string
  stanzas: string[][]
}): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = CARD_SIZE
  canvas.height = CARD_SIZE
  const ctx = canvas.getContext('2d')!

  // Consistent text positioning
  ctx.textBaseline = 'top'

  // Background
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, CARD_SIZE, CARD_SIZE)

  let y = PAD_TOP

  // Chapter label (italic, muted)
  ctx.fillStyle = MUTED
  ctx.font = 'italic 24px ' + FONT
  ctx.fillText(opts.chapter, PAD_X, y)
  y += 50

  // Title
  ctx.fillStyle = TEXT
  ctx.font = 'normal 40px ' + FONT
  ctx.fillText(opts.title, PAD_X, y)
  y += 72

  // Stanzas
  ctx.fillStyle = TEXT
  ctx.font = 'normal 28px ' + FONT
  const lineHeight = 46
  const stanzaGap = 30
  const maxY = CARD_SIZE - 160 // room for footer

  outer: for (let si = 0; si < opts.stanzas.length; si++) {
    const stanza = opts.stanzas[si]
    for (let li = 0; li < stanza.length; li++) {
      if (y + lineHeight > maxY) break outer
      const lines = wrapText(ctx, stanza[li], MAX_WIDTH)
      for (const wrappedLine of lines) {
        if (y + lineHeight > maxY) break outer
        ctx.fillText(wrappedLine, PAD_X, y)
        y += lineHeight
      }
    }
    y += stanzaGap
  }

  // Footer — accent dot + "twenty four — bm"
  const footerY = CARD_SIZE - 70
  ctx.fillStyle = ACCENT
  ctx.beginPath()
  ctx.arc(CARD_SIZE / 2, footerY - 24, 3, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = MUTED
  ctx.font = 'italic 22px ' + FONT
  const footerText = 'twenty four \u2014 bm'
  const footerWidth = ctx.measureText(footerText).width
  ctx.fillText(footerText, (CARD_SIZE - footerWidth) / 2, footerY)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to generate image'))
      },
      'image/png',
    )
  })
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return ['']
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? current + ' ' + word : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : ['']
}
