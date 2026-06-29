from sqlalchemy.orm import Session

from app.models.department import Department
from app.repositories.department_repository import DepartmentRepository
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate,
)


class DepartmentService:

    @staticmethod
    def create_department(
        db: Session,
        department: DepartmentCreate,
    ):
        existing = DepartmentRepository.get_by_name(
            db,
            department.name,
        )

        if existing:
            raise ValueError("Department already exists")

        new_department = Department(
            name=department.name,
        )

        return DepartmentRepository.create(
            db,
            new_department,
        )

    @staticmethod
    def get_departments(db: Session):
        return DepartmentRepository.get_all(db)

    @staticmethod
    def get_department_by_id(
        db: Session,
        department_id: int,
    ):
        department = DepartmentRepository.get_by_id(
            db,
            department_id,
        )

        if not department:
            raise ValueError("Department not found")

        return department

    @staticmethod
    def update_department(
        db: Session,
        department_id: int,
        department_data: DepartmentUpdate,
    ):
        department = DepartmentRepository.get_by_id(
            db,
            department_id,
        )

        if not department:
            raise ValueError("Department not found")

        department.name = department_data.name

        return DepartmentRepository.update(
            db,
            department,
        )

    @staticmethod
    def delete_department(
        db: Session,
        department_id: int,
    ):
        department = DepartmentRepository.get_by_id(
            db,
            department_id,
        )

        if not department:
            raise ValueError("Department not found")

        DepartmentRepository.delete(
            db,
            department,
        )