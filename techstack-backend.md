# Backend Tech Stack

## Frameworks & Libraries
- **Language**: Python 3.12+
- **Web Framework**: FastAPI
- **Server**: Uvicorn
- **Database**: PostgreSQL 16
- **ORM**: SQLAlchemy 2.0 (Async)
- **Migrations**: Alembic
- **Validation**: Pydantic V2
- **Testing**: Pytest, AsyncIO

## Code Standards
- **Architecture**: Hexagonal (clean architecture).
- **Typing**: Strict type hints (mypy compatible).
- **Formatting**: Black / Ruff.
- **Linting**: Ruff.

## Directory Structure
```
backend/
  app/
    domain/          # Pure business logic (Entities, Ports)
    application/     # Use Cases, DTOs, Services
    infrastructure/  # Adapters (DB, External APIs)
    presentation/    # API Routers, Main
    main.py          # Entry point
  tests/
    unit/
    integration/
```
