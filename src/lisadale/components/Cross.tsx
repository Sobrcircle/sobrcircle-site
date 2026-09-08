/** Slim latin cross, drawn rather than typed so the proportions stay elegant
 *  at every size. Purely decorative — hidden from assistive tech. */
export default function Cross({ size = 22 }: { size?: number }) {
  return (
    <svg
      className="ld-cross"
      width={size}
      height={size * 1.5}
      viewBox="0 0 20 30"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 1v28M2.5 9.5h15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}
