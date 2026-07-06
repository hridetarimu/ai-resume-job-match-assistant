def get_ats_rating(score):
    if score >= 85:
        return {
            "rating": "Excellent",
            "message": "Your resume is strongly aligned with this job description."
        }
    elif score >= 70:
        return {
            "rating": "Good",
            "message": "Your resume matches many key requirements, but there is room to improve."
        }
    elif score >= 50:
        return {
            "rating": "Fair",
            "message": "Your resume has some relevant skills, but several important skills are missing."
        }
    else:
        return {
            "rating": "Needs Improvement",
            "message": "Your resume needs stronger alignment with this job description."
        }