import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CoverPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.3 },
    )
    gsap.fromTo(
      authorRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 1, ease: 'power2.out', delay: 0.8 },
    )
  }, [])

  return (
    <div className="page-content centered">
      <div
        ref={titleRef}
        className="text-[clamp(2rem,5vw,3.2rem)] font-normal italic tracking-[0.06em] mb-3"
      >
        twenty four
      </div>
      <div ref={authorRef} className="text-[0.95rem] italic tracking-[0.15em] opacity-60">
        bm
      </div>
    </div>
  )
}
