from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, Integer, MetaData, String, func
from sqlalchemy.ext.asyncio import AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column

# Custom naming convention for constraints
convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata = MetaData(naming_convention=convention)


class Base(AsyncAttrs, DeclarativeBase):
    """
    Base class for all async ORM models
    Includes AsyncAtrtrs mixin for async relationship loading.
    """

    metadata = metadata

    # Type annotation map for common Python types
    type_annotation_map = {str: String(255)}


class BaseModel(Base):
    """
    Abastract Base model with common fields for all entities.
    Not mapped to a table itself.
    """

    __abstract__ = True
    # PK - standaard across all models
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    # Audit timestamps - server-side defaults for reliability
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False
    )

    # Auto-generate table names from class names (snake_case convention)
    @declared_attr.directive
    def __tablename__(cls) -> str:
        """Convert CamelCase class name to snake_case table name"""
        import re

        name = re.sub(r"(?<!^)(?=[A-Z])", "_", cls.__name__).lower()
        return name

    def __repr__(self) -> str:
        """Readable representation for debugging"""
        columns = ", ".join(
            f"{k}={repr(v)}" for k, v in self.__dict__.items() if not k.startswith("_")
        )
        return f"{self.__class__.__name__}({columns})"

    def to_dict(self) -> dict[str, Any]:
        """Convert model to dictionary (useful for JSON serialization)"""
        return {column.name: getattr(self, column.name) for column in self.__table__.columns}
