import { test } from 'node:test'
import assert from 'node:assert/strict'
import { fetchContent, safeURL, validSlug, fallbackContent } from '../src/lib/content.mjs'
test('unapproved articles and Learnify are absent from local public content', () => {
  assert.equal(fallbackContent.posts.length, 0)
  assert.equal(fallbackContent.projects.some(p => p.title === 'Learnify'), false)
  assert.equal(fallbackContent.profile.resumeURL, undefined)
})
test('published query and empty result never resurrect local projects', async () => {
  const content = await fetchContent({ projectId: 'example' }, async url => {
    assert.equal(url.searchParams.get('perspective'), 'published')
    return { ok: true, json: async () => ({ result: { projects: [], posts: [] } }) }
  })
  assert.deepEqual(content.projects, [])
})
test('CMS errors are surfaced instead of replacing unpublished content', async () => {
  await assert.rejects(fetchContent({ projectId: 'example' }, async () => ({ ok: false })))
})
test('unsafe links and traversal slugs are rejected', () => {
  assert.equal(safeURL('javascript:alert(1)'), null)
  assert.equal(safeURL('//evil.test'), null)
  assert.equal(validSlug('../secret'), false)
  assert.equal(validSlug('gnss-gaussian-sld99-processor'), true)
})
