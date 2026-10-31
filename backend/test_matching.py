
import pytest

from app.matching import compare_skills
from app.skill_weights import SKILL_WEIGHTS


def test_matching_skills():
    # Skills extracted from the resume
    resume = [
        "Python",
        "FastAPI",
        "Git",
        "SQL"
    ]

    # Skills required by the job
    job = [
        "Python",
        "Docker",
        "Git",
        "AWS",
        "SQL"
    ]

    # Run the matching algorithm
    result = compare_skills(resume, job)

    # Test matched skills
    assert set(result["matched_skills"]) == {
        "Python",
        "Git",
        "SQL"
    }

    # Test missing skills
    assert set(result["missing_skills"]) == {
        "Docker",
        "AWS"
    }

    # Calculate expected weighted score
    matched = {"Python", "Git", "SQL"}
    required = {"Python", "Docker", "Git", "AWS", "SQL"}

    expected_matched_weight = sum(
        SKILL_WEIGHTS.get(skill, 1)
        for skill in matched
    )

    expected_total_weight = sum(
        SKILL_WEIGHTS.get(skill, 1)
        for skill in required
    )

    expected_score = round(
        (expected_matched_weight / expected_total_weight) * 100,
        2
    )

    # Verify weighted matching results
    assert result["matched_weight"] == expected_matched_weight
    assert result["total_weight"] == expected_total_weight
    assert result["match_percentage"] == expected_score


def test_no_matching_skills():
    resume = ["Java"]
    job = ["Python", "Docker"]

    result = compare_skills(resume, job)

    assert result["matched_skills"] == []
    assert set(result["missing_skills"]) == {"Python", "Docker"}
    assert result["match_percentage"] == 0


def test_all_skills_match():
    resume = ["Python", "Docker", "SQL"]
    job = ["Python", "Docker", "SQL"]

    result = compare_skills(resume, job)

    assert set(result["matched_skills"]) == set(job)
    assert result["missing_skills"] == []
    assert result["match_percentage"] == 100.0


def test_empty_job_skills():
    resume = ["Python", "SQL"]
    job = []

    result = compare_skills(resume, job)

    assert result["matched_skills"] == []
    assert result["missing_skills"] == []
    assert result["match_percentage"] == 0
    assert result["total_weight"] == 0
