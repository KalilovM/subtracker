from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class DatabaseSettings(BaseModel):
    HOST: str
    PORT: int
    USER: str
    PASSWORD: str
    NAME: str
    URL: str
    POOL_SIZE: int
    MAX_OVERFLOW: int


class RedisSettings(BaseModel):
    HOST: str
    PORT: int
    PASSWORD: str
    URL: str


class AppSettings(BaseSettings):
    DEBUG: bool = False
    DATABASE: DatabaseSettings
    REDIS: RedisSettings
    SQLALCHEMY_ECHO: bool = False

    model_config = SettingsConfigDict(env_nested_delimiter="__", env_file=".env")


settings = AppSettings()
