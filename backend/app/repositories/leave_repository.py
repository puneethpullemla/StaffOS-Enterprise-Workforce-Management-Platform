from sqlalchemy.orm import Session

from app.models.leave import Leave


class LeaveRepository:

    @staticmethod
    def create(db: Session, leave: Leave):
        db.add(leave)
        db.commit()
        db.refresh(leave)
        return leave

    @staticmethod
    def get_all(db: Session):
        return db.query(Leave).all()

    @staticmethod
    def get_by_id(db: Session, leave_id: int):
        return db.get(Leave, leave_id)

    @staticmethod
    def update(db: Session, leave: Leave):
        db.commit()
        db.refresh(leave)
        return leave