from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.attendance import AttendanceCreate, AttendanceResponse
from app.services.attendance_service import AttendanceService

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"],
)


@router.post(
    "/check-in",
    response_model=AttendanceResponse,
)
def check_in(
    data: AttendanceCreate,
    db: Session = Depends(get_db),
):
    try:
        return AttendanceService.check_in(
            db,
            data.employee_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.post(
    "/check-out",
    response_model=AttendanceResponse,
)
def check_out(
    data: AttendanceCreate,
    db: Session = Depends(get_db),
):
    try:
        return AttendanceService.check_out(
            db,
            data.employee_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[AttendanceResponse],
)
def get_attendance(
    db: Session = Depends(get_db),
):
    return AttendanceService.get_all(db)