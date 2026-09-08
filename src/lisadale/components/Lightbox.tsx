import { useCallback, useEffect, useRef } from 'react'
import { media, type Photo } from '../data/gallery'

interface Props {
  photos: Photo[]
  index: number
  onClose: () => void
  onNavigate: (next: number) => void
}

/**
 * Full-screen viewer.
 *
 * The download is a plain anchor pointing at `?download=1` rather than a
 * fetch-to-blob dance: the R2 proxy replies with `Content-Disposition:
 * attachment`, which is the one mechanism that saves a file identically on
 * desktop, Android and iOS Safari. Long-press to "Save Image" still works too,
 * which is what most guests will reach for on a phone.
 */
export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const photo = photos[index]
  const touchX = useRef<number | null>(null)

  const go = useCallback(
    (delta: number) => onNavigate((index + delta + photos.length) % photos.length),
    [index, photos.length, onNavigate]
  )

  // Keyboard control, and a scroll lock so the page behind stays put.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [go, onClose])

  // Preload the neighbours so arrowing through feels instant.
  useEffect(() => {
    ;[1, -1].forEach((d) => {
      const n = photos[(index + d + photos.length) % photos.length]
      const img = new Image()
      img.src = media.photo(n.id)
    })
  }, [index, photos])

  return (
    <div className="ld-lightbox" role="dialog" aria-modal="true" aria-label={photo.alt}>
      <div
        className="ld-lightbox-stage"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (Math.abs(dx) > 55) go(dx < 0 ? 1 : -1)
          touchX.current = null
        }}
      >
        <button className="ld-btn ld-lb-close" onClick={onClose} aria-label="Close">
          Close
        </button>

        <button className="ld-lb-nav ld-lb-prev" onClick={() => go(-1)} aria-label="Previous photo">
          &#8249;
        </button>

        <img src={media.photo(photo.id)} alt={photo.alt} />

        <button className="ld-lb-nav ld-lb-next" onClick={() => go(1)} aria-label="Next photo">
          &#8250;
        </button>
      </div>

      <div className="ld-lightbox-bar">
        <a className="ld-btn" href={media.photoDownload(photo.id)}>
          Download this photo
        </a>
      </div>
    </div>
  )
}
