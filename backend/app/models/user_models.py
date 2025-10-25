import uuid
from enum import Enum as PyEnum

from sqlalchemy import String, text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import Enum as SAEnum

from app.db.base import BaseModel
from app.db.mixins import SoftDeleteMixin


class Role(PyEnum):
    ADMIN = "ADMIN"
    USER = "USER"


class User(BaseModel, SoftDeleteMixin):
    """User model for tracking application users and their subscriptions."""

    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
        nullable=False,
    )

    # Core identity fields
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)

    role: Mapped[Role] = mapped_column(
        SAEnum(Role, name="role_enum", create_constraint=True),
        nullable=False,
        default=Role.USER,
        server_default=text("'USER'"),
    )
