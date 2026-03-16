---
trigger: always_on
---

# Tech Stack (App-Level) — Generic Project Template

## Purpose
This document is the **single source of truth for cross-cutting constraints** (repo layout, spec-driven workflow, shared conventions).  
It intentionally **does not** duplicate backend/frontend details to avoid drift.

## Canonical Stack Files (No duplication elsewhere)
- **Backend tech stack & rules:** `techstack-backend.md`
- **Frontend tech stack & rules:** `techstack-frontend.md`
- **Execution Constitution:** `OperationalPhilosophy.md`

If a rule belongs clearly to one side (backend or frontend), it MUST live only in that file.

## Repository Layout (Canonical)
The repository is structured as:
- `specs/` — specification source of truth (features, PRDs, user stories, plans)
- `backend/` — backend service (API, DB, migrations)
- `frontend/` — frontend SPA (web client)

Any change to this structure MUST be reflected here in the same PR.

## Spec-Driven Development (SDD) Anti-Drift Rules
- **Specs drive code.** If implementation deviates, ask the developer whether you must:
  1) update the spec to match the new decision, or  
  2) revert the implementation to match the spec.  
  Leaving them inconsistent is not allowed.
- **One PR = one coherent change**: code + specs + docs updated together.
- **No “silent” tech changes**: introducing/removing a library, architectural layer, or tooling MUST be recorded in the relevant stack file.
- **Traceability**: each feature must have a corresponding spec directory under `specs/` and a clear implementation plan and status tracking.

## Language Rules
- **Everything except for User-facing UI strings (labels, buttons, copy) MUST be in English.**
- This includes:
  - **Specs & Plans**: All markdown files in `specs/`, `.agent/rules/`, implementation plans.
  - **Code**: Variable names, function names, class names.
  - **Comments**: Inline code comments, docstrings, commit messages.
  - **Artifacts**: Any generated file, diagram, or documentation.
- **Exception**: User-facing UI strings (labels, buttons, copy) **MUST be in Spanish** (Castilian), as this is a local application. Code entities (variables, functions, keys) MUST remain in English.

## Environments & Configuration (Shared Conventions)
- Configuration MUST come from environment variables (no hardcoded endpoints/keys).
- Frontend env vars MUST use `VITE_` prefix.
- Secrets MUST NOT be committed to the repository.

## Containerized Environment
- **Local Infrastructure**: `docker-compose.yml` is the single source of truth for the local development environment.
- **Port Mapping** (unless they are already in use):
    - Backend: `8005:8000` (Container 8000 mapped to host 8005)
    - Frontend: `5188:5188` (Vite default or custom)
    - Database: `5455:5432` (PostgreSQL)
- **Networking**: Frontend MUST communicate with the backend using the host mapping or internal Docker DNS as per configuration.

## CI / Quality Gates (Shared Expectations)
CI MUST fail on:
- lint errors
- typecheck failures
- failing tests (where defined per stack file)

CI configuration details and exact commands belong in:
- `techstack-backend.md` for backend
- `techstack-frontend.md` for frontend

#### Drift control rule (stack files)
Any PR that changes dependencies (add/remove) in either `backend/` or `frontend/` MUST:
- update the relevant stack file (`techstack-backend.md` or `techstack-frontend.md`), and
- keep the app-level file unchanged unless the change affects repo layout or cross-cutting conventions.