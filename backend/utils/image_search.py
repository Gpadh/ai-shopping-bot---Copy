import json
import io
import requests
from PIL import Image
from pathlib import Path

import torch
import torchvision.transforms as transforms
from torchvision.models import resnet18

PRODUCTS_PATH = Path("data/mock_products.json")

# Load model + transform
model = resnet18(pretrained=True)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])

def extract_features_from_bytes(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        features = model(tensor).squeeze()  # Features from ResNet model
    # print("Extracted Features:", features)  # Debug: Print the features
    return features

def fetch_image_from_url(url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    img_bytes = response.content
    img = Image.open(io.BytesIO(img_bytes))
    return img_bytes

def search_by_image(query_image_bytes):
    query_feat = extract_features_from_bytes(query_image_bytes)

    with open(PRODUCTS_PATH) as f:
        products = json.load(f)

    matches = []

    for product in products:
        url = product.get("image_url")
        if not url:
            continue
        try:
            img_bytes = fetch_image_from_url(url)
            prod_feat = extract_features_from_bytes(img_bytes)
            similarity = torch.nn.functional.cosine_similarity(
                query_feat.unsqueeze(0), prod_feat.unsqueeze(0)
            ).item()

            #print(f"Similarity: {similarity}")  # Debug: Print similarity values

            # Only include matches with similarity >= 0.5
            if similarity >= 0.5:
                matches.append((1 - similarity, product))
        except Exception as e:
            print(f"Failed to process image at {url}: {e}")

    # Sort matches by similarity and return the best match
    matches.sort(key=lambda x: x[0])
    return [matches[0][1]] if matches else []

