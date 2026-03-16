"""
Application layer DTOs (Data Transfer Objects).
Used to pass data between the presentation and application layers.
"""
from datetime import datetime
from typing import Optional
from uuid import UUID
import enum

from pydantic import BaseModel, EmailStr


# ── Enums ────────────────────────────────────────────────────────────────────

class UserRoleDTO(str, enum.Enum):
    DONANTE = "DONANTE"
    RECEPTOR = "RECEPTOR"
    ONG = "ONG"
    ADMIN = "ADMIN"


class DonationStatusDTO(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    RESERVED = "RESERVED"
    COMPLETED = "COMPLETED"
    EXPIRED = "EXPIRED"


class RequestStatusDTO(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


# ── Auth ─────────────────────────────────────────────────────────────────────

class RegisterUserDTO(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRoleDTO = UserRoleDTO.RECEPTOR


class LoginDTO(BaseModel):
    email: EmailStr
    password: str


class TokenDTO(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserResponseDTO(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    role: UserRoleDTO
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Donations ─────────────────────────────────────────────────────────────────

class CreateDonationDTO(BaseModel):
    title: str
    description: Optional[str] = None
    quantity: str
    location_address: str
    expiration_date: Optional[datetime] = None


class UpdateDonationDTO(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[str] = None
    location_address: Optional[str] = None
    expiration_date: Optional[datetime] = None


class UpdateDonationStatusDTO(BaseModel):
    status: DonationStatusDTO


class DonationResponseDTO(BaseModel):
    id: UUID
    donor_id: UUID
    title: str
    description: Optional[str]
    quantity: str
    location_address: str
    expiration_date: Optional[datetime]
    status: DonationStatusDTO
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Requests ──────────────────────────────────────────────────────────────────

class CreateRequestDTO(BaseModel):
    donation_id: UUID
    message: Optional[str] = None
    requested_quantity: Optional[str] = None


class UpdateRequestStatusDTO(BaseModel):
    status: RequestStatusDTO


class RequestResponseDTO(BaseModel):
    id: UUID
    donation_id: UUID
    requester_id: UUID
    message: Optional[str]
    requested_quantity: Optional[str]
    status: RequestStatusDTO
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
