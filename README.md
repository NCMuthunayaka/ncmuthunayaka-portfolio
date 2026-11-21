# AI Engineering Portfolio

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

After the API URL is created, set `FRONTEND_ORIGIN` on `portfolio-api` to the deployed frontend URL. The API currently exposes `/health` and a safe placeholder `/api/ask`; the full source-grounded assistant is scheduled for Day 4.
