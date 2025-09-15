
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
