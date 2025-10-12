import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchOrders, createEmptyOrder, patchOrder, deleteOrder, finalizeOrder, selectOrder } from "../../slices/OrderSlice";

export default function PlaceOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, selectedOrderId } = useSelector(s => s.orders);
    const { currentUser: user } = useSelector(s => s.auth);

    const [localEdits, setLocalEdits] = useState({});

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const visibleOrders = orders.filter(order => order.employeeId === user.id);

    const handleAddCustomer = async () => {
        const newOrder = await dispatch(createEmptyOrder({
            employeeId: user.id,
            employeeName: user.firstName
        })).unwrap();

        dispatch(selectOrder(newOrder.id));
        navigate("/employee-dashboard/");
    };

    const handleFieldChange = (orderId, field, value) => {
        setLocalEdits(prev => ({ ...prev, [orderId]: { ...(prev[orderId] || {}), [field]: value } }));
    };

    const saveOrderFields = async (order) => {
        const edits = localEdits[order.id] || {};
        const patch = {};
        ["customerName", "customerContact", "customerAddress", "tableNo", "paymentMode", "status"].forEach(f => {
            if (edits[f] !== undefined) patch[f] = edits[f];
        });
        if (Object.keys(patch).length === 0) return;
        await dispatch(patchOrder({ id: order.id, patch })).unwrap();
        setLocalEdits(prev => { const copy = { ...prev }; delete copy[order.id]; return copy; });
    };

    const changeItemQty = async (order, itemId, delta) => {
        const items = order.items.map(it =>
            it.itemId === itemId || it.id === itemId
                ? { ...it, quantity: Math.max(1, (it.quantity || 1) + delta) }
                : it
        );

        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;

        await dispatch(patchOrder({ id: order.id, patch: { items, subtotal, gst, discount, total } })).unwrap();
    };

    const removeItemFromOrder = async (order, itemId) => {
        const items = order.items.filter(it => !(it.itemId === itemId || it.id === itemId));
        const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
        const gst = items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0) * (it.taxRate || 0), 0);
        const discount = subtotal * 0.1;
        const total = subtotal + gst - discount;
        await dispatch(patchOrder({ id: order.id, patch: { items, subtotal, gst, discount, total } })).unwrap();
    };

    const handleGenerateBill = async (order) => {
        await saveOrderFields(order);
        const invoice = {
            ...order,
            invoiceDate: new Date().toLocaleString(),
        };
        await dispatch(finalizeOrder({ id: order.id, invoicePayload: invoice })).unwrap();
        alert("Invoice created and order removed.");
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Delete this order?")) return;
        await dispatch(deleteOrder(orderId)).unwrap();
    };

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>🧾 Manage Your Orders</h2>
                <div>
                    <button onClick={handleAddCustomer} style={{ marginRight: 8, background: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}>
                        ➕ Add Customer
                    </button>
                    <button onClick={() => navigate("/employee-dashboard/")} style={{ background: "#007bff", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}>
                        Go to Menu
                    </button>
                </div>
            </div>

            <div style={{ marginTop: 20 }}>
                {visibleOrders.length === 0 && <p>No active orders.</p>}

                {visibleOrders.map(order => {
                    const local = localEdits[order.id] || {};
                    return (
                        <div key={order.id} style={{ background: "#fff", padding: 16, marginBottom: 12, borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong>Customer Order: {order.customerName || `(${order.id})`}</strong>
                                <div>
                                    <button onClick={() => { dispatch(selectOrder(order.id)); navigate("/employee-dashboard/"); }} style={{ marginRight: 8, background: "#28a745", color: "#fff", border: "none", padding: "6px 12px", borderRadius: 6 }}>
                                        ➕ Add Product
                                    </button>
                                    <button onClick={() => handleDeleteOrder(order.id)} style={{ marginRight: 8 }}>Delete</button>
                                    <button onClick={() => handleGenerateBill(order)}>🧾 Generate Bill</button>
                                </div>
                            </div>

                            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                                <input placeholder="Name" value={local.customerName ?? order.customerName ?? ""} onChange={(e) => handleFieldChange(order.id, "customerName", e.target.value)} onBlur={() => saveOrderFields(order)} />
                                <input placeholder="Contact" value={local.customerContact ?? order.customerContact ?? ""} onChange={(e) => handleFieldChange(order.id, "customerContact", e.target.value)} onBlur={() => saveOrderFields(order)} />
                                <input placeholder="Address" value={local.customerAddress ?? order.customerAddress ?? ""} onChange={(e) => handleFieldChange(order.id, "customerAddress", e.target.value)} onBlur={() => saveOrderFields(order)} />
                                <input placeholder="Table No" value={local.tableNo ?? order.tableNo ?? ""} onChange={(e) => handleFieldChange(order.id, "tableNo", e.target.value)} onBlur={() => saveOrderFields(order)} />
                                <select value={local.paymentMode ?? order.paymentMode ?? "Cash"} onChange={(e) => handleFieldChange(order.id, "paymentMode", e.target.value)} onBlur={() => saveOrderFields(order)}>
                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                </select>
                                <select value={local.status ?? order.status ?? "Pending"} onChange={(e) => handleFieldChange(order.id, "status", e.target.value)} onBlur={() => saveOrderFields(order)}>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Served">Served</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {order.items?.length > 0 && order.items.map(it => (
                                <div key={it.id || it.itemId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <img src={it.image} alt={it.itemName} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6 }} />
                                        <div>
                                            <strong>{it.itemName}</strong>
                                            <div>₹{it.price} × {it.quantity} = ₹{(it.price * it.quantity).toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => changeItemQty(order, it.itemId || it.id, 1)} style={{ marginRight: 6 }}>➕</button>
                                        <button onClick={() => changeItemQty(order, it.itemId || it.id, -1)} style={{ marginRight: 6 }}>➖</button>
                                        <button onClick={() => removeItemFromOrder(order, it.itemId || it.id)}>❌</button>
                                    </div>
                                </div>
                            ))}

                            <div style={{ marginTop: 12 }}>
                                <div>Subtotal: ₹{(order.subtotal || 0).toFixed(2)}</div>
                                <div>GST: ₹{(order.gst || 0).toFixed(2)}</div>
                                <div>Discount: ₹{(order.discount || 0).toFixed(2)}</div>
                                <h4>Total: ₹{(order.total || 0).toFixed(2)}</h4>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
