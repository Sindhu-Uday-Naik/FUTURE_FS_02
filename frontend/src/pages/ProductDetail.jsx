// // src/pages/ProductDetail.jsx
// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchProduct } from '../api';
// import { CartContext } from '../contexts/CartContext';

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { addToCart } = useContext(CartContext);
//   const [qty, setQty] = useState(1);

//   useEffect(() => {
//     fetchProduct(id).then(setProduct).catch(console.error);
//   }, [id]);

//   if (!product) return <div className="p-6">Loading...</div>;

//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded shadow">
//         <img src={product.image} alt={product.title} className="w-full md:w-1/2 object-cover rounded" />
//         <div>
//           <h1 className="text-2xl font-semibold">{product.title}</h1>
//           <p className="mt-2 text-gray-600">{product.description}</p>
//           <div className="mt-4 text-xl font-bold">₹{product.price}</div>

//           <div className="mt-4 flex items-center gap-3">
//             <input type="number" min="1" value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)))} className="w-20 p-2 border rounded"/>
//             <button onClick={()=>addToCart(product, qty)} className="bg-indigo-600 text-white px-4 py-2 rounded">Add to Cart</button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }


// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import fallbackProducts from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("backend error");
        const p = await res.json();
        if (mounted) setProduct(p);
      } catch {
        // fallback: merge local + admin items, then find
        const extras = JSON.parse(localStorage.getItem("products_v1") || "[]");
        const merged = [...fallbackProducts, ...extras];
        if (mounted) setProduct(merged.find(x => String(x.id) === String(id)));
      }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  if (!product) return <div className="p-6">Loading…</div>;

  return (
    <div className="grid gap-8 p-6 md:grid-cols-2">
      <img src={product.image} alt={product.title} className="rounded bg-white p-4 shadow object-cover w-full" />
      <div className="rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-1 text-sm text-gray-500 capitalize">{product.category || product.silhouette || ""}</p>
        <div className="mt-4 text-3xl font-semibold">₹{Number(product.price).toLocaleString()}</div>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <button
          onClick={() => dispatch({ type: "ADD", item: product })}
          className="mt-6 rounded-md bg-amber-400 px-4 py-2 font-medium text-gray-900 hover:bg-amber-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
