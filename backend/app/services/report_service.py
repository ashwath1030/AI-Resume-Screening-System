from sqlalchemy.orm import Session

from app.models.report import Report


class ReportService:

    @staticmethod
    def create_report(db: Session, report):

        new_report = Report(
            report_name=report.report_name,
            report_type=report.report_type,
            generated_by=report.generated_by,
            file_path=report.file_path
        )

        db.add(new_report)
        db.commit()
        db.refresh(new_report)

        return new_report

    @staticmethod
    def get_reports(db: Session):

        return db.query(Report).all()

    @staticmethod
    def get_report(db: Session, report_id: int):

        return db.query(Report).filter(
            Report.id == report_id
        ).first()

    @staticmethod
    def delete_report(db: Session, report_id: int):

        report = db.query(Report).filter(
            Report.id == report_id
        ).first()

        if report is None:
            return None

        db.delete(report)
        db.commit()

        return {
            "message": "Report deleted successfully"
        }