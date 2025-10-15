import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem, updateMenuItem, fetchMenu } from "../../slices/MenuSlice";
import { useNavigate, useParams } from "react-router";
import "./AddUpdateMenu.css";

export default function AddUpdateMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { items } = useSelector((state) => state.menu);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        itemName: "",
        category: "",
        price: 0,
        description: "",
        availability: true,
        taxRate: 0.18,
        image: "",
        rating: 0,
        preparationTime: "",
        special: false,
    });

    // Load existing item for update
    useEffect(() => {
        dispatch(fetchMenu());
    }, [dispatch]);

    useEffect(() => {
        if (id && items.length > 0) {
            setIsUpdate(true);
            const item = items.find((i) => i.itemId === parseInt(id));

            if (item) {
                setForm(item);
                setImage(item.image || null);
            }
        }
    }, [id, items]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setForm((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Drag-and-drop
    const [dragOver, setDragOver] = useState(false);
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = () => setDragOver(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setForm((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please upload an image.");
        setLoading(true);

        try {
            if (isUpdate) {
                await dispatch(updateMenuItem({ id, item: form }));
                alert("Menu item updated successfully!");
            } else {
                await dispatch(addMenuItem(form));
                alert("Menu item added successfully!");
            }
            navigate("/manager-dashboard/menus");
        } catch (err) {
            console.error(err);
            alert("Error saving menu item");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/manager-dashboard/menus");
    };

    return (
        <div className="add-update-menu-wrapper">
            {/* Header Section */}
            <div className="form-header">
                <h1 className="form-title">
                    {isUpdate ? "Update Menu Item" : "Add New Menu Item"}
                </h1>
                <p className="form-subtitle">
                    {isUpdate ? "Modify the menu item details below" : "Fill in the details to add a new menu item"}
                </p>
            </div>

            <div className="form-container">
                {/* Left Column - Image Upload */}
                <div className="image-section">
                    <div className="image-upload-card">
                        <h3 className="section-title">Item Image</h3>
                        <div
                            className={`image-upload-area ${dragOver ? "drag-over" : ""} ${image ? "has-image" : ""}`}
                            onClick={() => fileInputRef.current.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="file-input"
                                onChange={handleFileChange}
                            />

                            {image ? (
                                <div className="image-preview">
                                    <img src={image} alt="Menu preview" className="preview-image" />
                                    <div className="image-overlay">
                                        <span className="change-text">Click to change image</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <div className="upload-icon">📷</div>
                                    <p className="upload-text">Drag & drop image here</p>
                                    <p className="upload-subtext">or click to browse</p>
                                    <span className="upload-hint">Supports: JPG, PNG, WEBP</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="form-section">
                    <form className="menu-form" onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="form-section-card">
                            <h3 className="section-title">Basic Information</h3>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Item Name *</label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        className="form-input"
                                        value={form.itemName}
                                        onChange={handleChange}
                                        placeholder="Enter item name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-input"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="e.g., Appetizers, Main Course"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-input"
                                        value={form.price}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Preparation Time</label>
                                    <input
                                        type="text"
                                        name="preparationTime"
                                        className="form-input"
                                        value={form.preparationTime}
                                        onChange={handleChange}
                                        placeholder="e.g., 15-20 mins"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Details */}
                        <div className="form-section-card">
                            <h3 className="section-title">Additional Details</h3>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe the menu item..."
                                    rows="4"
                                />
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Rating</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        className="form-input"
                                        value={form.rating}
                                        onChange={handleChange}
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        placeholder="0.0"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        name="taxRate"
                                        className="form-input"
                                        value={form.taxRate}
                                        onChange={handleChange}
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        placeholder="0.18"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Settings */}
                        <div className="form-section-card">
                            <h3 className="section-title">Settings</h3>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="availability"
                                        className="checkbox-input"
                                        checked={form.availability}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Available for ordering
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="special"
                                        className="checkbox-input"
                                        checked={form.special}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark"></span>
                                    Mark as special item
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="btn-cancel"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        {isUpdate ? "Updating..." : "Adding..."}
                                    </>
                                ) : (
                                    <>
                                        <span className="btn-icon">{isUpdate ? "💾" : "➕"}</span>
                                        {isUpdate ? "Update Menu Item" : "Add Menu Item"}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}