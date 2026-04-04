import React, { useEffect, useState } from "react";
import axios from "axios";
import { productUrl, imageUrl, cartUrl } from "../repo/api_path";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useSearchStore from "../store/useSearchStore";
import SearchFilter from "./SearchFilter";
import { FaShoppingCart } from "react-icons/fa";
import image1 from "../assets/react.svg";

const ShowProducts = () => {
  const [showProducts, setShowProducts] = useState([]);
  const [unitPrice, setUnitPrice] = useState({});
  const [quantity] = useState(1);

  const { search } = useSearchStore();

  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const { incrementCart } = useAuthStore();

  // ✅ SINGLE API HANDLER
  const fetchProducts = async () => {
    try {
      let res;

      if (category === "All" && !search) {
        res = await axios.get(`${productUrl}/all-products`);
        setShowProducts(res.data.products);
      } else {
        res = await axios.get(`${productUrl}/search`, {
          params: {
            search,
            category: category === "All" ? "" : category,
            sortBy,
            order,
            page: 1,
            limit: 10,
          },
        });

        setShowProducts(res.data.data || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sortBy, order]);

  const handleUnitChange = (productId, unit, basePrice) => {
    let price = basePrice;

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
        },
      );

      incrementCart(quantity);
      alert("Added to cart 🛒");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6">
        <SearchFilter
          category={category}
          setCategory={setCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {showProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            {/* Image */}
            <Link to={`/single/${product._id}`}>
              <div className="h-40 flex items-center justify-center bg-gray-50">
                {/* // src={`${imageUrl}${product.image}`} */}
                {/* <img src={`https://farm2cart-backend.onrender.com${product.image}`} alt={product.name}/> */}
                <img src={product.image} alt={image1} />
                {/* <img
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : `https://farm2cart-backend.onrender.com${product.image}`
                  }
                  alt={product.name}
                /> */}
                alt={product.name}
                className="h-full object-contain p-2 hover:scale-105 transition
                duration-300"
              </div>
            </Link>

            {/* Content */}
            <div className="p-3 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <div className="flex items-center justify-between gap-2">
                <select
                  className="text-xs border rounded-md px-2 py-1"
                  onChange={(e) =>
                    handleUnitChange(product._id, e.target.value, product.price)
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
                           hover:bg-green-700 transition duration-300"
              >
                <FaShoppingCart />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProducts;
