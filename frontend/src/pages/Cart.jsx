// src/pages/Cart.jsx
// import React, { useContext } from 'react';
// import { CartContext } from '../contexts/CartContext';
// import { Link, useNavigate } from 'react-router-dom';

// export default function CartPage() {
//   const { cart, updateQty, removeFromCart, total } = useContext(CartContext);
//   const navigate = useNavigate();

//   if (cart.length === 0) return (
//     <main className="max-w-4xl mx-auto p-6">
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold">Your cart is empty</h2>
//         <Link to="/" className="text-indigo-600 mt-3 inline-block">Browse products</Link>
//       </div>
//     </main>
//   );

//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <div className="bg-white p-6 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Cart</h2>
//         <div className="space-y-4">
//           {cart.map(item => (
//             <div className="flex items-center justify-between" key={item.id}>
//               <div className="flex items-center gap-4">
//                 <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded"/>
//                 <div>
//                   <div className="font-medium">{item.title}</div>
//                   <div className="text-sm text-gray-500">₹{item.price}</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <input className="w-20 p-1 border rounded" type="number" min="1" value={item.qty} onChange={(e)=> updateQty(item.id, Math.max(1, Number(e.target.value)))} />
//                 <div className="w-24 text-right font-semibold">₹{(item.price*item.qty).toFixed(2)}</div>
//                 <button onClick={()=>removeFromCart(item.id)} className="text-red-500">Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 flex justify-between items-center">
//           <div className="text-lg font-medium">Total: ₹{total.toFixed(2)}</div>
//           <button onClick={()=>navigate('/checkout')} className="bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
//         </div>
//       </div>
//     </main>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cart, dispatch, subtotal } = useCart();

  if (!cart.length) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p className="mt-3 text-gray-600">Your cart is empty.</p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-amber-400 px-4 py-2 text-gray-900">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 rounded bg-white p-4 shadow">
            <img src={item.image} alt={item.title} className="h-20 w-20 rounded object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 capitalize">{item.category}</p>
              <div className="mt-1 font-semibold">₹{Number(item.price).toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={item.qty}
                onChange={(e) => dispatch({ type: "UPDATE_QTY", id: item.id, qty: Number(e.target.value) })}
                className="w-20 rounded border px-2 py-1"
              />
              <button
                onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                className="rounded border px-3 py-1 hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="rounded bg-white p-4 shadow">
        <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
        <div className="flex justify-between py-1">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Shipping</span>
          <span>₹0.00</span>
        </div>
        <div className="mt-2 border-t pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <Link
          to="/checkout"
          className="mt-4 block rounded-md bg-amber-400 px-4 py-2 text-center font-medium text-gray-900"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}
