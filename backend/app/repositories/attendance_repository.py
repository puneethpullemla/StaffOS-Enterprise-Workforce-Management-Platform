from datetime import date
from sqlalchemy.orm import Session

from app.models.attendance import Attendance


class AttendanceRepository:

    @staticmethod
    def create(db: Session, attendance: Attendance):
        db.add(attendance)
        db.commit()
        db.refresh(attendance)
        return attendance

    @staticmethod
    def get_today(db: Session, employee_id: int):
        return (
            db.query(Attendance)
            .filter(
                Attendance.employee_id == employee_id,
                Attendance.attendance_date == date.today(),
            )
            .first()
        )

    @staticmethod
    def update(db: Session, attendance: Attendance):
        db.commit()
        db.refresh(attendance)
        return attendance

    @staticmethod
    def get_all(db: Session):
        return db.query(Attendance).all()