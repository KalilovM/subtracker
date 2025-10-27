from fastapi import Request
from fastapi.responses import JSONResponse
from app.exceptions.base import AppException
import logging

logger = logging.getLogger("app")


async def app_exceptions_handler(request: Request, exc: AppException):
    """Handles all AppException-based errors."""
    logger.warning(f"{exc.__class__.__name}: {exc.message}")
    return JSONResponse(status_code=exc.status_code, content=exc.to_dict())


async def generic_exception_handler(request: Request, exc: Exception):
    """Fallback for unexpected exceptions."""
    logger.error(f"Unhandled exception at {request.url.path}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"error": "InternalServerError", "message": "An unexpected error occured"},
    )
