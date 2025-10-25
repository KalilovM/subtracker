from base import BaseRepository
from models.user import User
from collections.abc import Sequence

from sqlalchemy import select


class UserRepository(BaseRepository[User]):
    """User-specific repository with custom queries"""

    async def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_active_users(self) -> Sequence[User]:
        stmt = select(User).where(User.is_deleted.is_(False))
        result = await self.session.execute(stmt)
        return result.scalars().all()
