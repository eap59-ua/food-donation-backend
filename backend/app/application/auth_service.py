"""
Auth service — encapsulates all authentication logic.
Depends on UserRepository (port) injected at runtime.
"""
from datetime import datetime, timedelta
from typing import Optional
import uuid

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.application.dtos import RegisterUserDTO, TokenDTO, UserResponseDTO
from app.infrastructure.models import UserModel

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def _hash_password(plain: str) -> str:
    return pwd_context.hash(plain)


def _verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def _create_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def register(self, dto: RegisterUserDTO) -> UserResponseDTO:
        result = await self.db.execute(select(UserModel).where(UserModel.email == dto.email))
        existing = result.scalar_one_or_none()
        if existing:
            raise ValueError("Email already registered")

        user = UserModel(
            id=uuid.uuid4(),
            name=dto.name,
            email=dto.email,
            hashed_password=_hash_password(dto.password),
            role=dto.role.value,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return UserResponseDTO.model_validate(user)

    async def login(self, email: str, password: str) -> TokenDTO:
        result = await self.db.execute(select(UserModel).where(UserModel.email == email))
        user = result.scalar_one_or_none()
        if not user or not _verify_password(password, user.hashed_password):
            raise ValueError("Invalid email or password")
        if not user.is_active:
            raise ValueError("Account is inactive")

        token = _create_token(
            {"sub": str(user.id), "role": user.role.value},
            timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return TokenDTO(access_token=token)

    async def get_user_by_id(self, user_id: uuid.UUID) -> Optional[UserResponseDTO]:
        result = await self.db.execute(select(UserModel).where(UserModel.id == user_id))
        user = result.scalar_one_or_none()
        if not user:
            return None
        return UserResponseDTO.model_validate(user)
