from datetime import datetime

from sqlalchemy import Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column


class SoftDeleteMixin:
    """
    Mixin for soft-delete functionality.
    Use for models where you want to mark as deleted without removing them.
    """

    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    def soft_delete(self) -> None:
        """Mark record as deleted"""
        from datetime import datetime, timezone

        self.is_deleted = True
        self.deleted_at = datetime.now(timezone.utc)
