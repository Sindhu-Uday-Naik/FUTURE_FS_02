
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";

// ✅ API constant from environment
const API = import.meta.env.VITE_API_URL;

export default function ProductDetail() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched product:", data); // ✅ log product from backend
        setProduct(data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="max-w-md text-center">
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`} // ✅ use API instead of hardcoded localhost
          alt={product.title}
          className="mx-auto rounded-lg shadow-lg"
          style={{ width: "500px", height: "500px", objectFit: "contain" }}
        />
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="mb-4 text-xl">₹{product.price}</p>
        <p className="mt-4 text-gray-300">Product Description: {product.description}</p>
        <p className="mt-4 text-gray-300">Silhouette: {product.silhouette}</p>
        <p className="mt-4 text-gray-300">Fabric: {product.fabric}</p>
        <p className="mt-4 text-gray-300">Other Details: {product.details}</p>
        <p className="mt-4 text-gray-300">Brand Name: {product.brand}</p>

        <button
          onClick={() => {
            console.log("Add to Cart clicked:", product);
            dispatch({ type: "ADD", item: product, qty: 1 });
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
