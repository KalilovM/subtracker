from fastapi import status


class AppException(Exception):
    """Base class for all custom exceptions."""

    def __init__(self, message: str, status_code: int = status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

    def to_dict(self) -> dict:
        """Convert exception details to dictionary."""
        return {"error": self.__class__.__name__, "message": self.message}
