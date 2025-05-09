import json
from pathlib import Path
import string
import re

PRODUCTS_PATH = Path("data/mock_products.json")

def preprocess(text):
    text = text.lower()
    text = text.replace('-', ' ')  # normalize hyphens to spaces
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r'\s+', ' ', text)  # normalize extra whitespace
    return set(text.split())

def recommend_products(query):
    with open(PRODUCTS_PATH) as f:
        products = json.load(f)

    query_words = preprocess(query)

    def score(product):
        text = product['title'] + ' ' + product['description']
        product_words = preprocess(text)
        overlap = len(query_words & product_words)
        return overlap

    scored = [(score(p), p) for p in products]
    scored = [pair for pair in scored if pair[0] > 0]
    scored.sort(reverse=True, key=lambda x: x[0])

    return [p for _, p in scored[:2]]  # Return top 2 results

