import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="#hero">
                    Eccomerce
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse text-center justify-content-center justify-content-md-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link" href="#hero">Home</a>
                        <a className="nav-link" href="#about">About</a>
                        <a className="nav-link" href="#products">Products</a>
                        <a className="nav-link" href="#contact">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
