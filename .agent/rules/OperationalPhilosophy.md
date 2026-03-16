---
trigger: always_on
description: Mandatory operational philosophy for all execution workflows (fix-error, execute-plan, etc.). Ensures consistency, traceability, and zero-drift.
---

# Rule — Operational Philosophy (Execution Constitution)

This document defines the **immutable principles** that govern every code change, bug fix, or feature implementation. All workflows (e.g., `@fix-error`, `@execute-plan`) and skills MUST comply with these rules without exception.

---

## 1. Ticket Mandate (No Ticket, No Action)
- **Rule**: Every code change MUST be linked to a Ticket ID (e.g., `UM-USER-001-BE-T02`).
- **Constraint**: If a ticket doesn't exist, one must be created or assigned before modifying the codebase.
- **Workflow**: 
  1. Identify Ticket.
  2. Implement changes.
  3. **Mark as COMPLETED** in the corresponding `tickets.md` file (e.g., `[x] (YYYY-MM-DD)`).

## 2. Evidence-Based TDD (Red-Green-Refactor)
- **Rule**: You MUST prove the "bad state" before introducing the "good state".
- **Cycle**:
  1. **Red**: Write a test that fails for the *expected reason* (missing feature or existing bug).
  2. **Green**: Implement the *minimal* code to make the test pass.
  3. **Refactor**: Clean up the implementation while preserving the green state.
- **Evidence**: The agent MUST provide terminal output or logs showing the test failure first, and then the final success.

## 3. Atomic Traceability (Code-Level Tags)
- **Rule**: Every non-trivial block of added or modified code MUST carry a traceability comment.
- **Format (Mandatory)**: 
  - `// [Feature: <Feature-Name>] [Story: <Story-ID>] [Ticket: <Ticket-ID>]`
- **Rationale**: This allows any developer to immediately understand the context, origin, and intent of a code block directly from the file.

## 4. Holistic Artifact Synchronization (Zero-Drift)
- **Rule**: A Pull Request is not just code; it is an update to the entire system knowledge base.
- **Required Updates**: Every implementation PR MUST atomatically update:
  1. **Source Code & Tests**.
  2. **Specifications**: Update `feature-descr.md`, PRD or User Stories if implementation revealed new edge cases or changed behavior.
  3. **System Metadata**: Update `@/.agent/rules/ModeloDatos.md` and `@/.agent/rules/Arquitectura.md` if the schema or structure changed.
  4. **State Tracking**: Update `tickets.md` (completion status).

## 5. Git Protocol & Branch Hygiene
- **Rule**: Always follow the "Sync-Branch-Commit-Push" cycle defined in `@/git-conventions.md`.
- **Commit Message**: `type: (TICKET_ID) description` (Example: `feat: (UM-001) add login validation`).
- **Branch Naming**: `feat/<ticket-id>` or `fix/<ticket-id>`.

## 6. Journaling Persistence
- **Rule**: Every successful task session MUST end with a progress entry in **`@/specs/progress.md`**.
- **Format**:
  - **Date**: [YYYY-MM-DD]
  - **Ticket/Milestone**: [Summary]
  - **Artifacts**: [Paths to main files touched]
- **Goal**: Maintain a lightweight, human-readable log of "where we left off".

## 7. No Silent Decisions
- **Rule**: Avoid "Coding by Intuition". 
- **Constraint**: If there is a conflict between specs, rules, skills, workflows and/or existing code, you MUST:
  1. Flag the inconsistency.
  2. Ask the user for the "Single Source of Truth".
  3. Document the decision.

## 8. Discovery Mandate (Look Before You Leap)
- **Rule**: Before starting any coding task, you MUST perform a short technical discovery to identify reusable assets (UI components, domain logic, DB tables).
- **Goal**: Zero duplication. Do not recreate what already exists in the codebase.

## 9. Security by Default (ASVS Compliance)
- **Rule**: Every code change is an opportunity to strengthen security.
- **Mandate**: If a change involves data access, authentication, or authorization, you MUST verify it against @/security-backend.md or @/security-frontend.md.

## 10. Mandatory Containerized Development
- **Rule**: All local development, integration testing, and verification MUST be performed within a containerized environment (Docker).
- **Requirement**: The `frontend`, `backend`, and `database` services MUST be managed via `docker-compose`.
- **Constraint**: Running services directly on the host machine (e.g., `npm run dev`, `uvicorn`, `python main.py` outside of Docker) is strictly PROHIBITED for development and verification tasks. This ensures environmental parity and zero "it works on my machine" issues.

---

## Compliance Checklist for Agents (MANDATORY):
- [ ] **Context**: Is my branch naming and commit message following the Ticket ID?
- [ ] **Evidence**: Have I provided terminal output showing the test failing first (Red), and then succeeding (Green)?
- [ ] **Traceability**: Did I add `// [Feature: ...] [Story: ...] [Ticket: ...]` comments to all modified logic?
- [ ] **Synchronization**: Have I updated `ModeloDatos.md`, `Arquitectura.md`, and `tickets.md`?
- [ ] **Journaling**: Have I prepared the entry for `progress.md`?
- [ ] **Discovery**: Did I reuse existing components/logic instead of duplicating them?
- [ ] **Security**: Did I ensure no BOLA or XSS vulnerabilities were introduced?
- [ ] **Containerization**: Did I run and verify the changes inside the Docker environment?