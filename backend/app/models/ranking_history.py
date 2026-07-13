from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from datetime import datetime

from app.database.database import Base


class RankingHistory(Base):

    __tablename__ = "ranking_history"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id")
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )

    score = Column(Float, nullable=False)

    ranked_at = Column(
        DateTime,
        default=datetime.utcnow
    )