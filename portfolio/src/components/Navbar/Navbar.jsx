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
                <li><a href="#Home">Home</a></li>
                <li><a href="#About">About</a></li>
                <li><a href="#Projects">tech stack</a></li>
                <li><a href="#Projects">projects</a></li>
                <li><a href="#Contact">contact</a></li>
            </ul>
        </div>
      </div>
    </div>
  )
}
