def clean_job_description(text: str) -> str:
    """
    Remove extra spaces and line breaks.
    """
    cleaned_text = text.strip()
    cleaned_text = " ".join(cleaned_text.split())
    return cleaned_text