from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession
from database import AsyncSessionLocal


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency for FastAPI/async frameworks.
    Provides a database session with automatic cleanup.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
