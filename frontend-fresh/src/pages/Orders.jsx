// import React, { useEffect, useState } from "react";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("orders") || "[]");
//     setOrders(stored);
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <ul className="space-y-4">
//           {orders.map((o, idx) => (
//             <li key={idx} className="border p-4 rounded bg-white">
//               <p><strong>Order ID:</strong> {o.id}</p>
//               <p><strong>Total:</strong> ₹{o.total.toFixed(2)}</p>
//               <ul>
//                 {o.items.map((item, i) => (
//                   <li key={i}>
//                     {item.name} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }






// import React, { useEffect, useState } from "react";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders_v1")) || [];
//     setOrders(savedOrders);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">My Orders</h1>
//       {orders.length === 0 ? (
//         <p className="text-gray-600">You have no orders yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order) => (
//             <div key={order.id} className="bg-white shadow rounded p-6">
//               <p className="text-sm text-gray-500 mb-2">Order Date: {order.date}</p>
//               <ul className="space-y-2">
//                 {order.items.map((item) => (
//                   <li key={item.id} className="flex justify-between">
//                     <span>{item.title} x {item.qty}</span>
//                     <span>₹{item.price * item.qty}</span>
//                   </li>
//                 ))}
//               </ul>
//               <hr className="my-3" />
//               <p className="font-bold text-lg">Total: ₹{order.total}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
// import React, { useEffect, useState } from "react";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${API}/api/orders`)
//       .then((res) => res.json())
//       .then((data) => {
//         setOrders(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch orders", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-white p-6">Loading orders...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">My Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul className="space-y-6">
//           {orders.map((order) => (
//             <li key={order.id || order._id} className="bg-gray-900 p-6 rounded-lg">
//               <p className="font-semibold">Order ID: {order.id || order._id}</p>
//               <p>Total: ₹{order.total}</p>
//               <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
//               <h4 className="mt-2 font-bold">Items:</h4>
//               <ul className="list-disc pl-6">
//                 {order.items.map((item, i) => (
//                   <li key={i}>
//                     {item.title} (x{item.qty}) – ₹{item.price}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }






// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";  // ✅ import

// export default function Orders() {
//   const { user } = useAuth();   // ✅ get logged-in user
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) {
//       setOrders([]);      // ✅ clear when logged out
//       setLoading(false);
//       return;
//     }

//     fetch(`${API}/api/orders`)
//       .then((res) => res.json())
//       .then((data) => {
//         // ✅ filter only this user’s orders
//         const userOrders = data.filter(order => order.userEmail === user.email);
//         setOrders(userOrders);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch orders", err);
//         setLoading(false);
//       });
//   }, [user]);

//   if (loading) return <p className="text-white p-6">Loading orders...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 text-white">
//       <h2 className="text-3xl font-bold mb-6">My Orders</h2>

//       {!user ? (
//         <p>Please log in to see your orders.</p>
//       ) : orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul className="space-y-6">
//           {orders.map((order) => (
//             <li key={order.id || order._id} className="bg-gray-900 p-6 rounded-lg">
//               <p className="font-semibold">Order ID: {order.id || order._id}</p>
//               <p>Total: ₹{order.total}</p>
//               <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>
//               <h4 className="mt-2 font-bold">Items:</h4>
//               <ul className="list-disc pl-6">
//                 {order.items.map((item, i) => (
//                   <li key={i}>
//                     {item.title} (x{item.qty}) – ₹{item.price}
//                   </li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const API = import.meta.env.VITE_API_URL || "https://future-fs-02-backend-5jin.onrender.com";

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
