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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const { cart, subtotal, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const [touched, setTouched] = useState({});

  const invalid = {
    name: !form.name?.trim(),
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email || ""),
    address: !form.address?.trim(),
    city: !form.city?.trim(),
    zip: !/^\d{5,6}$/.test(form.zip || ""),
  };
  const hasErrors = Object.values(invalid).some(Boolean);

  const placeOrder = (e) => {
    e.preventDefault();
    if (hasErrors) return setTouched({ name: true, email: true, address: true, city: true, zip: true });

    // simulate order save (localStorage order history)
    const orders = JSON.parse(localStorage.getItem("orders_v1") || "[]");
    const order = {
      id: "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      items: cart,
      total: subtotal,
      customer: form,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("orders_v1", JSON.stringify([order, ...orders]));
    dispatch({ type: "CLEAR" });
    navigate("/order-confirmation", { state: { orderId: order.id } });
  };

  if (!cart.length) {
    return <div className="p-6">Your cart is empty.</div>;
  }

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <form onSubmit={placeOrder} className="lg:col-span-2 rounded bg-white p-6 shadow space-y-3">
        <h1 className="text-2xl font-bold">Checkout</h1>

        {["name","email","address","city","zip"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field}</label>
            <input
              className={`mt-1 w-full rounded border px-3 py-2 ${touched[field] && invalid[field] ? "border-red-500" : ""}`}
              value={form[field] || ""}
              onChange={(e) => setForm(f => ({ ...f, [field]: e.target.value }))}
              onBlur={() => setTouched(t => ({ ...t, [field]: true }))}
            />
            {touched[field] && invalid[field] && (
              <p className="text-xs text-red-600 mt-1">Please enter a valid {field}.</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 rounded-md bg-amber-400 px-4 py-2 font-medium text-gray-900"
        >
          Place Order
        </button>
      </form>

      <aside className="rounded bg-white p-6 shadow">
        <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
        <ul className="space-y-2 max-h-80 overflow-auto pr-2">
          {cart.map(i => (
            <li key={i.id} className="flex justify-between text-sm">
              <span className="line-clamp-1">{i.title} × {i.qty}</span>
              <span>₹{(i.qty * Number(i.price)).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t pt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}
