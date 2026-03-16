# Red de Donación de Alimentos — Backend API

> **GCS-08 Backend Team** | Gestión de Calidad Software (UA) 🎓

Plataforma que conecta **donantes de alimentos** (restaurantes, supermercados, particulares) con **receptores individuales y ONGs/Bancos de Alimentos**, reduciendo el desperdicio alimentario.

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| API | FastAPI + Python 3.11 |
| Base de Datos | PostgreSQL 16 (async via asyncpg) |
| ORM | SQLAlchemy 2.0 (async) |
| Auth | JWT (python-jose) + bcrypt (passlib) |
| Arquitectura | Hexagonal (Domain / Application / Infrastructure / Presentation) |
| Contenedores | Docker + Docker Compose |
| Tests | Pytest + HTTPX (in-memory SQLite) |

## Estructura del Proyecto

```
backend/
├── app/
│   ├── config.py               # Settings (env vars)
│   ├── main.py                 # FastAPI app + routers
│   ├── domain/                 # Entidades de negocio puras
│   │   ├── user.py
│   │   ├── donation.py
│   │   ├── request.py
│   │   └── enums.py
│   ├── application/            # Lógica de negocio + DTOs
│   │   ├── dtos.py
│   │   ├── auth_service.py
│   │   ├── donation_service.py
│   │   └── request_service.py
│   ├── infrastructure/         # ORM + DB
│   │   ├── database.py
│   │   └── models.py
│   └── presentation/           # FastAPI routers + deps
│       ├── dependencies.py     # JWT auth dependency
│       └── api/v1/
│           ├── auth_routes.py
│           ├── donation_routes.py
│           └── request_routes.py
└── tests/
    └── integration/
        └── test_api.py
```

## Puesta en marcha (Docker)

```bash
# Desde la raíz del proyecto
docker compose up --build
```

La API estará disponible en: **http://localhost:8000**
Documentación interactiva: **http://localhost:8000/docs**

## Puesta en marcha (local, sin Docker)

```bash
cd backend
pip install poetry
poetry install
# Necesitas PostgreSQL corriendo localmente, o cambia DATABASE_URL a SQLite para dev
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/food_donation uvicorn app.main:app --reload
```

## Ejecutar Tests

```bash
cd backend
pip install aiosqlite  # solo para tests
poetry run pytest tests/ -v
```

## API — Resumen de Endpoints

### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/v1/auth/register` | Registro de nuevo usuario |
| `POST` | `/api/v1/auth/login` | Login (JSON) → JWT Token |
| `GET`  | `/api/v1/auth/me` | Perfil del usuario autenticado |

### Donaciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET`  | `/api/v1/donations` | Listar donaciones (filtros: status, location) |
| `GET`  | `/api/v1/donations/{id}` | Detalle de una donación |
| `POST` | `/api/v1/donations` | [DONANTE] Crear donación |
| `PUT`  | `/api/v1/donations/{id}` | [DONANTE] Editar donación |
| `PATCH`| `/api/v1/donations/{id}/status` | [DONANTE/ADMIN] Cambiar estado |

### Solicitudes
| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/v1/requests` | [RECEPTOR/ONG] Solicitar una donación |
| `GET`  | `/api/v1/requests/me` | Mis solicitudes o solicitudes recibidas |
| `PATCH`| `/api/v1/requests/{id}/status` | [DONANTE] Aprobar/rechazar |

## Variables de Entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `DATABASE_URL` | postgresql+asyncpg://postgres:postgres@db:5432/food_donation | URL de conexión |
| `SECRET_KEY` | ⚠️ cambiar | Clave para firmar JWT |
| `ALGORITHM` | HS256 | Algoritmo JWT |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | 1440 | Expiración del token (24h) |
