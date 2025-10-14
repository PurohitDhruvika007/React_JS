import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    fetchOrders,
    patchOrder,
    createEmptyOrder,
    selectOrder
} from "../../slices/OrderSlice";
import "./MenuEmployee.css";


export default function MenuEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, selectedOrderId } = useSelector(s => s.orders);
    const { currentUser: user } = useSelector(s => s.auth);

    const [menu, setMenu] = useState([]);
    const [localEdits, setLocalEdits] = useState({});
    const [search, setSearch] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/menu")
            .then(r => {
                setMenu(r.data);
                setIsLoaded(true);
            })
            .catch(console.error);

        dispatch(fetchOrders());
    }, [dispatch]);

    const selectedOrder = orders.find(o => o.id === selectedOrderId && o.employeeId === user.id);

    const filteredMenu = menu.filter(item =>
        item.itemName.toLowerCase().includes(search.toLowerCase())
    );

    const handleFieldChange = (field, value) => {
        setLocalEdits(prev => ({ ...prev, [field]: value }));
    };

    const saveOrderFields = async (order) => {
        const patch = {};
        ["customerName", "customerContact", "customerAddress", "tableNo", "paymentMode", "status"].forEach(f => {
            if (localEdits[f] !== undefined) patch[f] = localEdits[f];
        });
        if (Object.keys(patch).length === 0) return;
        await dispatch(patchOrder({ id: order.id, patch }));
        setLocalEdits({});
    };

    const handleAddToOrder = async (item) => {
        let order = selectedOrder;

        if (!order) {
            try {
                const newOrder = await dispatch(createEmptyOrder({
                    employeeId: user.id,
                    employeeName: user.firstName
                })).unwrap();

                dispatch(selectOrder(newOrder.id));
                order = { ...newOrder, items: newOrder.items || [] };
            } catch (err) {
                console.error("Error creating new order:", err);
                return;
            }
        }

        const existing = order.items.find(it => String(it.itemId) === String(item.itemId) || it.id === item.id);
        const newItems = existing
            ? order.items.map(it =>
                (String(it.itemId) === String(item.itemId) || it.id === item.id)
                    ? { ...it, quantity: (it.quantity || 1) + 1 }
                    : it
            )
            : [...order.items, { ...item, quantity: 1 }];

        const subtotal = newItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = newItems.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: order.id, patch: { items: newItems, subtotal, gst, discount, total } }));
    };

    const changeItemQty = async (itemId, delta) => {
        if (!selectedOrder) return;

        const items = selectedOrder.items.map(it =>
            it.itemId === itemId || it.id === itemId
                ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
                : it
        );

        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: selectedOrder.id, patch: { items, subtotal, gst, discount, total } }));
    };

    const removeItem = async (itemId) => {
        if (!selectedOrder) return;

        const items = selectedOrder.items.filter(it => !(it.itemId === itemId || it.id === itemId));
        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: selectedOrder.id, patch: { items, subtotal, gst, discount, total } }));
    };

    const handlePlaceOrder = async () => {
        if (!selectedOrder) {
            alert("No order selected.");
            return;
        }

        await saveOrderFields(selectedOrder);
        alert("Order placed successfully!");

        dispatch(selectOrder(null));
        setLocalEdits({});

        navigate("/employee-dashboard/order");
    };

    return (
        <div className={`menu-container ${isLoaded ? 'loaded' : ''}`}>
            {/* Background Elements */}
            <div className="menu-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <div className="menu-content">
                {/* Header */}
                <div className="menu-header">
                    <h1 className="menu-title">
                        🍽️ Restaurant Menu
                        <span className="title-accent"></span>
                    </h1>
                    <p className="menu-subtitle">Browse our exquisite selection of culinary delights</p>
                </div>

                <div className="menu-layout">
                    {/* Menu Section */}
                    <div className="menu-section">
                        {/* Search Bar */}
                        <div className="search-box">
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search dishes..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        {/* Menu Grid */}
                        <div className="menu-grid">
                            {filteredMenu.map(item => (
                                <div key={item.itemId || item.id} className="menu-card">
                                    <div className="menu-card-image">
                                        <img src={item.image} alt={item.itemName} />
                                        <div className="menu-card-overlay">
                                            <button
                                                onClick={() => handleAddToOrder(item)}
                                                className="add-to-order-btn"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                    <path d="M12 6V12M12 12V18M12 12H18M12 12H6"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                                Add to Order
                                            </button>
                                        </div>
                                    </div>
                                    <div className="menu-card-content">
                                        <h3 className="item-name">{item.itemName}</h3>
                                        <p className="item-price">₹{item.price}</p>
                                        <button
                                            onClick={() => handleAddToOrder(item)}
                                            className="add-btn-mobile"
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Current Order Sidebar */}
                    <div className="order-sidebar">
                        <div className="order-header">
                            <h3>🧾 Current Order</h3>
                            {selectedOrder && (
                                <span className="order-id">#{selectedOrder.id}</span>
                            )}
                        </div>

                        {!selectedOrder ? (
                            <div className="empty-order">
                                <div className="empty-order-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                        <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p>Adding items will create a new order automatically.</p>
                            </div>
                        ) : (
                            <>
                                {/* Order Details Form */}
                                <div className="order-details-form">
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Customer Name"
                                            value={localEdits.customerName || selectedOrder.customerName || ""}
                                            onChange={e => handleFieldChange("customerName", e.target.value)}
                                            className="order-input"
                                        />
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            placeholder="Contact"
                                            value={localEdits.customerContact || selectedOrder.customerContact || ""}
                                            onChange={e => handleFieldChange("customerContact", e.target.value)}
                                            className="order-input"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={localEdits.customerAddress || selectedOrder.customerAddress || ""}
                                            onChange={e => handleFieldChange("customerAddress", e.target.value)}
                                            className="order-input full-width"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Table No"
                                            value={localEdits.tableNo || selectedOrder.tableNo || ""}
                                            onChange={e => handleFieldChange("tableNo", e.target.value)}
                                            className="order-input"
                                        />
                                        <select
                                            value={localEdits.paymentMode || selectedOrder.paymentMode || "cash"}
                                            onChange={e => handleFieldChange("paymentMode", e.target.value)}
                                            className="order-select"
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="upi">UPI</option>
                                            <option value="card">Card</option>
                                        </select>
                                        <select
                                            value={localEdits.status || selectedOrder.status || "pending"}
                                            onChange={e => handleFieldChange("status", e.target.value)}
                                            className="order-select"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="served">Served</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="order-items">
                                    {selectedOrder.items?.length === 0 ? (
                                        <div className="empty-items">
                                            <p>No items yet.</p>
                                        </div>
                                    ) : (
                                        <div className="items-list">
                                            {selectedOrder.items.map(it => (
                                                <div key={it.id || it.itemId} className="order-item">
                                                    <div className="item-info">
                                                        <img src={it.image} alt={it.itemName} className="item-image" />
                                                        <div className="item-details">
                                                            <strong className="item-title">{it.itemName}</strong>
                                                            <div className="item-calculation">₹{it.price} × {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                    <div className="item-controls">
                                                        <button
                                                            onClick={() => changeItemQty(it.itemId || it.id, 1)}
                                                            className="control-btn add"
                                                        >
                                                            ➕
                                                        </button>
                                                        <button
                                                            onClick={() => changeItemQty(it.itemId || it.id, -1)}
                                                            className="control-btn remove"
                                                        >
                                                            ➖
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(it.itemId || it.id)}
                                                            className="control-btn delete"
                                                        >
                                                            ❌
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Order Summary */}
                                <div className="order-summary">
                                    <div className="summary-row">
                                        <span>Subtotal:</span>
                                        <span>₹{(selectedOrder.subtotal || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>GST:</span>
                                        <span>₹{(selectedOrder.gst || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Discount:</span>
                                        <span>₹{(selectedOrder.discount || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="summary-row total">
                                        <span>Total:</span>
                                        <span>₹{(selectedOrder.total || 0).toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    className="place-order-btn"
                                >
                                    ✅ Place Order
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}