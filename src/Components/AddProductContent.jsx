import React, { useState, useEffect } from 'react';
import { Plus, Upload, CheckCircle, AlertCircle, ArrowLeft, X } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";

export default function AddProductContent({ 
  editingProduct = null, 
  onCancelEdit = null, 
  onProductSaved = null 
}) {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    designPattern: '',
    color: '',
    availableSizes: [],
    sellingPrice: '',
    sellerCommission: '',
    displayMRP: '',
  });

  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      console.log('Loading product for edit:', editingProduct);
      console.log('Product images raw:', editingProduct.images);
      
      setIsEditMode(true);
      setFormData({
        category: editingProduct.category || '',
        description: editingProduct.description || '',
        designPattern: editingProduct.designPattern || '',
        color: editingProduct.color || '',
        availableSizes: editingProduct.availableSizes || [],
        sellingPrice: editingProduct.sellingPrice || '',
        sellerCommission: editingProduct.sellerCommission || '',
        displayMRP: editingProduct.displayMRP || '',
      });
      
      // Handle existing images - extract URLs from objects or strings
      let images = [];
      if (editingProduct.images && Array.isArray(editingProduct.images)) {
        images = editingProduct.images.map(img => {
          // If img is an object with url property (your schema structure)
          if (typeof img === 'object' && img !== null && img.url) {
            return img.url;
          }
          // If img is already a string URL (fallback for legacy data)
          if (typeof img === 'string') {
            return img;
          }
          return null;
        }).filter(url => url && typeof url === 'string' && url.length > 0);
      }
      
      console.log('Processed images:', images);
      setExistingImages(images);
      setImageFiles([null, null, null, null]);
    } else {
      resetForm();
    }
  }, [editingProduct]);

  const resetForm = () => {
    setIsEditMode(false);
    setFormData({
      category: '',
      description: '',
      designPattern: '',
      color: '',
      availableSizes: [],
      sellingPrice: '',
      sellerCommission: '',
      displayMRP: '',
    });
    setImageFiles([null, null, null, null]);
    setExistingImages([]);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      availableSizes: prev.availableSizes.includes(size)
        ? prev.availableSizes.filter(s => s !== size)
        : [...prev.availableSizes, size],
    }));
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showNotification('Please select only image files', 'error');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Image size should be less than 5MB', 'error');
        return;
      }
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
    }
  };

  // NEW FUNCTION: Handle image deletion
  const handleImageDelete = (index) => {
    // Remove the uploaded file
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);
    
    // If in edit mode, also remove the existing image from that position
    if (isEditMode) {
      const newExistingImages = [...existingImages];
      newExistingImages[index] = null;
      setExistingImages(newExistingImages);
    }
    
    showToast('Image removed successfully', 'success');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after 4 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const validateForm = () => {
    const requiredFields = [
      'category',
      'description',
      'designPattern',
      'color',
      'sellingPrice',
      'sellerCommission',
      'displayMRP',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        showNotification(`${field.replace(/([A-Z])/g, ' $1')} is required`, 'error');
        return false;
      }
    }

    if (formData.availableSizes.length === 0) {
      showNotification('Please select at least one size', 'error');
      return false;
    }

    // For new products, require at least one image
    if (!isEditMode) {
      const hasImages = imageFiles.some(file => file !== null);
      if (!hasImages) {
        showNotification('Please upload at least one product image', 'error');
        return false;
      }
    }

    // For edit mode, ensure at least one image (existing or new)
    if (isEditMode) {
      const hasExisting = existingImages.some(img => img !== null);
      const hasNew = imageFiles.some(file => file !== null);
      if (!hasExisting && !hasNew) {
        showNotification('Please upload at least one product image', 'error');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const submitData = new FormData();

      // Add form data
      Object.keys(formData).forEach(key => {
        if (key === 'availableSizes') {
          submitData.append(key, formData[key].join(','));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Handle image updates for edit mode (send kept and new positions)
      if (isEditMode) {
        const keptPositions = [];
        const newPositions = [];
        imageFiles.forEach((file, i) => {
          if (file) {
            newPositions.push(i);
          } else if (existingImages[i]) {
            keptPositions.push({ position: i, url: existingImages[i] });
          }
        });
        submitData.append('keptPositions', JSON.stringify(keptPositions));
        submitData.append('newPositions', JSON.stringify(newPositions));
      }

      // Add new images if any (in the order of their positions)
      imageFiles.forEach((file) => {
        if (file) {
          submitData.append('images', file);
        }
      });

      const url = isEditMode 
        ? `https://sumaya-backend.onrender.com/api/products/update/${editingProduct._id}`
        : 'https://sumaya-backend.onrender.com/api/products/addproduct';
      
      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        body: submitData,
      });

      // Enhanced error handling
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || `Server error: ${response.status}`);
        } catch (parseError) {
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
      }

      const result = await response.json();
      
      const successMessage = isEditMode 
        ? 'Product updated successfully!' 
        : 'Product added successfully!';
      
      // Show toast notification instead of regular notification
      toast.success(successMessage);
      alert(successMessage);
      
      if (onProductSaved) {
        onProductSaved();
      }
      
      if (!isEditMode) {
        resetForm();
      }
      
      if (isEditMode && onCancelEdit) {
        setTimeout(() => onCancelEdit(), 2000);
      }
      
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
      showNotification(error.message || `Failed to ${isEditMode ? 'update' : 'add'} product`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancelEdit) {
      onCancelEdit();
    } else {
      resetForm();
    }
  };

  const sizes = ['M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Yellow', 'Orange', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
  const categories = ['1PC Kurthi', '2PC Kurthi', '3PC Kurthi', 'Cord Set', 'Frock'];
  const designPatterns = ['Embroidery Work', 'Floral Design', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
       <Toaster position="top-right" reverseOrder={false} />
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              transform transition-all duration-300 ease-in-out
              flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg
              ${toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : toast.type === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
              }
              animate-slide-in-right
            `}
            style={{
              animation: 'slideInRight 0.3s ease-out'
            }}
          >
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Original notification for errors */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white flex items-center space-x-2`}>
          {notification.type === 'success' ? 
            <CheckCircle className="w-5 h-5" /> : 
            <AlertCircle className="w-5 h-5" />
          }
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isEditMode && onCancelEdit && (
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Product Details'}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Add custom CSS for animation */}
        <style jsx>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.3s ease-out;
          }
        `}</style>
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {imageFiles.map((file, index) => {
              const hasExistingImage = existingImages && existingImages[index] && typeof existingImages[index] === 'string';
              const hasNewFile = file !== null;
              
              return (
                <div key={index} className="relative">
                  <div className="w-full h-80 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    {hasNewFile ? (
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : hasExistingImage ? (
                      <img src={existingImages[index]} alt={editingProduct.images[index]?.altText || "Product"} className="w-full h-full object-contain rounded" />
                    ) : (
                      <Plus className="w-8 h-8 text-gray-500" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  
                  {/* DELETE BUTTON - ADD THIS SECTION */}
                  {(hasNewFile || hasExistingImage) && (
                    <button
                      onClick={() => handleImageDelete(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors z-10"
                      title="Delete image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {(hasNewFile || hasExistingImage) && (
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {hasNewFile ? 'New image' : 'Current image'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-600">
            {isEditMode 
              ? 'Upload new images to replace existing ones or add to empty slots (up to 4 total)'
              : 'Upload product pics (Min. 1 pic, Max. 4 pics)'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                placeholder="Enter detailed product description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
              <input
                type="number"
                placeholder="Enter selling price"
                value={formData.sellingPrice}
                onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Commission *</label>
              <input
                type="number"
                placeholder="Enter commission amount"
                value={formData.sellerCommission}
                onChange={(e) => handleInputChange('sellerCommission', e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Design/Pattern *</label>
              <select
                value={formData.designPattern}
                onChange={(e) => handleInputChange('designPattern', e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                required
              >
                <option value="">Select Design/Pattern</option>
                {designPatterns.map(pattern => (
                  <option key={pattern} value={pattern}>{pattern}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
              <div className="flex space-x-3 flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-colors ${
                      formData.color === color
                        ? 'border-orange-500 ring-2 ring-orange-200'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  >
                    {formData.color === color && <span className="sr-only">{color} selected</span>}
                  </button>
                ))}
              </div>
              {formData.color && (
                <p className="text-sm text-gray-600 mt-2">Selected: {formData.color}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display MRP *</label>
              <input
                type="number"
                placeholder="Enter MRP for display"
                value={formData.displayMRP}
                onChange={(e) => handleInputChange('displayMRP', e.target.value)}
                className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes *</label>
              <div className="flex space-x-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.availableSizes.includes(size)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          {isEditMode && onCancelEdit && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-8 py-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600'
            } text-white flex items-center space-x-2`}
          >
            {loading && <Upload className="w-4 h-4 animate-spin" />}
            <span>
              {loading 
                ? `${isEditMode ? 'Updating' : 'Adding'} Product...` 
                : `${isEditMode ? 'Update' : 'Add'} Product`
              }
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}