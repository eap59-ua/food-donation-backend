"""
User management router — /api/v1/users
"""
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.auth_service import AuthService
from app.application.dtos import UpdateUserDTO, UserResponseDTO
from app.infrastructure.database import get_db
from app.infrastructure.models import UserModel, UserRoleDB
from app.presentation.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=list[UserResponseDTO])
async def list_users(
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    if current_user.role != UserRoleDB.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can list users")
    return await AuthService(db).list_users()


@router.patch("/{user_id}", response_model=UserResponseDTO)
async def update_user(
    user_id: UUID,
    dto: UpdateUserDTO,
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
):
    if current_user.role != UserRoleDB.ADMIN and current_user.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to update this user")
    try:
        return await AuthService(db).update_user(user_id, dto)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{user_id}", response_model=UserResponseDTO)
async def get_user(user_id: UUID, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    if current_user.role != UserRoleDB.ADMIN and current_user.id != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to view this user")
    user = await AuthService(db).get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: UUID, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_user)):
    if current_user.role != UserRoleDB.ADMIN:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can delete users")
    try:
        await AuthService(db).delete_user(user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
