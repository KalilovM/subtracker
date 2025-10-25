from fastapi import APIRouter, Response, Cookie
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login")
async def login(username: str, password: str, response: Response):
    session_id = await AuthService(UserRepository()).login(username, password=password)
    response.set_cookie("session_id", session_id, httponly=True, secure=True, samesite="lax")
    return {"message": "Login successful"}


@router.get("/me")
async def get_me(session_id: str = Cookie(None)):
    session_data = await AuthService(UserRepository()).get_session_user(session_id)
    return {"user": session_data}


@router.post("/logout")
async def logout(response: Response, session_id: str = Cookie(None)):
    await AuthService(UserRepository()).logout(session_id)
    response.delete_cookie("session_id")
    return {"message": "Logged out"}
