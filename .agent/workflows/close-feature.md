---
description: Validates and formally closes a feature folder by verifying tickets, tests, and business objectives.
---

# Workflow: /close-feature

**Purpose:** Formally close a feature in the SDD lifecycle by ensuring technical completion (tickets), quality (tests), and business alignment (objectives).

---

## 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to:
- @/.agent/rules/DoD.md (Definition of Done)
- @/.agent/rules/OperationalPhilosophy.md (Execution Constitution)
- @/.agent/rules/techstack.md

---

## Inputs (ask if missing)
- **Feature Slug**: The folder name under `specs/features/` (e.g., `user-management`).

---

## Steps

### Step 1 — Technical Verification (Tickets)
1. Locate `specs/features/[feature-slug]/tickets.md`.
2. **Action**: Scan all tickets in the file.
3. **Verification**:
   - Check if ALL tickets are marked as `[x] COMPLETED`.
   - **STOP and ask** if any ticket is pending (`[ ]`). Do not proceed if the vertical slice is incomplete.

### Step 2 — Quality Gate (Tests)
1. **Action**: Run the automated test suites relevant to the feature.
   - **Backend**: `pytest backend/tests` (or specific feature tests if available).
   - **Frontend**: `cd frontend && npm run test` (Vitest) and `npx playwright test` (E2E).
2. **Verification**:
   - All tests MUST pass.
   - **STOP and report** if any test fails.

### Step 3 — Business Alignment (Objectives)
1. Read `specs/features/[feature-slug]/feature-descr.md`.
2. **Action**: Compare implemented functionality with the **Objectives & Business Outcomes** section.
3. **Output**: List each objective and confirm its status (Implemented / Partially Implemented / Deferred).

### Step 4 — Documentation Update
1. **Action**: Ensure `specs/PRD.md` and `specs/UserStories.md` reflect the "Shipped" status of this feature.
2. **Action**: Verify that `@/specs/DataModel.md` and `@/.agent/rules/architecture.md` were updated by the previous implementation tickets.

### Step 5 — Produce Closure Report
Generate a summary Markdown report in the response:

#### Feature Closure Report: [Feature Name]
- **Status**: ✅ Closed / ⚠️ Partially Complete
- **Deliverables**:
  - [x] Database Schema & Migrations
  - [x] Backend Endpoints & Logic
  - [x] Frontend Components & UI
- **Test Results**: [Summary of test run]
- **Business Fit**: [1-2 sentences on how objectives were met]
- **Residual Tech Debt**: List any TODOs or minor pending refactors.

### Step 6 — Journaling (MANDATORY)
Append to **@/specs/progress.md**:
- **Date**: [YYYY-MM-DD]
- **Milestone**: Feature Closed: [Feature Name]
- **Artifacts**: specs/features/[feature-slug]/*

---

## Stop Conditions
- Any ticket in `tickets.md` is not marked as `COMPLETED`.
- Any automated test fails.
- Critical architectural debt identified (e.g., layer violations not fixed).
