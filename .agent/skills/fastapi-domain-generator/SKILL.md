---
name: generating-fastapi-domains
description: Generates hexagonal architecture directory structure and boilerplate code for new domains in the FastAPI backend. Use when creating a new backend module, feature, or domain.
---

# FastAPI Domain Generator

## When to use this skill
- When starting a new backend feature that requires its own domain model.
- When expanding the backend with new business entities and logic.
- Use when the user requests "create a new domain", "scaffold a backend feature", or "setup hexagonal structure for [X]".

## Workflow

1.  **Define Domain Name**: Identify the singular name of the domain (e.g., `incident`, `news`, `member`).
2.  **Create Directory Structure**: Ensure the following hierarchy exists under `backend/app/`:
    - `application/use_cases/[domain_name_plural]/`
    - `domain/entities/`
    - `domain/repositories/`
    - `infrastructure/db/mappers/`
    - `infrastructure/models/`
    - `infrastructure/repositories/`
    - `presentation/api/`
    - `presentation/schemas/`
3.  **Generate Foundation Files**: Create base boilerplate for each layer (see Templates).
4.  **Register Router**: Add the new domain router to the main FastAPI application in `backend/app/main.py`.
5.  **Verify DoD**: Ensure the new structure complies with @/.agent/rules/techstack-backend.md.

## Directory Checklist
- [ ] `backend/app/domain/entities/[domain_name].py`
- [ ] `backend/app/domain/repositories/[domain_name]_repository.py`
- [ ] `backend/app/application/use_cases/[domain_name_plural]/__init__.py`
- [ ] `backend/app/infrastructure/models/[domain_name].py`
- [ ] `backend/app/infrastructure/db/mappers/[domain_name]_mapper.py`
- [ ] `backend/app/infrastructure/repositories/[domain_name]_repository_impl.py`
- [ ] `backend/app/presentation/api/[domain_name_plural].py`
- [ ] `backend/app/presentation/schemas/[domain_name].py`

## Instructions

### 1. Entity Pattern
Entities MUST be plain Python classes or Dataclasses, independent of any framework. Use type hints for all attributes.

### 2. Repository Interface
Define an abstract base class (ABC) in the domain layer. This defines the "Port".

### 3. Infrastructure Implementation
The database model (SQLAlchemy) and the repository implementation (Adapter) live in the infrastructure layer.

### 4. Presentation & Schemas
Use Pydantic V2 for schemas. Ensure routers only call Use Cases, never repositories directly.

## Resources
Templates for these files can be found in @/.agent/skills/fastapi-domain-generator/resources/ (if available).
