from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import dashboard
from app.routes import profile
from app.routes import candidates
from app.routes import ranking
from app.routes import ranking_history
from app.routes import auth, users, resumes, jobs, reports
from app.routes import email

app = FastAPI(
    title="AI Resume Screening & Candidate Ranking System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
         "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Resume Screening System"
    }

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(resumes.router)
app.include_router(jobs.router)
app.include_router(ranking.router)
app.include_router(reports.router)
app.include_router(dashboard.router)
app.include_router(profile.router)
app.include_router(candidates.router)
app.include_router(ranking_history.router)
app.include_router(email.router)
