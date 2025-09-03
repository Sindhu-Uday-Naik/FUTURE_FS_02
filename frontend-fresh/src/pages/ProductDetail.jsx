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


// // src/pages/ProductDetail.jsx
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// // import fallbackProducts from "../data/products";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const { dispatch } = useCart();

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: "no-store" });
//         if (!res.ok) throw new Error("backend error");
//         const p = await res.json();
//         if (mounted) setProduct(p);
//       } catch {
//         // fallback: merge local + admin items, then find
//         const extras = JSON.parse(localStorage.getItem("products_v1") || "[]");
//         const merged = [...fallbackProducts, ...extras];
//         if (mounted) setProduct(merged.find(x => String(x.id) === String(id)));
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, [id]);

//   if (!product) return <div className="p-6">Loading…</div>;

//   return (
//     <div className="grid gap-8 p-6 md:grid-cols-2">
//       <img src={product.image} alt={product.title} className="rounded bg-white p-4 shadow object-cover w-full" />
//       <div className="rounded bg-white p-6 shadow">
//         <h1 className="text-2xl font-bold">{product.title}</h1>
//         <p className="mt-1 text-sm text-gray-500 capitalize">{product.category || product.silhouette || ""}</p>
//         <div className="mt-4 text-3xl font-semibold">₹{Number(product.price).toLocaleString()}</div>
//         <p className="mt-4 text-gray-700">{product.description}</p>
//         <button
//           onClick={() => dispatch({ type: "ADD", item: product })}
//           className="mt-6 rounded-md bg-amber-400 px-4 py-2 font-medium text-gray-900 hover:bg-amber-300"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }





// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useCart } from "../contexts/CartContext";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { dispatch } = useCart();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then(res => res.json())
//       .then(data => setProduct(data))
//       .catch(err => console.error(err));
//   }, [id]);

//   if (!product) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <img
//         src={`http://localhost:5000${product.image}`}
//         alt={product.title}
//         className="w-full h-96 object-cover rounded-xl"
//       />
//       <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
//       <p className="text-gray-600 mt-2">{product.description}</p>
//       <p className="text-lg font-semibold mt-4">₹{product.price}</p>
//       <button
//         onClick={() => dispatch({ type: "ADD", item: product })}
//         className="mt-6 px-6 py-2 bg-black text-white rounded-lg"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { dispatch } = useCart();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then(res => res.json())
//       .then(data => setProduct(data))
//       .catch(err => console.error("Error fetching product:", err));
//   }, [id]);

//   if (!product) return <p className="p-6">Loading product...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-8">
//       <div>
//         <img
//           src={`http://localhost:5000${product.image}`}
//           alt={product.title}
//           className="w-48 h-auto mx-auto rounded-lg shadow-md"
//         />
//       </div>
//       <div>
//         <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
//         <p className="text-gray-600 mb-4">{product.description}</p>
//         <p className="text-lg font-semibold mb-4">₹{product.price}</p>

//         <button
//           onClick={() => dispatch({ type: "ADD", item: product })}
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Add to Cart 🛒
//         </button>
//       </div>
//     </div>
//   );
// }




// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useEffect, useState } from "react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!product) return <p className="text-center text-white">Loading...</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
//       <div className="max-w-md text-center">
//         <img
//           src={`http://localhost:5000${product.image}`}
//           alt={product.title}
//           className="mx-auto rounded-lg shadow-lg"
//   style={{ width: "500px", height: "500px", objectFit: "contain" }}
//         />
//         <h2 className="text-3xl font-bold mt-6">{product.title}</h2>
//         <p className="text-xl mt-2">₹{product.price}</p>
//         <p className="mt-4 text-gray-300 justify">Product Description: {product.description}</p>
//         <p className="mt-4 text-gray-300">Silhouette: {product.silhouette}</p>
//         <p className="mt-4 text-gray-300">Fabric: {product.fabric}</p>
//         <p className="mt-4 text-gray-300">Other Details: {product.details}</p>
//         <p className="mt-4 text-gray-300">Brand Name: {product.brand}</p>
//         <button
//           onClick={() => {
//            console.log("Add to Cart clicked:", product); // ✅ check button press
//            dispatch({ type: "ADD", item: product, qty: 1 });
//          }}
//          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Add to Cart 🛒
//         </button>
//       </div>
//     </div>
//   );
// }





// import { useParams } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useEffect, useState } from "react";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const { dispatch } = useCart();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`${API}/api/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched product:", data); // ✅ log product from backend
//         setProduct(data);
//       })
//       .catch((err) => console.error("Error fetching product:", err));
//   }, [id]);

//   if (!product) return <p className="text-white">Loading...</p>;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-white">
//       <div className="max-w-md text-center"></div>
//         <img
//           src={`http://localhost:5000${product.image}`}
//           alt={product.title}
//           className="mx-auto rounded-lg shadow-lg"
//   style={{ width: "500px", height: "500px", objectFit: "contain" }}
//         />
//         <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//         <p className="mb-4 text-xl">₹{product.price}</p>
//         <p className="mt-4 text-gray-300 justify">Product Description: {product.description}</p>
//         <p className="mt-4 text-gray-300">Silhouette: {product.silhouette}</p>
//         <p className="mt-4 text-gray-300">Fabric: {product.fabric}</p>
//         <p className="mt-4 text-gray-300">Other Details: {product.details}</p>
//         <p className="mt-4 text-gray-300">Brand Name: {product.brand}</p>

//         <button
//           onClick={() => {
//             console.log("Add to Cart clicked:", product); // ✅ check button press
//             dispatch({ type: "ADD", item: product, qty: 1 });
//           }}
//           className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Add to Cart
//         </button>
//       <div/>
//     </div>
//   );
// }






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
