import React from 'react'

import '@/styles/scroll-story.css'

type StorySection = {
  id: string
  label: string
  title: string
  paragraphs: string[]
  phoneImage: string
  background: string
}

const STORY_UNLOCK_KEY = 'story_scroll_unlocked'

const storySections: StorySection[] = [
  {
    id: 'recovery',
    label: 'RECOVERY',
    title: 'Recovery',
    paragraphs: [
      "You don't have to recover alone.",
      'Built for connection.',
      'Designed with intention.',
    ],
    phoneImage: '/assets/1.png',
    background: '/assets/mono-1.svg',
  },
  {
    id: 'origin',
    label: 'ORIGIN',
    title: 'Origin',
    paragraphs: [
      "Hi, I'm Ben.",
      'I had the idea for SobrCircle after seeing someone share a screenshot of their sobriety counter. It was meaningful. But something felt incomplete.',
      "Sobriety isn't just a number. It's connection.",
      "It's having people who understand without explanation. It's celebrating milestones together. It's about not feeling alone in your recovery journey.",
      "I realized there wasn't a space built for that. A private circle. An intentional space. A place to show up honestly.",
      "Since I couldn't find something to fill that space. I decided to build it myself.",
    ],
    phoneImage: '/assets/2.png',
    background: '/assets/mono-2.svg',
  },
  {
    id: 'circles',
    label: 'CIRCLES',
    title: 'Circles',
    paragraphs: [
      "This isn't a social feed.",
      "It's a space designed specifically for recovery.",
      'Your circle is intentional and invite-only.',
      "There's no contact syncing. No searching for people. Every member has a private code they choose to share.",
      'Connection happens on purpose.',
      'Most circles start small based on your core support system. If your support grows, your circle can grow with it.',
    ],
    phoneImage: '/assets/4.png',
    background: '/assets/mono-3.svg',
  },
  {
    id: 'check-in',
    label: 'CHECK-IN',
    title: 'Check-In',
    paragraphs: [
      "Check-Ins are moments of accountability. They're encouragement when someone else needs it. They're quiet strength when you do. Accountability through connection.",
      "Sharing where you're at doesn't just keep you accountable. It may be exactly what someone else needs to read in that moment.",
      "And comments matter here. A comment isn't noise. It's an act of service. A few words can steady someone.",
      'Encouragement compounds. This is a community built on support. On uplifting each other. On staying recovery-focused.',
      "Your notifications aren't noise. They're milestones. They're encouragement. Here we celebrate a different kind of birthday.",
    ],
    phoneImage: '/assets/3.png',
    background: '/assets/mono-4.svg',
  },
  {
    id: 'principles',
    label: 'PRINCIPLES',
    title: 'Principles',
    paragraphs: [
      'Recovery grows through honesty and respect.',
      'No ads. No selling your data. No outside influence shaping the space.',
      'Just people showing up for each other.',
    ],
    phoneImage: '/assets/5.png',
    background: '/assets/mono-5.svg',
  },
  {
    id: 'beta',
    label: 'BETA',
    title: 'Beta',
    paragraphs: [
      "We're preparing to open SobrCircle publicly.",
      "Before we do, we're inviting a small group to help shape it. Spots are limited.",
      "As a beta tester, you'll receive early access to the app. In return, we ask for feedback.",
      "Tell us what broke. Tell us what feels off. Tell us what should exist but doesn't yet.",
      'Help us build this the right way.',
    ],
    phoneImage: '/assets/6.png',
    background: '/assets/mono-6.svg',
  },
]

export default function ScrollStory() {
  const rootRef = React.useRef<HTMLDivElement | null>(null)
  const guidedAnimatingRef = React.useRef(false)
  const [activeSectionId, setActiveSectionId] = React.useState(storySections[0]?.id ?? '')
  const [guidedUnlocked, setGuidedUnlocked] = React.useState(() => {
    if (typeof window === 'undefined') return false
    return window.sessionStorage.getItem(STORY_UNLOCK_KEY) === '1'
  })

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const chapterEls = Array.from(root.querySelectorAll<HTMLElement>('.story-chapter'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (guidedUnlocked || reduceMotion) {
      chapterEls.forEach((el) => el.classList.add('is-visible'))
      return
    }

    if (typeof window.IntersectionObserver === 'undefined') {
      chapterEls.forEach((el) => el.classList.add('is-visible'))
      return
    }

    chapterEls.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('is-visible')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    chapterEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [guidedUnlocked])

  React.useEffect(() => {
    if (guidedUnlocked) return

    const root = rootRef.current
    if (!root) return
    const chapterEls = Array.from(root.querySelectorAll<HTMLElement>('.story-chapter'))
    if (!chapterEls.length) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let touchStartY = 0

    const getStepAnchors = () => {
      const isMobileDock = window.matchMedia('(max-width: 900px)').matches
      const phoneAnchorOffset = isMobileDock ? 112 : 34
      const anchors: number[] = []
      chapterEls.forEach((sectionEl) => {
        const sectionTop = Math.max(0, Math.floor(sectionEl.getBoundingClientRect().top + window.scrollY - 24))
        anchors.push(sectionTop)

        const phoneEl = sectionEl.querySelector<HTMLElement>('.story-phone-wrap')
        if (phoneEl) {
          const phoneTop = Math.max(
            0,
            Math.floor(phoneEl.getBoundingClientRect().top + window.scrollY - phoneAnchorOffset),
          )
          if (phoneTop - sectionTop > 120) {
            anchors.push(phoneTop)
          }
        }
      })

      return Array.from(new Set(anchors)).sort((a, b) => a - b)
    }

    const getCurrentIndex = (anchors: number[]) => {
      const y = window.scrollY + 40
      let idx = -1
      for (let i = 0; i < anchors.length; i++) {
        if (y >= anchors[i]) idx = i
      }
      return idx
    }

    const completeUnlock = () => {
      setGuidedUnlocked(true)
      window.sessionStorage.setItem(STORY_UNLOCK_KEY, '1')
      chapterEls.forEach((el) => el.classList.add('is-visible'))
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      window.scrollTo({ top: bottom, behavior: reduceMotion ? 'auto' : 'smooth' })
    }

    const stepTo = (targetIndex: number) => {
      const anchors = getStepAnchors()
      const last = anchors.length - 1
      const clamped = Math.max(-1, Math.min(targetIndex, last))

      if (clamped > last) return
      if (clamped === last + 1) {
        completeUnlock()
        return
      }

      guidedAnimatingRef.current = true
      const top = clamped < 0 ? 0 : anchors[clamped]
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
      window.setTimeout(() => {
        guidedAnimatingRef.current = false
      }, reduceMotion ? 80 : 1000)
    }

    const advance = (direction: 1 | -1) => {
      if (guidedAnimatingRef.current) return
      const anchors = getStepAnchors()
      const current = getCurrentIndex(anchors)
      const last = anchors.length - 1

      if (direction === 1) {
        if (current >= last) {
          completeUnlock()
          return
        }
        stepTo(current + 1)
        return
      }

      if (current <= -1) {
        stepTo(-1)
        return
      }
      stepTo(current - 1)
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      if (Math.abs(event.deltaY) < 6) return
      advance(event.deltaY > 0 ? 1 : -1)
    }

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.changedTouches[0]?.clientY ?? 0
    }

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault()
    }

    const onTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.clientY ?? touchStartY
      const delta = touchStartY - endY
      if (Math.abs(delta) < 20) return
      advance(delta > 0 ? 1 : -1)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const nextKeys = ['ArrowDown', 'PageDown', ' ']
      const prevKeys = ['ArrowUp', 'PageUp']
      if (nextKeys.includes(event.key)) {
        event.preventDefault()
        advance(1)
      } else if (prevKeys.includes(event.key)) {
        event.preventDefault()
        advance(-1)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [guidedUnlocked])

  React.useEffect(() => {
    const root = rootRef.current
    if (!root || typeof window.IntersectionObserver === 'undefined') return

    const sectionEls = Array.from(root.querySelectorAll<HTMLElement>('.story-chapter[id]'))
    if (!sectionEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const id = (visible[0].target as HTMLElement).id
          if (id) setActiveSectionId(id)
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: '-25% 0px -35% 0px',
      },
    )

    sectionEls.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
    }
  }, [])

  const handleBetaRequest = () => {
    const cleanSubject = 'Beta Testing Request'
    const body = 'Hello, I want to request access to Beta test the SobrCircle App.'

    const href = `mailto:ben@sobrcircle.com?subject=${encodeURIComponent(cleanSubject)}&body=${encodeURIComponent(
      body,
    )}`
    window.location.href = href
  }

  return (
    <div className={`story-page ${guidedUnlocked ? 'story-unlocked' : ''}`} ref={rootRef}>
      <nav className="story-nav" aria-label="Section navigation">
        {storySections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`story-nav-link ${activeSectionId === section.id ? 'is-active' : ''}`}
            aria-current={activeSectionId === section.id ? 'true' : undefined}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <div className="story-vignette" aria-hidden="true" />

      <main className="story-main">
        {storySections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`story-chapter ${section.id === 'beta' ? 'story-chapter--beta' : ''}`}
            style={{ ['--story-bg-image' as never]: `url(${section.background})` }}
          >
            <div className="story-chapter-bg" aria-hidden="true" />

            <div className="story-copy">
              {section.id === 'recovery' && (
                <div className="story-inline-hero">
                  <img
                    className="story-logo story-hero-line"
                    style={{ ['--line-delay' as never]: '180ms' }}
                    src="/assets/circle.png"
                    alt="SobrCircle logo"
                  />
                  <h1 className="story-brand story-hero-line" style={{ ['--line-delay' as never]: '520ms' }}>
                    <span>Sobr</span>
                    <span>Circle</span>
                  </h1>
                  <p className="story-tagline story-hero-line" style={{ ['--line-delay' as never]: '860ms' }}>
                    Built in recovery. For recovery.
                  </p>
                  <p className="story-status-line story-hero-line" style={{ ['--line-delay' as never]: '1220ms' }}>
                    PRIVATE BETA OPENS IN MARCH. PUBLIC LAUNCH IN APRIL.
                  </p>
                </div>
              )}

              <h2
                className="story-chapter-title"
                style={{ ['--line-delay' as never]: section.id === 'recovery' ? '1620ms' : '220ms' }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={[
                    paragraph === 'Your circle is intentional and invite-only.' ? 'story-copy-callout' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    ['--line-delay' as never]: `${
                      (section.id === 'recovery' ? 1920 : 520) + index * 280
                    }ms`,
                  }}
                >
                  {paragraph === 'Built for connection.' ? (
                    <>
                      Built for <span className="story-word-connection">connection</span>.
                    </>
                  ) : paragraph ===
                    "Check-Ins are moments of accountability. They're encouragement when someone else needs it. They're quiet strength when you do. Accountability through connection." ? (
                    <>
                      Check-Ins are moments of accountability. They're encouragement when someone else needs it. They're
                      quiet strength when you do.{' '}
                      <span className="story-word-connection">Accountability through connection.</span>
                    </>
                  ) : paragraph === "Sobriety isn't just a number. It's connection." ? (
                    <span className="story-word-connection">Sobriety isn't just a number. It's connection.</span>
                  ) : paragraph === 'Connection happens on purpose.' ? (
                    <span className="story-word-connection">Connection happens on purpose.</span>
                  ) : paragraph === "Before we do, we're inviting a small group to help shape it. Spots are limited." ? (
                    <>
                      Before we do, we're inviting a small group to help shape it.{' '}
                      <span className="story-word-connection">Spots are limited.</span>
                    </>
                  ) : paragraph ===
                    "And comments matter here. A comment isn't noise. It's an act of service. A few words can steady someone." ? (
                    <>
                      And comments matter here. A comment isn't noise.{' '}
                      <span className="story-word-connection">
                        It's an act of service. A few words can steady someone.
                      </span>
                    </>
                  ) : paragraph ===
                    "Your notifications aren't noise. They're milestones. They're encouragement. Here we celebrate a different kind of birthday." ? (
                    <>
                      <span className="story-word-connection">Your notifications aren't noise.</span> They're milestones.
                      They're encouragement. Here we celebrate a different kind of birthday.
                    </>
                  ) : paragraph ===
                    "Since I couldn't find something to fill that space. I decided to build it myself." ? (
                    <>
                      Since I couldn't find something to fill that space.{' '}
                      <span className="story-word-connection">I decided to build it myself.</span>
                    </>
                  ) : paragraph ===
                    'No ads. No selling your data. No outside influence shaping the space.' ? (
                    <span className="story-word-connection">
                      No ads. No selling your data. No outside influence shaping the space.
                    </span>
                  ) : paragraph ===
                    "As a beta tester, you'll receive early access to the app. In return, we ask for feedback." ? (
                    <span className="story-word-connection">
                      As a beta tester, you'll receive early access to the app. In return, we ask for feedback.
                    </span>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}

              {section.id === 'beta' && (
                <div className="story-beta-form">
                  <button className="story-beta-button" type="button" onClick={handleBetaRequest}>
                    Request Beta Access
                  </button>
                </div>
              )}
            </div>

            {section.id !== 'beta' && (
              <div
                className="story-phone-wrap"
                aria-hidden="true"
                style={{
                  ['--line-delay' as never]: `${Math.min(
                    5200,
                    (section.id === 'recovery' ? 2400 : 980) + section.paragraphs.length * 280,
                  )}ms`,
                }}
              >
                <div className="story-phone-shell">
                  <div className="story-phone-screen">
                    <img src={section.phoneImage} alt="" loading="lazy" />
                  </div>
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      <footer className="story-footer">
        <div className="story-footer-inner">
          <div className="story-footer-brand">
            <img className="story-footer-logo" src="/assets/circle.png" alt="SobrCircle logo" />
            <div>
              <p className="story-footer-name">
                <span>Sobr</span>
                <span>Circle</span>
              </p>
              <p className="story-footer-tagline">Built in recovery. For recovery.</p>
            </div>
          </div>

          <div className="story-footer-links" aria-label="Legal and support links">
            <a href="/support">Support</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/delete-account">Delete Account</a>
          </div>

          <p className="story-footer-note">
            Adults 18+ only. SobrCircle is peer support, not medical care or emergency services.
          </p>
        </div>
      </footer>
    </div>
  )
}
