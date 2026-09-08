/** Fixed turbulence overlay. On the dark SobrCircle site this reads as film
 *  warmth; here it's dialled right down and set to multiply so the ivory keeps
 *  the texture of pressed paper rather than looking like screen noise. */
export default function Grain() {
  return (
    <div className="ld-grain" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="ld-grain-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ld-grain-noise)" />
      </svg>
    </div>
  )
}
