import uuid
import enum
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from app.infrastructure.database import Base


class UserRoleDB(str, enum.Enum):
    DONANTE = "DONANTE"
    RECEPTOR = "RECEPTOR"
    ONG = "ONG"
    ADMIN = "ADMIN"


class DonationStatusDB(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    RESERVED = "RESERVED"
    COMPLETED = "COMPLETED"
    EXPIRED = "EXPIRED"


class RequestStatusDB(str, enum.Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class UserModel(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    email: Mapped[str] = mapped_column(sa.String(255), unique=True, nullable=False, index=True)
    hashed_password: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    role: Mapped[UserRoleDB] = mapped_column(sa.Enum(UserRoleDB), nullable=False, default=UserRoleDB.RECEPTOR)
    is_active: Mapped[bool] = mapped_column(sa.Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.utcnow)

    donations: Mapped[list["DonationModel"]] = relationship("DonationModel", back_populates="donor", foreign_keys="DonationModel.donor_id")
    requests: Mapped[list["RequestModel"]] = relationship("RequestModel", back_populates="requester")


class DonationModel(Base):
    __tablename__ = "donations"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    donor_id: Mapped[uuid.UUID] = mapped_column(sa.ForeignKey("users.id"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(sa.String(255), nullable=False)
    description: Mapped[str] = mapped_column(sa.Text, nullable=True)
    quantity: Mapped[str] = mapped_column(sa.String(100), nullable=False)
    location_address: Mapped[str] = mapped_column(sa.String(500), nullable=False)
    expiration_date: Mapped[datetime] = mapped_column(sa.DateTime, nullable=True)
    status: Mapped[DonationStatusDB] = mapped_column(sa.Enum(DonationStatusDB), default=DonationStatusDB.AVAILABLE)
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    donor: Mapped["UserModel"] = relationship("UserModel", back_populates="donations", foreign_keys=[donor_id])
    requests: Mapped[list["RequestModel"]] = relationship("RequestModel", back_populates="donation")


class RequestModel(Base):
    __tablename__ = "requests"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    donation_id: Mapped[uuid.UUID] = mapped_column(sa.ForeignKey("donations.id"), nullable=False, index=True)
    requester_id: Mapped[uuid.UUID] = mapped_column(sa.ForeignKey("users.id"), nullable=False, index=True)
    message: Mapped[str] = mapped_column(sa.Text, nullable=True)
    requested_quantity: Mapped[str] = mapped_column(sa.String(100), nullable=True)
    status: Mapped[RequestStatusDB] = mapped_column(sa.Enum(RequestStatusDB), default=RequestStatusDB.PENDING)
    created_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(sa.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    donation: Mapped["DonationModel"] = relationship("DonationModel", back_populates="requests")
    requester: Mapped["UserModel"] = relationship("UserModel", back_populates="requests")
