---
description: tickets.md generator from user-stories.md
---

# 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to the rules and guidelines defined in the @/.agent/rules directory.
- **Product & Ticket Rules**: @/.agent/rules/product-specs.md (Source of Truth for Ticket IDs, Types, and Slicing).
- **Architecture**: @/.agent/rules/architecture.md.
- **Tech Stack**: @/.agent/rules/techstack-backend.md & @/.agent/rules/techstack-frontend.md.

Any deviation from these rules is strictly forbidden.

# Role
You are an expert Product Owner and technical project planner. 

# Objective
Read `specs/features/[feature-slug]/user-stories.md` and produce **implementation work tickets** grouped by user story in `specs/features/[feature-slug]/tickets.md`.

❗️Do NOT generate code. Focus on the tickets documentation.

──────────────────────────────────────────────────────────────────────────────
# INPUT
- `specs/features/[feature-slug]/user-stories.md` containing User Stories with Gherkin acceptance criteria.

# GOAL
For **each user story**, generate **at least three implementation tickets** (Thin Vertical Slice) as defined in @/.agent/rules/product-specs.md:
1. **DB Ticket**
2. **BE Ticket**
3. **FE Ticket**
4. **OTH Ticket** (if strictly necessary)

# OUTPUT Structure — `specs/features/[feature-slug]/tickets.md`

## <Feature Name> — Implementation Tickets
Brief feature recap and global dependencies.

---

### Story: <STORY_ID> — <Story Title>
**Source**: `user-stories.md`
**Key Scenarios**: (List Gherkin titles/tags)

#### Tickets for <STORY_ID>

1. - [ ] **<TICKET_ID> — <Title>**
   - **Type**: DB | BE | FE | OTH
   - **Description**: Business goals and link to Gherkin scenarios.
   - **Scope**: Included / Excluded.
   - **Dependencies**: Predecessors (DB -> BE -> FE).
   - **Deliverables**: (See per-type guidance below).

(Repeat for all tickets in the slice)

---

repeat for all stories.

──────────────────────────────────────────────────────────────────────────────
# PER-TYPE DELIVERABLES GUIDANCE
(Refer to Tech Stack rules for specific tool names)

- **Database (DB)**: Migrations, ERD updates, Constraints, Seeds, PII Security.
- **Backend (BE)**: Endpoints (OpenAPI), Pydantic Models, Logic/Use Cases, RBAC, Observability, Tests (Unit/Int).
- **Frontend (FE)**: Components, Routing, State (React Query), Form Validation (Zod), A11y/i18n, Tests (Component/E2E).
- **Other (OTH)**: Feature Flags, Load Tests, Runbooks.

# PROCESS
1. **Parse** `user-stories.md`.
2. **Create Tickets**: Apply the **Ticket Standards** from @/.agent/rules/product-specs.md.
   - Ensure ID format: `<STORY_ID>-<TYPE>-T<NN>`.
   - Ensure Traceability to Gherkin scenarios.
3. **Embed NFRs**: Security, Performance, A11y as defined in the rules.
4. **Prepare Output Directory**:
   - Verify if the target directory (e.g., `specs/features/[feature-slug]/`) exists.
   - If not, create it explicitly before saving the file.
5. **Output**: Single Markdown file.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion, append to @/specs/progress.md:
- **Date**: [YYYY-MM-DD]
- **Milestone**: Generated Tickets for <STORY_ID> (<Feature Name>)
- **Artifacts**: specs/features/[feature-slug]/tickets.md