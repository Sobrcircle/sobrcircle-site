import React, {
  type CSSProperties,
  type ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import '@/styles/full-screen-scroll-fx.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Section = {
  id?: string
  background: string
  leftLabel?: ReactNode
  title: string | ReactNode
  rightLabel?: ReactNode
  renderBackground?: (active: boolean, previous: boolean) => ReactNode
}

type Colors = Partial<{
  text: string
  overlay: string
  pageBg: string
  stageBg: string
}>

type Durations = Partial<{
  change: number
  snap: number
}>

export type FullScreenFXAPI = {
  next: () => void
  prev: () => void
  goTo: (index: number) => void
  getIndex: () => number
  refresh: () => void
}

export type FullScreenFXProps = {
  sections: Section[]
  className?: string
  style?: CSSProperties
  fontFamily?: string
  header?: ReactNode
  footer?: ReactNode
  gap?: number
  gridPaddingX?: number
  showProgress?: boolean
  debug?: boolean
  durations?: Durations
  reduceMotion?: boolean
  smoothScroll?: boolean
  bgTransition?: 'fade' | 'wipe'
  parallaxAmount?: number
  currentIndex?: number
  onIndexChange?: (index: number) => void
  initialIndex?: number
  colors?: Colors
  apiRef?: React.Ref<FullScreenFXAPI>
  ariaLabel?: string
}

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,
      fontFamily = '"Rubik Wide", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,
      showProgress = true,
      debug = false,
      durations = { change: 0.7, snap: 800 },
      reduceMotion,
      smoothScroll = false,
      bgTransition = 'fade',
      parallaxAmount = 4,
      currentIndex,
      onIndexChange,
      initialIndex = 0,
      colors = {
        text: 'rgba(245,245,245,0.92)',
        overlay: 'rgba(0,0,0,0.22)',
        pageBg: '#ffffff',
        stageBg: '#000000',
      },
      apiRef,
      ariaLabel = 'Full screen scroll slideshow',
    },
    ref,
  ) => {
    const total = sections.length
    const showRightList = sections.some((s) => s.rightLabel !== undefined && s.rightLabel !== null)
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)))
    const isControlled = typeof currentIndex === 'number'
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex

    const fixedRef = useRef<HTMLDivElement | null>(null)
    const fixedSectionRef = useRef<HTMLDivElement | null>(null)

    const bgRefs = useRef<HTMLImageElement[]>([])
    const wordRefs = useRef<HTMLSpanElement[][]>([])

    const leftTrackRef = useRef<HTMLDivElement | null>(null)
    const rightTrackRef = useRef<HTMLDivElement | null>(null)
    const leftItemRefs = useRef<HTMLDivElement[]>([])
    const rightItemRefs = useRef<HTMLDivElement[]>([])

    const progressFillRef = useRef<HTMLDivElement | null>(null)
    const currentNumberRef = useRef<HTMLSpanElement | null>(null)

    const stRef = useRef<ScrollTrigger | null>(null)
    const lastIndexRef = useRef(index)
    const isAnimatingRef = useRef(false)
    const isSnappingRef = useRef(false)
    const pendingTargetRef = useRef<number | null>(null)
    const sectionTopRef = useRef<number[]>([])

    const prefersReduced = useMemo(() => {
      if (typeof window === 'undefined') return false
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])
    const motionOff = reduceMotion ?? prefersReduced

    const tempWordBucket = useRef<HTMLSpanElement[]>([])
    const splitWords = (text: string) => {
      const words = text.split(/\s+/).filter(Boolean)
      return words.map((w, i) => (
        <span className="fx-word-mask" key={i}>
          <span
            className="fx-word"
            ref={(el) => {
              if (el) tempWordBucket.current.push(el)
            }}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))
    }

    const WordsCollector = ({ onReady }: { onReady: () => void }) => {
      useEffect(() => onReady(), [])
      return null
    }

    const computePositions = () => {
      const el = fixedSectionRef.current
      if (!el) return
      const top = el.offsetTop
      const h = el.offsetHeight
      const arr: number[] = []
      for (let i = 0; i < total; i++) arr.push(top + (h * i) / total)
      sectionTopRef.current = arr
    }

    const measureAndCenterLists = (_toIndex = index, _animate = true) => {}

    useLayoutEffect(() => {
      if (typeof window === 'undefined') return
      const fixed = fixedRef.current
      const fs = fixedSectionRef.current
      if (!fixed || !fs || total === 0) return

      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 })
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 })

      wordRefs.current.forEach((words, sIdx) => {
        words.forEach((w) => {
          gsap.set(w, {
            yPercent: sIdx === index ? 0 : 100,
            opacity: sIdx === index ? 1 : 0,
          })
        })
      })

      computePositions()
      measureAndCenterLists(index, false)

      const st = ScrollTrigger.create({
        trigger: fs,
        start: 'top top',
        end: 'bottom bottom',
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (motionOff || isSnappingRef.current) return
          const prog = self.progress
          const target = Math.min(total - 1, Math.floor(prog * total))
          if (target !== lastIndexRef.current) {
            if (isAnimatingRef.current) {
              pendingTargetRef.current = target
            } else {
              goTo(target, false)
            }
          }

          if (progressFillRef.current) {
            const p = (lastIndexRef.current / (total - 1 || 1)) * 100
            progressFillRef.current.style.width = `${p}%`
          }
        },
      })

      stRef.current = st

      if (initialIndex && initialIndex > 0 && initialIndex < total) {
        requestAnimationFrame(() => goTo(initialIndex, false))
      }

      const ro = new ResizeObserver(() => {
        computePositions()
        measureAndCenterLists(lastIndexRef.current, false)
        ScrollTrigger.refresh()
      })
      ro.observe(fs)

      return () => {
        ro.disconnect()
        st.kill()
        stRef.current = null
      }
    }, [total, initialIndex, motionOff, bgTransition, parallaxAmount])

    const changeSection = (to: number) => {
      if (to === lastIndexRef.current || isAnimatingRef.current) return
      const from = lastIndexRef.current
      const down = to > from
      isAnimatingRef.current = true
      lastIndexRef.current = to

      if (!isControlled) setLocalIndex(to)
      onIndexChange?.(to)

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, '0')
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100
        progressFillRef.current.style.width = `${p}%`
      }

      const D = motionOff ? 0.01 : (durations.change ?? 0.7)

      const outWords = wordRefs.current[from] || []
      const inWords = wordRefs.current[to] || []
      if (outWords.length) {
        gsap.to(outWords, {
          yPercent: down ? -100 : 100,
          opacity: 0,
          duration: D * 0.6,
          stagger: down ? 0.03 : -0.03,
          ease: 'power3.out',
        })
      }
      if (inWords.length) {
        gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 })
        gsap.to(inWords, {
          yPercent: 0,
          opacity: 1,
          duration: D,
          stagger: down ? 0.05 : -0.05,
          ease: 'power3.out',
        })
      }

      const prevBg = bgRefs.current[from]
      const newBg = bgRefs.current[to]
      if (bgTransition === 'fade') {
        if (newBg) {
          gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 })
          gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: 'power2.out' })
        }
        if (prevBg) {
          gsap.to(prevBg, {
            opacity: 0,
            yPercent: down ? -parallaxAmount : parallaxAmount,
            duration: D,
            ease: 'power2.out',
          })
        }
      } else {
        if (newBg) {
          gsap.set(newBg, {
            opacity: 1,
            clipPath: down ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)',
            scale: 1,
            yPercent: 0,
          })
          gsap.to(newBg, { clipPath: 'inset(0 0 0 0)', duration: D, ease: 'power3.out' })
        }
        if (prevBg) {
          gsap.to(prevBg, { opacity: 0, duration: D * 0.8, ease: 'power2.out' })
        }
      }

      measureAndCenterLists(to, true)

      leftItemRefs.current.forEach((el, i) => {
        el.classList.toggle('active', i === to)
        const distance = Math.abs(i - to)
        gsap.to(el, {
          opacity: i === to ? 0.98 : 0.34,
          scale: i === to ? 1.04 : 1,
          x: 0,
          letterSpacing: i === to ? '0.155em' : '0.12em',
          filter: i === to ? 'blur(0px)' : 'blur(0.15px)',
          duration: D * 0.75,
          delay: Math.min(0.14, distance * 0.02),
          ease: 'expo.out',
        })
      })
      rightItemRefs.current.forEach((el, i) => {
        el.classList.toggle('active', i === to)
        const distance = Math.abs(i - to)
        gsap.to(el, {
          opacity: i === to ? 0.98 : 0.34,
          scale: i === to ? 1.03 : 1,
          x: 0,
          letterSpacing: i === to ? '0.155em' : '0.12em',
          filter: i === to ? 'blur(0px)' : 'blur(0.15px)',
          duration: D * 0.75,
          delay: Math.min(0.14, distance * 0.02),
          ease: 'expo.out',
        })
      })

      gsap.delayedCall(D, () => {
        isAnimatingRef.current = false
        if (pendingTargetRef.current !== null && pendingTargetRef.current !== lastIndexRef.current) {
          const pendingTarget = pendingTargetRef.current
          pendingTargetRef.current = null
          goTo(pendingTarget, false)
        }
      })
    }

    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1)
      if (withScroll) pendingTargetRef.current = null
      if (withScroll) isSnappingRef.current = true
      changeSection(clamped)

      const pos = sectionTopRef.current[clamped]
      const snapMs = durations.snap ?? 800

      if (withScroll && typeof window !== 'undefined') {
        const behavior: ScrollBehavior = smoothScroll && !motionOff ? 'smooth' : 'auto'
        window.scrollTo({ top: pos, behavior })
        setTimeout(() => {
          isSnappingRef.current = false
        }, snapMs)
      } else {
        isSnappingRef.current = false
      }
    }

    const next = () => goTo(index + 1)
    const prev = () => goTo(index - 1)

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }))

    const handleJump = (i: number) => goTo(i)

    const handleLoadedStagger = () => {
      leftItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: i === index ? 0.98 : 0.34,
            scale: i === index ? 1.04 : 1,
            letterSpacing: i === index ? '0.155em' : '0.12em',
            filter: i === index ? 'blur(0px)' : 'blur(0.15px)',
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: 'expo.out',
          },
        )
      })
      rightItemRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: i === index ? 0.98 : 0.34,
            scale: i === index ? 1.03 : 1,
            letterSpacing: i === index ? '0.155em' : '0.12em',
            filter: i === index ? 'blur(0px)' : 'blur(0.15px)',
            y: 0,
            duration: 0.5,
            delay: 0.2 + i * 0.06,
            ease: 'expo.out',
          },
        )
      })
    }

    useEffect(() => {
      handleLoadedStagger()
      measureAndCenterLists(index, false)
    }, [])

    const cssVars: CSSProperties = {
      ['--fx-font' as never]: fontFamily,
      ['--fx-text' as never]: colors.text ?? 'rgba(245,245,245,0.92)',
      ['--fx-overlay' as never]: colors.overlay ?? 'rgba(0,0,0,0.35)',
      ['--fx-page-bg' as never]: colors.pageBg ?? '#fff',
      ['--fx-stage-bg' as never]: colors.stageBg ?? '#000',
      ['--fx-gap' as never]: `${gap}rem`,
      ['--fx-grid-px' as never]: `${gridPaddingX}rem`,
      ['--fx-row-gap' as never]: '44px',
      ['--fx-sections' as never]: Math.max(1, total),
    }

    return (
      <div
        ref={ref}
        className={['fx', className].filter(Boolean).join(' ')}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        {debug && <div className="fx-debug">Section: {index}</div>}

        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div className="fx-bg" key={s.id ?? i}>
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : (
                      <>
                        <img
                          ref={(el) => {
                            if (el) bgRefs.current[i] = el
                          }}
                          src={s.background}
                          alt=""
                          className="fx-bg-img"
                        />
                        <div className="fx-bg-overlay" />
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div className="fx-grid">
                {header && <div className="fx-header">{header}</div>}

                <div className={`fx-content ${showRightList ? '' : 'fx-content--left-only'}`}>
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? 'active' : ''}`}
                          ref={(el) => {
                            if (el) leftItemRefs.current[i] = el
                          }}
                          onClick={() => handleJump(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="fx-center">
                    {sections.map((s, sIdx) => {
                      tempWordBucket.current = []
                      const isString = typeof s.title === 'string'
                      return (
                        <div key={`C-${s.id ?? sIdx}`} className={`fx-featured ${sIdx === index ? 'active' : ''}`}>
                          {isString ? (
                            <>
                              <h3 className="fx-featured-title">{splitWords(s.title as string)}</h3>
                              <WordsCollector
                                onReady={() => {
                                  if (tempWordBucket.current.length) {
                                    wordRefs.current[sIdx] = [...tempWordBucket.current]
                                  }
                                  tempWordBucket.current = []
                                }}
                              />
                            </>
                          ) : (
                            <div className="fx-featured-custom">{s.title}</div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {showRightList && (
                    <div className="fx-right" role="list">
                      <div className="fx-track" ref={rightTrackRef}>
                        {sections.map((s, i) => (
                          <div
                            key={`R-${s.id ?? i}`}
                            className={`fx-item fx-right-item ${i === index ? 'active' : ''}`}
                            ref={(el) => {
                              if (el) rightItemRefs.current[i] = el
                            }}
                            onClick={() => handleJump(i)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={i === index}
                          >
                            {s.rightLabel}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="fx-footer">
                  {footer && <div className="fx-footer-title">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress">
                      <div className="fx-progress-numbers">
                        <span ref={currentNumberRef}>{String(index + 1).padStart(2, '0')}</span>
                        <span>{String(total).padStart(2, '0')}</span>
                      </div>
                      <div className="fx-progress-bar">
                        <div className="fx-progress-fill" ref={progressFillRef} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  },
)

FullScreenScrollFX.displayName = 'FullScreenScrollFX'
