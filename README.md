# AI Shopping Bot Overview

## Working app URL: https://ai-shopping-bot-copy.vercel.app/

## Backend (Python, FastAPI)
The backend of this project was created using FastAPI for building a RESTFUL API. FastAPI was selected because of its dev friendly documentation and my familiarity with it.

## Frontend (React, CSS, Axios)
The frontend of this project was created with React and CSS to allow for easy state management and custom styling, respectively. Axios was used to handle HTTP requests due to its simplicity.

## Key Features:
__General Conversation:__ You can ask the AI shopping related questions for any general questions. This is powered by an OpenAI endpoint using a gpt-3.5-turbo model.  

__Text Recommendation:__ You can ask the AI a general prompt such as "I would like a t-shirt," and it will return to you a sample product along with its image.
This is powered by custom keyword logic to extract when keywords are said. These keywords map to a product description in the mocked products. Ideally a library like scikit-learn should be used for NLP, however, it kept crashing
the app so custom logic was created.

__Image Search:__ By uploading a .jpg image the AI can check whether a similar product exists in the mock-products. If this item exists it will be shown to you along with an image of it. This was done using PyTorch to 
decompose images into feature vectors and compare their similarities. Currently a 50% likeness threshold is being utilized; this was found through testing to produce the best results.

__Mock Products:__ JSON was used as a lightweight solution to represent product metadata and image paths without the need for a database during prototyping.

