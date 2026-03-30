import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import Checkout from "./Checkout";
import { FaTrash } from "react-icons/fa";

const ShowCart = () => {
  const [cartDetail, setCartDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setCartCount } = useAuthStore();

  const cartHandler = async () => {
    const userToken = localStorage.getItem("userToken");

    try {
      const res = await axios.get(`${cartUrl}/details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setCartDetail(res.data.cart);
      setCartCount(res.data.cart.items.length || 0);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartHandler();
  }, []);

  const deleteHandler = async (productId) => {
    const userToken = localStorage.getItem("userToken");

    try {
      await axios.delete(`${cartUrl}/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      cartHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading cart...
      </div>
    );
  }

  if (!cartDetail || cartDetail.items.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Your cart is empty 🛒
      </div>
    );
  }

  // Total Calculation
  const totalAmount = cartDetail.items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT: CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🛒 My Cart
          </h2>

          <div className="flex flex-col gap-4">
            {cartDetail.items.map((item) => {
              if (!item.product) return null;

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  {/* Image */}
                  <img
                    src={`${imageUrl}${item.product.image}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2"
                  />

                  {/* Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {item.product.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      ₹{item.product.price} × {item.quantity}
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteHandler(item.product._id)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Cart Summary
          </h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Total Items</span>
            <span>{cartDetail.items.length}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Total Amount</span>
            <span className="font-semibold text-green-600">
              ₹{totalAmount}
            </span>
          </div>

          {/* Checkout Button */}
          <Checkout />

        </div>
      </div>
    </div>
  );
};

export default ShowCart;