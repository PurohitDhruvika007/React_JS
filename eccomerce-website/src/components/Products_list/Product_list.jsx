import React, { useEffect, useState } from 'react'
import './Products_list.css'
import Navbar from '../Navbar/Navbar'
import Contact_us from '../Contact_us/Contact_us'
import axios from 'axios'
import { useNavigate } from 'react-router'

export default function Product_list() {
    const [products, setProducts] = useState([]);
    const fetchApi = async () => {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data)
    }
    useEffect(() => {
        fetchApi();
    }, []);
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <h1 className="products-title"> Our Products</h1>
            <div className="products-section">

                <div className="products-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-card">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">$ {product.price}</p>
                            <button className="product-btn" onClick={(e) => {
                                e.preventDefault();
                                navigate('/ProductDetails', { state: { product } })
                            }}>See More</button>
                        </div>
                    ))}
                </div>
            </div>
            <Contact_us />
        </div>

    )
}
