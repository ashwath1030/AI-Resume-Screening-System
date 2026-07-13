from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os


def generate_pdf_report(candidates, output_file):
    """
    Generate Candidate Ranking PDF Report
    """

    pdf = canvas.Canvas(output_file, pagesize=letter)

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, 780, "Candidate Ranking Report")

    y = 740

    pdf.setFont("Helvetica", 12)

    for candidate in candidates:

        pdf.drawString(50, y, f"Name : {candidate['name']}")
        y -= 20

        pdf.drawString(50, y, f"Email : {candidate['email']}")
        y -= 20

        pdf.drawString(50, y, f"Skills : {', '.join(candidate['skills'])}")
        y -= 20

        pdf.drawString(50, y, f"Experience : {candidate['experience']}")
        y -= 20

        pdf.drawString(50, y, f"Score : {candidate['score']}%")
        y -= 40

        if y < 80:
            pdf.showPage()
            pdf.setFont("Helvetica", 12)
            y = 760

    pdf.save()