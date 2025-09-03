// // src/components/ProductCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function ProductCard({ p }) {
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded" />
//       <h3 className="mt-3 font-medium">{p.title}</h3>
//       <p className="text-sm text-gray-500">{p.category}</p>
//       <div className="mt-2 flex justify-between items-center">
//         <div className="text-lg font-semibold">₹{p.price}</div>
//         <Link to={`/product/${p.id}`} className="text-sm bg-indigo-600 text-white px-3 py-1 rounded">View</Link>
//       </div>
//     </div>
//   );
// }




// src/components/ProductCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext';

// export default function ProductCard({ p }) {
//   const { dispatch } = useCart();

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded" />
//       <h3 className="mt-3 font-medium">{p.title}</h3>
//       <p className="text-sm text-gray-500">{p.category}</p>
//       <div className="mt-2 flex justify-between items-center">
//         <div className="text-lg font-semibold">₹{p.price.toLocaleString()}</div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => dispatch({ type: "ADD", item: p })}
//             className="rounded-md bg-amber-400 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-amber-300"
//           >
//             Add to Cart
//           </button>
//           <Link to={`/product/${p.id}`} className="text-sm rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-50">
//             View
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import { Link } from "react-router-dom";

// function ProductCard({ product }) {
//   return (
//     <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
//       <img
//         src={product.image}
//         alt={product.title}
//         className="h-40 w-full object-cover mb-4 rounded"
//       />
//       <h3 className="font-semibold">{product.title}</h3>
//       <p className="text-gray-600">₹{product.price}</p>
//       <Link
//         to={`/product/${product.id}`}
//         className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         View
//       </Link>
//     </div>
//   );
// }

// export default ProductCard;





// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   return (
//     <Link to={`/products/${product.id}`} className="block border rounded-lg p-4 hover:shadow-lg">
//       <img
//         src={`http://localhost:5000${product.image}`}
//         alt={product.title}
//         className="w-full h-48 object-cover rounded-md"
//       />
//       <h2 className="mt-2 font-semibold">{product.title}</h2>
//       <p className="text-gray-600">₹{product.price}</p>
//     </Link>
//   );
// }



// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   return (
//     // <div className="border rounded-lg shadow-sm p-4">
//     //   <Link to={`/product/${product.id}`}>
//     //     <img
//     //       src={`http://localhost:5000${product.image}`}
//     //       alt={product.title}
//     //       className="w-full h-48 object-cover rounded"
//     //     />
//     //     <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
//     //   </Link>
//     //   <p className="text-gray-700">₹{product.price}</p>
//     // </div>
//     <div className="border rounded-lg shadow-sm p-4 hover:shadow-lg transition">
//   <Link to={`/product/${product.id}`}>
//     <img
//       src={`http://localhost:5000${product.image}`}
//       alt={product.title}
//       className="w-full h-64 object-cover rounded-md"
//     />
//     <h3 className="text-lg font-bold text-gray-900">{product.title}</h3>
//   </Link>
//   <p className="text-lg font-semibold text-gray-700">₹{product.price}</p>
//   <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
//     Add to Cart
//   </button>
// </div>

//   );
// }




import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-between border border-gray-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md"
          style={{ width: "200px", height: "400px", objectFit: "cover" }}
        />
        <h2 className="mt-2 text-white text-center text-lg font-semibold">
          {product.title}
        </h2>
        <p className="text-white-700 text-center font-bold text-base">
          ₹{product.price}
        </p>
      </Link>
    </div>
  );
}
