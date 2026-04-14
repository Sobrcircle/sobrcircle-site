import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(booted: boolean = true) {
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

    // ── Fade-in reveals for text/phone blocks ──
    // IntersectionObserver (not ScrollTrigger) so it fires reliably on mobile
    // regardless of Lenis smooth-scroll state or touch event handling.
    const animElements = document.querySelectorAll<HTMLElement>('[data-animate]')
    animElements.forEach((el) => { gsap.set(el, { opacity: 0 }) })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          const delay = parseFloat(el.dataset.delay || '0')
          gsap.to(el, {
            opacity: 1,
            duration: 1.0,
            delay,
            ease: 'power2.out',
          })
          io.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.01 }
    )
    animElements.forEach((el) => io.observe(el))

    // ── Phone mockups: scroll parallax + 3D tilt on wrap, breathing on shell ──
    // Splitting across elements so no two tweens fight over the same property.
    const isMobile = window.innerWidth < 700
    const phones = document.querySelectorAll<HTMLElement>('.home-phone-wrap')

    const phoneIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
          })
          phoneIo.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.01 }
    )

    phones.forEach((phone, i) => {
      const shell = phone.querySelector<HTMLElement>('.home-phone-shell')
      gsap.set(phone, { transformPerspective: 1200, opacity: 0, scale: 0.92 })

      // Populate reveal — phone fades + scales in when the section enters view.
      // IntersectionObserver for mobile reliability (Lenis's touch passthrough
      // can leave ScrollTrigger idle).
      phoneIo.observe(phone)

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

    // Pre-hide hero branding so it stays dark behind the curtain — the
    // booted-gated effect below fires the entrance when the preloader lifts.
    const heroLogo = document.querySelector('.home-logo')
    const heroBrand = document.querySelector('.home-brand')
    const heroTagline = document.querySelector('.home-tagline')
    if (heroLogo) gsap.set(heroLogo, { opacity: 0, scale: 0 })
    if (heroBrand) gsap.set(heroBrand, { opacity: 0, y: 16 })
    if (heroTagline) gsap.set(heroTagline, { opacity: 0 })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      io.disconnect()
      phoneIo.disconnect()
    }
  }, [])

  // ── Hero branding entrance — only after the preloader curtain lifts ──
  useEffect(() => {
    if (!booted) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const heroLogo = document.querySelector('.home-logo')
    const heroBrand = document.querySelector('.home-brand')
    const heroTagline = document.querySelector('.home-tagline')
    if (!heroLogo || !heroBrand || !heroTagline) return

    const heroTl = gsap.timeline({ delay: 0.1 })
    heroTl
      .fromTo(heroLogo,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1.35, duration: 1, ease: 'power2.out' }
      )
      .to(heroLogo,
        { scale: 1, duration: 0.8, ease: 'power2.inOut' }
      )
      .fromTo(heroBrand,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        0.6
      )
      .fromTo(heroTagline,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power2.out' },
        1.1
      )

    return () => { heroTl.kill() }
  }, [booted])
}
