import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee } from "../../slices/EmployeeSlice";
import { useNavigate } from "react-router";

export default function EmployeeManager() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const employees = useSelector((state) => state.employee?.list || []);
    const status = useSelector((state) => state.employee?.status);
    const error = useSelector((state) => state.employee?.error);

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEmployees());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            dispatch(deleteEmployee(id));
        }
    };

    const handleUpdate = (id) => navigate(`/manager-dashboard/modify-employee/${id}`);
    const handleAdd = () => navigate("/manager-dashboard/modify-employee");

    // Filter employees by name
    const filteredEmployees = employees.filter(emp => {
        const fullName = `${emp.firstName} ${emp.lastName || ""}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2>Employees</h2>
                <div className="d-flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="form-control"
                        style={{ maxWidth: "250px" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleAdd}>
                        Add Employee
                    </button>
                </div>
            </div>

            {status === "loading" && <p>Loading employees...</p>}
            {status === "failed" && <p className="text-danger">{error}</p>}
            {status === "succeeded" && filteredEmployees.length === 0 && <p>No employees found.</p>}

            {status === "succeeded" && filteredEmployees.length > 0 && (
                <div className="row">
                    {filteredEmployees.map(emp => (
                        <div key={emp.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0 rounded-3 overflow-hidden">
                                {emp.profileImage ? (
                                    <img
                                        src={emp.profileImage}
                                        className="card-img-top"
                                        alt={`${emp.firstName} ${emp.lastName}`}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-secondary text-white"
                                        style={{ height: "200px", fontSize: "2rem", fontWeight: "bold" }}
                                    >
                                        {emp.firstName?.[0] || "?"}
                                    </div>
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{emp.firstName} {emp.lastName || ""}</h5>
                                    <p className="card-text">
                                        <strong>Email:</strong> {emp.email} <br />
                                        <strong>Salary:</strong> ₹{emp.salary} <br />
                                        <strong>Shift:</strong> {emp.shift || "-"} <br />
                                        <strong>Joining Date:</strong> {emp.joiningDate || "-"}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-sm btn-warning" onClick={() => handleUpdate(emp.id)}>Update</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(emp.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
