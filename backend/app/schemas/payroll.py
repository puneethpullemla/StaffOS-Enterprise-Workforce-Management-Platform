from decimal import Decimal

from pydantic import BaseModel

from app.models.payroll import PayrollStatus


class PayrollCreate(BaseModel):
    employee_id: int
    month: str
    bonus: Decimal = 0
    deductions: Decimal = 0


class PayrollUpdate(BaseModel):
    status: PayrollStatus


class PayrollResponse(BaseModel):
    id: int
    employee_id: int
    month: str
    basic_salary: Decimal
    bonus: Decimal
    deductions: Decimal
    net_salary: Decimal
    status: PayrollStatus

    class Config:
        from_attributes = True