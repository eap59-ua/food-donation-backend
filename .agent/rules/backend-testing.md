---
trigger: model_decision
description: Standards and constraints for writing backend tests (unit, integration, contract). Use when working on 'backend/tests'.
---

# Backend Testing Standards & Constraints

## 1. Core Principles
*   **Determinism**: Tests MUST NOT depend on system time, external network state, or execution order [1].
*   **Isolation**: Every test MUST start with a clean state. Database changes MUST be rolled back or truncated after each test [7, 10].
*   **Self-Sufficiency**: The test suite MUST be able to run on a fresh, empty environment (e.g., CI runner) without manual preparation. It MUST automatically handle database creation/migration at the start of the session (e.g., via `conftest.py` fixtures).
*   **Speed**: Unit tests MUST run in memory without Docker/DB. Integration tests SHOULD be optimized for speed [1].
*   **Ambiguity**: If the testing strategy for a complex feature is unclear or requires excessive mocking, the agent MUST ask the user for clarification before proceeding.

## 2. The Test Pyramid (Scope & Location)
*   **Unit Tests (`tests/unit/`)**:
    *   MUST cover domain services, business logic, and pure transformations.
    *   MUST NOT access the real DB, make HTTP calls, or mount the full app [2].
    *   MUST use mocks only for IO boundaries (e.g., S3, Email) [14].
*   **Integration Tests (`tests/integration/`)**:
    *   MUST run against a dockerized DB (test container or service).
    *   MUST NOT mock SQLAlchemy/ORM or Pydantic validation [3, 14].
    *   SHOULD cover endpoints (happy paths + error cases 4xx/5xx) [11].
*   **Contract Tests (`tests/contract/`)**:
    *   MUST validate OpenAPI compliance (e.g., using `schemathesis`).
    *   MUST fail on breaking changes to public schemas [12].

## 3. Implementation Details
*   **Factories**: USE `factory-boy` / `faker` for test data. DO NOT use massive JSON fixtures or hardcoded SQL [14].
*   **Assertions**: Tests MUST have a single, clear reason to fail. Use specific asserts (e.g., `assert response.status_code == 404`) [1].
*   **Async**: USE `pytest-asyncio` and `httpx.AsyncClient` for async endpoints [5, 9].

## 4. TDD Workflow
*   **Red/Green/Refactor**: When asking for a new feature, the agent SHOULD write the failing test first ("Red") before implementing the logic ("Green") [26].
