import React from 'react'
import { Link } from 'react-router'
import './Navbar.css'

export default function Navbar() {
    return (
        <div>
            <nav>
                <div>
                    <h1>StyleSphere</h1>
                </div>
                <ul>
                    <li><Link to={'/Home'}>Home</Link></li>
                    <li><Link to={'/ProductList'}>Products</Link></li>
                    <li><a href="#contact" >Contact us</a></li>
                    <li><Link to={'/AddToCart'}>Carts</Link></li>
                </ul>
            </nav>
        </div>
    )
}
