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

    // ── Phone mockups: scroll parallax + 3D tilt on wrap, breathing on shell ──
    // Splitting across elements so no two tweens fight over the same property.
    const isMobile = window.innerWidth < 700
    const phones = document.querySelectorAll<HTMLElement>('.home-phone-wrap')

    phones.forEach((phone, i) => {
      const shell = phone.querySelector<HTMLElement>('.home-phone-shell')
      gsap.set(phone, { transformPerspective: 1200, opacity: 0 })

      // Fade phone in as it scrolls into view — prevents the shell's rounded
      // top edge from rendering as a visible arc at section seams.
      gsap.to(phone, {
        scrollTrigger: {
          trigger: phone,
          start: 'top 92%',
          end: 'top 55%',
          scrub: 1,
        },
        opacity: 1,
        ease: 'none',
      })

      // Scroll-driven parallax + gentle 3D tilt — desktop/tablet only
      // Amplitudes kept small so the image never crops inside the shell.
      if (!isMobile) {
        gsap.fromTo(
          phone,
          { y: 20, rotateX: 4, rotateY: -2 },
          {
            scrollTrigger: {
              trigger: phone,
              start: 'top 95%',
              end: 'bottom 10%',
              scrub: 1.4,
            },
            y: -20,
            rotateX: -3,
            rotateY: 2,
            ease: 'none',
          }
        )
      }

      // Breathing float on the inner shell so it never conflicts with scroll tweens
      if (shell) {
        gsap.to(shell, {
          y: isMobile ? 6 : 10,
          duration: 4.5 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.5,
        })
      }

    })

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
