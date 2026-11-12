/**
 * The interactive building blocks, prerendered as plain HTML and brought to
 * life by src/client/main.ts:
 *
 *   Sheet      a detail panel that opens over the page (native <dialog>), so a
 *              visitor reads more without leaving where they are.
 *   Scroller   a sideways row of cards that runs off the right edge, with
 *              arrows on laptops and swipe on phones.
 *   Tabs       pill tabs that swap a panel in place, with a highlight that
 *              slides between them.
 *
 * Without JavaScript: sheet openers are ordinary links to the full page, a
 * scroller still scrolls, and every tab panel is shown one after another.
 */
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'

/* ---- Sheet --------------------------------------------------------------- */
export function Sheet({
  id,
  eyebrow,
  title,
  children,
  more,
}: {
  id: string
  eyebrow: string
  title: ReactNode
  children: ReactNode
  /** The full page for this topic, linked at the foot of the sheet. */
  more?: { label: string; href: string }
}) {
  return (
    <dialog id={id} className="dlg" aria-labelledby={`${id}-title`} data-dialog-el>
      <div className="dlg-panel" data-dialog-panel>
        <div className="dlg-bar" data-dialog-grab>
          <span className="dlg-grab" aria-hidden="true" />
          <form method="dialog">
            <button className="dlg-close" aria-label="Close" data-dialog-close>
              <X className="h-[18px] w-[18px]" strokeWidth={2.6} aria-hidden />
            </button>
          </form>
        </div>
        <div className="dlg-body" tabIndex={-1} autoFocus>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-2 max-w-[40rem] text-display-md">
            {title}
          </h2>
          {children}
          {more && (
            <p className="mt-9 border-t border-line-soft pt-6">
              <a href={more.href} className="link-more" data-track={`sheet:${id}:more`}>
                {more.label}
              </a>
            </p>
          )}
        </div>
      </div>
    </dialog>
  )
}

/** A gray tile inside a sheet, Apple-style: a bold lead-in, then the detail. */
export function SheetTile({ lead, children, className = '' }: { lead?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-4xl bg-canvas-alt p-6 sm:p-8 ${className}`}>
      <div className="text-[1.0625rem] leading-relaxed text-ink-3 sm:text-[1.1875rem]">
        {lead && <strong className="font-semibold text-ink">{lead} </strong>}
        {children}
      </div>
    </div>
  )
}

/* ---- Scroller ------------------------------------------------------------ */
export function ScrollerArrows({ className = '' }: { className?: string }) {
  return (
    <div className={`hidden gap-2.5 md:flex ${className}`}>
      <button type="button" className="paddle" data-scroller-prev aria-label="Previous" disabled>
        <ChevronLeft className="h-5 w-5" strokeWidth={2.4} aria-hidden />
      </button>
      <button type="button" className="paddle" data-scroller-next aria-label="Next">
        <ChevronRight className="h-5 w-5" strokeWidth={2.4} aria-hidden />
      </button>
    </div>
  )
}

/* ---- Highlight card (opens a Sheet) --------------------------------------- */
export function HighlightCard({
  sheet,
  href,
  eyebrow,
  title,
  tone = 'light',
  children,
}: {
  /** The id of the Sheet this card opens. */
  sheet: string
  /** Where the card goes without JavaScript: the full page for this topic. */
  href: string
  eyebrow: string
  title: ReactNode
  tone?: 'light' | 'dark' | 'blue'
  children: ReactNode
}) {
  return (
    <li className="hcard-item">
      <a href={href} className={`hcard hcard-${tone} spot`} data-dialog={sheet} aria-haspopup="dialog" data-track={`highlight:${sheet}`}>
        <div className="hcard-copy">
          <p className="hcard-eyebrow">{eyebrow}</p>
          <h3 className="hcard-title">{title}</h3>
        </div>
        <div className="hcard-visual">{children}</div>
        <span className="hcard-plus">
          <Plus className="h-5 w-5" strokeWidth={2.6} aria-hidden />
          <span className="sr-only">Read more</span>
        </span>
      </a>
    </li>
  )
}

/* ---- Tabs ---------------------------------------------------------------- */
export type TabDef = { key: string; label: ReactNode }

/** A row of pill tabs. Panels are <TabPanel>s inside the same data-tabs-root. */
export function TabRow({ name, tabs, label, className = '' }: { name: string; tabs: TabDef[]; label: string; className?: string }) {
  return (
    <div className={`tabrow no-scrollbar ${className}`} role="tablist" aria-label={label} data-tabs={name} data-pill>
      {tabs.map((t, idx) => (
        <button
          key={t.key}
          type="button"
          role="tab"
          id={`${name}-tab-${t.key}`}
          aria-selected={idx === 0}
          aria-controls={`${name}-panel-${t.key}`}
          tabIndex={idx === 0 ? 0 : -1}
          className="tabrow-tab"
          data-tab={t.key}
          data-pill-item
          data-track={`tab:${name}:${t.key}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function TabPanel({ name, tab, first = false, className = '', children }: { name: string; tab: string; first?: boolean; className?: string; children: ReactNode }) {
  return (
    <div role="tabpanel" id={`${name}-panel-${tab}`} aria-labelledby={`${name}-tab-${tab}`} className={`tabpanel ${className}`} data-tab-panel={tab} hidden={!first} tabIndex={-1}>
      {children}
    </div>
  )
}
