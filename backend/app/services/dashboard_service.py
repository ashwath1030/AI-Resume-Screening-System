from sqlalchemy.orm import Session

from app.models.user import User
from app.models.job import Job
from app.models.resume import Resume
from app.models.candidate import Candidate
from app.models.report import Report


class DashboardService:

    @staticmethod
    def get_dashboard_stats(db: Session):

        total_users = db.query(User).count()
        total_jobs = db.query(Job).count()
        total_candidates = db.query(Candidate).count()
        total_resumes = db.query(Resume).count()
        total_reports = db.query(Report).count()

        latest_jobs = (
            db.query(Job)
            .order_by(Job.id.desc())
            .limit(5)
            .all()
        )

        latest_resumes = (
            db.query(Resume)
            .order_by(Resume.uploaded_at.desc())
            .limit(5)
            .all()
        )

        top_candidates = (
            db.query(Resume)
            .order_by(Resume.score.desc())
            .limit(5)
            .all()
        )

        return {

            "totalUsers": total_users,
            "totalJobs": total_jobs,
            "totalCandidates": total_candidates,
            "totalResumes": total_resumes,
            "totalReports": total_reports,

            "latestJobs": [
                {
                    "id": job.id,
                    "title": job.title,
                    "company": job.company
                }
                for job in latest_jobs
            ],

            "latestResumes": [
                {
                    "id": resume.id,
                    "file": resume.file_name,
                    "score": resume.score
                }
                for resume in latest_resumes
            ],

            "topCandidates": [
                {
                    "candidateId": resume.candidate_id,
                    "score": resume.score
                }
                for resume in top_candidates
            ]
        }