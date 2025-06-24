import React, { useState } from 'react';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewUrl(null);
      toast.warn('Please select a valid image file.');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !name || !price) {
      toast.warning('Please fill all data.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('name', name);
    formData.append('price', price);

    toast.info(`Uploading: ${selectedImage.name}`);

    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Image uploaded successfully!');
        console.log('Server response:', result);
        setSelectedImage(null);
        setPreviewUrl(null);
        setName('');
        setPrice('');
      } else {
        toast.error('Upload failed.');
        console.error(result);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('An error occurred while uploading.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-xl mx-auto mt-24 p-10 rounded-3xl shadow-[0_0_40px_rgba(0,255,150,0.3)] bg-[#111827] border border-emerald-600">
        <h2 className="text-4xl font-bold text-center text-emerald-400 mb-8 tracking-tight">
          Upload Fresh Veggie 🌿
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-300">Vegetable Name</label>
          <input
            type="text"
            placeholder="Eg: Carrot"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="text-sm font-medium text-gray-300">Price (₹ per kg)</label>
          <input
            type="number"
            placeholder="Eg: 45"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Image Picker */}
        <div className="mb-6">
          <label
            htmlFor="fileInput"
            className="block w-full text-center py-3 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            📷 Click to select an image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-80 object-cover rounded-lg border border-gray-700 shadow-md"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-xl transition"
        >
          Upload Veggie 🚀
        </button>
      </div>

      {/* Toasts */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
      />
    </div>
  );
};

export default UploadImage;
