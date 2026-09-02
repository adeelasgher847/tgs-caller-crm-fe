@AGENTS.md

# TGS Caller CRM — Frontend

Call center CRM frontend (Next.js App Router). Backend is a separate sibling
repo (`tgs-caller-crm-be`, FastAPI) — check it for the authoritative API
contract (`src/schemas/`, `src/routers/`) before inventing request/response
shapes.

## Stack & requirements

- Next.js (App Router, Turbopack), React 18, TypeScript (`strict: true`), Tailwind CSS.
- **Node >= 20.9** is required — `nvm use 20` before running `npm run dev`; the
  system default may be Node 16, which fails silently-ish (no listening port).
- `msw` mocks the backend in the browser (`app/providers/MockProvider.tsx`
  starts the worker; handlers in `mocks/handlers.ts`). Use mocks to build UI
  ahead of backend endpoints — the real backend stubs unbuilt routes with 501.
- Path alias `@/*` → repo root (`./*`), covers `app/`, `lib/`, `components/`.
  Prefer `@/lib/...`, `@/components/...` over relative `../../` imports.

## Auth & role model — the core domain rule

**Role selection never happens client-side.** The backend is the only source
of truth for a user's role(s); the frontend just reacts to it. This is a hard
product requirement, not a style preference — don't add a role dropdown/toggle
anywhere, even for demos.

Contract (frozen in the backend's `src/schemas/auth.py`, implementation may
still 501 until backend week 2):

- `POST /auth/login` `{email, password}` → `{access_token, token_type, expires_in_min}`
- `GET /auth/me` (Bearer token) → `{id, email, name, active, roles, created_at}`
- `RoleName = "fronter" | "closer" | "administrator"` — a user can hold
  multiple roles; frontend picks the landing route by priority
  (`administrator` > `closer` > `fronter`), see `lib/auth.ts`.

Frontend pieces:

- `lib/auth.ts` — `login()`, `getCurrentUser()`, `landingRouteForRoles()`,
  token storage (`localStorage`, key `tgs_crm_access_token`). Token in
  localStorage is a known trade-off for the pre-backend mock stage (XSS
  exposure vs. an httpOnly cookie) — revisit once real `/auth/login` ships.
- `components/auth/RequireRole.tsx` — client guard wrapping a page's content;
  redirects to `/login` if there's no token, the token is invalid, or the
  resolved roles don't include the required one. `RequireAuth` is the same
  but accepts any authenticated role (used by `/dashboard`, which isn't
  role-specific).
- Every role-landing page (`app/fronter`, `app/closer`, `app/admin`) wraps its
  body in `<RequireRole role="...">`. New protected routes must do the same —
  routes are open by default in Next.js, nothing blocks direct navigation
  unless a page explicitly guards itself.
- `/login` redirects an already-authenticated user straight to their landing
  route instead of re-showing the form.

## UI conventions

- Shared primitives live in `components/ui/` (`Input`, `Button`, `Alert`).
  Reuse these instead of inlining `<input>`/`<button>` markup — extend them
  with props rather than duplicating styles.
- Visual theme: dark (`bg-neutral-950`), teal accents (`teal-400`→`teal-600`
  gradients), not blue/indigo — that was tried and explicitly rejected.
- Errors (auth failures, form validation) render inline via `<Alert>` /
  `role="alert"` — never fail silently or let an unhandled rejection crash
  the page.

## Route-segment conventions (App Router)

Segments should carry their own `layout.tsx` for segment-specific metadata
(see `app/login/layout.tsx`) rather than leaving everything to the root
layout. Follow this pattern for new top-level routes that need their own
`<title>`.

## Known pre-existing issues (not caused by frontend feature work)

- `lib/api.tsx` has duplicated/broken content (imports a non-existent
  `packages/api-client/src/schema`, fails `tsc`). Don't extend it; it's
  unrelated scaffold cruft. `lib/auth.ts` uses plain `fetch` directly instead.
- `AGENTS.md` / `CLAUDE.md`'s `@AGENTS.md` block are auto-managed by
  `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`)
  — don't hand-edit the marked block, it gets regenerated. Content outside
  that block (this file) is left alone.
