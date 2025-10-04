

// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard";
// import AddProductContent from "./AddProductContent";

// export default function ProductsContent() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [selectionMode, setSelectionMode] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   // Fetch products on mount and after operations
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("https://sumaya-backend.onrender.com/api/products");
//       if (!response.ok) throw new Error("Failed to fetch products");
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Handle selection toggling per product checkbox
//   const handleSelectProduct = (productId, isChecked) => {
//     setSelectedProducts((prev) => {
//       const newSet = new Set(prev);
//       if (isChecked) {
//         newSet.add(productId);
//       } else {
//         newSet.delete(productId);
//       }
//       return newSet;
//     });
//   };

//   // Handle edit product
//   const handleEditProduct = async (productId) => {
//     try {
//       setLoading(true);
//       const response = await fetch(`https://sumaya-backend.onrender.com/api/products/${productId}`);
//       if (!response.ok) throw new Error("Failed to fetch product details");
//       const productData = await response.json();
      
//       setEditingProduct(productData);
//       setEditMode(true);
//     } catch (error) {
//       console.error("Error fetching product for edit:", error);
//       alert("Failed to load product details for editing");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle cancel edit
//   const handleCancelEdit = () => {
//     setEditMode(false);
//     setEditingProduct(null);
//   };

//   // Handle product saved
//   const handleProductSaved = () => {
//     fetchProducts(); // Refresh the products list
//     setEditMode(false);
//     setEditingProduct(null);
//   };

//   // Handle main select/delete button click
//   const handleMainButtonClick = async () => {
//     if (!selectionMode) {
//       // Enter selection mode
//       setSelectionMode(true);
//       setSelectedProducts(new Set());
//     } else {
//       // Delete mode - confirm and delete selected products
//       if (selectedProducts.size === 0) {
//         alert("Please select at least one product to delete.");
//         return;
//       }
//       if (
//         window.confirm(
//           `Are you sure you want to delete ${selectedProducts.size} product(s)?`
//         )
//       ) {
//         setLoading(true);
//         try {
//           const deletePromises = Array.from(selectedProducts).map(
//             async (id) => {
//               const response = await fetch(
//                 `https://sumaya-backend.onrender.com/api/products/delete/${id}`,
//                 {
//                   method: "DELETE",
//                 }
//               );
//               if (!response.ok)
//                 throw new Error(`Failed to delete product ${id}`);
//             }
//           );
//           await Promise.all(deletePromises);

//           // Refresh product list and reset state
//           await fetchProducts();
//           setSelectedProducts(new Set());
//           setSelectionMode(false);
//           alert("Selected products deleted successfully!");
//         } catch (error) {
//           console.error("Error deleting products:", error);
//           alert("Failed to delete some or all products.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     }
//   };

//   // Cancel selection mode button handler
//   const handleCancelSelection = () => {
//     setSelectionMode(false);
//     setSelectedProducts(new Set());
//   };

//   // If in edit mode, show the AddProductContent component
//   if (editMode) {
//     return (
//       <AddProductContent
//         editingProduct={editingProduct}
//         onCancelEdit={handleCancelEdit}
//         onProductSaved={handleProductSaved}
//       />
//     );
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="animate-pulse">
//           <div className="flex items-center justify-between mb-6">
//             <div className="h-8 bg-gray-200 rounded w-32"></div>
//             <div className="h-10 bg-gray-200 rounded w-32"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div
//                 key={i}
//                 className="bg-white rounded-lg border border-gray-200"
//               >
//                 <div className="h-64 bg-gray-200"></div>
//                 <div className="p-4 space-y-3">
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main products list view
//   return (
//     <>
//     <div className="flex items-center justify-between sticky p-6 top-16 left-0 w-full bg-white p-4 z-50 shadow-md">
//         <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//         <div className="flex space-x-4">
//           {selectionMode && (
//             <button
//               onClick={handleCancelSelection}
//               disabled={loading}
//               className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             onClick={handleMainButtonClick}
//             disabled={loading}
//             className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : selectionMode
//                 ? selectedProducts.size === 0
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-600 hover:bg-red-700 text-white"
//                 : "bg-orange-500 hover:bg-orange-600 text-white"
//             }`}
//           >
//             {selectionMode ? "Delete Selected" : "Select"}
//           </button>
//         </div>
//       </div>
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onSelect={handleSelectProduct}
//             onEdit={handleEditProduct}
//             isSelected={selectedProducts.has(product._id)}
//             showCheckbox={selectionMode}
//           />
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found</p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import AddProductContent from "./AddProductContent";

export default function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterType, setFilterType] = useState("none");

  // Helper: normalize a value (string like "₹1,200" or "1,200" or numbers) to a numeric value
  const toNumber = (val) => {
    if (val == null) return 0;
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string") {
      // remove anything except digits, dot and minus (handles "₹1,200.50" -> "1200.50")
      const cleaned = val.replace(/[^\d.-]+/g, "");
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    }
    // if object (e.g., { amount: 1200 } ), try common keys
    if (typeof val === "object") {
      const maybe = val.amount ?? val.value ?? val.price ?? val.mrp ?? 0;
      return toNumber(maybe);
    }
    return 0;
  };

 const getPriceValue = (product) =>
  toNumber(product?.sellingPrice ?? product?.displayMRP ?? 0);


  const getRatingValue = (product) =>
    toNumber(product?.rating ?? product?.avgRating ?? product?.ratingValue);

  // Fetch products on mount and after operations
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://sumaya-backend.onrender.com/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      console.log(data,"dataa")
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle selection toggling per product checkbox
  const handleSelectProduct = (productId, isChecked) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (isChecked) newSet.add(productId);
      else newSet.delete(productId);
      return newSet;
    });
  };

  // Handle edit product
  const handleEditProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await fetch(`https://sumaya-backend.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error("Failed to fetch product details");
      const productData = await response.json();

      setEditingProduct(productData);
      setEditMode(true);
      
    } catch (error) {
      console.error("Error fetching product for edit:", error);
      alert("Failed to load product details for editing");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingProduct(null);
  };

  // Handle product saved
  const handleProductSaved = () => {
    fetchProducts(); // Refresh the products list
    setEditMode(false);
    setEditingProduct(null);
  };

  // Handle main select/delete button click
  const handleMainButtonClick = async () => {
    if (!selectionMode) {
      setSelectionMode(true);
      setSelectedProducts(new Set());
    } else {
      if (selectedProducts.size === 0) {
        alert("Please select at least one product to delete.");
        return;
      }
      if (window.confirm(`Are you sure you want to delete ${selectedProducts.size} product(s)?`)) {
        setLoading(true);
        try {
          const deletePromises = Array.from(selectedProducts).map(async (id) => {
            const response = await fetch(
              `https://sumaya-backend.onrender.com/api/products/delete/${id}`,
              { method: "DELETE" }
            );
            if (!response.ok) throw new Error(`Failed to delete product ${id}`);
          });
          await Promise.all(deletePromises);
          await fetchProducts();
          setSelectedProducts(new Set());
          setSelectionMode(false);
          alert("Selected products deleted successfully!");
        } catch (error) {
          console.error("Error deleting products:", error);
          alert("Failed to delete some or all products.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedProducts(new Set());
  };

  // Filtering & sorting logic (robust numeric parsing)
  useEffect(() => {
    let sorted = [...products];

    switch (filterType) {
      case "articleNumber":
        sorted.sort((a, b) =>
          String(a.articleNumber ?? "").localeCompare(String(b.articleNumber ?? ""), undefined, {
            numeric: true,
            sensitivity: "base",
          })
        );
        break;

      case "priceLowHigh":
        sorted.sort((a, b) => getPriceValue(a) - getPriceValue(b));
        break;

      case "priceHighLow":
        sorted.sort((a, b) => getPriceValue(b) - getPriceValue(a));
        break;

      case "ratingHighLow":
        sorted.sort((a, b) => getRatingValue(b) - getRatingValue(a));
        break;

      case "ratingLowHigh":
        sorted.sort((a, b) => getRatingValue(a) - getRatingValue(b));
        break;

      default:
        sorted = [...products];
        break;
    }

    setFilteredProducts(sorted);
  }, [filterType, products]);

  // If in edit mode
  if (editMode) {
    return (
      <AddProductContent
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
        onProductSaved={handleProductSaved}
      />
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main products list view
  return (
    <>
      <div className="flex items-center justify-between sticky p-6 top-16 left-0 w-full bg-white z-50 shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>

        <div className="flex space-x-4 items-center">
          {/* Filter Dropdown */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="none">Sort / Filter</option>
            <option value="articleNumber">Article Number (A–Z)</option>
            <option value="priceLowHigh">Price: Low → High</option>
            <option value="priceHighLow">Price: High → Low</option>
            <option value="ratingHighLow">Rating: High → Low</option>
            <option value="ratingLowHigh">Rating: Low → High</option>
          </select>

          {selectionMode && (
            <button
              onClick={handleCancelSelection}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleMainButtonClick}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : selectionMode
                ? selectedProducts.size === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {selectionMode ? "Delete Selected" : "Select"}
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onSelect={handleSelectProduct}
              onEdit={handleEditProduct}
              isSelected={selectedProducts.has(product._id)}
              showCheckbox={selectionMode}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>
    </>
  );
}
