from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.employee import Employee
from app.models.department import Department
from app.models.attendance import Attendance
from app.models.leave import Leave
from app.models.payroll import Payroll


class DashboardService:

    @staticmethod
    def get_dashboard(db: Session):

        recent_employees = (
            db.query(Employee)
            .order_by(Employee.id.desc())
            .limit(5)
            .all()
        )

        recent_leaves = (
            db.query(Leave)
            .order_by(Leave.id.desc())
            .limit(5)
            .all()
        )

        attendance_stats = (
            db.query(
                Attendance.status,
                func.count(Attendance.id)
            )
            .group_by(Attendance.status)
            .all()
        )

        attendance_chart = {
            status.value: count
            for status, count in attendance_stats
        }

        return {

            "total_employees":
                db.query(Employee).count(),

            "total_departments":
                db.query(Department).count(),

            "total_attendance":
                db.query(Attendance).count(),

            "total_leaves":
                db.query(Leave).count(),

            "total_payrolls":
                db.query(Payroll).count(),

            "recent_employees":[
                {
                    "id":e.id,
                    "name":f"{e.first_name} {e.last_name}",
                    "designation":e.designation
                }
                for e in recent_employees
            ],

            "recent_leaves": [
                {
                    "id": l.id,
                    "employee": f"{l.employee.first_name} {l.employee.last_name}",
                    "status": l.status.value,
                    "start_date": str(l.start_date),
                    "end_date": str(l.end_date),
                }
                for l in recent_leaves
            ],

            "attendance_chart":attendance_chart

        }