import React from "react";
import AllProducts from "../products/AllProducts";
import SearchComp from "../components/SearchComp";

const LandingPage = () => {
  return (
    <div className="bg-gray-100">


      <div className="bg-green-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

  
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh Groceries Delivered 🚀
            </h1>

            <p className="text-lg text-green-100 mb-6">
              Get fruits, vegetables, and essentials delivered to your doorstep in minutes.
            </p>

            <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="groceries"
            className="w-64 md:w-80"
          />
        </div>
      </div>

      <SearchComp />


      <div className="py-8">
        <AllProducts />
      </div>

    </div>
  );
};

export default LandingPage;