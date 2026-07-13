from sqlalchemy.orm import Session

from app.models.job import Job


class JobService:

    @staticmethod
    def create_job(db: Session, job):

        new_job = Job(
            title=job.title,
            company=job.company,
            description=job.description,
            skills=job.skills,
            experience=job.experience
        )

        db.add(new_job)
        db.commit()
        db.refresh(new_job)

        return new_job

    @staticmethod
    def get_jobs(db: Session):

        return db.query(Job).all()

    @staticmethod
    def get_job(db: Session, job_id: int):

        return db.query(Job).filter(Job.id == job_id).first()

    @staticmethod
    def update_job(db: Session, job_id: int, updated_job):

        job = db.query(Job).filter(Job.id == job_id).first()

        if job is None:
            return None

        job.title = updated_job.title
        job.company = updated_job.company
        job.description = updated_job.description
        job.skills = updated_job.skills
        job.experience = updated_job.experience

        db.commit()
        db.refresh(job)

        return job

    @staticmethod
    def delete_job(db: Session, job_id: int):

        job = db.query(Job).filter(Job.id == job_id).first()

        if job is None:
            return None

        db.delete(job)
        db.commit()

        return {
            "message": "Job deleted successfully"
        }