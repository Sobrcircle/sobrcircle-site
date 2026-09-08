import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { media, type Photo } from '../data/gallery'

/**
 * Justified rows — the layout fine-art galleries use.
 *
 * A uniform cropped grid was wrong for this set: 39 of the 47 frames are
 * portrait and 8 are landscape, and square tiles amputated both. This packs
 * each row to the full container width at its own height, so every photograph
 * keeps its true aspect ratio and nothing is cropped. Order is preserved
 * exactly, which a CSS-columns masonry would have destroyed — the gallery has
 * to follow the day.
 */

interface Props {
  photos: Photo[]
  onOpen: (photo: Photo) => void
  /** Row height to aim for; rows flex around it to fill the width. */
  targetHeight?: number
  gap?: number
}

interface Row {
  items: Photo[]
  height: number
}

function buildRows(photos: Photo[], width: number, target: number, gap: number): Row[] {
  const rows: Row[] = []
  let run: Photo[] = []
  let aspectSum = 0

  const heightFor = (count: number, sum: number) => (width - gap * (count - 1)) / sum

  for (const p of photos) {
    const aspect = p.w / p.h
    // What the row would be if we closed it *before* taking this frame.
    const hWithout = run.length ? heightFor(run.length, aspectSum) : Infinity

    run.push(p)
    aspectSum += aspect
    const hWith = heightFor(run.length, aspectSum)

    if (hWith <= target) {
      // Adding this frame filled the row. Take whichever version lands closer
      // to the target height — without this check a run of portraits packs
      // three-to-a-row on a phone and each one ends up 113px tall.
      if (run.length > 1 && Math.abs(hWithout - target) < Math.abs(hWith - target)) {
        run.pop()
        aspectSum -= aspect
        rows.push({ items: run, height: hWithout })
        run = [p]
        aspectSum = aspect
      } else {
        rows.push({ items: run, height: hWith })
        run = []
        aspectSum = 0
      }
    }
  }

  // Trailing row: keep it near the target rather than stretching a lone frame
  // across the full width.
  if (run.length) {
    rows.push({ items: run, height: Math.min(target, heightFor(run.length, aspectSum)) })
  }
  return rows
}

export default function JustifiedGrid({ photos, onOpen, targetHeight, gap = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    setWidth(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [])

  // Shorter rows on a phone, so a portrait frame doesn't fill the screen.
  const [target, setTarget] = useState(targetHeight ?? 360)
  useEffect(() => {
    if (targetHeight) return
    const set = () => setTarget(window.innerWidth < 700 ? 240 : window.innerWidth < 1100 ? 300 : 380)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [targetHeight])

  // Fall back to the viewport if the container measures implausibly small.
  // A real device is never narrower than ~320px, so a sub-200px measurement
  // means the observer has not reported yet — and rendering nothing at all
  // would leave the gallery blank.
  const usable =
    width >= 200 ? width : typeof window !== 'undefined' ? Math.max(0, window.innerWidth - 32) : 0

  const rows = usable >= 200 ? buildRows(photos, usable, target, gap) : []
  let index = 0

  return (
    <div ref={ref} className="ld-justified" style={{ gap: `${gap}px` }}>
      {rows.map((row, r) => (
        <div className="ld-jrow" key={r} style={{ height: `${row.height}px`, gap: `${gap}px` }}>
          {row.items.map((p) => {
            const i = index++
            return (
              <button
                key={p.id}
                className="ld-jtile"
                style={{ width: `${row.height * (p.w / p.h)}px` }}
                onClick={() => onOpen(p)}
                aria-label={`Open photograph: ${p.alt}`}
              >
                <img
                  src={media.photo(p.id)}
                  alt={p.alt}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  // Fade in on decode instead of snapping in — with lazy
                  // loading, frames otherwise pop as you scroll.
                  onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
                />
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
