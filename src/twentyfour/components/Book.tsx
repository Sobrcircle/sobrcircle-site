import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { pages } from '../data/pages'
import { useBookNavigation } from '../hooks/useBookNavigation'
import { useBookmarks } from '../hooks/useBookmarks'
import CoverPage from './CoverPage'
import ChapterPage from './ChapterPage'
import PoemPage from './PoemPage'
import ProsePage from './ProsePage'
import ClosingPage from './ClosingPage'
import Navigation from './Navigation'
import ProgressBar from './ProgressBar'
import TOCSidebar from './TOCSidebar'

export default function Book() {
  const { containerRef, currentIndex, totalPages, goToNext, goToPrev, goToPage } =
    useBookNavigation()
  const { isBookmarked, toggleBookmark, bookmarks } = useBookmarks()
  const [tocOpen, setTocOpen] = useState(false)
  const [chromeVisible, setChromeVisible] = useState(true)
  const scrollState = useRef({
    lastY: 0,
    velocity: 0,       // smoothed scroll velocity
    intent: 0,         // accumulated directional intent (-1 to 1 scale)
    hidden: false,      // current hide state (avoids re-renders)
    settled: true,      // true when user hasn't scrolled recently
    settleTimer: 0 as ReturnType<typeof setTimeout> | number,
  })

  const currentPage = pages[currentIndex]
  const isDark = currentPage.theme === 'dark'

  // Update theme-color meta tag
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', isDark ? '#0a0a0a' : '#faf8f5')
    }
  }, [isDark])

  // Escape key closes TOC
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tocOpen) {
        setTocOpen(false)
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [tocOpen])

  // Apple-quality auto-hide chrome on vertical scroll
  // Uses velocity smoothing, directional intent accumulation, and hysteresis
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const s = scrollState.current

    const setHidden = (hide: boolean) => {
      if (s.hidden === hide) return
      s.hidden = hide
      setChromeVisible(!hide)
    }

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('book-page')) return

      const currentY = target.scrollTop
      const delta = currentY - s.lastY
      s.lastY = currentY

      // ── iOS elastic overscroll: ignore entirely ──
      if (currentY <= 0) return
      const maxScroll = target.scrollHeight - target.clientHeight
      if (currentY >= maxScroll) return

      // ── At very top of page: always show ──
      if (currentY < 20) {
        s.intent = 0
        s.velocity = 0
        setHidden(false)
        return
      }

      // ── Near bottom: gradually reveal ──
      // Instead of a binary flip, ease chrome in over the last 200px
      const distFromBottom = target.scrollHeight - currentY - target.clientHeight
      if (distFromBottom < 200) {
        // Progress from 0 (at 200px away) to 1 (at bottom)
        const progress = 1 - distFromBottom / 200
        if (progress > 0.3) {
          s.intent = 0
          s.velocity = 0
          setHidden(false)
          return
        }
      }

      // ── Smooth velocity (exponential moving average) ──
      // α = 0.3 gives responsive but smooth tracking
      s.velocity = s.velocity * 0.7 + delta * 0.3

      // ── Accumulate directional intent ──
      // This creates "stickiness" — you need sustained scrolling to trigger
      if (s.velocity > 1.5) {
        // Scrolling down — accumulate hide intent
        s.intent = Math.min(1, s.intent + 0.06)
      } else if (s.velocity < -1.5) {
        // Scrolling up — accumulate show intent (faster to show than hide)
        s.intent = Math.max(-1, s.intent - 0.09)
      } else {
        // Nearly stopped — decay intent toward 0 (neutral)
        s.intent *= 0.95
      }

      // ── Hysteresis thresholds ──
      // Higher threshold to hide (0.6) than to show (0.4)
      // This means quick flicks don't trigger, only deliberate scrolls
      if (s.intent > 0.6) {
        setHidden(true)
      } else if (s.intent < -0.4) {
        setHidden(false)
      }

      // ── Settle detection: show chrome when scrolling stops ──
      clearTimeout(s.settleTimer as ReturnType<typeof setTimeout>)
      s.settled = false
      s.settleTimer = setTimeout(() => {
        s.settled = true
        s.velocity = 0
        s.intent *= 0.5 // soften intent on settle, don't fully reset
      }, 300)
    }

    container.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    return () => {
      container.removeEventListener('scroll', handleScroll, true)
      clearTimeout(s.settleTimer as ReturnType<typeof setTimeout>)
    }
  }, [containerRef])

  // Reset chrome visibility on page change
  useEffect(() => {
    setChromeVisible(true)
    const s = scrollState.current
    s.lastY = 0
    s.velocity = 0
    s.intent = 0
    s.hidden = false
    s.settled = true
  }, [currentIndex])

  const renderPage = useCallback((page: (typeof pages)[number]) => {
    switch (page.type) {
      case 'cover':
        return <CoverPage />
      case 'copyright':
        return (
          <ProsePage
            paragraphs={page.paragraphs || []}
            centered
          />
        )
      case 'prose':
        return (
          <ProsePage
            title={page.title}
            paragraphs={page.paragraphs || []}
          />
        )
      case 'toc':
        return <TOCContent onGoTo={goToPage} bookmarks={bookmarks} />
      case 'chapter':
        return <ChapterPage title={page.title || ''} />
      case 'poem':
        return (
          <PoemPage
            id={page.id}
            chapter={page.chapter || ''}
            title={page.title || ''}
            stanzas={page.stanzas || []}
            poemIndex={page.poemIndex ?? 0}
            chapterPoemCount={page.chapterPoemCount ?? 6}
            isBookmarked={isBookmarked(page.id)}
            onToggleBookmark={() => toggleBookmark(page.id)}
          />
        )
      case 'closing':
        return <ClosingPage />
      default:
        return null
    }
  }, [goToPage, isBookmarked, toggleBookmark, bookmarks])

  return (
    <>
      <ProgressBar current={currentIndex} total={totalPages} />

      {/* TOC toggle button — auto-hides on scroll */}
      <button
        onClick={() => setTocOpen(true)}
        aria-label="Table of contents"
        className={`fixed top-4 left-4 z-[90] p-2 bg-transparent border-none cursor-pointer hover:opacity-100 touch-manipulation ${
          chromeVisible
            ? 'opacity-50 translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-3'
        }`}
        style={{ transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      >
        <Menu size={22} strokeWidth={1.5} color={isDark ? '#e8e4df' : '#1a1a1a'} />
      </button>

      <TOCSidebar
        open={tocOpen}
        onClose={() => setTocOpen(false)}
        currentId={currentPage.id}
        onGoTo={goToPage}
        bookmarks={bookmarks}
      />

      {/* Scroll-snap book container */}
      <div ref={containerRef} className="book-container">
        {pages.map((page) => (
          <div
            key={page.id}
            className={`book-page ${page.theme}`}
            data-page-id={page.id}
          >
            {renderPage(page)}
          </div>
        ))}
      </div>

      {/* Navigation — auto-hides on scroll */}
      <div
        className={chromeVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-3 opacity-0 pointer-events-none'
        }
        style={{ transition: 'opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
      >
        <Navigation
          label={currentPage.label}
          theme={currentPage.theme}
          onPrev={goToPrev}
          onNext={goToNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < totalPages - 1}
          currentPage={currentIndex}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}

// Inline TOC content page component
function TOCContent({ onGoTo, bookmarks }: { onGoTo: (id: string) => void; bookmarks: string[] }) {
  const chapters = [
    { title: 'i. illusion', poems: [
      { id: 'sixteen', name: 'sixteen' }, { id: 'taken', name: 'taken' },
      { id: 'nights', name: 'nights' }, { id: 'again', name: 'again' },
      { id: 'born', name: 'born' }, { id: 'promises', name: 'promises' },
    ]},
    { title: 'ii. pattern', poems: [
      { id: 'enough', name: 'enough' }, { id: 'rehab', name: 'rehab' },
      { id: 'clear', name: 'clear' }, { id: 'bend', name: 'bend' },
      { id: 'gone', name: 'gone' }, { id: 'hollow', name: 'hollow' },
    ]},
    { title: 'iii. realization', poems: [
      { id: 'back', name: 'back' }, { id: 'hidden', name: 'hidden' },
      { id: 'split', name: 'split' }, { id: 'real', name: 'real' },
      { id: 'crash', name: 'crash' }, { id: 'last', name: 'last' },
    ]},
    { title: 'iv. change', poems: [
      { id: 'habit', name: 'habit' }, { id: 'phoenix', name: 'phoenix' },
      { id: 'almost', name: 'almost' }, { id: 'finding', name: 'finding' },
      { id: 'god', name: 'god' }, { id: 'twentyfour', name: 'twenty four' },
    ]},
  ]

  return (
    <div className="page-content top">
      <div className="prose-body text-center">
        <h2 className="!not-italic !tracking-[0.1em] !mb-9 !font-normal">Contents</h2>
        <div className="text-left max-w-[280px] mx-auto">
          {chapters.map((ch) => (
            <div key={ch.title} className="mb-4">
              <p className="italic mb-1 text-[0.9rem]" style={{ color: 'var(--light-muted)' }}>
                {ch.title}
              </p>
              {ch.poems.map((poem) => (
                <p
                  key={poem.id}
                  onClick={() => onGoTo(poem.id)}
                  className="pl-6 mb-[2px] cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  {poem.name}
                  {bookmarks.includes(poem.id) && (
                    <span
                      className="inline-block w-[5px] h-[5px] rounded-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
