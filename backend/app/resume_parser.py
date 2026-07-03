from PyPDF2 import PdfReader


def extract_text_from_pdf(file):
    reader = PdfReader(file)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text

def clean_job_description(text: str) -> str:
    cleaned_text = text.strip()
    cleaned_text = " ".join(cleaned_text.split())
    return cleaned_text