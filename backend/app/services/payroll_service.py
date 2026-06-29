from decimal import Decimal

from app.models.payroll import Payroll
from app.repositories.employee_repository import EmployeeRepository
from app.repositories.payroll_repository import PayrollRepository


class PayrollService:

    @staticmethod
    def generate_payroll(db, data):

        employee = EmployeeRepository.get_by_id(
            db,
            data.employee_id,
        )

        if not employee:
            raise ValueError("Employee not found")

        basic = employee.salary
        net = basic + data.bonus - data.deductions

        payroll = Payroll(
            employee_id=data.employee_id,
            month=data.month,
            basic_salary=basic,
            bonus=data.bonus,
            deductions=data.deductions,
            net_salary=net,
        )

        return PayrollRepository.create(db, payroll)

    @staticmethod
    def get_all(db):
        return PayrollRepository.get_all(db)

    @staticmethod
    def mark_paid(db, payroll_id, data):

        payroll = PayrollRepository.get_by_id(
            db,
            payroll_id,
        )

        if not payroll:
            raise ValueError("Payroll not found")

        payroll.status = data.status

        return PayrollRepository.update(db, payroll)