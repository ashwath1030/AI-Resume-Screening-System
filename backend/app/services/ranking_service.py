from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.resume import Resume
from app.models.candidate import Candidate
from app.models.ranking_history import RankingHistory
from app.ai.semantic_matching import SemanticMatcher


class RankingService:
    matcher = SemanticMatcher()
    @staticmethod
    def rank_candidates(db: Session, job_id: int):

        job = db.query(Job).filter(Job.id == job_id).first()

        if not job:
            return []

        resumes = db.query(Resume).all()

        rankings = []

        job_skills = [
            skill.strip().lower()
            for skill in (job.skills or "").split(",")
            if skill.strip()
        ]

        for resume in resumes:

            resume_skills = [
                skill.strip().lower()
                for skill in (resume.skills or "").split(",")
                if skill.strip()
            ]

            # ------------------------
            # Skill Matching (70 Marks)
            # ------------------------
            matched_skills = list(
                set(job_skills).intersection(resume_skills)
            )

            skill_score = (
                len(matched_skills) / len(job_skills) * 70
            ) if job_skills else 0

            # ------------------------
            # Experience (20 Marks)
            # ------------------------
            experience_score = 0

            if resume.extracted_text and job.experience:

                if job.experience.lower() in resume.extracted_text.lower():
                    experience_score = 20

            # ------------------------
            # Education (10 Marks)
            # ------------------------
            education_score = 0

            if resume.extracted_text:

                text = resume.extracted_text.lower()

                if (
                    "bachelor" in text
                    or "b.e" in text
                    or "b.tech" in text
                    or "mca" in text
                    or "m.tech" in text
                ):
                    education_score = 10

            # ------------------------
            # Final Score
            # ------------------------
            # AI Semantic Score (0-100)
            semantic_score = RankingService.matcher.calculate_similarity(
    resume.extracted_text,
    job.description
)

# Final Score
            score = round(
            (semantic_score * 0.6) +
            ((skill_score + experience_score + education_score) * 0.4),
             2
            )

            # Save History
            history = RankingHistory(
                candidate_id=resume.candidate_id,
                job_id=job.id,
                score=score
            )

            db.add(history)

            candidate = db.query(Candidate).filter(
                Candidate.id == resume.candidate_id
            ).first()

            rankings.append({
    "candidate_id": resume.candidate_id,
    "candidate_name": candidate.name if candidate else "Unknown",
    "email": candidate.email if candidate else "",
    "phone": candidate.phone if candidate else "",
    "score": score,
    "semantic_score": semantic_score,
    "matched_skills": matched_skills,
    "skill_score": round(skill_score, 2),
    "experience_score": experience_score,
    "education_score": education_score
})

        db.commit()

        rankings.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        return rankings