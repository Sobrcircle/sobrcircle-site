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

    // Hero entrance, played as the curtain lifts.
    const tl = gsap.timeline({ delay: 0.15 })
    const eyebrow = document.querySelector('.ld-hero-eyebrow')
    const name = document.querySelector('.ld-script')
    const rule = document.querySelector('.ld-hero-inner .ld-rule')
    const date = document.querySelector('.ld-hero-date')

    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
    if (name) tl.fromTo(name, { opacity: 0, y: 26, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' }, 0.25)
    if (rule) tl.fromTo(rule, { opacity: 0, scaleX: 0.4 }, { opacity: 1, scaleX: 1, duration: 1.2, ease: 'power2.out' }, 0.9)
    if (date) tl.fromTo(date, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, 1.2)

    return () => {
      triggers.forEach((t) => t.kill())
      tl.kill()
    }
  }, [booted])
}
