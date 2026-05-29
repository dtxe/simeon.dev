/**
 * Renders <App /> to static HTML and injects it into dist/index.html so the
 * deployed page ships real content (good for SEO / no-JS). The client then
 * hydrates and replays the intro animation.
 * Runs after `vite build`.
 *
 * Why a custom script instead of a prerender plugin: the site is a single
 * route, so this is ~30 lines with zero extra deps and no plugin conventions
 * to adopt. It leans on Vite's own stable `ssrLoadModule` (handles TS/CSS) and
 * React's `renderToString`, so it won't lag Vite/React major bumps. Reach for
 * a plugin (e.g. vite-react-ssg) only if we grow to multiple routes that each
 * need distinct <head>/meta or build-time data — that's the point where a
 * route-crawling plugin earns its keep.
 */
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlPath = resolve(__dirname, '../dist/index.html')

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx')
  const appHtml = renderToString(createElement(App))

  const template = readFileSync(htmlPath, 'utf-8')
  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) {
    throw new Error(`Prerender marker ${marker} not found in dist/index.html`)
  }
  const out = template.replace(marker, `<div id="root">${appHtml}</div>`)
  writeFileSync(htmlPath, out, 'utf-8')
  console.log('Prerendered dist/index.html')
} finally {
  await vite.close()
}
