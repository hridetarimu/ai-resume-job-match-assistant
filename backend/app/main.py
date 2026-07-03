from fastapi import FastAPI

app = FastAPI(title="AI Resume Job Match Assistant")


@app.get("/")
def home():
    return {"message": "Backend is running successfully"}


@app.get("/health")
def health_check():
    return {"status": "ok"}