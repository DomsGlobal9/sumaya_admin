// import React, { useState } from 'react';
// import { Plus, Upload, CheckCircle, AlertCircle } from 'lucide-react';

// export default function AddProductContent() {
//   const [formData, setFormData] = useState({
//     category: '',
//     description: '',
//     designPattern: '',
//     color: '',
//     availableSizes: [],
//     sellingPrice: '',
//     sellerCommission: '',
//     displayMRP: '',
//   });

//   const [imageFiles, setImageFiles] = useState([null, null, null, null]);
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState(null);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSizeToggle = (size) => {
//     setFormData(prev => ({
//       ...prev,
//       availableSizes: prev.availableSizes.includes(size)
//         ? prev.availableSizes.filter(s => s !== size)
//         : [...prev.availableSizes, size],
//     }));
//   };

//   const handleImageUpload = (index, event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         showNotification('Please select only image files', 'error');
//         return;
//       }

//       // Validate file size (5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         showNotification('Image size should be less than 5MB', 'error');
//         return;
//       }

//       const newImageFiles = [...imageFiles];
//       newImageFiles[index] = file;
//       setImageFiles(newImageFiles);
//     }
//   };

//   const showNotification = (message, type) => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'category',
//       'description',
//       'designPattern',
//       'color',
//       'sellingPrice',
//       'sellerCommission',
//       'displayMRP',
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         showNotification(`${field.replace(/([A-Z])/g, ' $1')} is required`, 'error');
//         return false;
//       }
//     }

//     if (formData.availableSizes.length === 0) {
//       showNotification('Please select at least one size', 'error');
//       return false;
//     }

//     const hasImages = imageFiles.some(file => file !== null);
//     if (!hasImages) {
//       showNotification('Please upload at least one product image', 'error');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const submitData = new FormData();

//       // Append form fields (no articleNumber)
//       Object.keys(formData).forEach(key => {
//         if (key === 'availableSizes') {
//           submitData.append(key, formData[key].join(','));
//         } else {
//           submitData.append(key, formData[key]);
//         }
//       });

//       // Append image files
//       imageFiles.forEach((file, index) => {
//         if (file) {
//           submitData.append('images', file); // Matches backend field name
//         }
//       });

//       // Make API call
//       const response = await fetch('https://sumaya-backend.onrender.com/api/products/addproduct', {
//         method: 'POST',
//         body: submitData,
//       });

//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const textResponse = await response.text();
//         console.error('Non-JSON response:', textResponse);
//         throw new Error('Server returned non-JSON response');
//       }

//       const result = await response.json();

//       if (response.ok) {
//         showNotification(`Product added successfully! Article Number: ${result.data.articleNumber}`, 'success');
        
//         // Reset form
//         setFormData({
//           category: '',
//           description: '',
//           designPattern: '',
//           color: '',
//           availableSizes: [],
//           sellingPrice: '',
//           sellerCommission: '',
//           displayMRP: '',
//         });
//         setImageFiles([null, null, null, null]);
//       } else {
//         throw new Error(result.message || 'Failed to add product');
//       }
//     } catch (error) {
//       console.error('Error adding product:', error);
//       showNotification(error.message || 'Failed to add product', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sizes = ['M', 'L', 'XL', 'XXL'];
//   const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'];
//   const patterns = ['Floral', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       {notification && (
//         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
//           notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//         } text-white flex items-center space-x-2`}>
//           {notification.type === 'success' ? 
//             <CheckCircle className="w-5 h-5" /> : 
//             <AlertCircle className="w-5 h-5" />
//           }
//           <span>{notification.message}</span>
//         </div>
//       )}

//       <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>

//       <div className="bg-white rounded-lg p-6 shadow-sm">
//         <div className="mb-8">
//           <div className="grid grid-cols-4 gap-4 mb-4">
//             {imageFiles.map((file, index) => (
//               <div key={index} className="relative">
//                 <div className="w-full h-24 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                   {file ? (
//                     <img 
//                       src={URL.createObjectURL(file)} 
//                       alt={`Product ${index + 1}`}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   ) : (
//                     <Plus className="w-8 h-8 text-gray-500" />
//                   )}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => handleImageUpload(index, e)}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <p className="text-center text-sm text-gray-600">Upload product pics (Min. 1 pic, Max. 4 pics)</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//               <input
//                 type="text"
//                 placeholder="e.g., 3PC Kurthi, Cord set"
//                 value={formData.category}
//                 onChange={(e) => handleInputChange('category', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
//               <textarea
//                 placeholder="Enter detailed product description"
//                 value={formData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
//               <input
//                 type="number"
//                 placeholder="Enter selling price"
//                 value={formData.sellingPrice}
//                 onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Seller Commission *</label>
//               <input
//                 type="number"
//                 placeholder="Enter commission amount"
//                 value={formData.sellerCommission}
//                 onChange={(e) => handleInputChange('sellerCommission', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Design/Pattern *</label>
//               <select
//                 value={formData.designPattern}
//                 onChange={(e) => handleInputChange('designPattern', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
//                 required
//               >
//                 <option value="">Select Design/Pattern</option>
//                 {patterns.map(pattern => (
//                   <option key={pattern} value={pattern}>{pattern}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
//               <select
//                 value={formData.color}
//                 onChange={(e) => handleInputChange('color', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
//                 required
//               >
//                 <option value="">Select Color</option>
//                 {colors.map(color => (
//                   <option key={color} value={color}>{color}</option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Display MRP *</label>
//               <input
//                 type="number"
//                 placeholder="Enter MRP for display"
//                 value={formData.displayMRP}
//                 onChange={(e) => handleInputChange('displayMRP', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes *</label>
//               <div className="flex space-x-3">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     type="button"
//                     onClick={() => handleSizeToggle(size)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       formData.availableSizes.includes(size)
//                         ? 'bg-orange-500 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//               loading 
//                 ? 'bg-gray-400 cursor-not-allowed' 
//                 : 'bg-orange-500 hover:bg-orange-600'
//             } text-white flex items-center space-x-2`}
//           >
//             {loading && <Upload className="w-4 h-4 animate-spin" />}
//             <span>{loading ? 'Adding Product...' : 'Add Product'}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Plus, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function AddProductContent() {
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
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

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

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
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

    const hasImages = imageFiles.some(file => file !== null);
    if (!hasImages) {
      showNotification('Please upload at least one product image', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const submitData = new FormData();

      Object.keys(formData).forEach(key => {
        if (key === 'availableSizes') {
          submitData.append(key, formData[key].join(','));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      imageFiles.forEach((file, index) => {
        if (file) {
          submitData.append('images', file);
        }
      });

      const response = await fetch('https://sumaya-backend.onrender.com/api/products/addproduct', {
        method: 'POST',
        body: submitData,
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (response.ok) {
        showNotification('Product added successfully!', 'success');
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
      } else {
        throw new Error(result.message || 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      showNotification(error.message || 'Failed to add product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const sizes = ['M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Yellow', 'Orange', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
  const categories = ['1PC Kurthi', '2PC Kurthi', '3PC Kurthi', 'Cord Set', 'Frock'];
  const designPatterns = ['Embroidery Work', 'Floral Design', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
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

      <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="mb-8">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {imageFiles.map((file, index) => (
              <div key={index} className="relative">
                <div className="w-full h-24 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  {file ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
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
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">Upload product pics (Min. 1 pic, Max. 4 pics)</p>
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
              <div className="flex space-x-3">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('color', color)}
                    className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-colors ${
                      formData.color === color
                        ? 'border-orange-500'
                        : 'border-gray-300 hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  >
                    {formData.color === color && <span className="sr-only">{color} selected</span>}
                  </button>
                ))}
              </div>
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

        <div className="mt-8 flex justify-end">
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
            <span>{loading ? 'Adding Product...' : 'Add Product'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}