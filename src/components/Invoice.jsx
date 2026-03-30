import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartUrl, imageUrl } from "../repo/api_path";
import { FaCheckCircle } from "react-icons/fa";

const Invoice = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const res = await axios.get(`${cartUrl}/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg font-semibold">
        Loading invoice...
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        No items for checkout
      </div>
    );
  }

  // Calculations
  const subTotal = cart.items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  const tax = Math.round(subTotal * 0.05);
  const deliveryCharge = subTotal > 500 ? 0 : 40;
  const finalAmount = subTotal + tax + deliveryCharge;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* LEFT: ITEMS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            🧾 Order Summary
          </h2>

          <div className="flex flex-col gap-4">
            {cart.items.map((item) => {
              if (!item.product) return null;

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={`${imageUrl}${item.product.image}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-contain bg-gray-50 rounded-lg p-2"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {item.product.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      ₹{item.product.price} × {item.quantity}kg
                    </p>
                  </div>

                  <div className="font-semibold text-green-600">
                    ₹{item.product.price * item.quantity}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: BILL */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Price Details
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-600">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span>₹{finalAmount}</span>
            </div>

          </div>

          {/* Place Order */}
          <button className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold 
                             hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center gap-2">
            <FaCheckCircle />
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
};

export default Invoice;