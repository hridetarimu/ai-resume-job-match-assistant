def generate_suggestions(missing_skills):
    suggestions = []

    for skill in missing_skills:
        if skill == "AWS":
            suggestions.append("Add any cloud experience, such as deploying applications or models on AWS.")
        elif skill == "Docker":
            suggestions.append("Mention Docker experience, such as containerizing FastAPI or ML applications.")
        elif skill == "FastAPI":
            suggestions.append("Add a bullet showing experience building REST APIs with FastAPI.")
        elif skill == "Machine Learning":
            suggestions.append("Highlight ML projects, models, datasets, or evaluation metrics.")
        else:
            suggestions.append(f"Consider adding relevant experience with {skill}.")

    if not suggestions:
        suggestions.append("Great match! Your resume covers the main skills from this job description.")

    return suggestions