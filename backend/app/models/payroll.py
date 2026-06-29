from decimal import Decimal
from enum import Enum

from sqlalchemy import (
    Numeric,
    String,
    Enum as SQLEnum,
    ForeignKey,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel


class PayrollStatus(str, Enum):
    PENDING = "PENDING"
    PAID = "PAID"


class Payroll(BaseModel):
    __tablename__ = "payroll"

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.id"),
        nullable=False,
    )

    month: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    basic_salary: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    bonus: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    deductions: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        default=0,
    )

    net_salary: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    status: Mapped[PayrollStatus] = mapped_column(
        SQLEnum(PayrollStatus),
        default=PayrollStatus.PENDING,
    )

    employee = relationship(
        "Employee",
        back_populates="payrolls",
    )