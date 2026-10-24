import { socials } from '@/data/socials'

export default function FollowSection() {
  return (
    <section id="follow" className="home-section home-follow">
      <div className="home-section-bg" aria-hidden="true" />
      <div className="home-section-overlay" aria-hidden="true" />

      <div className="home-copy">
        <h2 className="home-title" data-split data-animate data-delay="0.1">Follow Along</h2>
        <p className="home-paragraph home-paragraph--callout" data-animate data-delay="0.25">
          A new video every day.
        </p>
        <p className="home-paragraph" data-animate data-delay="0.35">
          Real talk from Ben, one hard truth at a time. Pick wherever you scroll.
        </p>

        <nav className="home-follow-grid" aria-label="SobrCircle on social media" data-animate data-delay="0.5">
          {socials.map((s) => (
            <a
              key={s.id}
              className="home-follow-bubble"
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`Follow SobrCircle on ${s.name}`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d={s.icon} />
              </svg>
              <span>{s.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
