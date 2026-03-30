import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl, imageUrl, cartUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const DetailComponent = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, incrementCart } = useAuthStore();

  // Fetch product
  const singleHandler = async () => {
    try {
      const res = await axios.get(`${productUrl}/${id}`);
      setProduct(res.data.record);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    singleHandler();
  }, [id]);

  // Add to cart
  const addToCartHandler = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login first");
        return;
      }

      const token = localStorage.getItem("userToken");

      const res = await axios.post(
        `${cartUrl}/add-to-cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      incrementCart(1);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong");
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-lg">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-8">

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={`${imageUrl}${product.image}`}
            alt={product.name}
            className="w-full max-w-md object-contain rounded-xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-2xl text-green-600 font-semibold mb-4">
              ₹{product.price}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.desc}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            
            <button
              onClick={addToCartHandler}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold 
                         hover:bg-green-700 transition duration-300 shadow-md"
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl font-semibold 
                         hover:bg-gray-100 transition duration-300"
            >
              <FaHeart />
              Save
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;