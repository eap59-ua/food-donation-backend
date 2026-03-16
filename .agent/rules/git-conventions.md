---
trigger: always_on
description: Git branching strategy, commit conventions, and development workflow. Use when performing git operations.
---

# Git Conventions  
Single `main` + Batched Feature Delivery + No Ticket Branches

---

## 0. Purpose & Principles

- `main` is the only permanent branch.
- No `develop` branch.
- Tickets do NOT create branches.
  - Exception: urgent production fixes may use `hotfix/...` branches.
- Work is organized as:
  - one feature delivery branch (`feature/...`)
  - many ticket-level commits on that branch
- Exactly one PR per feature, created only via `/close-feature`.
- Deployment is handled by a separate rule (Local Deployment Rule).

---

## 1. Branching Strategy

| Branch | Purpose | Source | Merge Target |
|---|---|---|---|
| `main` | Stable integration branch. Always deployable. | — | — |
| `feature/...` | Feature delivery branch. Contains commits for multiple tickets. | `main` | PR → `main` |
| `hotfix/...` | Urgent fix (exception path). | `main` | PR → `main` |

---

## 2. Branch Naming Rules

### 2.1 Feature Delivery Branch
- Format: `feature/<feature-slug>`
- Examples:
  - `feature/event-calendar`
  - `feature/community-payments`

### 2.2 Hotfix Branch (Exception)
- Format: `hotfix/<TICKET_ID>-<short-slug>`
- Examples:
  - `hotfix/BUG-042-login-crash`

---

## 3. Commit Message Convention (Ticket Traceability)

### Format
`type: (TICKET_ID) description`

### Types
- `feat`
- `fix`
- `refactor`
- `doc`
- `chore`

### Rules
- `TICKET_ID` is mandatory for ticket-related work.
- Use `NONE` only if there is truly no ticket.
- Use present tense and keep messages specific.
- Keep commits small and cohesive (one logical change per commit).

### Examples
- `feat: (INC-001) add events table migration`
- `feat: (INC-002) add create-event endpoint`
- `fix: (BUG-042) prevent null owner on delete`
- `doc: (INC-001) document event API contract`
- `chore: (NONE) update docker base image`

---

## 4. Development Workflow

### 4.1 Start a Feature
1) Sync `main`:
- `git checkout main`
- `git pull origin main`

2) Create the feature branch:
- `git checkout -b feature/<feature-slug>`
- `git push -u origin feature/<feature-slug>`

---

### 4.2 Implement Tickets (commits only)
For each ticket:
1) Work on `feature/<feature-slug>` (pull first):
- `git checkout feature/<feature-slug>`
- `git pull origin feature/<feature-slug>`

2) Implement changes.

3) Commit using the mandatory format:
- `type: (TICKET_ID) description`

4) Push regularly:
- `git push origin feature/<feature-slug>`

---

## 5. Pull Request Policy

### 5.1 The Only PR Moment: `/close-feature`

Only when the feature is ready, you run `/close-feature`.

Preconditions:
- Feature branch contains all required ticket commits.
- All internal checks you consider mandatory are done.
- Docs/specs updated if behavior changed.

Expected outcome:
- A single PR is created:
  - Base: `main`
  - Compare: `feature/<feature-slug>`
- Merge method preference: MERGE COMMIT (preserves ticket-level commits in `main`).
- Feature branch is deleted after merge.

Deployment note (mode selection):
- Pre-merge runtime validation may deploy from `feature/<feature-slug>` as defined in:
  - `local-deployment.md` Mode A (Release Candidate Deployment, pre-merge).
- Latest stable deployments must deploy from `origin/main` as defined in:
  - `local-deployment.md` Mode B (Latest Stable Deployment, post-merge).

---

## 6. Hotfix Policy (Exception Path)

Hotfixes are the only case where a ticket may result in its own branch.

- Create `hotfix/<TICKET_ID>-<short-slug>` from `main`.
- Open PR to `main` immediately.
- Merge method preference: MERGE COMMIT.
- Merge as soon as verified.

---

## 7. Non-Negotiables

- No `develop`.
- No ticket branches, except `hotfix/...` for urgent production fixes.
- One PR per feature (`/close-feature`) + hotfix PRs only.
- No direct pushes to `main` (when the repo is on GitHub).
- `main` must remain deployable.
