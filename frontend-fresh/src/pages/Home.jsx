
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">

  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</div>

  );
}
