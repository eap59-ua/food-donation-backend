---
description: Fix small errors in the code base with full traceability and SDD compliance.
---

# Workflow: /fix-error (The Orchestrator)

**Purpose:** Transform a bug report into a formal execution plan, ensuring no fix happens without a Ticket and a Plan. This workflow does NOT execute the code; it prepares the ground for `/execute-plan`.

---

## 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)

- You MUST load and strictly adhere to **@/.agent/rules/OperationalPhilosophy.md**.
- "No Ticket, No Action".
- "No Plan, No Code".

---

## Inputs (ask if missing)

- **Error Description**: Text, stack trace, or screenshot description.
- **Context**: Affected feature or file (optional).

---

## Steps

### Step 1 — Triage & Identification (Mental Sandbox)
1. **Analyze the error**: Determine root cause and affected Feature/Domain.
2. **Propose Ticket ID**: Define the ID `<ACRONYM>-BUG-<NN>` to be used (e.g., `UM-BUG-001`).
   *Do not write to files yet.*

### Step 2 — Git Preparation (Strict Protocol)
1. **Initial Check**: `git status` and `git branch`. Provide output to user.
2. **Sync**: `git checkout develop && git pull origin develop`
3. **Branch**: `git checkout -b fix/<ticket-id-lowercase>` (following `@/.agent/rules/git-conventions.md`).
   *Now all documentation and code changes will be isolated.*

### Step 3 — Formalize Artifacts (In Branch)
1. **Locate/Create Feature Folder**: Ensure `specs/features/<feature-slug>/` exists.
2. **Update `tickets.md`**: Append the new ticket entry.
   ```markdown
   - [ ] **UM-BUG-001**: Fix login timeout error on Safari.
   ```
3. **Create Plan**: Generate `specs/features/<slug>/plan_UM-BUG-001.md`.
   **Plan Content (MANDATORY)**:
   - **Header**: Ticket ID and Title.
   - **Task 1: Reproduction (Red)**: Create failing test.
   - **Task 2: Fix (Green)**: Implement fix.
   - **Task 3: Regression Guard**: Ensure test permanence.
   - **Task 4: Docs**: Update `tickets.md` to `[x]` and add traceability comments.

### Step 4 — Handover to Execution
1. **Instruction**: Invoke execution. The executor will detect it is already on the correct branch.

---

## Stop Conditions
- User refuses to classify the bug.
- Git dirty state prevents branching (ask user to stash/commit).

## Auto-Execution Link
// turbo
1. **Command**: `/execute-plan specs/features/<slug>/plan_<TICKET_ID>.md`