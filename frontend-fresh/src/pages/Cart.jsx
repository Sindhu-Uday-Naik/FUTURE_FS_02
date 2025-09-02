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







// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";

// export default function CartPage() {
//   const { cart, dispatch, subtotal } = useCart();

//   if (!cart.length) {
//     return (
//       <div className="p-6">
//         <h1 className="text-2xl font-bold">Your Cart</h1>
//         <p className="mt-3 text-gray-600">Your cart is empty.</p>
//         <Link to="/" className="mt-4 inline-block rounded-md bg-amber-400 px-4 py-2 text-gray-900">
//           Continue Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-6 p-6 lg:grid-cols-3">
//       <div className="lg:col-span-2 space-y-4">
//         {cart.map(item => (
//           <div key={item.id} className="flex items-center gap-4 rounded bg-white p-4 shadow">
//             <img src={item.image} alt={item.title} className="h-20 w-20 rounded object-cover" />
//             <div className="flex-1">
//               <h3 className="font-semibold">{item.title}</h3>
//               <p className="text-sm text-gray-500 capitalize">{item.category}</p>
//               <div className="mt-1 font-semibold">₹{Number(item.price).toFixed(2)}</div>
//             </div>
//             <div className="flex items-center gap-2">
//               <input
//                 type="number"
//                 min={1}
//                 value={item.qty}
//                 onChange={(e) => dispatch({ type: "UPDATE_QTY", id: item.id, qty: Number(e.target.value) })}
//                 className="w-20 rounded border px-2 py-1"
//               />
//               <button
//                 onClick={() => dispatch({ type: "REMOVE", id: item.id })}
//                 className="rounded border px-3 py-1 hover:bg-gray-50"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <aside className="rounded bg-white p-4 shadow">
//         <h2 className="mb-3 text-lg font-semibold">Order Summary</h2>
//         <div className="flex justify-between py-1">
//           <span>Subtotal</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//         <div className="flex justify-between py-1">
//           <span>Shipping</span>
//           <span>₹0.00</span>
//         </div>
//         <div className="mt-2 border-t pt-2 flex justify-between font-bold">
//           <span>Total</span>
//           <span>₹{subtotal.toFixed(2)}</span>
//         </div>
//         <Link
//           to="/checkout"
//           className="mt-4 block rounded-md bg-amber-400 px-4 py-2 text-center font-medium text-gray-900"
//         >
//           Proceed to Checkout
//         </Link>
//       </aside>
//     </div>
//   );
// }





// import React from "react";
// import { useCart } from "../contexts/CartContext";

// export default function Cart() {
//   const { cart, dispatch, subtotal } = useCart();

//   return (
//     <div className="bg-black text-white min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-lg">Your cart is empty.</p>
//       ) : (
//         cart.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between bg-gray-800 p-4 rounded mb-4"
//           >
//             {/* Product Image with fallback */}
//             <img
//               src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.png"}
//               alt={item.title}
//               className="mx-auto rounded-lg shadow-lg"
//   style={{ width: "500px", height: "500px", objectFit: "contain" }}
//             />

//             {/* Product Info */}
//             <div className="flex-1 ml-4">
//               <h2 className="text-xl font-semibold">{item.title}</h2>
//               <p className="text-lg">₹{item.price}</p>

//               {/* Quantity Controls */}
//               <div className="flex items-center mt-2">
//                 <button
//                   onClick={() =>
//                     dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })
//                   }
//                   className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                 >
//                   -
//                 </button>
//                 <span className="mx-2">{item.qty}</span>
//                 <button
//                   onClick={() =>
//                     dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })
//                   }
//                   className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Remove Button */}
//             <button
//               onClick={() => dispatch({ type: "REMOVE", id: item.id })}
//               className="ml-4 text-red-400 hover:text-red-600"
//             >
//               Remove
//             </button>
//           </div>
//         ))
//       )}

//       {/* Subtotal */}
//       {cart.length > 0 && (
//         <h2 className="text-2xl font-bold mt-6">
//           Subtotal: ₹{subtotal}
//         </h2>
//       )}
//     </div>
//   );
// }





// import React from "react";
// import { useCart } from "../contexts/CartContext";

// export default function Cart() {
//   const { cart, dispatch, subtotal } = useCart();

//   const handlePlaceOrder = () => {
//     // Later connect to backend API (POST /api/orders)
//     alert("Order placed successfully!");
//     dispatch({ type: "CLEAR" }); // clear cart after placing order
//   };

//   return (
//     <div className="bg-black text-white min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-lg">Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between bg-gray-800 p-4 rounded mb-4"
//             >
//               {/* Product Image */}
//               <img
//                 src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.png"}
//                 alt={item.title}
//                 className="mx-auto rounded-lg shadow-lg"
//    style={{ width: "500px", height: "500px", objectFit: "contain" }}
//               />

//               {/* Product Info */}
//               <div className="flex-1 ml-4">
//                 <h2 className="text-xl font-semibold">{item.title}</h2>
//                 <p className="text-lg">₹{item.price}</p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center mt-2">
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })
//                     }
//                     className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                   >
//                     -
//                   </button>
//                   <span className="mx-2">{item.qty}</span>
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })
//                     }
//                     className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <button
//                 onClick={() => dispatch({ type: "REMOVE", id: item.id })}
//                 className="ml-4 text-red-400 hover:text-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Subtotal & Place Order */}
//           <div className="mt-6 flex justify-between items-center">
//             <h2 className="text-2xl font-bold">Subtotal: ₹{subtotal}</h2>
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
//             >
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }




// import React from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cart, dispatch, subtotal } = useCart();
//   const navigate = useNavigate();

//   const handlePlaceOrder = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           items: cart,
//           subtotal,
//         }),
//         credentials: "include", // ensures cookies (auth) are sent if required
//       });

//       if (!res.ok) throw new Error("Failed to place order");

//       // ✅ Order placed successfully
//       dispatch({ type: "CLEAR" }); // clear cart
//       navigate("/orders"); // redirect to Orders page
//     } catch (err) {
//       console.error(err);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-black text-white min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {cart.length === 0 ? (
//         <p className="text-lg">Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between bg-gray-800 p-4 rounded mb-4"
//             >
//               {/* Product Image */}
//               <img
//                 src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.png"}
//                 alt={item.title}
//                 className="mx-auto rounded-lg shadow-lg"
//     style={{ width: "500px", height: "500px", objectFit: "contain" }}
//               />

//               {/* Product Info */}
//               <div className="flex-1 ml-4">
//                 <h2 className="text-xl font-semibold">{item.title}</h2>
//                 <p className="text-lg">₹{item.price}</p>

//                 {/* Quantity Controls */}
//                 <div className="flex items-center mt-2">
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty - 1 })
//                     }
//                     className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                   >
//                     -
//                   </button>
//                   <span className="mx-2">{item.qty}</span>
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "UPDATE_QTY", id: item.id, qty: item.qty + 1 })
//                     }
//                     className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Remove Button */}
//               <button
//                 onClick={() => dispatch({ type: "REMOVE", id: item.id })}
//                 className="ml-4 text-red-400 hover:text-red-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Subtotal & Place Order */}
//           <div className="mt-6 flex justify-between items-center">
//             <h2 className="text-2xl font-bold">Subtotal: ₹{subtotal}</h2>
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
//             >
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }





const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, dispatch, subtotal } = useCart();
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!name || !email || !address) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          qty: item.qty,
        })),
        total: subtotal,
        name,
        email,
        address,
      };

      const res = await fetch(`${API}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error("Failed to place order");
      await res.json();

      dispatch({ type: "CLEAR" });
      navigate("/orders");
    } catch (err) {
      console.error(err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-gray-900 p-4 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.png"}
                 alt={item.title}
                 className="mx-auto rounded-lg shadow-lg"
     style={{ width: "500px", height: "500px", objectFit: "contain" }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p>₹{item.price}</p>
                    <p>Qty: {item.qty}</p>
                  </div>
                </div>
                <button
                  onClick={() => dispatch({ type: "REMOVE", id: item.id })}
                  className="text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-xl font-semibold">
            Subtotal: ₹{subtotal}
          </div>

          {!showCheckout ? (
            <button
              onClick={() => setShowCheckout(true)}
              className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg text-lg font-bold"
            >
              Proceed to Checkout
            </button>
          ) : (
            <>
              {/* Checkout form */}
              <div className="mt-6 space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Address"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-600"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              {error && <p className="text-red-400 mt-4">{error}</p>}

              <button
                onClick={placeOrder}
                disabled={loading}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
              >
                {loading ? "Placing Order..." : "Confirm Order"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
