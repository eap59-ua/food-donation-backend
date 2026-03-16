"""
Donation service — business logic for food donation postings.
"""
import uuid
from typing import Optional, List
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.application.dtos import (
    CreateDonationDTO,
    UpdateDonationDTO,
    UpdateDonationStatusDTO,
    DonationResponseDTO,
    DonationStatusDTO,
)
from app.infrastructure.models import DonationModel, DonationStatusDB


class DonationService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, donor_id: uuid.UUID, dto: CreateDonationDTO) -> DonationResponseDTO:
        donation = DonationModel(
            id=uuid.uuid4(),
            donor_id=donor_id,
            title=dto.title,
            description=dto.description,
            quantity=dto.quantity,
            location_address=dto.location_address,
            expiration_date=dto.expiration_date,
            status=DonationStatusDB.AVAILABLE,
        )
        self.db.add(donation)
        await self.db.commit()
        await self.db.refresh(donation)
        return DonationResponseDTO.model_validate(donation)

    async def list_available(
        self,
        status: Optional[DonationStatusDTO] = None,
        location_query: Optional[str] = None,
    ) -> List[DonationResponseDTO]:
        query = select(DonationModel)
        if status:
            query = query.where(DonationModel.status == status.value)
        if location_query:
            query = query.where(DonationModel.location_address.ilike(f"%{location_query}%"))
        query = query.order_by(DonationModel.created_at.desc())
        result = await self.db.execute(query)
        donations = result.scalars().all()
        return [DonationResponseDTO.model_validate(d) for d in donations]

    async def get_by_id(self, donation_id: uuid.UUID) -> Optional[DonationResponseDTO]:
        result = await self.db.execute(select(DonationModel).where(DonationModel.id == donation_id))
        donation = result.scalar_one_or_none()
        if not donation:
            return None
        return DonationResponseDTO.model_validate(donation)

    async def update(
        self, donation_id: uuid.UUID, donor_id: uuid.UUID, dto: UpdateDonationDTO
    ) -> DonationResponseDTO:
        result = await self.db.execute(select(DonationModel).where(DonationModel.id == donation_id))
        donation = result.scalar_one_or_none()
        if not donation:
            raise ValueError("Donation not found")
        if donation.donor_id != donor_id:
            raise PermissionError("You are not the owner of this donation")

        if dto.title is not None:
            donation.title = dto.title
        if dto.description is not None:
            donation.description = dto.description
        if dto.quantity is not None:
            donation.quantity = dto.quantity
        if dto.location_address is not None:
            donation.location_address = dto.location_address
        if dto.expiration_date is not None:
            donation.expiration_date = dto.expiration_date
        donation.updated_at = datetime.utcnow()

        await self.db.commit()
        await self.db.refresh(donation)
        return DonationResponseDTO.model_validate(donation)

    async def update_status(
        self, donation_id: uuid.UUID, actor_id: uuid.UUID, is_admin: bool, dto: UpdateDonationStatusDTO
    ) -> DonationResponseDTO:
        result = await self.db.execute(select(DonationModel).where(DonationModel.id == donation_id))
        donation = result.scalar_one_or_none()
        if not donation:
            raise ValueError("Donation not found")
        if donation.donor_id != actor_id and not is_admin:
            raise PermissionError("Not allowed")
        donation.status = dto.status.value
        donation.updated_at = datetime.utcnow()
        await self.db.commit()
        await self.db.refresh(donation)
        return DonationResponseDTO.model_validate(donation)
