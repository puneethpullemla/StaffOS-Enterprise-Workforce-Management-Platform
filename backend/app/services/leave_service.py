from app.models.leave import Leave
from app.repositories.employee_repository import EmployeeRepository
from app.repositories.leave_repository import LeaveRepository


class LeaveService:

    @staticmethod
    def apply_leave(db, data):

        employee = EmployeeRepository.get_by_id(
            db,
            data.employee_id,
        )

        if not employee:
            raise ValueError("Employee not found")

        leave = Leave(
            employee_id=data.employee_id,
            start_date=data.start_date,
            end_date=data.end_date,
            reason=data.reason,
        )

        return LeaveRepository.create(db, leave)

    @staticmethod
    def get_all(db):
        return LeaveRepository.get_all(db)

    @staticmethod
    def approve_leave(db, leave_id, status):

        leave = LeaveRepository.get_by_id(db, leave_id)

        if not leave:
            raise ValueError("Leave not found")

        leave.status = status.status

        return LeaveRepository.update(db, leave)