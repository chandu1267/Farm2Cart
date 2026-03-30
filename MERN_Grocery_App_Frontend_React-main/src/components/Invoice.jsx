// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { cartUrl, imageUrl } from "../repo/api_path";

// const Invoice = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCart = async () => {
//     const token = localStorage.getItem("userToken");

//     try {
//       const res = await axios.get(`${cartUrl}/details`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCart(res.data.cart);
//       setLoading(false);
//     } catch (error) {
//       console.error(error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <h3>Loading invoice...</h3>;
//   if (!cart || cart.items.length === 0)
//     return <h3>No items for checkout</h3>;

//   // 🧮 Calculations
//   const subTotal = cart.items.reduce((acc, item) => {
//     if (!item.product) return acc;
//     return acc + item.product.price * item.quantity;
//   }, 0);

//   const tax = Math.round(subTotal * 0.05); // 5% GST
//   const deliveryCharge = subTotal > 500 ? 0 : 40;
//   const finalAmount = subTotal + tax + deliveryCharge;

//   return (
//     <div className="invoiceContainer">
//       <h2>🧾 Invoice</h2>

//       {cart.items.map((item) => {
//         if (!item.product) return null;

//         return (
//           <div className="invoiceItem" key={item._id}>
//             <img
//               src={`${imageUrl}${item.product.image}`}
//               alt={item.product.name}
//               width="70"
//             />

//             <div className="invoiceDetails">
//               <h4>{item.product.name}</h4>
//               <p>
//                 Rs {item.product.price} × {item.quantity}
//               </p>
//               <strong>
//                 Rs {item.product.price * item.quantity}
//               </strong>
//             </div>
//           </div>
//         );
//       })}

//       <hr />

//       <div className="invoiceSummary">
//         <p>Subtotal: <span>Rs {subTotal}</span></p>
//         <p>GST (5%): <span>Rs {tax}</span></p>
//         <p>Delivery: <span>Rs {deliveryCharge}</span></p>
//         <h3>Total Payable: Rs {finalAmount}</h3>
//       </div>

//       <button className="checkoutBtn">
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default Invoice;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartUrl, imageUrl } from "../repo/api_path";
import { CreditCard } from "lucide-react";

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
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading invoice...
        </p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <h3 className="text-center mt-10 text-gray-500">
        No items for checkout 😕
      </h3>
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        
        {/* Left - Items */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            🧾 Order Summary
          </h2>

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
                  className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
                />

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    ₹ {item.product.price} × {item.quantity}
                  </p>
                </div>

                <div className="font-semibold text-gray-800">
                  ₹ {item.product.price * item.quantity}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right - Price Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 h-fit">
          
          <h3 className="text-lg font-semibold text-gray-800">
            Price Details
          </h3>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹ {tax}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0 ? "Free" : `₹ ${deliveryCharge}`}
              </span>
            </div>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>₹ {finalAmount}</span>
          </div>

          {/* Button */}
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg">
            <CreditCard size={20} />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;