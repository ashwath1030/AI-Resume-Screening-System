import os
import uuid
from fastapi import HTTPException

ALLOWED_EXTENSIONS = [".pdf", ".docx"]
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


def validate_extension(filename: str):

    extension = os.path.splitext(filename)[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed."
        )


def generate_filename(filename: str):

    extension = os.path.splitext(filename)[1]

    unique_name = f"{uuid.uuid4()}{extension}"

    return unique_name