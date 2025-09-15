

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
