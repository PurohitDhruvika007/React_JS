// src/components/MenuEmployees/MenuEmployees.jsx
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

export default function MenuEmployees() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orders, selectedOrderId } = useSelector(s => s.orders);
    const { currentUser: user } = useSelector(s => s.auth);

    const [menu, setMenu] = useState([]);
    const [localEdits, setLocalEdits] = useState({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/menu")
            .then(r => setMenu(r.data))
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
        <div style={{ display: "flex", gap: 20, padding: 20 }}>
            {/* Menu */}
            <div style={{ flex: 7, background: "#fff", padding: 16, borderRadius: 8 }}>
                <h2>🍽 Menu</h2>

                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search dishes..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "8px 12px",
                        marginBottom: 16,
                        borderRadius: 6,
                        border: "1px solid #ddd"
                    }}
                />

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {filteredMenu.map(item => (
                        <div key={item.itemId || item.id} style={{ width: 220, border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
                            <img src={item.image} alt={item.itemName} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 6 }} />
                            <h4>{item.itemName}</h4>
                            <p>₹{item.price}</p>
                            <button
                                onClick={() => handleAddToOrder(item)}
                                style={{ background: "#ff7f50", color: "#fff", padding: "8px 12px", borderRadius: 6, border: "none" }}
                            >
                                ➕ Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Order */}
            <div style={{ flex: 3, background: "#fff", padding: 16, borderRadius: 8 }}>
                <h3>🧾 Current Order</h3>
                {!selectedOrder ? (
                    <p>Adding items will create a new order automatically.</p>
                ) : (
                    <>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                            <input type="text" placeholder="Customer Name" value={localEdits.customerName || selectedOrder.customerName || ""} onChange={e => handleFieldChange("customerName", e.target.value)} />
                            <input type="tel" maxLength={10} placeholder="Contact" value={localEdits.customerContact || selectedOrder.customerContact || ""} onChange={e => handleFieldChange("customerContact", e.target.value)} />
                            <input type="text" placeholder="Address" value={localEdits.customerAddress || selectedOrder.customerAddress || ""} onChange={e => handleFieldChange("customerAddress", e.target.value)} />
                            <input type="number" placeholder="Table No" value={localEdits.tableNo || selectedOrder.tableNo || ""} onChange={e => handleFieldChange("tableNo", e.target.value)} />
                            <select value={localEdits.paymentMode || selectedOrder.paymentMode || "cash"} onChange={e => handleFieldChange("paymentMode", e.target.value)}>
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                            </select>
                            <select value={localEdits.status || selectedOrder.status || "pending"} onChange={e => handleFieldChange("status", e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="inprogress">In Progress</option>
                                <option value="served">Served</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {selectedOrder.items?.length === 0 ? <p>No items yet.</p> : selectedOrder.items.map(it => (
                            <div key={it.id || it.itemId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", padding: "8px 0" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <img src={it.image} alt={it.itemName} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6 }} />
                                    <div>
                                        <strong>{it.itemName}</strong>
                                        <div>₹{it.price} × {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => changeItemQty(it.itemId || it.id, 1)} style={{ marginRight: 6 }}>➕</button>
                                    <button onClick={() => changeItemQty(it.itemId || it.id, -1)} style={{ marginRight: 6 }}>➖</button>
                                    <button onClick={() => removeItem(it.itemId || it.id)}>❌</button>
                                </div>
                            </div>
                        ))}

                        <hr />
                        <div>Subtotal: ₹{(selectedOrder.subtotal || 0).toFixed(2)}</div>
                        <div>GST: ₹{(selectedOrder.gst || 0).toFixed(2)}</div>
                        <div>Discount: ₹{(selectedOrder.discount || 0).toFixed(2)}</div>
                        <h4>Total: ₹{(selectedOrder.total || 0).toFixed(2)}</h4>

                        <button onClick={handlePlaceOrder} style={{ marginTop: 12, background: "#28a745", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6 }}>
                            ✅ Place Order
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
