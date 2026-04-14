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

    // ── Phone mockup parallax float (desktop/tablet only) ──
    const isMobile = window.innerWidth < 700
    if (!isMobile) {
      const phones = document.querySelectorAll<HTMLElement>('.home-phone-wrap')
      phones.forEach((phone) => {
        gsap.set(phone, { y: 10 })

        gsap.to(phone, {
          scrollTrigger: {
            trigger: phone,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 1.5,
          },
          y: -4,
          ease: 'none',
        })
      })
    }

    // ── Hero branding special entrance ──
    const heroLogo = document.querySelector('.home-logo')
    const heroBrand = document.querySelector('.home-brand')
    const heroTagline = document.querySelector('.home-tagline')

    if (heroLogo && heroBrand && heroTagline) {
      const heroTl = gsap.timeline({ delay: 0.3 })

      // Logo: dramatic scale up then settle back
      heroTl
        .fromTo(heroLogo,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1.35, duration: 1, ease: 'power2.out' }
        )
        .to(heroLogo,
          { scale: 1, duration: 0.8, ease: 'power2.inOut' }
        )
        // Brand text starts appearing during the logo overshoot
        .fromTo(heroBrand,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          0.6 // absolute time — starts while logo is still big
        )
        // Tagline fades in as logo settles
        .fromTo(heroTagline,
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: 'power2.out' },
          1.1
        )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}
