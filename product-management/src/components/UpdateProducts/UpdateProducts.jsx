// src/components/UpdateProducts/UpdateProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../slices/ProductSlice";
import axios from "axios";
import "./UpdateProducts.css";

export default function UpdateProducts() {
    const { id } = useParams(); // get product ID from URL
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        image: ""
    });

    const [loading, setLoading] = useState(true);

    // Fetch product by ID from JSON server
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await dispatch(updateProduct({ id: Number(id), updatedProduct: formData })).unwrap();
            alert("Product updated successfully!");
            navigate("/home"); // go back to product list
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    if (loading) return <p>Loading product details...</p>;

    return (
        <div className="update-product-container">
            <h1>Update Product</h1>
            <div className="update-product-form">
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />

                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                />

                <label>Image URL:</label>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button onClick={handleUpdate}>Update Product</button>
                <button onClick={() => navigate("/home")}>Cancel</button>
            </div>
        </div>
    );
}
