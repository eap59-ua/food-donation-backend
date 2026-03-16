"""
Requests router — /api/v1/requests
"""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.request_service import RequestService
from app.application.dtos import CreateRequestDTO, RequestResponseDTO, UpdateRequestStatusDTO
from app.infrastructure.database import get_db
from app.infrastructure.models import UserModel, UserRoleDB
from app.presentation.dependencies import get_current_user

router = APIRouter(prefix="/requests", tags=["Requests"])


@router.post("", response_model=RequestResponseDTO, status_code=201)
async def create_request(
    dto: CreateRequestDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    if current_user.role not in (UserRoleDB.RECEPTOR, UserRoleDB.ONG, UserRoleDB.ADMIN):
        raise HTTPException(status_code=403, detail="Only receptors or ONGs can request donations")
    try:
        return await RequestService(db).create(current_user.id, dto)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/me", response_model=list[RequestResponseDTO])
async def my_requests(
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    """
    For DONANTEs: returns requests received on their donations.
    For RECEPTORs/ONGs: returns requests they have made.
    """
    is_donor = current_user.role == UserRoleDB.DONANTE
    return await RequestService(db).get_my_requests(current_user.id, is_donor)


@router.patch("/{request_id}/status", response_model=RequestResponseDTO)
async def update_request_status(
    request_id: UUID,
    dto: UpdateRequestStatusDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    if current_user.role not in (UserRoleDB.DONANTE, UserRoleDB.ADMIN):
        raise HTTPException(status_code=403, detail="Only the donor can update a request status")
    try:
        return await RequestService(db).update_status(request_id, current_user.id, dto)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except PermissionError as e:
        raise HTTPException(status_code=403, detail=str(e))
