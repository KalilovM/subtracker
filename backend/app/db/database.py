from app.core.settings import settings
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

# Global engine instance
engine: AsyncEngine = create_async_engine(
    url=settings.DATABASE.URL,
    echo=settings.SQLALCHEMY_ECHO,
    pool_size=settings.DATABASE.POOL_SIZE,
    max_overflow=settings.DATABASE.MAX_OVERFLOW,
    feature=True,
)

# Session factory
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)
