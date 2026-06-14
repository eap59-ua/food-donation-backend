"""Database seeding utilities for the development environment."""
import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.auth_service import pwd_context
from app.infrastructure.models import UserModel, UserRoleDB


# // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
async def seed_admin_user(
    session: AsyncSession,
    admin_email: str,
    admin_password: str,
) -> None:
    """Seed an admin user if it does not already exist."""
    result = await session.execute(select(UserModel).where(UserModel.email == admin_email))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        return

    admin_user = UserModel(
        id=uuid.uuid4(),
        name="Administrator",
        email=admin_email,
        hashed_password=pwd_context.hash(admin_password),
        role=UserRoleDB.ADMIN,
    )
    session.add(admin_user)
    await session.commit()
