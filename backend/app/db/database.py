from collections.abc import AsyncGenerator

from app.settings import settings
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

engine: AsyncEngine = create_async_engine(
    url=settings.DATABASE.URL,
    echo=settings.SQLALCHEMY_ECHO,
    pool_size=settings.DATABASE.POOL_SIZE,
    max_overflow=settings.DATABASE.MAX_OVERFLOW,
    feature=True,
)

AsyncSessionLocal: AsyncGenerator = async_sessionmaker(
    bind=engine, expire_on_commit=False, class_=AsyncSession
)
