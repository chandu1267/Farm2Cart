import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useSearchStore from "../store/useSearchStore";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLoggedIn, user, logout, initializeAuth, cartCount } =
    useAuthStore();

  const { search, setSearch } = useSearchStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold text-green-600">
            Farm2Cart 🛒
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-full max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search groceries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-gray-700" />

            {/* Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user && (
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
              <FaUserCircle className="text-xl" />
              <span className="font-medium">{user}</span>
            </div>
          )}

          {/* Auth Button */}
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/send-otp">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition">
                Login
              </button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;