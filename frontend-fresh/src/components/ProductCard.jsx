
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden p-4 flex flex-col items-center justify-between border border-gray-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`}
          alt={product.title}
          className="object-contain w-full h-48 object-cover rounded-md"
          style={{ width: "200px", height: "400px", objectFit: "cover" }}
        />
        <h2 className="mt-2 text-white text-center text-lg font-semibold truncate break-words line-clamp-2">
          {product.title}
        </h2>
        <p className="text-white-700 text-center font-bold text-base">
          ₹{product.price}
        </p>
      </Link>
    </div>
  );
}
