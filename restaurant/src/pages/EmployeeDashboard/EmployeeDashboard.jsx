import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import MenuEmployees from "../../components/MenuEmployees/MenuEmployees";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";
import InvoiceModal from "../../components/InvoiceModal/InvoiceModal";
import ProfileEmployees from "../../components/ProfileEmployees/ProfileEmployees";
import DashboardEmployees from "../../components/DashboardEmployees/DashboardEmployees";

export default function EmployeeDashboard() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<MenuEmployees />} />
                <Route path="/order" element={<PlaceOrder />} />
                <Route path="/profile" element={<ProfileEmployees />} />
                <Route path="/dashboard" element={<DashboardEmployees />} />
            </Routes>
        </div>
    );
}
