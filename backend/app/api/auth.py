from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.auth_service import AuthService
from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserLogin,
    Token,
)
from app.dependencies.auth import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    try:
        return AuthService.register(db, user)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )
        
        
@router.post(
    "/login",
    response_model=Token,
)
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    try:
        return AuthService.login(
            db,
            user.email,
            user.password,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )
        


@router.get(
    "/me",
    response_model=UserResponse,
    )
def me(
        current_user=Depends(get_current_user),
    ):
        return current_user