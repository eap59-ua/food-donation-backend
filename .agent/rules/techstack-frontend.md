---
trigger: model_decision
description: when working on anything related to the frontend
---

# Frontend Tech Stack & Implementation Rules — Generic Project

## Purpose
Define the **frontend-only** technology choices, UI system rules, data/state decisions, and quality gates.  
Backend rules must live in `techstack-backend.md`.

## Core Stack (Agnostic Options)
- **Framework:** React 18+ OR Vue 3+ (TypeScript Mandatory)
- **Build Tool:** Vite
- **App Type:** Single Page Application (SPA)
- **Routing:** React Router (React) OR Vue Router (Vue)
- **Styling Engine:** Tailwind CSS (Mandatory)
- **Component Library:** shadcn/ui (React) OR shadcn-vue / Radix Vue (Vue)
- **Icons:** Lucide (React/Vue)
- **Forms:** React Hook Form (React) OR VeeValidate (Vue) + Zod
- **HTTP Client:** Axios
- **Server State / Cache:** TanStack Query (React/Vue)

## Brand Tokens & Theming (Mandatory)
### Source of truth
- Brand tokens live in `design-tokens.json`.

### Consumption rules
- Components MUST use semantic tokens (e.g., `bg-primary text-primary-foreground`) rather than hardcoded hex.
- Dark mode MUST be supported using Tailwind’s `class` strategy (`<html class="dark">`).
- Token updates require updating:
  1) the CSS variables used by Tailwind/shadcn theme, and
  2) any docs/examples that reference tokens.


### Forbidden
- No raw hex colors inside JSX.
- No custom CSS files for component styling (Tailwind + shadcn only), except vendor CSS required by third-party libs (see React Quill).

## UI Implementation Rules
### Buttons
- Primary actions: `Button` default variant (maps to `primary`).
- Secondary actions: `outline` or `ghost`.
- Dangerous actions: `destructive`.
- Validation wiring MUST use Zod resolvers.


### Forms
- Labels MUST be above inputs.
- Validation MUST be Zod + Framework-specific resolver (no ad-hoc validation).
- Consistent spacing: use `space-y-4` or `gap-4` patterns.

### Layout
- Use Tailwind Flex/Grid. Responsive behavior is mandatory.
- Avoid fixed pixel layouts unless there is a clear requirement.

### React Quill
- Vendor CSS required by Quill is allowed, imported once globally.
- Do not restyle Quill with random hex values; integrate with theme tokens when possible.

## Data Fetching & State Decisions (Mandatory)
### 1) Server state: TanStack Query
- All remote data reads MUST use `useQuery`.
- All writes MUST use `useMutation`.
- Mutations MUST invalidate relevant queries on success.
- UI MUST explicitly handle loading and error states (skeletons/spinners + messages).

Recommended defaults (adjust per feature as needed):
- `staleTime`: 30–60 seconds
- `retry`: 1–2 retries for idempotent queries only

### 2) HTTP: Axios
- Use a single axios instance (`src/api/http.ts`) with:
  - `baseURL` from `VITE_API_BASE_URL`
  - auth token injection (if applicable)
  - centralized error mapping (401 -> reauth/logout flow)

### 3) Client state
Prefer:
- URL state for filters/pagination/sort (query params)
- Local component state for purely UI state (modals, toggles)
Introduce a global store ONLY if there is real cross-feature state pressure.
- Do NOT add Redux by default.

### 4) Auth token storage (security trade-off)
- If JWT is stored in `localStorage`, treat as an explicit trade-off.
- Prefer HttpOnly cookies if backend supports it.

### 5) JWT decoding (jwt-decode)
- The project uses `jwt-decode` **only** to read claims from the access token (e.g., `exp`, roles/permissions if present).
- Expiration handling:
  - If `exp` is in the past, the UI MUST treat the session as expired and trigger the standard logout/reauth flow.
  - API 401 responses MUST also trigger the standard logout/reauth flow (single centralized handler).

No other JWT parsing logic should be implemented ad-hoc across components.

## Quality & Tooling (Frontend)### Canonical scripts (current + required)
Current canonical scripts (already present):
- `npm run dev` — start Vite dev server
- `npm run build` — `tsc && vite build`
- `npm run lint` — ESLint

Required additions when introducing formatting/tests:
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier write
- `npm run test` / `npm run test:watch` — Vitest
- `npm run test:e2e` — Playwright

When new scripts are added to `package.json`, this list MUST be updated in the same PR.
### TypeScript
- TypeScript strict mode is expected.
- No `any` without explicit justification.

### Lint / Format
- ESLint is mandatory.
- Prettier must be added and configured so formatting is consistent and automated.

### Testing (Mandatory)
- Unit/Component: Vitest + React Testing Library
- E2E: Playwright (MANDATORY)
  - MUST use Page Object Model (POM) for all tests.
  - MUST use the `testing-e2e-with-playwright` skill for generation.
  - Critical flows coverage is required.
- Utilities/hooks have unit tests

### Coverage Thresholds (CI Gate)
- **Metrics:** Coverage will be reported for lines and branches.
- **Global Thresholds:** MUST be at least **85% lines** and **75% branches** coverage.
- **New/Modified Code:** MUST be at least **90% lines** and **85% branches** coverage.
- **Critical Components:** MUST be at least **90% lines** and **85% branches** coverage.
- **Regression Policy:** No PR may reduce the global coverage percentage.
- **Exclusions:** All exclusions MUST be explicitly declared in configuration and reviewed.

## Forbidden Patterns
- No jQuery.
- No Bootstrap classes.
- No styled-components / CSS modules / new CSS files for component styling.
- No direct API calls inside components without React Query hooks.
- No hardcoded brand colors.
- **No references to specific application names** (e.g., "Neighborhood Association") in rules. Use "Application" or $APP_NAME.

## Folder Structure (Canonical within `frontend/src/`)
This structure is mandatory to avoid drift as the app grows:

- `app/`
  - `router/` (route definitions, guards)
  - `providers/` (QueryClientProvider, theme, auth context)
  - `layout/` (App shell, nav, page layout)
- `components/`
  - `ui/` (shadcn components only)
  - `common/` (shared, app-specific components)
- `features/` (vertical slices)
  - `[feature-name]/` (e.g., `dashboard/`, `quiz-creation/`)
  - Each feature MUST match a `specs/features/<slug>` entry.
  - Allowed structure: `api/`, `components/`, `hooks/`, `pages/`, `types.ts`
  - **Forbidden**: `src/pages/admin`, `src/pages/member` (Role-based folders are banned; organization is by Feature).
- `api/` (axios instance, endpoint helpers)
- `lib/` (shared utilities, e.g., `cn`)
- `styles/` (global styles only; vendor css allowed)
- `types/` (shared types)

Any structural change MUST be reflected in this file.

## Change Control
Any change to:
- styling system (Tailwind/shadcn),
- routing approach,
- data fetching approach (React Query),
- folder structure,
MUST update this file in the same PR.
