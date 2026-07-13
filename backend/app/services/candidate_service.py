from sqlalchemy.orm import Session

from app.models.candidate import Candidate


class CandidateService:

    @staticmethod
    def create_candidate(db: Session, candidate):

        new_candidate = Candidate(
            name=candidate.name,
            email=candidate.email,
            phone=candidate.phone,
            education=candidate.education,
            experience=candidate.experience
        )

        db.add(new_candidate)
        db.commit()
        db.refresh(new_candidate)

        return new_candidate

    @staticmethod
    def get_candidates(db: Session):

        return db.query(Candidate).all()

    @staticmethod
    def get_candidate(db: Session, candidate_id: int):

        return db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

    @staticmethod
    def update_candidate(
        db: Session,
        candidate_id: int,
        updated_candidate
    ):

        candidate = db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

        if candidate is None:
            return None

        candidate.name = updated_candidate.name
        candidate.email = updated_candidate.email
        candidate.phone = updated_candidate.phone
        candidate.education = updated_candidate.education
        candidate.experience = updated_candidate.experience

        db.commit()
        db.refresh(candidate)

        return candidate

    @staticmethod
    def delete_candidate(db: Session, candidate_id: int):

        candidate = db.query(Candidate).filter(
            Candidate.id == candidate_id
        ).first()

        if candidate is None:
            return None

        db.delete(candidate)
        db.commit()

        return {
            "message": "Candidate deleted successfully"
        }