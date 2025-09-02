import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(stored);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((o, idx) => (
            <li key={idx} className="border p-4 rounded bg-white">
              <p><strong>Order ID:</strong> {o.id}</p>
              <p><strong>Total:</strong> ₹{o.total.toFixed(2)}</p>
              <ul>
                {o.items.map((item, i) => (
                  <li key={i}>
                    {item.name} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
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
