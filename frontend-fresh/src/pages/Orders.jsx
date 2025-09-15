
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setOrders([]);   // ✅ clear if no user
      setLoading(false);
      return;
    }

    fetch(`${API}/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ filter only this user's orders
        const myOrders = data.filter((order) => order.email === user.email);
        setOrders(myOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <p className="text-white p-6">Loading orders...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id || order._id} className="bg-gray-900 p-6 rounded-lg">
              <p className="font-semibold">Order ID: {order.id || order._id}</p>
              <p>Total: ₹{order.total}</p>
              <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
              <h4 className="mt-2 font-bold">Items:</h4>
              <ul className="list-disc pl-6">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.title} (x{item.qty}) – ₹{item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
