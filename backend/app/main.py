from fastapi import FastAPI, UploadFile, File
from app.resume_parser import extract_text_from_pdf

app = FastAPI(title="AI Resume Job Match Assistant")


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