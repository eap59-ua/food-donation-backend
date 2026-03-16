---
description: workflow to refactor UI to adhere to Brand Identity
---

### 0. STRICT ADHERENCE TO STACK & BRAND (Anti-drift)
You MUST load and strictly adhere to:
1. **@/.agent/rules/techstack-frontend.md** (The SOURCE OF TRUTH for rules).
   - *Check this for:* Forbidden patterns (hex colors, inline styles), form rules (labels above), data fetching (React Query), and testing.
2. **@/.agent/skills/brand-identity/resources/tech-stack.md**
   - *Check this for:* Metric values, specific semantic token names, and UI patterns.

### Role
You are a **Senior Frontend Architect** specializing in migrating component code to the project's modern UI system.

### Arguments
- **Target Component:** `$1` (existing file to refactor)

### Objective
Refactor the **Target Component** to fully comply with the **Frontend Tech Stack** and **Brand Identity** while preserving **100% of existing business logic**.

---

## Workflow Phases

### Phase A: Analysis & Gap Detection
1. Analyze `$1` against the rules in `techstack-frontend.md`.
2. Map legacy styles/elements to the allowed primitives:
   - **Colors:** Hardcoded hex → Semantic tokens (from Brand Skill).
   - **Components:** HTML tags → shadcn/ui primitives.
   - **Spacing:** Pixel values → Tailwind scale (e.g., `gap-4`).

### Phase B: Implementation (Mandatory)
Follow the **Implementation Rules** defined in @/.agent/rules/techstack-frontend.md.
- **Styling:** Tailwind utilities only. No CSS modules/inline styles.
- **State:** React Query for server state.
- **Forms:** Zod + React Hook Form (labels above inputs).
- **Structure:** React 18 + TS.

### Phase C: Validation Gate
Before outputting, verify:
1. ✅ No `forbidden` patterns found (check `techstack-frontend.md`).
2. ✅ All colors use semantic tokens.
3. ✅ Icons are from `lucide-react`.
4. ✅ Remote calls use the centralized `axios` instance and `useQuery`.

### Final Output
Return the full refactored component code.
