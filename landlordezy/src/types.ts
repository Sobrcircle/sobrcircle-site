import type { ReactElement } from 'react'

export type Crumb = { name: string; path: string }

export type Route = {
  /** Site-relative directory path: '' for home, 'pricing/' for /pricing/. */
  path: string
  /** <title>. Aim for 60 characters or fewer, brand last. */
  title: string
  /** Meta description. Aim for 155 characters or fewer. */
  description: string
  Page: () => ReactElement
  /** Breadcrumb trail below Home, used for the visible trail and BreadcrumbList. */
  crumbs?: Crumb[]
  /** Additional JSON-LD nodes for this page. */
  schema?: Record<string, unknown>[]
  /** Open Graph image, relative to public/ (1200×630). */
  ogImage?: string
  ogType?: 'website' | 'article'
  /** Sitemap priority in production mode (0.1 – 1.0). */
  priority?: number
  /** Keep this page out of search even in production (e.g. the 404). */
  noindex?: boolean
  /** Product pages use a local nav instead of a visible breadcrumb trail. */
  hideCrumbs?: boolean
}
