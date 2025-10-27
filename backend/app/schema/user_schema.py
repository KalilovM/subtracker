from pydantic import BaseModel, EmailStr, Field
import uuid


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserRead(BaseModel):
    id: uuid.UUID
    username: str
    email: str
    role: str

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    username: str
    password: str


class MessageResponse(BaseModel):
    message: str
