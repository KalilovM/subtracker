from fastapi import APIRouter, Response, Cookie, Depends, status, HTTPException
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository
from app.db.dependencies import get_db
from app.models.user_models import User
from app.schema.user_schema import UserCreate, UserRead, MessageResponse, UserLogin

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signin", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def signup(payload: UserCreate, db=Depends(get_db)):
    """
    Register a new user account.
    """
    repo = UserRepository(model=User, session=db)
    service = AuthService(repo)
    user = await service.signup(payload.username, payload.email, payload.password)
    return user


@router.post("/login", response_model=MessageResponse, status_code=status.HTTP_200_OK)
async def login(payload: UserLogin, response: Response, db=Depends(get_db)):
    """
    Log in user and issue secure HttpOnly cookie session.
    """
    repo = UserRepository(model=User, session=db)
    session_id = await AuthService(repo).login(username=payload.username, password=payload.password)
    response.set_cookie(
        "session_id", session_id, httponly=True, secure=True, samesite="lax", max_age=1800
    )
    return MessageResponse(message="Login successful")


@router.get("/me", response_model=UserRead, status_code=status.HTTP_200_OK)
async def get_me(session_id: str = Cookie(None), db=Depends(get_db)):
    """
    Retrieve current user profile by session.
    """

    if not session_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    repo = UserRepository(model=User, session=db)
    session_data = await AuthService(repo).get_session_user(session_id)
    return session_data


@router.post("/logout", response_model=MessageResponse)
async def logout(response: Response, session_id: str = Cookie(None), db=Depends(get_db)):
    """
    Terminate session and delete cookies.
    """
    if not session_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No active session")

    repo = UserRepository(model=User, session=db)
    await AuthService(repo).logout(session_id)
    response.delete_cookie("session_id")
    return MessageResponse()
