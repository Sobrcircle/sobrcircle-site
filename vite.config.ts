import path from 'node:path'
import { rm } from 'node:fs/promises'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * public/lisadale/preview/ holds placeholder media so `vite dev` can render the
 * gallery without an R2 binding. It must never reach a deploy — in production
 * those paths are served from R2 by functions/lisadale/media. Vite copies all
 * of public/ verbatim, so the only way to keep it dev-only is to drop it again
 * after the bundle is written.
 */
function stripDevPreview(): Plugin {
  return {
    name: 'strip-lisadale-dev-preview',
    apply: 'build',
    closeBundle: async () => {
      await rm(path.resolve(__dirname, 'dist/lisadale/preview'), {
        recursive: true,
        force: true,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), stripDevPreview()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        twentyfour: path.resolve(__dirname, 'twentyfour/index.html'),
        lisadale: path.resolve(__dirname, 'lisadale/index.html'),
        lisadaleGallery: path.resolve(__dirname, 'lisadale/gallery/index.html'),
      },
    },
  },
})
