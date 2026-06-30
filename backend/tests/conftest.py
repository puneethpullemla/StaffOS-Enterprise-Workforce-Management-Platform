from fastapi.testclient import TestClient

from app.main import app
from app.db.session import engine
from app.db.base import Base

# Import all models so SQLAlchemy knows about them
from app.models.user import User
from app.models.department import Department
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.models.leave import Leave
from app.models.payroll import Payroll

# Create all tables
Base.metadata.create_all(bind=engine)

client = TestClient(app)