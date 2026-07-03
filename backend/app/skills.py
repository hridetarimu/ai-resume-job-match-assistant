SKILLS = [
    "Python",
    "FastAPI",
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "NLP",
    "SQL",
    "Docker",
    "Git",
    "GitHub",
    "TensorFlow",
    "PyTorch",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Java",
    "C++",
    "AWS",
    "Azure",
    "Linux",
]


def extract_skills(text: str):
    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:
        if skill.lower() in text_lower:
            found_skills.append(skill)

    return sorted(found_skills)