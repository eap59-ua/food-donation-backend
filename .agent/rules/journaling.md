---
trigger: always_on
---

# Rule: journaling.md — Progress Journal Is Mandatory

## 0) Purpose
This rule prevents “invisible work” and ensures GAIA is resumable at any time.
Every workflow execution MUST leave a trace in `@/specs/progress.md`.

## 1) Scope
Applies to:
- Any GAIA workflow (planning, execution, audits, refactors, closures, etc.).
- Any manual procedure explicitly framed as “running a workflow” (e.g., “I’m doing /fix-error”, “running /close-feature”).

## 2) Non-negotiable requirement
- The successful execution of ANY workflow MUST end by appending exactly ONE new entry to `@/specs/progress.md`.

## 3) Append-only and placement
- `@/specs/progress.md` is append-only (do NOT rewrite history).
- Add the newest entry at the end of the file.
- Use a single blank line between entries.

## 4) Date format and timezone
- Date MUST be `YYYY-MM-DD` (Europe/Madrid).

## 5) Entry format (canonical template)

- **Date**: 2026-01-31
- **Milestone**: <what was achieved or attempted> (workflow: </name>)
- **Artifacts**:
  - <path 1>
  - <path 2>
- **Notes**: <optional, max 1–3 lines>

## 6) Workflow-specific journaling requirements 

### 6.0 /plan-feature-descr-from-user-conversation
MUST journal with:
- **Milestone**: `Generated Feature description for <Feature Name> (workflow: /plan-feature-descr-from-user-conversation)`
- **Artifacts** MUST include:
  - `specs/features/<feature-slug>/feature-descr.md`

### 6.1 /plan-user-stories-from-features
MUST journal with:
- **Milestone**: `Generated User Stories for <Feature Name> (workflow: /plan-user-stories-from-features)`
- **Artifacts** MUST include:
  - `specs/features/<feature-slug>/user-stories.md`
  - `specs/UserStories.md` (if updated by the workflow)

### 6.2 /plan-tickets-from-user-stories
MUST journal with:
- **Milestone**: `Generated Tickets for <STORY_ID> (<Feature Name>) (workflow: /plan-tickets-from-user-stories)`
- **Artifacts** MUST include:
  - `specs/features/<feature-slug>/tickets.md`

### 6.3 /plan-implementation-from-tickets
MUST journal with:
- **Milestone**: `Generated Implementation Plan <TICKET_ID> (workflow: /plan-implementation-from-tickets)`
- **Artifacts** MUST include:
  - `specs/features/<feature-slug>/plan_<TICKET_ID>.md`

### 6.4 /execute-plan (Implementation execution)
MUST journal with (keep it very short):
- **Milestone**: `Executed plan <TICKET_ID> (workflow: /execute-plan)`
- **Artifacts**: only the most relevant files/modules touched (do not dump huge lists)
- **Notes** SHOULD include one quick verification hint (command, endpoint, or screen)

### 6.5 /audit-security-compliance
MUST journal with:
- **Milestone**: `Security Audit Completed for <Feature/Ticket ID> (workflow: /audit-security-compliance)`
- **Result** MUST be one of: `✅/⚠️/❌`
- **Artifacts** MUST include:
  - any audited scope reference if known (e.g., ticket/feature path)
- Include a short “Result” note:
  - `✅ Secure` OR `⚠️ Minor Findings` OR `❌ Critical Risks`

### 6.6 /close-feature
MUST journal with:
- **Milestone**: `Feature closed — <feature-slug> (workflow: /close-feature)`
- **Artifacts** MUST include:
  - `specs/features/<feature-slug>/*`
- **Integration** (MUST include when applicable):
  - Pull Request reference (if created)
  - Merge commit hash (if merged)
- **Validation** (MUST include):
  - tests executed summary
  - Mode A deployment performed: YES/NO
  - if YES: validated commit hash (short)

### 6.7 /fix-error
MUST journal with:
- **Milestone**: Fixed error <ERROR_ID or short description> (workflow: /fix-error)
- **Artifacts**:
  - path to implementation plan of error
- **Notes**:
  - **Error**: <what was failing / observable symptom (short)>
  - **Root cause**: <identified cause (short)>
  - **Fix**: <what changed (short)>

### 6.8 /governance-check
MUST journal with:
- **Milestone**: `Updated constitutional documents (workflow: /governance-check)`
- **Artifacts** MUST include:
  - `.agent/<document path>/<document-name>.md` for each document updated

### 6.9 Any other workflow
MUST journal with:
- **Milestone**: Executed <name of the workflow>
- **Summary** MUST include:
  - Brief summary (two lines) of the work done

## 7) Quality constraints (keep progress.md useful)
- Entries MUST be concise: aim for 5–12 lines total.
- Do NOT paste large code, logs, or long diffs into `progress.md`.
- Use stable identifiers (Feature slug, Story ID, Ticket ID) whenever available.


## 8) Compliance check (self-gate)
Before considering a workflow “done”, verify:
- A new entry was appended to `@/specs/progress.md`
- The entry includes Date + Milestone + Artifacts
- Any workflow-specific fields above are included (when applicable)
