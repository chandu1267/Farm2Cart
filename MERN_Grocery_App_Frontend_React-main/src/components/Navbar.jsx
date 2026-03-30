// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import useAuthStore from "../store/useAuthStore";
// import useSearchStore from "../store/useSearchStore";

// const Navbar = () => {
//   const { isLoggedIn, user, logout, initializeAuth, cartCount } =
//     useAuthStore();

//   const { search, setSearch } = useSearchStore();

//   useEffect(() => {
//     initializeAuth();
//   }, []);

//   return (
  
//       <div className="navSection ">
//         <Link to="/">
//           <div className="title">Small Basket</div>
//         </Link>

//         {/* 🔍 GLOBAL SEARCH */}
//         <div className="search">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <Link to="/cart">
//           <div className="cart">
//             Cart
//             <span className="text-orange-600 text-2xl">
//               {" "}
//               {cartCount}
//             </span>
//           </div>
//         </Link>

//     <div className="userName">
//   {user && (
//     <>
//       Welcome <span className="userHighlight">{user}</span>
//     </>
//   )}
// </div>


//         <div className="auth">
//           {isLoggedIn ? (
//             <button onClick={logout}>Logout</button>
//           ) : (
//             <Link to="/send-otp">
//               <button>Login</button>
//             </Link>
//           )}
//         </div>
//       </div>

//   );
// };

// export default Navbar;




import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useSearchStore from "../store/useSearchStore";

const Navbar = () => {
  const { isLoggedIn, user, logout, initializeAuth, cartCount } =
    useAuthStore();

  const { search, setSearch } = useSearchStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="text-xl font-bold text-green-600 cursor-pointer">
            Small Basket
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          
          {/* Cart */}
          <Link to="/cart" className="relative">
            <div className="text-gray-700 font-medium hover:text-green-600">
              Cart
            </div>

            {/* Cart Count Badge */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          {user && (
            <div className="hidden md:block text-sm text-gray-600">
              Welcome{" "}
              <span className="font-semibold text-green-600">
                {user}
              </span>
            </div>
          )}

          {/* Auth Button */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link to="/send-otp">
                <button className="px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>
    </nav>
  );
};

export default Navbar;