from datetime import date
from enum import Enum

from sqlalchemy import Date, Enum as SQLEnum, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel


class LeaveStatus(str, Enum):
    PENDING = "PENDING"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class Leave(BaseModel):
    __tablename__ = "leaves"

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.id"),
        nullable=False,
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    reason: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    status: Mapped[LeaveStatus] = mapped_column(
        SQLEnum(LeaveStatus),
        default=LeaveStatus.PENDING,
        nullable=False,
    )

    employee = relationship(
        "Employee",
        back_populates="leave_records",
    )