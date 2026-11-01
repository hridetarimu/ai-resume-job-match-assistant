
import pytest
from unittest.mock import MagicMock, patch

from app.resume_parser import (
    extract_text_from_pdf,
    clean_job_description,
)


def test_extract_text_from_single_page():
    mock_page = MagicMock()
    mock_page.extract_text.return_value = "Python FastAPI SQL"

    mock_reader = MagicMock()
    mock_reader.pages = [mock_page]

    with patch("app.resume_parser.PdfReader", return_value=mock_reader):
        result = extract_text_from_pdf("sample.pdf")

    assert result == "Python FastAPI SQL\n"


def test_extract_text_from_multiple_pages():
    page1 = MagicMock()
    page1.extract_text.return_value = "Python Developer"

    page2 = MagicMock()
    page2.extract_text.return_value = "AWS Docker"

    mock_reader = MagicMock()
    mock_reader.pages = [page1, page2]

    with patch("app.resume_parser.PdfReader", return_value=mock_reader):
        result = extract_text_from_pdf("sample.pdf")

    assert result == "Python Developer\nAWS Docker\n"


def test_extract_text_from_empty_pdf():
    mock_reader = MagicMock()
    mock_reader.pages = []

    with patch("app.resume_parser.PdfReader", return_value=mock_reader):
        result = extract_text_from_pdf("empty.pdf")

    assert result == ""


def test_extract_text_from_page_without_text():
    mock_page = MagicMock()
    mock_page.extract_text.return_value = None

    mock_reader = MagicMock()
    mock_reader.pages = [mock_page]

    with patch("app.resume_parser.PdfReader", return_value=mock_reader):
        result = extract_text_from_pdf("scanned.pdf")

    assert result == ""


def test_extract_text_from_invalid_pdf():
    with patch(
        "app.resume_parser.PdfReader",
        side_effect=ValueError("Invalid PDF"),
    ):
        with pytest.raises(ValueError, match="Invalid PDF"):
            extract_text_from_pdf("invalid.pdf")


def test_clean_job_description():
    text = "  Python   FastAPI\n\n SQL  "

    result = clean_job_description(text)

    assert result == "Python FastAPI SQL"


def test_clean_empty_job_description():
    assert clean_job_description("") == ""
