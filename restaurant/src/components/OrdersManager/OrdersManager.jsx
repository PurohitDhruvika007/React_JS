// src/components/OrdersInvoicesManager/OrdersInvoicesManager.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersInvoicesManager() {
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [activeTab, setActiveTab] = useState("orders"); // "orders" or "invoices"

    // Search states
    const [idSearch, setIdSearch] = useState("");
    const [customerSearch, setCustomerSearch] = useState("");
    const [dateSearch, setDateSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Fetch orders and invoices
    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersRes = await axios.get("http://localhost:3000/orders");
                const invoicesRes = await axios.get("http://localhost:3000/invoices");
                setOrders(ordersRes.data);
                setInvoices(invoicesRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    // Function to filter & deduplicate data
    const handleSearch = (data) => {
        let filtered = [...data];

        if (statusFilter) {
            filtered = filtered.filter(
                (item) => item.status.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        if (idSearch) {
            filtered = filtered.filter(
                (item) => item.id.toLowerCase() === idSearch.toLowerCase()
            );
        }

        if (customerSearch) {
            filtered = filtered.filter(
                (item) =>
                    item.customerName &&
                    item.customerName.toLowerCase().includes(customerSearch.toLowerCase())
            );
        }

        if (dateSearch) {
            filtered = filtered.filter(
                (item) =>
                    (item.date && item.date.toLowerCase().includes(dateSearch.toLowerCase())) ||
                    (item.invoiceDate && item.invoiceDate.toLowerCase().includes(dateSearch.toLowerCase()))
            );
        }

        // Deduplicate by ID
        filtered = Array.from(new Map(filtered.map((item) => [item.id, item])).values());

        return filtered;
    };

    const displayedOrders = handleSearch(orders);
    const displayedInvoices = handleSearch(invoices);

    // Render table
    const renderTable = (data) => (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Employee</th>
                        <th>Customer</th>
                        <th>Table</th>
                        <th>Items</th>
                        <th>Total (₹)</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="9" className="text-center">
                                No data found.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.employeeName || "-"}</td>
                                <td>{item.customerName || "-"}</td>
                                <td>{item.tableNo || "-"}</td>
                                <td>
                                    {item.items
                                        .map((it) => `${it.itemName} x${it.quantity}`)
                                        .join(", ")}
                                </td>
                                <td>{item.total.toFixed(2)}</td>
                                <td>{item.status}</td>
                                <td>{item.paymentMethod || item.paymentMode || "-"}</td>
                                <td>{item.date || item.invoiceDate || "-"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container p-4">
            <h2 className="mb-4">Orders & Invoices Manager</h2>

            {/* Tabs */}
            <div className="mb-3">
                <button
                    className={`btn ${activeTab === "orders" ? "btn-primary" : "btn-outline-primary"} me-2`}
                    onClick={() => setActiveTab("orders")}
                >
                    Orders
                </button>
                <button
                    className={`btn ${activeTab === "invoices" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setActiveTab("invoices")}
                >
                    Invoices
                </button>
            </div>

            {/* Search Fields */}
            <div className="mb-3 d-flex gap-2 flex-wrap">
                <input
                    type="text"
                    placeholder="Search by ID"
                    className="form-control"
                    style={{ maxWidth: "200px" }}
                    value={idSearch}
                    onChange={(e) => setIdSearch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Customer"
                    className="form-control"
                    style={{ maxWidth: "200px" }}
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Date"
                    className="form-control"
                    style={{ maxWidth: "200px" }}
                    value={dateSearch}
                    onChange={(e) => setDateSearch(e.target.value)}
                />

                <select
                    className="form-select"
                    style={{ maxWidth: "200px" }}
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Served">Served</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            {/* Table */}
            {activeTab === "orders"
                ? renderTable(displayedOrders)
                : renderTable(displayedInvoices)}
        </div>
    );
}
