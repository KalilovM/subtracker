from fastapi import HTTPException, status
from app.repositories.user_repository import UserRepository
from app.db.redis_client import redis_client
from app.core.security import verify_password, create_session_token, hash_password
from app.models.user_models import User, Role

import uuid

SESSION_TTL = 60 * 30


class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def login(self, username: str, password: str):
        user = await self.user_repo.get_by_username(username)
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
            )

        session_id = create_session_token()
        redis = await redis_client.get_client()

        await redis.hset(
            f"session:{session_id}",
            mapping={
                "user_id": str(user.id),
                "username": user.username,
                "email": user.email,
                "role": user.role.value,
            },
        )
        await redis.expire(f"session:{session_id}", SESSION_TTL)
        return session_id

    async def signup(self, username: str, email: str, password: str) -> User:
        # Check for duplicates
        if await self.user_repo.get_by_username(username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists"
            )
        if await self.user_repo.get_by_email(email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
            )

        password_hash = hash_password(password)

        user = await self.user_repo.create(
            id=uuid.uuid4(),
            username=username,
            email=email,
            password_hash=password_hash,
            role=Role.USER,
        )
        return user

    async def logout(self, session_id: str):
        redis = await redis_client.get_client()
        await redis.delete(f"session:{session_id}")

    async def get_session_user(self, session_id: str):
        redis = await redis_client.get_client()
        session_data = await redis.hgetall(f"session:{session_id}")
        if not session_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")
        await redis.expire(f"session:{session_id}", SESSION_TTL)
        return session_data
