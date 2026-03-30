// import React from "react";

// const SearchFilter = ({
//   category,
//   setCategory,
//   sortBy,
//   setSortBy,
//   order,
//   setOrder,
// }) => {
//   return (
//     <div className="filterBar">
//       <select value={category} onChange={(e) => setCategory(e.target.value)}>
//         <option value="">All</option>
//         <option value="fruits">Fruits</option>
//         <option value="vegetables">Vegetables</option>
//       </select>

//       <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//         <option value="createdAt">Newest</option>
//         <option value="price">Price</option>
//         <option value="name">Name</option>
//       </select>

//       <select value={order} onChange={(e) => setOrder(e.target.value)}>
//         <option value="desc">High → Low</option>
//         <option value="asc">Low → High</option>
//       </select>
//     </div>
//   );
// };

// export default SearchFilter;





import React from "react";
import { SlidersHorizontal } from "lucide-react";

const SearchFilter = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Left - Title */}
      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        <SlidersHorizontal size={20} />
        Filters
      </div>

      {/* Right - Controls */}
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
        >
          <option value="">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="food-grains">Food Grains</option>
          <option value="meat">Meat</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>

        {/* Order */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm"
        >
          <option value="desc">High → Low</option>
          <option value="asc">Low → High</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;