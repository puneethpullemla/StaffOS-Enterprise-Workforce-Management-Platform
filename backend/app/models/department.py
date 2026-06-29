from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.models.base_model import BaseModel

if TYPE_CHECKING:
    from app.models.employee import Employee


class Department(BaseModel):
    __tablename__ = "departments"

    name: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        String(255),
        nullable=True,
    )

    employees: Mapped[list["Employee"]] = relationship(
        back_populates="department",
        cascade="all, delete",
    )