import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";
import Navbar from "../Navbar/Navbar";

export default function AddProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        image: "",
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addProduct(product)).unwrap();
            navigate("/home");
        } catch (err) {
            console.error("Failed to add product:", err);
        }
    };

    return (
        <div className="add-product-page">
            <Navbar />
            <div className="add-product-container">
                <div className="add-product-card">
                    <h1>Add Product</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                name="title"
                                placeholder=" "
                                value={product.title}
                                onChange={handleChange}
                                required
                            />
                            <label>Product Title</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="number"
                                name="price"
                                placeholder=" "
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                            <label>Price ($)</label>
                        </div>

                        <div className="input-group">
                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled hidden>Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Home">Home</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Bags">Bags</option>
                                <option value="Books">Books</option>
                            </select>
                            <label>Category</label>
                        </div>

                        <div className="input-group">
                            <input
                                type="text"
                                name="image"
                                placeholder=" "
                                value={product.image}
                                onChange={handleChange}
                                required
                            />
                            <label>Image URL</label>
                        </div>

                        {product.image && (
                            <div className="image-preview">
                                <img src={product.image} alt="Preview" />
                            </div>
                        )}

                        <div className="button-group">
                            <button type="submit" className="submit-btn">
                                Add Product
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/home")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
