from fastapi import FastAPI, UploadFile, File, Form
from app.resume_parser import extract_text_from_pdf
from pydantic import BaseModel
from app.job_parser import clean_job_description
from app.skills import extract_skills
from app.matcher import match_resume_to_job
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Resume Job Match Assistant")
class JobDescription(BaseModel):
    text: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend is running successfully"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)

    return {
        "filename": file.filename,
        "text": text[:1000]  # Return first 1000 characters
    }


@app.post("/parse-job")
def parse_job(job: JobDescription):
    cleaned_text = clean_job_description(job.text)
    skills = extract_skills(cleaned_text)

    return {
        "cleaned_text": cleaned_text,
        "skills": skills
    }


@app.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    job_text: str = Form(...)
):
    result = match_resume_to_job(file.file, job_text)
    return result
   