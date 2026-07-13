import fitz  # PyMuPDF
from docx import Document
import os



class ResumeParser:

    @staticmethod
    def extract_text(file_path: str):

        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":
            return ResumeParser.extract_pdf(file_path)

        elif extension == ".docx":
            return ResumeParser.extract_docx(file_path)

        else:
            raise ValueError("Unsupported file format")

    @staticmethod
    def extract_pdf(file_path):

        text = ""

        pdf = fitz.open(file_path)

        for page in pdf:
            text += page.get_text()

        pdf.close()

        return text

    @staticmethod
    def extract_docx(file_path):

        doc = Document(file_path)

        text = ""

        for para in doc.paragraphs:
            text += para.text + "\n"

        return text