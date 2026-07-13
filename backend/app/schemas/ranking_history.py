from pydantic import BaseModel
from datetime import datetime


class RankingHistoryCreate(BaseModel):

    candidate_id: int
    job_id: int
    score: float


class RankingHistoryResponse(BaseModel):

    id: int
    candidate_id: int
    job_id: int
    score: float
    ranked_at: datetime

    class Config:
        from_attributes = True