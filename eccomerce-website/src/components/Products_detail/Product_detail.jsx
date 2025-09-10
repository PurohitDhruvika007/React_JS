import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import './Products_detail.css'

export default function Product_detail() {
    const location = useLocation();
    const { product } = location.state;
    const navigate = useNavigate();

    return (
        <div className="product-detail">
            <h1 className="detail-heading">Product Detail</h1>

            <div className="detail-container">
                <div className="detail-image-wrapper">
                    <img src={product.image} alt="" className="detail-image" />
                </div>

                <div className="detail-info">
                    <h2 className="detail-title">{product.title}</h2>
                    <p className="detail-description">{product.description}</p>
                    <h2 className="detail-price">$ {product.price}</h2>
                    <p className="detail-category">Category: {product.category}</p>
                    <p className="detail-rating">⭐ {product.rating.rate} Rating</p>

                    <div className="detail-buttons">
                        <button className="btn buy-btn" onClick={(e) => {
                            e.preventDefault();
                            navigate('/ProductList')
                        }}>Go back</button>
                        <button className="btn cart-btn" onClick={(e) => {
                            e.preventDefault();
                            navigate('/AddToCart')
                        }}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
