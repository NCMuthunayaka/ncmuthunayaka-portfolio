import { writeFile } from 'node:fs/promises'
import { fallbackContent } from '../frontend/src/lib/content.mjs'
const { profile, projects, activities } = fallbackContent
const documents = [
  { ...profile, _id: 'drafts.profile', _type: 'profile' },
  ...projects.map(p => ({ _id: `drafts.project-${p.slug}`, _type: 'project', title: p.title, slug: { _type: 'slug', current: p.slug }, summary: p.description, problem: p.problem, role: p.contribution, result: p.result, stack: p.tags, category: p.category, featured: true, repoURL: p.repo, demoURL: p.demo, attribution: p.attribution, ...(p.id === '02' ? { stage: 'complete' } : {}) })),
  ...activities.map((a, i) => ({ ...a, _id: `drafts.activity-${i + 1}`, _type: 'activity', order: i + 1 })),
  { _id: 'drafts.project-learnify', _type: 'project', title: 'Learnify', slug: { _type: 'slug', current: 'learnify' }, summary: 'A student productivity platform.', stage: 'complete', stack: ['React', 'Flask', 'MySQL', 'OpenAI API'], repoURL: 'https://github.com/NCMuthunayaka/Learnify-Web-capstone', demoURL: 'https://learnify-web-capstone.vercel.app', role: 'Awaiting individual contribution review. Do not publish before review.', featured: false },
]
await writeFile('studio/initial-drafts.ndjson', documents.map(d => JSON.stringify(d)).join('\n') + '\n')
console.log(`Prepared ${documents.length} drafts. Nothing has been uploaded or published.`)
