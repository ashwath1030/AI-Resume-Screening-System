from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    email = Column(String(150), unique=True, nullable=False)

    phone = Column(String(20))

    education = Column(String(200))

    experience = Column(String(100))