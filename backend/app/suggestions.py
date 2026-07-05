def generate_suggestions(missing_skills):
    suggestions = []

    for skill in missing_skills:
        suggestions.append(f"Consider adding or improving your experience with {skill}.")

    if not suggestions:
        suggestions.append("Great match! Your resume covers the main skills from this job description.")

    return suggestions