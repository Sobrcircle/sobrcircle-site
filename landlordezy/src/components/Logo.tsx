/**
 * LandlordEzy mark, redrawn as SVG from the brand favicon so it stays crisp
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

export function Logo({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="logo-mark h-7 w-7 shrink-0" />
      <span
        className={`logo-word relative font-display text-[1.1875rem] font-bold tracking-[-0.03em] ${dark ? 'text-white' : 'text-brand-ink'}`}
      >
        Landlord<span className={dark ? 'text-brand-glow' : 'text-brand'}>Ezy</span>
        <MapleLeaf className="absolute -right-2.5 -top-1 h-2.5 w-2.5" />
      </span>
    </span>
  )
}
