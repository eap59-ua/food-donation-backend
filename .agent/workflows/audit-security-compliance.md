---
description: Systematically audits newly implemented code against Backend and Frontend security checklists.
---

# Workflow: /audit-security-compliance

**Purpose:** Ensure that every code change (feature or fix) adheres to the project's security and compliance standards before it is finalized or merged.

---

## 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to:
- `<MEMORY[security-backend.md]>`
- `<MEMORY[security-frontend.md]>`
- @/.agent/rules/techstack.md

---

## Inputs (ask if missing)
- **Target**: The specific feature/ticket ID or the list of files to audit.

---

## Steps

### Step 1 — Backend Security Audit (API/Logic)
1. **Analyze Code**: Review the implemented endpoints, use cases, and repository implementations.
2. **Checklist Validation**: Run the following points from `security-backend.md`:
   - [ ] **BOLA Check**: Is authorization verified at the object level in every endpoint?
   - [ ] **RBAC Check**: Are roles and permissions verified server-side (not trusting frontend)?
   - [ ] **Input Validation**: Are Pydantic models using `extra=forbid` and strict types?
   - [ ] **Data Exposure**: Are output DTOs explicit (no serializing DB models directly)?
   - [ ] **PII/GDPR**: Are personal data fields handled with minimization?

### Step 2 — Frontend Security Audit (UI)
1. **Analyze Components**: Review the React components and services.
2. **Checklist Validation**: Run the following points from `security-frontend.md`:
   - [ ] **XSS Prevention**: No use of `dangerouslySetInnerHTML` or `eval`.
   - [ ] **Auth Storage**: Are tokens stored in HttpOnly cookies? (Check `techstack`).
   - [ ] **CSRF Protection**: If cookies are used, is there a CSRF token strategy?
   - [ ] **Sensitive Data**: Ensure no secrets are leaked in `VITE_*` env vars.

### Step 3 — Static Analysis Verification (Simulated)
1. **Action**: Scan the code for hardcoded secrets, keys, or debug logs.
2. **Action**: Verify that `FastAPI`'s `debug=True` is not active in any configuration that might reach production.

### Step 4 — Security Audit Report
Produce a report in the response:

#### Security & Compliance Audit: [Feature/Ticket ID]
- **Overall Status**: ✅ Secure / ⚠️ Minor Findings / ❌ Critical Risks

**Top Findings:**
- **[Severity (High/Med/Low)]**: [Description of the finding].
- ...

**Fix Verification:**
- [ ] Finding 1 -> Proposed fix: [X].
- [ ] Finding 2 -> Proposed fix: [Y].

### Step 5 — Verification & Re-execute (if needed)
If any **High or Medium severity** findings are discovered, you MUST:
1. Propose the fixes.
2. After user approval, apply them.
3. Re-run this workflow to confirm the fixes.

### Step 6 — Journaling
Append a note to **@/specs/progress.md**:
- **Date**: [YYYY-MM-DD]
- **Milestone**: Security Audit Completed for [Feature/Ticket ID]
- **Result**: [✅/⚠️/❌]

---

## Stop Conditions
- Discovery of hardcoded credentials/secrets.
- Broken Object Level Authorization (BOLA) detected in public endpoints.
- Unsanitized user input being rendered in React or used in DB queries.
