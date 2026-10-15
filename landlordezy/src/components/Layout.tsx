import type { ReactNode } from 'react'
import { site } from '../site'
import type { Route } from '../types'
import { Breadcrumbs, GlobalNav, MobileCTA, MobileSheet, PreviewBar, SiteFooter } from './Chrome'

export function Layout({ route, children }: { route: Route; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-white px-4 py-2 text-ink shadow-float focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      {site.preview && <PreviewBar />}
      <GlobalNav current={route.path} />
      <MobileSheet />
      <main id="main" tabIndex={-1} className="outline-none">
        {route.crumbs && route.crumbs.length > 0 && !route.hideCrumbs && <Breadcrumbs trail={route.crumbs} />}
        {children}
      </main>
      <SiteFooter />
      <MobileCTA />
    </>
  )
}
