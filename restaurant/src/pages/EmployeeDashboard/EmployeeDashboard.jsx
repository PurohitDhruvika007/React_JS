import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import MenuEmployees from "../../components/MenuEmployees/MenuEmployees";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";
import ProfileEmployees from "../../components/ProfileEmployees/ProfileEmployees";
import DashboardEmployees from "../../components/DashboardEmployees/DashboardEmployees";

export default function EmployeeDashboard() {
    return (
        <div className="employee-dashboard">
            <Navbar />
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<DashboardEmployees />} />
                    <Route path="/menu" element={<MenuEmployees />} />
                    <Route path="/order" element={<PlaceOrder />} />
                    <Route path="/profile" element={<ProfileEmployees />} />
                </Routes>
            </div>
        </div>
    );
}
