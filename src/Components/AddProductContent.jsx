// // import React, { useState } from 'react';
// // import { Plus, Upload, CheckCircle, AlertCircle } from 'lucide-react';

// // export default function AddProductContent() {
// //   const [formData, setFormData] = useState({
// //     category: '',
// //     description: '',
// //     designPattern: '',
// //     color: '',
// //     availableSizes: [],
// //     sellingPrice: '',
// //     sellerCommission: '',
// //     displayMRP: '',
// //   });

// //   const [imageFiles, setImageFiles] = useState([null, null, null, null]);
// //   const [loading, setLoading] = useState(false);
// //   const [notification, setNotification] = useState(null);

// //   const handleInputChange = (field, value) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: value,
// //     }));
// //   };

// //   const handleSizeToggle = (size) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       availableSizes: prev.availableSizes.includes(size)
// //         ? prev.availableSizes.filter(s => s !== size)
// //         : [...prev.availableSizes, size],
// //     }));
// //   };

// //   const handleImageUpload = (index, event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       // Validate file type
// //       if (!file.type.startsWith('image/')) {
// //         showNotification('Please select only image files', 'error');
// //         return;
// //       }

// //       // Validate file size (5MB)
// //       if (file.size > 5 * 1024 * 1024) {
// //         showNotification('Image size should be less than 5MB', 'error');
// //         return;
// //       }

// //       const newImageFiles = [...imageFiles];
// //       newImageFiles[index] = file;
// //       setImageFiles(newImageFiles);
// //     }
// //   };

// //   const showNotification = (message, type) => {
// //     setNotification({ message, type });
// //     setTimeout(() => setNotification(null), 5000);
// //   };

// //   const validateForm = () => {
// //     const requiredFields = [
// //       'category',
// //       'description',
// //       'designPattern',
// //       'color',
// //       'sellingPrice',
// //       'sellerCommission',
// //       'displayMRP',
// //     ];

// //     for (const field of requiredFields) {
// //       if (!formData[field]) {
// //         showNotification(`${field.replace(/([A-Z])/g, ' $1')} is required`, 'error');
// //         return false;
// //       }
// //     }

// //     if (formData.availableSizes.length === 0) {
// //       showNotification('Please select at least one size', 'error');
// //       return false;
// //     }

// //     const hasImages = imageFiles.some(file => file !== null);
// //     if (!hasImages) {
// //       showNotification('Please upload at least one product image', 'error');
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;

// //     setLoading(true);

// //     try {
// //       const submitData = new FormData();

// //       // Append form fields (no articleNumber)
// //       Object.keys(formData).forEach(key => {
// //         if (key === 'availableSizes') {
// //           submitData.append(key, formData[key].join(','));
// //         } else {
// //           submitData.append(key, formData[key]);
// //         }
// //       });

// //       // Append image files
// //       imageFiles.forEach((file, index) => {
// //         if (file) {
// //           submitData.append('images', file); // Matches backend field name
// //         }
// //       });

// //       // Make API call
// //       const response = await fetch('https://sumaya-backend.onrender.com/api/products/addproduct', {
// //         method: 'POST',
// //         body: submitData,
// //       });

// //       const contentType = response.headers.get('content-type');
// //       if (!contentType || !contentType.includes('application/json')) {
// //         const textResponse = await response.text();
// //         console.error('Non-JSON response:', textResponse);
// //         throw new Error('Server returned non-JSON response');
// //       }

// //       const result = await response.json();

// //       if (response.ok) {
// //         showNotification(`Product added successfully! Article Number: ${result.data.articleNumber}`, 'success');
        
// //         // Reset form
// //         setFormData({
// //           category: '',
// //           description: '',
// //           designPattern: '',
// //           color: '',
// //           availableSizes: [],
// //           sellingPrice: '',
// //           sellerCommission: '',
// //           displayMRP: '',
// //         });
// //         setImageFiles([null, null, null, null]);
// //       } else {
// //         throw new Error(result.message || 'Failed to add product');
// //       }
// //     } catch (error) {
// //       console.error('Error adding product:', error);
// //       showNotification(error.message || 'Failed to add product', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const sizes = ['M', 'L', 'XL', 'XXL'];
// //   const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple'];
// //   const patterns = ['Floral', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

// //   return (
// //     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
// //       {notification && (
// //         <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
// //           notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
// //         } text-white flex items-center space-x-2`}>
// //           {notification.type === 'success' ? 
// //             <CheckCircle className="w-5 h-5" /> : 
// //             <AlertCircle className="w-5 h-5" />
// //           }
// //           <span>{notification.message}</span>
// //         </div>
// //       )}

// //       <h1 className="text-2xl font-bold text-gray-900">Product Details</h1>

// //       <div className="bg-white rounded-lg p-6 shadow-sm">
// //         <div className="mb-8">
// //           <div className="grid grid-cols-4 gap-4 mb-4">
// //             {imageFiles.map((file, index) => (
// //               <div key={index} className="relative">
// //                 <div className="w-full h-24 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
// //                   {file ? (
// //                     <img 
// //                       src={URL.createObjectURL(file)} 
// //                       alt={`Product ${index + 1}`}
// //                       className="w-full h-full object-cover rounded"
// //                     />
// //                   ) : (
// //                     <Plus className="w-8 h-8 text-gray-500" />
// //                   )}
// //                   <input
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={(e) => handleImageUpload(index, e)}
// //                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// //                   />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //           <p className="text-center text-sm text-gray-600">Upload product pics (Min. 1 pic, Max. 4 pics)</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //           <div className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
// //               <input
// //                 type="text"
// //                 placeholder="e.g., 3PC Kurthi, Cord set"
// //                 value={formData.category}
// //                 onChange={(e) => handleInputChange('category', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
// //               <textarea
// //                 placeholder="Enter detailed product description"
// //                 value={formData.description}
// //                 onChange={(e) => handleInputChange('description', e.target.value)}
// //                 rows={4}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</label>
// //               <input
// //                 type="number"
// //                 placeholder="Enter selling price"
// //                 value={formData.sellingPrice}
// //                 onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Seller Commission *</label>
// //               <input
// //                 type="number"
// //                 placeholder="Enter commission amount"
// //                 value={formData.sellerCommission}
// //                 onChange={(e) => handleInputChange('sellerCommission', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Design/Pattern *</label>
// //               <select
// //                 value={formData.designPattern}
// //                 onChange={(e) => handleInputChange('designPattern', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
// //                 required
// //               >
// //                 <option value="">Select Design/Pattern</option>
// //                 {patterns.map(pattern => (
// //                   <option key={pattern} value={pattern}>{pattern}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <div className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
// //               <select
// //                 value={formData.color}
// //                 onChange={(e) => handleInputChange('color', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
// //                 required
// //               >
// //                 <option value="">Select Color</option>
// //                 {colors.map(color => (
// //                   <option key={color} value={color}>{color}</option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Display MRP *</label>
// //               <input
// //                 type="number"
// //                 placeholder="Enter MRP for display"
// //                 value={formData.displayMRP}
// //                 onChange={(e) => handleInputChange('displayMRP', e.target.value)}
// //                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 required
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes *</label>
// //               <div className="flex space-x-3">
// //                 {sizes.map((size) => (
// //                   <button
// //                     key={size}
// //                     type="button"
// //                     onClick={() => handleSizeToggle(size)}
// //                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
// //                       formData.availableSizes.includes(size)
// //                         ? 'bg-orange-500 text-white'
// //                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-8 flex justify-end">
// //           <button
// //             type="button"
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             className={`px-8 py-3 rounded-lg font-medium transition-colors ${
// //               loading 
// //                 ? 'bg-gray-400 cursor-not-allowed' 
// //                 : 'bg-orange-500 hover:bg-orange-600'
// //             } text-white flex items-center space-x-2`}
// //           >
// //             {loading && <Upload className="w-4 h-4 animate-spin" />}
// //             <span>{loading ? 'Adding Product...' : 'Add Product'}</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

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
//       if (!file.type.startsWith('image/')) {
//         showNotification('Please select only image files', 'error');
//         return;
//       }
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

//       Object.keys(formData).forEach(key => {
//         if (key === 'availableSizes') {
//           submitData.append(key, formData[key].join(','));
//         } else {
//           submitData.append(key, formData[key]);
//         }
//       });

//       imageFiles.forEach((file, index) => {
//         if (file) {
//           submitData.append('images', file);
//         }
//       });

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
//         showNotification('Product added successfully!', 'success');
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
//   const colors = ['White', 'Black', 'Yellow', 'Orange', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
//   const categories = ['1PC Kurthi', '2PC Kurthi', '3PC Kurthi', 'Cord Set', 'Frock'];
//   const designPatterns = ['Embroidery Work', 'Floral Design', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

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
//                 <div className="w-full h-80 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
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
//               <select
//                 value={formData.category}
//                 onChange={(e) => handleInputChange('category', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
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
//                 {designPatterns.map(pattern => (
//                   <option key={pattern} value={pattern}>{pattern}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
//               <div className="flex space-x-3">
//                 {colors.map(color => (
//                   <button
//                     key={color}
//                     type="button"
//                     onClick={() => handleInputChange('color', color)}
//                     className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-colors ${
//                       formData.color === color
//                         ? 'border-orange-500'
//                         : 'border-gray-300 hover:border-gray-500'
//                     }`}
//                     style={{ backgroundColor: color.toLowerCase() }}
//                   >
//                     {formData.color === color && <span className="sr-only">{color} selected</span>}
//                   </button>
//                 ))}
//               </div>
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
//                 {sizes.map(size => (
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


// import React, { useState, useEffect } from 'react';
// import { Plus, Upload, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

// export default function AddProductContent({ 
//   editingProduct = null, 
//   onCancelEdit = null, 
//   onProductSaved = null 
// }) {
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
//   const [existingImages, setExistingImages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   // Load product data for editing
//   useEffect(() => {
//     if (editingProduct) {
//       console.log('Loading product for edit:', editingProduct);
//       console.log('Product images:', editingProduct.images);
      
//       setIsEditMode(true);
//       setFormData({
//         category: editingProduct.category || '',
//         description: editingProduct.description || '',
//         designPattern: editingProduct.designPattern || '',
//         color: editingProduct.color || '',
//         availableSizes: editingProduct.availableSizes || [],
//         sellingPrice: editingProduct.sellingPrice || '',
//         sellerCommission: editingProduct.sellerCommission || '',
//         displayMRP: editingProduct.displayMRP || '',
//       });
      
//       // Handle existing images - ensure we have an array
//       const images = editingProduct.images || [];
//       console.log('Setting existing images:', images);
//       setExistingImages(images);
      
//       // Reset image files when editing
//       setImageFiles([null, null, null, null]);
//     } else {
//       resetForm();
//     }
//   }, [editingProduct]);

//   const resetForm = () => {
//     setIsEditMode(false);
//     setFormData({
//       category: '',
//       description: '',
//       designPattern: '',
//       color: '',
//       availableSizes: [],
//       sellingPrice: '',
//       sellerCommission: '',
//       displayMRP: '',
//     });
//     setImageFiles([null, null, null, null]);
//     setExistingImages([]);
//   };

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
//       if (!file.type.startsWith('image/')) {
//         showNotification('Please select only image files', 'error');
//         return;
//       }
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

//     // For new products, require at least one image
//     if (!isEditMode) {
//       const hasImages = imageFiles.some(file => file !== null);
//       if (!hasImages) {
//         showNotification('Please upload at least one product image', 'error');
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     setLoading(true);

//     try {
//       const submitData = new FormData();

//       // Add form data
//       Object.keys(formData).forEach(key => {
//         if (key === 'availableSizes') {
//           submitData.append(key, formData[key].join(','));
//         } else {
//           submitData.append(key, formData[key]);
//         }
//       });

//       // Add new images if any
//       imageFiles.forEach((file) => {
//         if (file) {
//           submitData.append('images', file);
//         }
//       });

//       const url = isEditMode 
//         ? `https://sumaya-backend.onrender.com/api/products/update/${editingProduct._id}`
//         : 'https://sumaya-backend.onrender.com/api/products/addproduct';
      
//       const method = isEditMode ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
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
//         const successMessage = isEditMode 
//           ? 'Product updated successfully!' 
//           : 'Product added successfully!';
//         showNotification(successMessage, 'success');
        
//         // Call callback to notify parent component
//         if (onProductSaved) {
//           onProductSaved();
//         }
        
//         if (!isEditMode) {
//           resetForm(); // Only reset form for new products
//         }
        
//         // If we were editing, go back to products list after a delay
//         if (isEditMode && onCancelEdit) {
//           setTimeout(() => onCancelEdit(), 2000);
//         }
//       } else {
//         throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'add'} product`);
//       }
//     } catch (error) {
//       console.error(`Error ${isEditMode ? 'updating' : 'adding'} product:`, error);
//       showNotification(error.message || `Failed to ${isEditMode ? 'update' : 'add'} product`, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (onCancelEdit) {
//       onCancelEdit();
//     } else {
//       resetForm();
//     }
//   };

//   const sizes = ['M', 'L', 'XL', 'XXL'];
//   const colors = ['White', 'Black', 'Yellow', 'Orange', 'Red', 'Green', 'Blue', 'Pink', 'Purple'];
//   const categories = ['1PC Kurthi', '2PC Kurthi', '3PC Kurthi', 'Cord Set', 'Frock'];
//   const designPatterns = ['Embroidery Work', 'Floral Design', 'Geometric', 'Abstract', 'Traditional', 'Modern', 'Solid'];

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

//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           {isEditMode && onCancelEdit && (
//             <button
//               onClick={handleCancel}
//               className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               <span>Back to Products</span>
//             </button>
//           )}
//           <h1 className="text-2xl font-bold text-gray-900">
//             {isEditMode ? 'Edit Product' : 'Product Details'}
//           </h1>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg p-6 shadow-sm">
//         <div className="mb-8">
//           <div className="grid grid-cols-4 gap-4 mb-4">
//             {imageFiles.map((file, index) => {
//               const hasExistingImage = existingImages && existingImages[index];
//               const hasNewFile = file !== null;
              
//               console.log(`Image slot ${index}:`, {
//                 hasExistingImage,
//                 hasNewFile,
//                 existingImageUrl: existingImages[index],
//                 fileType: file ? 'new file' : 'no file'
//               });
              
//               return (
//                 <div key={index} className="relative">
//                   <div className="w-full h-80 bg-gray-300 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
//                     {hasNewFile ? (
//                       <img 
//                         src={URL.createObjectURL(file)} 
//                         alt={`Product ${index + 1}`}
//                         className="w-full h-full object-cover rounded"
//                       />
//                     ) : hasExistingImage ? (
//                       <img 
//                         src={existingImages[index]} 
//                         alt={`Existing Product ${index + 1}`}
//                         className="w-full h-full object-cover rounded"
//                         onError={(e) => {
//                           console.error(`Failed to load image: ${existingImages[index]}`);
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                     ) : (
//                       <Plus className="w-8 h-8 text-gray-500" />
//                     )}
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => handleImageUpload(index, e)}
//                       className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                     />
//                   </div>
//                   {(hasNewFile || hasExistingImage) && (
//                     <p className="text-xs text-center mt-1 text-gray-500">
//                       {hasNewFile ? 'New image' : 'Current image'}
//                     </p>
//                   )}
//                   {/* Debug info - remove this in production */}
//                   {isEditMode && (
//                     <p className="text-xs text-center mt-1 text-red-500">
//                       Slot {index}: {hasNewFile ? 'New' : hasExistingImage ? 'Existing' : 'Empty'}
//                     </p>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//           <p className="text-center text-sm text-gray-600">
//             {isEditMode 
//               ? 'Upload new images to replace existing ones (optional)'
//               : 'Upload product pics (Min. 1 pic, Max. 4 pics)'
//             }
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => handleInputChange('category', e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
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
//                 {designPatterns.map(pattern => (
//                   <option key={pattern} value={pattern}>{pattern}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Color *</label>
//               <div className="flex space-x-3 flex-wrap gap-2">
//                 {colors.map(color => (
//                   <button
//                     key={color}
//                     type="button"
//                     onClick={() => handleInputChange('color', color)}
//                     className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-colors ${
//                       formData.color === color
//                         ? 'border-orange-500 ring-2 ring-orange-200'
//                         : 'border-gray-300 hover:border-gray-500'
//                     }`}
//                     style={{ backgroundColor: color.toLowerCase() }}
//                     title={color}
//                   >
//                     {formData.color === color && <span className="sr-only">{color} selected</span>}
//                   </button>
//                 ))}
//               </div>
//               {formData.color && (
//                 <p className="text-sm text-gray-600 mt-2">Selected: {formData.color}</p>
//               )}
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
//                 {sizes.map(size => (
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

//         <div className="mt-8 flex justify-end space-x-4">
//           {isEditMode && onCancelEdit && (
//             <button
//               type="button"
//               onClick={handleCancel}
//               disabled={loading}
//               className="px-8 py-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           )}
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
//             <span>
//               {loading 
//                 ? `${isEditMode ? 'Updating' : 'Adding'} Product...` 
//                 : `${isEditMode ? 'Update' : 'Add'} Product`
//               }
//             </span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Plus, Upload, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

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
  const [isEditMode, setIsEditMode] = useState(false);

  // Load product data for editing
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
      
      // Handle existing images - convert objects to URLs if needed
      let images = [];
      if (editingProduct.images && Array.isArray(editingProduct.images)) {
        images = editingProduct.images.map(img => {
          // If img is an object, try to extract URL from common properties
          if (typeof img === 'object' && img !== null) {
            console.log('Image object:', img);
            // Check common properties for image URLs
            return img.url || img.path || img.src || img.secure_url || img.public_id || img;
          }
          // If img is already a string, use it directly
          return img;
        }).filter(url => typeof url === 'string' && url.length > 0);
      }
      
      console.log('Processed images:', images);
      setExistingImages(images);
      
      // Reset image files when editing
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

    // For new products, require at least one image
    if (!isEditMode) {
      const hasImages = imageFiles.some(file => file !== null);
      if (!hasImages) {
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

      // Add new images if any
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

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned non-JSON response');
      }

      const result = await response.json();

      if (response.ok) {
        const successMessage = isEditMode 
          ? 'Product updated successfully!' 
          : 'Product added successfully!';
        showNotification(successMessage, 'success');
        
        // Call callback to notify parent component
        if (onProductSaved) {
          onProductSaved();
        }
        
        if (!isEditMode) {
          resetForm(); // Only reset form for new products
        }
        
        // If we were editing, go back to products list after a delay
        if (isEditMode && onCancelEdit) {
          setTimeout(() => onCancelEdit(), 2000);
        }
      } else {
        throw new Error(result.message || `Failed to ${isEditMode ? 'update' : 'add'} product`);
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
                      // <img 
                      //   src={existingImages[index]} 
                      //   alt={`Existing Product ${index + 1}`}
                        //  className="w-full h-full object-cover rounded"
                      //   onError={(e) => {
                      //     console.error(`Failed to load image at index ${index}:`, existingImages[index]);
                      //     e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      //   }}
                      //   onLoad={() => {
                      //     console.log(`Image loaded successfully at index ${index}:`, existingImages[index]);
                      //   }}
                      // />
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
                  {(hasNewFile || hasExistingImage) && (
                    <p className="text-xs text-center mt-1 text-gray-500">
                      {hasNewFile ? 'New image' : 'Current image'}
                    </p>
                  )}
                  {/* Debug info */}
                  {/* {isEditMode && existingImages[index] && (
                    <p className="text-xs text-center mt-1 text-blue-500 break-all">
                      URL: {typeof existingImages[index] === 'string' ? existingImages[index].substring(0, 50) + '...' : 'Invalid URL'}
                    </p>
                  )} */}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-gray-600">
            {isEditMode 
              ? 'Upload new images to replace existing ones (optional)'
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