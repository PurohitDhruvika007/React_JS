import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import MenuEmployees from "../../components/MenuEmployees/MenuEmployees";
import PlaceOrder from "../../components/PlaceOrder/PlaceOrder";

export default function EmployeeDashboard() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<MenuEmployees />} />
                <Route path="/order" element={<PlaceOrder />} />
            </Routes>
        </div>
    );
}
