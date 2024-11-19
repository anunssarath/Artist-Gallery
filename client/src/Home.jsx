import React, { useState } from 'react';
import Navbar from './Navbar';
function Home() {
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('price', price);
        formData.append('description', description);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div>
             <Navbar /> 
        
        
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center mb-4">Upload Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            <strong>Upload Image</strong>
                        </label>
                        <input
                            type="file"
                            id="image"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            <strong>Price</strong>
                        </label>
                        <input
                            type="number"
                            id="price"
                            className="form-control"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            <strong>Description</strong>
                        </label>
                        <textarea
                            id="description"
                            className="form-control"
                            rows="4"
                            placeholder="Enter product description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Home;
