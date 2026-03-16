---
name: setup-backend-testing
description: Scaffolds the testing infrastructure for a FastAPI (Pydantic V2) backend using Pytest. Configures Dockerized DB, directory structure, and modern pyproject.toml settings.
---

# Setup Backend Testing

## Procedure

### 1. Analyze Context
1.  Locate `app/main.py`, `pyproject.toml`, and `requirements.txt`.
2.  Confirm Pydantic V2 is installed (`pydantic>=2.0`).

### 2. Install Dev Dependencies
Add the following to requirements-dev or poetry group:
*   `pytest`, `pytest-cov`
*   `pytest-mock` (Wrapper around unittest.mock)
*   `pytest-asyncio` (Critical for async Pydantic/FastAPI tests) [10]
*   `httpx` (For API integration tests)
*   `polyfactory` (Recommended for Pydantic V2) OR `factory-boy`
*   `respx` (For mocking external HTTP services) [5]

### 3. Scaffold Directory Structure
Create the hierarchy ensuring separation of concerns [11]:
```text
backend/tests/
├── unit/
├── integration/
├── contract/
├── factories/        # Pydantic Model Factories
├── conftest.py       # Global fixtures (DB session, AsyncClient)
└── pyproject.toml    # Configuration (instead of pytest.ini)
```
### 4. Configure conftest.py
Generate fixtures for:
• Async Client: httpx.AsyncClient with base_url="http://test".
• DB Session: A session strictly bound to the test transaction (rollback strategy).
• Schema Lifecycle: A `scope="session"` fixture that creates the DB schema (e.g., `Base.metadata.create_all(bind=engine)`) at start and drops it at finish. This guarantees tests work even if `test.db` doesn't exist.
• Event Loop: Override default event loop scope to session if using async fixtures.

### 5. Configure pyproject.toml
Inject the following configuration to handle Asyncio and warnings properly:
```toml
[tool.pytest.ini_options]
minversion = "6.0"
addopts = "-v --strict-markers --cov=app --cov-report=term-missing"
asyncio_mode = "auto"
testpaths = ["tests"]
markers = [
    "unit: Fast tests, no I/O [12]",
    "integration: Requires Docker/DB [12]",
    "contract: OpenAPI schema validation [12]",
]
filterwarnings = [
    "ignore::DeprecationWarning", # Filter noise from third-party libs
]
```
### 6. Create Baseline Tests (Pydantic V2 Style)
• tests/unit/test_smoke.py: Verify a Pydantic model uses model_validate correctly.
• tests/integration/test_health.py: Full async HTTP request to health endpoint.

### Constraints
• DO NOT use pytest.ini if pyproject.toml exists; consolidate config.
• ENSURE asyncio_mode = "auto" is set to avoid decorators on every async test.
