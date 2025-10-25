from fastapi import HTTPException, status
from repositories.user_repository import UserRepository
from app.db.redis_client import RedisClient
from app.core.security import verify_password, create_session_token

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
        redis = await RedisClient.get_client()

        await redis.hset(
            f"session:{session_id}",
            mapping={"user_id": str(user.id), "username": user.username, "role": user.role.value},
        )
        await redis.expire(f"session:{session_id}", SESSION_TTL)
        return session_id

    async def logout(self, session_id: str):
        redis = await RedisClient.get_client()
        await redis.delete(f"session:{session_id}")

    async def get_session_user(self, session_id: str):
        redis = await RedisClient.get_client()
        session_data = await redis.hgetall(f"session:{session_id}")
        if not session_data:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")
        await redis.expire(f"session:{session_id}", SESSION_TTL)
        return session_data
