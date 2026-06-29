from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.employee import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
)
from app.services.employee_service import EmployeeService

router = APIRouter(
    prefix="/employees",
    tags=["Employees"],
)


@router.post(
    "",
    response_model=EmployeeResponse,
    status_code=201,
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
):
    try:
        return EmployeeService.create(db, employee)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[EmployeeResponse],
)
def get_all_employees(
    search: str = "",
    department_id: int | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return EmployeeService.get_all(
        db=db,
        search=search,
        department_id=department_id,
        page=page,
        limit=limit,
    )


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    try:
        return EmployeeService.get_by_id(
            db,
            employee_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put(
    "/{employee_id}",
    response_model=EmployeeResponse,
)
def update_employee(
    employee_id: int,
    employee: EmployeeUpdate,
    db: Session = Depends(get_db),
):
    try:
        return EmployeeService.update(
            db,
            employee_id,
            employee,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete(
    "/{employee_id}",
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
):
    try:
        EmployeeService.delete(
            db,
            employee_id,
        )

        return {
            "message": "Employee deleted successfully"
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )