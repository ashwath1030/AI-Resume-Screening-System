from pydantic import BaseModel, EmailStr
from typing import Optional


class CandidateCreate(BaseModel):

    name: str
    email: EmailStr
    phone: str
    education: str
    experience: str


class CandidateResponse(BaseModel):

    id: int
    name: str
    email: str
    phone: str
    education: Optional[str] = None
    experience: Optional[str] = None

    class Config:
        from_attributes = True