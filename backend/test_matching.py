from app.matching import compare_skills

resume = [
    "Python",
    "FastAPI",
    "Git",
    "SQL"
]

job = [
    "Python",
    "Docker",
    "Git",
    "AWS",
    "SQL"
]

result = compare_skills(resume, job)

print(result)
