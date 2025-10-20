from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy import String, text
import uuid
from database import Base


# class Role(StrEnum)


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default_factory=uuid.uuid4,
        server_default=text("gen_random_uuid()"),
        init=False,
    )
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(100), nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String(20), nullable=False)
    salt: Mapped[str] = mapped_column(String(255), nullable=False)
