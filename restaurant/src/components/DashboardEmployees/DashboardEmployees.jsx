import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, fetchInvoices } from "../../slices/OrderSlice";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6F61"];

export default function DashboardEmployees() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { orders, invoices } = useSelector((state) => state.orders); // orders + invoices
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchInvoices());
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            const filteredOrders = orders.filter(o => o.employeeId === currentUser.id);
            const filteredInvoices = invoices.filter(inv => inv.employeeId === currentUser.id);

            const combinedData = [
                ...filteredOrders.map(o => ({ ...o, type: "Order" })),
                ...filteredInvoices.map(inv => ({ ...inv, type: "Invoice" }))
            ];

            // Sort by date descending
            combinedData.sort((a, b) => new Date(b.date || b.invoiceDate) - new Date(a.date || a.invoiceDate));

            setEmployeeData(combinedData);
        }
    }, [orders, invoices, currentUser]);

    const totalOrders = employeeData.length;
    const totalRevenue = employeeData.reduce((sum, o) => sum + o.total, 0);
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    // Line chart data
    const lineData = employeeData.map((o, index) => ({
        name: `${o.type} ${index + 1}`,
        Total: o.total,
        type: o.type
    }));

    // Pie chart: items sold distribution
    const itemCounts = {};
    employeeData.forEach(order => {
        order.items.forEach(item => {
            itemCounts[item.itemName] = (itemCounts[item.itemName] || 0) + item.quantity;
        });
    });
    const pieData = Object.keys(itemCounts).map(key => ({ name: key, value: itemCounts[key] }));

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ marginBottom: "20px" }}>{currentUser?.firstName} Dashboard</h2>

            {/* Summary Cards */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, padding: "20px", background: "#f0f4f8", borderRadius: "10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h3>Total Orders</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalOrders}</p>
                </div>
                <div style={{ flex: 1, padding: "20px", background: "#f0f4f8", borderRadius: "10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h3>Total Revenue</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{totalRevenue.toFixed(2)}</p>
                </div>
                <div style={{ flex: 1, padding: "20px", background: "#f0f4f8", borderRadius: "10px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                    <h3>Avg. Order Value</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>₹{avgOrderValue.toFixed(2)}</p>
                </div>
            </div>

            {/* Charts */}
            <div style={{ display: "flex", gap: "50px", marginBottom: "50px", flexWrap: "wrap" }}>
                {/* Line Chart */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h4 style={{ textAlign: "center" }}>Revenue per Order/Invoice</h4>
                    <LineChart width={500} height={300} data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Total" stroke="#8884d8" activeDot={{ r: 8 }} name="Revenue" />
                    </LineChart>
                </div>

                {/* Pie Chart */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h4 style={{ textAlign: "center" }}>Items Sold Distribution</h4>
                    <PieChart width={400} height={300}>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </div>

                {/* Bar Chart */}
                <div style={{ flex: 1, minWidth: "300px" }}>
                    <h4 style={{ textAlign: "center" }}>Revenue Comparison</h4>
                    <BarChart width={500} height={300} data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Total" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div>
                <h4>Recent Orders & Invoices</h4>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Type</th>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Total (₹)</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeData.slice(0, 10).map((o) => (
                                <tr key={o.id + o.type}>
                                    <td>{o.type}</td>
                                    <td>{o.id}</td>
                                    <td>{o.customerName || "-"}</td>
                                    <td>{o.items.map(item => `${item.itemName} x${item.quantity}`).join(", ")}</td>
                                    <td>{o.total.toFixed(2)}</td>
                                    <td>{o.status}</td>
                                    <td>{o.date || o.invoiceDate || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
