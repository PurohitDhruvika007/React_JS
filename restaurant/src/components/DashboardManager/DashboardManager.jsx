// src/components/ManagerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export default function ManagerDashboard() {
    const [employees, setEmployees] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [salesPeriod, setSalesPeriod] = useState("daily");
    const [salesData, setSalesData] = useState([]);
    const [topDishes, setTopDishes] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    // Fetch employees and invoices
    useEffect(() => {
        const fetchData = async () => {
            const [empRes, invRes] = await Promise.all([
                axios.get("http://localhost:3000/employees"),
                axios.get("http://localhost:3000/invoices"),
            ]);
            setEmployees(empRes.data);
            setInvoices(invRes.data);
            setFilteredInvoices(invRes.data);
        };
        fetchData();
    }, []);

    // Filter invoices by employee or date range
    useEffect(() => {
        let data = [...invoices];

        // Filter by employee
        if (selectedEmployee) {
            data = data.filter(inv => inv.employeeId === selectedEmployee);
        }

        // Filter by date range
        if (dateRange.start && dateRange.end) {
            const start = new Date(dateRange.start);
            const end = new Date(dateRange.end);
            data = data.filter(inv => {
                const invDate = new Date(inv.invoiceDate);
                return invDate >= start && invDate <= end;
            });
        }

        setFilteredInvoices(data);
    }, [selectedEmployee, dateRange, invoices]);

    // Compute totals
    const totalEmployees = employees.length;
    const totalOrders = filteredInvoices.length;
    const totalRevenue = filteredInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalCustomers = filteredInvoices.filter(inv => inv.customerName).length;

    // Aggregate top-selling dishes
    useEffect(() => {
        const dishMap = {};
        filteredInvoices.forEach(inv => {
            inv.items.forEach(item => {
                if (!dishMap[item.itemName]) dishMap[item.itemName] = 0;
                dishMap[item.itemName] += item.quantity;
            });
        });

        const sortedDishes = Object.entries(dishMap)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        setTopDishes(sortedDishes);
    }, [filteredInvoices]);

    // Aggregate sales for chart
    useEffect(() => {
        const aggregateSales = () => {
            const map = {};
            filteredInvoices.forEach(inv => {
                const dateObj = new Date(inv.invoiceDate);
                let key;
                if (salesPeriod === "daily") key = dateObj.toLocaleDateString();
                else if (salesPeriod === "weekly") {
                    const week = Math.ceil(dateObj.getDate() / 7);
                    key = `${dateObj.getMonth() + 1}-W${week}-${dateObj.getFullYear()}`;
                } else if (salesPeriod === "monthly") key = `${dateObj.getMonth() + 1}-${dateObj.getFullYear()}`;
                if (!map[key]) map[key] = 0;
                map[key] += inv.total;
            });
            return Object.entries(map).map(([period, total]) => ({ period, total }));
        };
        setSalesData(aggregateSales());
    }, [filteredInvoices, salesPeriod]);

    return (
        <div className="p-6">
            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    className="p-2 border rounded"
                    value={selectedEmployee}
                    onChange={e => setSelectedEmployee(e.target.value)}
                >
                    <option value="">All Employees</option>
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>{emp.firstName}</option>
                    ))}
                </select>

                <input
                    type="date"
                    className="p-2 border rounded"
                    value={dateRange.start}
                    onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                />
                <input
                    type="date"
                    className="p-2 border rounded"
                    value={dateRange.end}
                    onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-blue-100 rounded">Total Employees: {totalEmployees}</div>
                <div className="p-4 bg-green-100 rounded">Total Orders: {totalOrders}</div>
                <div className="p-4 bg-yellow-100 rounded">Total Revenue: ₹{totalRevenue.toFixed(2)}</div>
                <div className="p-4 bg-purple-100 rounded">Total Customers: {totalCustomers}</div>
            </div>

            {/* Top Selling Dishes */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Top Selling Dishes</h2>
                {topDishes.length ? (
                    <ul className="list-disc ml-5">
                        {topDishes.map(dish => (
                            <li key={dish.name}>
                                {dish.name} - {dish.quantity} sold
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available</p>
                )}
            </div>

            {/* Sales Period Selector */}
            <div className="flex gap-4 mb-4">
                {["daily", "weekly", "monthly"].map(period => (
                    <button
                        key={period}
                        className={`px-4 py-2 rounded ${salesPeriod === period ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setSalesPeriod(period)}
                    >
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                ))}
            </div>

            {/* Sales Chart */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Total Sales ({salesPeriod})</h2>
                {salesData.length ? (
                    <BarChart width={800} height={300} data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill="#82ca9d" />
                    </BarChart>
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}
