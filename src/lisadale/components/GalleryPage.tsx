import { useCallback, useEffect, useState } from 'react'
import { useLenis } from '../../components/home/hooks/useLenis'
import { useReveal } from '../hooks/useReveal'
import { useSplitReveal } from '../../components/home/hooks/useSplitReveal'
import { chapters, media, photos, type Photo } from '../data/gallery'
import Grain from './Grain'
import ScrollProgress from './ScrollProgress'
import JustifiedGrid from './JustifiedGrid'
import Lightbox from './Lightbox'
import Cross from './Cross'

/**
 * The gallery, on its own page. All 47 photographs are here, in chapters
 * following the day, so the front page can stay a story rather than ending in
 * an endless scroll of thumbnails.
 */
export default function GalleryPage() {
  const [open, setOpen] = useState<number | null>(null)
  const [active, setActive] = useState(0)

  useLenis()
  useReveal(true)
  useSplitReveal(true)

  const openPhoto = useCallback((p: Photo) => {
    setOpen(photos.findIndex((x) => x.id === p.id))
  }, [])

  // Highlight the chapter currently in view.
  useEffect(() => {
    const sections = chapters.map((_, i) => document.getElementById(`ch-${i}`))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number(e.target.id.split('-')[1]))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => s && io.observe(s))
    return () => io.disconnect()
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
        <h1 className="ld-title" data-split>All forty&#8209;seven</h1>
        <p className="ld-sub">
          Tap any photograph to open it, then download it in full resolution.
          On a phone you can also press and hold to save it straight to your
          camera roll.
        </p>
        <div className="ld-film-actions" style={{ marginTop: '2rem' }}>
          <a className="ld-btn" href={media.allPhotos}>Download every photo</a>
        </div>
      </header>

      {/* Chapter rail — jump straight to a moment in the day. */}
      <nav className="ld-rail" aria-label="Chapters">
        {chapters.map((c, i) => (
          <a key={i} href={`#ch-${i}`} className={i === active ? 'is-active' : undefined}>
            {c.title}
          </a>
        ))}
      </nav>

      <main className="ld-gallery-main">
        {chapters.map((c, i) => (
          <section key={i} id={`ch-${i}`} className="ld-chapter">
            <div className="ld-chapter-head">
              <span className="ld-chapter-num">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="ld-chapter-title">{c.title}</h2>
              <p className="ld-chapter-note">{c.note}</p>
            </div>
            <JustifiedGrid photos={photos.filter((p) => p.ch === i)} onOpen={openPhoto} />
          </section>
        ))}
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
