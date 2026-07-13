from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.role_checker import RoleChecker

all_roles = RoleChecker(["admin", "hr", "recruiter"])

from app.database.database import get_db
from app.services.ranking_service import RankingService

router = APIRouter(
    prefix="/ranking",
    tags=["AI Ranking"]
)


@router.get("/{job_id}")
def rank_candidates(
    job_id: int,
    db: Session = Depends(get_db),
    user=Depends(all_roles)
):

    return RankingService.rank_candidates(
        db,
        job_id
    )