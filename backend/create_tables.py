from app.database.database import Base, engine

# Import all models
from app.models.user import User
from app.models.job import Job
from app.models.candidate import Candidate
from app.models.resume import Resume
from app.models.ranking_history import RankingHistory
from app.models.report import Report

Base.metadata.create_all(bind=engine)

print("✅ All database tables created successfully!")