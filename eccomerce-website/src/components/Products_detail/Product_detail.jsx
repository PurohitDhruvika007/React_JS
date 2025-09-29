import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import './Products_detail.css';

export default function Product_detail({ setCarts }) {
    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    return (
        <div className="product-detail">
            <h1 className="detail-heading">Product Detail</h1>

            <div className="detail-container">
                <div className="detail-image-wrapper">
                    <img src={product.image} alt={product.title} className="detail-image" />
                </div>

                <div className="detail-info">
                    <h2 className="detail-title">{product.title}</h2>
                    <div className="detail-rating">
                        {Array(Math.floor(product.rating.rate)).fill('⭐').join('')}
                        <span> ({product.rating.count} reviews)</span>
                    </div>
                    <p className="detail-description">{product.description}</p>
                    <h2 className="detail-price">$ {product.price}</h2>
                    <p className="detail-category">Category: {product.category}</p>

                    <div className="detail-buttons">
                        <button className="btn buy-btn" onClick={() => navigate('/ProductList')}>
                            Go back
                        </button>
                        <button
                            className="btn cart-btn"
                            onClick={() => {
                                setCarts((prev) => {
                                    const existing = prev.find((item) => item.id === product.id);
                                    if (existing) {
                                        return prev.map((item) =>
                                            item.id === product.id
                                                ? { ...item, quantity: item.quantity + 1 }
                                                : item
                                        );
                                    } else {
                                        return [...prev, { ...product, quantity: 1 }];
                                    }
                                });
                                navigate('/AddToCart');
                            }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
