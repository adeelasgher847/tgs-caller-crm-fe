# Auto Warranty CRM — Frontend Boilerplate

This repository contains the frontend-only scaffold for the Auto Warranty Call Center CRM. It provides a Next.js (App Router) + TypeScript starter with Tailwind CSS and a locally-mocked API surface so frontend work can proceed without a running backend.

Quick start
```bash
npm install
npm run dev        # starts Next.js on http://localhost:3000
# optional: regenerate Tailwind output in a separate terminal
npm run dev:tailwind
```

What’s included
- Next.js App Router scaffold with role-based routes: `/fronter`, `/closer`, `/admin`, `/dashboard`, `/login` (under `app/`)
- TypeScript + Tailwind CSS configured via `tailwind.config.js`
- Mock Service Worker (MSW) mocks in `mocks/` and `public/mockServiceWorker.js`, auto-started by the mock provider at `app/providers/MockProvider.tsx`
- Vendored API types for local development at `src/schema.d.ts` and a thin API helper at `lib/api.tsx`
- Dev scripts in `package.json`: `dev`, `build`, `start`, `lint`, `dev:tailwind`

Development notes
- This is frontend-only: to generate a typed API client, run the OpenAPI generation flow against a running backend and place the output into `packages/api-client` (see `Project_Boilerplate_Setup_Guide.md`).
- Copy `.env.example` to `.env` and fill values if you wire a backend or local services.

See [Project_Boilerplate_Setup_Guide.md](Project_Boilerplate_Setup_Guide.md) for full bootstrapping steps, architecture decisions, and backend/API client generation instructions.
