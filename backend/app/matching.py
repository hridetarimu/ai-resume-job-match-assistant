from app.skill_weights import SKILL_WEIGHTS


def compare_skills(resume_skills, job_skills):
    resume_set = set(resume_skills)
    job_set = set(job_skills)

    matched_skills = sorted(list(resume_set & job_set))
    missing_skills = sorted(list(job_set - resume_set))

    total_weight = sum(SKILL_WEIGHTS.get(skill, 1) for skill in job_set)
    matched_weight = sum(SKILL_WEIGHTS.get(skill, 1) for skill in matched_skills)

    if total_weight == 0:
        match_percentage = 0
    else:
        match_percentage = round((matched_weight / total_weight) * 100, 2)

    return {
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "matched_weight": matched_weight,
        "total_weight": total_weight
    }