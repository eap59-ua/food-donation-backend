"""
Request service — business logic for donation requests.
"""
import uuid
from typing import List, Optional
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_

from app.application.dtos import (
    CreateRequestDTO,
    UpdateRequestStatusDTO,
    RequestResponseDTO,
)
from app.infrastructure.models import RequestModel, DonationModel, RequestStatusDB, DonationStatusDB


class RequestService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def create(self, requester_id: uuid.UUID, dto: CreateRequestDTO) -> RequestResponseDTO:
        # Check donation exists and is available
        d_result = await self.db.execute(
            select(DonationModel).where(DonationModel.id == dto.donation_id)
        )
        donation = d_result.scalar_one_or_none()
        if not donation:
            raise ValueError("Donation not found")
        if donation.status != DonationStatusDB.AVAILABLE:
            raise ValueError("Donation is not available")
        if donation.donor_id == requester_id:
            raise ValueError("You cannot request your own donation")

        request = RequestModel(
            id=uuid.uuid4(),
            donation_id=dto.donation_id,
            requester_id=requester_id,
            message=dto.message,
            requested_quantity=dto.requested_quantity,
            status=RequestStatusDB.PENDING,
        )
        self.db.add(request)
        await self.db.commit()
        await self.db.refresh(request)
        return RequestResponseDTO.model_validate(request)

    async def get_my_requests(
        self, user_id: uuid.UUID, is_donor: bool
    ) -> List[RequestResponseDTO]:
        """
        For donors: return requests made ON their donations.
        For receptors/ONGs: return requests made BY them.
        """
        if is_donor:
            # join requests → donations to filter by donor_id
            query = (
                select(RequestModel)
                .join(DonationModel, RequestModel.donation_id == DonationModel.id)
                .where(DonationModel.donor_id == user_id)
            )
        else:
            query = select(RequestModel).where(RequestModel.requester_id == user_id)

        query = query.order_by(RequestModel.created_at.desc())
        result = await self.db.execute(query)
        requests = result.scalars().all()
        return [RequestResponseDTO.model_validate(r) for r in requests]

    async def update_status(
        self, request_id: uuid.UUID, donor_id: uuid.UUID, dto: UpdateRequestStatusDTO
    ) -> RequestResponseDTO:
        r_result = await self.db.execute(
            select(RequestModel).where(RequestModel.id == request_id)
        )
        request = r_result.scalar_one_or_none()
        if not request:
            raise ValueError("Request not found")

        # Confirm the caller owns the donation being requested
        d_result = await self.db.execute(
            select(DonationModel).where(DonationModel.id == request.donation_id)
        )
        donation = d_result.scalar_one_or_none()
        if not donation or donation.donor_id != donor_id:
            raise PermissionError("Only the donor can update the request status")

        request.status = dto.status.value
        request.updated_at = datetime.utcnow()

        # If approved, mark donation as RESERVED
        if dto.status.value == RequestStatusDB.APPROVED.value:
            donation.status = DonationStatusDB.RESERVED
            donation.updated_at = datetime.utcnow()

        await self.db.commit()
        await self.db.refresh(request)
        return RequestResponseDTO.model_validate(request)
