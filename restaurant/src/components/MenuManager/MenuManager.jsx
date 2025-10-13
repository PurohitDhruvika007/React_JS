// src/components/MenuManager/MenuManager.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu, deleteMenuItem } from "../../slices/MenuSlice";
import { useNavigate } from "react-router";

export default function MenuManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.menu);

    const [categoryFilter, setCategoryFilter] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("");

    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        dispatch(deleteMenuItem(id));
    };

    const handleUpdate = (id) => navigate(`/manager-dashboard/modify-menu/${id}`);
    const handleAdd = () => navigate("/manager-dashboard/modify-menu");

    // Get unique categories for dropdown
    const categories = [...new Set(items.map(item => item.category))];

    // Filter items based on category and availability
    const filteredItems = items.filter(item => {
        return (
            (categoryFilter === "" || item.category === categoryFilter) &&
            (availabilityFilter === "" || item.availability === (availabilityFilter === "Available"))
        );
    });

    return (
        <div className="container p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Menu Items</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add Menu Item
                </button>
            </div>

            {/* Filters */}
            <div className="d-flex gap-3 mb-4">
                <select
                    className="form-select"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    className="form-select"
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                    <option value="">All Availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
            </div>

            {filteredItems.length === 0 ? (
                <p>No menu items found.</p>
            ) : (
                <div className="row">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.itemName}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                    onError={(e) => (e.target.src = "/default-food.png")}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.itemName}</h5>
                                    <p className="card-text">
                                        <strong>Category:</strong> {item.category} <br />
                                        <strong>Price:</strong> ₹{item.price} <br />
                                        <strong>Availability:</strong> {item.availability ? "Yes" : "No"} <br />
                                        <strong>Rating:</strong> {item.rating} <br />
                                        <strong>Preparation Time:</strong> {item.preparationTime} <br />
                                        <strong>Special:</strong> {item.special ? "Yes" : "No"} <br />
                                        <strong>Description:</strong> {item.description}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-sm btn-warning" onClick={() => handleUpdate(item.id)}>
                                            Update
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
