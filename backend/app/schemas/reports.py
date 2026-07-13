from pydantic import BaseModel
from datetime import datetime


class ReportCreate(BaseModel):

    report_name: str
    report_type: str
    generated_by: str
    file_path: str


class ReportResponse(BaseModel):

    id: int
    report_name: str
    report_type: str
    generated_by: str
    file_path: str
    generated_at: datetime

    class Config:
        from_attributes = True