from fastapi import Request, HTTPException, status
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository


async def get_current_user(request: Request):
    session_id = request.cookies.get("session_id")
    if not session_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Login required")
    session_data = await AuthService(UserRepository()).get_session_user(session_id)
    return session_data
