---
description: Performs technical discovery to identify reusable components, logic, and data structures before ticket creation.
---

# Workflow: /technical-discovery

**Purpose:** Reduce code duplication and ensure architectural consistency by identifying existing assets (UI components, domain logic, database tables) that can be reused for a new feature.

---

## 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to:
- @/.agent/rules/architecture.md
- @/specs/DataModel.md
- @/.agent/rules/OperationalPhilosophy.md
- @/.agent/rules/techstack.md

---

## Inputs (ask if missing)
- **Feature Desc**: The path to the `feature-descr.md` or a summary of the new feature.

---

## Steps

### Step 1 — Knowledge Base Analysis
1. Read `@/specs/PRD.md` and the target `feature-descr.md`.
2. Inspect `@/specs/DataModel.md` to identify overlapping entities or similar data patterns.
3. Inspect `@/.agent/rules/architecture.md` to identify existing interaction patterns (e.g., how other modules handle uploads or notifications).

### Step 2 — Codebase Exploration (Backend)
1. **Search**: Use `grep_search` or `find_by_name` in `backend/app/` to find:
   - Existing Domain Entities that might be extended.
   - Use Cases with similar orchestration logic.
   - Infrastructure adapters (e.g., mailers, storage) already implemented.
2. **Action**: List at least 3 candidates for reuse or "lessons learned" from existing modules.

### Step 3 — Codebase Exploration (Frontend)
1. **Search**: Use `grep_search` in `frontend/src/` to find:
   - UI Components (buttons, inputs, cards, layouts) that match the new feature's needs.
   - Hooks or Services that handle similar data fetching / state management.
   - Design tokens or CSS patterns already in use.
2. **Action**: Identify specific components that should be imported instead of recreated.

### Step 4 — Integration Analysis
1. Identify potential "Breaking Points" where the new feature might conflict with existing logic.
2. Check for "Spec Drift" opportunities: does the new feature reveal a better way to structure old code?

### Step 5 — Technical Discovery Report
Produce a summary in the response to guide the next phase (`/plan-tickets-from-user-stories`):

#### Technical Discovery: [Feature Name]

**1. Data Model Reuse**
- [Found Entity/Table] -> Can be reused by [adding field X / extending relationship Y].
- ...

**2. Shared Logic (Backend)**
- [Found Service/Adapter] -> Use this for [functionality X].
- ...

**3. UI Component Inventory (Frontend)**
- [Found Component] -> Use for [UI part Y]. Do NOT recreate.
- ...

**4. Refactoring Opportunities**
- [Part of existing code] -> Should be moved to `core/` or `shared/` to support both modules.

### Step 6 — Pre-Ticket Recommendation
List 1–3 specific instructions that MUST be included in the implementation tickets to ensure this reuse actually happens.

---

## Stop Conditions
- Discovery reveals a major architectural conflict.
- The tech stack requested in the feature contradicts `@/techstack.md`.
