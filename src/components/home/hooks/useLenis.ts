import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Inertial smooth scroll, synced with GSAP ScrollTrigger.
 * Respects prefers-reduced-motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      smoothWheel: true,
      // syncTouch disabled — native iOS/Android scroll feels better on touch
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Intercept anchor clicks so the nav scroll is buttery too
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [])
}
