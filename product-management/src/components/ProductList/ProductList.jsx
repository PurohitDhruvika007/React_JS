import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../../slices/ProductSlice";
import "./ProductList.css";
import Navbar from "../Navbar/Navbar";

export default function ProductList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isLoading, error } = useSelector((state) => state.products);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortPrice, setSortPrice] = useState("");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/updateproduct/${id}`);
    };

    const handleAddProduct = () => {
        navigate("/addproduct");
    };

    const filteredProducts = products
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => (categoryFilter === "all" ? true : p.category === categoryFilter))
        .sort((a, b) => {
            if (sortPrice === "asc") return a.price - b.price;
            if (sortPrice === "desc") return b.price - a.price;
            return 0;
        });

    if (isLoading) return <p className="loading-text">Loading...</p>;
    if (error) return <p className="loading-text">{error}</p>;

    return (
        <div className="product-list-page">
            <Navbar />
            <div className="product-list-container">
                <h1 className="page-title">Product List</h1>

                <div className="controls">
                    <button className="add-product-btn" onClick={handleAddProduct}>
                        + Add Product
                    </button>

                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />

                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="all">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Home">Home</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Bags">Bags</option>
                        <option value="Books">Books</option>
                    </select>

                    <select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)}>
                        <option value="">Sort by Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>

                <div className="products">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} className="product-image" />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">${product.price}</p>
                            <p className="product-category">{product.category}</p>
                            <div className="card-actions">
                                <button className="edit-btn" onClick={() => handleEdit(product.id)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
