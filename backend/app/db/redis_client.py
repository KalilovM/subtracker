import redis.asyncio as aioredis
from app.core.settings import settings


class RedisClient:
    _instance: aioredis.Redis | None = None

    @classmethod
    async def get_client(cls) -> aioredis.Redis:
        if cls._instance is None:
            # Create once
            cls._instance = aioredis.from_url(
                settings.REDIS.URL,
                encoding="utf-8",
                decode_responses=True,
            )
            # Optionally verify connection
            try:
                await cls._instance.ping()
            except Exception:
                cls._instance = None
                raise
        return cls._instance

    @classmethod
    async def close(cls):
        if cls._instance is not None:
            await cls._instance.close()
            cls._instance = None


redis_client = RedisClient()
