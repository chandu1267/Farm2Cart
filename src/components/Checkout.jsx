import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to Checkout 🛒
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6">
          Review your items and proceed to secure checkout.
        </p>

        {/* Button */}
        <Link to="/invoice">
          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-medium text-lg 
                             hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg">
            Proceed to Checkout
          </button>
        </Link>

      </div>

    </div>
  )
}

export default Checkout