import email
import os
import shutil


from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.ai.resume_parser import ResumeParser
from app.ai.skill_extractor import SkillExtractor
from app.ai.candidate_extractor import CandidateExtractor
from app.ai.semantic_matching import SemanticMatcher
from app.models.job import Job
from app.models.candidate import Candidate



class ResumeService:

    @staticmethod
    def create_resume(db: Session, resume):

        new_resume = Resume(
            candidate_id=resume.candidate_id,
            file_name=resume.file_name,
            file_path=resume.file_path,
            extracted_text=resume.extracted_text,
            skills=resume.skills,
            score=resume.score
        )

        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)

        return new_resume

    @staticmethod
    def get_resumes(db: Session):

        return db.query(Resume).all()

    @staticmethod
    def get_resume(db: Session, resume_id: int):

        return db.query(Resume).filter(
            Resume.id == resume_id
        ).first()

    @staticmethod
    def update_resume(
        db: Session,
        resume_id: int,
        updated_resume
    ):

        resume = db.query(Resume).filter(
            Resume.id == resume_id
        ).first()

        if resume is None:
            return None

        resume.candidate_id = updated_resume.candidate_id
        resume.file_name = updated_resume.file_name
        resume.file_path = updated_resume.file_path
        resume.extracted_text = updated_resume.extracted_text
        resume.skills = updated_resume.skills
        resume.score = updated_resume.score

        db.commit()
        db.refresh(resume)

        return resume

    @staticmethod
    def delete_resume(db: Session, resume_id: int):

        resume = db.query(Resume).filter(
            Resume.id == resume_id
        ).first()

        if resume is None:
            return None

        db.delete(resume)
        db.commit()

        return {
            "message": "Resume deleted successfully"
        }


    
    @staticmethod
    async def upload_resume(file: UploadFile, db: Session):

        upload_folder = "app/uploads"
        os.makedirs(upload_folder, exist_ok=True)

        file_location = os.path.join(upload_folder, file.filename)

        # Save uploaded file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Extract text
        extracted_text = ResumeParser.extract_text(file_location)

        # Semantic AI Score
        job = db.query(Job).first()

        semantic_score = 0

        if job:
            matcher = SemanticMatcher()
            semantic_score = matcher.calculate_similarity(
                extracted_text,
                job.description
            )

        # Extract skills
        extractor = SkillExtractor()
        skills = extractor.extract_skills(extracted_text)

        # Extract candidate information
        candidate_name = CandidateExtractor.extract_name(extracted_text)
        candidate_email = CandidateExtractor.extract_email(extracted_text)
        phone = CandidateExtractor.extract_phone(extracted_text)
        experience = CandidateExtractor.extract_experience(extracted_text)
        education = CandidateExtractor.extract_education(extracted_text)

        print("Semantic Score:", semantic_score)
        print("Skills:", skills)

        # Save Resume
        candidate = (
            db.query(Candidate)
            .filter(Candidate.email == candidate_email)
            .first()
        )

        if not candidate:
            candidate = Candidate(
            name=candidate_name,
            email=candidate_email,
            phone=phone,
            education=education,
            experience=experience
        )

            db.add(candidate)
            db.commit()
            db.refresh(candidate)

        new_resume = Resume(
            candidate_id=candidate.id,
            file_name=file.filename,
            file_path=file_location,
            extracted_text=extracted_text,
            skills=",".join(skills),
            score=semantic_score
        )
        db.add(new_resume)
        db.commit()
        db.refresh(new_resume)
        return {
            "id": new_resume.id,
            "candidate_id": new_resume.candidate_id,
            "candidate_name": candidate_name,
            "email": candidate_email,
            "phone": phone,
            "experience": experience,
            "education": education,
            "file_name": new_resume.file_name,
            "file_path": new_resume.file_path,
            "resume_text": extracted_text,
            "skills": skills,
            "score": semantic_score,
            "message": "Resume uploaded successfully"
        }