
import pytest
from unittest.mock import patch

from app.matcher import match_resume_to_job


@pytest.fixture
def mock_dependencies():
    with (
        patch("app.matcher.extract_text_from_pdf") as pdf,
        patch("app.matcher.clean_job_description") as clean,
        patch("app.matcher.extract_skills") as skills,
        patch("app.matcher.compare_skills") as compare,
        patch("app.matcher.semantic_similarity") as semantic,
        patch("app.matcher.generate_suggestions") as suggestions,
    ):
        pdf.return_value = "Python FastAPI SQL"
        clean.return_value = "Python FastAPI Docker"

        skills.side_effect = [
            ["Python", "FastAPI", "SQL"],
            ["Python", "FastAPI", "Docker"],
        ]

        compare.return_value = {
            "match_percentage": 66.67,
            "matched_skills": ["Python", "FastAPI"],
            "missing_skills": ["Docker"],
        }

        semantic.return_value = 80.0
        suggestions.return_value = [
            "Mention Docker experience."
        ]

        yield {
            "pdf": pdf,
            "clean": clean,
            "skills": skills,
            "compare": compare,
            "semantic": semantic,
            "suggestions": suggestions,
        }


def test_overall_matching_score(mock_dependencies):
    result = match_resume_to_job(
        "fake_resume.pdf",
        "Python FastAPI Docker",
    )

    assert result["skill_match"] == 66.67
    assert result["semantic_match"] == 80.0
    assert result["overall_score"] == 73.34


def test_matched_and_missing_skills(mock_dependencies):
    result = match_resume_to_job(
        "fake_resume.pdf",
        "Python FastAPI Docker",
    )

    assert result["matched_skills"] == [
        "Python", "FastAPI"
    ]
    assert result["missing_skills"] == ["Docker"]


def test_suggestions_returned(mock_dependencies):
    result = match_resume_to_job(
        "fake_resume.pdf",
        "Python FastAPI Docker",
    )

    assert result["suggestions"] == [
        "Mention Docker experience."
    ]


def test_semantic_match_receives_correct_text(mock_dependencies):
    match_resume_to_job(
        "fake_resume.pdf",
        "Python FastAPI Docker",
    )

    mock_dependencies["semantic"].assert_called_once_with(
        "Python FastAPI SQL",
        "Python FastAPI Docker",
    )
