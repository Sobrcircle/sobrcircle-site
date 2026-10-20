/**
 * Build the LandlordEzy concept.
 *
 *   npm run build              → preview build into ../public/landlordezy (served at sobrcircle.com/landlordezy/)
 *   npm run build:production   → production build into ./dist-production (for the landlordezy.ca root)
 *
 * Pipeline:
 *   1. Prerender every route to static HTML with react-dom/server. Each page ships
 *      as real HTML (fast first paint, fully crawlable); React never runs in the browser.
 *   2. Hand those HTML files to Vite, which compiles Tailwind, bundles the small
 *      progressive-enhancement script in src/client, and fingerprints both.
 *   3. Write search-index.json for the Menu sheet's search (both modes).
 *      (Step 1 also runs scripts/typeset.ts, which keeps dates, prices and
 *      hyphenated words from breaking across lines.)
 *   4. Production only: write sitemap.xml, robots.txt, _redirects and _headers.
 */
import { mkdir, rm, writeFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const production = process.argv.includes('--production')
process.env.LE_MODE = production ? 'production' : 'preview'

const here = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(here, '..')
const GEN = path.join(ROOT, '.generated')
const OUT = production ? path.join(ROOT, 'dist-production') : path.resolve(ROOT, '../public/landlordezy')

// Everything below reads LE_MODE at import time, so import it only now.
const { build } = await import('vite')
const { renderToStaticMarkup } = await import('react-dom/server')
const { site } = await import('../src/site')
const { routes, notFound } = await import('../src/routes')
const { renderDocument } = await import('../src/document')
const { Layout } = await import('../src/components/Layout')
const { productionExtras } = await import('./production-extras')
const { searchIndex } = await import('../src/content/search')
const { typeset } = await import('./typeset')

async function writeRoute(route: (typeof routes)[number], file: string) {
  const body = typeset(
    renderToStaticMarkup(
      <Layout route={route}>
        <route.Page />
      </Layout>,
    ),
  )
  const dir = path.dirname(file)
  const rel = (p: string) => path.relative(dir, path.join(ROOT, p)).split(path.sep).join('/')
  const html = renderDocument(route, body, { css: rel('src/styles/app.css'), js: rel('src/client/main.ts') })
  await mkdir(dir, { recursive: true })
  await writeFile(file, html)
  return file
}

async function sizeOf(dir: string): Promise<number> {
  let total = 0
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    total += entry.isDirectory() ? await sizeOf(p) : (await stat(p)).size
  }
  return total
}

const started = Date.now()
await rm(GEN, { recursive: true, force: true })

const inputs: string[] = []
const seen = new Set<string>()
for (const route of routes) {
  if (seen.has(route.path)) throw new Error(`Duplicate route path: "${route.path}"`)
  seen.add(route.path)
  inputs.push(await writeRoute(route, path.join(GEN, route.path, 'index.html')))
}
inputs.push(await writeRoute(notFound, path.join(GEN, '404.html')))

await build({
  configFile: path.join(ROOT, 'vite.config.ts'),
  root: GEN,
  base: site.base,
  build: {
    outDir: OUT,
    emptyOutDir: true,
    rollupOptions: { input: inputs },
  },
})

await writeFile(path.join(OUT, 'search-index.json'), JSON.stringify(searchIndex(routes)))
if (production) await productionExtras(OUT, routes)

const kb = Math.round((await sizeOf(OUT)) / 1024)
console.log(
  `LandlordEzy ${site.mode} build: ${routes.length} pages + 404 → ${path.relative(process.cwd(), OUT)} (${kb} KB) in ${((Date.now() - started) / 1000).toFixed(1)}s`,
)
