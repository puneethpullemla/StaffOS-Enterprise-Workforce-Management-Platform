from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.payroll import (
    PayrollCreate,
    PayrollUpdate,
    PayrollResponse,
)
from app.services.payroll_service import PayrollService

router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"],
)


@router.post(
    "",
    response_model=PayrollResponse,
)
def generate_payroll(
    payroll: PayrollCreate,
    db: Session = Depends(get_db),
):
    try:
        return PayrollService.generate_payroll(
            db,
            payroll,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[PayrollResponse],
)
def get_payrolls(
    db: Session = Depends(get_db),
):
    return PayrollService.get_all(db)


@router.put(
    "/{payroll_id}",
    response_model=PayrollResponse,
)
def mark_paid(
    payroll_id: int,
    status: PayrollUpdate,
    db: Session = Depends(get_db),
):
    try:
        return PayrollService.mark_paid(
            db,
            payroll_id,
            status,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )