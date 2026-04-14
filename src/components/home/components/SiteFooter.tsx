export default function SiteFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
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

        <div className="home-footer-links" aria-label="Legal and support links">
          <a href="/support">Support</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/delete-account">Delete Account</a>
        </div>

        <p className="home-footer-note">
          Adults 18+ only. SobrCircle is peer support, not medical care or emergency services.
        </p>

        <p className="home-footer-credit">
          Moradi Labs Inc.
        </p>
      </div>
    </footer>
  )
}
