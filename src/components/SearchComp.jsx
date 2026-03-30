import React from "react";
import { Link } from "react-router-dom";
import { FaAppleAlt, FaCarrot, FaSeedling, FaStore } from "react-icons/fa";

const categories = [
  {
    name: "All Products",
    path: "/all-products",
    icon: <FaStore />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Fruits",
    path: "/fruit-products",
    icon: <FaAppleAlt />,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Vegetables",
    path: "/vegetables",
    icon: <FaCarrot />,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Food Grains",
    path: "/food-grains",
    icon: <FaSeedling />,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const SearchComp = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shop by Category 🛍️
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

          {categories.map((cat, index) => (
            <Link to={cat.path} key={index}>
              <div
                className={`rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg 
                           transition duration-300 cursor-pointer ${cat.color}`}
              >
                <div className="text-3xl">
                  {cat.icon}
                </div>

                <p className="font-semibold text-sm">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}

        </div>

      </div>
    </div>
  );
};

export default SearchComp;