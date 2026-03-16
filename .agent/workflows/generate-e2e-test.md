---
description: Generates a Playwright E2E test from a ticket or feature spec, adhering to POM and data determinism rules.
---

# Workflow: /generate-e2e-test

**Purpose:** Automate the creation of robust, deterministic E2E tests for Frontend features, ensuring Page Object Model (POM) usage and proper data seeding.

## Prerequisites
- The backend must be running (or available via Docker).
- The feature implementation must be locally complete (UI components exist).
- **Docs Access**: You must be able to read:
    - `specs/features/<slug>/user-stories.md` (Source of User Journeys)
    - `specs/features/<slug>/feature-descr.md` (Source of NFRs & roles)
    - `@/.agent/skills/testing-e2e-with-playwright/SKILL.md` (Source of Patterns)

## Steps

### 1. Analyze Requirements & Pre-conditions
- **Input:** Ticket ID (e.g., `T-FE-LOGIN-01`) or Feature Name.
- **Sources of Truth**:
    - **User Journeys & Scenarios**: Read `specs/features/<slug>/user-stories.md`. The Gherkin scenarios are the exact list of tests to create.
    - **Roles & Permissions**: Read `specs/features/<slug>/feature-descr.md` (Section 2) to understand who can access what (e.g. Visitor vs Member).
    - **NFRs**: Read `specs/features/<slug>/feature-descr.md` (Section 6) for specific constraints (e.g., Locale/i18n check, Accessibility).
- **Action**: Extract the "Happy Paths" and "Edge Cases" from the inputs.
- **Output:**
    - List of Scenarios to automate.
    - List of required Data Pre-conditions (e.g., "Need a user with role Admin", "Need an event for Today").

### 2. Map UI & Page Objects
- **Action**: Inspect the running application (or component code) AND `frontend/tests/e2e/pages/`.
- **Goal**: Identify semantic selectors (`role`, `label`, `placeholder`) that match the `feature-descr.md` fields.
- **Decision**:
    - **IF** Page Object exists: Reuse it.
    - **IF** missing: Plan new Page Object file following `@/.agent/skills/testing-e2e-with-playwright/SKILL.md`.

### 3. Generate the Test Spec
- **Action**: Create `frontend/tests/e2e/specs/<feature>.spec.ts`.
- **Constraint**: Use the **Arrange-Act-Assert** pattern defined in the Skill.
    - **Arrange**: Use `request` context (API) to seed data. Refer to `user-stories.md` "Background" steps for what to seed.
    - **Act**: Use Page Object methods to drive the UI.
    - **Assert**: Verify business outcomes defined in the Gherkin "Then" steps.

### 4. Implementation (Code Generation)
- **Tool**: Use `write_to_file` to create/update files.
- **Strict Compliance**:
    - **NO** hardcoded sleeps (`waitForTimeout`).
    - **NO** XPath or CSS selectors unless absolutely unavoidable.
    - **MUST** use Page Object Model.
    - **MUST** use API Seeding (not UI seeding).

### 5. Verification Run
- **Action**: Execute the new test.
    - Command: `cd frontend && npx playwright test tests/e2e/specs/<feature>.spec.ts`
- **Output Check**:
    - **Pass**: Mark task as done.
    - **Fail**: Analyze the Trace/Output, fix the Selector or Logic, and Retry.

### 6. Journaling
- **Check**: Did you verify NFRs (e.g., correct date format) if required by `feature-descr.md`?
- **Action**: Update the Ticket/Plan status to reflect that E2E coverage exists.

## Stop Conditions
- If `user-stories.md` is missing scenarios.
- If UI is not implementable (selectors blocked).
- If the Backend API for seeding is not available.
