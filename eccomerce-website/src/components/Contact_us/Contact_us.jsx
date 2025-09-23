import React from 'react'
import './Contact_us.css'
import { Link } from 'react-router'

export default function Contact_us() {
    return (
        <div id="contact">
            <footer className="footer">
                <div className="footer-head">
                    <h2 className="footer-logo">StyleSphere</h2>
                    <p>Elevate your fashion with the latest trends and exclusive collections.</p>
                </div>
                <div className="footer-container">


                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to={'/Home'}>Home</Link></li>
                            <li><Link to={'/ProductList'}>Products</Link></li>
                            <li><a href="#contact" >Contact us</a></li>
                            <li><Link to={'/AddToCart'}>Cart</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <p>Email: contact@stylesphere.com</p>
                        <p>Phone: +91 9876543210</p>
                        <p>Address: 123 Fashion Street, Mumbai, India</p>
                    </div>

                    <div className="footer-section">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="#"><i className="ri-facebook-fill"></i></a>
                            <a href="#"><i className="ri-instagram-fill"></i></a>
                            <a href="#"><i className="ri-twitter-fill"></i></a>
                            <a href="#"><i className="ri-linkedin-fill"></i></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} StyleSphere. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    )
}
