
from app.suggestions import generate_suggestions


def test_aws_suggestion():
    result = generate_suggestions(["AWS"])

    assert len(result) == 1
    assert "cloud experience" in result[0]


def test_docker_suggestion():
    result = generate_suggestions(["Docker"])

    assert len(result) == 1
    assert "Docker experience" in result[0]


def test_fastapi_suggestion():
    result = generate_suggestions(["FastAPI"])

    assert len(result) == 1
    assert "REST APIs" in result[0]


def test_machine_learning_suggestion():
    result = generate_suggestions(["Machine Learning"])

    assert len(result) == 1
    assert "ML projects" in result[0]


def test_unknown_skill_suggestion():
    result = generate_suggestions(["Kubernetes"])

    assert len(result) == 1
    assert "Kubernetes" in result[0]


def test_multiple_missing_skills():
    result = generate_suggestions(["AWS", "Docker", "FastAPI"])

    assert len(result) == 3
    assert "cloud experience" in result[0]
    assert "Docker experience" in result[1]
    assert "REST APIs" in result[2]


def test_no_missing_skills():
    result = generate_suggestions([])

    assert len(result) == 1
    assert "Great match!" in result[0]
