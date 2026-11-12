import { ChevronDown, ChevronRight } from 'lucide-react'
import { url } from '../site'

export type Chapter = { id: string; label: string }

/**
 * The chapter bar: a sticky strip under the global nav with a progress line that
 * fills from the logo's blue to its green as you read, split into chapters.
 *
 * - Phones (and `label` mode): the current chapter's name and "n of N". Tapping
 *   it opens the Menu sheet, which lists the chapters and the rest of the site.
 * - Laptops (`links` mode): a Home crumb and the page title on the left, the
 *   chapters centred under the main menu. (`cta` is accepted but no longer shown:
 *   the header already carries "Book a call".)
 *
 * The client script (setupChapters) tracks the current chapter, draws the chapter
 * gaps on the line and fills it where CSS scroll timelines aren't supported.
 * Without JavaScript the links still jump to each section.
 */
export function ChapterNav({
  title,
  chapters,
  mode = 'links',
}: {
  title?: string
  chapters: Chapter[]
  mode?: 'links' | 'label'
  cta?: { label: string; href: string } | null
}) {
  const first = title ?? chapters[0]?.label ?? ''
  return (
    <div
      className={`chapnav ${mode === 'label' ? 'chapnav-label-mode' : ''} ${!title ? 'chapnav-centered' : ''}`}
      data-chapnav
      data-chapnav-title={title ?? ''}
    >
      <div className="wrap chapnav-row">
        <a
          href="#menu"
          className="chapnav-current"
          aria-controls="menu"
          aria-expanded="false"
          data-menu-open
          data-track="chapters:open"
        >
          <span className="sr-only">On this page: </span>
          <span className="chapnav-name" data-chapnav-label>
            {first}
          </span>
          <span className="chapnav-count">
            <span data-chapnav-index>1</span> of {chapters.length}
            <span className="sr-only">. Open the chapter list.</span>
          </span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-3" aria-hidden />
        </a>
        {title && (
          <p className="chapnav-title">
            <a href={url()} className="chapnav-home" data-track="chapters:home">
              Home
            </a>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-4" aria-hidden />
            <span className="truncate">{title}</span>
          </p>
        )}
        <nav className="chapnav-links-wrap" aria-label="On this page">
          <ul className="chapnav-links no-scrollbar" data-pill="hover">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="chapnav-link" data-chapter-link={c.id} data-pill-item data-track="chapters:jump">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {title && <span className="chapnav-spacer" aria-hidden="true" />}
      </div>
      <div className="chapnav-bar" aria-hidden="true">
        <span className="chapnav-fill" data-chapnav-fill />
        <span className="chapnav-ticks" data-chapnav-ticks />
      </div>
    </div>
  )
}
