from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models.product_model import Product
from utils.openai_agent import chat_with_agent
from utils.recommender import recommend_products
from utils.image_search import search_by_image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "AI commerce backend is running"}

@app.post("/chat")
def chat(input: dict):
    user_msg = input.get("message")
    reply = chat_with_agent(user_msg)
    return {"response": reply}

@app.post("/recommend")
def recommend(input: dict):
    query = input.get("query")
    results = recommend_products(query)
    return {"products": results}

@app.post("/image-search")
async def image_search(image: UploadFile = File(...)):
    if not image.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Invalid image format")

    image_bytes = await image.read()
    try:
        best_match = search_by_image(image_bytes)
        if best_match:
            return JSONResponse(content={"product": best_match})
        else:
            return JSONResponse(content={"error": "No similar product found."}, status_code=404)
    except Exception as e:
        print("Error details:", str(e))  # Log the error
        return JSONResponse(content={"error": str(e)}, status_code=422)