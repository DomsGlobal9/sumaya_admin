// import React, { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import { Star } from 'lucide-react';

// export default function ProductsContent() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://sumaya-backend.onrender.com/api/products');
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSelectProduct = (productId, isChecked) => {
//     setSelectedProducts(prev => {
//       const newSet = new Set(prev);
//       if (isChecked) {
//         newSet.add(productId);
//       } else {
//         newSet.delete(productId);
//       }
//       return newSet;
//     });
//   };

//   const handleRemoveSelected = async () => {
//     if (selectedProducts.size === 0) {
//       alert('Please select at least one product to remove.');
//       return;
//     }

//     if (window.confirm(`Are you sure you want to delete ${selectedProducts.size} product(s)?`)) {
//       setLoading(true);
//       try {
//         const deletePromises = Array.from(selectedProducts).map(async (id) => {
//           const response = await fetch(`https://sumaya-backend.onrender.com/api/products/delete${id}`, {
//             method: 'DELETE',
//           });
//           if (!response.ok) throw new Error(`Failed to delete product ${id}`);
//         });
//         await Promise.all(deletePromises);

//         // Refresh products list
//         const response = await fetch('https://sumaya-backend.onrender.com/api/products');
//         const data = await response.json();
//         setProducts(data);
//         setSelectedProducts(new Set());
//         alert('Selected products deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting products:', error);
//         alert('Failed to delete some or all products.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         <div className="animate-pulse">
//           <div className="flex items-center justify-between mb-6">
//             <div className="h-8 bg-gray-200 rounded w-32"></div>
//             <div className="h-10 bg-gray-200 rounded w-32"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[1, 2, 3].map(i => (
//               <div key={i} className="bg-white rounded-lg border border-gray-200">
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

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//         <button
//           onClick={handleRemoveSelected}
//           disabled={loading || selectedProducts.size === 0}
//           className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//             loading || selectedProducts.size === 0
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-orange-500 hover:bg-orange-600 text-white'
//           }`}
//         >
//           {loading ? 'Removing...' : 'Select & Remove'}
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onSelect={handleSelectProduct}
//             isSelected={selectedProducts.has(product._id)}
//           />
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found</p>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import ProductCard from "./ProductCard"; // Assuming ProductCard supports checkbox and onSelect props

// export default function ProductsContent() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [selectionMode, setSelectionMode] = useState(false); // Track if selection mode is active

//   // Fetch products on mount and after delete
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch("https://sumaya-backend.onrender.com/api/products");
//         if (!response.ok) throw new Error("Failed to fetch products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
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

//   // Handle main select/delete button click
//   const handleMainButtonClick = async () => {
//     if (!selectionMode) {
//       // Enter selection mode
//       setSelectionMode(true);
//       setSelectedProducts(new Set()); // clear selection
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
//                 `https://sumaya-backend.onrender.com/api/products/delete${id}`,
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
//           const response = await fetch("https://sumaya-backend.onrender.com/api/products");
//           const data = await response.json();
//           setProducts(data);
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

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       <div className="flex items-center justify-between">
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

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onSelect={handleSelectProduct}
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
//   );
// }


import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Assuming ProductCard supports checkbox and onSelect props

export default function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [selectionMode, setSelectionMode] = useState(false); // Track if selection mode is active

  // Fetch products on mount and after delete
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://sumaya-backend.onrender.com/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle selection toggling per product checkbox
  const handleSelectProduct = (productId, isChecked) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  // Handle main select/delete button click
  const handleMainButtonClick = async () => {
    if (!selectionMode) {
      // Enter selection mode
      setSelectionMode(true);
      setSelectedProducts(new Set()); // clear selection
    } else {
      // Delete mode - confirm and delete selected products
      if (selectedProducts.size === 0) {
        alert("Please select at least one product to delete.");
        return;
      }
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedProducts.size} product(s)?`
        )
      ) {
        setLoading(true);
        try {
          const deletePromises = Array.from(selectedProducts).map(
            async (id) => {
              // Fixed: Added missing slash between 'delete' and id
              const response = await fetch(
                `https://sumaya-backend.onrender.com/api/products/delete/${id}`,
                {
                  method: "DELETE",
                }
              );
              if (!response.ok)
                throw new Error(`Failed to delete product ${id}`);
            }
          );
          await Promise.all(deletePromises);

          // Refresh product list and reset state
          const response = await fetch("https://sumaya-backend.onrender.com/api/products");
          const data = await response.json();
          setProducts(data);
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

  // Cancel selection mode button handler
  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedProducts(new Set());
  };

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
              <div
                key={i}
                className="bg-white rounded-lg border border-gray-200"
              >
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

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex space-x-4">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onSelect={handleSelectProduct}
            isSelected={selectedProducts.has(product._id)}
            showCheckbox={selectionMode}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
}