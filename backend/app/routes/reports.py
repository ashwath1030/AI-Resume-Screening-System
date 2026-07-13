import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.role_checker import RoleChecker
from app.database.database import get_db
from app.schemas.reports import ReportCreate, ReportResponse
from app.services.report_service import ReportService

all_roles = RoleChecker(["admin", "hr", "recruiter"])

router = APIRouter(
    prefix="/report-db",
    tags=["Reports Database"]
)

# Backend folder path
BASE_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")
)


@router.get("/pdf")
def download_pdf():

    file_path = os.path.join(
        BASE_DIR,
        "reports_output",
        "candidate_report.pdf"
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="PDF report not found"
        )

    return FileResponse(
        path=file_path,
        filename="candidate_report.pdf",
        media_type="application/pdf"
    )


@router.get("/excel")
def download_excel():

    file_path = os.path.join(
        BASE_DIR,
        "reports_output",
        "candidate_report.xlsx"
    )

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="Excel report not found"
        )

    return FileResponse(
        path=file_path,
        filename="candidate_report.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@router.post("/", response_model=ReportResponse)
def create_report(
    report: ReportCreate,
    db: Session = Depends(get_db),
    user=Depends(all_roles)
):
    return ReportService.create_report(db, report)


@router.get("/", response_model=list[ReportResponse])
def get_reports(
    db: Session = Depends(get_db),
    user=Depends(all_roles)
):
    return ReportService.get_reports(db)


@router.get("/{report_id}", response_model=ReportResponse)
def get_report(
    report_id: int,
    db: Session = Depends(get_db),
    user=Depends(all_roles)
):
    report = ReportService.get_report(db, report_id)

    if report is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return report


@router.delete("/{report_id}")
def delete_report(
    report_id: int,
    db: Session = Depends(get_db),
    user=Depends(all_roles)
):
    result = ReportService.delete_report(db, report_id)

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return result