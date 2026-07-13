from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService
from app.core.role_checker import RoleChecker

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)
admin_only = RoleChecker(["admin"])


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return UserService.create_user(db, user)


@router.get("/", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db),
    user=Depends(admin_only)
):
    return UserService.get_users(db)