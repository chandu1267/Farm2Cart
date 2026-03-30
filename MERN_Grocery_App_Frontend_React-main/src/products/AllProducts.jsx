// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { cartUrl, imageUrl, productUrl } from '../repo/api_path'
// import { Link } from 'react-router-dom'
// import useAuthStore from '../store/useAuthStore'
// import useSearchStore from '../store/useSearchStore'

// const AllProducts = () => {
//     const [basket, setBasket] = useState([])
//     const [unitPrice, setUnitPrice] = useState({});
//     const [quantity] = useState(1);

//     const {incrementCart} = useAuthStore()
//     const {search} = useSearchStore()

//     const productHandler = async () => {
//         try {
//             const res = await axios.get(`${productUrl}/all-products`)
//             console.log(res.data.products)
//             setBasket(res.data.products)
//         } catch (error) {
//             console.error(error.message)
//         }
//     }

//     useEffect(() => {
//         productHandler()
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

//   const filteredProducts = basket.filter((product)=>{
//    return product.name.toLowerCase().includes(search.toLowerCase())
//   })

//   console.log("Search:", search);


//     return (
//         <div className='productSection'>
//             {filteredProducts.map((product) => {
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
//     )
// }

// export default AllProducts




import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl, productUrl } from "../repo/api_path";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useSearchStore from "../store/useSearchStore";
import { ShoppingCart } from "lucide-react";

const AllProducts = () => {
  const [basket, setBasket] = useState([]);
  const [unitPrice, setUnitPrice] = useState({});
  const [quantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { incrementCart } = useAuthStore();
  const { search } = useSearchStore();

  const productHandler = async () => {
    try {
      const res = await axios.get(`${productUrl}/all-products`);
      setBasket(res.data.products || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productHandler();
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

  // 🔍 Search Filter
  const filteredProducts = basket.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-6">
      
      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {filteredProducts.map((product) => (
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

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No products found 😕
        </div>
      )}
    </div>
  );
};

export default AllProducts;