from sqlalchemy.orm import Session

from app.models.department import Department


class DepartmentRepository:

    @staticmethod
    def create(db: Session, department: Department):
        db.add(department)
        db.commit()
        db.refresh(department)
        return department

    @staticmethod
    def get_all(db: Session):
        return db.query(Department).all()

    @staticmethod
    def get_by_id(db: Session, department_id: int):
        return db.get(Department, department_id)

    @staticmethod
    def get_by_name(db: Session, name: str):
        return (
            db.query(Department)
            .filter(Department.name == name)
            .first()
        )

    @staticmethod
    def update(db: Session, department: Department):
        db.commit()
        db.refresh(department)
        return department

    @staticmethod
    def delete(db: Session, department: Department):
        db.delete(department)
        db.commit()