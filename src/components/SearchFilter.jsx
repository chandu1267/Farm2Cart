import React from "react";
import { FaFilter, FaSortAmountDown } from "react-icons/fa";

const SearchFilter = ({
  category,
  setCategory,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 justify-between">

      {/* Left Title */}
      <div className="flex items-center gap-2 text-gray-700 font-semibold">
        <FaFilter />
        Filters
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
        </select>

        {/* Sort By */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>

        {/* Order */}
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="desc">High → Low</option>
          <option value="asc">Low → High</option>
        </select>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <FaSortAmountDown />
        <span>Sort & Filter</span>
      </div>

    </div>
  );
};

export default SearchFilter;