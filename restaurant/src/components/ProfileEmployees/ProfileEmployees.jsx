import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ProfileEmployees() {
    const { currentUser } = useSelector(state => state.auth);
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get("http://localhost:3000/employees");
                const employee = res.data.find(emp => emp.id === currentUser.id);
                setEmployeeData(employee);
            } catch (err) {
                console.error("Error fetching employee data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) fetchEmployee();
    }, [currentUser]);

    if (loading) return <p>Loading profile...</p>;
    if (!employeeData) return <p>Employee data not found.</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "700px", margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            {/* Profile Header */}
            <div style={{ textAlign: "center", marginBottom: 25 }}>
                <img
                    src={employeeData.profileImage || "https://via.placeholder.com/150"}
                    alt={employeeData.firstName}
                    style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: "3px solid #2e8b57" }}
                />
                <h2 style={{ marginTop: 12 }}>{employeeData.firstName}</h2>
                <p style={{ color: "#555", fontWeight: "500" }}>{employeeData.role}</p>
            </div>

            {/* Employee Details */}
            <div style={{ lineHeight: 1.8, fontSize: 16 }}>
                <p><strong>Email:</strong> {employeeData.email}</p>
                <p><strong>Address:</strong> {employeeData.address}</p>
                <p><strong>Salary:</strong> ₹{employeeData.salary}</p>
                <p><strong>Joining Date:</strong> {employeeData.joiningDate}</p>
                <p><strong>Shift:</strong> {employeeData.shift}</p>
                <p><strong>Total Orders:</strong> {employeeData.totalOrders}</p>
                <p><strong>Total Sales:</strong> ₹{employeeData.totalSales}</p>
                <p><strong>Manager ID:</strong> {employeeData.managerId}</p>
            </div>
        </div>
    );
}
