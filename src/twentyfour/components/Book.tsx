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
  const [chromeHidden, setChromeHidden] = useState(false)
  const lastScrollY = useRef(0)

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

  // Auto-hide nav/TOC on vertical scroll (Facebook-style)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (!target.classList.contains('book-page')) return
      const currentY = target.scrollTop
      const delta = currentY - lastScrollY.current

      if (delta > 3) {
        // Scrolling down — hide chrome (triggers fast)
        setChromeHidden(true)
      } else if (delta < -3) {
        // Scrolling up — show chrome
        setChromeHidden(false)
      }
      lastScrollY.current = currentY
    }

    container.addEventListener('scroll', handleScroll, { passive: true, capture: true })
    return () => container.removeEventListener('scroll', handleScroll, true)
  }, [containerRef])

  // Reset chrome visibility on page change
  useEffect(() => {
    setChromeHidden(false)
    lastScrollY.current = 0
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
        className={`fixed top-4 left-4 z-[90] p-2 bg-transparent border-none cursor-pointer hover:opacity-100 transition-all duration-300 ease-out touch-manipulation ${
          chromeHidden ? 'opacity-0 pointer-events-none -translate-y-12' : 'opacity-50'
        }`}
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
      <div className={`transition-all duration-300 ease-out ${
        chromeHidden ? 'translate-y-12 opacity-0 pointer-events-none' : ''
      }`}>
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
