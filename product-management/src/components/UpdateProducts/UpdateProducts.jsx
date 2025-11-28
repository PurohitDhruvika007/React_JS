import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../slices/ProductSlice";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
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
            navigate("/home");
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    if (loading) return <p>Loading product details...</p>;

    return (
        <div className="update-product-page">
            <Navbar />
            <div className="update-product-container">
                <div className="update-product-card">
                    <h1>Update Product</h1>
                    <form>
                        <div className="input-group">
                            <input
                                type="text"
                                name="title"
                                placeholder=" "
                                value={formData.title}
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
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <label>Price ($)</label>
                        </div>

                        <div className="input-group">
                            <select
                                name="category"
                                value={formData.category}
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
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                            <label>Image URL</label>
                        </div>

                        {formData.image && (
                            <div className="image-preview">
                                <img src={formData.image} alt="Preview" />
                            </div>
                        )}

                        <button type="button" className="submit-btn" onClick={handleUpdate}>
                            Update Product
                        </button>
                        <button type="button" className="cancel-btn" onClick={() => navigate("/home")}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
