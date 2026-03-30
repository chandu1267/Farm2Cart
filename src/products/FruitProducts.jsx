
import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl, productUrl } from "../repo/api_path";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const FruitProducts = () => {
  const [fruits, setFruits] = useState([]);
  const [unitPrice, setUnitPrice] = useState({});
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { incrementCart } = useAuthStore();

  const fetchFruits = async () => {
    try {
      const res = await axios.get(`${productUrl}/search?category=fruits`);
      setFruits(res.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch fruits ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFruits();
  }, []);

  const handleUnitChange = (productId, unit, basePrice) => {
    let price = basePrice;

    if (unit === "500g") price = basePrice / 2;
    if (unit === "2kg") price = basePrice * 2;
    if (unit === "5kg") price = basePrice * 5;

    setUnitPrice((prev) => ({
      ...prev,
      [productId]: price,
    }));
  };

  const cartHandler = async (productId, quantity) => {
    const userToken = localStorage.getItem("userToken");

    try {
      await axios.post(
        `${cartUrl}/add-to-cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      incrementCart(quantity);
      toast.success("Added to cart 🛒");
    } catch (error) {
      toast.error("Please login to continue");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading fruits...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      {/* Title */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Category: <span className="text-green-600">Fresh Fruits 🍎</span>
        </h2>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {fruits.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >

            {/* Image */}
            <Link to={`/single/${product._id}`}>
              <div className="h-40 flex items-center justify-center bg-gray-50">
                <img
                  src={`${imageUrl}${product.image}`}
                  alt={product.name}
                  className="h-full object-contain p-2 hover:scale-105 transition"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 flex flex-col gap-2">

              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">

                <select
                  className="text-xs border rounded px-2 py-1"
                  onChange={(e) =>
                    handleUnitChange(
                      product._id,
                      e.target.value,
                      product.price
                    )
                  }
                >
                  <option value="1kg">1kg</option>
                  <option value="2kg">2kg</option>
                  <option value="5kg">5kg</option>
                </select>

                <span className="text-green-600 font-bold text-sm">
                  ₹{unitPrice[product._id] ?? product.price}
                </span>
              </div>

              <button
                onClick={() => cartHandler(product._id, quantity)}
                className="mt-2 flex items-center justify-center gap-2 bg-green-600 text-white text-sm py-2 rounded-lg 
                           hover:bg-green-700 transition"
              >
                <FaShoppingCart />
                Add
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* Empty */}
      {fruits.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No fruits available 😕
        </div>
      )}
    </div>
  );
};

export default FruitProducts;