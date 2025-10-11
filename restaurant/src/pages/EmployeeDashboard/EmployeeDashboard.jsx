import React from "react";
import { Routes, Route } from "react-router";
import MenuEmployees from "../../components/MenuEmployees/MenuEmployees";
import OrderEmployees from "../../components/OrderEmployees/OrderEmployees";

export default function EmployeeDashboard() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MenuEmployees />} />
                <Route path="/order-employees" element={<OrderEmployees />} />
            </Routes>
        </div>
    );
}
