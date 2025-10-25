import redis.asyncio as aioredis
from app.core.settings import AppSettings


class RedisClient:
    _instance: aioredis.Redis | None = None

    @classmethod
    async def get_client(cls) -> aioredis.Redis:
        if not cls._instance:
            cls._instance = aioredis.from_url(
                AppSettings.REDIS.URL, encoding="utf8", decode_responses=True
            )
            return cls._instance


redis_client = RedisClient()
