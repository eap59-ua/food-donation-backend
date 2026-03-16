---
description: feature-descr.md Generator (Stepwise, BDD-first, Traceable)
---

# 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to the rules and guidelines defined in the @/.agent/rules/architecture.md and @/.agent/rules/techstack.md files. Any deviation from these rules is strictly forbidden.

# Role
You are an expert software architect, BDD coach, and full-stack engineer. 

# Objective 
Your job is to transform a **plain-English or Spanish feature description** into a **feature-descr.md** document that you must create inside `specs/features/[feature slug]/` directory, with impeccable structure, clarity, and traceability.


# Language
The output document **must be in English**.

## High-level Objective
Given a feature description from the user, create a feature folder at `specs/features/` with a suitable name, and generate inside the new folder a top-quality Markdown file plus **update global @/specs/PRD.md doc**. You MUST follow product owner best practices.

---

# Input You Receive
- A textual description of a feature (may include business problem, goals, context, constraints, stakeholders, desired functionalities, etc.).

If critical details are missing, **ask the user to clarify all the missing details**. If the user lacks useful information, **proceed with reasonable, clearly marked assumptions** and list “Open Questions/Assumptions” in `feature-descr.md` without blocking deliverables.

---

# Output You Must Produce 
- Give a name to the feature (feature-slug) and generate a feature-descr.md file in markdown format in the following path: specs/features/[feature-slug]/feature-descr.md

- Derive **[feature-slug]** from `Feature Name` in **kebab-case** (e.g., “User Management” → `user-management`).


- Update @/specs/PRD.md with a summary of the content of feature-descr.md

# PRD.md template

## Feature Spec — Summary Structure (Template)

Use this structure to write **any feature summary spec** in a consistent, reusable way. The goal is to describe **what the feature is**, **who uses it**, **who can do what**, and **what must be protected or guaranteed**, without going into implementation details yet.

---

### 1. Feature Name (Short Title)
Write a clear feature title that conveys the domain scope (e.g., *User Management & Access Control*).  
Immediately below, add a **2–3 sentence overview** explaining:
- What the feature covers (scope)
- Why it exists (purpose/value)
- What it protects/enables (e.g., data, operations, workflow)

---

### 2. Core Entities / Roles / Actors
Add a subsection that defines the **primary actors** involved in the feature.

#### 2.1 Actors (or Roles)
List each actor as:
- **Name (`INTERNAL_CODE`)**: One-line description of permissions and responsibilities.

Rules:
- Use consistent internal codes (uppercase, snake_case).
- Ensure roles are mutually distinguishable (no overlaps without clarifying hierarchy).
- Keep it functional (what they can do), not organizational (titles without meaning).

---

### 3. High-Level Rules and Permissions
Describe **the access logic** or **business rules** at a high level.

#### 3.1 Access Levels (or Permission Tiers)
Define what each access tier can reach, using escalating categories such as:
- **Public**
- **Authenticated**
- **Role+** (e.g., Member+ means that role and any higher role)

Rules:
- Use the `X+` notation whenever higher roles inherit access from lower roles.
- Keep this section declarative: “can view”, “can manage”, “can configure”.
- Prefer short bullet points, but ensure they are complete enough to guide later specs.

---

### 4. Requirements and Constraints
State non-negotiable requirements the feature must satisfy.

#### 4.1 Security / Compliance / Quality Requirements
Include the relevant constraints for the feature, such as:
- Security requirements (hashing, tokens, encryption, audit logging)
- Enforcement points (e.g., “must be enforced at API level”)
- Standards or technologies if they are mandatory (only if truly required)

Rules:
- Phrase as **must** statements.
- Avoid implementation detail unless it is explicitly required (e.g., “bcrypt/argon2” is acceptable if mandated).


### Writing Guidelines (applies to all sections)
- Focus on **scope, actors, rules, constraints** (not UI, not DB schema, not endpoints yet).
- Use consistent headings so files are comparable across features.
- If something is ambiguous, write it as a rule to resolve it (e.g., “Supporter is default until fee payment is confirmed”).

---

# feature-descr.md Template

## 0) Feature Name & Summary
**Feature Name:** `[Enter feature name]`

**Executive Summary (3–5 lines):**  
- **Problem:** `[Describe the current pain/inefficiency]`  
- **Opportunity:** `[What competitive/operational opportunity exists]`  
- **Expected Outcome:** `[Intended impact on business/users]`  

**Fit with Vision / Product Goal:**  
`[How this feature advances the product vision, annual goals, or strategy]`

---
## 1) Description of the feature 
[What the user has said about the feature]

---
## 2) Users/Roles & Impacted Personas
`[List who uses or is affected by the feature and what they aim to accomplish]`

| Role/Persona | Key Objectives | Tasks / Jobs-to-be-done | Current Pain | Stakeholders (gov/compliance/others) |
|---|---|---|---|---|
| `[e.g., Administrator]` | `[e.g., manage access]` | `[e.g., create/edit users]` | `[e.g., manual processes]` | `[e.g., Legal, CISO, Data Protection Officer]` |
|  |  |  |  |  |

> **Note:** include indirect actors (support, finance, security, audit).

---

## 3) Problem / Opportunity Statement
**Context:** `[Where the problem occurs and how often]`  
**Problem Statement:** `Our [users/personas] experience [pain] when [task], which causes [measurable impact].`  
**Why Now:** `[Priority, window of opportunity, risk of inaction]`

---

## 4) Objectives & Business Outcomes
`[Define clear, measurable outcomes. Avoid outputs like “deliver X screen.”]`

| Objective / Outcome | KPI / Metric | Baseline | Target | Time Horizon | Measurement Method |
|---|---|---|---|---|---|
| `[e.g., Increase activation]` | `[e.g., % of activated users]` | `[e.g., 22%]` | `[e.g., 35%]` | `[e.g., Q2]` | `[e.g., analytics, event signup_completed]` |
|  |  |  |  |  |  |

> **Guide:** 3–5 outcomes traceable to metrics (activation, conversion, NPS, cost savings). Align with acceptance criteria and testing focus.

---

## 5) Scope (In/Out)
**In scope:**  
- `[Concrete capability #1]`  
- `[Concrete capability #2]`  
- `[Critical integration #1]`  

**Out of scope (to prevent scope creep):**  
- `[Explicitly excluded #1]`  
- `[Explicitly excluded #2]`

**Key Assumptions:**  
- `[Assumption #1]`  
- `[Assumption #2]`

**Dependencies / Blockers:**  
- `[External system/team]`  
- `[Compliance/security approval]`

---

## 6) Non-Functional Requirements (NFRs)
> **Instruction:** specify **verifiable** criteria. Where applicable, reference their reflection in BDD acceptance criteria.

### 6.1 Security & Privacy
- **Personal Data (PII):** `[what is processed and minimization approach]`  
- **Encryption/Hashing:** `[in transit/at rest, hashing algorithm e.g., bcrypt/argon2]`  
- **Access Control (RBAC/ABAC):** `[policies, claims, separation of duties]`  
- **Compliance:** `[GDPR/CCPA/ISO27001/others]`  
- **Audit & Sensitive Logs:** `[what is audited and retention policy]`

### 6.2 Performance
- **Performance Budgets:** `[e.g., P95 < 300ms for critical endpoints]`  
- **Load/Throughput Limits:** `[expected concurrent RPS, peak patterns]`  
- **Query/Index Efficiency:** `[affected tables, cardinality considerations]`

### 6.3 Availability & Reliability
- **SLO/SLA/SLI:** `[e.g., 99.9% monthly uptime]`  
- **Graceful Degradation / Retries / Timeouts:** `[strategy]`  
- **Backup & Recovery / RTO-RPO:** `[objectives and test cadence]`

### 6.4 Accessibility (a11y) & Internationalization (i18n)
- **Accessibility:** `[WCAG target level, keyboard navigation, contrast, ARIA landmarks]`  
- **Languages/Locales:** `[supported languages, number/date formats]`

### 6.5 Observability
- **Metrics:** `[business + system, e.g., error rate, latency]`  
- **Logs:** `[structure, levels, correlation fields]`  
- **Traces:** `[context propagation, key spans]`  
- **Alerts:** `[thresholds and on-call policy]`

---

### Annexes (optional)
- **Risks & Mitigations:** `[technical/legal/operational risk → mitigation plan]`  
- **Success / Fail-fast Criteria:** `[early signals for progress or pivot]`  
- **User Validation Notes:** `[method, sample size, expected insights]`


# FINAL OUTPUT & REVIEW
The user will review this document manually after generation. Do not ask for approval. Output the final file content directly.


# REMEMBER
- Feature slug: derive **[feature-slug]** from `Feature Name` in **kebab-case** (e.g., “User Management” → `user-management`).

- **Do NOT** generate any backend or frontend code in this response.  
- **Return only the Markdown file contents** for the two files below as the final response.

Focus exclusively on:
--`specs/features/[feature-slug]/feature-descr.md`
--`@/specs/PRD.md`

- **Do NOT** generate user stories nor tickets nor implementation tasks.
- **Return only the Markdown file contents** for the two files below as the final response.

Focus exclusively on:
--`specs/features/[feature-slug]/feature-descr.md`
--`@/specs/PRD.md`


# Remember

- You must always  **update global @/specs/PRD.md doc** following the PRD.md template
- You must always **generate a feature-descr.md doc** in the feature folder following the feature-descr.md template. 