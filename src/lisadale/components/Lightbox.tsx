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
 * Swipe on touch, arrows or arrow keys on a pointer, Escape to close.
 *
 * The arrows sit below the photograph rather than floating over its edges —
 * on a portrait frame they used to land on top of the picture. They are
 * bounded rather than wrapping, and the one pointing past the end of the set
 * is hidden (not unmounted, so the download button stays put).
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

  const atStart = index === 0
  const atEnd = index === photos.length - 1

  // Bounded, not circular: the first photograph has only a way forward and the
  // last only a way back, so the arrows always tell the truth about where you
  // can go.
  const go = useCallback(
    (delta: number) => {
      const next = index + delta
      if (next < 0 || next >= photos.length) return
      onNavigate(next)
    },
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

  // Preload the real neighbours so moving through feels instant.
  useEffect(() => {
    ;[1, -1]
      .map((d) => photos[index + d])
      .filter(Boolean)
      .forEach((n) => {
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


        {/* keyed so the entrance animation replays on every navigation */}
        <img key={photo.id} src={media.photo(photo.id)} alt={photo.alt} />

      </div>

      <div className="ld-lightbox-bar">
        {/* Kept mounted and merely hidden at the ends, so the download button
            never shifts sideways as you move through the set. */}
        <button
          className={`ld-lb-nav${atStart ? ' is-hidden' : ''}`}
          onClick={() => go(-1)}
          aria-label="Previous photo"
          aria-hidden={atStart}
          tabIndex={atStart ? -1 : 0}
        >
          &#8249;
        </button>

        <a className="ld-btn" href={media.photoDownload(photo.id)}>
          Download this photo
        </a>

        <button
          className={`ld-lb-nav${atEnd ? ' is-hidden' : ''}`}
          onClick={() => go(1)}
          aria-label="Next photo"
          aria-hidden={atEnd}
          tabIndex={atEnd ? -1 : 0}
        >
          &#8250;
        </button>
      </div>
    </div>
  )
}
