from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_parse_job_endpoint():
    job_description = (
        "We are hiring an AI Engineer with "
        "Python, FastAPI, and Machine Learning experience."
    )

    response = client.post(
        "/parse-job",
        json={"text": job_description}
    )

    assert response.status_code == 200
    assert isinstance(response.json(), dict)