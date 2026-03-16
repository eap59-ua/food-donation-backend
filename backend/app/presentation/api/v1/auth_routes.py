"""
Auth router — /api/v1/auth
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.auth_service import AuthService
from app.application.dtos import RegisterUserDTO, TokenDTO, UserResponseDTO, LoginDTO
from app.infrastructure.database import get_db
from app.presentation.dependencies import get_current_user
from app.infrastructure.models import UserModel

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserResponseDTO, status_code=201)
async def register(dto: RegisterUserDTO, db: AsyncSession = Depends(get_db)):
    try:
        return await AuthService(db).register(dto)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login", response_model=TokenDTO)
async def login(dto: LoginDTO, db: AsyncSession = Depends(get_db)):
    """Login with JSON body (email + password)."""
    try:
        return await AuthService(db).login(dto.email, dto.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.post("/login-form", response_model=TokenDTO, include_in_schema=False)
async def login_form(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    """OAuth2 compatible login endpoint (used by Swagger UI)."""
    try:
        return await AuthService(db).login(form_data.username, form_data.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))


@router.get("/me", response_model=UserResponseDTO)
async def me(current_user: UserModel = Depends(get_current_user)):
    return UserResponseDTO.model_validate(current_user)
