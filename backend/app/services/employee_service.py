from app.models.employee import Employee
from app.repositories.employee_repository import EmployeeRepository
from app.repositories.department_repository import DepartmentRepository


class EmployeeService:

    @staticmethod
    def create(db, employee_data):
        department = DepartmentRepository.get_by_id(
            db,
            employee_data.department_id,
        )

        if not department:
            raise ValueError("Department not found")

        employee = Employee(**employee_data.model_dump())

        return EmployeeRepository.create(db, employee)

    @staticmethod
    def get_all(
        db,
        search="",
        department_id=None,
        page=1,
        limit=10,
    ):
        return EmployeeRepository.get_all(
            db,
            search,
            department_id,
            page,
            limit,
        )

    @staticmethod
    def get_by_id(db, employee_id):
        employee = EmployeeRepository.get_by_id(db, employee_id)

        if not employee:
            raise ValueError("Employee not found")

        return employee

    @staticmethod
    def update(db, employee_id, employee_data):
        employee = EmployeeRepository.get_by_id(db, employee_id)

        if not employee:
            raise ValueError("Employee not found")

        for key, value in employee_data.model_dump(exclude_unset=True).items():
            setattr(employee, key, value)

        return EmployeeRepository.update(db, employee)

    @staticmethod
    def delete(db, employee_id):
        employee = EmployeeRepository.get_by_id(db, employee_id)

        if not employee:
            raise ValueError("Employee not found")

        EmployeeRepository.delete(db, employee)