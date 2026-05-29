/**
 * Writes dist/sitemap.xml with today's date as lastmod. Runs after `vite build`.
 */
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE = 'https://simeon.dev/'
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

const outPath = resolve(__dirname, '../dist/sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`Wrote dist/sitemap.xml (lastmod ${today})`)
