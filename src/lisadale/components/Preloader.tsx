import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Cross from './Cross'

/**
 * A verse, a beat, then the curtain lifts. Mirrors the main site's preloader
 * (including its failsafe and skip-on-interaction behaviour) — a preloader
 * should never become a wall between a family and their photographs.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const curtainRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible) { onDone(); return }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let done = false
    const finish = () => {
      if (done) return
      done = true
      document.body.style.overflow = prevOverflow
      setVisible(false)
      onDone()
    }

    const tl = gsap.timeline({ onComplete: finish })
    const failsafe = window.setTimeout(finish, 10000)

    const skip = () => finish()
    window.addEventListener('pointerdown', skip, { once: true, passive: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })
    window.addEventListener('keydown', skip, { once: true })

    tl.fromTo(
      innerRef.current,
      { opacity: 0, y: 18, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power2.out' }
    )
      // Held long enough to actually be read, not just glimpsed.
      .to(innerRef.current, { opacity: 0.9, duration: 0.6 }, '+=3.2')
      .to(innerRef.current, { opacity: 0, y: -10, duration: 0.8, ease: 'power2.in' })
      .to(curtainRef.current, { y: '-100%', duration: 1.1, ease: 'power3.inOut' }, '-=0.3')

    return () => {
      tl.kill()
      window.clearTimeout(failsafe)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('keydown', skip)
      document.body.style.overflow = prevOverflow
    }
  }, [visible, onDone])

  if (!visible) return null

  return (
    <div ref={curtainRef} className="ld-preloader" aria-hidden="true">
      <div ref={innerRef} className="ld-preloader-inner">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Cross size={20} />
        </div>
        <p className="ld-preloader-verse">
          &ldquo;Two are better than one&hellip;<br />
          and a threefold cord<br />is not quickly broken.&rdquo;
        </p>
        <p className="ld-preloader-ref">Ecclesiastes 4:9, 12</p>
      </div>
    </div>
  )
}
