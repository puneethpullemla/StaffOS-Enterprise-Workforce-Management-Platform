from enum import Enum
from datetime import date
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import (
    String,
    Date,
    Numeric,
    Enum as SQLEnum,
    ForeignKey,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.models.base_model import BaseModel

if TYPE_CHECKING:
    from app.models.department import Department
    from app.models.attendance import Attendance
    from app.models.leave import Leave
    from app.models.payroll import Payroll

class EmployeeStatus(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"


class Employee(BaseModel):
    __tablename__ = "employees"

    employee_id: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
    )

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # Foreign Key
    department_id: Mapped[int] = mapped_column(
        ForeignKey("departments.id"),
        nullable=False,
    )

    # Department Relationship
    department: Mapped["Department"] = relationship(
        back_populates="employees",
    )

    designation: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    salary: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    joining_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    status: Mapped[EmployeeStatus] = mapped_column(
        SQLEnum(EmployeeStatus),
        default=EmployeeStatus.ACTIVE,
        nullable=False,
    )

    # Attendance Relationship
    attendance_records: Mapped[list["Attendance"]] = relationship(
        back_populates="employee",
        cascade="all, delete-orphan",
    )
    
    leave_records: Mapped[list["Leave"]] = relationship(
    back_populates="employee",
    cascade="all, delete-orphan",
    )
    
    payrolls: Mapped[list["Payroll"]] = relationship(
    back_populates="employee",
    cascade="all, delete-orphan",
)