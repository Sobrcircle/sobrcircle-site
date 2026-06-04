const APP_STORE_URL = 'https://apps.apple.com/app/sobrcircle/id6760403731'
const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.sobrcircle.app'

function AppleLogo() {
  return (
    <svg
      className="home-store-badge-icon"
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 12.04c-.03-2.85 2.33-4.22 2.43-4.29-1.32-1.94-3.39-2.2-4.12-2.23-1.75-.18-3.42 1.03-4.31 1.03-.89 0-2.25-1.01-3.71-.98-1.91.03-3.67 1.11-4.65 2.82-1.98 3.43-.51 8.5 1.42 11.29.94 1.36 2.07 2.89 3.54 2.83 1.42-.06 1.96-.92 3.68-.92 1.71 0 2.2.92 3.71.89 1.53-.03 2.5-1.39 3.44-2.76.69-1.01 1.1-2.03 1.4-3.07-.04-.02-2.69-1.04-2.72-4.1l-.02-.51ZM14.6 4.5c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.65 3.36-1.6Z" />
    </svg>
  )
}

function GooglePlayLogo() {
  return (
    <svg
      className="home-store-badge-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5 2.7v18.6a.6.6 0 0 0 .92.5l15.3-9.3a.6.6 0 0 0 0-1L5.92 2.2A.6.6 0 0 0 5 2.7Z" />
    </svg>
  )
}

export default function StoreBadges() {
  return (
    <div className="home-store-badges">
      <a
        className="home-store-badge"
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download SobrCircle on the App Store"
      >
        <AppleLogo />
        <span className="home-store-badge-name">App Store</span>
      </a>
      <a
        className="home-store-badge"
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get SobrCircle on Google Play"
      >
        <GooglePlayLogo />
        <span className="home-store-badge-name">Google Play</span>
      </a>
    </div>
  )
}
