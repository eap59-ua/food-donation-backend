---
name: testing-e2e-with-playwright
description: Generates, manages, and debugs Playwright End-to-End (E2E) tests implementing Page Object Model (POM). Use when the user wants to create UI tests, debug failures using Trace Viewer, or scaffold Page Objects.
---

# Playwright E2E Testing Skill

## When to use this skill
- When the user asks to "create an E2E test" or "verify a user journey".
- When generating tests from a `plan_<TICKET_ID>.md`.
- When debugging UI test failures or analyzing test traces.
- When scaffolding new Page Objects for the frontend.

## Core Principles
1.  **Page Object Model (POM)**: Separation of concerns is mandatory. Logic lives in `pages/`, verification lives in `specs/`.
2.  **Resilient Locators**: Prioritize user-facing attributes:
    1. `page.getByRole()` (semantics - BEST)
    2. `page.getByLabel()` (forms)
    3. `page.getByText()` (content)
    4. `page.getByTestId()` (explicit contracts - fallback)
    *Avoid XPath/CSS unless absolutely necessary.*
3.  **Data Determinism**: tests MUST NOT depend on the state of previous tests.
    *   **Seed via API**: Use `request` fixture to create data (e.g., create a user) before testing the UI flow (e.g., deleting that user).
    *   **Clean DB**: The environment must be reset before the suite runs.
4.  **Web-First Assertions**: Use `await expect(...)` which auto-retries. Never use `waitForTimeout`.

## Advanced Implementation Patterns

### 1. Data Seeding via API (Hybrid Testing)
Avoid creating data via UI steps (slow, flaky). Use the API instead.

```typescript
// frontend/tests/e2e/specs/delete-article.spec.ts
import { test, expect } from '@playwright/test';

test('User can delete an article', async ({ page, request }) => {
  // 1. Arrange: Create data purely via Backend API
  const newArticle = await request.post('http://localhost:8000/api/articles', {
    data: { title: 'To Delete', content: '...' }
  });
  const articleId = (await newArticle.json()).id;

  // 2. Act: Use UI to perform the critical action
  await page.goto(`/articles/${articleId}`);
  await page.getByRole('button', { name: 'Delete' }).click();

  // 3. Assert: Verify result
  await expect(page.getByText('Article deleted')).toBeVisible();
});
```

### 2. Global Authentication (Storage State)
Don't login in every test. Login once globally.

1.  **Configure `playwright.config.ts`**:
    ```typescript
    projects: [
      { name: 'setup', testMatch: /.*\.setup\.ts/ },
      {
        name: 'chromium',
        use: { storageState: 'playwright/.auth/user.json' },
        dependencies: ['setup'],
      },
    ]
    ```
2.  **Create `tests/auth.setup.ts`**:
    ```typescript
    import { test as setup, expect } from '@playwright/test';
    
    setup('authenticate', async ({ page }) => {
      await page.goto('/login');
      await page.getByLabel('Email').fill('user@example.com');
      await page.getByLabel('Password').fill('password');
      await page.getByRole('button', { name: 'Sign in' }).click();
      await expect(page).toHaveURL('/dashboard');
      
      await page.context().storageState({ path: 'playwright/.auth/user.json' });
    });
    ```

### 3. CI/CD & Debugging Configuration
Ensure `playwright.config.ts` has these settings to debug flakes:

```typescript
export default defineConfig({
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI if resources are tight */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. */
  reporter: 'html',
  use: {
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    /* Capture video only on failure */
    video: 'retain-on-failure',
  },
});
```

## Workflow: Generating a New Test

1.  **Analyze Journey**: Identify the ticket (e.g., T-FE-005).
2.  **Identify Pre-conditions**: What data must exist? (User? Article? config?). Plan the API seed.
3.  **Scaffold POM**:
    - Update/Create `frontend/tests/e2e/pages/<PageName>.ts`.
4.  **Write Spec**:
    - Create `frontend/tests/e2e/specs/<feature>.spec.ts`.
    - Implement the "Arrange (API) -> Act (UI) -> Assert (UI)" pattern.
5.  **Verify**: Run `npx playwright test`.

## Verification Checklist
- [ ] Test is independent (creates its own data or cleans up).
- [ ] No `waitForTimeout` or magic sleeps.
- [ ] Uses Page Object Model (no locators in spec).
- [ ] Uses Semantic Locators (Role/Label).
