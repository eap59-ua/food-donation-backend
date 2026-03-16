---
trigger: model_decision
description: when modifying critical project specifications (PRD, User Stories) or public API interfaces.
---

# Rule — Review Protocol for Critical Changes

To prevent feature creep, accidental breakage of public contracts, or unauthorized changes to core business logic, you MUST follow this protocol.

## 1. Scope of Critical Files
The following files are considered **CRITICAL**:
- `@/specs/PRD.md` (Product Requirements)
- `@/specs/UserStories.md` (Functional scope)
- `backend/app/presentation/api/**` (Public API signature changes)
- `backend/app/domain/entities/**` (Base business logic)

## 2. Mandatory Approval
- **STOP and ASK**: If a task requires modifying any of the files listed above, you MUST present the proposed changes to the USER first.
- **DO NOT** apply changes to these files silently.
- **Exception**: You may update these files WITHOUT asking only if the USER has explicitly instructed you to do so in the current message (e.g., "Update the PRD with...").

## 3. Communication Requirements
When asking for approval, you must provide:
1. **The Diff**: A clear explanation of what is being added, removed, or changed.
2. **Impact Analysis**: How this change affects existing features or future tickets.
3. **Rationale**: Why this change is necessary (link to ticket or user request).

## 4. Verification
Before considering the task "Done" after an approved change:
- Ensure the updated spec matches the final implementation exactly (Zero Drift).
- Update `@/specs/progress.md` noting that a critical specification was modified.
