---
trigger: model_decision
description: Frontend testing standards and constraints (Vitest, Playwright, RTL).
---

# Frontend Testing Standards (React, Vitest & Playwright)

## 1. Core Philosophy: The Testing Pyramid & TDD
*   **Double Loop TDD**: When building a new feature, the agent SHOULD start with a failing test describing the user story.
    *   For major flows: Start with an E2E test (Playwright).
    *   For specific components/logic: Start with a Component/Unit test (Vitest) [3].
*   **Behavior over Implementation**: Tests MUST verify what the user sees/does (e.g., "User clicks 'Save'"), not implementation details (e.g., "State `isSaved` becomes true") [2].
*   **Accessibility First**: Selectors MUST prioritize accessibility attributes (`getByRole`, `getByLabelText`) over CSS classes or XPaths. This ensures the app is testable AND accessible [6].
*   **Zero Broken Windows**: A passing E2E test DOES NOT excuse a failing Component/Unit test. If a UI change breaks the component test, you MUST refactor the test to match the new behavior or delete it if it was brittle/redundant. Leaving tests in a failing state creates noise and erodes trust [15].

## 2. Unit & Component Testing (Vitest + RTL)
*   **Mocking Boundaries**: Use **MSW** for all network requests. DO NOT mock `axios`/`fetch` directly within components; intercept at the network layer to test loading/error states realistically [8].
*   **Wrappers**: All component tests MUST use a custom render wrapper that includes `QueryClientProvider` (with `retry: false`) and `MemoryRouter` [9].
*   **Interaction**: Use `userEvent` instead of `fireEvent` to simulate real browser interactions [10].

## 3. End-to-End Testing (Playwright)
*   **Page Object Model (POM)**: Every E2E test MUST use the Page Object Model pattern to decouple test logic from UI selectors [5], [4].
*   **Isolation**: Each E2E test MUST be independent. Use `test.beforeEach` or API calls to seed data/state. DO NOT rely on the state left by a previous test [11].
*   **Visual & Accessibility**: Critical flows SHOULD include visual regression checks (`await expect(page).toHaveScreenshot()`) [12] and accessibility scans (`new AxeBuilder({ page }).analyze()`) [7].

## 4. Anti-Patterns (MUST NOT DO)
*   **No "Sleeps"**: NEVER use fixed `time.sleep()` or `waitForTimeout()`. Use Playwright's auto-waiting assertions (e.g., `toBeVisible()`) [13].
*   **No TestID Abuse**: Avoid `data-testid` unless no semantic locator (Role, Label, Placeholder) is available [14].
