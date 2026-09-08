import { useState } from 'react'
import { media, photos, type Photo } from '../data/gallery'
import Lightbox from './Lightbox'
import Cross from './Cross'

/**
 * The grid. Tiles are uniformly cropped so the page reads as a composed spread;
 * the lightbox shows each frame uncropped. Every tile is a real <button>, so
 * keyboard and screen-reader users get the same gallery everyone else does.
 */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="ld-section" id="gallery">
      <div className="ld-section-head">
        <div className="ld-rule" data-animate style={{ marginBottom: '1.6rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-label" data-animate>The Photographs</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          Every moment we caught
        </h2>
        <p className="ld-sub" data-animate data-delay="0.2">
          Tap any photograph to open it, then download it in full resolution.
          On a phone you can also press and hold to save straight to your camera roll.
        </p>
      </div>

      <div className="ld-grid">
        {photos.map((p: Photo, i: number) => (
          <button
            key={p.id}
            className={`ld-tile${p.wide ? ' ld-tile--wide' : ''}`}
            onClick={() => setOpen(i)}
            aria-label={`Open photograph ${i + 1} of ${photos.length}: ${p.alt}`}
            data-animate
            data-delay={String((i % 4) * 0.06)}
          >
            <img
              src={media.photo(p.id)}
              alt={p.alt}
              loading={i < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </button>
        ))}
      </div>

      <div className="ld-film-actions" data-animate style={{ marginTop: '3rem' }}>
        <a className="ld-btn" href={media.allPhotos}>
          Download every photo
        </a>
      </div>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </section>
  )
}
