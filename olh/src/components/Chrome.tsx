import { ArrowUpRight, ChevronDown, Phone, Search, X } from 'lucide-react'
import { site, url } from '../site'
import { footerColumns, plansMenu, resourcesMenu, type NavGroup, type NavLink } from '../content/nav'
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
          <strong className="font-semibold text-white">Design preview</strong>
          <span className="sm:hidden"> · proposed pages and pricing</span>
          <span className="hidden sm:inline"> for team review. Proposed pages and pricing, not current terms or a contract.</span>
        </span>
        <a href={site.live.home} className="hidden whitespace-nowrap font-medium sm:inline">
          Live site ›
        </a>
      </div>
    </div>
  )
}

export function GlobalNav({ current }: { current: string }) {
  const top = (path: string) => (current === path ? 'page' : undefined)
  const inPlans = current === 'landlord-shield/'
  return (
    <>
      <nav className="gnav" aria-label="Main">
        <div className="wrap flex h-full items-center justify-between gap-4">
          <a href={url()} className="-ml-1 rounded-lg p-1" aria-label="OLH Property Management home">
            <Logo />
          </a>
          <ul className="hidden items-center gap-0.5 lg:flex" data-pill="hover">
            <li data-flyout-item>
              <a
                href={url('landlord-shield/')}
                className="gnav-link inline-flex items-center gap-1"
                data-pill-item
                aria-current={inPlans ? 'page' : undefined}
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="fly-plans"
                data-flyout="fly-plans"
              >
                Plans <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
              </a>
              <Flyout id="fly-plans" groups={plansMenu} />
            </li>
            <li>
              <a href={url('pricing/')} className="gnav-link" data-pill-item aria-current={top('pricing/')}>
                Pricing
              </a>
            </li>
            <li>
              <a href={url('legal/')} className="gnav-link" data-pill-item aria-current={top('legal/')}>
                Legal help
              </a>
            </li>
            <li>
              <a href={url('rentals/')} className="gnav-link" data-pill-item aria-current={top('rentals/')}>
                Rentals
              </a>
            </li>
            <li data-flyout-item>
              <a
                href={site.live.selfHelp}
                className="gnav-link inline-flex items-center gap-1"
                data-pill-item
                aria-haspopup="true"
                aria-expanded="false"
                aria-controls="fly-resources"
                data-flyout="fly-resources"
              >
                Resources <ChevronDown className="h-3 w-3 opacity-60" aria-hidden />
              </a>
              <Flyout id="fly-resources" groups={resourcesMenu} />
            </li>
          </ul>
          <div className="flex items-center gap-2">
            <a href={`tel:${site.phone.tel}`} className="gnav-link hidden items-center gap-1.5 xl:inline-flex" data-track="call:nav">
              <Phone className="h-3.5 w-3.5" aria-hidden /> {site.phone.display}
            </a>
            <a href={site.live.login} className="gnav-link hidden lg:inline-flex">
              Log in
            </a>
            <a href="#menu" className="menu-pill lg:hidden" aria-controls="menu" aria-expanded="false" data-menu-open data-track="menu:open">
              Menu <ChevronDown className="menu-pill-icon h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
            </a>
            <a href={site.live.book} className="btn-primary btn-sm" data-track="book-call:nav">
              Book a call
            </a>
          </div>
        </div>
      </nav>
      <div className="scrim" data-open="false" data-scrim aria-hidden="true" />
    </>
  )
}

const goTo: { label: string; path?: string; href?: string }[] = [
  { label: 'Pricing', path: 'pricing/' },
  { label: 'Landlord Shield', path: 'landlord-shield/' },
  { label: 'Legal help', path: 'legal/' },
  { label: 'Rentals & leasing', path: 'rentals/' },
  { label: 'Self-help centre', href: site.live.selfHelp },
  { label: 'SIREG owners', href: site.live.sireg },
  { label: 'About OLH', href: site.live.about },
  { label: 'Log in', href: site.live.login },
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
      data-ask={site.live.askEzy}
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
              Search OLH
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
          <a href={site.live.book} className="btn-primary w-full" data-track="book-call:menu">
            Book a 15-minute call
          </a>
          <p className="mt-2 text-center text-[0.75rem] text-ink-4">
            Or call or text{' '}
            <a href={`tel:${site.phone.tel}`} className="font-medium text-brand-text" data-track="call:menu">
              {site.phone.display}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

type BarLink = { label: string; href: string; track: string }
/** The sticky phone bar's two buttons, by page. */
function barFor(current: string): [BarLink, BarLink] {
  const book: BarLink = { label: 'Book a 15-min call', href: site.live.book, track: 'book-call:sticky' }
  switch (current) {
    case 'pricing/':
      return [{ label: 'Call or text', href: `tel:${site.phone.tel}`, track: 'call:sticky' }, book]
    case 'legal/':
      return [{ label: 'Call or text', href: `tel:${site.phone.tel}`, track: 'call:sticky' }, { label: 'Talk to a paralegal', href: site.live.book, track: 'book-call:sticky' }]
    case 'rentals/':
      return [{ label: 'All rentals', href: site.live.rentals, track: 'rentals:sticky' }, { label: 'List my rental', href: url('rentals/#leasing'), track: 'leasing:sticky' }]
    default:
      return [{ label: 'Price my rental', href: url('pricing/'), track: 'pricing:sticky' }, book]
  }
}

export function MobileCTA({ current }: { current: string }) {
  const [left, right] = barFor(current)
  return (
    <aside className="mcta" data-mcta aria-label="Get started" aria-hidden="true">
      <div className="flex items-center gap-2 rounded-full bg-white/85 p-1.5 shadow-float ring-1 ring-black/5 backdrop-blur-xl">
        <a href={left.href} className="btn btn-sm flex-1 text-ink" tabIndex={-1} data-track={left.track}>
          {left.label}
        </a>
        <a href={right.href} className="btn-primary btn-sm flex-[1.4]" tabIndex={-1} data-track={right.track}>
          {right.label}
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
          <li key={c.path} className={`items-center gap-1.5 ${idx === all.length - 1 && idx > 1 ? 'hidden sm:flex' : 'flex'}`}>
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
        <div className="mb-8 flex flex-col gap-5 border-b border-line pb-8 md:mb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo size="footer" />
            <p className="mt-3 max-w-[30rem] leading-relaxed">
              Ontario property management, leasing and landlord legal help. Serving Ontario landlords since {site.since}, with
              local visits booked when you need them.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem]">
            <a href={`tel:${site.phone.tel}`} className="font-semibold text-ink" data-track="call:footer">
              {site.phone.display} <span className="font-normal text-ink-3">· call or text</span>
            </a>
            <a href={`mailto:${site.email}`} className="text-ink-2">
              {site.email}
            </a>
          </div>
        </div>
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

        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8 md:mt-12" aria-label="The OLH group">
          <img src={url('img/landlordezy-logo.png')} alt="LandlordEzy" width={140} height={32} className="h-auto w-[140px]" loading="lazy" decoding="async" />
          {/* List It's logo is white artwork, so it sits on a dark plate. */}
          <span className="inline-flex rounded-xl bg-brand-ink px-3 py-2">
            <img src={url('img/listit-logo.png')} alt="List It Realty Brokerage Inc." width={84} height={40} className="h-auto w-[84px]" loading="lazy" decoding="async" />
          </span>
          <span className="text-[0.8125rem] font-semibold text-ink-2">Landlord Pro Legal Services</span>
        </div>

        <div className="mt-6 space-y-3 leading-relaxed">
          <p>
            OLH Property Management provides property management services. Legal services are provided by Landlord Pro Legal
            Services through licensed paralegals under a separate written engagement. Real estate brokerage services, including
            MLS® rental listings and tenant placement, are provided by List It Realty Brokerage Inc. LandlordEzy is property
            management software; it is not a law firm or a brokerage and does not give legal advice.
          </p>
          <p>
            Equifax is a registered trademark of Equifax Inc. Interac and Interac e-Transfer are registered trademarks of Interac
            Corp. MLS® and REALTOR.ca are trademarks of The Canadian Real Estate Association. Product screens are illustrative,
            with sample figures.
          </p>
          <p className="text-ink-4">
            This is a design preview of proposed pages. Prices shown are proposals for review, in Canadian dollars plus HST.
            Existing agreements, listings and their terms are not changed by this page. The live site is{' '}
            <a href={site.live.home}>ontariolandlordhelp.ca</a>.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 OLH Property Management. Built in Ontario.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a href={site.live.privacy} className="text-ink-3 hover:text-ink">
                Privacy
              </a>
            </li>
            <li>
              <a href={site.live.terms} className="text-ink-3 hover:text-ink">
                Terms of use
              </a>
            </li>
            <li>
              <a href={site.live.contact} className="text-ink-3 hover:text-ink">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
