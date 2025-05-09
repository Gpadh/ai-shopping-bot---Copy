function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {products.map((product, idx) => (
        <div
          key={idx}
          className="p-4 border rounded bg-white shadow hover:shadow-md transition"
        >
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-700">{product.description}</p>
          <p className="text-blue-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
