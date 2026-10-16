import { ChevronDown } from 'lucide-react'
import { site } from '../site'

export type Chapter = { id: string; label: string }

/**
 * The chapter bar: a sticky strip under the global nav with a progress line that
 * fills from the logo's blue to its green as you read, split into chapters.
 *
 * - Phones (and `label` mode): the current chapter's name and "n of N". Tapping
 *   it opens the Menu sheet, which lists the chapters and the rest of the site.
 * - Laptops (`links` mode): the page title, every chapter as a link, and Start free.
 *
 * The client script (setupChapters) tracks the current chapter, draws the chapter
 * gaps on the line and fills it where CSS scroll timelines aren't supported.
 * Without JavaScript the links still jump to each section.
 */
export function ChapterNav({
  title,
  chapters,
  mode = 'links',
  cta = { label: 'Start free', href: site.app.signup },
}: {
  title?: string
  chapters: Chapter[]
  mode?: 'links' | 'label'
  cta?: { label: string; href: string } | null
}) {
  const first = title ?? chapters[0]?.label ?? ''
  return (
    <div
      className={`chapnav ${mode === 'label' ? 'chapnav-label-mode' : ''} ${!title && !cta ? 'chapnav-centered' : ''}`}
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
        {title && <p className="chapnav-title">{title}</p>}
        <nav className="chapnav-links-wrap" aria-label="On this page">
          <ul className="chapnav-links no-scrollbar">
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="chapnav-link" data-chapter-link={c.id} data-track="chapters:jump">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {cta && (
          <a href={cta.href} className="btn-primary btn-sm chapnav-cta" data-track="start-free:chapters">
            {cta.label}
          </a>
        )}
      </div>
      <div className="chapnav-bar" aria-hidden="true">
        <span className="chapnav-fill" data-chapnav-fill />
        <span className="chapnav-ticks" data-chapnav-ticks />
      </div>
    </div>
  )
}
