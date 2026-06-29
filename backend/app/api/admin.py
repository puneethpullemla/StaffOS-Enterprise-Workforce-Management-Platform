from fastapi import APIRouter, Depends

from app.dependencies.permissions import require_roles
from app.models.user import UserRole

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get("/dashboard")
def admin_dashboard(
    current_user=Depends(
        require_roles(UserRole.ADMIN)
    )
):
    return {
        "message": f"Welcome Admin {current_user.username}"
    }