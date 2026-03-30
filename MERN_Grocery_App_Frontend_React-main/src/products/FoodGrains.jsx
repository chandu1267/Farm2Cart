// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { cartUrl, imageUrl, productUrl } from '../repo/api_path'
// import { Link } from 'react-router-dom'
// import useAuthStore from '../store/useAuthStore'

// const FoodGrains = () => {
//     const [grains, setGrains] = useState([])
//     const [unitPrice, setUnitPrice] = useState({});
//     const [quantity] = useState(1);

//     const { incrementCart } = useAuthStore()

//     const fruitHandler = async () => {
//         try {
//             const res = await axios.get(`${productUrl}/search?category=food-grains`)
//             console.log(res.data.data)
//             setGrains(res.data.data)
//         } catch (error) {
//             console.error(error.message)
//         }
//     }

//     useEffect(() => {
//         fruitHandler()
//     }, [])

//     const handleUnitChange = (productId, unit, basePrice) => {
//         let price = basePrice;

//         if (unit === "500g") price = basePrice / 2;
//         if (unit === "2kg") price = basePrice * 2;
//         if (unit === "5kg") price = basePrice * 5;

//         setUnitPrice((prev) => ({
//             ...prev,
//             [productId]: price,
//         }));
//     };

//       const cartHandler = async (productId, quantity) => {
//     const userToken = localStorage.getItem("userToken");

//     try {
//       await axios.post(
//         `${cartUrl}/add-to-cart`,
//         { productId, quantity },
//         {
//           headers: { Authorization: `Bearer ${userToken}` },
//         }
//       );

//       alert("Product added to cart");
//       incrementCart(quantity);
//     } catch (error) {
//       alert("Please login to buy the products");
//     }
//   };

//     return (
//      <div className="containerSection">
//         <div className="itemTitle">Category: <span>Food Grains</span> </div>
//            <div className='productSection'>
//             {grains.map((product) => {
//                 return (
//                     <section className="proSection" key={product._id}>
//                         <Link to={`/single/${product._id}`}>
//                             <div className="proImage">
//                                 <img src={`${imageUrl}${product.image}`} alt={product.name} />
//                                 <h3 className="proName">{product.name}</h3>
//                             </div>
//                         </Link>

//                         <div className="proSub">
//                             <select
//                                 className="proSelect"
//                                 onChange={(e) =>
//                                     handleUnitChange(
//                                         product._id,
//                                         e.target.value,
//                                         product.price
//                                     )
//                                 }
//                             >
//                                 {/* <option value="500g">500g</option> */}
//                                 <option value="1kg">1kg</option>
//                                 <option value="2kg">2kg</option>
//                                 <option value="5kg">5kg</option>
//                             </select>

//                             <h3 className="proPrice">
//                                 Rs {unitPrice[product._id] ?? product.price}
//                             </h3>
//                         </div>

//                         <button
//                             className="proButton"
//                             onClick={() => cartHandler(product._id, quantity)}
//                         >
//                             Add to Cart
//                         </button>
//                     </section>
//                 )
//             })}
//         </div>
//      </div>
//     )
// }

// export default FoodGrains




import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl, productUrl } from "../repo/api_path";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { ShoppingCart } from "lucide-react";

const FoodGrains = () => {
  const [grains, setGrains] = useState([]);
  const [unitPrice, setUnitPrice] = useState({});
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { incrementCart } = useAuthStore();

  const fetchGrains = async () => {
    try {
      const res = await axios.get(
        `${productUrl}/search?category=food-grains`
      );
      setGrains(res.data.data || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrains();
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

      alert("Product added to cart");
      incrementCart(quantity);
    } catch (error) {
      alert("Please login to buy the products");
    }
  };

  // ⏳ Loading
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading Food Grains...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      
      {/* 🔥 Category Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          🌾 Food Grains
        </h2>
        <p className="text-sm text-gray-500">
          Healthy grains for your daily needs
        </p>
      </div>

      {/* 🛒 Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {grains.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            
            {/* Image */}
            <Link to={`/single/${product._id}`}>
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src={`${imageUrl}${product.image}`}
                  alt={product.name}
                  className="h-full object-contain hover:scale-110 transition"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="p-4 space-y-3">
              
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <select
                  className="border px-2 py-1 rounded-md text-sm"
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

                <span className="text-green-600 font-bold text-lg">
                  ₹ {unitPrice[product._id] ?? product.price}
                </span>
              </div>

              <button
                onClick={() => cartHandler(product._id, quantity)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ❌ Empty */}
      {grains.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No food grains available 😕
        </div>
      )}
    </div>
  );
};

export default FoodGrains;