from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.security.hashing import hash_password
from app.security.hashing import verify_password
from app.security.jwt import create_access_token


class AuthService:

    @staticmethod
    def register(db: Session, user_data: UserCreate):

        existing_user = UserRepository.get_by_email(
            db,
            user_data.email,
        )

        if existing_user:
            raise ValueError("Email already registered")

        user = User(
            username=user_data.username,
            email=user_data.email,
            password=hash_password(user_data.password),
        )

        return UserRepository.create(db, user)
    
    
    @staticmethod
    def login(db: Session, email: str, password: str):

        user = UserRepository.get_by_email(db, email)

        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(password, user.password):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }