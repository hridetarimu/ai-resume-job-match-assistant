from app.resume_parser import extract_text_from_pdf
from app.job_parser import clean_job_description
from app.skills import extract_skills
from app.matching import compare_skills
from app.suggestions import generate_suggestions


def match_resume_to_job(file, job_text):
    # Resume
    resume_text = extract_text_from_pdf(file)
    resume_skills = extract_skills(resume_text)

    # Job
    cleaned_job = clean_job_description(job_text)
    job_skills = extract_skills(cleaned_job)

    # Compare
    result = compare_skills(resume_skills, job_skills)
    suggestions = generate_suggestions(result["missing_skills"])

    return {
        "resume_skills": resume_skills,
        "job_skills": job_skills,
        **result,
        "suggestions": suggestions
    }
    