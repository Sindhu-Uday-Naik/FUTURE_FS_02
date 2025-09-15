
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
