// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { productUrl } from "../repo/api_path";

// const CATEGORY_OPTIONS = [
//   "vegetables",
//   "fruits",
//   "food-grains",
//   "meat",
// ];

// const UNIT_OPTIONS = ["500g", "1kg", "2kgs", "5kgs"];

// const AddProduct = () => {
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
//   const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
//   const [isActive, setIsActive] = useState(true);
//   const [image, setImage] = useState(null);

//   const [fileKey, setFileKey] = useState(Date.now());

//   useEffect(() => {
//     console.log("Product API URL:", productUrl);
//   }, []);

//   const productHandler = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("desc", desc);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("unit", unit);
//     formData.append("isActive", isActive);
//     formData.append("image", image);

//     try {
//       const res = await axios.post(
//         `${productUrl}/add-product`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log("API RESPONSE:", res.data);
//       alert("✅ Product added successfully");

//       // reset form
//       setName("");
//       setDesc("");
//       setPrice("");
//       setCategory(CATEGORY_OPTIONS[0]);
//       setUnit(UNIT_OPTIONS[0]);
//       setIsActive(true);
//       setImage(null);
//       setFileKey(Date.now());
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       alert("❌ Failed to add product");
//     }
//   };

//   return (
//     <div className="form-container">
//       <form className="formSection" onSubmit={productHandler}>
//         <h2 className="addTitle">Add Product</h2>

//         <h3>Product Name</h3>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <h3>Description</h3>
//         <input
//           type="text"
//           value={desc}
//           onChange={(e) => setDesc(e.target.value)}
//         />

//         <h3>Price</h3>
//         <input
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />

//        <div className="itemCard">
//          <h3>Category</h3>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{border:"1px solid black"}}
//         >
//           {CATEGORY_OPTIONS.map((item) => (
//             <option key={item} value={item}>
//               {item}
//             </option>
//           ))}
//         </select>

//        </div>
//         {/* <h3>Unit</h3>
//         <select
//           value={unit}
//           onChange={(e) => setUnit(e.target.value)}
//         >
//           {UNIT_OPTIONS.map((u) => (
//             <option key={u} value={u}>
//               {u}
//             </option>
//           ))}
//         </select> */}

//        <div className="itemCard">
//          <h3>Active Product?</h3>
//         <label>
//           <input
//             type="checkbox"
//             checked={isActive}
//             onChange={(e) => setIsActive(e.target.checked)}
//           />
//           Available
//         </label>

//        </div>
//         <h3>Product Image</h3>
//         <input
//           key={fileKey}
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//           required
//         />

//         <button type="submit">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { productUrl } from "../repo/api_path";

const CATEGORY_OPTIONS = [
  "vegetables",
  "fruits",
  "food-grains",
  "meat",
];

const UNIT_OPTIONS = ["500g", "1kg", "2kgs", "5kgs"];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [unit, setUnit] = useState(UNIT_OPTIONS[0]);
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(null);

  const [fileKey, setFileKey] = useState(Date.now());

  useEffect(() => {
    console.log("Product API URL:", productUrl);
  }, []);

  const productHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("unit", unit);
    formData.append("isActive", isActive);
    formData.append("image", image);

    try {
      const res = await axios.post(
        `${productUrl}/add-product`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("API RESPONSE:", res.data);
      alert("✅ Product added successfully");

      setName("");
      setDesc("");
      setPrice("");
      setCategory(CATEGORY_OPTIONS[0]);
      setUnit(UNIT_OPTIONS[0]);
      setIsActive(true);
      setImage(null);
      setFileKey(Date.now());
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={productHandler}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Name
          </label>
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Category & Unit Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Unit
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            Product Availability
          </span>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-green-600"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-600">
              {isActive ? "Available" : "Unavailable"}
            </span>
          </label>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Product Image
          </label>
          <input
            key={fileKey}
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-lg bg-gray-50"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;