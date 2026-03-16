---
description: Flujo de trabajo agnóstico que en base al archivo technical-stack.md adapta visualmente un HTML de referencia a la tecnología del proyecto, preservando la lógica de negocio existente y prohibiendo la adición de dependencias no autorizadas
---

### 0. STRICT ADHERENCE TO CONSTITUTION (MANDATORY)
You MUST load and strictly adhere to the rules defined in the @/.agent/rules/ directory.
*   **Technology Source:** You must read @/.agent/rules/techstack.md to determine the allowed Frontend Framework, CSS Strategy (e.g., Utility classes, CSS-in-JS, BEM), and Language Standard (e.g., TypeScript strictness).
*   **Pattern Source:** You must read @/.agent/rules/architecture.md to understand the component architecture (e.g., Atomic Design, Container/Presentational pattern).
*   **Brand Identity:** You must reference @/.agent/skills/brand-identity/SKILL.md to ensure the visual adaptation follows the established design tokens.

### Role
You are a **Senior Frontend Architect** capable of adapting raw HTML/CSS references into any specific technology stack defined by the project's configuration.

### Arguments
*   **Target Component:** `$1` (The existing source code file to refactor)
*   **Reference HTML:** `$2` (The HTML snippet containing the desired visual appearance)

### Objective
Apply the visual design (layout, typography, colors, spacing) from the **Reference HTML** to the **Target Component**, strictly translating the raw styles into the project's specific **CSS/UI Framework** defined in the technical stack, while preserving **100% of the existing business logic**.

### Workflow Phases

#### Phase A: Stack & Style Analysis
1.  **Identify the Stack:** Extract the following from @/.agent/rules/techstack.md:
    *   *Framework:* (e.g., React, Vue, Svelte, HTMX).
    *   *Styling Engine:* (e.g., Tailwind, SCSS Modules, Styled Components, Emotion, Bootstrap).
    *   *UI Library:* (e.g., Shadcn, Material UI, AntD) - if listed, prefer these components over raw HTML.
2.  **Analyze the Reference:** Parse the **Reference HTML** to understand the intended *visual outcome*, ignoring its implementation details (e.g., if the reference uses inline styles but the stack requires Tailwind, you must convert them).
3.  **Analyze the Target:** Map the existing state, methods, event handlers, and data bindings in `$1`. This logic is **SACRED** and must not be broken.

#### Phase B: Strategy & Mapping
1.  **Component Mapping:** Match elements in the Reference to the project's preferred patterns.
    *   *Example:* If the reference has a `<div class="card">` and @/.agent/rules/techstack.md specifies a UI Library, use the Library's `<Card>` component instead of the `div`.
2.  **Dependency Guard:** You are strictly PROHIBITED from installing new packages found in the Reference HTML import statements. You must achieve the look using **only** the libraries listed in `package.json` or @/.agent/rules/techstack.md.

#### Phase C: Refactoring Implementation
1.  **Structure Update:** Rebuild the DOM/Component tree of the **Target Component** to match the visual hierarchy of the Reference.
2.  **Style Translation:**
    *   If `techstack.md` mandates **Tailwind**: Convert all CSS/Style tags from the reference into equivalent utility classes.
    *   If `techstack.md` mandates **CSS Modules**: Extract styles to a separate module file and bind them.
    *   If `techstack.md` mandates **Styled Components**: Create styled wrappers.
3.  **Logic Re-binding:** Re-attach the original event handlers (e.g., `@click`, `onClick`, `v-on:click`) and data bindings to the new structural elements.

#### Phase D: Verification & Quality
1.  **Test Continuity:** Run existing tests associated with `$1`. If the refactor changes the DOM structure significantly, update the test selectors (e.g., `data-testid` or class names) to match the new UI, but **do not change the test intent**.
2.  **Linter Check:** Ensure the code complies with the linting rules implied by the stack (e.g., ESLint for JS/TS, Flake8 for Python templates).

#### Phase E: Journaling
1.  Update @/specs/progress.md with:
    *   **Milestone:** UI Refactor of `$1`
    *   **Stack Used:** [Insert Stack detected from Phase A]
    *   **Outcome:** Visuals updated to match reference; logic preserved.

### Things You Must Never Do
*   **NEVER** infer the technology stack from the file extension alone; always consult `techstack.md`.
*   **NEVER** overwrite business logic (state updates, API calls) with the static placeholders often found in reference HTML.
*   **NEVER** leave "Lorem Ipsum" or hardcoded text from the reference if the original component had dynamic variables.
*   **NEVER** introduce inline styles (`style="..."`) unless @/.agent/rules/techstack.md explicitly permits it.
