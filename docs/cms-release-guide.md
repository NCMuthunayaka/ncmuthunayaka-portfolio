# CMS and release guide

## Connect Sanity

1. Supply the existing Sanity project ID and confirm a public production dataset. Do not create a second project accidentally.
2. Configure the Studio, frontend and API variables listed in README. Only invited project members can edit; the public frontend contains no write token.
3. Add localhost port 5173 and the final frontend origin to Sanity CORS. Keep credentials disabled for public reads. Studio login is separate.
4. Run `npm --prefix studio run dev`. Authenticate with the account that owns the project. Deploy using `npm --prefix studio run deploy` when ready.
5. Optional draft import: run `node scripts/prepare-cms-drafts.mjs` from the repository root, then from `studio/` run `npx sanity dataset import initial-drafts.ndjson production`. All eight documents use `drafts.` IDs. Review before publishing; avoid overwriting existing documents. No import has been performed during implementation.
6. The Profile desk item always edits document ID `profile`. Its create template and duplicate/delete actions are removed. Fill profile fields and publish. Never upload an unapproved résumé to the public dataset.

## Add a project without code changes

Create a project in Studio. Fill title, lowercase hyphenated slug, summary, category, problem, own contribution, result, attribution and stack. Add only substantiated metrics. Add approved cover, screenshot fallback and architecture images with meaningful alt text; a conceptual cover is not a demo screenshot. Add the public GitHub URL and optional demo URL. Choose a stage only when known. Stage describes progress; publish/unpublish controls visibility.

Preview the form and check all evidence before publishing. Drag projects in the Projects desk list to reorder them; mark featured for Home. Published content appears after browser refresh (at most approximately one minute plus network delay). Test unpublish and verify the project disappears. The empty CMS list never falls back to old bundled projects.

Learnify stays draft until contribution review. The supplied blog draft remains in `docs/first-blog-draft.md`; create its post only after editorial approval, tags and related project are supplied. Post bodies support paragraphs, headings, emphasis, links, lists and code blocks. Related project references link to published case studies.

## Approved assistant answers

Create FAQ entries with a question, short answer and full public source URL. Leave `visibleToAssistant` false until the topic and wording are approved. Publish and enable it only after review. Browser FAQs work independently of the Flask API. The API returns an existing answer, never generated text. No Gemini configuration is needed or enabled.

The cache TTL is ten minutes. Test removal after unpublishing a FAQ and after TTL expiry. Projects/profile/articles are not automatically turned into assistant answers because approved assistant topics remain unspecified in the input.

## Render and SEO

Use the root `render.yaml` Blueprint with the existing repository once Render access is available. Configure the final static origin as `SITE_URL`, API origin as `VITE_API_URL`, and static origin as `FRONTEND_ORIGIN`. Supply the same Sanity project and dataset to all three applications. Keep secrets out of any `VITE_` variable. Supply an approved absolute `OG_IMAGE_URL` for a default share image; project/post images override it.

Create a Render deploy hook for the static site. In Sanity, create a webhook targeting that hook for create/update/delete, with filter:

```groq
_type in ["project", "post", "profile"] && !(_id in path("drafts.**"))
```

Disable draft/version events. Publish a test change and check the build logs, then view the raw HTML of its route for title, description, canonical URL and Open Graph tags. Verify delete/unpublish triggers a rebuild too. If the plan does not support webhooks, trigger a manual deploy from Render after publishing or unpublishing. Do not save the deploy-hook secret URL in this repository.

Before launch, verify HTTPS, each direct route/refresh, live CORS, phone résumé download (only after approval), real demo availability, sitemap URLs and share previews. Use the current account's quota information; no free-tier pricing guarantee is made here. Keep a single API instance while using local SQLite limits. A durable shared store is necessary for limits across machines or ephemeral disk replacement.

## Troubleshooting

- Empty content: check the configured dataset and publish state; a draft is intentionally invisible.
- Content warning: verify project ID, dataset, public read access and browser CORS. Contact fallback remains available; old CMS projects are not restored.
- Build fails fetching CMS: fix access/network before deployment. This avoids stale public metadata.
- No sitemap URLs: set `SITE_URL` to the actual origin and rebuild.
- Assistant has no answer: approve and publish an appropriate FAQ. General questions never cause a provider call.
- API unavailable: browser FAQ answers remain available; API requests time out after 15 seconds.
- Stage unknown: omit it. Do not infer completion from a repository or deployment record.

API implementation reference: [Sanity published-perspective query API](https://www.sanity.io/docs/http-reference/query). Ordering integration: [Sanity orderable document list](https://github.com/sanity-io/orderable-document-list).
