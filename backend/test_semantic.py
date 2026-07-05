from app.semantic_matcher import semantic_similarity

resume = """
Built REST APIs using FastAPI and Python.
Experience with Machine Learning and SQL.
"""

job = """
Looking for a Python backend engineer with FastAPI,
Machine Learning, and SQL experience.
"""

score = semantic_similarity(resume, job)

print(score)