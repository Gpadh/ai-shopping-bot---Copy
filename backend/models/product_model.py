from pydantic import BaseModel

class Product(BaseModel):
    id: str
    title: str
    category: str
    price: float
    image_url: str
    description: str