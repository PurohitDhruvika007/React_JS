import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ProfileManager() {
    const { currentUser } = useSelector((state) => state.auth);
    const [managerData, setManagerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchManager = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/employees/${currentUser?.id}`);
                setManagerData(res.data);
            } catch (error) {
                console.error("Error fetching manager profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.id) {
            fetchManager();
        }
    }, [currentUser]);

    if (loading)
        return <p style={{ textAlign: "center" }}>Loading profile...</p>;

    if (!managerData)
        return <p style={{ textAlign: "center" }}>No profile data found.</p>;

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                background: "#f9f9f9",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                textAlign: "center",
            }}
        >
            {/* ✅ Profile Image */}
            <img
                src={managerData.profileImage || "https://via.placeholder.com/150"}
                alt={`${managerData.firstName} ${managerData.lastName}`}
                style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "20px",
                    border: "3px solid #2e8b57",
                }}
            />

            <h2 style={{ color: "#2e8b57" }}>👨‍💼 Manager Profile</h2>

            <div
                style={{
                    marginTop: "20px",
                    lineHeight: "1.8",
                    fontSize: "16px",
                    textAlign: "left",
                }}
            >
                <p><strong>Name:</strong> {managerData.firstName} {managerData.lastName || ""}</p>
                <p><strong>Email:</strong> {managerData.email}</p>
                <p><strong>Role:</strong> {managerData.role}</p>
                <p><strong>Address:</strong> {managerData.address || "Not available"}</p>
                <p><strong>Salary:</strong> ₹{managerData.salary?.toLocaleString() || "Not available"}</p>
                <p><strong>Joining Date:</strong> {managerData.joiningDate}</p>
                <p><strong>Shift:</strong> {managerData.shift}</p>
            </div>
        </div>
    );
}
