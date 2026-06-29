from sqlalchemy.orm import Session

from app.models.payroll import Payroll


class PayrollRepository:

    @staticmethod
    def create(db: Session, payroll: Payroll):
        db.add(payroll)
        db.commit()
        db.refresh(payroll)
        return payroll

    @staticmethod
    def get_all(db: Session):
        return db.query(Payroll).all()

    @staticmethod
    def get_by_id(db: Session, payroll_id: int):
        return db.get(Payroll, payroll_id)

    @staticmethod
    def update(db: Session, payroll: Payroll):
        db.commit()
        db.refresh(payroll)
        return payroll