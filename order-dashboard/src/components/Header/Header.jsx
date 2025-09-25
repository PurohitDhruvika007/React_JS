import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <div>
            <div className="container-fluid p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>Orders</h3>
                    <div className="d-flex align-items-center gap-3">

                        <div className="user-info d-flex align-items-center gap-2">
                            <img src="https://i.pravatar.cc/40" alt="User" />
                            <span>Garrick Ollivander</span>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                            All Orders (209)
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            New Orders (3)
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Completed Orders (183)
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Canceled Orders (16)
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Pending Orders (7)
                        </a>
                    </li>
                </ul>
                {/* Search and Buttons */}
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div className="search-box mb-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by order ID or customer"
                            />
                            <span className="input-group-text">
                                <i className="ri-search-line"></i>
                            </span>
                        </div>
                    </div>
                    <div className="d-flex gap-2 mb-2">
                        <button className="btn btn-outline-primary">
                            <i className="bi bi-funnel" /> Filter
                        </button>
                        <button className="btn btn-outline-secondary">
                            <i className="bi bi-download" /> Export
                        </button>
                        <button className="btn btn-primary">
                            <i className="bi bi-plus-lg" /> Add New
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
