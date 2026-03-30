import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-green-500 mb-3">
            SmallBasket 🛒
          </h2>
          <p className="text-sm text-gray-400">
            Your one-stop destination for fresh groceries delivered to your doorstep quickly and safely.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="hover:text-white cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/all-products">Products</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/cart">Cart</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to="/send-otp">Login</Link>
                </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Categories
          </h3>
          <ul className="flex flex-col gap-2 text-sm">
            <Link to="/fruit-products"><li className="hover:text-white cursor-pointer" >Fruits</li></Link>
            <Link to="/vegetables"><li className="hover:text-white cursor-pointer">Vegetables</li></Link>
            <Link to="/food-grains"><li className="hover:text-white cursor-pointer">Food Grains</li></Link>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Follow Us
          </h3>

          <div className="flex gap-4 text-xl">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaLinkedin className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SmallBasket. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;