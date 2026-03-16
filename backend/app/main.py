from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.infrastructure.database import engine, Base
from app.infrastructure import models  # noqa: F401 — ensures models are registered
from app.presentation.api.v1.auth_routes import router as auth_router
from app.presentation.api.v1.donation_routes import router as donation_router
from app.presentation.api.v1.request_routes import router as request_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create DB tables on startup (for development). Use Alembic in production."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
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
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_PREFIX = "/api/v1"
app.include_router(auth_router, prefix=API_PREFIX)
app.include_router(donation_router, prefix=API_PREFIX)
app.include_router(request_router, prefix=API_PREFIX)


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "app": "food-donation-backend"}
