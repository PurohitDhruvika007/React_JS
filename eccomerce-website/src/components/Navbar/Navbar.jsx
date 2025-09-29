import React from 'react'
import { Link } from 'react-router'
import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <nav>
                <div className="logo">
                    <h1>StyleSphere</h1>
                </div>
                <ul className="nav-links">
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/ProductList">Products</Link></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><Link to="/AddToCart">Cart</Link></li>
                </ul>
            </nav>
        </div>
    )
}
