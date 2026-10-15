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
      '@type': 'Organization',
      '@id': organizationId,
      name: site.name,
      url: abs(),
      logo: { '@type': 'ImageObject', url: abs('img/logo-mark-512.png'), width: 512, height: 512 },
      description:
        'Landlord and property management software for Ontario: rent collection, tenant screening, Equifax rent reporting, LTB notices and paralegal-backed legal help.',
      telephone: site.phone.tel,
      areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
      founder: { '@type': 'Person', name: site.founder, jobTitle: 'Founder and Broker of Record' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: site.phone.tel,
        contactType: 'customer support',
        areaServed: 'CA-ON',
        availableLanguage: ['en'],
      },
      sameAs: [site.social.facebook, site.social.youtube],
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
  const robots =
    site.indexable && !route.noindex
      ? 'index, follow, max-image-preview:large, max-snippet:-1'
      : 'noindex, nofollow, noarchive, noimageindex'
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
    site.preview
      ? '<!-- Concept preview: kept out of search on purpose (see public/_headers). The production build sets index, follow and a canonical on landlordezy.ca. -->'
      : `<link rel="canonical" href="${attr(canonical)}" />`,
    '<meta name="theme-color" content="#ffffff" />',
    '<meta name="color-scheme" content="light" />',
    '<meta name="format-detection" content="telephone=no" />',
    `<link rel="icon" href="${url('favicon.svg')}" type="image/svg+xml" />`,
    `<link rel="icon" href="${url('favicon-32.png')}" sizes="32x32" type="image/png" />`,
    `<link rel="apple-touch-icon" href="${url('apple-touch-icon.png')}" />`,
    `<meta property="og:type" content="${route.ogType ?? 'website'}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${attr(route.title.replace(/ \| LandlordEzy$/, ''))}" />`,
    `<meta property="og:description" content="${attr(route.description)}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    `<meta property="og:image" content="${attr(ogImage)}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:locale" content="${site.locale}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${attr(route.title.replace(/ \| LandlordEzy$/, ''))}" />`,
    `<meta name="twitter:description" content="${attr(route.description)}" />`,
    `<meta name="twitter:image" content="${attr(ogImage)}" />`,
    `<link rel="stylesheet" href="${assets.css}" />`,
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
