import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const root = new URL('../frontend/dist/', import.meta.url)
const home = await readFile(new URL('index.html', root), 'utf8')
const project = await readFile(new URL('projects/govisense/index.html', root), 'utf8')
const gnss = await readFile(new URL('projects/gnss-gaussian-sld99-processor/index.html', root), 'utf8')
const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8')
assert.match(home, /<title>Home/)
assert.match(project, /<title>GoviSense/)
assert.match(gnss, /<title>GNSS Gaussian/)
assert.match(project, /property="og:title" content="GoviSense/)
assert.ok(!sitemap.includes('learnify'))
assert.ok(!sitemap.includes('what-makes-a-portfolio'))
if (process.env.SITE_URL) {
  assert.match(project, /rel="canonical"/)
  assert.equal((sitemap.match(/<loc>/g) || []).length, 9)
} else {
  assert.match(home, /noindex, nofollow/)
}
console.log('Passed: route metadata, approval boundaries and indexing configuration.')
