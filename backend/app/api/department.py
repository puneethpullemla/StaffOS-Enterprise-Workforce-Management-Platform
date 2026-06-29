from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
    DepartmentResponse,
)
from app.services.department_service import DepartmentService

router = APIRouter(
    prefix="/departments",
    tags=["Departments"],
)


@router.post(
    "",
    response_model=DepartmentResponse,
    status_code=201,
)
def create_department(
    department: DepartmentCreate,
    db: Session = Depends(get_db),
):
    try:
        return DepartmentService.create_department(
            db,
            department,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )


@router.get(
    "",
    response_model=list[DepartmentResponse],
)
def get_departments(
    db: Session = Depends(get_db),
):
    return DepartmentService.get_departments(db)


@router.get(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def get_department(
    department_id: int,
    db: Session = Depends(get_db),
):
    try:
        return DepartmentService.get_department_by_id(
            db,
            department_id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.put(
    "/{department_id}",
    response_model=DepartmentResponse,
)
def update_department(
    department_id: int,
    department: DepartmentUpdate,
    db: Session = Depends(get_db),
):
    try:
        return DepartmentService.update_department(
            db,
            department_id,
            department,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.delete(
    "/{department_id}",
)
def delete_department(
    department_id: int,
    db: Session = Depends(get_db),
):
    try:
        DepartmentService.delete_department(
            db,
            department_id,
        )

        return {
            "message": "Department deleted successfully"
        }

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )