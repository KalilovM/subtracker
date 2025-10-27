from fastapi import FastAPI
from app.api.routes import auth_routes
from app.db.database import engine
from app.db.base import Base

from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database tables created.")

    yield  # App runs here

    # Shutdown logic (optional)
    await engine.dispose()
    print("Database connection closed.")


app = FastAPI(lifespan=lifespan)

app.include_router(auth_routes.router)
