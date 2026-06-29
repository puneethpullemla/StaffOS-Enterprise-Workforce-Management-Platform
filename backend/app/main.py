from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.core.settings import settings
from app.api import admin
from app.api import employee
from app.api.department import router as department_router
from app.api.employee import router as employee_router
from app.api import attendance
from app.api import leave
from app.api import payroll
from app.api import dashboard
from app.core.exceptions import register_exception_handlers
from app.api import health
from app.api import upload
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(admin.router)
app.include_router(employee.router)
app.include_router(department_router)
app.include_router(employee_router)
app.include_router(attendance.router)
app.include_router(leave.router)
app.include_router(payroll.router)
app.include_router(dashboard.router)
app.include_router(health.router)
app.include_router(upload.router)


@app.get("/")
def root():
    return {
        "message": "Enterprise Workforce Management API"
    }
    
    
register_exception_handlers(app)