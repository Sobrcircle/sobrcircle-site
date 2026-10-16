import { ArrowUpRight, ChevronDown, Search, X } from 'lucide-react'
import { site, url } from '../site'
import { footerColumns, productMenu, resourcesMenu, type NavGroup, type NavLink } from '../content/nav'
import { alert } from '../content/alert'
import { jobs } from '../content/jobs'
import { Logo } from './Logo'

function linkHref(l: NavLink): string {
  return l.path !== undefined ? url(l.path) : (l.href ?? '#')
}

function isExternal(l: NavLink): boolean {
  return l.path === undefined && !!l.href
}

function Flyout({ id, groups }: { id: string; groups: NavGroup[] }) {
  return (
    <div id={id} className="flyout" data-open="false" data-flyout-panel>
      <div className="wrap grid grid-cols-[1.4fr_1fr_1fr] gap-12 pb-14 pt-10">
        {groups.map((g) => (
          <div key={g.heading}>
            <p className="mb-3 text-[0.75rem] font-medium text-ink-3">{g.heading}</p>
            <ul className={g.large ? 'space-y-2.5' : 'space-y-2'}>
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={linkHref(l)}
                    className={
                      g.large
                        ? 'block font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-ink hover:text-brand'
                        : 'inline-flex items-center gap-1 text-[0.875rem] font-medium text-ink-2 hover:text-brand'
                    }
                    {...(isExternal(l) ? { rel: 'noopener' } : {})}
                  >
                    {l.label}
                    {isExternal(l) && <ArrowUpRight className="h-3.5 w-3.5 opacity-50" aria-hidden />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PreviewBar() {
  return (
    <div className="preview-bar bg-brand-ink text-[0.75rem] leading-snug text-white/80">
      <div className="wrap flex min-h-[34px] items-center justify-center gap-2 py-1.5 text-center">
        <span>
          <strong className="font-semibold text-white">Concept preview</strong> of a redesigned LandlordEzy website. Not the
          live site.
        </span>
        <a href={site.app.live} className="whitespace-nowrap font-medium">
          Visit landlordezy.ca ›
        </a>
      </div>
    </div>
  )
}

export function GlobalNav({ current }: { current: string }) {
  const top = (path: string) => (current === path || (path !== '' && current.startsWith(path)) ? 'page' : undefined)
  const productPaths = ['product/', 'rent-collection/', 'tenant-screening/', 'notices/', 'rent-reporting/', 'leases/', 'listings/', 'maintenance/', 'ezy-ai/', 'legal-help/']
  const inProduct = productPaths.includes(current)
  const inResources = current.startsWith('guides/') || current.startsWith('tools/')
  return (
    <>
      <nav className="gnav" aria-label="Main">
        <div className="wrap flex h-full items-center justify-between gap-4">
          <a href={url()} className="-ml-1 rounded-lg p-1" aria-label="LandlordEzy home">
            <Logo />
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex">
            <li data-flyout-item>
              <a
                href={url('product/')}
                className="gnav-link inline-flex items-center gap-1"
                aria-current={inProduct ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="fly-product"
                data-flyout="fly-product"
              >
                Product <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
              </a>
              <Flyout id="fly-product" groups={productMenu} />
            </li>
            <li>
              <a href={url('pricing/')} className="gnav-link" aria-current={top('pricing/')}>
                Pricing
              </a>
            </li>
            <li>
              <a href={url('property-managers/')} className="gnav-link" aria-current={top('property-managers/')}>
                Property managers
              </a>
            </li>
            <li data-flyout-item>
              <a
                href={url('guides/')}
                className="gnav-link inline-flex items-center gap-1"
                aria-current={inResources ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="fly-resources"
                data-flyout="fly-resources"
              >
                Resources <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
              </a>
              <Flyout id="fly-resources" groups={resourcesMenu} />
            </li>
            <li>
              <a href={url('about/')} className="gnav-link" aria-current={top('about/')}>
                About
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <a href={site.app.login} className="gnav-link hidden lg:inline-flex">
              Sign in
            </a>
            <a href="#menu" className="menu-pill lg:hidden" aria-controls="menu" aria-expanded="false" data-menu-open data-track="menu:open">
              Menu <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            </a>
            <a href={site.app.signup} className="btn-primary btn-sm" data-track="start-free:nav">
              Start free
            </a>
          </div>
        </div>
      </nav>
      <div className="scrim" data-open="false" data-scrim aria-hidden="true" />
    </>
  )
}

/** The slim rule-change line under the header (content/alert.ts). Scrolls away with the page. */
export function AlertBar({ current }: { current: string }) {
  if (!alert || current === alert.link.path) return null
  return (
    <aside className="alertbar" aria-label="Rule change">
      <p className="wrap flex min-h-[36px] flex-wrap items-center justify-center gap-x-2 gap-y-0.5 py-1.5 text-center text-[0.75rem] leading-snug sm:text-[0.8125rem]">
        <span className="chip-brand hidden !bg-white sm:inline-flex">{alert.label}</span>
        <span className="text-ink-2">
          <strong className="font-semibold text-ink sm:hidden">{alert.label}: </strong>
          {alert.text}
        </span>
        <a href={url(alert.link.path)} className="whitespace-nowrap font-semibold" data-track="alert">
          {alert.link.label} ›
        </a>
      </p>
    </aside>
  )
}

const goTo: { label: string; path?: string; href?: string }[] = [
  { label: 'Product', path: 'product/' },
  { label: 'Pricing', path: 'pricing/' },
  { label: 'Property managers', path: 'property-managers/' },
  { label: 'Free calculators', path: 'tools/' },
  { label: 'Ontario guides', path: 'guides/' },
  { label: 'Live demo', path: 'demo/' },
  { label: 'About', path: 'about/' },
  { label: 'Sign in', href: site.app.login },
]

/**
 * The Menu: one bottom sheet instead of a hamburger list. Search answers "what do
 * you need to do?", the page's chapters sit under "On this page", and the main
 * pages under "Go to". It opens from the Menu button or the chapter bar, closes
 * with a swipe down, the Back gesture, Escape or a tap outside, and works without
 * JavaScript through :target (search and chapters need the script and stay hidden
 * without it).
 */
export function MenuSheet() {
  return (
    <div
      id="menu"
      className="sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="menu-title"
      data-open="false"
      data-sheet
      data-base={site.base}
      data-ask={site.app.askEzy}
    >
      <a href="#" className="sheet-scrim" tabIndex={-1} aria-hidden="true" data-menu-close />
      <div className="sheet-panel" data-sheet-panel>
        <div className="sheet-grab" data-sheet-grab aria-hidden="true">
          <span />
        </div>
        <div className="sheet-head" data-sheet-grab>
          <h2 id="menu-title" className="font-display text-[1.25rem] font-semibold tracking-[-0.015em]">
            Menu
          </h2>
          <a href="#" className="sheet-close" aria-label="Close menu" data-menu-close>
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </a>
        </div>
        <div className="sheet-body" data-sheet-body>
          <form role="search" className="sheet-search" data-sheet-search hidden>
            <label htmlFor="sheet-q" className="sr-only">
              Search LandlordEzy
            </label>
            <Search className="h-[18px] w-[18px] shrink-0 text-ink-3" aria-hidden />
            <input
              id="sheet-q"
              name="q"
              type="search"
              placeholder="What do you need to do?"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              enterKeyHint="search"
              aria-controls="sheet-results"
            />
          </form>
          <div className="sheet-suggest" data-sheet-suggest>
            {jobs.map((j) => (
              <a key={j.key} href={url(j.path)} data-track={`menu:job:${j.key}`}>
                {j.label}
              </a>
            ))}
          </div>
          <div id="sheet-results" className="sheet-results" data-sheet-results aria-live="polite" hidden />

          <div data-sheet-chapters hidden>
            <p className="sheet-label">On this page</p>
            <ol className="sheet-chapters" data-sheet-chapter-list />
          </div>

          <p className="sheet-label">Go to</p>
          <ul className="sheet-go">
            {goTo.map((l) => (
              <li key={l.label}>
                <a href={l.path !== undefined ? url(l.path) : l.href} data-track={`menu:go:${l.label.toLowerCase().replace(/\s+/g, '-')}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="sheet-foot">
          <a href={site.app.signup} className="btn-primary w-full" data-track="start-free:menu">
            Start free
          </a>
          <p className="mt-2 text-center text-[0.75rem] text-ink-4">Free for 2 tenants · No card · About 30 seconds</p>
        </div>
      </div>
    </div>
  )
}

export function MobileCTA() {
  return (
    <aside className="mcta" data-mcta aria-label="Get started" aria-hidden="true">
      <div className="flex items-center gap-2 rounded-full bg-white/85 p-1.5 shadow-float ring-1 ring-black/5 backdrop-blur-xl">
        <a href={url('pricing/')} className="btn btn-sm flex-1 text-ink" tabIndex={-1} data-track="pricing:sticky">
          See pricing
        </a>
        <a href={site.app.signup} className="btn-primary btn-sm flex-[1.4]" tabIndex={-1} data-track="start-free:sticky">
          Start free · no card
        </a>
      </div>
    </aside>
  )
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  const all = [{ name: 'Home', path: '' }, ...trail]
  return (
    <nav aria-label="Breadcrumb" className="wrap pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-3">
        {all.map((c, idx) => (
          <li key={c.path} className="flex items-center gap-1.5">
            {idx > 0 && <span aria-hidden>›</span>}
            {idx === all.length - 1 ? (
              <span aria-current="page" className="text-ink-2">
                {c.name}
              </span>
            ) : (
              <a href={url(c.path)} className="text-ink-3 hover:text-ink">
                {c.name}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-canvas-alt text-[0.8125rem] text-ink-3">
      <div className="wrap py-10 md:py-14">
        {/* Open by default; on phones the script folds each group into a tap-to-open row. */}
        <div className="divide-y divide-line md:grid md:grid-cols-5 md:gap-x-6 md:divide-y-0">
          {footerColumns.map((col) => (
            <details key={col.heading} className="fgroup" open data-footer-group>
              <summary className="fgroup-head">
                <h2 className="font-sans text-[0.8125rem] font-semibold text-ink-2">{col.heading}</h2>
                <ChevronDown className="fgroup-icon h-4 w-4 text-ink-3" aria-hidden />
              </summary>
              <ul className="space-y-2.5 pb-5 md:pb-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={linkHref(l)} className="text-ink-3 hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-line pt-8 leading-relaxed md:mt-12">
          <p>
            LandlordEzy is software and general information for Ontario landlords, not legal advice. Paralegal services are
            delivered by licensed Ontario paralegals. Tenant placement and MLS® listings are provided by List It Realty
            Brokerage Inc., a licensed Ontario real estate brokerage.
          </p>
          <p>
            Equifax is a registered trademark of Equifax Inc. Interac and Interac e-Transfer are registered trademarks of
            Interac Corp. MLS® and REALTOR.ca are trademarks of The Canadian Real Estate Association. Interface images are
            illustrative. Prices are in Canadian dollars; HST is added at checkout.
          </p>
          {site.preview && (
            <p className="text-ink-4">
              This page is a concept design for LandlordEzy, hosted as a preview. The live service is at{' '}
              <a href={site.app.live}>landlordezy.ca</a>.
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.legalName} Built in Ontario.{' '}
            <a href={`tel:${site.phone.tel}`} className="text-ink-3 hover:text-ink">
              {site.phone.display}
            </a>
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a href={site.app.terms} className="text-ink-3 hover:text-ink">
                Terms
              </a>
            </li>
            <li>
              <a href={site.app.privacy} className="text-ink-3 hover:text-ink">
                Privacy
              </a>
            </li>
            <li>
              <a href={url('trust/')} className="text-ink-3 hover:text-ink">
                Trust &amp; privacy
              </a>
            </li>
            <li>
              <a href={url('contact/')} className="text-ink-3 hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
