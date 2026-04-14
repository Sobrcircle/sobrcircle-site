import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.filter = 'none'
      })
      return
    }

    // ── Fade-up reveals for text elements ──
    const animElements = document.querySelectorAll<HTMLElement>('[data-animate]')
    animElements.forEach((el) => {
      const delay = parseFloat(el.dataset.delay || '0')

      gsap.set(el, { opacity: 0, y: 32 })

      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay,
        ease: 'power2.out',
      })
    })

    // ── Phone mockup parallax float ──
    const phones = document.querySelectorAll<HTMLElement>('.home-phone-wrap')
    phones.forEach((phone) => {
      gsap.set(phone, { y: 50 })

      gsap.to(phone, {
        scrollTrigger: {
          trigger: phone,
          start: 'top 95%',
          end: 'top 20%',
          scrub: 1.5,
        },
        y: -15,
        ease: 'none',
      })
    })

    // ── Hero branding special entrance ──
    const heroLogo = document.querySelector('.home-logo')
    const heroBrand = document.querySelector('.home-brand')
    const heroTagline = document.querySelector('.home-tagline')

    if (heroLogo && heroBrand && heroTagline) {
      const heroTl = gsap.timeline({ delay: 0.2 })

      heroTl
        .fromTo(heroLogo,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
        )
        .fromTo(heroBrand,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.7'
        )
        .fromTo(heroTagline,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
