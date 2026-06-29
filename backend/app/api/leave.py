from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.leave import (
    LeaveCreate,
    LeaveUpdate,
    LeaveResponse,
)
from app.services.leave_service import LeaveService

router = APIRouter(
    prefix="/leaves",
    tags=["Leaves"],
)


@router.post(
    "",
    response_model=LeaveResponse,
)
def apply_leave(
    leave: LeaveCreate,
    db: Session = Depends(get_db),
):
    try:
        return LeaveService.apply_leave(
            db,
            leave,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[LeaveResponse],
)
def get_leaves(
    db: Session = Depends(get_db),
):
    return LeaveService.get_all(db)


@router.put(
    "/{leave_id}",
    response_model=LeaveResponse,
)
def approve_leave(
    leave_id: int,
    status: LeaveUpdate,
    db: Session = Depends(get_db),
):
    try:
        return LeaveService.approve_leave(
            db,
            leave_id,
            status,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )