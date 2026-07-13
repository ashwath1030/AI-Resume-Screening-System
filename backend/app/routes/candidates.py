from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.role_checker import RoleChecker

admin_hr = RoleChecker(["admin", "hr"])
from app.database.database import get_db
from app.schemas.candidate import (
    CandidateCreate,
    CandidateResponse
)
from app.services.candidate_service import CandidateService

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"]
)


@router.post("/", response_model=CandidateResponse)
def create_candidate(
    candidate: CandidateCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):
    return CandidateService.create_candidate(db, candidate)


@router.get("/", response_model=list[CandidateResponse])
def get_candidates(
    db: Session = Depends(get_db)
):
    return CandidateService.get_candidates(db)


@router.get("/{candidate_id}", response_model=CandidateResponse)
def get_candidate(
    candidate_id: int,
    db: Session = Depends(get_db)
):

    candidate = CandidateService.get_candidate(
        db,
        candidate_id
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate


@router.put("/{candidate_id}", response_model=CandidateResponse)
def update_candidate(
    candidate_id: int,
    updated_candidate: CandidateCreate,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    candidate = CandidateService.update_candidate(
        db,
        candidate_id,
        updated_candidate
    )

    if candidate is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return candidate


@router.delete("/{candidate_id}")
def delete_candidate(
    candidate_id: int,
    db: Session = Depends(get_db),
    user=Depends(admin_hr)
):

    result = CandidateService.delete_candidate(
        db,
        candidate_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found"
        )

    return result