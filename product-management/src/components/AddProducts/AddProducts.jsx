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
            navigate("/home"); // go back to product list
        } catch (err) {
            console.error("Failed to add product:", err);
        }
    };

    return (
        <div className="add-product-container">

            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={product.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}
