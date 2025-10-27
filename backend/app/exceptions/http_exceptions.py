from app.exceptions.base import AppException
from fastapi import status


class AuthException(AppException):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Invalid credentials"):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED)


class NotFoundException(AppException):
    """Raised when entity is not found in DB."""

    def __init__(self, entity: str = "Resource"):
        super().__init__(f"{entity} not found", status.HTTP_404_NOT_FOUND)


class DatabaseException(AppException):
    """Raised when database operations fail unexpectedly."""

    def __init__(self, message: str = "Database error"):
        super().__init__(message, status.HTTP_503_SERVICE_UNAVAILABLE)
