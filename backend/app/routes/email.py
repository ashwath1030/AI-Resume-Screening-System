from fastapi import APIRouter
from pydantic import BaseModel

from app.email.email_service import send_email

router = APIRouter(
    prefix="/email",
    tags=["Email Notifications"]
)


class EmailRequest(BaseModel):
    email: str
    subject: str
    body: str


@router.post("/send")
async def send_candidate_email(request: EmailRequest):

    await send_email(
        request.email,
        request.subject,
        request.body
    )

    return {
        "message": "Email sent successfully"
    }