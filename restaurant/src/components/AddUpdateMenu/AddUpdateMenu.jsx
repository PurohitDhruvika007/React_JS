import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMenuItem, updateMenuItem, fetchMenu } from "../../slices/MenuSlice";
import { useNavigate, useParams } from "react-router";

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
            const item = items.find((i) => i.id === id);
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
            [name]: type === "checkbox" ? checked : value,
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

    return (
        <div className="container p-4" style={{ maxWidth: "850px" }}>
            <h2>{isUpdate ? "Update Menu Item" : "Add Menu Item"}</h2>

            {/* Image Upload */}
            <div
                className={`border border-2 border-dashed rounded-3 d-flex align-items-center justify-content-center mb-3 ${dragOver ? "border-primary bg-light" : "border-secondary"
                    }`}
                style={{ width: "180px", height: "180px", cursor: "pointer", position: "relative" }}
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                    onChange={handleFileChange}
                />
                {image ? (
                    <img src={image} alt="Menu" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                ) : (
                    <div className="text-center">
                        <p className="fw-semibold mt-2">Drag & drop image or click to select</p>
                    </div>
                )}
            </div>

            {/* Form */}
            <form className="row g-3 text-start" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label>Item Name</label>
                    <input type="text" name="itemName" className="form-control" value={form.itemName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label>Category</label>
                    <input type="text" name="category" className="form-control" value={form.category} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control" value={form.price} onChange={handleChange} required />
                </div>
                <div className="col-md-4">
                    <label>Preparation Time</label>
                    <input type="text" name="preparationTime" className="form-control" value={form.preparationTime} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label>Rating</label>
                    <input type="number" name="rating" className="form-control" value={form.rating} onChange={handleChange} min="0" max="5" step="0.1" />
                </div>
                <div className="col-12">
                    <label>Description</label>
                    <textarea name="description" className="form-control" value={form.description} onChange={handleChange}></textarea>
                </div>
                <div className="col-md-4 form-check mt-2">
                    <input type="checkbox" className="form-check-input" name="availability" checked={form.availability} onChange={handleChange} />
                    <label className="form-check-label">Available</label>
                </div>
                <div className="col-md-4 form-check mt-2">
                    <input type="checkbox" className="form-check-input" name="special" checked={form.special} onChange={handleChange} />
                    <label className="form-check-label">Special</label>
                </div>
                <div className="col-md-4 form-check mt-2">
                    <label>Tax Rate</label>
                    <input type="number" name="taxRate" className="form-control" value={form.taxRate} onChange={handleChange} step="0.01" />
                </div>
                <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn px-4 fw-semibold" style={{ borderRadius: "8px", backgroundColor: "#ff8c00", color: "white" }} disabled={loading}>
                        {loading ? "Saving..." : isUpdate ? "Save Changes" : "Add Menu Item"}
                    </button>
                </div>
            </form>
        </div>
    );
}
