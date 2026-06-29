from pydantic import BaseModel, EmailStr
from datetime import date
from decimal import Decimal
from typing import Optional


class EmployeeBase(BaseModel):
    employee_id: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    designation: str
    salary: Decimal
    joining_date: date
    department_id: int


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    designation: Optional[str] = None
    salary: Optional[Decimal] = None
    joining_date: Optional[date] = None
    department_id: Optional[int] = None


class EmployeeResponse(EmployeeBase):
    id: int

    class Config:
        from_attributes = True