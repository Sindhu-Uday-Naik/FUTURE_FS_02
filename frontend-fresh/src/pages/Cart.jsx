

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
// import React, { useState } from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";

// export default function Cart() {
//   const { cart, dispatch, subtotal } = useCart();
//   const navigate = useNavigate();

//   const [showCheckout, setShowCheckout] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const placeOrder = async () => {
//     if (!name || !email || !address) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const orderData = {
//         items: cart.map((item) => ({
//           productId: item.id,
//           title: item.title,
//           price: item.price,
//           qty: item.qty,
//         })),
//         total: subtotal,
//         name,
//         email,
//         address,
//       };

//       const res = await fetch(`${API}/api/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (!res.ok) throw new Error("Failed to place order");
//       await res.json();

//       dispatch({ type: "CLEAR" });
//       navigate("/orders");
//     } catch (err) {
//       console.error(err);
//       setError("Failed to place order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cart.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center justify-between bg-gray-900 p-4 rounded-lg"
//               >
//                 <div className="flex items-center space-x-4">
//                   <img
//                     src={item.image ? `http://localhost:5000${item.image}` : "/placeholder.png"}
//                  alt={item.title}
//                  className="mx-auto rounded-lg shadow-lg"
//      style={{ width: "500px", height: "500px", objectFit: "contain" }}
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold">{item.title}</h3>
//                     <p>₹{item.price}</p>
//                     <p>Qty: {item.qty}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => dispatch({ type: "REMOVE", id: item.id })}
//                   className="text-red-400 hover:text-red-600"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="mt-6 text-xl font-semibold">
//             Subtotal: ₹{subtotal}
//           </div>

//           {!showCheckout ? (
//             <button
//               onClick={() => setShowCheckout(true)}
//               className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg text-lg font-bold"
//             >
//               Proceed to Checkout
//             </button>
//           ) : (
//             <>
//               {/* Checkout form */}
//               <div className="mt-6 space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <textarea
//                   placeholder="Address"
//                   className="w-full p-2 rounded bg-gray-800 border border-gray-600"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>

//               {error && <p className="text-red-400 mt-4">{error}</p>}

//               <button
//                 onClick={placeOrder}
//                 disabled={loading}
//                 className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
//               >
//                 {loading ? "Placing Order..." : "Confirm Order"}
//               </button>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }








// // frontend-fresh/src/pages/Cart.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// export default function Cart() {
//   const { cart, dispatch, subtotal } = useCart();
//   const navigate = useNavigate();

//   const handleRemove = (id) => {
//     dispatch({ type: "REMOVE", id });
//   };

//   const handleQty = (id, qty) => {
//     dispatch({ type: "UPDATE_QTY", id, qty });
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

//         {cart.length === 0 ? (
//           <p className="text-lg">Your cart is empty.</p>
//         ) : (
//           <>
//             <ul className="space-y-6">
//               {cart.map((item) => (
//                 <li
//                   key={item.id}
//                   className="flex items-center justify-between bg-gray-900 p-4 rounded"
//                 >
//                   {/* Image + Title */}
//                   <div className="flex items-center gap-4">
//                     {/* Image loaded from backend API (make sure VITE_API_URL is set in env) */}
//                     <img
//                       src={
//                         // handle absolute URL or backend-relative path
//                         item.image?.startsWith("http")
//                           ? item.image
//                           : `${API}${item.image}`
//                       }
//                       alt={item.title}
//                       className="w-16 h-20 object-cover rounded bg-white p-1"
//                       onError={(e) => {
//                         // fallback if image fails
//                         e.currentTarget.src =
//                           "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'200'%20height%3D'200'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23000'%20/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20fill%3D'%23fff'%20font-size%3D'14'%20text-anchor%3D'middle'%20dominant-baseline%3D'middle'%3ENo%20Image%3C/text%3E%3C/svg%3E";
//                       }}
//                     />
//                     <div>
//                       <h2 className="text-2xl font-semibold">{item.title}</h2>
//                       <p className="mt-2">₹{item.price}</p>
//                       <div className="mt-2 flex items-center gap-2">
//                         <button
//                           className="px-2 py-1 border rounded"
//                           onClick={() => handleQty(item.id, Math.max(1, item.qty - 1))}
//                         >
//                           -
//                         </button>
//                         <span className="px-2">{item.qty}</span>
//                         <button
//                           className="px-2 py-1 border rounded"
//                           onClick={() => handleQty(item.id, item.qty + 1)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right side: Remove button */}
//                   <div className="flex flex-col items-end gap-4">
//                     <button
//                       className="bg-white text-black px-3 py-1 rounded"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                       Remove
//                     </button>
//                     <div className="text-lg font-semibold">₹{item.price * item.qty}</div>
//                   </div>
//                 </li>
//               ))}
//             </ul>

//             {/* Subtotal + Checkout */}
//             <div className="mt-8 flex justify-end items-center gap-6">
//               <div className="text-2xl font-bold">Subtotal: ₹{subtotal}</div>
//               <button
//                 className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold"
//                 onClick={() => navigate("/checkout")}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }









// frontend-fresh/src/pages/Cart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Cart() {
  const { cart, dispatch, subtotal } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", id });
  };

  const handleQty = (id, qty) => {
    dispatch({ type: "UPDATE_QTY", id, qty });
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-gray-900 p-4 rounded"
                >
                  {/* Image + Title */}
                  <div className="flex items-center gap-4">
                    {/* Passport-size image */}
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${API}${item.image}`
                      }
                      alt={item.title}
                      className="w-72px h-56px object-cover rounded bg-white p-1"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'64'%20height%3D'80'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20fill%3D'%23000'%20/%3E%3Ctext%20x%3D'50%25'%20y%3D'50%25'%20fill%3D'%23fff'%20font-size%3D'10'%20text-anchor%3D'middle'%20dominant-baseline%3D'middle'%3ENo%20Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="mt-1">₹{item.price}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQty(item.id, Math.max(1, item.qty - 1))}
                        >
                          -
                        </button>
                        <span className="px-2">{item.qty}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Remove button */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      className="bg-white text-black px-3 py-1 rounded"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                    <div className="text-lg font-semibold">₹{item.price * item.qty}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Subtotal + Checkout */}
            <div className="mt-8 flex justify-end items-center gap-6">
              <div className="text-2xl font-bold">Subtotal: ₹{subtotal}</div>
              <button
                className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
