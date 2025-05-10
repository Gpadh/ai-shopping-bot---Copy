# AI Shopping Bot Overview

## Working app URL: https://ai-shopping-bot-copy.vercel.app/

## Backend (Python, FastAPI)
The backend of this project was created using FastAPI for building a RESTFUL API. FastAPI was selected because of its dev friendly documentation and consistent performance.

## Frontend (React, JS, Axios)
The frontend of this project was created with React to allow for easy state management and custom styling and Axios was used to handle HTTP requests due to its simplicity.

## Key Features:
__General Conversation:__ You can ask the agent shopping related questions for any general questions. This is powered by an OpenAI endpoint using a gpt-3.5-turbo model.  

__Text Recommendation:__ You can ask the agent a general prompt such as "I would like a t-shirt," and it will return to you a sample product along with its image.
This is powered by custom keyword logic to extract when keywords are entered by the user. These keywords map to a product description in the mocked products. Ideally a library like scikit-learn should be used for NLP, however, it kept crashing the app so custom logic was created.

__Image Search:__ By uploading a .jpg image the agent can check whether a similar product exists in the mock-products. If this item exists it will be shown to you along with an image of it. This was done using PyTorch to  decompose images into feature vectors and compare their similarities. Currently a 50% likeness threshold is being utilized; this was found through testing to produce the best results.

__Mock Products:__ JSON was used as a lightweight solution to represent product metadata and image paths without the need for a database during prototyping. The mock products currently in the database are a t-shirt, a pair of shoes, and a handbag.

## Deployment
The frontend of this app was hosted on Vercel. The backend of this app was hosted on Render. Please note that the Render webservice is a bit finicky and goes inactive at times and I've taken measures to prevent this (UptimeRobot constantly pinging the service every 5 minutes) so please be patient during testing.
