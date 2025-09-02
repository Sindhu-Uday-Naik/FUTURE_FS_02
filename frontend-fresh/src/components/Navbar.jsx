// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, UserRound } from "lucide-react";
// import { useCart } from "../contexts/CartContext";

// export default function Navbar({ search, setSearch }) {
//   const { count } = useCart();

//   return (
//     <header className="bg-amber-400">
//       <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
//         {/* Brand */}
//         <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
//           Haripriya <span className="text-gray-800">Vignette</span>
//         </Link>

//         {/* Search */}
//         <div className="flex-1 flex">
//           <input
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full rounded-l-md border border-gray-300 px-4 py-2 focus:outline-none"
//             placeholder="Search Haripriya Vignette…"
//           />
//           <button className="rounded-r-md bg-gray-900 px-4 text-white">Search</button>
//         </div>

//         {/* Account + Cart */}
//         <div className="flex items-center gap-4">
//           <Link to="/checkout" className="flex items-center gap-2 text-gray-900 hover:underline">
//             <UserRound size={20} />
//             <span className="text-sm">Sign in</span>
//           </Link>
//           <Link to="/cart" className="relative flex items-center gap-2 text-gray-900">
//             <ShoppingCart />
//             <span className="text-sm font-semibold">{count}</span>
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }


// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useAuth } from "../contexts/AuthContext";

// export default function Navbar() {
//   const { cart } = useCart();
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-md">
//       <h1 className="text-3xl font-extrabold tracking-wide font-['Playfair_Display'] text-gray-900">Haripriya Vignette</h1>
//       <div className="flex space-x-6 text-lg font-semibold">
//         <Link to="/orders" className="hover:underline">Orders</Link>
//         <Link to="/cart" className="hover:underline">Cart ({cart.length})</Link>
//         {user ? (
//           <>
//             <span>Hello, {user.name}</span>
//             <button onClick={logout} className="ml-2 text-red-600">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline">Login</Link>
//             <Link to="/register" className="hover:underline">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



// import { Link } from "react-router-dom";
// import { useCart } from "../contexts/CartContext";
// import { useAuth } from "../contexts/AuthContext";

// export default function Navbar() {
//   const { count } = useCart();
//   const { user } = useAuth();

//   return (
//     <header className="bg-black text-white shadow-md">
//       {/* Brand Name - Centered */}
//       <div className="py-6 text-center">
//         <h1 className="text-5xl font-extrabold tracking-wide font-['Playfair_Display'] text-white-900">
//           Haripriya Vignette
//         </h1>
//       </div>

//       {/* Navbar Links */}
//       <nav className="flex justify-right space-x-10 py-4 bg-gray-50 text-white text-lg font-semibold">
//         <Link to="/orders" className="hover:text-white-600 transition-colors">Orders</Link>
//         <Link to="/cart" className="hover:text-white-600 transition-colors">Cart ({count})</Link>
//         {user ? (
//           <span className="text-white-700">Hi, {user.name}</span>
//         ) : (
//           <>
//             <Link to="/login" className="hover:text-white-600 transition-colors">Login</Link>
//             <Link to="/register" className="hover:text-white-600 transition-colors">Register</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }




import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-black text-white shadow-md">
      {/* Brand Name - Centered */}
      <div className="py-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide font-['Playfair_Display'] text-white">
          Haripriya Vignette
        </h1>
      </div>

      {/* Navbar Links */}
      <nav className="flex justify-left space-x-10 py-4 bg-black text-white text-lg font-semibold">
        <Link to="/orders" className="hover:text-gray-300 transition-colors">Orders</Link>
        <Link to="/cart" className="hover:text-gray-300 transition-colors">Cart ({count})</Link>

        {user ? (
          <div className="flex space-x-4 items-center">
            <span className="text-white">Hi, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
            <Link to="/register" className="hover:text-gray-300 transition-colors">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
