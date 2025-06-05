import React, { useState } from 'react';
import Navbar from './Navbar';

const UploadImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedImage(null);
            setPreviewUrl(null);
            alert('Please select a valid image file.');
        }
    };

    const handleUpload = async () => {
        if (!selectedImage||!name||!price) {
            alert('Please fill all data.');
            return;
    }



        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('name', name)
        formData.append('price', price)

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Image uploaded successfully!');
                console.log('Server response:', result);

                setSelectedImage(null);
                setPreviewUrl(null);
                setName('');
                setPrice('');

            } else {
                alert('Upload failed.');
                console.error(result);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred while uploading.');
        }





        // Simulate upload
        alert(`Uploading: ${selectedImage.name}`);

        // You can send this to your backend using FormData here
        // const formData = new FormData();
        // formData.append('image', selectedImage);
        // fetch('/upload', { method: 'POST', body: formData })
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-100 to-emerald-100">
            <Navbar />
            <div className="max-w-xl mx-auto mt-24 p-8 rounded-3xl shadow-2xl bg-white border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">Upload Fresh Veggie</h2>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Vegetable Name</label>
                    <input
                        type="text"
                        placeholder="Eg: Carrot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700">Price (₹ per kg)</label>
                    <input
                        type="number"
                        placeholder="Eg: 45"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="fileInput"
                        className="block w-full text-center p-3 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-emerald-50 transition"
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

                {previewUrl && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Preview:</p>
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full max-h-80 object-cover rounded-lg border shadow-md"
                        />
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition"
                >
                    Upload Veggie 🌱
                </button>
            </div>
        </div>
    );
};

export default UploadImage;
