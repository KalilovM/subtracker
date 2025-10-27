from fastapi import FastAPI
from app.api.routes import auth_routes
from app.db.database import engine
from app.db.base import Base
from app.exceptions.handlers import app_exceptions_handler, generic_exception_handler
from app.exceptions.base import AppException
from app.exceptions.middleware import ExceptionMiddleware
from app.core.logging_config import setup_logging
from app.db.redis_client import redis_client

from contextlib import asynccontextmanager

setup_logging()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created.")
    await redis_client.get_client()

    yield

    await engine.dispose()
    await redis_client.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(ExceptionMiddleware)
app.add_exception_handler(AppException, app_exceptions_handler)
app.add_exception_handler(Exception, generic_exception_handler)

app.include_router(auth_routes.router)
