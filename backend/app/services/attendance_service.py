from datetime import date, datetime

from app.models.attendance import Attendance
from app.repositories.attendance_repository import AttendanceRepository
from app.repositories.employee_repository import EmployeeRepository


class AttendanceService:

    @staticmethod
    def check_in(db, employee_id: int):

        employee = EmployeeRepository.get_by_id(db, employee_id)

        if not employee:
            raise ValueError("Employee not found")

        existing = AttendanceRepository.get_today(db, employee_id)

        if existing:
            raise ValueError("Already checked in today")

        attendance = Attendance(
            employee_id=employee_id,
            attendance_date=date.today(),
            check_in=datetime.now(),
        )

        return AttendanceRepository.create(db, attendance)

    @staticmethod
    def check_out(db, employee_id: int):

        attendance = AttendanceRepository.get_today(db, employee_id)

        if not attendance:
            raise ValueError("Check in first")

        attendance.check_out = datetime.now()

        return AttendanceRepository.update(db, attendance)

    @staticmethod
    def get_all(db):
        return AttendanceRepository.get_all(db)