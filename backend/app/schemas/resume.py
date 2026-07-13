from pydantic import BaseModel
from datetime import datetime


class ResumeCreate(BaseModel):
    candidate_id: int
    file_name: str
    file_path: str
    extracted_text: str
    skills: str
    score: float = 0


class ResumeResponse(BaseModel):
    id: int
    candidate_id: int
    file_name: str
    file_path: str
    extracted_text: str
    skills: str
    score: float
    uploaded_at: datetime

    class Config:
        from_attributes = True