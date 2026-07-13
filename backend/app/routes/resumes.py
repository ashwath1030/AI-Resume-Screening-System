from fastapi import APIRouter, Depends, HTTPException,UploadFile, File
from sqlalchemy.orm import Session
from app.core.role_checker import RoleChecker

admin_hr = RoleChecker(["admin", "hr"])

from app.database.database import get_db
from app.schemas.resume import ResumeCreate, ResumeResponse
from app.services.resume_service import ResumeService


router = APIRouter(
    prefix="/resumes",
    tags=["Resumes"]
)
@router.post("/", response_model=ResumeResponse)
def create_resume(
    resume: ResumeCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)):

    return ResumeService.create_resume(
        db,
        resume
    )
@router.get("/", response_model=list[ResumeResponse])
def get_resumes(
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    return ResumeService.get_resumes(db)


@router.get("/{resume_id}", response_model=ResumeResponse)
def get_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    resume = ResumeService.get_resume(
        db,
        resume_id
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return resume
@router.put("/{resume_id}", response_model=ResumeResponse)
def update_resume(
    resume_id: int,
    updated_resume: ResumeCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    resume = ResumeService.update_resume(
        db,
        resume_id,
        updated_resume
    )

    if resume is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return resume
@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    result = ResumeService.delete_resume(
        db,
        resume_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return result
@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):
    return await ResumeService.upload_resume(file, db)