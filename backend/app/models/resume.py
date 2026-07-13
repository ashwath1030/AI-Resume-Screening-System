from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    file_name = Column(String(255), nullable=False)

    file_path = Column(String(255), nullable=False)

    extracted_text = Column(String)

    skills = Column(String)

    score = Column(Float, default=0)

    uploaded_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )