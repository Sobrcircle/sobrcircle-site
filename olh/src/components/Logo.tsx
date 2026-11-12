import { url } from '../site'

/**
 * LandlordEzy mark (OLH's own software), redrawn as SVG from the brand favicon so it stays crisp
 * at any size: the blue house outline, the 2×2 window, and the green check.
 * Swap in the official vector if the brand has one.
 */
export function Mark({ className = '', title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <path d="M104 228 256 96l152 132" stroke="#096EF9" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M152 198v140a40 40 0 0 0 40 40h44" stroke="#096EF9" strokeWidth="46" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="221" y="226" width="34" height="34" rx="8" fill="#096EF9" />
      <rect x="265" y="226" width="34" height="34" rx="8" fill="#096EF9" />
      <rect x="221" y="270" width="34" height="34" rx="8" fill="#096EF9" />
      <rect x="265" y="270" width="34" height="34" rx="8" fill="#096EF9" />
      <path d="m248 352 48 40 116-98" stroke="#79D220" strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Simplified maple leaf (public-domain flag motif), used as a tiny brand accent. */
export function MapleLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#F40E16"
        d="M12 1l1.6 3.2 2-.8-.6 4.6 2.6-2.4.8 1.6 3.2-.6-1.2 3.8 2 1-5.2 4.2.6 1.8-5-.8.3 6h-2.2l.3-6-5 .8.6-1.8L1.6 11.4l2-1-1.2-3.8 3.2.6.8-1.6L9 8l-.6-4.6 2 .8z"
      />
    </svg>
  )
}

/**
 * The OLH Property Management lockup. The header uses the real mark (the Ontario
 * map, house and check, cropped from Paul's artwork) with the name set in type
 * beside it, so it stays sharp and readable at header size. The footer keeps the
 * full artwork, tagline and all.
 */
export function Logo({ className = '', size = 'nav' }: { className?: string; size?: 'nav' | 'footer' }) {
  if (size === 'footer') {
    return (
      <img
        src={url('img/olh-logo-360.png')}
        srcSet={`${url('img/olh-logo-360.png')} 360w, ${url('img/olh-logo-720.png')} 720w`}
        sizes="136px"
        width={136}
        height={44}
        alt="OLH Property Management"
        className={`logo-img block h-auto ${className}`}
        style={{ width: '136px' }}
        decoding="async"
      />
    )
  }
  return (
    <span className={`logo-lockup ${className}`}>
      <img
        src={url('img/olh-mark-44.png')}
        srcSet={`${url('img/olh-mark-44.png')} 1x, ${url('img/olh-mark-88.png')} 2x, ${url('img/olh-mark-132.png')} 3x`}
        width={40}
        height={44}
        alt=""
        className="logo-mark"
        decoding="async"
      />
      <span className="logo-type" aria-hidden="true">
        <span className="logo-olh">OLH</span>
        <span className="logo-pm">
          Property
          <br />
          Management
        </span>
      </span>
      <span className="sr-only">OLH Property Management</span>
    </span>
  )
}
