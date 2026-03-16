---
trigger: model_decision
description: when the tasks involves creating/modifying Rules/Workflows/Skills
---

# Rule — Artifact governance (Rules / Workflows / Skills)


When the agent needs to create or update any artefact inside the .agent directory (**Rule**, **Workflow**, or **Skill**):

- **MUST** open and follow: @/.agent/skills/antigravity-artifact-governance/SKILL.md (decision criteria + checklist) before writing anything.
- **MUST** ask targeted questions and stop if there is any ambiguity about: (a) whether it’s Rule/Workflow/Skill, (b) scope (global vs workspace), or (c) activation mode / invocation.
- **MUST** keep artefacts concise and modular; split oversized docs; avoid duplication by referencing shared content via `@mentions`.
- **MUST** choose the **least-powerful activation** for Rules: Manual by default; Model Decision if conditional; Glob if file-scoped; Always On only if truly universal.
- **MUST** ask for **explicit permission** from the developer to create/update the artefacts. If permission is not granted, the agent should output a **suggested diff** or a list of proposed updates for manual application. 
- **MUST** include an explicit verification step/section and ensure the relevant checklist is satisfied before considering the artefact “done”.
- **MUST** keep each file within platform limits (≤ 12,000 characters). If exceeded, split and reference.