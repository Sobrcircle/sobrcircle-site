/**
 * Files that only make sense when the site owns a whole domain (landlordezy.ca):
 * the sitemap, robots.txt, the 301 map from the old URLs, and response headers.
 * The preview build skips all of this. sobrcircle.com has its own robots.txt and
 * sitemap, and the concept must stay out of search there (see public/_headers).
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { abs, site } from '../src/site'
import { legacyRedirects } from '../src/content/redirects'
import type { Route } from '../src/types'

export async function productionExtras(out: string, routes: Route[]) {
  const urls = routes
    .filter((r) => !r.noindex)
    .map(
      (r) =>
        `  <url>\n    <loc>${abs(r.path)}</loc>\n    <lastmod>${site.lastReviewed}</lastmod>\n    <priority>${(r.priority ?? 0.6).toFixed(1)}</priority>\n  </url>`,
    )
  await writeFile(
    path.join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  )

  await writeFile(
    path.join(out, 'robots.txt'),
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# Private areas of the app stay out of search.',
      'Disallow: /login',
      'Disallow: /storage/',
      'Disallow: /uploads/',
      'Disallow: /pre-screening/',
      '',
      `Sitemap: ${abs('sitemap.xml')}`,
      '',
    ].join('\n'),
  )

  // Cloudflare Pages _redirects: every retired URL → its new home, permanently.
  const lines = legacyRedirects.map(([from, to]) => `${from} ${to === '' ? '/' : '/' + to} 301`)
  await writeFile(path.join(out, '_redirects'), lines.join('\n') + '\n')

  await writeFile(
    path.join(out, '_headers'),
    [
      '/*',
      '  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
      '  X-Content-Type-Options: nosniff',
      '  Referrer-Policy: strict-origin-when-cross-origin',
      '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
      '',
      '/assets/*',
      '  Cache-Control: public, max-age=31536000, immutable',
      '',
      '/img/*',
      '  Cache-Control: public, max-age=86400, must-revalidate',
      '',
    ].join('\n'),
  )
}
