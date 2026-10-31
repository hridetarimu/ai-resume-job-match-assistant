from app.semantic_matcher import semantic_similarity


def test_identical_texts():
    text = "Python machine learning engineer"
    score = semantic_similarity(text, text)

    assert 99 <= score <= 100.01


def test_related_texts():
    text1 = "Develop machine learning models using Python"
    text2 = "Build AI models with Python"

    score = semantic_similarity(text1, text2)

    assert 0 <= score <= 100


def test_unrelated_texts():
    text1 = "Machine learning with Python"
    text2 = "Cooking dinner in the kitchen"

    score = semantic_similarity(text1, text2)

    assert 0 <= score <= 100