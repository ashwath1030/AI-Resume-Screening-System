from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.ranking_history import (
    RankingHistoryCreate,
    RankingHistoryResponse
)

from app.services.ranking_history_service import (
    RankingHistoryService
)

router = APIRouter(
    prefix="/ranking-history",
    tags=["Ranking History"]
)


@router.post("/", response_model=RankingHistoryResponse)
def create_ranking(
    ranking: RankingHistoryCreate,
    db: Session = Depends(get_db)
):
    return RankingHistoryService.create_ranking(
        db,
        ranking
    )


@router.get("/", response_model=list[RankingHistoryResponse])
def get_rankings(
    db: Session = Depends(get_db)
):
    return RankingHistoryService.get_rankings(db)


@router.get("/{ranking_id}", response_model=RankingHistoryResponse)
def get_ranking(
    ranking_id: int,
    db: Session = Depends(get_db)
):

    ranking = RankingHistoryService.get_ranking(
        db,
        ranking_id
    )

    if ranking is None:

        raise HTTPException(
            status_code=404,
            detail="Ranking not found"
        )

    return ranking


@router.delete("/{ranking_id}")
def delete_ranking(
    ranking_id: int,
    db: Session = Depends(get_db)
):

    result = RankingHistoryService.delete_ranking(
        db,
        ranking_id
    )

    if result is None:

        raise HTTPException(
            status_code=404,
            detail="Ranking not found"
        )

    return result