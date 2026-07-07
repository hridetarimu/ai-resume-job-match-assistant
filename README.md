# 🤖 AI Resume Job Match Assistant

> An AI-powered ATS Resume Analyzer built with **FastAPI**, **Sentence Transformers**, and **Machine Learning** that compares resumes with job descriptions using keyword matching and semantic similarity.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Framework-green)
![Machine Learning](https://img.shields.io/badge/Machine-Learning-orange)
![Sentence Transformers](https://img.shields.io/badge/NLP-SentenceTransformers-red)
![Chart.js](https://img.shields.io/badge/Frontend-Chart.js-yellow)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

---

# 📸 Application Preview

## Upload Resume

![Upload Screen](images/upload-screen.png)

## ATS Analysis Dashboard

![Dashboard](images/dashboard.png)

---

# 🚀 Overview

The AI Resume Job Match Assistant helps job seekers evaluate how well their resume matches a job description.

The application analyzes resumes using two different approaches:

- 🎯 Keyword-Based ATS Matching
- 🧠 Semantic Similarity using Sentence Transformers

It then combines both scores into an overall ATS score and provides actionable recommendations for improving the resume.

---

# ✨ Features

| Feature | Status |
|----------|--------|
| PDF Resume Parsing | ✅ |
| Job Description Parsing | ✅ |
| Skill Extraction | ✅ |
| Keyword Matching | ✅ |
| Semantic Similarity | ✅ |
| Weighted ATS Score | ✅ |
| Interactive Dashboard | ✅ |
| Progress Bars | ✅ |
| Circular Score Gauge | ✅ |
| Personalized Suggestions | ✅ |
| REST API | ✅ |
| Swagger Documentation | ✅ |

---

# 🏗️ System Architecture

```text
                  Resume PDF
                       │
                       ▼
             Resume Parser
                       │
                       ▼
              Extract Skills
                       │
                       │
Job Description ───────┤
                       │
                       ▼
             Extract Job Skills
                       │
                       ▼
             Keyword Matching
                       │
                       ▼
          Semantic Similarity
                       │
                       ▼
          Weighted ATS Score
                       │
                       ▼
       AI Resume Suggestions
                       │
                       ▼
      Interactive Dashboard
```

---

# ⚙️ Tech Stack

| Layer | Technology |
|---------|------------|
| Language | Python |
| Backend | FastAPI |
| API Server | Uvicorn |
| Validation | Pydantic |
| NLP | Sentence Transformers |
| Machine Learning | PyTorch |
| PDF Parsing | PyPDF2 |
| Frontend | HTML5 |
| Styling | CSS3 |
| Client | JavaScript |
| Charts | Chart.js |
| Version Control | Git |
| Repository | GitHub |

---

# 📂 Project Structure

```text
ai-resume-job-match-assistant/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── matcher.py
│   │   ├── matching.py
│   │   ├── semantic_matcher.py
│   │   ├── suggestions.py
│   │   ├── resume_parser.py
│   │   ├── job_parser.py
│   │   └── skills.py
│   │
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data/
├── notebooks/
├── tests/
├── images/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🔄 Application Workflow

```text
User
 │
 ▼
Upload Resume PDF
 │
 ▼
Extract Resume Text
 │
 ▼
Extract Resume Skills
 │
 ▼
Paste Job Description
 │
 ▼
Clean Job Description
 │
 ▼
Extract Job Skills
 │
 ▼
Keyword Matching
 │
 ▼
Semantic Similarity
 │
 ▼
Weighted ATS Score
 │
 ▼
Generate Suggestions
 │
 ▼
Interactive Dashboard
```

---

# 📊 ATS Scoring

The overall ATS score is calculated using:

```
Overall Score =
(Skill Match + Semantic Match) / 2
```

Example:

```
Skill Match       55.56%

Semantic Match    53.28%

Overall Match     54.42%
```

---

# 🧠 Semantic Matching

The application uses the following transformer model:

```
all-MiniLM-L6-v2
```

This allows the system to compare the meaning of the resume and job description rather than relying only on exact keyword matches.

---

# 📡 REST API

| Endpoint | Method | Description |
|------------|--------|-------------|
| / | GET | Home |
| /health | GET | Health Check |
| /upload-resume | POST | Upload Resume |
| /parse-job | POST | Parse Job Description |
| /match | POST | Analyze Resume |

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

# 💻 Installation

Clone the repository

```bash
git clone https://github.com/hridetarimu/ai-resume-job-match-assistant.git
```

Navigate into the project

```bash
cd ai-resume-job-match-assistant
```

Create a virtual environment

```bash
python -m venv venv
```

Activate it

Mac/Linux

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r backend/requirements.txt
```

---

# ▶️ Run the Backend

```bash
cd backend

uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger API

```
http://127.0.0.1:8000/docs
```

---

# 🌐 Run the Frontend

Open

```
frontend/index.html
```

or use VS Code Live Server.

---

# 📈 Example Output

```
Overall Match

54.42%

Skill Match

55.56%

Semantic Match

53.28%

Matched Skills

✓ Python

✓ SQL

✓ Git

✓ TensorFlow

Missing Skills

✗ AWS

✗ FastAPI

✗ Machine Learning

Suggestions

• Add AWS cloud experience

• Include REST API projects built with FastAPI

• Highlight Machine Learning projects
```

---

# 💼 Skills Demonstrated

- Python
- FastAPI
- REST API Development
- Machine Learning
- Natural Language Processing
- Semantic Search
- Sentence Transformers
- PyTorch
- HTML
- CSS
- JavaScript
- Chart.js
- Software Architecture
- Git
- GitHub

---

# 🎯 Why I Built This

As an Artificial Intelligence student, I wanted to build a practical project that combines Natural Language Processing, Machine Learning, and Full-Stack Development into a real-world application.

Instead of creating another CRUD application, I designed an AI-powered ATS Resume Analyzer that demonstrates:

- AI Engineering
- NLP
- Semantic Search
- Backend API Development
- Frontend Development
- Software Architecture
- Machine Learning

This project reflects the types of AI systems used in modern recruiting platforms and provides practical experience building production-style applications.

---

# 🛣️ Roadmap

## ✅ Completed

- Resume Parsing
- Job Description Parsing
- Skill Extraction
- Keyword Matching
- Semantic Similarity
- ATS Score
- Suggestions Generator
- Interactive Dashboard
- Progress Bars
- Circular Score Gauge

## 🚧 Coming Soon

- 🌙 Dark Mode
- 📄 Download ATS Report (PDF)
- 🤖 AI Resume Rewriter
- ✍️ Cover Letter Generator
- 🎤 Interview Question Generator
- 📊 Resume Version Comparison
- 🐳 Docker Deployment
- ☁️ AWS Deployment
- 🔑 User Authentication
- 🗄️ PostgreSQL Integration
- 🤖 OpenAI GPT Integration
- 🔎 RAG-powered Resume Analysis

---

# 📸 Future Enhancements

- Multiple Resume Comparison
- Resume History
- Resume Improvement Tracking
- Recruiter Dashboard
- Cloud Deployment
- CI/CD Pipeline
- GitHub Actions

---

# 👩‍💻 Author

**Hrideta Rimu**

Artificial Intelligence Student

Interested in:

- Artificial Intelligence
- Machine Learning
- NLP
- FastAPI
- LLM Applications
- AI Product Development
- Full-Stack AI Systems

---

# 📜 License

This project is licensed under the MIT License.