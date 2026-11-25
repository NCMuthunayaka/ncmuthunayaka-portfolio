import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import { fetchContent, safeURL } from '../src/lib/content.mjs'
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const content = await fetchContent({ projectId: env.VITE_SANITY_PROJECT_ID, dataset: env.VITE_SANITY_DATASET || 'production' })
const base = env.SITE_URL ? new URL(env.SITE_URL).origin : null
if (base && !/^https?:/.test(base)) throw Error('SITE_URL must be an HTTP(S) origin')
const escape = value => String(value || '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]))
const routes = [
  ['/', 'Home', content.profile.intro], ['/projects', 'Projects', 'Explore source-linked AI and software projects.'],
  ['/about', 'About me', content.profile.intro], ['/resume', 'Résumé', 'Education, skills and internship availability.'],
  ['/contact', 'Contact', content.profile.availability], ['/assistant', 'Assistant', 'Approved public portfolio answers and source links.'],
  ['/blog', 'Blog', 'Technical notes, decisions and lessons learned.'],
  ...content.projects.map(p => ['/projects/' + p.slug, p.title, p.description, p.imageURL]),
  ...content.posts.map(p => ['/blog/' + p.slug, p.title, p.excerpt, p.coverURL]),
]
const shell = await readFile('dist/index.html', 'utf8')
for (const [path, title, description, image] of routes) {
  const url = base ? base + path : null
  const og = safeURL(image) || safeURL(env.OG_IMAGE_URL)
  const tags = `<meta property="og:type" content="website" />\n<meta property="og:title" content="${escape(title)} — ${escape(content.profile.name)}" />\n<meta property="og:description" content="${escape(description)}" />\n${url ? `<link rel="canonical" href="${escape(url)}" /><meta property="og:url" content="${escape(url)}" />` : '<meta name="robots" content="noindex, nofollow" />'}\n${og ? `<meta property="og:image" content="${escape(og)}" /><meta name="twitter:card" content="summary_large_image" />` : '<meta name="twitter:card" content="summary" />'}`
  const html = shell.replace(/<title>.*?<\/title>/s, `<title>${escape(title)} — ${escape(content.profile.name)}</title>`).replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}" />`).replace('</head>', tags + '\n</head>')
  const directory = resolve('dist', '.' + path)
  await mkdir(directory, { recursive: true }); await writeFile(resolve(directory, 'index.html'), html)
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${base ? routes.map(([p]) => `<url><loc>${escape(base + p)}</loc></url>`).join('') : ''}</urlset>`)
await writeFile('dist/robots.txt', base ? `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n')
console.log(`Generated metadata for ${routes.length} routes.${base ? '' : ' Set SITE_URL to enable indexing and absolute sitemap URLs.'}`)
