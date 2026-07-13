from sqlalchemy.orm import Session

from app.models.ranking_history import RankingHistory


class RankingHistoryService:

    @staticmethod
    def create_ranking(db: Session, ranking):

        new_ranking = RankingHistory(
            candidate_id=ranking.candidate_id,
            job_id=ranking.job_id,
            score=ranking.score
        )

        db.add(new_ranking)

        db.commit()

        db.refresh(new_ranking)

        return new_ranking

    @staticmethod
    def get_rankings(db: Session):

        return db.query(
            RankingHistory
        ).all()

    @staticmethod
    def get_ranking(db: Session, ranking_id: int):

        return db.query(
            RankingHistory
        ).filter(
            RankingHistory.id == ranking_id
        ).first()

    @staticmethod
    def delete_ranking(db: Session, ranking_id: int):

        ranking = db.query(
            RankingHistory
        ).filter(
            RankingHistory.id == ranking_id
        ).first()

        if ranking is None:
            return None

        db.delete(ranking)

        db.commit()

        return {
            "message": "Ranking deleted successfully"
        }