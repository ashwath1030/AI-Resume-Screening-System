from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User

class ProfileService:

    @staticmethod
    def update_profile(db: Session, email: str, data):

        user = db.query(User).filter(
            User.email == email
        ).first()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        user.full_name = data.full_name
        user.email = data.email

        db.commit()
        db.refresh(user)

        return user