from datetime import date, datetime
from enum import Enum

from sqlalchemy import DateTime, Date, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base_model import BaseModel


class AttendanceStatus(str, Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    HALF_DAY = "HALF_DAY"


class Attendance(BaseModel):
    __tablename__ = "attendance"

    employee_id: Mapped[int] = mapped_column(
        ForeignKey("employees.id"),
        nullable=False,
    )

    attendance_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    check_in: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    check_out: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    status: Mapped[AttendanceStatus] = mapped_column(
        SQLEnum(AttendanceStatus),
        default=AttendanceStatus.PRESENT,
        nullable=False,
    )

    employee = relationship(
        "Employee",
        back_populates="attendance_records",
    )