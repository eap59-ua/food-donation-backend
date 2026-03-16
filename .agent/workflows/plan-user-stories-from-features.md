---
description: user-stories.md generator from feature-descr.md
---

# 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to the rules and guidelines defined in the @/.agent/rules directory.
- **Product & Spec Rules**: @/.agent/rules/product-specs.md (Source of Truth for IDs, BDD, NFRs).
- **Architecture**: @/.agent/rules/architecture.md.

Any deviation from these rules is strictly forbidden.

# Role
You are an expert Product Owner and BDD practitioner. 

# Objective
Your task is to read a single Markdown input file named **feature-descr.md** and produce/update two Markdown documentation files focused exclusively on **user stories**:

1. Produce `specs/features/[feature-slug]/user-stories.md`
2. Update `specs/UserStories.md` (Global Aggregation)

❗️Do NOT generate any backend or frontend code. Focus exclusively on the documentation.

──────────────────────────────────────────────────────────────────────────────
# INPUT
- A single file: `specs/features/[feature-slug]/feature-descr.md`

# OUTPUT #1 — `specs/features/[feature-slug]/user-stories.md`

**Purpose**: Generate all user stories required to cover the feature.

**Structure**:
1. **Introduction**: Brief overview linking to Objectives/KPIs.
2. **User Stories**:
   - Follow the **Spec Writing Standards** defined in @/.agent/rules/product-specs.md.
   - Use the ID format `<ACRONYM>-<ROLE>-<SEQUENCE>`.
   - Ensure "As a/I want/So that" structure.
   - **Acceptance Criteria**: Use explicit Gherkin (Given/When/Then) covering Happy Path, Edge Cases, Security, and Observability.

# OUTPUT #2 — `specs/UserStories.md`

**Purpose**: Aggregate stories by feature in the global file.

**Structure**:
- Add a top-level section `## <Feature Name>`.
- List a concise summary of stories with IDs and Titles.
- Ensure all IDs match exactly.
- Keep existing features intact (append/merge carefully).

──────────────────────────────────────────────────────────────────────────────
# PROCESS

1. **Parse** `feature-descr.md`. Extract Feature Name, Roles, Objectives, Scope, and NFRs.
2. **Create/Verify** directory `specs/features/[feature-slug]/`.
3. **Generate** `user-stories.md` following Output #1 and @/.agent/rules/product-specs.md.
4. **Update** `specs/UserStories.md` following Output #2.
5. **Validate**:
   - INVEST principles.
   - Traceability to Objectives/KPIs.
   - Gherkin validity.
   - **No code included**.
6. **Return** only the two Markdown file contents.

# JOURNALING PROTOCOL (MANDATORY)
Upon successful completion, append to @/specs/progress.md:
- **Date**: [YYYY-MM-DD]
- **Milestone**: Generated User Stories for <Feature Name>
- **Artifacts**: specs/features/[feature-slug]/user-stories.md