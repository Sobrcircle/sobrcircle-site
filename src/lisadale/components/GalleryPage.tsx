import { useCallback, useState } from 'react'
import { useLenis } from '../../components/home/hooks/useLenis'
import { useReveal } from '../hooks/useReveal'
import { useSplitReveal } from '../../components/home/hooks/useSplitReveal'
import { media, photos, type Photo } from '../data/gallery'
import Grain from './Grain'
import ScrollProgress from './ScrollProgress'
import JustifiedGrid from './JustifiedGrid'
import Lightbox from './Lightbox'
import Cross from './Cross'

/**
 * The gallery, on its own page — one continuous set in the order the day
 * happened, so the story page can end on an invitation rather than on a wall
 * of thumbnails.
 */
export default function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null)

  useLenis()
  useReveal(true)
  useSplitReveal(true)

  const openPhoto = useCallback((p: Photo) => {
    setOpen(photos.findIndex((x) => x.id === p.id))
  }, [])

  return (
    <div className="ld-root">
      <Grain />
      <ScrollProgress />

      <header className="ld-gallery-head">
        <a className="ld-back" href="/lisadale/">&larr; Lisa &amp; Dale</a>
        <div className="ld-rule" style={{ marginBottom: '1.4rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-label">The Photographs</p>
        <h1 className="ld-title" data-split>Their day, as it happened</h1>
        <p className="ld-sub">
          Tap any photograph to open it, then download it in full resolution.
          On a phone you can also press and hold to save it straight to your
          camera roll.
        </p>
        <div className="ld-film-actions" style={{ marginTop: '2rem' }}>
          <a className="ld-btn" href={media.allPhotos}>Download every photo</a>
        </div>
      </header>

      <main className="ld-gallery-main">
        <JustifiedGrid photos={photos} onOpen={openPhoto} />
      </main>

      <footer className="ld-footer">
        <div className="ld-rule"><Cross size={18} /></div>
        <p className="ld-footer-script">Lisa &amp; Dale Laporte</p>
        <p className="ld-footer-note">
          <a href="/lisadale/">Back to their page</a>
        </p>
      </footer>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </div>
  )
}
