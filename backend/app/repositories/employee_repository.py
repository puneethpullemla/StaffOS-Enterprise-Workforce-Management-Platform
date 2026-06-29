from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.models.employee import Employee


class EmployeeRepository:

    @staticmethod
    def create(db: Session, employee: Employee):
        db.add(employee)
        db.commit()
        db.refresh(employee)
        return employee

    @staticmethod
    def get_all(
        db: Session,
        search: str = "",
        department_id: int | None = None,
        page: int = 1,
        limit: int = 10,
    ):

        query = db.query(Employee)

        # Search
        if search:

            query = query.filter(

                or_(

                    Employee.employee_id.ilike(f"%{search}%"),

                    Employee.first_name.ilike(f"%{search}%"),

                    Employee.last_name.ilike(f"%{search}%"),

                    Employee.email.ilike(f"%{search}%"),

                    Employee.designation.ilike(f"%{search}%"),

                )

            )

        # Department Filter
        if department_id:

            query = query.filter(
                Employee.department_id == department_id
            )

        # Latest employees first + Pagination
        return (
            query.order_by(Employee.id.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        employee_id: int,
    ):
        return db.get(Employee, employee_id)

    @staticmethod
    def update(
        db: Session,
        employee: Employee,
    ):
        db.commit()
        db.refresh(employee)
        return employee

    @staticmethod
    def delete(
        db: Session,
        employee: Employee,
    ):
        db.delete(employee)
        db.commit()