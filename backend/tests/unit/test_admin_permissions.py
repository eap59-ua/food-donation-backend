import uuid
from datetime import datetime

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from app.application.auth_service import AuthService
from app.application.dtos import UpdateUserDTO, UpdateRequestStatusDTO
from app.application.request_service import RequestService
from app.infrastructure.database import Base
from app.infrastructure.models import (
    DonationModel,
    DonationStatusDB,
    RequestModel,
    RequestStatusDB,
    UserModel,
    UserRoleDB,
)

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
async def test_admin_can_list_users(test_session: AsyncSession):
    admin = UserModel(id=uuid.uuid4(), name="Admin", email="admin@example.com", hashed_password="x", role=UserRoleDB.ADMIN)
    user = UserModel(id=uuid.uuid4(), name="User", email="user@example.com", hashed_password="x", role=UserRoleDB.DONANTE)
    test_session.add_all([admin, user])
    await test_session.commit()

    users = await AuthService(test_session).list_users()

    assert len(users) == 2
    assert any(u.email == "admin@example.com" for u in users)
    assert any(u.email == "user@example.com" for u in users)


@pytest.mark.asyncio
async def test_admin_can_update_another_user(test_session: AsyncSession):
    admin = UserModel(id=uuid.uuid4(), name="Admin", email="admin@example.com", hashed_password="x", role=UserRoleDB.ADMIN)
    user = UserModel(id=uuid.uuid4(), name="User", email="user@example.com", hashed_password="x", role=UserRoleDB.DONANTE)
    test_session.add_all([admin, user])
    await test_session.commit()

    dto = UpdateUserDTO(name="Updated User", role=UserRoleDB.ONG, is_active=False)
    updated = await AuthService(test_session).update_user(user.id, dto)

    assert updated.name == "Updated User"
    assert updated.role == UserRoleDB.ONG
    assert updated.is_active is False


@pytest.mark.asyncio
async def test_admin_can_list_all_requests(test_session: AsyncSession):
    admin = UserModel(id=uuid.uuid4(), name="Admin", email="admin@example.com", hashed_password="x", role=UserRoleDB.ADMIN)
    donor = UserModel(id=uuid.uuid4(), name="Donor", email="donor@example.com", hashed_password="x", role=UserRoleDB.DONANTE)
    requester = UserModel(id=uuid.uuid4(), name="Requester", email="requester@example.com", hashed_password="x", role=UserRoleDB.RECEPTOR)
    donation = DonationModel(
        id=uuid.uuid4(),
        donor_id=donor.id,
        title="Food",
        description="Fresh",
        quantity="5",
        location_address="City",
        expiration_date=datetime.utcnow(),
        status=DonationStatusDB.AVAILABLE,
    )
    request = RequestModel(
        id=uuid.uuid4(),
        donation_id=donation.id,
        requester_id=requester.id,
        message="Please",
        requested_quantity="2",
        status=RequestStatusDB.PENDING,
    )
    test_session.add_all([admin, donor, requester, donation, request])
    await test_session.commit()

    requests = await RequestService(test_session).get_my_requests(admin.id, is_donor=False, is_admin=True)

    assert len(requests) == 1
    assert requests[0].status == RequestStatusDB.PENDING
    assert requests[0].requester_name == "Requester"


@pytest.mark.asyncio
async def test_admin_can_update_request_status(test_session: AsyncSession):
    admin = UserModel(id=uuid.uuid4(), name="Admin", email="admin@example.com", hashed_password="x", role=UserRoleDB.ADMIN)
    donor = UserModel(id=uuid.uuid4(), name="Donor", email="donor@example.com", hashed_password="x", role=UserRoleDB.DONANTE)
    requester = UserModel(id=uuid.uuid4(), name="Requester", email="requester@example.com", hashed_password="x", role=UserRoleDB.RECEPTOR)
    donation = DonationModel(
        id=uuid.uuid4(),
        donor_id=donor.id,
        title="Food",
        description="Fresh",
        quantity="5",
        location_address="City",
        expiration_date=datetime.utcnow(),
        status=DonationStatusDB.AVAILABLE,
    )
    request = RequestModel(
        id=uuid.uuid4(),
        donation_id=donation.id,
        requester_id=requester.id,
        message="Please",
        requested_quantity="2",
        status=RequestStatusDB.PENDING,
    )
    test_session.add_all([admin, donor, requester, donation, request])
    await test_session.commit()

    dto = UpdateRequestStatusDTO(status=RequestStatusDB.APPROVED)
    updated = await RequestService(test_session).update_status(request.id, admin.id, is_admin=True, dto=dto)

    assert updated.status == RequestStatusDB.APPROVED

    refreshed = await test_session.get(RequestModel, request.id)
    assert refreshed.status == RequestStatusDB.APPROVED
    assert refreshed.donation.status == DonationStatusDB.RESERVED
