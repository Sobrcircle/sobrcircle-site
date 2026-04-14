import { useCallback, useEffect, useRef, useState } from 'react'
import { pages } from '../data/pages'

const BASE_PATH = '/twentyfour'

// Extract a page id from a pathname like /twentyfour/sixteen → "sixteen"
function pageIdFromPath(pathname: string): string {
  let p = pathname
  if (p.startsWith(BASE_PATH)) p = p.slice(BASE_PATH.length)
  p = p.replace(/^\/+/, '').replace(/\/+$/, '')
  // Strip trailing "index.html" just in case
  p = p.replace(/\/?index\.html$/, '')
  return p
}

function pathForPage(id: string): string {
  if (!id || id === 'cover') return `${BASE_PATH}/`
  return `${BASE_PATH}/${id}`
}

export function useBookNavigation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalPages = pages.length
  const scrollingRef = useRef(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Get initial page from URL path (with legacy hash fallback)
  const getInitialIndex = useCallback(() => {
    // Real-path routing first
    const idFromPath = pageIdFromPath(window.location.pathname)
    if (idFromPath) {
      const idx = pages.findIndex((p) => p.id === idFromPath)
      if (idx >= 0) return idx
    }
    // Legacy hash fallback so old shared links still work
    const hash = window.location.hash.slice(1)
    if (hash) {
      const idx = pages.findIndex((p) => p.id === hash)
      if (idx >= 0) {
        // Rewrite hash URL to real path
        window.history.replaceState(null, '', pathForPage(hash))
        return idx
      }
    }
    return 0
  }, [])

  // Scroll to a specific page index
  const goToIndex = useCallback(
    (i: number, smooth = true) => {
      if (i < 0 || i >= totalPages) return
      const el = containerRef.current
      if (!el) return
      scrollingRef.current = true
      el.scrollTo({
        left: i * el.clientWidth,
        behavior: smooth ? 'smooth' : 'instant',
      })
      setCurrentIndex(i)
      const page = pages[i]
      window.history.replaceState(null, '', pathForPage(page.id))
      try {
        localStorage.setItem('tf_pos', page.id)
      } catch {}
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        scrollingRef.current = false
      }, 400)
    },
    [totalPages],
  )

  const goToNext = useCallback(() => goToIndex(currentIndex + 1), [currentIndex, goToIndex])
  const goToPrev = useCallback(() => goToIndex(currentIndex - 1), [currentIndex, goToIndex])
  const goToPage = useCallback(
    (id: string) => {
      const idx = pages.findIndex((p) => p.id === id)
      if (idx >= 0) goToIndex(idx)
    },
    [goToIndex],
  )

  // Track scroll position to determine current page
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (scrollingRef.current) return
        const idx = Math.round(el.scrollLeft / el.clientWidth)
        const clamped = Math.max(0, Math.min(totalPages - 1, idx))
        setCurrentIndex((prev) => {
          if (prev !== clamped) {
            const page = pages[clamped]
            window.history.replaceState(null, '', pathForPage(page.id))
            try {
              localStorage.setItem('tf_pos', page.id)
            } catch {}
          }
          return clamped
        })
      })
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [totalPages])

  // Keyboard navigation
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrev()
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goToNext, goToPrev])

  // Handle resize / orientation change — re-snap
  useEffect(() => {
    const handle = () => {
      const el = containerRef.current
      if (!el) return
      el.scrollTo({ left: currentIndex * el.clientWidth, behavior: 'instant' })
    }
    window.addEventListener('resize', handle)
    return () => window.removeEventListener('resize', handle)
  }, [currentIndex])

  // Back/forward buttons — sync to URL
  useEffect(() => {
    const handle = () => {
      const id = pageIdFromPath(window.location.pathname)
      if (id) {
        const idx = pages.findIndex((p) => p.id === id)
        if (idx >= 0 && idx !== currentIndex) goToIndex(idx)
      } else if (currentIndex !== 0) {
        goToIndex(0)
      }
    }
    window.addEventListener('popstate', handle)
    return () => window.removeEventListener('popstate', handle)
  }, [currentIndex, goToIndex])

  // Initial scroll on mount
  useEffect(() => {
    const idx = getInitialIndex()
    if (idx > 0) {
      requestAnimationFrame(() => {
        goToIndex(idx, false)
      })
    }
  }, [getInitialIndex, goToIndex])

  return {
    containerRef,
    currentIndex,
    totalPages,
    goToNext,
    goToPrev,
    goToIndex,
    goToPage,
  }
}
