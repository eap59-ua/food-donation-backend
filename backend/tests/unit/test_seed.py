import pytest
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select

from app.application.auth_service import pwd_context
from app.infrastructure.database import Base
from app.infrastructure.models import UserModel, UserRoleDB
from app.infrastructure.seed import seed_admin_user

# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"


@pytest.fixture
async def test_engine():
    engine = create_async_engine(TEST_DATABASE_URL, echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield engine
    await engine.dispose()


@pytest.fixture
async def test_session(test_engine):
    TestSessionLocal = async_sessionmaker(bind=test_engine, class_=AsyncSession, expire_on_commit=False)
    async with TestSessionLocal() as session:
        yield session


@pytest.mark.asyncio
# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
async def test_seed_admin_user_creates_admin_if_missing(test_session: AsyncSession):
    """Ensure admin seeding creates a user with ADMIN role when none exists."""
    admin_email = "seed-admin@test.local"
    admin_password = "SeedPassword123!"

    await seed_admin_user(test_session, admin_email, admin_password)

    result = await test_session.execute(
        select(UserModel).where(UserModel.email == admin_email)
    )
    admin_user = result.scalar_one_or_none()

    assert admin_user is not None
    assert admin_user.role == UserRoleDB.ADMIN
    assert admin_user.email == admin_email
    assert admin_user.hashed_password != admin_password
    assert pwd_context.verify(admin_password, admin_user.hashed_password)
