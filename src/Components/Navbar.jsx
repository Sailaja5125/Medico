import React, { useState, useEffect } from 'react';
import '../Style/Navbar.css';

export default function Navbar({ isAuthenticated, handleLogout }) {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Set the active link based on the current URL
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  return (
    <div>
      <nav className='nav-bar'>
        <div className="logo">
          <h1>Medico.</h1>
        </div>
        <div className='nav-links'>
          <li className={`nav-items ${activeLink === '/' ? 'active' : ''}`}>
            <a href="/">Home</a>
          </li>
          <li className={`nav-items ${activeLink === '/shop' ? 'active' : ''}`}>
            <a href="/shop">Products</a>
          </li>
          <li className={`nav-items ${activeLink === '/blog' ? 'active' : ''}`}>
            <a href="/blog">Blogs</a>
          </li>
          <li className={`nav-items ${activeLink === '/connect' ? 'active' : ''}`}>
            <a href="/connect">Connect</a>
          </li>
          <li className={`nav-items ${activeLink === '/chatbot' ? 'active' : ''}`}>
            <a href="/chatbot">Ai assistance</a>
          </li>
        </div>
        <div className="auth-links">
          {isAuthenticated ? (
            <li className='auth-items'>
              <button onClick={handleLogout} className='join'>Logout</button>
            </li>
          ) : (
            <>
              <li className='auth-items'><a href="/login">Login</a></li>
              <a href="/signin"><button className='join'>Join us<i className="fa-solid fa-arrow-right"></i></button></a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
