import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function AddUpdateEmployees() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [image, setImage] = useState(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "employee",
        address: "",
        salary: "",
        joiningDate: "",
        shift: "",
    });
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        if (id) {
            setIsUpdate(true);
            axios.get(`http://localhost:3000/employees/${id}`)
                .then(res => {
                    const emp = res.data;
                    setForm({
                        firstName: emp.firstName || "",
                        lastName: emp.lastName || "",
                        email: emp.email || "",
                        password: emp.password || "",
                        role: emp.role || "employee",
                        address: emp.address || "",
                        salary: emp.salary || "",
                        joiningDate: emp.joiningDate || "",
                        shift: emp.shift || "",
                    });
                    setImage(emp.profileImage || null);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => setImage(event.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return alert("Please upload an image.");

        const employeeData = { ...form, salary: Number(form.salary), profileImage: image };

        try {
            setLoading(true);
            if (isUpdate) {
                await axios.patch(`http://localhost:3000/employees/${id}`, employeeData);
                alert("Employee updated successfully!");
            } else {
                await axios.post("http://localhost:3000/employees", employeeData);
                alert("Employee added successfully!");
            }
            navigate("/manager-dashboard/employees");
        } catch (err) {
            console.error(err);
            alert("Error saving employee");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container p-4" style={{ maxWidth: "850px" }}>
            {/* Image Upload */}
            <div
                className="border border-2 border-dashed rounded-3 d-flex align-items-center justify-content-center"
                style={{ width: "180px", height: "180px", backgroundColor: "#f9f9f9", cursor: "pointer", position: "relative" }}
            >
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
                {image ? (
                    <img src={image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                ) : (
                    <div className="text-center">
                        <i className="bi bi-image" style={{ fontSize: "2rem", color: "#bbb" }}></i>
                        <p className="fw-semibold mt-2">Upload Image</p>
                    </div>
                )}
            </div>

            {/* Form */}
            <form className="row mt-4 g-3 text-start" onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div className="col-md-6">
                    <label>First Name</label>
                    <input type="text" name="firstName" className="form-control" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label>Last Name</label>
                    <input type="text" name="lastName" className="form-control" value={form.lastName} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" value={form.address} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <label>Salary</label>
                    <input type="number" name="salary" className="form-control" value={form.salary} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                    <label>Shift</label>
                    <input type="text" name="shift" className="form-control" value={form.shift} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                    <label>Joining Date</label>
                    <input type="date" name="joiningDate" className="form-control" value={form.joiningDate} onChange={handleChange} />
                </div>
                <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn px-4 fw-semibold" style={{ borderRadius: "8px", backgroundColor: "#ff8c00", color: "white" }} disabled={loading}>
                        {loading ? "Saving..." : isUpdate ? "Save Changes" : "Add Employee"}
                    </button>
                </div>
            </form>
        </div>
    );
}
