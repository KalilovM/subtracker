from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse
from app.exceptions.base import AppException
import logging

logger = logging.getLogger("app")


class ExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        try:
            return await call_next(request)
        except AppException as exc:
            logger.warning(f"Handled: {exc.message}")
            return JSONResponse(status_code=exc.status_code, context=exc.to_dict())
