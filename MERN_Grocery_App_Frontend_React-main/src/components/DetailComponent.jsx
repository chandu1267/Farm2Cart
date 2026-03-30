// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { productUrl, imageUrl, cartUrl } from "../repo/api_path";
// import useAuthStore from "../store/useAuthStore";

// const DetailComponent = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const { isLoggedIn, incrementCart } = useAuthStore();

//   // ==========================
//   // Fetch Single Product
//   // ==========================
//   const singleHandler = async () => {
//     try {
//       const res = await axios.get(`${productUrl}/${id}`);
//       setProduct(res.data.record);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     singleHandler();
//   }, [id]);

//   // ==========================
//   // Add To Cart
//   // ==========================
//   const addToCartHandler = async () => {
//     try {
//       if (!isLoggedIn) {
//         alert("Please login first");
//         return;
//       }

//       const token = localStorage.getItem("userToken");

//       const res = await axios.post(
//         `${cartUrl}/add-to-cart`,
//         {
//           productId: product._id,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert(res.data.message);

//       // ✅ Update cart count in navbar
//       incrementCart(1);

//     } catch (error) {
//       console.log(error.response?.data || error.message);
//       alert(error.response?.data?.msg || "Something went wrong");
//     }
//   };

//   // ==========================
//   // UI
//   // ==========================
//   if (loading) return <h2>Loading...</h2>;

//   if (!product) return <h2>Product not found</h2>;

//   return (
//     <div className="detailSection">
//       <div className="imgCont">
//         <img
//           className="singleImage"
//           src={`${imageUrl}${product.image}`}
//           alt={product.name}
//         />
//       </div>

//       <div className="singleDetail">
//         <div className="singleName">
//           {product.name}
//         </div>

//         <div className="singlePrice">
//           Price: {product.price}
//         </div>

//         <div className="singleDesc">
//           Description: {product.desc}
//         </div>

//         <div className="singleBtn">
//           <button
//             className="singleCartBtn"
//             onClick={addToCartHandler}
//           >
//             Add To Cart
//           </button>

//           <button className="singleLaterBtn">
//             Save for later
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailComponent;




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl, imageUrl, cartUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import { ShoppingCart, Heart } from "lucide-react";

const DetailComponent = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, incrementCart } = useAuthStore();

  // Fetch Product
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

  // Add To Cart
  const addToCartHandler = async () => {
    try {
      if (!isLoggedIn) {
        alert("Please login first");
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

      alert(res.data.message);
      incrementCart(1);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.msg || "Something went wrong");
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-gray-500 text-lg">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return <h2 className="text-center mt-10">Product not found</h2>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-8">
        
        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
          <img
            src={`${imageUrl}${product.image}`}
            alt={product.name}
            className="max-h-80 object-contain hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-5">
          
          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-800">
            {product.name}
          </h1>

          {/* Price */}
          <div className="text-2xl font-semibold text-green-600">
            ₹ {product.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.desc}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            
            {/* Add to Cart */}
            <button
              onClick={addToCartHandler}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Save for later */}
            <button className="flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition">
              <Heart size={20} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;