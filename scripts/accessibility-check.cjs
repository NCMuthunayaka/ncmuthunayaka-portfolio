const { chromium } = require('@playwright/test')
const AxeBuilder = require('@axe-core/playwright').default
const fs = require('fs')
;(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.BROWSER_EXECUTABLE })
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  const results = []
  for (const route of ['/', '/projects/govisense', '/assistant', '/contact', '/about', '/resume', '/blog']) {
    await page.goto('http://127.0.0.1:5173' + route)
    await page.locator('main h1').waitFor()
    const report = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    results.push({ route, violations: report.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) })
  }
  fs.writeFileSync('docs/qa/accessibility.json', JSON.stringify(results, null, 2))
  await browser.close()
  console.log(JSON.stringify(results))
  if (results.some(r => r.violations.length)) process.exitCode = 1
})().catch(e => { console.error(e); process.exit(1) })
