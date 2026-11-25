# Status update — 25 November 2026

This historical checklist contains earlier assertions that were not all verified. See [implementation-status.md](implementation-status.md) for the current, evidence-based implementation and launch status. Approval, hosting and live CMS gates remain open; unchecked historical items must not be interpreted as all still unimplemented.

---

# Portfolio / Daily Execution Checklists

**Atomic Checklists: Day 0 to Day 5**

Companion to Implementation Proposal Version 3  |  21 November 2026

> **How to use:** Each line is one action with one visible result. Tick it only after you have seen the result (page loads, command succeeds, value confirmed). If a line cannot be ticked, stop and fix it before moving on. Time estimates in the headings match the plan; “(A, B, C optional)” lines repeat per project, so skip the C lines if you launch with two.

Total checkable items: **375** (plus 6 day-gate checks)

---

## DAY 0 / ABOUT 6 HOURS / 73 ITEMS

**Content sprint and fact confirmation**

### Confirm facts in docs/facts.md (1 h)

- [x] Write the exact degree title
- [x] Write the current study year
- [x] Write the public location wording (e.g., country only)
- [x] Write the internship role wording
- [x] Write the internship start month
- [x] Write the internship duration
- [x] Choose onsite, hybrid or remote preference
- [x] Choose the public contact email and confirm you can receive mail at it
- [x] Copy the exact GitHub profile URL and open it
- [x] Copy the exact LinkedIn profile URL and open it
- [x] Decide which organizations you may name publicly (WIE HOPE 2.0, Pawra, STEMUp, STAR, People’s Bank)
- [ ] Confirm the STAR certificate issuer wording
- [x] Write a 1–2 sentence ornamental fish breeding and supply description (not “importer”)
- [x] Decide whether to include the second fish variety or drop it
- [ ] Confirm you can log in to Render
- [ ] Confirm you can log in to Sanity
- [ ] Confirm you can log in to Google AI Studio
- [ ] Check whether your Sanity plan allows webhooks

### Choose projects and audit evidence (1 h)

- [x] List every candidate project
- [x] Mark each candidate complete, in progress or idea
- [ ] Pick the 2–3 complete projects for launch (A, B, C optional)
- [ ] Project A: confirm the GitHub repo opens publicly (or decide to make it public/omit the link)
- [ ] Project B: confirm the GitHub repo opens publicly (or decide to make it public/omit the link)
- [ ] Project C (optional): confirm the GitHub repo opens publicly (or decide to make it public/omit the link)
- [ ] Project A: confirm a live demo works, or plan a recorded fallback
- [ ] Project B: confirm a live demo works, or plan a recorded fallback
- [ ] Project C (optional): confirm a live demo works, or plan a recorded fallback
- [ ] Project A: list only measurements you actually ran
- [ ] Project B: list only measurements you actually ran
- [ ] Project C (optional): list only measurements you actually ran
- [ ] Project A: write one line on what you wrote versus adapted
- [ ] Project B: write one line on what you wrote versus adapted
- [ ] Project C (optional): write one line on what you wrote versus adapted
- [x] Delete any claim you cannot back with evidence

### Draft the case studies (1.5 h)

- [x] Project A: write the one-sentence problem
- [x] Project B: write the one-sentence problem
- [x] Project C (optional): write the one-sentence problem
- [x] Project A: write your specific contribution
- [x] Project B: write your specific contribution
- [x] Project C (optional): write your specific contribution
- [x] Project A: write the result (measured only if tested)
- [x] Project B: write the result (measured only if tested)
- [x] Project C (optional): write the result (measured only if tested)
- [x] Project A: write one hard design decision and its tradeoff
- [x] Project B: write one hard design decision and its tradeoff
- [x] Project C (optional): write one hard design decision and its tradeoff
- [x] Project A: write 2–3 improvements for a future iteration
- [x] Project B: write 2–3 improvements for a future iteration
- [x] Project C (optional): write 2–3 improvements for a future iteration
- [x] Read all drafts once and strike any invented number

### Capture assets (1 h)

- [ ] Project A: take at least two screenshots
- [ ] Project B: take at least two screenshots
- [ ] Project C (optional): take at least two screenshots
- [ ] Project A: draw the architecture diagram
- [ ] Project B: draw the architecture diagram
- [ ] Project C (optional): draw the architecture diagram
- [ ] Export every diagram as PNG
- [ ] Record a short demo video or capture a screenshot sequence as demo fallback
- [ ] Write alt text for every image in docs/alt-text.md
- [ ] Name all files with a consistent lowercase-hyphen convention
- [ ] Create a 1200×630 Open Graph image
- [x] Choose the favicon (emoji or icon)

### Finalize the résumé (0.5 h)

- [x] Update résumé content
- [x] Check every date and title against docs/facts.md
- [ ] Export the PDF
- [ ] Open the PDF on your phone and confirm it is readable
- [ ] Save a private backup copy in docs/

### Draft the first blog post (1 h)

- [x] Choose the topic
- [x] Write a bullet outline
- [x] Write the draft (about 500–800 words)
- [ ] Add links to related projects
- [x] Read it once for unsupported claims
- [ ] Choose 2–3 tags

> **Day gate:** Facts confirmed, 2–3 case study drafts and one article draft exist, assets are named and stored, résumé PDF approved.

- [ ] Gate passed

---

## DAY 1 / 7.5 HOURS / 53 ITEMS

**Foundation, design system, navigation and first deployment**

### Review and lock scope (0.5 h)

- [x] Read the Day 0 outputs
- [x] Confirm the seven public routes are listed
- [x] Confirm no Metrics Dashboard route exists

### Repository and tooling (1 h)

- [x] Create the GitHub repository
- [x] Clone it locally
- [x] Create the web/ app with Vite and React
- [ ] Install React Router
- [ ] Add a lint script to package.json
- [ ] Create folders pages, components, lib, styles under web/src
- [x] Add .gitignore covering node_modules, dist and .env
- [ ] Add .env.example with variable names only
- [x] Make the initial commit
- [ ] Agree a branch convention (main plus feature branches)
- [ ] Run npm run dev and confirm it starts
- [x] Run npm run build and confirm it succeeds

### Design tokens (1 h)

- [x] Choose heading and body fonts
- [x] Define colour tokens (background, text, accent, muted, border)
- [ ] Check body text contrast is at least 4.5:1
- [x] Define the spacing scale
- [x] Define breakpoints for 360, 768 and 1280 px
- [x] Add a visible focus-visible style
- [x] Add a prefers-reduced-motion rule

### Router, header, footer and shells (2 h)

- [x] Define the routes /, /projects, /projects/:slug, /about, /resume, /contact, /assistant, /blog, /blog/:slug
- [x] Build the Header with nav links and an active state
- [x] Add the mobile menu button
- [x] Make the mobile menu open and close by keyboard (Esc closes)
- [x] Build the Footer
- [x] Add the 404 route
- [x] Create the seven page shells, each with one h1
- [x] Add a skip-to-content link
- [x] Scroll to top on route change
- [x] Set a document title per page

### Shared components (1 h)

- [x] Build Container
- [x] Build SectionTitle
- [x] Build Button
- [x] Build Badge
- [x] Build ProjectCard
- [x] Build LoadingState
- [x] Create siteConfig with site name, base URL and fallback email only

### First deployment (1 h)

- [ ] Push the repository to GitHub
- [ ] Create a Render static site pointing at web/
- [ ] Set build command npm run build and publish directory dist
- [x] Add the rewrite rule /* to /index.html
- [ ] Deploy and open the live URL
- [ ] Open /projects/test directly and confirm the shell loads
- [ ] Refresh that page and confirm it still loads
- [x] Open /nope and confirm the 404 page shows

### Smoke test and close (1 h incl. buffer)

- [ ] Click every nav and footer link locally
- [ ] Check the layout at 360 px
- [ ] Check the layout at 768 px
- [ ] Check the layout at 1280 px
- [ ] Commit and push
- [ ] Write three lines of plan for Day 2

> **Day gate:** All seven routes work, layout is readable on phone and desktop, the live Render URL survives a refresh on a nested route, and the repo builds clean.

- [ ] Gate passed

---

## DAY 2 / 7.5 HOURS / 59 ITEMS

**Sanity foundation, Home, About Me, Résumé and Contact**

### Sanity project and Studio (1 h)

- [ ] Create the Sanity project
- [ ] Create the production dataset and confirm it is public
- [ ] Initialise the Studio in studio/
- [ ] Run the Studio locally and log in
- [ ] Deploy the Studio and note its URL
- [ ] Invite any other editors (or confirm you are the only one)
- [ ] Add http://localhost:5173 to CORS origins
- [ ] Add the Render site URL to CORS origins
- [ ] Run a test query from localhost in the browser
- [ ] Run a test query from the deployed site

### Schemas and queries (1 h)

- [ ] Create the profile schema
- [ ] Enforce profile as a singleton in the desk structure
- [ ] Add the resumeFile file field
- [ ] Add contactLinks and availability fields
- [ ] Mark intro, degree and availability as required
- [ ] Create the activity schema
- [ ] Mark activity title as required
- [ ] Install @sanity/client in web/
- [ ] Create the Sanity client in src/lib using env variables
- [ ] Write the profile query
- [ ] Write the activity query
- [ ] Confirm queries return published documents only (no drafts. ids)

### Home page (1.5 h)

- [ ] Render name and degree/year from the profile
- [x] Write the one-sentence technical statement (no unsupported claims)
- [x] Show availability from the profile
- [x] Add the View Projects button
- [ ] Add the Download Résumé button
- [x] Add the Contact button
- [x] Add the featured projects placeholder section
- [ ] Add the activities preview
- [x] Add a loading state
- [ ] Time yourself: can a stranger find goal, availability and contact in 60 seconds?

### About page (1.5 h)

- [x] Render the education section
- [x] Render skills from the profile
- [ ] Render experience entries from activity documents
- [x] Render the Beyond Code section
- [x] Check the fish business wording says breeder/supplier
- [ ] Sort activities by the order field

### Résumé page (0.75 h)

- [ ] Upload the résumé PDF to the profile in Studio
- [ ] Fetch the file URL in the page
- [ ] Add the Download button
- [ ] Add the in-browser summary section
- [ ] Test the download on desktop
- [ ] Test the download on your phone

### Contact page (0.75 h)

- [x] Add the mailto link
- [x] Add the LinkedIn link
- [x] Add the GitHub link
- [x] Show availability and working preference
- [ ] Click each link in a new tab and confirm it opens the right place

### Enter content and fallback (0.5 h)

- [x] Enter the profile document from docs/facts.md
- [ ] Enter each activity from docs/facts.md
- [ ] Publish every document
- [ ] Break the projectId temporarily and confirm the fallback contact info shows
- [ ] Restore the projectId

### Review and close (0.5 h)

- [ ] Check all four pages at 360 px
- [ ] Tab through all four pages by keyboard
- [ ] Search the code and pages for TODO and placeholder text
- [x] Search for the word “importer” and confirm it is absent
- [ ] Commit and push

> **Day gate:** Four pages show real Sanity content, a change to availability in Studio updates the site with no code edit, and the fallback works.

- [ ] Gate passed

---

## DAY 3 / 8 HOURS / 57 ITEMS

**Projects, blog and the SEO build step**

### Project and post schemas (1 h)

- [ ] Create the project schema with the planned fields
- [ ] Generate slug from title
- [ ] Mark title, slug and summary required
- [ ] Add the stage field with in-progress and complete values
- [ ] Validate repoURL, demoURL and fallbackURL as URLs
- [ ] Make image alt text required
- [ ] Create the post schema with tags and relatedProjects references
- [ ] Install the orderable-document-list plugin
- [ ] Add the project ordering list to the desk structure
- [ ] Deploy the updated Studio

### Queries and routes (1.5 h)

- [ ] Write the projects list query
- [x] Build the Projects list page
- [x] Add a category filter
- [ ] Write the project-by-slug query
- [x] Build the /projects/:slug route
- [x] Show the 404 page for an unknown slug
- [ ] Write the posts list query
- [x] Build the Blog list page
- [x] Build the /blog/:slug route
- [ ] Install a Portable Text renderer
- [ ] Install an image URL builder

### Case-study and blog templates (1 h)

- [x] Render the case study sections in order: problem, contribution, result, demo, architecture, stack, decision, improvements, attribution
- [x] Show the recorded fallback when no live demo exists
- [x] Style the blog article typography
- [ ] Style code blocks
- [x] Render alt text on every image
- [ ] Check code snippets at 360 px

### Enter content (2 h)

- [ ] Project A: upload images and diagrams, fill all fields, publish
- [ ] Project B: upload images and diagrams, fill all fields, publish
- [ ] Project C (optional): upload images and diagrams, fill all fields, publish
- [ ] Project A: open the public page and check content and links
- [ ] Project B: open the public page and check content and links
- [ ] Project C (optional): open the public page and check content and links
- [ ] Enter the blog post in Studio
- [ ] Add its tags and related project
- [ ] Publish it
- [ ] Open the public post and check layout

### Prerender and webhook (1.5 h)

- [ ] Create scripts/prerender.mjs
- [ ] Fetch published project and post slugs from Sanity
- [ ] Inject title, description and Open Graph tags into dist copies for each project
- [ ] Do the same for each post
- [ ] Set tags for the static pages
- [ ] Generate sitemap.xml
- [ ] Generate robots.txt with the sitemap line
- [ ] Change the build script to vite build then the prerender script
- [ ] Add the Sanity project ID as a build environment variable on Render
- [ ] Deploy and view-source a project URL to confirm its own title and tags
- [ ] Create a Render deploy hook
- [ ] Create the Sanity webhook for project, post and profile changes
- [ ] Publish a small edit and confirm a rebuild starts
- [ ] If webhooks are unavailable, write the manual deploy-hook step in docs/

### States and buffer (1 h)

- [x] Add a loading state to list and detail pages
- [x] Add a missing-image placeholder
- [x] Handle a missing demo link
- [x] Add an empty-list message
- [ ] Add a fetch-error message
- [ ] Commit and push

> **Day gate:** Two or more case studies and one post are live, drafts stay hidden, a published project’s URL serves correct meta tags, and a publish triggers a rebuild.

- [ ] Gate passed

---

## DAY 4 / 7.5 HOURS / 74 ITEMS

**AI Portfolio Assistant and safe backend**

### Gemini access (0.5 h)

- [ ] Create an API key in Google AI Studio
- [ ] List the models available on your free tier
- [ ] Choose one model and record its name
- [ ] Make one test request from the terminal and confirm it answers
- [ ] Store the model name as GEMINI_MODEL in api/.env
- [ ] Note the 10-minute cache interval in the README

### Flask skeleton (1 h)

- [ ] Create api/ with a virtual environment
- [ ] Install Flask, CORS support, an HTTP client and gunicorn
- [x] Write requirements.txt
- [x] Create app.py with /health
- [x] Add POST /api/ask
- [x] Load settings from environment variables
- [x] Add a JSON error handler
- [x] Return 400 when the question is missing
- [ ] Write a test for /health
- [ ] Write a test for /api/ask validation

### Corpus loader (1 h)

- [ ] Query published projects
- [ ] Query published posts
- [ ] Query the profile
- [ ] Query FAQ entries with visibleToAssistant true
- [ ] Convert Portable Text to plain text
- [ ] Split each document into chunks carrying title and URL
- [ ] Add an in-memory cache with a 10-minute TTL
- [ ] Confirm an unpublished project is absent from the corpus
- [ ] Define behaviour when Sanity is unreachable (reuse last cache or return the fallback)

### Retrieval (1 h)

- [ ] Lowercase and tokenise text
- [ ] Remove stopwords
- [ ] Implement keyword scoring (TF-IDF or BM25)
- [ ] Return the top 4 chunks
- [ ] Add a minimum score so unrelated questions return “no match”
- [ ] Test five sample questions and confirm the expected chunk ranks first

### Grounded Gemini call (1 h)

- [ ] Write the system prompt with the answering rules
- [ ] Wrap retrieved chunks as delimited data, not instructions
- [ ] Call Gemini from the server only
- [ ] Set a maximum output length
- [ ] Set a 15-second timeout
- [ ] Handle a quota (429) error with the fallback response
- [ ] Attach source links from the retrieved chunks on the server
- [ ] Ignore any URL the model writes
- [ ] Search web/dist for the API key and confirm it is absent
- [ ] Confirm the key is not in Git history

### Assistant page UI (1 h)

- [x] Build the question input
- [x] Disable submit while loading
- [x] Show a loading state
- [ ] Show a wake-up message if no reply after about 5 seconds
- [ ] Show an error message
- [x] Add 3–4 suggested question chips
- [x] Render the answer
- [ ] Render clickable source links
- [ ] Fetch FAQ entries straight from Sanity for the static fallback
- [x] Show the fallback when the API call fails
- [ ] Set VITE_API_URL

### Abuse controls (1 h)

- [x] Cap question length at about 300 characters
- [x] Cap the request body size
- [ ] Read the client IP from X-Forwarded-For
- [ ] Add a per-IP limit (for example 10 per minute)
- [ ] Add a global daily cap below the provider quota
- [ ] Return a clear 429 message
- [x] Restrict CORS to the site origin
- [ ] Refuse questions asking for secrets or private data

### Test set (0.5 h)

- [ ] “What projects have you built?” lists only published projects
- [ ] “Can I view the source code?” returns the real GitHub links
- [ ] “When are you available?” uses verified availability only
- [ ] Salary or private customer list question gets no invented answer
- [ ] Prompt-injection question is not obeyed
- [ ] Unpublishing a project removes it from answers after the cache interval
- [ ] Stopped backend shows the readable fallback and static FAQ
- [ ] Save pass/fail results in docs/assistant-tests.md

### Deploy the API (0.5 h)

- [ ] Create the Render web service from api/
- [ ] Set the start command to gunicorn app:app
- [ ] Set GEMINI_API_KEY, GEMINI_MODEL, SANITY_PROJECT_ID and ALLOWED_ORIGIN
- [ ] Deploy and open /health
- [ ] Set VITE_API_URL on the static site and rebuild
- [ ] Ask one question from the production site and confirm sources show

> **Day gate:** The assistant answers from published content on the live site, sources are server-attached, the key is hidden, and the fallback works when the API is down.

- [ ] Gate passed

---

## DAY 5 / 7.5 HOURS / 59 ITEMS

**Testing, publishing and recruiter-ready release**

### Production setup check (1 h)

- [ ] Confirm the static site, API and Studio URLs all use HTTPS
- [x] List environment variable names (no values) in the README
- [ ] Confirm Sanity CORS includes the production origin
- [ ] Confirm Flask CORS allows only the production origin
- [x] Confirm the rewrite rule is active
- [ ] Search Git history for .env files and secrets

### Functional verification (1 h)

- [ ] Click every nav link
- [ ] Click every footer link
- [ ] Load a project URL directly
- [ ] Refresh a project URL
- [ ] Load a blog URL directly
- [ ] Confirm /nope shows the 404 page
- [ ] Download the résumé
- [ ] Confirm every image loads
- [ ] Open the site in a private window and confirm no draft content is visible
- [ ] Create a draft project and confirm it is not public
- [ ] Publish a test project and confirm it appears
- [ ] Unpublish it and confirm it disappears
- [ ] Confirm the webhook rebuild ran

### Accessibility (1 h)

- [ ] Tab through every page
- [ ] Confirm focus is visible everywhere
- [ ] Confirm the skip link works
- [ ] Check text contrast
- [ ] Check every image has alt text
- [ ] Check each page has one h1 and ordered headings
- [ ] Confirm reduced-motion is respected
- [ ] Run Lighthouse accessibility on Home and a case study and fix findings

### SEO and previews (0.75 h)

- [ ] View-source a project URL and confirm its title, description and Open Graph tags
- [ ] Do the same for a post
- [ ] Confirm each static page has a meta description
- [ ] Confirm the Open Graph image loads
- [ ] Confirm the favicon shows
- [ ] Open sitemap.xml and confirm published routes are listed
- [ ] Paste a project URL into a link-preview checker and confirm the preview

### Security and abuse (0.75 h)

- [ ] Check the browser Network tab for the API key (should be absent)
- [ ] Send about 15 rapid requests and confirm a 429
- [ ] Send an oversized request and confirm rejection
- [ ] Lower the daily cap temporarily and confirm it triggers
- [ ] Request the API from another origin and confirm CORS blocks it
- [ ] Confirm no private data exists in the Sanity dataset

### Walkthrough and content review (1 h)

- [ ] Run the 60-second test: name, goal, availability, projects, contact, résumé
- [ ] Run the 5-minute engineer test: case study, repo, architecture
- [x] Read all public copy for invented claims
- [x] Confirm in-progress work is labelled
- [ ] Search the site for TODO and placeholder text
- [x] Confirm the fish business wording is correct

### Fix and capture (0.75 h)

- [ ] List open issues and mark each P1 or P2
- [ ] Fix every P1
- [ ] Take final screenshots
- [ ] Save demo fallbacks in the right place

### Documentation and release (0.75 h + 0.5 h buffer)

- [x] Write README setup steps
- [ ] Write README environment variable names
- [x] Write README deploy steps
- [ ] Write the add-a-project guide
- [ ] Write the webhook and deploy-hook notes
- [ ] Write troubleshooting
- [ ] Tag the release v1.0.0
- [ ] Push the tag
- [ ] Without touching code, add a new project in Studio and see it live

> **Day gate:** A recruiter can understand your goal, inspect genuine projects and contact you, and you can publish a new project with no code change.

- [ ] Gate passed
