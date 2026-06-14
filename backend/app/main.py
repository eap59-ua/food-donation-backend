from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
from app.config import settings
from app.infrastructure.database import engine, Base
from app.infrastructure.seed import seed_admin_user
from app.infrastructure import models  # noqa: F401 — ensures models are registered
from app.presentation.api.v1.auth_routes import router as auth_router
from app.presentation.api.v1.donation_routes import router as donation_router
from app.presentation.api.v1.request_routes import router as request_router
from app.presentation.api.v1.user_routes import router as user_router


# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create DB tables on startup and seed the default admin in development."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSession(engine) as session:
        await seed_admin_user(
            session,
            settings.ADMIN_EMAIL,
            settings.ADMIN_PASSWORD,
        )

    yield


app = FastAPI(
    title="Red de Donación de Alimentos API",
    version="1.0.0",
    description=(
        "API para conectar donantes de alimentos con receptores y ONGs. "
        "Desarrollado por GCS-08 Backend Team — Gestión de Calidad Software (UA)."
    ),
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https?://localhost:\d+",  # Allows any localhost port during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api/v1"
app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(donation_router, prefix=API_PREFIX)
app.include_router(request_router, prefix=API_PREFIX)
app.include_router(user_router, prefix=API_PREFIX)


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Bienvenido a la API de Red de Donación de Alimentos",
        "documentation": "/docs",
        "health": "/health",
        "version": "1.0.0"
    }


# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
