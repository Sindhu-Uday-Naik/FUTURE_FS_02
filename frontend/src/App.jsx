// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./contexts/CartContext";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";

// export default function App() {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [categories, setCategories] = useState(["All"]);

//   // fetch categories from backend
//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/products");
//         const data = await res.json();
//         const cats = Array.from(new Set(data.map((p) => p.category))).filter(Boolean);
//         setCategories(["All", ...cats]);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   return (
//     <CartProvider>
//       <BrowserRouter>
//         <div className="min-h-screen bg-gray-100">
//           <Navbar search={search} setSearch={setSearch} />
//           <div className="mx-auto max-w-7xl px-4">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <div className="flex gap-6 py-6">
//                     <Sidebar
//                       categories={categories}
//                       active={category}
//                       onSelect={setCategory}
//                     />
//                     <Home search={search} category={category} />
//                   </div>
//                 }
//               />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/order-confirmation" element={<OrderConfirmation />} />
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </CartProvider>
//   );
// }


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./contexts/CartContext";
// import { AuthProvider } from "./contexts/AuthContext";

// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

// import Home from "./pages/Home";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import OrderConfirmation from "./pages/OrderConfirmation";
// import Orders from "./pages/Orders";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Admin from "./pages/Admin";

// export default function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <div className="flex min-h-screen bg-gray-100">
//             <Sidebar />
//             <div className="flex-1 flex flex-col">
//               <Navbar />
//               <main className="p-6">
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/product/:id" element={<ProductDetail />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/checkout" element={<Checkout />} />
//                   <Route path="/order-confirmation" element={<OrderConfirmation />} />
//                   <Route path="/orders" element={<Orders />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
//                   <Route path="/admin" element={<Admin />} />
//                 </Routes>
//               </main>
//             </div>
//           </div>
//         </BrowserRouter>
//       </CartProvider>
//     </AuthProvider>
//   );
// }


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}
