"""
Donations router — /api/v1/donations
"""
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.donation_service import DonationService
from app.application.dtos import (
    CreateDonationDTO,
    DonationResponseDTO,
    DonationStatusDTO,
    UpdateDonationDTO,
    UpdateDonationStatusDTO,
)
from app.infrastructure.database import get_db
from app.infrastructure.models import UserModel, UserRoleDB
from app.presentation.dependencies import get_current_user

router = APIRouter(prefix="/donations", tags=["Donations"])


@router.get("", response_model=list[DonationResponseDTO])
async def list_donations(
    status: Optional[DonationStatusDTO] = Query(None),
    location: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List all donations. Publicly accessible. Filterable by status and location."""
    return await DonationService(db).list_available(status=status, location_query=location)


@router.get("/{donation_id}", response_model=DonationResponseDTO)
async def get_donation(donation_id: UUID, db: AsyncSession = Depends(get_db)):
    donation = await DonationService(db).get_by_id(donation_id)
    if not donation:
        raise HTTPException(status_code=404, detail="Donation not found")
    return donation


@router.post("", response_model=DonationResponseDTO, status_code=201)
async def create_donation(
    dto: CreateDonationDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    if current_user.role not in (UserRoleDB.DONANTE, UserRoleDB.ADMIN):
        raise HTTPException(status_code=403, detail="Only donors can create donations")
    return await DonationService(db).create(current_user.id, dto)


@router.put("/{donation_id}", response_model=DonationResponseDTO)
async def update_donation(
    donation_id: UUID,
    dto: UpdateDonationDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    try:
        return await DonationService(db).update(donation_id, current_user.id, dto)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))


@router.patch("/{donation_id}/status", response_model=DonationResponseDTO)
async def update_donation_status(
    donation_id: UUID,
    dto: UpdateDonationStatusDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    is_admin = current_user.role == UserRoleDB.ADMIN
    try:
        return await DonationService(db).update_status(donation_id, current_user.id, is_admin, dto)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
