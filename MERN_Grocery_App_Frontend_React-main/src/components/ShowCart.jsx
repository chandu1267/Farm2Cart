// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { cartUrl, imageUrl } from "../repo/api_path";
// import useAuthStore from "../store/useAuthStore";
// import Checkout from "./Checkout";

// const ShowCart = () => {
//   const [cartDetail, setCartDetail] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const {setCartCount}= useAuthStore()

//   const cartHandler = async () => {
//     const userToken = localStorage.getItem("userToken");

//     try {
//       const res = await axios.get(`${cartUrl}/details`, {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//         },
//       });

//       setCartDetail(res.data.cart);
//       setCartCount(res.data.cart.items.length ||0)
//       setLoading(false);

//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     cartHandler();
//   }, []);

//   const deleteHandler=async(productId)=>{
//     const userToken = localStorage.getItem("userToken")
//     try {
//         const res = await axios.delete(`${cartUrl}/delete/${productId}`,{
//             headers:{
//                 Authorization:`Bearer ${userToken}`
//             }
//         });
//         console.log(res.data)
//         alert("product deleted")
//         cartHandler()
//     } catch (error) {
//         alert(error.message)
//     }
//   }

//   if (loading) return <h3>Loading cart...</h3>;
//   if (!cartDetail || cartDetail.items.length === 0)
//     return <div className="cartEmpty">Your cart is empty</div>;

//   return (
//     <div className="cartContainer">
//       <div className="cartTitle">My Cart</div>

//   {cartDetail.items.map((item) => {
//   if (!item.product) return null; // 👈 KEY LINE

//   return (
//     <div className="cartItem" key={item._id}>
//       <img
//         src={`${imageUrl}${item.product.image}`}
//         alt={item.product.name}
//         width="80"
//       />

//       <div className="subCart">
//         <h4>{item.product.name}</h4>
//         <p>Price: Rs {item.product.price}</p>
//         <p>Quantity: {item.quantity}</p>
//         <p> Rs {item.product.price * item.quantity}</p>
//       <button className="cartDelete"
//       onClick={()=>deleteHandler(item.product._id)}
//       >Delete</button>
//       </div>
     
//     </div>
//   );
// })}
//     <Checkout />
//     </div>
//   );
// };

// export default ShowCart;





import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import Checkout from "./Checkout";
import { Trash2 } from "lucide-react";

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

      alert("Product removed");
      cartHandler();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        Loading cart...
      </div>
    );
  }

  if (!cartDetail || cartDetail.items.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        🛒 Your cart is empty
      </div>
    );
  }

  // 💰 Total Calculation
  const total = cartDetail.items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        
        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">My Cart</h2>

          {cartDetail.items.map((item) => {
            if (!item.product) return null;

            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-4 flex gap-4 items-center"
              >
                {/* Image */}
                <img
                  src={`${imageUrl}${item.product.image}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    ₹ {item.product.price} × {item.quantity}
                  </p>
                  <p className="font-semibold text-green-600">
                    ₹ {item.product.price * item.quantity}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteHandler(item.product._id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit space-y-4 sticky top-20">
          
          <h3 className="text-lg font-semibold text-gray-800">
            Price Summary
          </h3>

          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span>{cartDetail.items.length}</span>
          </div>

          <div className="flex justify-between text-gray-600">
            <span>Total Price</span>
            <span>₹ {total}</span>
          </div>

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Payable</span>
            <span>₹ {total}</span>
          </div>

          {/* Checkout Button */}
          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default ShowCart;