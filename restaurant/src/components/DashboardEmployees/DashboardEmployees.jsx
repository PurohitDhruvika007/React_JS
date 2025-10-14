import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders, fetchInvoices } from "../../slices/OrderSlice";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./DashboardEmployees.css";

const COLORS = ["#ffd700", "#ffed4e", "#b8860b", "#daa520", "#f0e68c", "#fff8dc"];

export default function DashboardEmployees() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { orders, invoices } = useSelector((state) => state.orders);
    const [employeeData, setEmployeeData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchInvoices());
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            const filteredOrders = orders.filter(o => o.employeeId === currentUser.id);
            const filteredInvoices = invoices.filter(inv => inv.employeeId === currentUser.id);

            const combinedData = [
                ...filteredOrders.map(o => ({ ...o, type: "Order" })),
                ...filteredInvoices.map(inv => ({ ...inv, type: "Invoice" }))
            ];

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
        <div className={`dashboard-container ${isLoaded ? 'loaded' : ''}`}>
            {/* Background Elements */}
            <div className="dashboard-background">
                <div className="bg-shape shape-1"></div>
                <div className="bg-shape shape-2"></div>
                <div className="bg-shape shape-3"></div>
            </div>

            <div className="dashboard-content">
                {/* Header */}
                <div className="dashboard-header">
                    <h1 className="dashboard-title">
                        Welcome, {currentUser?.firstName}
                        <span className="title-accent"></span>
                    </h1>
                    <p className="dashboard-subtitle">Your Performance Overview</p>
                </div>

                {/* Summary Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Total Orders</h3>
                            <p className="stat-number">{totalOrders}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C9.34784 22 6.8043 20.9464 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Total Revenue</h3>
                            <p className="stat-number">₹{totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                <path d="M9 19V13C9 11.8954 9.89543 11 11 11H13C14.1046 11 15 11.8954 15 13V19C15 20.1046 15.8954 21 17 21H19C20.1046 21 21 20.1046 21 19V13C21 11.8954 20.1046 11 19 11H18M9 19C9 20.1046 8.10457 21 7 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11H6M9 19V9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9V19M3 11V9C3 7.89543 3.89543 7 5 7H6M21 11V9C21 7.89543 20.1046 7 19 7H18M6 7V5C6 3.89543 6.89543 3 8 3H16C17.1046 3 18 3.89543 18 5V7M6 7H18"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className="stat-content">
                            <h3>Avg. Order Value</h3>
                            <p className="stat-number">₹{avgOrderValue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="charts-section">
                    <div className="chart-container">
                        <div className="chart-header">
                            <h4>Revenue Trend</h4>
                            <p>Order and Invoice Revenue Over Time</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#b8b8b8" />
                                <YAxis stroke="#b8b8b8" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(30, 30, 30, 0.95)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        borderRadius: '10px',
                                        color: '#fff'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="Total"
                                    stroke="#ffd700"
                                    strokeWidth={3}
                                    activeDot={{ r: 8, fill: '#ffed4e' }}
                                    name="Revenue (₹)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <h4>Items Distribution</h4>
                            <p>Most Popular Menu Items</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(30, 30, 30, 0.95)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        borderRadius: '10px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-container">
                        <div className="chart-header">
                            <h4>Revenue Comparison</h4>
                            <p>Order vs Invoice Performance</p>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="#b8b8b8" />
                                <YAxis stroke="#b8b8b8" />
                                <Tooltip
                                    contentStyle={{
                                        background: 'rgba(30, 30, 30, 0.95)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        borderRadius: '10px',
                                        color: '#fff'
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="Total"
                                    fill="#ffd700"
                                    radius={[4, 4, 0, 0]}
                                    name="Revenue (₹)"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Orders Table */}
                <div className="recent-orders">
                    <div className="section-header">
                        <h3>Recent Orders & Invoices</h3>
                        <p>Your latest transactions</p>
                    </div>
                    <div className="table-container">
                        <table className="orders-table">
                            <thead>
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
                                        <td>
                                            <span className={`type-badge ${o.type.toLowerCase()}`}>
                                                {o.type}
                                            </span>
                                        </td>
                                        <td className="id-cell">#{o.id}</td>
                                        <td>{o.customerName || "-"}</td>
                                        <td className="items-cell">
                                            {o.items.map(item => `${item.itemName} x${item.quantity}`).join(", ")}
                                        </td>
                                        <td className="amount-cell">₹{o.total.toFixed(2)}</td>
                                        <td>
                                            <span className={`status-badge ${o.status?.toLowerCase() || 'completed'}`}>
                                                {o.status || 'Completed'}
                                            </span>
                                        </td>
                                        <td className="date-cell">{o.date || o.invoiceDate || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}