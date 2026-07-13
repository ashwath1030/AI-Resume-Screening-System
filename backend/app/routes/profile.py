from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.role_checker import RoleChecker
from app.models.user import User
from app.schemas.profile import ProfileUpdate

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)

logged_user = RoleChecker(["admin", "hr", "recruiter"])


@router.get("/")
def get_profile(
    payload=Depends(logged_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == payload["sub"]
    ).first()

    return {
        "fullName": user.full_name,
        "email": user.email,
        "role": user.role,
        "profileImage": user.profile_image
    }
@router.put("/")
def update_profile(
    profile: ProfileUpdate,
    payload=Depends(logged_user),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == payload["sub"]
    ).first()

    user.full_name = profile.full_name

    db.commit()
    db.refresh(user)

    return {
        "message": "Profile updated successfully"
    }