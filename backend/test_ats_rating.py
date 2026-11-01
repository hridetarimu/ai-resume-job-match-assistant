
import pytest

from app.ats_rating import get_ats_rating


@pytest.mark.parametrize(
    "score, expected_rating",
    [
        (100, "Excellent"),
        (90, "Excellent"),
        (85, "Excellent"),
        (84.99, "Good"),
        (80, "Good"),
        (70, "Good"),
        (69.99, "Fair"),
        (60, "Fair"),
        (50, "Fair"),
        (49.99, "Needs Improvement"),
        (25, "Needs Improvement"),
        (0, "Needs Improvement"),
    ],
)
def test_ats_rating_categories(score, expected_rating):
    result = get_ats_rating(score)

    assert result["rating"] == expected_rating


@pytest.mark.parametrize(
    "score",
    [0, 25, 50, 70, 85, 100],
)
def test_ats_rating_returns_message(score):
    result = get_ats_rating(score)

    assert isinstance(result["message"], str)
    assert len(result["message"]) > 0


def test_ats_rating_returns_expected_keys():
    result = get_ats_rating(75)

    assert set(result.keys()) == {"rating", "message"}
