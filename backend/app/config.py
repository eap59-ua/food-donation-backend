from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@db:5432/food_donation"
    SECRET_KEY: str = "change-me-in-production-please"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # // [Feature: User Management] [Story: admin-initialization] [Ticket: UM-ADMIN-001-BE]
    ADMIN_EMAIL: str = "admin@gmail.com"
    ADMIN_PASSWORD: str = "AdminPassword123!"

    class Config:
        env_file = ".env"


settings = Settings()
