---
name: setup-frontend-testing
description: Configures the frontend testing stack for a React/Vite project (Vitest, RTL, MSW). for E2E setup, use 'setup-e2e-testing'.
---

# Setup Frontend Testing (Unit/Integration)

## Procedure

### 1. Install Dependencies
Install the required dev-dependencies ensuring compatibility with React 18+ and Vite.
```bash
npm install -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @vitest/coverage-v8 msw
```

### 2. Configure Vitest (vitest.config.ts)
Create or update the config to use jsdom and set coverage thresholds:
*   Globals: `true`
*   Environment: `jsdom`
*   Setup Files: `src/test/setup.ts`
*   Coverage:
    *   Lines: 85%
    *   Branches: 75%

### 3. Setup Global Test Environment (src/test/setup.ts)
1.  Import `@testing-library/jest-dom`.
2.  Configure MSW Server lifecycle (`beforeAll(listen)`, `afterEach(reset)`, `afterAll(close)`).
3.  Mock global browser APIs not present in JSDOM (e.g., `ResizeObserver`, `matchMedia`).

### 4. Scaffold Folder Structure
Create the following structure to support Co-located Unit tests:
```text
src/
├── features/
│   └── [feature]/
│       ├── components/
│       │   └── [Component].test.tsx  # Unit/Component Tests
│       └── api/
│           └── mswHandlers.ts        # Network Mocks for this feature
├── test/
│   ├── setup.ts                      # Global setup
│   └── utils.tsx                     # Custom render wrapper
```

### 5. Create Custom Render Wrapper
In `src/test/utils.tsx`, export a `render` function that wraps components in:
*   `QueryClientProvider` (retry: false)
*   `MemoryRouter`
*   `HelmetProvider` (if used)

### 6. Verification
1.  Run `npm run test` to verify Vitest & MSW are active.

## Constraints
*   **E2E Separation**: Do NOT put Playwright tests here. Use the `testing-e2e-with-playwright` skill for E2E.
*   **MSW Modularization**: Ensure handlers are modular (per feature), not one giant file.
