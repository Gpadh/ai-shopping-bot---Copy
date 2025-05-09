import { useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";

function TextRecommender() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/recommend", {
        query,
      });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Recommendation error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">
        Text-Based Product Recommendation
      </h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  );
}

export default TextRecommender;
