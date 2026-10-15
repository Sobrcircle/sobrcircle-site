import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const here = path.dirname(fileURLToPath(import.meta.url))

/**
 * Shared Vite config for the LandlordEzy concept. `root`, `base`, `outDir` and
 * the HTML inputs are supplied by scripts/build.ts, because they depend on the
 * build mode (preview at sobrcircle.com/landlordezy, or production at the
 * landlordezy.ca root) and on which pages the prerender step produced.
 *
 * PostCSS is configured inline on purpose: an inline config stops Vite from
 * walking up to the parent site's postcss.config.js, whose Tailwind config
 * belongs to sobrcircle.com and must never style these pages.
 */
export default defineConfig({
  publicDir: path.join(here, 'public'),
  css: {
    postcss: {
      plugins: [tailwindcss({ config: path.join(here, 'tailwind.config.js') }), autoprefixer()],
    },
  },
  build: {
    target: 'es2020',
    modulePreload: { polyfill: false },
    reportCompressedSize: false,
  },
  logLevel: 'warn',
})
