export const fallbackProfile = {
  name: 'M P Nayana Chandupa Muthunayaka', shortName: 'NC',
  intro: 'Software Engineering undergraduate exploring applied AI through practical projects.',
  degree: 'BSc Hons Software Engineering · Sabaragamuwa University of Sri Lanka · expected 2028',
  year: 'Year 3, Semester 2', focus: 'AI Engineering internship',
  availability: 'Available from June 2027 for a flexible six-month internship. Open to any work mode; relocation is not planned.',
  location: 'Veyangoda, Sri Lanka',
  email: 'ncmuthunayaka@gmail.com', github: 'https://github.com/NCMuthunayaka',
  linkedin: 'https://www.linkedin.com/in/muthunayaka',
  skills: ['Python', 'AWS', 'FastAPI', 'React'],
}
export const fallbackProjects = [
  { id: '01', slug: 'govisense', title: 'GoviSense', category: 'AI + agriculture', type: 'Agricultural forecasting', tone: 'sage',
    description: 'Agricultural supply-pressure and price forecasting for Sri Lanka, with Anuradhapura as the pilot district.',
    problem: 'Support agricultural planning with harvest and price forecasts and supply-pressure information.',
    tags: ['React', 'FastAPI', 'Flutter', 'LightGBM', 'SARIMAX'],
    result: 'The repository describes forecasting, a Supply Pressure Index and a decision optimizer. Measured performance is not yet supplied.',
    repo: 'https://github.com/NCMuthunayaka/GoviSense', demo: 'https://govi-sense.vercel.app',
  },
  { id: '02', slug: 'gnss-gaussian-sld99-processor', title: 'GNSS Gaussian SLD99 Processor', category: 'Data tools', type: 'Complete · Python tool', tone: 'blue',
    description: 'Python utilities for GNSS processing, coordinate transformation, Gaussian analysis and visual outputs.',
    problem: 'Make GNSS observations easier to process, transform and inspect through visual analysis.',
    tags: ['Python', 'GNSS', 'Coordinate transformation'],
    result: 'Completed according to the owner. The repository describes scatter plots, histograms, convergence plots and sigma zones; measured accuracy has not been supplied.',
    repo: 'https://github.com/NCMuthunayaka/gnss_gaussian_sld99__processor',
  },
].map(p => ({ ...p, contribution: 'Individual contribution and adapted components are awaiting the owner’s review.', decision: '', improvements: [], attribution: 'Repository summary supplied in the owner’s input notes. No individual authorship or measured performance is inferred.', featured: true }))
export const fallbackActivities = [
  { title: 'Teller internship', organization: 'People’s Bank', dates: 'December 2023 – July 2024', summary: 'Experience in a professional banking environment.' },
  { title: 'Design team lead', organization: 'WIE HOPE 2.0', summary: 'Design coordination and team leadership.' },
  { title: 'Event organizer', organization: 'Pawra 2025', dates: '15 October 2025', summary: 'Event organization and programme coordination.' },
  { title: 'Owner', organization: 'Bluepearl', dates: 'October 2023 – present', summary: 'Ornamental fish breeding and supply.' },
]
export const fallbackContent = { profile: fallbackProfile, projects: fallbackProjects, posts: [], activities: fallbackActivities, faqs: [] }
export const validSlug = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
export function safeURL(value) { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null } catch { return null } }
export const query = `{
 "profile": *[_type == "profile" && _id == "profile"][0]{..., "resumeURL": resumeFile.asset->url},
 "projects": *[_type == "project"] | order(orderRank asc){..., "id": _id, "slug": slug.current, "description": summary, "tags": stack, "repo": repoURL, "demo": demoURL, "contribution": role, "decision": decisions, "imageURL": image.asset->url, "imageAlt": image.alt, "architectureURL": architecture.asset->url, "architectureAlt": architecture.alt, "fallbackURL": fallbackImage.asset->url, "fallbackAlt": fallbackImage.alt},
 "posts": *[_type == "post"] | order(publishedAt desc){..., "slug": slug.current, "coverURL": cover.asset->url, "coverAlt": cover.alt, "relatedProjects": relatedProjects[]->{title, "slug": slug.current}},
 "activities": *[_type == "activity"] | order(order asc),
 "faqs": *[_type == "faq" && visibleToAssistant == true]{question, shortAnswer, linkedSourceURL}
}`
export async function fetchContent({ projectId, dataset = 'production' }, fetcher = fetch) {
  if (!projectId) return fallbackContent
  if (!/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) throw new Error('Invalid CMS configuration')
  const url = new URL(`https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}`)
  url.searchParams.set('perspective', 'published'); url.searchParams.set('query', query)
  const response = await fetcher(url, { signal: AbortSignal.timeout(10000) })
  if (!response.ok) throw new Error('Content is temporarily unavailable')
  const { result } = await response.json()
  if (!result || !Array.isArray(result.projects) || !Array.isArray(result.posts)) throw new Error('Invalid CMS response')
  return { profile: { ...fallbackProfile, ...result.profile },
    projects: result.projects.filter(p => validSlug(p.slug)).map(p => ({ ...p, tags: p.tags || [], improvements: p.improvements || [], type: p.stage === 'complete' ? 'Complete' : p.stage === 'in-progress' ? 'In progress' : p.category || 'Project', tone: 'blue' })),
    posts: result.posts.filter(p => validSlug(p.slug)), activities: result.activities || [], faqs: result.faqs || [] }
}
