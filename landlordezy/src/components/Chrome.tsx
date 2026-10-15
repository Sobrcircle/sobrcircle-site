import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { site, url } from '../site'
import { footerColumns, productMenu, resourcesMenu, type NavGroup, type NavLink } from '../content/nav'
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
          <div className="flex items-center gap-1.5">
            <a href={site.app.login} className="gnav-link hidden lg:inline-flex">
              Sign in
            </a>
            <a href={site.app.signup} className="btn-primary btn-sm" data-cta="nav-start">
              Start free
            </a>
            <a
              href="#menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
              aria-label="Open menu"
              aria-controls="menu"
              aria-expanded="false"
              data-menu-open
            >
              <Menu className="h-[22px] w-[22px]" strokeWidth={1.6} aria-hidden />
            </a>
          </div>
        </div>
      </nav>
      <div className="scrim" data-open="false" data-scrim aria-hidden="true" />
    </>
  )
}

export function MobileSheet() {
  const groups = [productMenu[0], productMenu[1], resourcesMenu[0], resourcesMenu[1]]
  let i = 0
  return (
    <div id="menu" className="msheet lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" data-open="false">
      <div className="wrap flex h-[var(--nav-h)] items-center justify-between">
        <a href={url()} aria-label="LandlordEzy home">
          <Logo />
        </a>
        <a href="#" className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full" aria-label="Close menu" data-menu-close>
          <X className="h-6 w-6" strokeWidth={1.6} aria-hidden />
        </a>
      </div>
      <div className="wrap pb-16 pt-4">
        <ul className="space-y-1">
          {[
            { label: 'Pricing', path: 'pricing/' },
            { label: 'Property managers', path: 'property-managers/' },
            { label: 'About', path: 'about/' },
          ].map((l) => (
            <li key={l.label} className="msheet-item" style={{ transitionDelay: `${0.04 * i++}s` }}>
              <a href={url(l.path)} className="block py-1.5 font-display text-[1.75rem] font-semibold tracking-[-0.02em]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        {groups.map((g) => (
          <div key={g.heading} className="msheet-item mt-8" style={{ transitionDelay: `${0.04 * i++}s` }}>
            <p className="mb-2 text-[0.8125rem] font-medium text-ink-3">{g.heading}</p>
            <ul className="space-y-1">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a href={linkHref(l)} className="block py-1.5 text-[1.125rem] font-medium text-ink-2">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="msheet-item mt-10 grid grid-cols-2 gap-3" style={{ transitionDelay: `${0.04 * i++}s` }}>
          <a href={site.app.signup} className="btn-primary">
            Start free
          </a>
          <a href={site.app.login} className="btn-secondary">
            Sign in
          </a>
        </div>
      </div>
    </div>
  )
}

export function MobileCTA() {
  return (
    <div className="mcta" data-mcta aria-hidden="true">
      <div className="flex items-center gap-2 rounded-full bg-white/85 p-1.5 shadow-float ring-1 ring-black/5 backdrop-blur-xl">
        <a href={url('pricing/')} className="btn btn-sm flex-1 text-ink" tabIndex={-1}>
          See pricing
        </a>
        <a href={site.app.signup} className="btn-primary btn-sm flex-[1.4]" tabIndex={-1}>
          Start free — no card
        </a>
      </div>
    </div>
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
      <div className="wrap py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-3 font-sans text-[0.8125rem] font-semibold text-ink-2">{col.heading}</h2>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={linkHref(l)} className="text-ink-3 hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-3 border-t border-line pt-8 leading-relaxed">
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
