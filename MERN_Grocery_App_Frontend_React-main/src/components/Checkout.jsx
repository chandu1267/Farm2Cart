
// import React from 'react'
// import { Link } from 'react-router-dom'

// const Checkout = () => {
//   return (
//     <div className="checkoutBox">
//       <Link to="/invoice">
//         <button className="checkoutBtn">
//           Proceed to Checkout
//         </button>
//       </Link>
//     </div>
//   )
// }

// export default Checkout



import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Checkout = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 p-6">
      
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">
          Ready to place your order?
        </h2>

        <p className="text-sm text-gray-500">
          Review your items and proceed to checkout securely.
        </p>

        {/* Button */}
        <Link to="/invoice">
          <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-lg">
            <ShoppingCart size={20} />
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;