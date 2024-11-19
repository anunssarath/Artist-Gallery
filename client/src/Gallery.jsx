import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './gallery.css'; 

function Gallery() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data); 
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []); 

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <h1 className="text-center">Gallery</h1>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-4" key={product._id}>
                            <div className="card">
                                <img
                                    src={`http://localhost:3001/uploads/${product.image}`} 
                                    alt={product.description}
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">₹.{product.price}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
        </>
    );
}

export default Gallery;
