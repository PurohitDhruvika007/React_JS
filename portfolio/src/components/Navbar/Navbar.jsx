import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <div className='main'>
      <div className="navbar">
        <div className="logo">
            <h2>MyPortfolio</h2>
        </div>
        <div className="links">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">tech stack</a></li>
                <li><a href="#">projects</a></li>
                <li><a href="#">contact</a></li>
            </ul>
        </div>
      </div>
    </div>
  )
}
