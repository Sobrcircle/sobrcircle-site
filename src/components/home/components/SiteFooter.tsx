import { socials } from '@/data/socials'
import StoreBadges from './StoreBadges'

export default function SiteFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <StoreBadges placement="home-footer" className="home-store-badges--footer" />

        <div className="home-footer-brand">
          <img className="home-footer-logo" src="/assets/circle.png" alt="SobrCircle logo" />
          <div>
            <p className="home-footer-name">
              <span>Sobr</span>
              <span>Circle</span>
            </p>
            <p className="home-footer-tagline">Recover Together</p>
          </div>
        </div>

        <nav className="home-footer-socials" aria-label="SobrCircle on social media">
          {socials.map((s) => (
            <a key={s.id} href={s.url} target="_blank" rel="me noopener noreferrer" aria-label={`SobrCircle on ${s.name}`}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </nav>

        <nav className="home-footer-links" aria-label="Site links">
          <a href="/meetings/">Find Meetings</a>
          <a href="/follow/">Follow</a>
          <a href="/support/">Support</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/delete-account/">Delete Account</a>
        </nav>

        <p className="home-footer-note">
          Adults 18+ only. SobrCircle is peer support, not medical care or emergency services. In a crisis in Canada or the US, call or text 988. SobrCircle is independent and not affiliated with or endorsed by AA, NA, CA or any other fellowship.
        </p>

        <p className="home-footer-credit">
          Moradi Labs Inc.
        </p>
      </div>
    </footer>
  )
}
