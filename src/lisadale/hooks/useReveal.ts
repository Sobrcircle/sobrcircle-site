import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll reveals for the gallery.
 *
 * Deliberately NOT the home page's useScrollAnimation: that hook keys off
 * `.home-logo` / `.home-brand` / `.home-phone-wrap`, so reusing it would mean
 * this page silently depended on the marketing site's class names. It shares
 * the same mechanics — ScrollTrigger (which Lenis drives), a fonts.ready gate,
 * reveal-once, and a reduced-motion bail-out.
 *
 * @param booted false while the preloader curtain is still down.
 */
export function useReveal(booted: boolean) {
  // Pre-hide before paint so nothing flashes in behind the curtain.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll<HTMLElement>('[data-animate]')
    if (reduce) {
      els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none' })
      return
    }
    els.forEach((el) => gsap.set(el, { opacity: 0, y: 22 }))
  }, [])

  useEffect(() => {
    if (!booted) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const triggers: ScrollTrigger[] = []

    const run = () => {
      document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            once: true,
            onEnter: () =>
              gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                delay: parseFloat(el.dataset.delay || '0'),
                ease: 'power2.out',
              }),
          })
        )
      })
      ScrollTrigger.refresh()
    }

    // Measure against final metrics, not fallback fonts.
    if (document.fonts?.ready) document.fonts.ready.then(run)
    else run()

    // The hero is deliberately NOT animated: the eyebrow used to arrive after
    // the names, which read as a mistake rather than as choreography. It is
    // simply there when the curtain lifts.

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [booted])
}
