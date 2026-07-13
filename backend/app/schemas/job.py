from pydantic import BaseModel


class JobCreate(BaseModel):

    title: str
    company: str
    description: str
    skills: str
    experience: str


class JobResponse(BaseModel):

    id: int
    title: str
    company: str
    description: str
    skills: str
    experience: str

    class Config:
        from_attributes = True