"""
Integration tests for Auth endpoints.
Uses an in-memory SQLite DB so no Docker is needed for running tests.
"""
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.infrastructure.database import Base, get_db

# ── In-memory SQLite engine for testing ──────────────────────────────────────
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
TestSessionLocal = async_sessionmaker(bind=test_engine, class_=AsyncSession, expire_on_commit=False)


async def override_get_db():
    async with TestSessionLocal() as session:
        yield session


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(autouse=True)
async def setup_db():
    """Create all tables before each test and drop them after."""
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac


@pytest.fixture
async def donor_token(client: AsyncClient):
    await client.post("/api/v1/auth/register", json={
        "name": "DonorUser",
        "email": "donor@test.com",
        "password": "Secret123",
        "role": "DONANTE",
    })
    resp = await client.post("/api/v1/auth/login", json={
        "email": "donor@test.com",
        "password": "Secret123",
    })
    return resp.json()["access_token"]


@pytest.fixture
async def receptor_token(client: AsyncClient):
    await client.post("/api/v1/auth/register", json={
        "name": "ReceptorUser",
        "email": "receptor@test.com",
        "password": "Secret123",
        "role": "RECEPTOR",
    })
    resp = await client.post("/api/v1/auth/login", json={
        "email": "receptor@test.com",
        "password": "Secret123",
    })
    return resp.json()["access_token"]


# ── Tests ─────────────────────────────────────────────────────────────────────

class TestAuth:
    async def test_register_success(self, client: AsyncClient):
        resp = await client.post("/api/v1/auth/register", json={
            "name": "Test User",
            "email": "test@example.com",
            "password": "password123",
            "role": "RECEPTOR",
        })
        assert resp.status_code == 201
        data = resp.json()
        assert data["email"] == "test@example.com"
        assert data["role"] == "RECEPTOR"

    async def test_register_duplicate_email(self, client: AsyncClient):
        payload = {"name": "U", "email": "dup@test.com", "password": "pass", "role": "RECEPTOR"}
        await client.post("/api/v1/auth/register", json=payload)
        resp = await client.post("/api/v1/auth/register", json=payload)
        assert resp.status_code == 400

    async def test_login_success(self, client: AsyncClient):
        await client.post("/api/v1/auth/register", json={
            "name": "U", "email": "login@test.com", "password": "pass", "role": "RECEPTOR"
        })
        resp = await client.post("/api/v1/auth/login", json={
            "email": "login@test.com", "password": "pass"
        })
        assert resp.status_code == 200
        assert "access_token" in resp.json()

    async def test_login_wrong_password(self, client: AsyncClient):
        await client.post("/api/v1/auth/register", json={
            "name": "U", "email": "wp@test.com", "password": "correct", "role": "RECEPTOR"
        })
        resp = await client.post("/api/v1/auth/login", json={
            "email": "wp@test.com", "password": "wrong"
        })
        assert resp.status_code == 401

    async def test_get_me(self, client: AsyncClient, donor_token: str):
        resp = await client.get(
            "/api/v1/auth/me",
            headers={"Authorization": f"Bearer {donor_token}"},
        )
        assert resp.status_code == 200
        assert resp.json()["email"] == "donor@test.com"


class TestDonations:
    async def test_create_donation_as_donor(self, client: AsyncClient, donor_token: str):
        resp = await client.post(
            "/api/v1/donations",
            json={
                "title": "10kg Manzanas",
                "quantity": "10kg",
                "location_address": "Calle Mayor 1, Alicante",
            },
            headers={"Authorization": f"Bearer {donor_token}"},
        )
        assert resp.status_code == 201
        assert resp.json()["status"] == "AVAILABLE"

    async def test_receptor_cannot_create_donation(self, client: AsyncClient, receptor_token: str):
        resp = await client.post(
            "/api/v1/donations",
            json={"title": "X", "quantity": "1kg", "location_address": "Addr"},
            headers={"Authorization": f"Bearer {receptor_token}"},
        )
        assert resp.status_code == 403

    async def test_list_donations_public(self, client: AsyncClient, donor_token: str):
        await client.post(
            "/api/v1/donations",
            json={"title": "Naranjas", "quantity": "5kg", "location_address": "Alicante"},
            headers={"Authorization": f"Bearer {donor_token}"},
        )
        resp = await client.get("/api/v1/donations")
        assert resp.status_code == 200
        assert len(resp.json()) >= 1


class TestRequests:
    async def _create_donation(self, client: AsyncClient, token: str) -> str:
        resp = await client.post(
            "/api/v1/donations",
            json={"title": "Pan", "quantity": "2kg", "location_address": "Alicante"},
            headers={"Authorization": f"Bearer {token}"},
        )
        return resp.json()["id"]

    async def test_receptor_can_request_donation(
        self, client: AsyncClient, donor_token: str, receptor_token: str
    ):
        donation_id = await self._create_donation(client, donor_token)
        resp = await client.post(
            "/api/v1/requests",
            json={"donation_id": donation_id, "message": "Lo necesito para el comedor"},
            headers={"Authorization": f"Bearer {receptor_token}"},
        )
        assert resp.status_code == 201
        assert resp.json()["status"] == "PENDING"

    async def test_donor_can_approve_request(
        self, client: AsyncClient, donor_token: str, receptor_token: str
    ):
        donation_id = await self._create_donation(client, donor_token)
        req_resp = await client.post(
            "/api/v1/requests",
            json={"donation_id": donation_id},
            headers={"Authorization": f"Bearer {receptor_token}"},
        )
        request_id = req_resp.json()["id"]

        resp = await client.patch(
            f"/api/v1/requests/{request_id}/status",
            json={"status": "APPROVED"},
            headers={"Authorization": f"Bearer {donor_token}"},
        )
        assert resp.status_code == 200
        assert resp.json()["status"] == "APPROVED"

    async def test_donor_cannot_request_own_donation(
        self, client: AsyncClient, donor_token: str
    ):
        donation_id = await self._create_donation(client, donor_token)
        resp = await client.post(
            "/api/v1/requests",
            json={"donation_id": donation_id},
            headers={"Authorization": f"Bearer {donor_token}"},
        )
        assert resp.status_code == 403
