from datetime import date
from pydantic import BaseModel

from app.models.leave import LeaveStatus


class LeaveCreate(BaseModel):
    employee_id: int
    start_date: date
    end_date: date
    reason: str


class LeaveUpdate(BaseModel):
    status: LeaveStatus


class LeaveResponse(BaseModel):
    id: int
    employee_id: int
    start_date: date
    end_date: date
    reason: str
    status: LeaveStatus

    class Config:
        from_attributes = True