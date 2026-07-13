from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.role_checker import RoleChecker

admin_recruiter = RoleChecker(["admin", "recruiter"])
all_roles = RoleChecker(["admin", "hr", "recruiter"])

from app.database.database import get_db
from app.schemas.job import JobCreate, JobResponse
from app.services.job_service import JobService

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/", response_model=JobResponse)
def create_job(job: JobCreate, db: Session =Depends(get_db),
               user=Depends(admin_recruiter)):

    return JobService.create_job(db, job)


@router.get("/", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db),
             user=Depends(all_roles)):
    return JobService.get_jobs(db)


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db),
            user=Depends(all_roles)):
    job = JobService.get_job(db, job_id)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


@router.put("/{job_id}", response_model=JobResponse)
def update_job(job_id: int, updated_job: JobCreate, db: Session = Depends(get_db),
               user=Depends(admin_recruiter)):

    job = JobService.update_job(db, job_id, updated_job)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db),
               user=Depends(admin_recruiter)):

    result = JobService.delete_job(db, job_id)

    if not result:
        raise HTTPException(status_code=404, detail="Job not found")

    return result