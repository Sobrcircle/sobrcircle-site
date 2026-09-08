import { media } from '../data/gallery'

/**
 * The film. `preload="metadata"` keeps the page light on cellular — the poster
 * frame carries the section until someone actually presses play. Seeking works
 * because the R2 proxy answers byte-range requests with a proper 206.
 */
export default function Film() {
  return (
    <section className="ld-section" id="film">
      <div className="ld-section-head">
        <p className="ld-label" data-animate>The Film</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          The day, as it happened
        </h2>
        <p className="ld-sub" data-animate data-delay="0.2">
          Best with the sound on.
        </p>
      </div>

      <div className="ld-film-frame" data-animate data-delay="0.1">
        <video
          controls
          playsInline
          preload="metadata"
          poster={media.filmPoster}
          controlsList="nodownload"
        >
          <source src={media.film} type="video/mp4" />
          Your browser cannot play this video.
        </video>
      </div>

      <div className="ld-film-actions" data-animate data-delay="0.2">
        <a className="ld-btn ld-btn--solid" href={media.filmDownload}>
          Download the film
        </a>
      </div>
    </section>
  )
}
