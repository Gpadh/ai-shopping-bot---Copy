import { useState } from "react";
import axios from "axios";

function ImageSearch() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setProduct(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/image-search",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log the entire response to ensure the structure
      console.log("Response from server:", response.data);

      // Access the product from the response
      const product = response.data.product?.[0];

      if (product) {
        // Set the product if it exists
        setProduct(product);
      } else {
        setError("No matching product found.");
      }
    } catch (err) {
      setError("Error searching by image.");
      console.error(err);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Image-Based Product Search</h2>
      <div className="flex items-center gap-2 mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {product && (
        <div className="border p-4 rounded shadow max-w-sm">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
        </div>
      )}
    </div>
  );
}

export default ImageSearch;
