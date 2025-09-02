// import products from "../data/products"; // relative path from pages to data
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";

// export default function Home({ search, category }) {
//   const [products, setProducts] = useState([]);
//   const { dispatch } = useCart();

//   useEffect(() => {
//     (async () => {
//       const res = await fetch("http://localhost:5000/api/products");
//       const data = await res.json();
//       setProducts(data);
//     })();
//   }, []);

//   const filtered = useMemo(() => {
//     return products.filter(p => {
//       const byCat = category === "All" || p.category === category;
//       const bySearch =
//         !search ||
//         p.title?.toLowerCase().includes(search.toLowerCase()) ||
//         p.description?.toLowerCase().includes(search.toLowerCase());
//       return byCat && bySearch;
//     });
//   }, [products, category, search]);

//   return (
//     <section className="flex-1">
//       <div className="mb-3 text-sm text-gray-600">
//         Showing <b>{filtered.length}</b> results{category !== "All" ? ` in ${category}` : ""}.
//       </div>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filtered.map(p => (
//           <article key={p.id} className="rounded-lg bg-white p-4 shadow transition hover:shadow-md">
//             <Link to={`/product/${p.id}`} className="block">
//               <img
//                 src={p.image}
//                 alt={p.title}
//                 className="mx-auto aspect-square w-full rounded object-cover"
//               />
//               <h3 className="mt-3 line-clamp-2 text-lg font-semibold">{p.title}</h3>
//             </Link>
//             <p className="mt-1 text-sm text-gray-500 capitalize">{p.category}</p>
//             <div className="mt-2 flex items-center justify-between">
//               <div className="text-xl font-bold">₹{Number(p.price).toFixed(2)}</div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => dispatch({ type: "ADD", item: p })}
//                   className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-amber-300"
//                 >
//                   Add to Cart
//                 </button>
//                 <Link
//                   to={`/product/${p.id}`}
//                   className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }


// src/pages/Home.jsx
// import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import fallbackProducts from "../data/products"; // local fallback

// export default function Home({ search = "", category = "All" }) {
//   const [products, setProducts] = useState([]);
//   const { dispatch } = useCart();

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const res = await fetch("http://localhost:5000/api/products", { cache: "no-store" });
//         if (!res.ok) throw new Error("backend unreachable");
//         const data = await res.json();
//         const extras = JSON.parse(localStorage.getItem("products_v1") || "[]");
//         if (mounted) setProducts([...data, ...extras]);
//       } catch {
//         const extras = JSON.parse(localStorage.getItem("products_v1") || "[]");
//         if (mounted) setProducts([...fallbackProducts, ...extras]);
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, []);

//   const filtered = useMemo(() => {
//     const q = (search || "").trim().toLowerCase();
//     return products.filter(p => {
//       const byCat = category === "All" || !category || p.category === category;
//       const bySearch = !q || p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
//       return byCat && bySearch;
//     });
//   }, [products, search, category]);

//   return (
//     <section className="flex-1">
//       <div className="mb-3 text-sm text-gray-600">
//         Showing <b>{filtered.length}</b> results{category && category !== "All" ? ` in ${category}` : ""}.
//       </div>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filtered.map(p => (
//           <article key={p.id} className="rounded-lg bg-white p-4 shadow transition hover:shadow-md">
//             <Link to={`/product/${p.id}`} className="block">
//               <img
//                 src={p.image}
//                 alt={p.title}
//                 className="mx-auto aspect-square w-full rounded object-cover"
//               />
//               <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
//             </Link>
//             <p className="mt-1 text-sm text-gray-500 capitalize">{p.category}</p>
//             <div className="mt-2 flex items-center justify-between">
//               <div className="text-xl font-bold">₹{Number(p.price).toLocaleString()}</div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => dispatch({ type: "ADD", item: p })}
//                   className="rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-amber-300"
//                 >
//                   Add to Cart
//                 </button>
//                 <Link to={`/product/${p.id}`} className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
//                   View
//                 </Link>
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }


// import React from "react";
// import Sidebar from "../components/Sidebar";
// import ProductCard from "../components/ProductCard";
// import products from "../data/products";

// function Home() {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <div className="w-1/5 p-4 border-r">
//         <Sidebar />
//       </div>

//       {/* Products Grid */}
//       <div className="w-4/5 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    // <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
    <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default Home;
