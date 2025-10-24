from fastapi import FastAPI
from models import User

app = FastAPI()


@app.get("/users")
def get_users():
    return User


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    return {"item_id": item_id, "q": q}
