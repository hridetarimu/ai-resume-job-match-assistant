
# AI Resume Job Match Assistant

**A full-stack AI-powered resume analysis application built with FastAPI, Sentence Transformers, and JavaScript.**

Upload a PDF resume, paste a job description, and receive an estimated resume-to-job match score, matched and missing skills, personalized improvement suggestions, and a downloadable PDF report.

> **Disclaimer:** This application provides ATS-style alignment estimates, not official scores from an employer's Applicant Tracking System. Scores do not guarantee interview or hiring outcomes.

---

## Features

- PDF resume text extraction
- Job description processing
- Weighted keyword and skill matching
- Semantic similarity using Sentence Transformers
- Overall resume-to-job alignment scoring
- ATS-style rating categories
- Matched and missing skill identification
- Rule-based resume improvement suggestions
- Interactive dashboard with progress bars and circular score indicators
- Light and dark modes
- Downloadable PDF analysis reports
- REST API with FastAPI and Swagger documentation
- Docker containerization for the backend
- Automated testing with pytest and pytest-cov
- GitHub Actions continuous integration

## Application Preview

Screenshots can be added to the repository's `images/` folder.

<!-- Uncomment after adding the files:

![Resume Upload](images/upload-screen.png)

![Analysis Dashboard](images/dashboard.png)

![Downloaded PDF Report](images/ats-report.png)

-->

## Technology Stack

| Category | Technologies |
|----------|--------------|
| Backend | Python, FastAPI, Uvicorn |
| Frontend | HTML, CSS, JavaScript |
| NLP | Sentence Transformers |
| Embedding Model | all-MiniLM-L6-v2 |
| PDF Processing | PyPDF2 |
| Testing | pytest, pytest-cov |
| Containerization | Docker, Docker Compose |
| CI | GitHub Actions |
| Version Control | Git, GitHub |

## System Architecture

```text
                User
                 |
                 v
         Frontend Dashboard
       HTML / CSS / JavaScript
                 |
                 v
            FastAPI API
                 |
        +--------+--------+
        |                 |
        v                 v
   Resume PDF         Job Description
      Parser             Parser
        |                 |
        +--------+--------+
                 |
                 v
          Skill Extraction
                 |
       +---------+---------+
       |                   |
       v                   v
 Weighted Skill      Semantic Similarity
    Matching         Sentence Transformers
       |                   |
       +---------+---------+
                 |
                 v
          Combined Score
                 |
                 v
         Matched / Missing
               Skills
                 |
                 v
       Improvement Suggestions
                 |
                 v
         Dashboard Results
            PDF Export
```

## How It Works

1. The user uploads a PDF resume.
2. The user enters a job description.
3. The backend extracts and processes the resume text.
4. The system identifies relevant skills in both texts.
5. Weighted skill matching measures the overlap.
6. Sentence Transformers evaluates semantic similarity.
7. The application combines both scores.
8. The frontend displays analysis results and suggestions.
9. The user can download a PDF report.

## Matching Algorithm

### Weighted Skill Matching

The application calculates skill alignment using predefined skill weights.

```text
Skill Match (%) =
100 × (Matched Job Skill Weight / Total Job Skill Weight)
```

### Semantic Similarity

The application uses the Sentence Transformers model `all-MiniLM-L6-v2` to compare the semantic relationship between a resume and job description.

The similarity is presented as a percentage-style score. It is a heuristic estimate, not a calibrated hiring probability.

### Overall Match Score

```text
Overall Match (%) =
(Skill Match (%) + Semantic Match (%)) / 2
```

### ATS-Style Rating Categories

| Score | Rating |
|-------|--------|
| 85 and above | Excellent |
| 70 to below 85 | Good |
| 50 to below 70 | Fair |
| Below 50 | Needs Improvement |

These are project-defined ratings rather than employer-specific ATS benchmarks.

## Example Analysis

An example from a verified local application test:

| Metric | Result |
|--------|--------|
| Overall Match | 63.03% |
| Skill Match | 70.59% |
| Semantic Match | 55.48% |

**Matched Skills**
- Java
- PyTorch
- Python

**Missing Skills**
- Machine Learning

**Suggested Improvement**

Highlight relevant machine learning projects, models, datasets, and evaluation metrics when supported by actual experience.

## Installation

### Prerequisites

- Python
- Git
- pip
- Modern web browser
- Docker Desktop (optional)
- VS Code Live Server extension (optional)

### Clone the Repository

```bash
git clone https://github.com/hridetarimu/ai-resume-job-match-assistant.git
cd ai-resume-job-match-assistant
```

### Run the Backend Locally

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

python -m pip install -r requirements.txt

python -m uvicorn app.main:app --reload
```

Visit:

http://localhost:8000/docs

### Run the Frontend

Open `frontend/index.html` using VS Code Live Server.

The frontend should communicate with the local FastAPI backend at:

http://127.0.0.1:8000

## Docker Setup

The backend is containerized using Docker and Docker Compose.

From the project root:

### Build and Start

```bash
docker compose up -d --build
```

### Verify Running Containers

```bash
docker compose ps
```

### View Logs

```bash
docker compose logs -f backend
```

### Stop Containers

```bash
docker compose down
```

### Verify Backend Health

Open:

http://localhost:8000/health

Expected response:

```json
{
  "status": "ok"
}
```

The current Docker Compose configuration runs the FastAPI backend. The frontend is served separately.

## REST API

FastAPI provides interactive API documentation at:

http://localhost:8000/docs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint |
| GET | `/health` | Health check |
| POST | `/upload-resume` | Extract text from a PDF |
| POST | `/parse-job` | Process a job description |
| POST | `/match` | Analyze resume-to-job alignment |

### Example API Request

```bash
curl -X POST "http://localhost:8000/match" \
  -F "file=@resume.pdf;type=application/pdf" \
  -F "job_text=Seeking an AI Engineer with Python, FastAPI, Docker, SQL, and machine learning experience."
```

The response includes scores, matched and missing skills, improvement suggestions, and an ATS-style rating.

## Automated Testing

The backend uses pytest and pytest-cov to verify application functionality.

Test coverage includes:

- Health endpoint
- Job description processing
- PDF resume parsing
- Weighted skill matching
- Semantic matching
- Resume matching orchestration
- ATS rating categories
- Resume improvement suggestions

### Run Tests

From the `backend` directory:

```bash
python -m pip install pytest pytest-cov httpx

python -m pytest -v \
  --cov=app \
  --cov-report=term-missing \
  --cov-fail-under=80
```

### Latest Verified Local Results

| Metric | Result |
|--------|--------|
| Passing Tests | 46 |
| Failed Tests | 0 |
| Statement Coverage | 96% (rounded) |
| Minimum Coverage | 80% |

These results represent a verified local test run and may change as the project evolves.

## Continuous Integration

GitHub Actions runs automated backend tests on pushes and pull requests to the `main` branch.

The workflow:

1. Checks out the repository.
2. Sets up Python.
3. Installs backend dependencies.
4. Runs automated tests.
5. Checks code coverage.

Workflow location:

```text
.github/workflows/backend-tests.yml
```

The repository uses an 80% minimum coverage target.

GitHub Actions execution results are available in the repository's Actions tab.

## Project Structure

```text
ai-resume-job-match-assistant/
|
|-- .github/
|   `-- workflows/
|       `-- backend-tests.yml
|
|-- backend/
|   |-- app/
|   |   |-- main.py
|   |   |-- matcher.py
|   |   |-- matching.py
|   |   |-- semantic_matcher.py
|   |   |-- resume_parser.py
|   |   |-- job_parser.py
|   |   |-- skills.py
|   |   |-- skill_weights.py
|   |   |-- ats_rating.py
|   |   `-- suggestions.py
|   |
|   |-- Dockerfile
|   |-- .dockerignore
|   |-- requirements.txt
|   `-- test_*.py
|
|-- frontend/
|   |-- index.html
|   |-- style.css
|   `-- script.js
|
|-- data/
|-- notebooks/
|-- tests/
|-- docker-compose.yml
|-- .gitignore
`-- README.md
```

## Current Limitations

- Skill extraction partly relies on predefined keywords.
- Synonyms and related technologies may not always be recognized correctly.
- Scanned PDF resumes may require OCR.
- Scores have not been validated against employer ATS systems.
- Resume suggestions are primarily rule-based.
- The application has not yet been publicly deployed.
- PyPDF2 is deprecated and should be replaced with a maintained PDF library.

## Roadmap

- [x] FastAPI backend development
- [x] PDF resume processing
- [x] Weighted skill matching
- [x] Semantic similarity
- [x] Interactive frontend dashboard
- [x] Dark mode
- [x] PDF report export
- [x] Dockerized backend
- [x] Automated backend testing
- [x] GitHub Actions CI
- [ ] Context-aware skill extraction
- [ ] Skill synonym recognition
- [ ] Better file validation and security
- [ ] Dependency modernization
- [ ] Production deployment
- [ ] Multiple resume comparisons
- [ ] Resume history and improvement tracking
- [ ] AI-assisted resume recommendations
- [ ] RAG-powered resume analysis

## Engineering Skills Demonstrated

- Python backend engineering
- REST API design
- Natural Language Processing
- Transformer embeddings
- Semantic similarity
- Algorithm development
- PDF data extraction
- Frontend/backend integration
- Automated testing
- Test coverage analysis
- Docker containerization
- Continuous integration
- Technical documentation

## Author

**Hrideta Rimu**

Artificial Intelligence student interested in machine learning, NLP, LLM applications, and full-stack AI engineering.

GitHub: https://github.com/hridetarimu

## License

No explicit open-source license is currently verified for this repository. 