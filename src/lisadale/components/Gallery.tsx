import { useCallback, useState } from 'react'
import { PREVIEW_IDS, photos, type Photo } from '../data/gallery'
import JustifiedGrid from './JustifiedGrid'
import Lightbox from './Lightbox'
import Cross from './Cross'

/**
 * Front-page preview only. A wedding gallery reads better when the story page
 * ends on an invitation rather than on forty-seven thumbnails — the full set
 * is a page of its own.
 */
export default function Gallery() {
  const preview = PREVIEW_IDS.map((id) => photos.find((p) => p.id === id)!).filter(Boolean)
  const [open, setOpen] = useState<number | null>(null)

  const openPhoto = useCallback((p: Photo) => {
    setOpen(photos.findIndex((x) => x.id === p.id))
  }, [])

  return (
    <section className="ld-section" id="gallery">
      <div className="ld-section-head">
        <div className="ld-rule" data-animate style={{ marginBottom: '1.6rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-label" data-animate>The Photographs</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          The day they were given
        </h2>
      </div>

      <div data-animate>
        <JustifiedGrid photos={preview} onOpen={openPhoto} targetHeight={300} />
      </div>

      <div className="ld-film-actions" data-animate style={{ marginTop: '2.6rem' }}>
        <a className="ld-btn ld-btn--solid" href="/lisadale/gallery/">
          View the full gallery
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
