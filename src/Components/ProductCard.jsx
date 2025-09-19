
import React from 'react';
import { Edit, Star } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onSelect, 
  onEdit, 
  isSelected, 
  showCheckbox 
}) {
  const handleCheckboxChange = (e) => {
    if (onSelect) {
      onSelect(product._id, e.target.checked);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(product._id);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Checkbox for selection mode */}
      {showCheckbox && (
        <div className="absolute top-3 left-3 z-10">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
          />
        </div>
      )}

      {/* Edit button */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleEditClick}
          className="p-2 bg-white/90 cursor-pointer hover:bg-white rounded-full shadow-sm border border-gray-200 hover:border-orange-300 transition-colors"
          title="Edit Product"
        >
          <Edit className="w-6 h-6 text-gray-600 hover:text-orange-500" />
        </button>
      </div>

      {/* Product Image */}
      <div className="h-64 bg-gray-100 rounded-t-lg overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]?.url}
            alt={product.description || 'Product'}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {product.description || 'No description available'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {product.category || 'No category'}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">
              ₹{product.sellingPrice || 'N/A'}
            </span>
            {product.displayMRP && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.displayMRP}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Color: {product.color || 'N/A'}
          </span>
          {product.availableSizes && product.availableSizes.length > 0 && (
            <span className="text-gray-500">
              Sizes: {product.availableSizes.join(', ')}
            </span>
          )}
        </div>

        {product.designPattern && (
          <div className="text-sm text-gray-500">
            Pattern: {product.designPattern}
          </div>
        )}
      </div>
    </div>
  );
}