// import React, { useState } from "react";
// import { Star } from "lucide-react";

// const ProductCard = ({ product, onSelect, isSelected }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const imageCount = 3;
//   console.log(product, "coming products");

//   return (
//     <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 relative">
//       {/* Checkbox for selection */}
//       <div className="absolute top-2 left-2">
//         <input
//           type="checkbox"
//           checked={isSelected}
//           onChange={(e) => onSelect(product.id, e.target.checked)}
//           className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//         />
//       </div>

//       {/* Product Image with Status Badge */}
//       <div className="relative">
//         <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//           <img
//             src={
//               product.images && product.images.length > 0
//                 ? product.images[0].url
//                 : ""
//             }
//             alt={
//               product.images && product.images.length > 0
//                 ? product.images[0].altText
//                 : "Product Image"
//             }
//             className="max-w-full max-h-full object-contain"
//           />
//         </div>

//         <div
//           className={`absolute top-3 left-3 ${product.statusColor} text-white px-2 py-1 rounded text-xs font-medium`}
//         >
//           {product.status}
//         </div>

//         <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
//           {Array.from({ length: imageCount }).map((_, index) => (
//             <button
//               key={index}
//               className={`w-2 h-2 rounded-full ${
//                 index === currentImageIndex
//                   ? "bg-white"
//                   : "bg-white bg-opacity-50"
//               }`}
//               onClick={() => setCurrentImageIndex(index)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="p-4">
//         <h3 className="text-sm font-medium text-gray-900 mb-2">
//           {product.description}
//         </h3>
//         <div className="flex items-center mb-3"></div>
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-400 line-through">
//             {product.displayMRP}
//           </span>
//           <span className="text-lg font-bold text-red-600">
//             {product.sellingPrice}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useState } from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product, onSelect, isSelected, showCheckbox }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageCount = product.images ? product.images.length : 0;

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onSelect(product._id, e.target.checked);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 relative">
      {/* Checkbox for selection, only shown in selection mode */}
      {showCheckbox && (
        <div className="absolute top-2 left-2 z-10">
          <input
            type="checkbox"
            checked={isSelected || false}
            onChange={handleCheckboxChange}
            className="h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
          />
        </div>
      )}

      {/* Product Image with Status Badge */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[currentImageIndex]?.url || product.images[0].url}
              alt={product.images[currentImageIndex]?.altText || product.images[0].altText || "Product Image"}
              className="max-w-full max-h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-sm">No Image</div>
          )}
        </div>

        {/* Status Badge */}
        {product.status && (
          <div
            className={`absolute top-3 right-3 ${
              product.statusColor || 'bg-gray-500'
            } text-white px-2 py-1 rounded text-xs font-medium`}
          >
            {product.status}
          </div>
        )}

        {/* Image Navigation Dots */}
        {imageCount > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {Array.from({ length: imageCount }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex
                    ? "bg-white"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {product.description || product.name || 'Product Name'}
        </h3>
        
        {/* Rating section - you can uncomment if you have rating data */}
        {/* 
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-500">({product.reviewCount || 0})</span>
        </div>
        */}
        
        <div className="flex items-center space-x-2">
          {product.displayMRP && (
            <span className="text-sm text-gray-400 line-through">
              {product.displayMRP}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">
            {product.sellingPrice || product.price || 'Price not available'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;