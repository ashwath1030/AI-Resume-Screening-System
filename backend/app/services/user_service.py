from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password


class UserService:

    @staticmethod
    def create_user(db: Session, data):

        user = User(
            full_name=data.full_name,
            email=data.email,
            password=hash_password(data.password),
            role=data.role
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    @staticmethod
    def get_users(db: Session):
        return db.query(User).all()