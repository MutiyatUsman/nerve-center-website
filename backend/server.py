from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import time
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Annotated

import bcrypt
import jwt
import cloudinary
import cloudinary.uploader
import cloudinary.utils
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, Query
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, BeforeValidator, ConfigDict

# ---------- MongoDB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ---------- Cloudinary ----------
cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    secure=True,
)

# ---------- App ----------
app = FastAPI(title="NERVE Center API")
api = APIRouter(prefix="/api")

# ---------- Auth Helpers ----------
JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email,
               "exp": datetime.now(timezone.utc) + timedelta(hours=8),
               "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id,
               "exp": datetime.now(timezone.utc) + timedelta(days=7),
               "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def set_auth_cookies(response: Response, access: str, refresh: str):
    response.set_cookie("access_token", access, httponly=True, secure=False,
                        samesite="lax", max_age=8 * 3600, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=False,
                        samesite="lax", max_age=7 * 24 * 3600, path="/")

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------- Models ----------
class LoginBody(BaseModel):
    email: EmailStr
    password: str

class MemberIn(BaseModel):
    name: str
    role: str
    focus_area: Optional[str] = ""
    bio: Optional[str] = ""
    email: Optional[str] = ""
    photo_url: Optional[str] = ""
    category: Optional[str] = "member"  # director | member | alumni
    order: Optional[int] = 100

class PublicationIn(BaseModel):
    title: str
    authors: str
    journal: Optional[str] = ""
    year: int
    doi: Optional[str] = ""
    topic: Optional[str] = ""

class NewsIn(BaseModel):
    title: str
    excerpt: Optional[str] = ""
    body: Optional[str] = ""
    date: Optional[str] = ""  # ISO date string
    image_url: Optional[str] = ""
    tag: Optional[str] = "news"

class ContactMsg(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = ""
    message: str

def _doc_out(doc: dict) -> dict:
    if not doc:
        return doc
    doc["id"] = str(doc.pop("_id"))
    return doc

# ---------- Auth Endpoints ----------
@api.post("/auth/login")
async def login(body: LoginBody, response: Response):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    uid = str(user["_id"])
    access = create_access_token(uid, email)
    refresh = create_refresh_token(uid)
    set_auth_cookies(response, access, refresh)
    return {"id": uid, "email": email, "name": user.get("name", "Admin"),
            "role": user.get("role", "admin"), "token": access}

@api.post("/auth/logout")
async def logout(response: Response):
    # Explicitly overwrite cookies with expired values to force browsers to drop them.
    response.set_cookie("access_token", "", httponly=True, secure=False, samesite="lax", max_age=0, expires=0, path="/")
    response.set_cookie("refresh_token", "", httponly=True, secure=False, samesite="lax", max_age=0, expires=0, path="/")
    return {"ok": True}

@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user

# ---------- Cloudinary Signature ----------
@api.get("/cloudinary/signature")
async def cloudinary_signature(
    resource_type: str = Query("image", pattern="^(image|video)$"),
    folder: str = Query("uploads/"),
    _user: dict = Depends(get_current_user),
):
    allowed = ("members/", "news/", "publications/", "uploads/")
    if not folder.startswith(allowed):
        raise HTTPException(status_code=400, detail="Invalid folder")
    timestamp = int(time.time())
    params = {"timestamp": timestamp, "folder": folder}
    signature = cloudinary.utils.api_sign_request(params, os.environ["CLOUDINARY_API_SECRET"])
    return {
        "signature": signature,
        "timestamp": timestamp,
        "cloud_name": os.environ["CLOUDINARY_CLOUD_NAME"],
        "api_key": os.environ["CLOUDINARY_API_KEY"],
        "folder": folder,
        "resource_type": resource_type,
    }

# ---------- Public Endpoints ----------
@api.get("/")
async def root():
    return {"service": "NERVE Center API", "status": "ok"}

@api.get("/members")
async def list_members(category: Optional[str] = None):
    q = {"category": category} if category else {}
    docs = await db.members.find(q).sort([("order", 1), ("name", 1)]).to_list(500)
    return [_doc_out(d) for d in docs]

@api.get("/publications")
async def list_publications(year: Optional[int] = None, topic: Optional[str] = None):
    q = {}
    if year:
        q["year"] = year
    if topic:
        q["topic"] = topic
    docs = await db.publications.find(q).sort("year", -1).to_list(1000)
    return [_doc_out(d) for d in docs]

@api.get("/news")
async def list_news():
    docs = await db.news.find({}).sort("date", -1).to_list(200)
    return [_doc_out(d) for d in docs]

@api.post("/contact")
async def create_contact(body: ContactMsg):
    doc = body.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)
    return {"ok": True}

# ---------- Admin CRUD ----------
def _admin(user: dict = Depends(get_current_user)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user

# Members
@api.post("/admin/members")
async def create_member(body: MemberIn, _: dict = Depends(_admin)):
    doc = body.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    r = await db.members.insert_one(doc)
    doc["_id"] = r.inserted_id
    return _doc_out(doc)

@api.put("/admin/members/{mid}")
async def update_member(mid: str, body: MemberIn, _: dict = Depends(_admin)):
    await db.members.update_one({"_id": ObjectId(mid)}, {"$set": body.model_dump()})
    doc = await db.members.find_one({"_id": ObjectId(mid)})
    return _doc_out(doc)

@api.delete("/admin/members/{mid}")
async def delete_member(mid: str, _: dict = Depends(_admin)):
    await db.members.delete_one({"_id": ObjectId(mid)})
    return {"ok": True}

# Publications
@api.post("/admin/publications")
async def create_pub(body: PublicationIn, _: dict = Depends(_admin)):
    doc = body.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    r = await db.publications.insert_one(doc)
    doc["_id"] = r.inserted_id
    return _doc_out(doc)

@api.put("/admin/publications/{pid}")
async def update_pub(pid: str, body: PublicationIn, _: dict = Depends(_admin)):
    await db.publications.update_one({"_id": ObjectId(pid)}, {"$set": body.model_dump()})
    doc = await db.publications.find_one({"_id": ObjectId(pid)})
    return _doc_out(doc)

@api.delete("/admin/publications/{pid}")
async def delete_pub(pid: str, _: dict = Depends(_admin)):
    await db.publications.delete_one({"_id": ObjectId(pid)})
    return {"ok": True}

# News
@api.post("/admin/news")
async def create_news(body: NewsIn, _: dict = Depends(_admin)):
    doc = body.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    r = await db.news.insert_one(doc)
    doc["_id"] = r.inserted_id
    return _doc_out(doc)

@api.put("/admin/news/{nid}")
async def update_news(nid: str, body: NewsIn, _: dict = Depends(_admin)):
    await db.news.update_one({"_id": ObjectId(nid)}, {"$set": body.model_dump()})
    doc = await db.news.find_one({"_id": ObjectId(nid)})
    return _doc_out(doc)

@api.delete("/admin/news/{nid}")
async def delete_news(nid: str, _: dict = Depends(_admin)):
    await db.news.delete_one({"_id": ObjectId(nid)})
    return {"ok": True}

@api.get("/admin/contacts")
async def list_contacts(_: dict = Depends(_admin)):
    docs = await db.contact_messages.find({}).sort("created_at", -1).to_list(500)
    return [_doc_out(d) for d in docs]

# ---------- Startup: seed admin ----------
@app.on_event("startup")
async def on_startup():
    await db.users.create_index("email", unique=True)
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@nervecenter.org").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "NerveAdmin2025!")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Site Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )

@app.on_event("shutdown")
async def shutdown_db():
    client.close()

# ---------- Wire router + CORS ----------
app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
