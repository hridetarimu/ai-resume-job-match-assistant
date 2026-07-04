def compare_skills(resume_skills, job_skills):
    resume_set = set(resume_skills)
    job_set = set(job_skills)

    matched_skills = sorted(list(resume_set & job_set))
    missing_skills = sorted(list(job_set - resume_set))

    if len(job_set) == 0:
        match_percentage = 0
    else:
        match_percentage = round(len(matched_skills) / len(job_set) * 100, 2)

    return {
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills
    }
