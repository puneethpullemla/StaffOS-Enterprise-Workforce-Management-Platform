from datetime import date, datetime
from enum import Enum

from pydantic import BaseModel


class AttendanceStatus(str, Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    HALF_DAY = "HALF_DAY"


class AttendanceCreate(BaseModel):
    employee_id: int


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    attendance_date: date
    check_in: datetime | None
    check_out: datetime | None
    status: AttendanceStatus

    class Config:
        from_attributes = True