# AI Engineering Portfolio

Updated from the supplied Day 0–5 input on 25 November 2026. See [implementation status](docs/implementation-status.md) and [CMS and release guide](docs/cms-release-guide.md).

The project is split into two independent deployable apps:

- `frontend/` — React + Vite frontend
- `backend/` — Flask backend

## Run locally

Frontend:

```bash
npm run install:frontend
npm run dev
```

Backend, in another terminal:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`.

## Build frontend

```bash
npm run build
```

The production files are generated in `frontend/dist`.

## Deploy to Render

Use the root `render.yaml` as a Blueprint. It creates:

1. `portfolio-web` as a static site
2. `portfolio-api` as a Python web service

After the API URL is created, set `FRONTEND_ORIGIN` on `portfolio-api` to the deployed frontend URL. The API exposes `/health` and `/api/ask`. Generative AI is deliberately disabled per the supplied input. Only approved, published FAQs are retrieved; no API key is required.

Backend environment variables:

- `PORT` — Render supplies the service port.
- `FRONTEND_ORIGIN` — the exact frontend origin allowed by CORS.
- `SANITY_PROJECT_ID`, `SANITY_DATASET` — public CMS source; no read token.
- `PER_IP_LIMIT`, `DAILY_REQUEST_CAP` — default 10/minute per address and 200/day globally.
- `RATE_LIMIT_DB` — optional SQLite location; default `backend/.rate-limits.sqlite3` regardless of working directory.
- `TRUST_PROXY` — leave false unless the hosting proxy is verified to overwrite the forwarded address. Limits then use the rightmost forwarded address. Otherwise clients share the proxy address limit.

Frontend variables: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_API_URL`, `SITE_URL`, optional `OG_IMAGE_URL`. Copy `frontend/.env.example` to `frontend/.env.local` for local configuration. `SITE_URL` must be the production origin. Without it builds intentionally discourage indexing and emit an empty sitemap. An explicitly configured but unavailable CMS fails the SEO build instead of publishing stale fallback pages.

Studio variables: `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`. Copy `studio/.env.example` to `studio/.env`, then run `npm --prefix studio install` and `npm --prefix studio run dev`. These IDs are not credentials. Studio editing uses Sanity login and project membership.

Backend variables must be exported in the shell or configured by the hosting service; Flask does not automatically load the example file. On Windows run `backend/.venv/Scripts/python.exe backend/app.py`; use Gunicorn on Render/Linux.

Content refresh: browser refreshes published data every minute; the API caches approved FAQs for 10 minutes. Expired cache is discarded on CMS failure so an unpublished answer is not retained indefinitely. FAQ answers also load directly in the browser when the API sleeps. SQLite counters survive worker restarts on the same disk, but Render ephemeral disk replacement/redeploy resets them; multiple instances need a shared durable limiter before enabling a paid provider.

The build generates per-route metadata, `sitemap.xml`, and `robots.txt`. It does not server-render article bodies. Existing SPA rewrites support direct links.

Checks: `npm --prefix frontend test`, `npm run build`, `node scripts/seo-check.mjs`, and the backend command below. Browser checks: install `@playwright/test` and `@axe-core/playwright` temporarily in the root, run the frontend on port 5173, then `node scripts/browser-check.cjs` and `node scripts/accessibility-check.cjs`. Set `BROWSER_EXECUTABLE` to an existing Chromium binary if Playwright's matching browser is unavailable.

Run backend checks with:

```bash
cd backend
python -m unittest discover -p "test_*.py"
```
