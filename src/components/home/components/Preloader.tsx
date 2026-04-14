import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const KEY = 'sobr.preloader.seen'

/**
 * One line of verse, a beat of silence, then a curtain lift into the site.
 * Skipped on repeat visits (sessionStorage) and reduced-motion.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (sessionStorage.getItem(KEY)) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return true
  })
  const curtainRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) {
      onDone()
      return
    }

    // Lock scroll while curtain is up
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(KEY, '1')
        document.body.style.overflow = prevOverflow
        setVisible(false)
        onDone()
      },
    })

    tl.fromTo(
      lineRef.current,
      { opacity: 0, y: 16, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' }
    )
      .to(lineRef.current, { opacity: 0.8, duration: 0.6 }, '+=0.9')
      .to(lineRef.current, { opacity: 0, y: -8, duration: 0.8, ease: 'power2.in' })
      .to(
        curtainRef.current,
        { y: '-100%', duration: 1.1, ease: 'power3.inOut' },
        '-=0.3'
      )

    return () => {
      tl.kill()
      document.body.style.overflow = prevOverflow
    }
  }, [visible, onDone])

  if (!visible) return null

  return (
    <div ref={curtainRef} className="preloader" aria-hidden="true">
      <div ref={lineRef} className="preloader-line">
        <span>if you&rsquo;re still here,</span>
        <br />
        <span>you&rsquo;re not too late.</span>
      </div>
    </div>
  )
}
