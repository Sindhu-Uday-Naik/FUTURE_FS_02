
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
                    {/* Passport-size image: tailwind + inline style to force size */}
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `${API}${item.image}`
                      }
                      alt={item.title}
                      className="rounded bg-white p-1" 
                      style={{
                        width: "100px",      // forced width (passport-like)
                        height: "200px",     // forced height
                        objectFit: "cover", // crop to fill frame
                        display: "block",
                      }}
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

                  {/* Right side: Remove button + item total */}
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
