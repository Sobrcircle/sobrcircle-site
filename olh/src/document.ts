import { abs, site, url } from './site'
import type { Route } from './types'

/** Escape a string for safe use inside a double-quoted HTML attribute. */
function attr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Serialise JSON-LD so it can never close its own <script> element. */
function jsonLd(node: unknown): string {
  return JSON.stringify(node).replace(/</g, '\\u003c')
}

export const organizationId = `${abs()}#organization`
export const websiteId = `${abs()}#website`

/** The Organization + WebSite graph that every page carries. */
function baseGraph(): Record<string, unknown>[] {
  return [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': organizationId,
      name: site.name,
      alternateName: 'Ontario Landlord Help',
      url: abs(),
      logo: { '@type': 'ImageObject', url: abs('img/olh-logo-720.png'), width: 720, height: 235 },
      description:
        'Ontario property management, leasing and landlord legal help: OLH Landlord Shield, Property Management and the Legal Guarantee, run on LandlordEzy.',
      telephone: site.phone.tel,
      email: site.email,
      foundingDate: String(site.since),
      areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
      founder: { '@type': 'Person', name: site.founder },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone.tel,
        contactType: 'customer service',
        areaServed: 'CA-ON',
        availableLanguage: ['en'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: site.name,
      url: abs(),
      inLanguage: 'en-CA',
      publisher: { '@id': organizationId },
    },
  ]
}

function breadcrumbGraph(route: Route): Record<string, unknown> | null {
  if (!route.crumbs?.length) return null
  const trail = [{ name: 'Home', path: '' }, ...route.crumbs]
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  }
}

export type Assets = { css: string; js: string }

/**
 * Build the full HTML document for one route. `body` is the prerendered React
 * markup. `assets` are paths (relative to the generated HTML file) that Vite
 * resolves, bundles and fingerprints during the build.
 */
export function renderDocument(route: Route, body: string, assets: Assets): string {
  const canonical = abs(route.path)
  const robots = site.indexable && !route.noindex ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, nofollow, noarchive, noimageindex'
  const ogImage = abs(route.ogImage ?? 'og/default.png')
  const graph = [...baseGraph(), ...(route.schema ?? [])]
  const crumbs = breadcrumbGraph(route)
  if (crumbs) graph.push(crumbs)

  const head = [
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    `<title>${attr(route.title)}</title>`,
    `<meta name="description" content="${attr(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    '<!-- Design preview: kept out of search on purpose (see public/_headers). On ontariolandlordhelp.ca each page would carry index, follow and a canonical. -->',
    '<meta name="theme-color" content="#ffffff" />',
    '<meta name="color-scheme" content="light" />',
    '<meta name="format-detection" content="telephone=no" />',
    `<link rel="icon" href="${url('favicon-32.png')}" sizes="32x32" type="image/png" />`,
    `<link rel="apple-touch-icon" href="${url('apple-touch-icon.png')}" />`,
    `<meta property="og:type" content="${route.ogType ?? 'website'}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${attr(route.title.replace(/ \| OLH$/, ''))}" />`,
    `<meta property="og:description" content="${attr(route.description)}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    `<meta property="og:image" content="${attr(ogImage)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:locale" content="${site.locale}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${attr(route.title.replace(/ \| OLH$/, ''))}" />`,
    `<meta name="twitter:description" content="${attr(route.description)}" />`,
    `<meta name="twitter:image" content="${attr(ogImage)}" />`,
    `<link rel="stylesheet" href="${assets.css}" />`,
    '<noscript><style>[data-tab-panel][hidden]{display:block!important;margin-top:1.5rem}.tabrow,.chooser{display:none!important}.tabpanel-label{display:block!important}</style></noscript>',
    `<script type="module" src="${assets.js}"></script>`,
    `<script type="application/ld+json">${jsonLd({ '@context': 'https://schema.org', '@graph': graph })}</script>`,
  ]

  return `<!doctype html>
<html lang="en-CA" dir="ltr">
<head>
${head.join('\n')}
</head>
<body>
${body}
</body>
</html>
`
}
