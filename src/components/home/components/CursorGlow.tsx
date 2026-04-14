import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Desktop-only warm-gold cursor follower. Hidden on touch and when
 * prefers-reduced-motion is set. Scales up over interactive elements.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    el.style.opacity = '0'

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' })
    let shown = false

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      if (!shown) {
        shown = true
        gsap.to(el, { opacity: 1, duration: 0.6, ease: 'power2.out' })
      }
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"]')) {
        gsap.to(el, { scale: 1.6, duration: 0.4, ease: 'power2.out' })
      } else {
        gsap.to(el, { scale: 1, duration: 0.4, ease: 'power2.out' })
      }
    }

    const onLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.4, ease: 'power2.out' })
      shown = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
