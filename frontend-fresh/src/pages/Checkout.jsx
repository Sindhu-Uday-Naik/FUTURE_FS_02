// // src/pages/Checkout.jsx
// import React, { useContext, useState } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import { createOrder } from '../api';
// import { useNavigate } from 'react-router-dom';

// export default function Checkout() {
//   const { cart, total, clearCart } = useContext(CartContext);
//   const [form, setForm] = useState({ name:'', email:'', address:'' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handlePlaceOrder = async () => {
//     if (!form.name || !form.email || !form.address) { alert('Please fill required fields'); return; }
//     setLoading(true);
//     const payload = {
//       items: cart.map(i=>({ productId: i.id, qty: i.qty, price: i.price, title: i.title })),
//       total,
//       ...form
//     };
//     try {
//       const res = await createOrder(payload);
//       clearCart();
//       navigate(`/order-confirmation?orderId=${res.id}`);
//     } catch (err) {
//       console.error(err);
//       alert('Order failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="max-w-3xl mx-auto p-6">
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Checkout</h2>
//         <div className="space-y-3">
//           <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Full name" className="w-full p-2 border rounded"/>
//           <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="Email" className="w-full p-2 border rounded"/>
//           <textarea value={form.address} onChange={e=>setForm({...form, address: e.target.value})} placeholder="Shipping address" className="w-full p-2 border rounded"/>
//         </div>
//         <div className="mt-4 flex justify-between items-center">
//           <div className="font-medium">Total: ₹{total.toFixed(2)}</div>
//           <button onClick={handlePlaceOrder} disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded">
//             {loading ? 'Placing...' : 'Place Order'}
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";

// export default function Checkout() {
//   const { cart, subtotal, dispatch } = useCart();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
//   const [touched, setTouched] = useState({});

//   const invalid = {
//     name: !form.name?.trim(),
//     email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || ""),
//     address: !form.address?.trim(),
//     city: !form.city?.trim(),
//     zip: !/^\d{5,6}$/.test(form.zip || ""),
//   };
//   const hasErrors = Object.values(invalid).some(Boolean);

//   const placeOrder = (e) => {
//     e.preventDefault();
//     if (hasErrors) return setTouched({ name: true, email: true, address: true, city: true, zip: true });

//     // simulate order save (localStorage order history)
//     const orders = JSON.parse(localStorage.getItem("orders_v1") || "[]");
//     const order = {
//       id: "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
//       items: cart,
//       total: subtotal,
//       customer: form,
//       createdAt: new Date().toISOString(),
//     };
//     localStorage.setItem("orders_v1", JSON.stringify([order, ...orders]));
//     dispatch({ type: "CLEAR" });
//     navigate("/order-confirmation", { state: { orderId: order.id } });
//   };

//   if (!cart.length) {
//     return <div className="p-6">Your cart is empty.</div>;
//   }

//   return (
//     <div className="grid gap-6 p-6 lg:grid-cols-3">
//       <form onSubmit={placeOrder} className="lg:col-span-2 rounded bg-white p-6 shadow space-y-3">
//         <h1 className="text-2xl font-bold">Checkout</h1>

//         {["name","email","address","city","zip"].map((field) => (
//           <div key={field}>
//             <label className="block text-sm font-medium capitalize">{field}</label>
//             <input
//               className={`mt-1 w-full rounded border px-3 py-2 ${touched[field] && invalid[field] ? "border-red-500" : ""}`}
//               value={form[field] || ""}
//               onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
//               onBlur={() => setTouched(t => ({ ...t, [field]: true }))}
//             />
//             {touched[field] && invalid[field] && (
//               <p className="text-xs text-red-600 mt-1">Please enter a valid {field}.</p>
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="mt-2 rounded-md bg-amber-400 px-4 py-2 font-medium text-gray-900"
//         >
//           Place Order
//         </button>
//       </form>

//       <aside className="rounded bg-white p-6 shadow">
//         <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
//         <ul className="space-y-2 max-h-80 overflow-auto pr-2">
//           {cart.map(i => (
//             <li key={i.id} className="flex justify-between text-sm">
//               <span className="line-clamp-1">{i.title} × {i.qty}</span>
//               <span>₹{(i.qty * Number(i.price)).toFixed(2)}</span>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-3 border-t pt-3 flex justify-between font-bold">
//           <span>Total</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//       </aside>
//     </div>
//   );
// }





// import React from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";  // ✅ import

// export default function Checkout() {
//   const { cart, subtotal, dispatch } = useCart();
//   const { user } = useAuth();   // ✅ get logged-in user
//   const navigate = useNavigate();

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     const newOrder = {
//       id: Date.now(),
//       items: cart,
//       total: subtotal,
//       date: new Date().toLocaleString(),
//     };

//     // Save orders in localStorage
//     const existingOrders = JSON.parse(localStorage.getItem("orders_v1")) || [];
//     localStorage.setItem("orders_v1", JSON.stringify([...existingOrders, newOrder]));

//     // Clear cart
//     dispatch({ type: "CLEAR" });

//     // Redirect to Orders page
//     navigate("/orders");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Shipping Form */}
//         <div className="md:col-span-2 bg-white rounded shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//           <form className="space-y-4" onSubmit={handlePlaceOrder}>
//             <input type="text" placeholder="Full Name" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <input type="text" placeholder="Address" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <div className="grid grid-cols-2 gap-4">
//               <input type="text" placeholder="City" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//               <input type="text" placeholder="Postal Code" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             </div>
//             <input type="text" placeholder="Country" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-600">
//               Place Order
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <ul className="space-y-2">
//             {cart.map((item) => (
//               <li key={item.id} className="flex justify-between text-sm">
//                 <span>{item.title} x {item.qty}</span>
//                 <span>₹{item.price * item.qty}</span>
//               </li>
//             ))}
//           </ul>
//           <hr className="my-3" />
//           <p className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>₹{subtotal}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }






// import React from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";  // ✅ import
// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function Checkout() {
//   const { cart, subtotal, dispatch } = useCart();
//   const { user } = useAuth();   // ✅ get logged-in user
//   const navigate = useNavigate();

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cart,
//           total: subtotal,
//           userEmail: user?.email || null,   // ✅ attach logged-in user’s email
//           name: user?.name || "Guest",
//           address: "N/A",   // You can replace this with form data later
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to place order");

//       const data = await res.json();
//       console.log("Order placed:", data);

//       dispatch({ type: "CLEAR" });  // ✅ clear cart
//       navigate("/orders");          // ✅ go to orders page
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">Checkout</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Shipping Form */}
//         <div className="md:col-span-2 bg-white rounded shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
//           <form className="space-y-4" onSubmit={handlePlaceOrder}>
//             <input type="text" placeholder="Full Name" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <input type="text" placeholder="Address" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <div className="grid grid-cols-2 gap-4">
//               <input type="text" placeholder="City" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//               <input type="text" placeholder="Postal Code" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             </div>
//             <input type="text" placeholder="Country" required className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400" />
//             <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-600">
//               Place Order
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <ul className="space-y-2">
//             {cart.map((item) => (
//               <li key={item.id} className="flex justify-between text-sm">
//                 <span>{item.title} x {item.qty}</span>
//                 <span>₹{item.price * item.qty}</span>
//               </li>
//             ))}
//           </ul>
//           <hr className="my-3" />
//           <p className="flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>₹{subtotal}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }







import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Checkout() {
  const { cart, subtotal, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // ✅ form state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // ✅ handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total: subtotal,
          email: user?.email || null, // ✅ attach logged-in user’s email
          name: user?.name || "Guest",
          address: "N/A",
        }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      const data = await res.json();
      console.log("Order placed:", data);

      dispatch({ type: "CLEAR" }); // ✅ clear cart
      navigate("/orders"); // ✅ go to orders page
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Shipping Form */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4" onSubmit={handlePlaceOrder}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400"
              />
            </div>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-600"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.title} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>
          <hr className="my-3" />
          <p className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
