// import React from 'react'
// import { Link } from 'react-router-dom'

// const SearchComp = () => {
//   return (
//     <div className='shopSection'>
//         <div className="shopTitle">
//             Shop by Items
//         </div>
//         <ul>
//             <Link to="/all-products">
//             <li>All Products</li>
//             </Link>
//             <Link to="/fruit-products">
//             <li>Fruits</li>
//             </Link>
//             <Link to="/vegetables">
//             <li>Vegetables</li>
//             </Link>
//             <Link to="/food-grains">
//             <li>Food Grains</li>
//             </Link>
//         </ul>
//     </div>
//   )
// }

// export default SearchComp



import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Apple, Leaf, Wheat } from "lucide-react";

const categories = [
  {
    name: "All Products",
    path: "/all-products",
    icon: <ShoppingBag size={28} />,
  },
  {
    name: "Fruits",
    path: "/fruit-products",
    icon: <Apple size={28} />,
  },
  {
    name: "Vegetables",
    path: "/vegetables",
    icon: <Leaf size={28} />,
  },
  {
    name: "Food Grains",
    path: "/food-grains",
    icon: <Wheat size={28} />,
  },
];

const SearchComp = () => {
  return (
    <div className="bg-gray-100 py-8 px-4">
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Shop by Categories
      </h2>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
        
        {categories.map((item, index) => (
          <Link to={item.path} key={index}>
            
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer group">
              
              {/* Icon */}
              <div className="text-green-600 mb-3 group-hover:scale-110 transition">
                {item.icon}
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition">
                {item.name}
              </p>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchComp;