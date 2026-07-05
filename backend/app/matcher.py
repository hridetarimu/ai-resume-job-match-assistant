from app.resume_parser import extract_text_from_pdf
from app.job_parser import clean_job_description
from app.skills import extract_skills
from app.matching import compare_skills
from app.suggestions import generate_suggestions
from app.semantic_matcher import semantic_similarity


def match_resume_to_job(file, job_text):
    resume_text = extract_text_from_pdf(file)
    resume_skills = extract_skills(resume_text)

    cleaned_job = clean_job_description(job_text)
    job_skills = extract_skills(cleaned_job)

    result = compare_skills(resume_skills, job_skills)

    skill_score = result["match_percentage"]
    semantic_score = float(semantic_similarity(resume_text, cleaned_job))

    overall_score = float(round((skill_score + semantic_score) / 2, 2))

    suggestions = generate_suggestions(result["missing_skills"])

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        "skill_match": skill_score,
        "semantic_match": semantic_score,
        "overall_score": overall_score,
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "suggestions": suggestions
    }