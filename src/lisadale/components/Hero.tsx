import Cross from './Cross'
import { HERO_ID, media, photos } from '../data/gallery'

/**
 * Full-bleed opening frame. The photograph sits under a warm ivory veil so it
 * resolves into the page's light key rather than sitting on it as a dark block.
 */
export default function Hero() {
  const cover = photos.find((p) => p.id === HERO_ID) ?? photos[0]

  return (
    <header className="ld-hero">
      <div className="ld-hero-media">
        <img
          src={media.photo(cover.id)}
          alt={cover.alt}
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="ld-hero-veil" />

      <div className="ld-hero-inner">
        <p className="ld-hero-eyebrow">The Wedding Of</p>
        <h1 className="ld-script">Lisa &amp; Dale</h1>
        <div className="ld-rule" style={{ marginTop: '2rem' }}>
          <Cross size={18} />
        </div>
        <p className="ld-hero-date">September 7, 2026</p>
      </div>

      <div className="ld-scroll-cue">
        <span>Scroll</span>
      </div>
    </header>
  )
}
